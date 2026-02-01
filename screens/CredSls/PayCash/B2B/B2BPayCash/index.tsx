import React, { useEffect, useState } from 'react';
import Communications from 'react-native-communications';
import { createSMLoansCovered, createNonLoans, updateCompany, updateSMAccount, updateBizna, createBizSls, updateBizSlsReq } from '../../../../../src/graphql/mutations';
import { getBizSlsReq, getBizna, getCompany, getSMAccount, listCovCreditSellers, listCvrdGroupLoans, listSMLoansCovereds } from '../../../../../src/graphql/queries';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const SMASendNonLns = props => {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps");
  };
  const fetchSaleReqDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const accountDtl: any = await client.graphql({
        query: getBizSlsReq,
        variables: {
          id: route.params.id
        }
      });
      const senderPhn = accountDtl.data.getBizSlsReq.senderPhn;
      const recPhn = accountDtl.data.getBizSlsReq.recPhn;
      const RecName = accountDtl.data.getBizSlsReq.RecName;
      const SenderName = accountDtl.data.getBizSlsReq.SenderName;
      const amount = accountDtl.data.getBizSlsReq.amount;
      const description = accountDtl.data.getBizSlsReq.description;
      const owner = accountDtl.data.getBizSlsReq.owner;
      const attendingAdmin = accountDtl.data.getBizSlsReq.attendingAdmin;
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      // Check loans
      await client.graphql({
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
      await client.graphql({
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
                eq: senderPhn
              }
            }
          }
        }
      });
      await client.graphql({
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
      const senderBiz: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: senderPhn
        }
      });
      const SenderUsrBal = senderBiz.data.getBizna.netEarnings;
      const bizBeneficiaryz = senderBiz.data.getBizna.bizBeneficiary;
      const SenderbizType = senderBiz.data.getBizna.bizType;
      const CompDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const UsrTransferFee = CompDtls.data.getCompany.userTransferFee;
      const UsrTransferFeeAmt = UsrTransferFee * parseFloat(amount);
      const UsrTransferFee2 = parseFloat(SenderUsrBal) - parseFloat(amount);
      const TotalTransacted = parseFloat(amount) + UsrTransferFee * parseFloat(amount);
      const TotalTransacted2 = parseFloat(amount) + UsrTransferFee2;
      const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
      const companyEarnings = CompDtls.data.getCompany.companyEarning;
      const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
      const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM;
      const RecAccountDtl: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: recPhn
        }
      });
      const RecUsrBal = RecAccountDtl.data.getBizna.netEarnings;
      const bizBeneficiary = RecAccountDtl.data.getBizna.bizBeneficiary;
      const RecBizType = RecAccountDtl.data.getBizna.bizType;
      const accountDtl7: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: bizBeneficiaryz
        }
      });
      const SenderUsrBal7 = accountDtl7.data.getSMAccount.balance;
      const senderbeneficiaryAmt = accountDtl7.data.getSMAccount.beneficiaryAmt;
      const accountDtl8: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: bizBeneficiary
        }
      });
      const SenderUsrBal8 = accountDtl8.data.getSMAccount.balance;
      const recbeneficiaryAmt = accountDtl8.data.getSMAccount.beneficiaryAmt;

      // Conditional cascades preserved
      if (SenderUsrBal >= TotalTransacted && SenderbizType !== "Public" && RecBizType !== "Public") {
        await sendSMNonLn13();
      } else if (SenderUsrBal >= TotalTransacted && SenderbizType === "Public" && RecBizType !== "Public") {
        await sendSMNonLn11();
      } else if (SenderUsrBal >= TotalTransacted && SenderbizType !== "Public" && RecBizType === "Public") {
        await sendSMNonLn9();
      } else if (SenderUsrBal >= TotalTransacted && SenderbizType === "Public" && RecBizType === "Public") {
        await sendSMNonLn7();
      }
      async function sendSMNonLn13() {
        await client.graphql({
          query: createBizSls,
          variables: {
            input: {
              saleId: route.params.id,
              recPhn,
              senderPhn,
              amount: parseFloat(amount).toFixed(0),
              description,
              RecName,
              SenderName,
              status: "cashSales",
              owner,
              attendingAdmin
            }
          }
        });
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: senderPhn,
              netEarnings: (parseFloat(SenderUsrBal) - TotalTransacted).toFixed(0)
            }
          }
        });
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: recPhn,
              netEarnings: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0),
              earningsBal: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0)
            }
          }
        });
        await client.graphql({
          query: updateSMAccount,
          variables: {
            input: {
              awsemail: bizBeneficiaryz,
              balance: (UsrTransferFee * parseFloat(amount) * 0.3 + parseFloat(SenderUsrBal7)).toFixed(0),
              beneficiaryAmt: (UsrTransferFee * parseFloat(amount) * 0.3 + parseFloat(senderbeneficiaryAmt)).toFixed(0)
            }
          }
        });
        await client.graphql({
          query: updateSMAccount,
          variables: {
            input: {
              awsemail: bizBeneficiary,
              balance: (UsrTransferFee * parseFloat(amount) * 0.3 + parseFloat(SenderUsrBal8)).toFixed(0),
              beneficiaryAmt: (UsrTransferFee * parseFloat(amount) * 0.3 + parseFloat(recbeneficiaryAmt)).toFixed(0)
            }
          }
        });
        await client.graphql({
          query: updateBizSlsReq,
          variables: {
            input: {
              id: route.params.id,
              status: "Approved"
            }
          }
        });
        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: "BaruchHabaB'ShemAdonai2",
              companyEarningBal: UsrTransferFee * parseFloat(amount) * 0.4 + parseFloat(companyEarningBals),
              companyEarning: UsrTransferFee * parseFloat(amount) * 0.4 + parseFloat(companyEarnings),
              ttlNonLonssRecSM: parseFloat(amount) + parseFloat(ttlNonLonssRecSMs),
              ttlNonLonssSentSM: parseFloat(amount) + parseFloat(ttlNonLonssSentSMs)
            }
          }
        });
        Alert.alert("Amount: Ksh. " + parseFloat(amount).toFixed(0) + ". Transaction fee: Ksh. " + UsrTransferFeeAmt.toFixed(0));
      }
      async function sendSMNonLn11() {
        await client.graphql({
          query: createBizSls,
          variables: {
            input: {
              saleId: route.params.id,
              recPhn,
              senderPhn,
              amount: parseFloat(amount).toFixed(0),
              description,
              RecName,
              SenderName,
              status: "cashSales",
              owner,
              attendingAdmin
            }
          }
        });
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: senderPhn,
              netEarnings: (parseFloat(SenderUsrBal) - TotalTransacted2).toFixed(0)
            }
          }
        });
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: recPhn,
              netEarnings: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0),
              earningsBal: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0)
            }
          }
        });
        await client.graphql({
          query: updateBizSlsReq,
          variables: {
            input: {
              id: route.params.id,
              status: "Approved"
            }
          }
        });
        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: "BaruchHabaB'ShemAdonai2",
              companyEarningBal: UsrTransferFee2 + parseFloat(companyEarningBals),
              companyEarning: UsrTransferFee2 + parseFloat(companyEarnings),
              ttlNonLonssRecSM: parseFloat(amount) + parseFloat(ttlNonLonssRecSMs),
              ttlNonLonssSentSM: parseFloat(amount) + parseFloat(ttlNonLonssSentSMs)
            }
          }
        });
        Alert.alert("Insufficient transaction fees? No worries! Ksh. " + parseFloat(amount).toFixed(0) + " sent!");
      }
      async function sendSMNonLn9() {
        // Same cascade style preserved for Public receiver
        await client.graphql({
          query: createBizSls,
          variables: {
            input: {
              saleId: route.params.id,
              recPhn,
              senderPhn,
              amount: parseFloat(amount).toFixed(0),
              description,
              RecName,
              SenderName,
              status: "cashSales",
              owner,
              attendingAdmin
            }
          }
        });
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: senderPhn,
              netEarnings: (parseFloat(SenderUsrBal) - TotalTransacted).toFixed(0)
            }
          }
        });
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: recPhn,
              netEarnings: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0),
              earningsBal: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0)
            }
          }
        });
        await client.graphql({
          query: updateBizSlsReq,
          variables: {
            input: {
              id: route.params.id,
              status: "Approved"
            }
          }
        });
        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: "BaruchHabaB'ShemAdonai2",
              companyEarningBal: UsrTransferFee * parseFloat(amount) * 0.4 + parseFloat(companyEarningBals),
              companyEarning: UsrTransferFee * parseFloat(amount) * 0.4 + parseFloat(companyEarnings),
              ttlNonLonssRecSM: parseFloat(amount) + parseFloat(ttlNonLonssRecSMs),
              ttlNonLonssSentSM: parseFloat(amount) + parseFloat(ttlNonLonssSentSMs)
            }
          }
        });
        Alert.alert("Public receiver cascade executed successfully.");
      }
      async function sendSMNonLn7() {
        // Cascade for Public sender and Public receiver
        await client.graphql({
          query: createBizSls,
          variables: {
            input: {
              saleId: route.params.id,
              recPhn,
              senderPhn,
              amount: parseFloat(amount).toFixed(0),
              description,
              RecName,
              SenderName,
              status: "cashSales",
              owner,
              attendingAdmin
            }
          }
        });
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: senderPhn,
              netEarnings: (parseFloat(SenderUsrBal) - TotalTransacted2).toFixed(0)
            }
          }
        });
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: recPhn,
              netEarnings: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0),
              earningsBal: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0)
            }
          }
        });
        await client.graphql({
          query: updateBizSlsReq,
          variables: {
            input: {
              id: route.params.id,
              status: "Approved"
            }
          }
        });
        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: "BaruchHabaB'ShemAdonai2",
              companyEarningBal: UsrTransferFee2 + parseFloat(companyEarningBals),
              companyEarning: UsrTransferFee2 + parseFloat(companyEarnings),
              ttlNonLonssRecSM: parseFloat(amount) + parseFloat(ttlNonLonssRecSMs),
              ttlNonLonssSentSM: parseFloat(amount) + parseFloat(ttlNonLonssSentSMs)
            }
          }
        });
        Alert.alert("Public sender & receiver cascade executed successfully.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Transaction failed. Please retry or update your app.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSaleReqDtls();
  }, []);
  return <View style={styles.image}>
    <Text style={styles.sendAmtButtonText}>Please wait for feedback</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
    </View>;
};
export default SMASendNonLns;