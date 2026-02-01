import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import NonLnSent from "../../../../components/Chama/VwDepositsChm";
import styles from './styles';
import { getCompany, getSMAccount, VwMFNFltDeductns } from '../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../src/graphql/mutations';
import { useRoute } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMNonLnsSnt = props => {
  const [loading, setLoading] = useState(false);
  const [Recvrs, setRecvrs] = useState([]);
  const route = useRoute();
  const fetchUsrDtls = async () => {
    const user = await getCurrentUser();
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
            query: VwMFNFltDeductns,
            variables: {
              depositerid: route.params.grpContact,
              sortDirection: "DESC",
              limit: 100
            }
          });
          setRecvrs(Lonees.data.VwMFNFltDeductns.items);
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
                        awsemail: attributes.email,
                        balance: parseFloat(balances) - parseFloat(enquiryFees)
                      }
                    }
                  });
                } catch (error) {
                  Alert.alert("Retry or update app or call customer care");
                  return;
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
                  Alert.alert("Check your internet connection");
                  return;
                }
                await updtUsrAc();
              };
              if (parseFloat(balances) < parseFloat(enquiryFees)) {
                Alert.alert("Account Balance is very little");
              } else {
                await updtActAdm();
              }
            } catch (e) {
              Alert.alert("Chama does not exist; otherwise check internet connection");
              console.log(e);
              return;
            }
          };
          await fetchCompDtls();
        } catch (e) {
          Alert.alert("Chama does not exist; otherwise check internet connection");
          console.log(e);
          return;
        } finally {
          setLoading(false);
        }
      };
      if (user.userId !== owner) {
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
    }} data={Recvrs} renderItem={({
      item
    }) => <NonLnSent SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}> Chama Deposits</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMNonLnsSnt;