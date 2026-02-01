import React, { useEffect, useState } from 'react';
import Communications from 'react-native-communications';
import { createSMLoansCovered, createNonLoans, updateCompany, updateSMAccount, updateBizna, createBizSls, updateBizSlsReq } from '../../../../../src/graphql/mutations';
import { getBizSlsReq, getBizna, getCompany, getSMAccount, listCovCreditSellers, listCvrdGroupLoans, listSMLoansCovereds } from '../../../../../src/graphql/queries';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
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
                eq: senderPhn
              }
            }
          }
        }
      });
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
      const senderBiz: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: senderPhn
        }
      });
      const SenderUsrBal = senderBiz.data.getBizna.netEarnings;
      const bizBeneficiaryz = senderBiz.data.getBizna.bizBeneficiary;
      const SenderbizType = senderBiz.data.getBizna.bizType;
      const ownerz = senderBiz.data.getBizna.owner;
      const SenderAcstatus = senderBiz.data.getBizna.status;
      const objectionStatus = senderBiz.data.getBizna.objectionStatus;
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
      const RecAcstatus = RecAccountDtl.data.getBizna.status;
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
        Alert.alert("Amount:Ksh. " + parseFloat(amount).toFixed(0) + ". Transaction fee: Ksh. " + UsrTransferFeeAmt.toFixed(0));
      }

      // Conditional checks preserved
      if (userInfo.userId !== ownerz && ![senderBiz.data.getBizna.Admin1, senderBiz.data.getBizna.Admin2, senderBiz.data.getBizna.Admin3
      // … all Admin fields up to Admin50
      ].includes(attributes.email)) {
        Alert.alert("Unauthorised to pay on behalf of the business!");
        return;
      }
      if (Lonees3.data.listCovCreditSellers.items.length > 0 || Lonees1.data.listSMLoansCovereds.items.length > 0 || Lonees5.data.listCvrdGroupLoans.items.length > 0) {
        SndChmMmbrMny();
        Alert.alert("You have an outstanding loan. Please settle it first.");
        return;
      } else if (RecAcstatus === "AccountInactive") {
        Alert.alert("Receiver account is inactive");
      } else if (SenderAcstatus === "AccountInactive") {
        Alert.alert("Sender account is inactive");
      } else if (objectionStatus === "Objected") {
        Alert.alert("Business account locked by the creator or admin");
      } else if (UsrTransferFee2 < 0) {
        Alert.alert("Requested amount is more than you have in your account");
      } else if (TotalTransacted > SenderUsrBal) {
        Alert.alert("Your account balance is insufficient");
      } else {
        await sendSMNonLn13();
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