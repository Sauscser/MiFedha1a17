import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Alert } from 'react-native';
import { getCompany, getSMAccount, listCovCreditSellers, vwMyCrdBys } from '../../../../../../src/graphql/queries';
import LnerStts from "../../../../../../components/VwCredSales/Cov/Loaners";
import styles from './styles';
import { updateCompany, updateSMAccount } from '../../../../../../src/graphql/mutations';
import { useRoute } from '@react-navigation/native';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMCovLns = props => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const route = useRoute();
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
            query: listCovCreditSellers,
            variables: {
              filter: {
                lonBala: {
                  gt: 0
                },
                buyerContact: {
                  eq: attributes.email
                }
              }
            }
          });
          setLoanees(Lonees.data.listCovCreditSellers.items);
          const fetchCompDtls = async () => {
            try {
              const MFNDtls1: any = await client.graphql({
                query: getCompany,
                variables: {
                  AdminId: "BaruchHabaB'ShemAdonai2"
                }
              });
              const companyEarningBals = MFNDtls1.data.getCompany.companyEarningBal;
              const companyEarnings = MFNDtls1.data.getCompany.companyEarning;
              const enquiryFees = MFNDtls1.data.getCompany.enquiryFee;
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
                Alert.alert("User does not exist does not exist; otherwise check internet connection");
                return;
              }
              console.log(e);
            }
          };
          await fetchCompDtls();
        } catch (e) {
          if (e) {
            Alert.alert("Retry or update app or call customer care");
            return;
          }
          console.log(e);
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
    }) => <LnerStts Loanee={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            
            <Text style={styles.label}> My Credit Sellers</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;