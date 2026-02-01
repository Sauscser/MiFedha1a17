import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import ChmMbrContr from "../../../../../components/Chama/ChmActivities/Contributions/VwChama";
import styles from './styles';
import { listGrpMembersContributions } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMCovLns = props => {
  const [LneePhn, setLneePhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const route = useRoute();
  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      setLneePhn(attributes.phone_number);
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching user details");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const Lonees: any = await client.graphql({
        query: listGrpMembersContributions,
        variables: {
          filter: {
            memberId: {
              eq: route.params.ChamaNMember
            }
          }
        }
      });
      setLoanees(Lonees.data.listGrpMembersContributions.items);
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching contributions. Please retry.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLoanees();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <ChmMbrContr ChamaContriDtls={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}>Member Contributions</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;