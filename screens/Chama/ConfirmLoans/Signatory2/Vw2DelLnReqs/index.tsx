import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import LnerStts from "../../../../../components/Chama/LnReq/Vw2DelLnReq";
import styles from './styles';
import { getSMAccount, listReqLoanChamas } from '../../../../../src/graphql/queries';
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const gtBizna = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const compDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const owner = compDtls.data.getSMAccount.owner;
      const fetchLoanees = async () => {
        setLoading(true);
        try {
          const Lonees: any = await client.graphql({
            query: listReqLoanChamas,
            variables: {
              filter: {
                signitory2Sub: {
                  eq: attributes.email
                },
                WithdrawCnfrmtn: {
                  eq: "NO"
                }
              }
            }
          });
          setLoanees(Lonees.data.listReqLoanChamas.items);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      if (attributes.sub !== owner) {
        Alert.alert("Please first create main account");
        return;
      } else {
        await fetchLoanees();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    gtBizna();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={gtBizna} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}> Swipe to View My Loan Requests</Text>
            <Text style={styles.label2}> (Select to Delete)</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;