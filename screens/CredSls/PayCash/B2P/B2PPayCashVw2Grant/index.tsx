import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import LnerStts from "../../../../../components/CredSales/PayCash/Biz2Pal/Vw2GrantB2P";
import styles from './styles';
import { getSMAccount, listBizSlsReqs } from '../../../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const fetchUsrDtls = async () => {
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const MFNDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const balances = MFNDtls.data.getSMAccount.balance;
      const owner = MFNDtls.data.getSMAccount.owner;
      const fetchLoanees = async () => {
        setLoading(true);
        try {
          const Lonees: any = await client.graphql({
            query: listBizSlsReqs,
            variables: {
              filter: {
                attendingAdmin: {
                  eq: attributes.email
                },
                status: {
                  eq: "cashSales"
                }
              }
            }
          });
          setLoanees(Lonees.data.listBizSlsReqs.items);
          if (Lonees.data.listBizSlsReqs.items.length < 1) {
            Alert.alert("Sorry there are no requests to approve");
          }
        } catch (e) {
          console.error(e);
          Alert.alert("Error fetching requests");
        } finally {
          setLoading(false);
        }
      };
      if (userInfo.userId !== owner) {
        Alert.alert("Please first create main account");
      } else {
        await fetchLoanees();
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Retry or update app or call customer care");
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
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}> Swipe to View Sale Requests</Text>
            <Text style={styles.label2}> (Select to Delete)</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;