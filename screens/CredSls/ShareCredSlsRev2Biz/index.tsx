import React, { useEffect, useState } from 'react';
import Communications from 'react-native-communications';
import { createNonLoans, updateCompany, updateSMAccount, updateBizna } from '../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState("");
  const [RecNatId, setRecNatId] = useState("");
  const [SnderPW, setSnderPW] = useState("");
  const [SendrPhn, setSendrPhn] = useState(null);
  const [amounts, setAmount] = useState("");
  const [Desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchSenderUsrDtls = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    try {
      const accountDtl: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: SenderNatId
        }
      });
      const netEarningss = accountDtl.data.getBizna.netEarnings;
      const usrPW = accountDtl.data.getBizna.pw;
      const busNames = accountDtl.data.getBizna.busName;
      const SenderSub = accountDtl.data.getBizna.owner;
      const noBL = accountDtl.data.getBizna.noBL;
      const SenderAcStatus = accountDtl.data.getBizna.status;
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
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact;
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
          const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM;
          const fetchRecUsrDtls = async () => {
            try {
              const RecAccountDtl: any = await client.graphql({
                query: getBizna,
                variables: {
                  BusKntct: RecNatId
                }
              });
              const RecUsrBal = RecAccountDtl.data.getBizna.netEarnings;
              const usrAcActvSttss = RecAccountDtl.data.getBizna.status;
              const namess = RecAccountDtl.data.getBizna.busName;
              const sendSMNonLn = async () => {
                try {
                  await client.graphql({
                    query: createNonLoans,
                    variables: {
                      input: {
                        recPhn: RecNatId,
                        senderPhn: SenderNatId,
                        amount: parseFloat(amounts).toFixed(2),
                        description: Desc,
                        RecName: namess,
                        SenderName: busNames,
                        status: "BiznaShareCash2Biz",
                        owner: userInfo.userId
                      }
                    }
                  });
                } catch (error) {
                  if (error) {
                    Alert.alert("Revenue sharing unsuccessful; Retry");
                    return;
                  }
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
                        netEarnings: (parseFloat(netEarningss) - TotalTransacted).toFixed(2)
                      }
                    }
                  });
                } catch (error) {
                  console.log(error);
                  if (error) {
                    Alert.alert("Error1! Error! Enter details correctly");
                    return;
                  }
                }
                await updtRecAc();
              };
              const updtRecAc = async () => {
                try {
                  await client.graphql({
                    query: updateBizna,
                    variables: {
                      input: {
                        BusKntct: RecNatId,
                        netEarnings: (parseFloat(RecUsrBal) + parseFloat(amounts)).toFixed(2)
                      }
                    }
                  });
                } catch (error) {
                  console.log(error);
                  if (error) {
                    Alert.alert("Error2! Retry or update app or call customer care");
                    return;
                  }
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
                  console.log(error);
                  if (error) {
                    Alert.alert("Error3! retry or update app");
                    return;
                  }
                }
                Alert.alert("Amount:Ksh. " + parseFloat(amounts).toFixed(2) + " Transaction: Ksh. " + (parseFloat(UsrTransferFee) * parseFloat(amounts)).toFixed(2));
                Communications.textWithoutEncoding(RecNatId, 'Confirmed. ' + busNames + ' Business entity has sent you Ksh. ' + amounts + ' to your MiFedha Business account ' + 'Please confirm this transaction record is on your Mifedha app. Thank you. MiFedha');
                setIsLoading(false);
              };
              if (usrAcActvSttss !== "AccountActive") {
                Alert.alert('Receiver account is inactive');
              } else if (SenderNatId === RecNatId) {
                Alert.alert('You cannot Send money to yourself Yourself');
              } else if (parseFloat(netEarningss) < TotalTransacted) {
                Alert.alert('Requested amount is more than you have in your account');
              } else if (noBL > 0) {
                Alert.alert('Please first clear your lenders');
              } else if (usrPW !== SnderPW) {
                Alert.alert('Wrong password');
              } else if (userInfo.userId !== SenderSub) {
                Alert.alert('You do not own this business');
              } else {
                sendSMNonLn();
              }
            } catch (e) {
              console.log(e);
              if (e) {
                Alert.alert("Error4! Retry or update app or call customer care");
                return;
              }
            }
          };
          await fetchRecUsrDtls();
        } catch (e) {
          console.log(e);
          if (e) {
            Alert.alert("Error5! Retry or update app or call customer care");
            return;
          }
        }
      };
      await fetchCompDtls();
    } catch (e) {
      console.log(e);
      if (e) {
        Alert.alert("Error6! Retry or update app or call customer care");
        return;
      }
    }
    ;
    setSenderNatId("");
    setAmount("");
    setRecNatId("");
    setDesc("");
    setSnderPW("");
    setIsLoading(false);
  };
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
      <View style={styles.image}>
        <ScrollView>
         
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>
          <View style={styles.sendAmtView}>
            <TextInput placeholder="+2547xxxxxxxx" value={SenderNatId} onChangeText={setSenderNatId} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Sender Business Phone</Text>
          </View>
          

          <View style={styles.sendAmtView}>
            <TextInput placeholder="+2547xxxxxxxx" value={RecNatId} onChangeText={setRecNatId} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Receiver Business Number</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput keyboardType={"decimal-pad"} value={amounts} onChangeText={setAmount} style={styles.sendAmtInput} editable={true}></TextInput>
              
            <Text style={styles.sendAmtText}>Amount Sent</Text>
          </View>


          

          

          <View style={styles.sendAmtViewDesc}>
            <TextInput multiline={true} value={Desc} onChangeText={setDesc} style={styles.sendAmtInputDesc} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Description</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput value={SnderPW} onChangeText={setSnderPW} secureTextEntry={true} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Business PassWord</Text>
          </View>
          
          <TouchableOpacity onPress={fetchSenderUsrDtls} style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Send</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    </View>;
};
export default SMASendNonLns;