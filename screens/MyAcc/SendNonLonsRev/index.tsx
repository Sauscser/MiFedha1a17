import React, { useEffect, useState } from 'react';
import { updateCompany, updateSMAccount, updateNonLoans, createNonLoans } from '../../../src/graphql/mutations';
import { getCompany, getNonLoans, getSMAccount } from '../../../src/graphql/queries';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Alert } from 'react-native';
import styles from './styles';
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
  const [SendrPhn, setSendrPhn] = useState(null);
  const [amounts, setAmount] = useState("");
  const [Desc, setDesc] = useState("");
  const [ownr, setownr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const fetchNonLonDtls = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(false);
    try {
      const accountDtl: any = await client.graphql({
        query: getNonLoans,
        variables: {
          id: route.params.id
        }
      });
      const senderPhns = accountDtl.data.getNonLoans.senderPhn;
      const recPhns = accountDtl.data.getNonLoans.recPhn;
      const SenderNames = accountDtl.data.getNonLoans.SenderName;
      const RecNames = accountDtl.data.getNonLoans.RecName;
      const amounts = accountDtl.data.getNonLoans.amount;
      const statuss = accountDtl.data.getNonLoans.status;
      const fetchSenderUsrDtls = async () => {
        if (isLoading) {
          return;
        }
        setIsLoading(false);
        try {
          const accountDtl: any = await client.graphql({
            query: getSMAccount,
            variables: {
              awsemail: recPhns
            }
          });
          const SenderUsrBal = accountDtl.data.getSMAccount.balance;
          const usrPW = accountDtl.data.getSMAccount.pw;
          const usrAcActvStts = accountDtl.data.getSMAccount.acStatus;
          const SenderSub = accountDtl.data.getSMAccount.owner;
          const ttlNonLonsSentSMs = accountDtl.data.getSMAccount.ttlNonLonsSentSM;
          const loanLimits = accountDtl.data.getSMAccount.loanLimit;
          const names = accountDtl.data.getSMAccount.name;
          const fetchCompDtls = async () => {
            if (isLoading) {
              return;
            }
            setIsLoading(true);
            try {
              const CompDtls: any = await client.graphql({
                query: getCompany,
                variables: {
                  AdminId: "BaruchHabaB'ShemAdonai2"
                }
              });
              const UsrTransferFee = CompDtls.data.getCompany.userTransferFee;
              const TotalTransacted = parseFloat(amounts) + parseFloat(UsrTransferFee) * parseFloat(amounts);
              const CompPhoneContact = CompDtls.data.getCompany.phoneContact;
              const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
              const companyEarnings = CompDtls.data.getCompany.companyEarning;
              const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
              const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM;
              console.log(TotalTransacted);
              console.log(SenderUsrBal);
              const fetchRecUsrDtls = async () => {
                if (isLoading) {
                  return;
                }
                setIsLoading(true);
                try {
                  const RecAccountDtl: any = await client.graphql({
                    query: getSMAccount,
                    variables: {
                      awsemail: senderPhns
                    }
                  });
                  const RecUsrBal = RecAccountDtl.data.getSMAccount.balance;
                  const usrAcActvSttss = RecAccountDtl.data.getSMAccount.acStatus;
                  const ttlNonLonsRecSMs = RecAccountDtl.data.getSMAccount.ttlNonLonsRecSM;
                  const namess = RecAccountDtl.data.getSMAccount.name;
                  const sendSMNonLn = async () => {
                    if (isLoading) {
                      return;
                    }
                    setIsLoading(true);
                    try {
                      await client.graphql({
                        query: updateNonLoans,
                        variables: {
                          input: {
                            id: route.params.id,
                            status: "TransactionRev"
                          }
                        }
                      });
                    } catch (error) {
                      if (error) {
                        Alert.alert("Reversal unsuccessful; Retry");
                        return;
                      }
                    }
                    setIsLoading(false);
                    await updtSendrAc();
                  };
                  const updtSendrAc = async () => {
                    if (isLoading) {
                      return;
                    }
                    setIsLoading(true);
                    try {
                      await client.graphql({
                        query: updateSMAccount,
                        variables: {
                          input: {
                            awsemail: recPhns,
                            ttlNonLonsSentSM: (parseFloat(ttlNonLonsSentSMs) + parseFloat(amounts)).toFixed(2),
                            balance: (parseFloat(SenderUsrBal) - amounts).toFixed(2)
                          }
                        }
                      });
                    } catch (error) {
                      if (error) {
                        Alert.alert("Reversal unsuccessful; Retry");
                        return;
                      }
                    }
                    setIsLoading(false);
                    await updtRecAc();
                  };
                  const updtRecAc = async () => {
                    if (isLoading) {
                      return;
                    }
                    setIsLoading(true);
                    try {
                      await client.graphql({
                        query: updateSMAccount,
                        variables: {
                          input: {
                            awsemail: senderPhns,
                            ttlNonLonsRecSM: (parseFloat(ttlNonLonsRecSMs) + parseFloat(amounts)).toFixed(2),
                            balance: (parseFloat(RecUsrBal) + (parseFloat(amounts) - parseFloat(UsrTransferFee) * parseFloat(amounts))).toFixed(2)
                          }
                        }
                      });
                    } catch (error) {
                      console.log(error);
                      if (error) {
                        Alert.alert("Error! Update app or call customer care" + CompPhoneContact);
                        return;
                      }
                    }
                    setIsLoading(false);
                    await updtComp();
                  };
                  const updtComp = async () => {
                    if (isLoading) {
                      return;
                    }
                    setIsLoading(true);
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
                      console.log(error);
                      if (error) {
                        Alert.alert("Error! Update app or call customer care");
                        return;
                      }
                    }
                    Alert.alert("Transaction reversed");
                    setIsLoading(false);
                    await sendSMNonLn2();
                  };
                  const sendSMNonLn2 = async () => {
                    if (isLoading) {
                      return;
                    }
                    setIsLoading(true);
                    try {
                      await client.graphql({
                        query: createNonLoans,
                        variables: {
                          input: {
                            recPhn: senderPhns,
                            senderPhn: recPhns,
                            amount: amounts,
                            description: "Reversed Money",
                            RecName: SenderNames,
                            SenderName: RecNames,
                            status: "SMNonLons",
                            owner: SenderSub
                          }
                        }
                      });
                    } catch (error) {
                      if (error) {
                        Alert.alert("Reversal unsuccessful; Retry");
                        return;
                      }
                    }
                    setIsLoading(false);
                  };
                  if (usrAcActvStts !== "AccountActive") {
                    Alert.alert('Reverser account is inactive');
                  } else if (usrAcActvSttss !== "AccountActive") {
                    Alert.alert('Receiver account is inactive');
                  } else if (statuss === "TransactionRev") {
                    Alert.alert('Transaction already reversed');
                  } else if (parseFloat(SenderUsrBal) < TotalTransacted) {
                    Alert.alert('Reverser cannot facilitate this');
                  } else if (parseFloat(loanLimits) < parseFloat(amounts)) {
                    Alert.alert('Call ' + CompPhoneContact + ' to have your send Amount limit adjusted');
                  } else {
                    sendSMNonLn();
                  }
                } catch (e) {
                  console.log(e);
                  if (e) {
                    Alert.alert("Error! Update app or call customer care");
                    return;
                  }
                }
                setIsLoading(false);
              };
              await fetchRecUsrDtls();
            } catch (e) {
              console.log(e);
              if (e) {
                Alert.alert("Error! Update app or call customer care");
                return;
              }
            }
            setIsLoading(false);
          };
          await fetchCompDtls();
        } catch (e) {
          console.log(e);
          if (e) {
            Alert.alert("Error! Update app or call customer care");
            return;
          }
        }
        ;
      };
      await fetchSenderUsrDtls();
    } catch (e) {
      console.log(e);
      if (e) {
        Alert.alert("Error! Update app or call customer care");
        return;
      }
    }
    ;
    setIsLoading(false);
    setSenderNatId('');
    setAmount("");
    setRecNatId('');
    setDesc("");
    setSnderPW("");
  };
  useEffect(() => {
    fetchNonLonDtls();
  }, []);
  ;
  useEffect(() => {
    const SnderNatIds = SenderNatId;
    if (!SnderNatIds && SnderNatIds !== "") {
      setSenderNatId("");
      return;
    }
    setSenderNatId(SnderNatIds);
  }, [SenderNatId]);
  useEffect(() => {
    const amt = amounts;
    if (!amt && amt !== "") {
      setAmount("");
      return;
    }
    setAmount(amt);
  }, [amounts]);
  useEffect(() => {
    const RecNatIds = RecNatId;
    if (!RecNatIds && RecNatIds !== "") {
      setRecNatId("");
      return;
    }
    setRecNatId(RecNatIds);
  }, [RecNatId]);
  useEffect(() => {
    const descr = Desc;
    if (!descr && descr !== "") {
      setDesc("");
      return;
    }
    setDesc(descr);
  }, [Desc]);
  useEffect(() => {
    const SnderPWss = SnderPW;
    if (!SnderPWss && SnderPWss !== "") {
      setSnderPW("");
      return;
    }
    setSnderPW(SnderPWss);
  }, [SnderPW]);
  return <View>
     
    </View>;
};
export default SMASendNonLns;