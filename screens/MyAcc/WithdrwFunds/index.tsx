import React, { useEffect, useState } from 'react';
import { createFloatAdd, updateAgent, updateCompany, updateSAgent, updateSMAccount } from '../../../src/graphql/mutations';
import { getAgent, getCompany, getSAgent, getSMAccount, listCovCreditSellers, listCvrdGroupLoans, listGroupNonLoans, listSMLoansCovereds } from '../../../src/graphql/queries';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import Navigation from '../../../navigation';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const SMADepositForm = props => {
  const [UsrPWd, setUsrPWd] = useState("");
  const [AgentPhn, setAgentPhn] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps");
  };
  const fetchAcDtls = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const accountDtl: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const usrBala = accountDtl.data.getSMAccount.balance;
      const TtlWthdrwnSMs = accountDtl.data.getSMAccount.TtlWthdrwnSM;
      const usrStts = accountDtl.data.getSMAccount.acStatus;
      const withdrawalLimits = accountDtl.data.getSMAccount.withdrawalLimit;
      const pws = accountDtl.data.getSMAccount.pw;
      const owners = accountDtl.data.getSMAccount.owner;
      const names = accountDtl.data.getSMAccount.name;
      const fetchCvLnSM = async () => {
        setLoading(true);
        try {
          const Lonees1: any = await client.graphql({
            query: listSMLoansCovereds,
            variables: {
              filter: {
                and: {
                  status: {
                    eq: "LoanBL"
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
            setLoading(true);
            try {
              const Lonees3: any = await client.graphql({
                query: listCovCreditSellers,
                variables: {
                  filter: {
                    and: {
                      status: {
                        eq: "LoanBL"
                      },
                      lonBala: {
                        gt: 0
                      },
                      buyerContact: {
                        eq: attributes.email
                      }
                    }
                  }
                }
              });
              const fetchCLChm = async () => {
                setLoading(true);
                try {
                  const Lonees5: any = await client.graphql({
                    query: listCvrdGroupLoans,
                    variables: {
                      filter: {
                        and: {
                          status: {
                            eq: "LoanBL"
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
                  const fetchAgtBal = async () => {
                    if (isLoading) {
                      return;
                    }
                    setIsLoading(true);
                    try {
                      const AgentBal: any = await client.graphql({
                        query: getAgent,
                        variables: {
                          phonecontact: AgentPhn
                        }
                      });
                      const TtlFltInsss = AgentBal.data.getAgent.TtlFltIn;
                      const floatBals = AgentBal.data.getAgent.floatBal;
                      const ttlEarningssss = AgentBal.data.getAgent.ttlEarnings;
                      const agentEarningBalsss = AgentBal.data.getAgent.agentEarningBal;
                      const AgAcAct = AgentBal.data.getAgent.status;
                      const sagentregnos = AgentBal.data.getAgent.sagentregno;
                      const namess = AgentBal.data.getAgent.name;
                      const MFNWithdrwlFees = AgentBal.data.getAgent.MFNWithdrwlFee;
                      const gtCompDtls = async () => {
                        if (isLoading) {
                          return;
                        }
                        setIsLoading(true);
                        try {
                          const compDtls: any = await client.graphql({
                            query: getCompany,
                            variables: {
                              AdminId: "BaruchHabaB'ShemAdonai2"
                            }
                          });
                          const ttlUserWthdrwls = compDtls.data.getCompany.ttlUserWthdrwl;
                          const agentComs = compDtls.data.getCompany.agentCom;
                          const sagentComs = compDtls.data.getCompany.sagentCom;
                          const companyComs = compDtls.data.getCompany.companyCom;
                          const UsrWthdrwlFeess = compDtls.data.getCompany.UsrWthdrwlFees;
                          const ChampCom = compDtls.data.getCompany.ChampCom;
                          const companyEarningBals = compDtls.data.getCompany.companyEarningBal;
                          const companyEarnings = compDtls.data.getCompany.companyEarning;
                          const agentEarningBals = compDtls.data.getCompany.agentEarningBal;
                          const agentEarnings = compDtls.data.getCompany.agentEarning;
                          const saEarningBals = compDtls.data.getCompany.saEarningBal;
                          const saEarnings = compDtls.data.getCompany.saEarning;
                          const agentFloatIns = compDtls.data.getCompany.agentFloatIn;
                          const gtsaDtls = async () => {
                            if (isLoading) {
                              return;
                            }
                            setIsLoading(true);
                            try {
                              const compDtlscxv: any = await client.graphql({
                                query: getSAgent,
                                variables: {
                                  saPhoneContact: sagentregnos
                                }
                              });
                              const TtlEarningss = compDtlscxv.data.getSAgent.TtlEarnings;
                              const saBalances = compDtlscxv.data.getSAgent.saBalance;
                              const acChamp = compDtlscxv.data.getSAgent.acChamp;
                              const namessssssss = compDtlscxv.data.getSAgent.name;
                              const MFKWithdrwlFees = compDtlscxv.data.getSAgent.MFKWithdrwlFee;
                              const AgentCommission = (parseFloat(agentComs) - parseFloat(MFNWithdrwlFees)) / 100 * parseFloat(amount) * parseFloat(UsrWthdrwlFeess);
                              const saCommission = (parseFloat(sagentComs) - parseFloat(MFKWithdrwlFees)) / 100 * parseFloat(amount) * parseFloat(UsrWthdrwlFeess);
                              const compCommission = parseFloat(companyComs) / 100 * parseFloat(amount) * parseFloat(UsrWthdrwlFeess);
                              const ChampCommission = parseFloat(ChampCom) / 100 * parseFloat(amount) * parseFloat(UsrWthdrwlFeess);
                              const UsrWithdrawalFee = AgentCommission + saCommission + compCommission + ChampCommission;
                              const TTlAmtTrnsctd = parseFloat(amount) + UsrWithdrawalFee;
                              const gtMFChamp = async () => {
                                if (isLoading) {
                                  return;
                                }
                                setIsLoading(true);
                                try {
                                  const compDtlsx: any = await client.graphql({
                                    query: getSMAccount,
                                    variables: {
                                      awsemail: acChamp
                                    }
                                  });
                                  const balancesx = compDtlsx.data.getSMAccount.mfchampEarnings;
                                  const CrtFltAdd = async () => {
                                    try {
                                      await client.graphql({
                                        query: createFloatAdd,
                                        variables: {
                                          input: {
                                            withdrawerid: attributes.email,
                                            agentPhonecontact: AgentPhn,
                                            sagentId: sagentregnos,
                                            owner: userInfo.userId,
                                            amount: parseFloat(amount),
                                            agentName: namess,
                                            userName: names,
                                            saName: namessssssss,
                                            saPhone: sagentregnos,
                                            status: "AccountActive"
                                          }
                                        }
                                      });
                                      await onUpdtUsrBal();
                                    } catch (error) {
                                      Alert.alert("Withdrawal unsuccessful; Retry");
                                      console.error(error);
                                    }
                                  };
                                  const onUpdtUsrBal = async () => {
                                    try {
                                      await client.graphql({
                                        query: updateSMAccount,
                                        variables: {
                                          input: {
                                            awsemail: attributes.email,
                                            balance: parseFloat(usrBala) - TTlAmtTrnsctd,
                                            TtlWthdrwnSM: parseFloat(TtlWthdrwnSMs) + parseFloat(amount)
                                          }
                                        }
                                      });
                                      await onUpdtAgntBal();
                                    } catch (error) {
                                      Alert.alert("Retry, or update app or call customer care");
                                      console.error(error);
                                    }
                                  };
                                  const onUpdtAgntBal = async () => {
                                    try {
                                      await client.graphql({
                                        query: updateAgent,
                                        variables: {
                                          input: {
                                            phonecontact: AgentPhn,
                                            ttlEarnings: parseFloat(ttlEarningssss) + AgentCommission,
                                            agentEarningBal: parseFloat(agentEarningBalsss) + AgentCommission,
                                            floatBal: parseFloat(floatBals) + parseFloat(amount),
                                            TtlFltIn: parseFloat(TtlFltInsss) + parseFloat(amount)
                                          }
                                        }
                                      });
                                      await onUpdtsaDtls();
                                    } catch (error) {
                                      Alert.alert("Retry, or update app or call customer care");
                                      console.error(error);
                                    }
                                  };
                                  const onUpdtsaDtls = async () => {
                                    try {
                                      await client.graphql({
                                        query: updateSAgent,
                                        variables: {
                                          input: {
                                            saPhoneContact: sagentregnos,
                                            TtlEarnings: parseFloat(TtlEarningss) + saCommission,
                                            saBalance: parseFloat(saBalances) + saCommission
                                          }
                                        }
                                      });
                                      await onUpdtMFChamp();
                                    } catch (error) {
                                      Alert.alert("Retry, or update app or call customer care");
                                      console.error(error);
                                    }
                                  };
                                  const onUpdtMFChamp = async () => {
                                    try {
                                      await client.graphql({
                                        query: updateSMAccount,
                                        variables: {
                                          input: {
                                            awsemail: acChamp,
                                            mfchampEarnings: (ChampCommission + balancesx).toFixed(0)
                                          }
                                        }
                                      });
                                      await onUpdtCompDtls();
                                    } catch (error) {
                                      console.log(error);
                                      if (error) {
                                        Alert.alert("Retry, or update app or call customer care");
                                        return;
                                      }
                                    }
                                  };
                                  const onUpdtCompDtls = async () => {
                                    try {
                                      await client.graphql({
                                        query: updateCompany,
                                        variables: {
                                          input: {
                                            AdminId: "BaruchHabaB'ShemAdonai2",
                                            companyEarningBal: parseFloat(companyEarningBals) + compCommission,
                                            companyEarning: parseFloat(companyEarnings) + compCommission,
                                            agentEarningBal: parseFloat(agentEarningBals) + AgentCommission,
                                            agentEarning: parseFloat(agentEarnings) + AgentCommission,
                                            saEarningBal: parseFloat(saEarningBals) + saCommission,
                                            saEarning: parseFloat(saEarnings) + saCommission,
                                            ttlUserWthdrwl: parseFloat(ttlUserWthdrwls) + parseFloat(amount),
                                            agentFloatIn: parseFloat(agentFloatIns) + parseFloat(amount)
                                          }
                                        }
                                      });
                                      Alert.alert(`${names} has withdrawn Ksh. ${parseFloat(amount).toFixed(2)} from ${namess} MFNdogo`);
                                    } catch (error) {
                                      Alert.alert("Retry, update app or call customer care");
                                      console.error(error);
                                    }
                                  };
                                  if (TTlAmtTrnsctd > parseFloat(usrBala)) {
                                    Alert.alert(`Cancelled. Bal: ${usrBala}. Deductable: ${TTlAmtTrnsctd.toFixed(2)}. ${(TTlAmtTrnsctd - parseFloat(usrBala)).toFixed(2)} more needed`);
                                    setIsLoading(false);
                                    return;
                                  }
                                  if (usrStts === "AccountInactive") {
                                    Alert.alert("User Account has been deactivated");
                                    setIsLoading(false);
                                    return;
                                  }
                                  if (userInfo.userId !== owners) {
                                    Alert.alert("You cannot withdraw from another account");
                                    setIsLoading(false);
                                    return;
                                  }
                                  if (parseFloat(amount) > parseFloat(withdrawalLimits)) {
                                    Alert.alert("Withdrawal limit exceeded");
                                    setIsLoading(false);
                                    return;
                                  }
                                  if (AgAcAct === "AccountInactive") {
                                    Alert.alert("MFNdogo Account has been deactivated");
                                    setIsLoading(false);
                                    return;
                                  }
                                  if (UsrPWd !== pws) {
                                    Alert.alert("User credentials are wrong; access denied");
                                    setIsLoading(false);
                                    return;
                                  }
                                  if (Lonees1.data.listSMLoansCovereds.items.length > 0 || Lonees3.data.listCovCreditSellers.items.length > 0 || Lonees5.data.listCvrdGroupLoans.items.length > 0) {
                                    SndChmMmbrMny();
                                  } else {
                                    await CrtFltAdd();
                                  }
                                } catch (error) {
                                  console.log(error);
                                  if (error) {
                                    Alert.alert("Retry, update app or call customer care");
                                    return;
                                  }
                                }
                                setIsLoading(false);
                              };
                              await gtMFChamp();
                            } catch (error) {
                              console.log(error);
                              if (error) {
                                Alert.alert("Retry, update app or call customer care");
                                return;
                              }
                            }
                            setIsLoading(false);
                          };
                          await gtsaDtls();
                        } catch (error) {
                          console.log(error);
                          if (error) {
                            Alert.alert("Retry, update app or call customer care");
                            return;
                          }
                        }
                        setIsLoading(false);
                      };
                      await gtCompDtls();
                    } catch (e) {
                      console.log(e);
                      if (e) {
                        Alert.alert("Retry, update app or call customer care");
                        return;
                      }
                    }
                    setIsLoading(false);
                  };
                  await fetchAgtBal();
                } catch (e) {
                  console.log(e);
                  if (e) {
                    Alert.alert("Retry, update app or call customer care");
                    return;
                  }
                }
                setIsLoading(false);
              };
              await fetchCLChm();
            } catch (e) {
              console.log(e);
              if (e) {
                Alert.alert("Retry, update app or call customer care");
                return;
              }
            }
            setIsLoading(false);
          };
          await fetchCLCrdSl();
        } catch (e) {
          console.log(e);
          if (e) {
            Alert.alert("Retry, update app or call customer care");
            return;
          }
        }
        setIsLoading(false);
      };
      if (userInfo.userId !== owners) {
        Alert.alert("Please first create main account");
      } else {
        await fetchCvLnSM();
      }
    } catch (e) {
      console.log(e);
      if (e) {
        Alert.alert("Retry, update app or call customer care");
        return;
      }
    }
    setIsLoading(false);
    setAmount("");
    setUsrPWd("");
    setAgentPhn("");
  };
  useEffect(() => {
    const amt = amount;
    if (!amt && amt !== "") {
      setAmount("");
      return;
    }
    setAmount(amt);
  }, [amount]);
  useEffect(() => {
    const UsrPWdss = UsrPWd;
    if (!UsrPWdss && UsrPWdss !== "") {
      setUsrPWd("");
      return;
    }
    setUsrPWd(UsrPWdss);
  }, [UsrPWd]);
  useEffect(() => {
    const agphn = AgentPhn;
    if (!agphn && agphn !== "") {
      setAgentPhn("");
      return;
    }
    setAgentPhn(agphn);
  }, [AgentPhn]);
  return <ScrollView>
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill Details Below</Text>
          </View>
      

          <View style={styles.sendAmtView}>
            <TextInput placeholder="+2547xxxxxxxx" value={AgentPhn} onChangeText={setAgentPhn} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>MFNdogo Phone</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput keyboardType={"decimal-pad"} value={amount} onChangeText={setAmount} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Amount</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput value={UsrPWd} onChangeText={setUsrPWd} secureTextEntry={true} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>User PW</Text>
          </View>

          <TouchableOpacity onPress={fetchAcDtls} style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Click to Withdraw</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>
        </ScrollView>;
};
export default SMADepositForm;