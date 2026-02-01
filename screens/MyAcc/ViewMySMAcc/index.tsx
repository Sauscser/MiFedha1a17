import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Alert } from 'react-native';
import LnerStts from "../../../components/MyAc/ViewAc";
import styles from './styles';
import { getSMAccount, listSMAccounts } from '../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [LneePhn, setLneePhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const fetchUsrDtls = async () => {
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
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
        const userInfo = await getCurrentUser();
        try {
          const Lonees: any = await client.graphql({
            query: listSMAccounts,
            variables: {
              filter: {
                and: {
                  awsemail: {
                    eq: attributes.email
                  },
                  acStatus: {
                    eq: "AccountActive"
                  }
                }
              }
            }
          });
          const Acc = Lonees.data.listSMAccounts.items;
          setLoanees(Acc);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      if (userInfo.userId !== owner) {
        Alert.alert("Please first create a main account");
        return;
      } else {
        await fetchLoanees();
      }
    } catch (e) {
      console.log(e);
      if (e) {
        Alert.alert("Please first create a main account on home page");
      }
      return;
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
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            
            <Text style={styles.label}> My Account</Text>
            <Text style={styles.label2}> 
              (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;