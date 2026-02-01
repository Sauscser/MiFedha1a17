import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import LnerStts from "../../../../../components/Chama/ChmActivities/Contributions/VwMember";
import styles from './styles';
import { listGrpMembersContributions } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMCovLns = props => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const route = useRoute();
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
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
    }) => <LnerStts MmbrContriDtls={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}>My Chama Contributions</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;