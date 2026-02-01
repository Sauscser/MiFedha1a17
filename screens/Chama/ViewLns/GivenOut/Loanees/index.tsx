import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import ChmNonCvLns from "../../../../../components/Chama/Loans/Givenout/Loanees";
import styles from './styles';
import { getSMAccount, listCvrdGroupLoans } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMNonCovLns = () => {
  const [LnerPhn, setLneePhn] = useState(null);
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
        query: listCvrdGroupLoans,
        variables: {
          filter: {
            and: {
              lonBala: {
                gt: 0
              },
              grpContact: {
                eq: route.params.grpContact
              }
            }
          }
        }
      });
      setLoanees(Lonees.data.listCvrdGroupLoans.items);
      await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: (await fetchUserAttributes()).email
        }
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching group loans. Please retry.");
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
    }) => <ChmNonCvLns Loaner={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}>Group Loanees</Text>
            <Text style={styles.label}>Swipe to reload</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;