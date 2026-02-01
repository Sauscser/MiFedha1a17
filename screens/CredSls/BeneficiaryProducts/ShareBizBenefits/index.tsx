import React, { useEffect, useState } from 'react';
import Communications from 'react-native-communications';
import { createSMLoansCovered, createNonLoans, updateCompany, updateSMAccount, updateBizna, createBenefitShare2, updateLinkBeneficiary2 } from '../../../../src/graphql/mutations';
import { getBizna, getCompany, getLinkBeneficiary2, getSMAccount } from '../../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
const client = generateClient();
const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState('');
  const [SendrPhn, setSendrPhn] = useState(null);
  const [amounts, setAmount] = useState('');
  const [Desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const route = useRoute();
  const fetchBenProdUsrDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const accountDtlzx: any = await client.graphql({
        query: getLinkBeneficiary2,
        variables: {
          beneficiaryID: route.params.beneficiaryID
        }
      });
      const {
        prodID: prodIDs,
        benefitsID: benefitsIDs,
        benefactorAc: benefactorAcs,
        benefactorPhone: benefactorPhones,
        beneficiaryAc: beneficiaryAcs,
        beneficiaryPhone: beneficiaryPhones,
        creatorEmail: creatorEmails,
        prodName: prodNames,
        creatorName: creatorNames,
        prodCost: prodCosts,
        benefitsAmount: benefitsAmounts,
        beneficiaryType: beneficiaryTypes,
        prodDesc: prodDescs,
        benefitStatus: benefitStatuss,
        amount: amountsx
      } = accountDtlzx.data.getLinkBeneficiary2;
      const fetchSenderUsrDtls = async () => {
        try {
          const accountDtl: any = await client.graphql({
            query: getBizna,
            variables: {
              BusKntct: SenderNatId
            }
          });
          const benefitsAmountsz = accountDtl.data.getBizna.benefitsAmount;
          const usrPW = accountDtl.data.getBizna.pw;
          const busNames = accountDtl.data.getBizna.busName;
          const SenderSub = accountDtl.data.getBizna.owner;
          const noBL = accountDtl.data.getBizna.noBL;
          const statuss = accountDtl.data.getBizna.status;
          const fetchCompDtls = async () => {
            try {
              const CompDtls: any = await client.graphql({
                query: getCompany,
                variables: {
                  AdminId: "BaruchHabaB'ShemAdonai2"
                }
              });
              const UsrTransferFee = CompDtls.data.getCompany.biznaTransferFee;
              const TotalTransacted = parseFloat(amounts) + parseFloat(UsrTransferFee) * parseFloat(amounts);
              const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
              const companyEarnings = CompDtls.data.getCompany.companyEarning;
              const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
              const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM;
              const fetchRecUsrDtls = async () => {
                try {
                  const RecAccountDtl: any = await client.graphql({
                    query: getBizna,
                    variables: {
                      BusKntct: benefactorPhones
                    }
                  });
                  const netEarnings = RecAccountDtl.data.getBizna.netEarnings;
                  const statussx = RecAccountDtl.data.getBizna.status;
                  const prodCreatorName = RecAccountDtl.data.getBizna.busName;
                  const sendSMNonLn = async () => {
                    try {
                      await client.graphql({
                        query: createBenefitShare2,
                        variables: {
                          input: {
                            benefitsID: busNames,
                            benefactorAc: benefactorAcs,
                            amount: parseFloat(amounts).toFixed(2),
                            benefactorPhone: benefactorPhones,
                            beneficiaryAc: beneficiaryAcs,
                            beneficiaryPhone: beneficiaryPhones,
                            creatorEmail: attributes.email,
                            owner: userInfo.userId,
                            prodName: prodNames,
                            creatorName: creatorNames,
                            prodCost: prodCosts,
                            benefitsAmount: parseFloat(benefitsAmounts) + parseFloat(benefitsAmountsz),
                            beneficiaryType: SenderNatId,
                            prodDesc: prodCreatorName,
                            benefitStatus: benefitStatuss
                          }
                        }
                      });
                    } catch (error) {
                      Alert.alert('Sharing unsuccessful; Retry');
                      return;
                    }
                    await updtSendrAc();
                  };
                  const updtSendrAc = async () => {
                    try {
                      await client.graphql({
                        query: updateBizna,
                        variables: {
                          input: {
                            BusKntct: SenderNatId,
                            benefitsAmount: (parseFloat(benefitsAmountsz) - TotalTransacted).toFixed(2)
                          }
                        }
                      });
                    } catch (error) {
                      Alert.alert('Error! Enter details correctly');
                      return;
                    }
                    await updtLinkedBenefits();
                  };
                  const updtLinkedBenefits = async () => {
                    try {
                      await client.graphql({
                        query: updateLinkBeneficiary2,
                        variables: {
                          input: {
                            beneficiaryID: route.params.beneficiaryID,
                            benefitsAmount: (parseFloat(benefitsAmounts) + parseFloat(amounts)).toFixed(2)
                          }
                        }
                      });
                    } catch (error) {
                      Alert.alert('Retry or update app or call customer care');
                      return;
                    }
                    await updtRecAc();
                  };
                  const updtRecAc = async () => {
                    try {
                      await client.graphql({
                        query: updateBizna,
                        variables: {
                          input: {
                            BusKntct: benefactorPhones,
                            netEarnings: (parseFloat(netEarnings) + parseFloat(amounts)).toFixed(2)
                          }
                        }
                      });
                    } catch (error) {
                      Alert.alert('Retry or update app or call customer care');
                      return;
                    }
                    await updtComp();
                  };
                  const updtComp = async () => {
                    try {
                      await client.graphql({
                        query: updateCompany,
                        variables: {
                          input: {
                            AdminId: "BaruchHabaB'ShemAdonai2",
                            companyEarningBal: parseFloat(UsrTransferFee) * parseFloat(amounts) + parseFloat(companyEarningBals),
                            companyEarning: parseFloat(UsrTransferFee) * parseFloat(amounts) + parseFloat(companyEarnings),
                            ttlNonLonssRecSM: parseFloat(amounts) + parseFloat(ttlNonLonssRecSMs),
                            ttlNonLonssSentSM: parseFloat(amounts) + parseFloat(ttlNonLonssSentSMs)
                          }
                        }
                      });
                    } catch (error) {
                      Alert.alert('Check your internet connection');
                      return;
                    }
                    Alert.alert('Amount:Ksh. ' + parseFloat(amounts).toFixed(2) + ' Transaction: Ksh. ' + (parseFloat(UsrTransferFee) * parseFloat(amounts)).toFixed(2));
                    Communications.textWithoutEncoding(beneficiaryPhones, 'Confirmed. ' + busNames + ' Benefactor has sent you Ksh. ' + amounts + ' as Benefits. Please confirm this transaction record is on your Mifedha app. Thank you. MiFedha');
                    setIsLoading(false);
                  };
                  if (statuss !== 'AccountActive') {
                    Alert.alert('Beneficiary account is inactive');
                  } else if (statussx !== 'AccountActive') {
                    Alert.alert('Benefactor account is inactive');
                  } else if (parseFloat(benefitsAmountsz) < TotalTransacted) {
                    Alert.alert('Requested amount is more than your Benefits');
                  } else if (benefitStatuss !== 'Active') {
                    Alert.alert('This Beneficiary linkage is not active');
                  } else if (noBL > 0) {
                    Alert.alert('Please first clear your lenders');
                  } else if (usrPW !== SnderPW) {
                    Alert.alert('Wrong Business Password');
                  } else if (userInfo.userId !== SenderSub) {
                    Alert.alert('You do not own this business');
                  } else {
                    await sendSMNonLn();
                  }
                } catch (e) {
                  console.log(e);
                  if (e) {
                    Alert.alert('Retry or update app or call customer care');
                    return;
                  }
                }
              };
              await fetchRecUsrDtls();
            } catch (e) {
              console.log(e);
              if (e) {
                Alert.alert('Retry or update app or call customer care');
                return;
              }
            }
          };
          await fetchCompDtls();
        } catch (e) {
          console.log(e);
          if (e) {
            Alert.alert('Retry or update app or call customer care');
            return;
          }
        }
      };
      await fetchSenderUsrDtls();
    } catch (e) {
      console.log(e);
      if (e) {
        Alert.alert('Retry or update app or call customer care');
        return;
      }
    }
    setIsLoading(false);
    setSenderNatId('');
    setAmount('');
    setRecNatId('');
    setDesc('');
    setSnderPW('');
  };
  return <LinearGradient colors={['#e58d29', 'skyblue']} start={[0, 0]} end={[1, 1]} style={{
    flex: 1
  }}>
                                <View style={styles.container}>
                                  <ScrollView>
              
                        <View style={styles.formContainer}>
                          <TextInput placeholder="My Business Phone Number" value={SenderNatId} onChangeText={setSenderNatId} style={styles.input} editable={true}></TextInput>

                            <TextInput placeholder="Amount to share" value={amounts} onChangeText={setAmount} style={styles.input} keyboardType={"decimal-pad"} editable={true}></TextInput>


                          
                          
                         <View style={styles.passwordContainer}>
                                                                       <TextInput placeholder="Business/Company Account Password" style={styles.passwordInput} value={SnderPW} onChangeText={setSnderPW} secureTextEntry={!isPasswordVisible} placeholderTextColor="#ccc" />
                                                                     <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                                    <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                                     </TouchableOpacity>
                                                                     </View>
                           
                                                                    
                        <TouchableOpacity onPress={fetchBenProdUsrDtls} style={styles.button}>
                          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.locationText}>Submit</Text>}
                                                </TouchableOpacity>
                                              </View>
                                            </ScrollView>
                                          </View>
                                        </LinearGradient>;
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20
  },
  loanTitleView: {
    marginBottom: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center'
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingLeft: 10
  },
  button: {
    backgroundColor: '#e58d29',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  locationContainer: {
    marginVertical: 10
  },
  locationText: {
    fontSize: 16,
    color: '#333'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    height: 50
  },
  passwordInput: {
    flex: 1,
    padding: 12
  }
});
export default SMASendNonLns;