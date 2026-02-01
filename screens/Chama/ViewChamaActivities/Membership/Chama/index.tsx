import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import LnerStts from "../../../../../components/Chama/ChmActivities/Membership/Chama";
import styles from './styles';
import { listChamaMembers } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
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
      setLneePhn(attributes.email);
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
        query: listChamaMembers,
        variables: {
          filter: {
            groupContact: {
              eq: route.params.groupContact
            }
          }
        }
      });
      const grps = Lonees.data.listChamaMembers.items;
      if (grps.length < 1) {
        Alert.alert("You don't belong to any group");
      }
      setLoanees(grps);
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching Chama members. Please retry.");
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
    }) => <LnerStts ChamaMmbrshpDtls={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}>Chama Members</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;