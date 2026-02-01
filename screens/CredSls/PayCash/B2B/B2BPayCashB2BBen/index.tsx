import React, { useEffect, useState } from 'react';
import { updateCompany, updateBizna, createBizSls, updateBizSlsReq, createBenefitContributions2 } from '../../../../../src/graphql/mutations';
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
      const fetchCLCrdSl = async () => {
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
        const fetchCLChm = async () => {
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
          const fetchSenderUsrDtls = async () => {
            const senderBiz: any = await client.graphql({
              query: getBizna,
              variables: {
                BusKntct: senderPhn
              }
            });
            const SenderUsrBal = senderBiz.data.getBizna.netEarnings;
            const bizBeneficiaryz = senderBiz.data.getBizna.bizBeneficiary;
            const SenderbizType = senderBiz.data.getBizna.bizType;
            const senderBusName = senderBiz.data.getBizna.busName;
            const ownerz = senderBiz.data.getBizna.owner;
            const SenderAcstatus = senderBiz.data.getBizna.status;
            const pw = senderBiz.data.getBizna.pw;
            const SenderbenefitsAmount = senderBiz.data.getBizna.benefitsAmount;
            const objectionStatus = senderBiz.data.getBizna.objectionStatus;
            const CompDtls: any = await client.graphql({
              query: getCompany,
              variables: {
                AdminId: "BaruchHabaB'ShemAdonai2"
              }
            });
            const b2bBenCom = CompDtls.data.getCompany.b2bBenCom;
            const biznaCashSaleFee = CompDtls.data.getCompany.userTransferFee;
            const biznaCashSaleFeeAmt = parseFloat(biznaCashSaleFee) * parseFloat(amount);
            const UsrTransferFee2 = parseFloat(SenderUsrBal) - parseFloat(amount);
            const TotalTransacted = parseFloat(amount) + parseFloat(biznaCashSaleFee) * parseFloat(amount);
            const TotalTransacted2 = parseFloat(amount) + UsrTransferFee2;
            const BizBenPercentage = parseFloat(b2bBenCom) * parseFloat(biznaCashSaleFee);
            const BizBenefits = BizBenPercentage * parseFloat(amount);
            const CompEarnings = biznaCashSaleFeeAmt - 2 * BizBenefits;
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
            const RecBusName = RecAccountDtl.data.getBizna.busName;
            const RecbenefitsAmount = RecAccountDtl.data.getBizna.benefitsAmount;
            const RecAcstatus = RecAccountDtl.data.getBizna.status;
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
              await client.graphql({
                query: updateBizna,
                variables: {
                  input: {
                    BusKntct: senderPhn,
                    netEarnings: (parseFloat(SenderUsrBal) - TotalTransacted).toFixed(0),
                    benefitsAmount: parseFloat(SenderbenefitsAmount) + BizBenefits
                  }
                }
              });
              await client.graphql({
                query: createBenefitContributions2,
                variables: {
                  input: {
                    benefitsID: "String",
                    benefactorAc: recPhn,
                    benefactorPhone: RecBusName,
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
              await client.graphql({
                query: updateBizna,
                variables: {
                  input: {
                    BusKntct: recPhn,
                    netEarnings: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0),
                    earningsBal: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0),
                    benefitsAmount: parseFloat(RecbenefitsAmount) + BizBenefits
                  }
                }
              });
              await client.graphql({
                query: createBenefitContributions2,
                variables: {
                  input: {
                    benefitsID: "String",
                    benefactorAc: senderPhn,
                    benefactorPhone: senderBusName,
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
              const response = await client.graphql({
                query: updateBizSlsReq,
                variables: {
                  input: {
                    id: route.params.id,
                    status: "Approved"
                  }
                }
              });
              if (response?.data?.updateBizSlsReq) {
                Alert.alert("Success", `Amount: Ksh. ${parseFloat(amount).toFixed(0)}. Transaction fee: Ksh. ${biznaCashSaleFeeAmt.toFixed(0)}`);
              } else {
                Alert.alert("Update failed", "No response or invalid response from the database.");
              }
            } // end sendSMNonLn7

            // Authorization and conditional checks preserved
            if (userInfo.userId !== ownerz && ![senderBiz.data.getBizna.Admin1, senderBiz.data.getBizna.Admin2, senderBiz.data.getBizna.Admin3, senderBiz.data.getBizna.Admin4, senderBiz.data.getBizna.Admin5, senderBiz.data.getBizna.Admin6, senderBiz.data.getBizna.Admin7, senderBiz.data.getBizna.Admin8, senderBiz.data.getBizna.Admin9, senderBiz.data.getBizna.Admin10, senderBiz.data.getBizna.Admin11, senderBiz.data.getBizna.Admin12, senderBiz.data.getBizna.Admin13, senderBiz.data.getBizna.Admin14, senderBiz.data.getBizna.Admin15, senderBiz.data.getBizna.Admin16, senderBiz.data.getBizna.Admin17, senderBiz.data.getBizna.Admin18, senderBiz.data.getBizna.Admin19, senderBiz.data.getBizna.Admin20, senderBiz.data.getBizna.Admin21, senderBiz.data.getBizna.Admin22, senderBiz.data.getBizna.Admin23, senderBiz.data.getBizna.Admin24, senderBiz.data.getBizna.Admin25, senderBiz.data.getBizna.Admin26, senderBiz.data.getBizna.Admin27, senderBiz.data.getBizna.Admin28, senderBiz.data.getBizna.Admin29, senderBiz.data.getBizna.Admin30, senderBiz.data.getBizna.Admin31, senderBiz.data.getBizna.Admin32, senderBiz.data.getBizna.Admin33, senderBiz.data.getBizna.Admin34, senderBiz.data.getBizna.Admin35, senderBiz.data.getBizna.Admin36, senderBiz.data.getBizna.Admin37, senderBiz.data.getBizna.Admin38, senderBiz.data.getBizna.Admin39, senderBiz.data.getBizna.Admin40, senderBiz.data.getBizna.Admin41, senderBiz.data.getBizna.Admin42, senderBiz.data.getBizna.Admin43, senderBiz.data.getBizna.Admin44, senderBiz.data.getBizna.Admin45, senderBiz.data.getBizna.Admin46, senderBiz.data.getBizna.Admin47, senderBiz.data.getBizna.Admin48, senderBiz.data.getBizna.Admin49, senderBiz.data.getBizna.Admin50].includes(attributes.email)) {
              Alert.alert("Unauthorised to pay on behalf of the business!");
              return;
            }
            if (RecAcstatus === "AccountInactive") {
              Alert.alert("Receiver account is inactive");
            } else if (SenderAcstatus === "AccountInactive") {
              Alert.alert("Sender account is inactive");
            } else if (objectionStatus === "Objected") {
              Alert.alert("Business account locked by the creator or admin");
            } else if (Lonees3.data.listCovCreditSellers.items.length > 0) {
              SndChmMmbrMny();
            } else if (TotalTransacted > SenderUsrBal) {
              Alert.alert("Your account balance is insufficient");
            } else {
              await sendSMNonLn7();
            }
          }; // end fetchSenderUsrDtls

          await fetchSenderUsrDtls();
        }; // end fetchCLChm

        await fetchCLChm();
      }; // end fetchCLCrdSl

      await fetchCLCrdSl();
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