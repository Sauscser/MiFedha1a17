import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import NonLnSent from "../../../components/Advocate/VwPP2Approve";
import styles from './styles';
import { getCompany, getSMAccount, listReqLoans } from '../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../src/graphql/mutations';
import { useRoute } from '@react-navigation/core';
const client = generateClient();
const FetchSMNonLnsSnt = props => {
  const [loading, setLoading] = useState(false);
  const [Recvrs, setRecvrs] = useState([]);
  const route = useRoute();
  const fetchUsrDtls = async () => {
    try {
      const userInfo = await getCurrentUser();
      const attrs = await fetchUserAttributes();
      setLoading(true);
      try {
        const MFNDtls: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: attrs.email
          }
        });
        const balances = MFNDtls.data.getSMAccount.balance;
        const owner = MFNDtls.data.getSMAccount.owner;
        const fetchLoanees = async () => {
          setLoading(true);
          try {
            const Lonees: any = await client.graphql({
              query: listReqLoans,
              variables: {
                filter: {
                  AdvEmail: {
                    eq: attrs.email
                  },
                  statusNumber: {
                    eq: 0
                  }
                }
              }
            });
            setRecvrs(Lonees.data.listReqLoans.items);
            if (Lonees.data.listReqLoans.items.length < 1) {
              Alert.alert("No clients available");
            }
            const fetchCompDtls = async () => {
              try {
                const MFNDtls: any = await client.graphql({
                  query: getCompany,
                  variables: {
                    AdminId: "BaruchHabaB'ShemAdonai2"
                  }
                });
                const companyEarningBals = MFNDtls.data.getCompany.companyEarningBal;
                const companyEarnings = MFNDtls.data.getCompany.companyEarning;
                const enquiryFees = MFNDtls.data.getCompany.enquiryFee;
                const updtUsrAc = async () => {
                  try {
                    await client.graphql({
                      query: updateSMAccount,
                      variables: {
                        input: {
                          awsemail: attrs.email,
                          balance: parseFloat(balances) - parseFloat(enquiryFees)
                        }
                      }
                    });
                  } catch (error) {
                    if (error) {
                      Alert.alert("Error! Access denied!");
                      return;
                    }
                  }
                };
                const updtActAdm = async () => {
                  try {
                    await client.graphql({
                      query: updateCompany,
                      variables: {
                        input: {
                          AdminId: "BaruchHabaB'ShemAdonai2",
                          companyEarningBal: parseFloat(companyEarningBals) + parseFloat(enquiryFees),
                          companyEarning: parseFloat(companyEarnings) + parseFloat(enquiryFees)
                        }
                      }
                    });
                  } catch (error) {
                    if (error) {
                      Alert.alert("Error! Access denied!");
                      return;
                    }
                  }
                  await updtUsrAc();
                };
                if (parseFloat(balances) < parseFloat(enquiryFees)) {
                  Alert.alert("Account Balance is very little");
                  return;
                } else {
                  updtActAdm();
                }
              } catch (e) {
                if (e) {
                  Alert.alert("Error! Access denied!");
                  return;
                }
                console.log(e);
              }
            };
            await fetchCompDtls();
          } catch (e) {
            if (e) {
              Alert.alert("Error! Access denied!");
              return;
            }
            console.log(e);
            setLoading(false);
          }
        };
        if (userInfo.userId !== owner) {
          Alert.alert("Please first create main account");
        } else {
          await fetchLoanees();
        }
      } catch (e) {
        if (e) {
          Alert.alert("Error! Access denied!");
          return;
        }
        console.log(e);
      }
    } catch (e) {
      if (e) {
        Alert.alert("Error! Access denied!");
        return;
      }
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchUsrDtls();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Recvrs} renderItem={({
      item
    }) => <NonLnSent SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}> PalPal Loans</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMNonLnsSnt;