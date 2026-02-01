import React, { useState } from 'react';
import { createSMLoansCovered, createNonLoans, updateCompany, updateSMAccount, updateBizna } from '../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount, listCovCreditSellers, listCvrdGroupLoans, listSMLoansCovereds } from '../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Linking, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
const client = generateClient();
const SMASendNonLns = (props: any) => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState('');
  const [amounts, setAmount] = useState('');
  const [Desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const SndChmMmbrMny = () => {
    navigation.navigate('AutomaticRepayAllTyps');
  };
  const NoBizBen = () => {
    navigation.navigate('PayCash');
  };
  const fetchCvLnSM = async () => {
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const Lonees1: any = await client.graphql({
        query: listSMLoansCovereds,
        variables: {
          filter: {
            and: {
              status: {
                eq: 'LoanBL'
              },
              lonBala: {
                gt: 0
              },
              loaneeEmail: {
                eq: attributes.email
              }
            }
          }
        }
      });
      const fetchCLCrdSl = async () => {
        setIsLoading(true);
        try {
          const Lonees3: any = await client.graphql({
            query: listCovCreditSellers,
            variables: {
              filter: {
                and: {
                  status: {
                    eq: 'LoanBL'
                  },
                  lonBala: {
                    gt: 0
                  },
                  buyerContact: {
                    eq: SenderNatId
                  }
                }
              }
            }
          });
          const fetchCLChm = async () => {
            setIsLoading(true);
            try {
              const Lonees5: any = await client.graphql({
                query: listCvrdGroupLoans,
                variables: {
                  filter: {
                    and: {
                      status: {
                        eq: 'LoanBL'
                      },
                      lonBala: {
                        gt: 0
                      },
                      loaneePhn: {
                        eq: attributes.email
                      }
                    }
                  }
                }
              });
              const fetchSenderUsrDtls = async () => {
                if (isLoading) return;
                setIsLoading(false);
                try {
                  const accountDtl: any = await client.graphql({
                    query: getBizna,
                    variables: {
                      BusKntct: SenderNatId
                    }
                  });
                  const SenderUsrBal = accountDtl.data.getBizna.netEarnings;
                  const bizBeneficiaryz = accountDtl.data.getBizna.bizBeneficiary;
                  const bizTypez = accountDtl.data.getBizna.bizType;
                  const name = accountDtl.data.getBizna.busName;
                  const ownerz = accountDtl.data.getBizna.owner;
                  const SenderAcstatus = accountDtl.data.getBizna.status;
                  const pw = accountDtl.data.getBizna.pw;
                  const fetchCompDtls = async () => {
                    if (isLoading) return;
                    setIsLoading(true);
                    const CompDtls: any = await client.graphql({
                      query: getCompany,
                      variables: {
                        AdminId: "BaruchHabaB'ShemAdonai2"
                      }
                    });
                    const UsrTransferFee = CompDtls.data.getCompany.userTransferFee;
                    const UsrTransferFeeAmt = UsrTransferFee * parseFloat(amounts);
                    const UsrTransferFee2 = parseFloat(SenderUsrBal) - parseFloat(amounts);
                    const TotalTransacted = parseFloat(amounts) + parseFloat(UsrTransferFee) * parseFloat(amounts);
                    const TotalTransacted2 = parseFloat(amounts) + UsrTransferFee2;
                    const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
                    const companyEarnings = CompDtls.data.getCompany.companyEarning;
                    const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
                    const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM;
                    const fetchRecUsrDtls = async () => {
                      if (isLoading) return;
                      setIsLoading(true);
                      const RecAccountDtl: any = await client.graphql({
                        query: getBizna,
                        variables: {
                          BusKntct: RecNatId
                        }
                      });
                      const RecUsrBal = RecAccountDtl.data.getBizna.netEarnings;
                      const bizBeneficiary = RecAccountDtl.data.getBizna.bizBeneficiary;
                      const bizType = RecAccountDtl.data.getBizna.bizType;
                      const namess = RecAccountDtl.data.getBizna.busName;
                      const RecAcstatus = RecAccountDtl.data.getBizna.status;
                      if (userInfo.userId !== ownerz) {
                        Alert.alert('Unauthorised to pay on behalf of the business!');
                        return;
                      } else if (bizType === 'Public') {
                        NoBizBen();
                      } else if (RecAcstatus === 'AccountInactive') {
                        Alert.alert('Receiver account is inactive');
                      } else if (SenderAcstatus === 'AccountInactive') {
                        Alert.alert('Sender account is inactive');
                      } else if (UsrTransferFee2 < 0) {
                        Alert.alert('Requested amount is more than you have in your account');
                      } else if (pw !== SnderPW) {
                        Alert.alert('Wrong password');
                      } else if (Lonees3.data.listCovCreditSellers.items.length > 0) {
                        SndChmMmbrMny();
                      } else if (UsrTransferFeeAmt > UsrTransferFee2 && UsrTransferFee2 > 0) {
                        // sendSMNonLn2();
                      } else {
                        // sendSMNonLn();
                      }
                    };
                    await fetchRecUsrDtls();
                  };
                  await fetchCompDtls();
                } catch (e) {
                  Alert.alert('Check your internet connection');
                }
                setIsLoading(false);
              };
              await fetchSenderUsrDtls();
            } catch (e) {
              Alert.alert('Check your internet connection');
            }
            setIsLoading(false);
          };
          await fetchCLChm();
        } catch (e) {
          Alert.alert('Check your internet connection');
        }
        setIsLoading(false);
      };
      await fetchCLCrdSl();
    } catch (e) {
      Alert.alert('Please fill details correctly or check your internet connection');
    }
    setIsLoading(false);
    setSenderNatId('');
    setAmount('');
    setRecNatId('');
    setDesc('');
    setSnderPW('');
  };
  return <View>
      <View style={styles.image}>
        <ScrollView>
         
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput placeholder="Sending Business Phone" value={SenderNatId} onChangeText={setSenderNatId} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Sending Business Phone</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput placeholder="Receiving Business Phone" value={RecNatId} onChangeText={setRecNatId} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Receiving Business Phone</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput keyboardType={"decimal-pad"} value={amounts} onChangeText={setAmount} style={styles.sendAmtInput} editable={true}></TextInput>
              
            <Text style={styles.sendAmtText}>Amount Sent</Text>
          </View>


          <View style={styles.sendAmtView}>
            <TextInput value={SnderPW} onChangeText={setSnderPW} secureTextEntry={true} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Buyer PassWord</Text>
          </View>


          <View style={styles.sendAmtViewDesc}>
            <TextInput multiline={true} value={Desc} onChangeText={setDesc} style={styles.sendAmtInputDesc} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Description</Text>
          </View>

          <TouchableOpacity onPress={fetchCvLnSM} style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Send</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    </View>;
};
export default SMASendNonLns;