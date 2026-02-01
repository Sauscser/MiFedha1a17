import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getSMAccount, listCvrdGroupLoans } from '../../../../src/graphql/queries';
import LnerStts from "../../../../components/Chama/RepayChmLn/RepyChmNonCovLn";
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const graphqlClient = generateClient();
const FetchSMNonCovLns = props => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const fetchUsrDtls = async () => {
    setLoading(true);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    const email = attributes.email;
    try {
      const MFNDtls: any = await graphqlClient.graphql({
        query: getSMAccount,
        variables: {
          awsemail: email
        }
      });
      const balances = MFNDtls.data.getSMAccount.balance;
      const owner = MFNDtls.data.getSMAccount.owner;
      const fetchLoanees = async () => {
        setLoading(true);
        const userInfo = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        const email = attributes.email;
        try {
          const Lonees: any = await graphqlClient.graphql({
            query: listCvrdGroupLoans,
            variables: {
              filter: {
                and: {
                  loaneePhn: {
                    eq: email
                  },
                  lonBala: {
                    gt: 0
                  }
                }
              }
            }
          });
          setLoanees(Lonees.data.listNonCvrdGroupLoans.items);
        } catch (e) {
          console.log(e);
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
      console.log(e);
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
    }) => <LnerStts ChamaMmbrshpDtls={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
                        <Text style={styles.label}> My Chama NonCov Loans</Text>
                    </>} />
        </View>;
};
export default FetchSMNonCovLns;