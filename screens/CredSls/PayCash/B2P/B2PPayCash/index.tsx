import React, { useEffect, useState } from 'react';
import { createSMLoansCovered, createNonLoans, updateCompany, updateSMAccount, updateBizna, createBizSls, updateBizSlsReq, createBenefitContributions2 } from '../../../../../src/graphql/mutations';
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

      // Loan checks
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

      // Sender business details
      const senderBiz: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: senderPhn
        }
      });
      const SenderUsrBal = senderBiz.data.getBizna.netEarnings;
      const bizBeneficiaryz = senderBiz.data.getBizna.bizBeneficiary;
      const Benefactornamexs = senderBiz.data.getBizna.busName;
      const ownerz = senderBiz.data.getBizna.owner;
      const SenderAcstatus = senderBiz.data.getBizna.status;
      const objectionStatus = senderBiz.data.getBizna.objectionStatus;
      const BizBenefitsAmount = senderBiz.data.getBizna.benefitsAmount;

      // Company details
      const CompDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const UsrTransferFee = CompDtls.data.getCompany.userTransferFee;
      const UsrTransferFeeAmt = UsrTransferFee * parseFloat(amount);
      const b2pBenCom = CompDtls.data.getCompany.b2pBenCom;
      const biznaCashSaleFee = CompDtls.data.getCompany.userTransferFee;
      const biznaCashSaleFeeAmt = parseFloat(biznaCashSaleFee) * parseFloat(amount);
      const UsrTransferFee2 = parseFloat(SenderUsrBal) - parseFloat(amount);
      const TotalTransacted = parseFloat(amount) + parseFloat(biznaCashSaleFee) * parseFloat(amount);
      const BizBenPercentage = parseFloat(b2pBenCom) * parseFloat(biznaCashSaleFee);
      const BizBenefits = BizBenPercentage * parseFloat(amount);
      const CompEarnings = biznaCashSaleFeeAmt - 2 * BizBenefits;
      const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
      const companyEarnings = CompDtls.data.getCompany.companyEarning;
      const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
      const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM;

      // Receiver account
      const RecAccountDtl: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: recPhn
        }
      });
      const RecUsrBal = RecAccountDtl.data.getSMAccount.balance;
      const beneficiary = RecAccountDtl.data.getSMAccount.beneficiary;
      const Benefactorname = RecAccountDtl.data.getSMAccount.name;
      const RecbenefitsAmount = RecAccountDtl.data.getSMAccount.benefitsAmount;
      const RecAcstatus = RecAccountDtl.data.getSMAccount.status;

      // Cascade functions preserved
      async function sendSMNonLn7() {
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
        await updtSendrAc7();
      }
      async function updtSendrAc7() {
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: senderPhn,
              netEarnings: (parseFloat(SenderUsrBal) - TotalTransacted).toFixed(0),
              benefitsAmount: BizBenefits + parseFloat(BizBenefitsAmount)
            }
          }
        });
        await updtRecAc7();
      }
      async function updtRecAc7() {
        await client.graphql({
          query: updateSMAccount,
          variables: {
            input: {
              awsemail: recPhn,
              benefitsAmount: parseFloat(RecbenefitsAmount) + BizBenefits,
              balance: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0)
            }
          }
        });
        await createBizBenefits1();
      }
      async function createBizBenefits1() {
        await client.graphql({
          query: createBenefitContributions2,
          variables: {
            input: {
              benefitsID: "String",
              benefactorAc: recPhn,
              benefactorPhone: Benefactorname,
              beneficiaryAc: senderPhn,
              beneficiaryPhone: "String",
              creatorEmail: attributes.email,
              prodName: "String",
              creatorName: "String",
              owner: userInfo.userId,
              prodCost: 0,
              benefitsAmount: BizBenefits,
              beneficiaryType: "Pal",
              prodDesc: "String",
              benefitStatus: "Active",
              amount: BizBenefits
            }
          }
        });
        await updtComp7();
      }
      async function updtComp7() {
        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: "BaruchHabaB'ShemAdonai2",
              companyEarningBal: CompEarnings + parseFloat(companyEarningBals),
              companyEarning: CompEarnings + parseFloat(companyEarnings),
              ttlNonLonssRecSM: parseFloat(amount) + parseFloat(ttlNonLonssRecSMs),
              ttlNonLonssSentSM: parseFloat(amount) + parseFloat(ttlNonLonssSentSMs)
            }
          }
        });
        await createBizBenefits2();
      }
      async function createBizBenefits2() {
        await client.graphql({
          query: createBenefitContributions2,
          variables: {
            input: {
              benefitsID: "String",
              benefactorAc: senderPhn,
              benefactorPhone: Benefactornamexs,
              beneficiaryAc: recPhn,
              beneficiaryPhone: "String",
              creatorEmail: attributes.email,
              prodName: "String",
              creatorName: "String",
              owner: userInfo.userId,
              prodCost: 0,
              benefitsAmount: BizBenefits,
              beneficiaryType: "Pal",
              prodDesc: "String",
              benefitStatus: "Active",
              amount: BizBenefits
            }
          }
        });
        await updtLnReqAc7();
      }
      async function updtLnReqAc7() {
        const upcredsl = await client.graphql({
          query: updateBizSlsReq,
          variables: {
            input: {
              id: route.params.id,
              status: "Approved"
            }
          }
        });
        if (upcredsl?.data?.updateBizSlsReq) {
          Alert.alert("Success", `Amount: Ksh. ${parseFloat(amount).toFixed(0)}. Transaction fee: Ksh. ${UsrTransferFeeAmt.toFixed(0)}`);
        }
      }

      // Final conditional checks
      if (RecAcstatus === "AccountInactive") {
        Alert.alert("Receiver account is inactive");
      } else if (SenderAcstatus === "AccountInactive") {
        Alert.alert("Sender account is inactive");
      } else if (objectionStatus === "Objected") {
        Alert.alert("Business account locked by the creator or admin");
      } else if (TotalTransacted > SenderUsrBal) {
        Alert.alert("Your account balance is insufficient");
      } else if (Lonees3.data.listCovCreditSellers.items.length > 0) {
        SndChmMmbrMny();
      } else {
        await sendSMNonLn7();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Retry or update app or call customer care");
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