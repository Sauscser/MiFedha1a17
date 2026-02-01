import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Alert } from 'react-native';
import RecNonLns from "../../../../../components/MyAc/ViewRecNonLns";
import styles from './styles';
import { getCompany, getSMAccount, listLoanRepayments, listNonLoans, listSMAccounts, vwMyRecMny } from '../../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../../src/graphql/mutations';
import { useRoute } from '@react-navigation/native';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMNonLnsRec = props => {
  const route = useRoute();
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
        try {
          const Lonees: any = await client.graphql({
            query: listLoanRepayments,
            variables: {
              filter: {
                loanId1: {
                  eq: route.params.loanID
                }
              }
            }
          });
          setLoanees(Lonees.data.listLoanRepayments.items);
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
                    Alert.alert("Check your internet connection");
                    return;
                  }
                }
                updtUsrAc();
              };
              const updtUsrAc = async () => {
                try {
                  await client.graphql({
                    query: updateSMAccount,
                    variables: {
                      input: {
                        awsemail: attributes.email,
                        balance: parseFloat(balances) - parseFloat(enquiryFees)
                      }
                    }
                  });
                } catch (error) {
                  if (error) {
                    Alert.alert("Retry or update app or call customer care");
                    return;
                  }
                }
              };
              if (parseFloat(balances) < parseFloat(enquiryFees)) {
                Alert.alert("Account Balance is very little");
              } else {
                await updtActAdm();
              }
            } catch (e) {
              if (e) {
                console.log(e);
              }
            }
          };
          await fetchCompDtls();
        } catch (e) {
          if (e) {
            console.log(e);
          }
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
    }) => <RecNonLns SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            
            <Text style={styles.label}>Received Pal LP </Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMNonLnsRec;