import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import LnerStts from "../../../../../components/Chama/Loans/Received/Loaners";
import styles from './styles';
import { getSMAccount, listCvrdGroupLoans } from '../../../../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMNonCovLns = () => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const fetchUsrDtls = async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const MFNDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const balances = MFNDtls.data.getSMAccount.balance;
      const owner = MFNDtls.data.getSMAccount.owner;
      if (user.userId !== owner) {
        Alert.alert("Please first create main account");
        return;
      }
      const Lonees: any = await client.graphql({
        query: listCvrdGroupLoans,
        variables: {
          filter: {
            lonBala: {
              gt: 0
            },
            loaneePhn: {
              eq: attributes.email
            }
          }
        }
      });
      setLoanees(Lonees.data.listCvrdGroupLoans.items);
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching loans. Please retry or update your app.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsrDtls();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts Loanee={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}>My group Loans</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;