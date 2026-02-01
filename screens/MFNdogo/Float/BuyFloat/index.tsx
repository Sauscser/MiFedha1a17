import React, { useEffect, useState } from 'react';
import { createFloatPurchase, updateAgent, updateCompany } from '../../../../src/graphql/mutations';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getAgent, getBankAdmin, getCompany } from '../../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
export type buyAgntFlts = {
  amt: number;
  fltBal1: number;
  ttlFltBal1: number;
};
const BuyFlt = (props: buyAgntFlts) => {
  const [amt, setAmt] = useState("");
  const [phoneContact, setPhoneContact] = useState("");
  const [bankAdminId, setBankAdminId] = useState("");
  const [transId, setTransId] = useState("");
  const [pwss, setpwss] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ftchAgInfo = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    try {
      const agntBal: any = await client.graphql({
        query: getAgent,
        variables: {
          phonecontact: phoneContact
        }
      });
      const fltBal = agntBal.data.getAgent.floatBal;
      const ttlFltIn = agntBal.data.getAgent.TtlFltIn;
      const Stts = agntBal.data.getAgent.status;
      const names = agntBal.data.getAgent.name;
      const ftchCompInfo = async () => {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        try {
          const CompFltBal: any = await client.graphql({
            query: getCompany,
            variables: {
              AdminId: "BaruchHabaB'ShemAdonai2"
            }
          });
          const CompFtBal = CompFltBal.data.getCompany.agentFloatIn;
          const ftchAdmiInfo = async () => {
            if (isLoading) {
              return;
            }
            setIsLoading(true);
            try {
              const CompFltBal: any = await client.graphql({
                query: getBankAdmin,
                variables: {
                  nationalid: bankAdminId
                }
              });
              const nationalids = CompFltBal.data.getBankAdmin.nationalid;
              const pws = CompFltBal.data.getBankAdmin.pw;
              const buyAgntFlt = async () => {
                if (isLoading) {
                  return;
                }
                setIsLoading(true);
                try {
                  await client.graphql({
                    query: createFloatPurchase,
                    variables: {
                      input: {
                        agentphone: phoneContact,
                        amount: amt,
                        transactId: bankAdminId,
                        bankAdminID: bankAdminId,
                        status: "AccountActive",
                        owner: userInfo.userId
                      }
                    }
                  });
                } catch (error) {
                  if (error) {
                    Alert.alert("Purchase unsuccessful; Retry");
                    return;
                  }
                }
                await updtAgntFlt();
                setIsLoading(false);
              };
              if (Stts !== "AccountActive") {
                Alert.alert("Your MFNdogo account has been deactivated");
              } else if (bankAdminId === nationalids && pws !== pwss) {
                Alert.alert("Admin password is wrong");
              } else if (bankAdminId !== nationalids) {
                Alert.alert("Admin does not exist");
              } else {
                buyAgntFlt();
              }
              const updtAgntFlt = async () => {
                if (isLoading) {
                  return;
                }
                try {
                  await client.graphql({
                    query: updateAgent,
                    variables: {
                      input: {
                        phonecontact: phoneContact,
                        floatBal: parseFloat(amt) + parseFloat(fltBal),
                        TtlFltIn: parseFloat(amt) + parseFloat(ttlFltIn)
                      }
                    }
                  });
                } catch (error) {
                  console.log('Error creating account', error);
                }
                await updtCompFlt();
                setIsLoading(false);
              };
              const updtCompFlt = async () => {
                if (isLoading) {
                  return;
                }
                try {
                  await client.graphql({
                    query: updateCompany,
                    variables: {
                      input: {
                        AdminId: "BaruchHabaB'ShemAdonai2",
                        agentFloatIn: parseFloat(amt) + parseFloat(CompFtBal)
                      }
                    }
                  });
                } catch (error) {
                  console.log(error);
                  if (error) {
                    Alert.alert("Please check your internet connection");
                  }
                  ;
                }
                Alert.alert(names + " has loaded Ksh. " + amt);
                setIsLoading(false);
              };
            } catch (error) {
              console.log(error);
              if (error) {
                Alert.alert("Admin Account doesnt exist or is inactive");
                return;
              }
            }
            setIsLoading(false);
          };
          await ftchAdmiInfo();
        } catch (e) {
          if (e) {
            Alert.alert("Retry or update app or call customer care");
            return;
          }
        }
        setIsLoading(false);
      };
      await ftchCompInfo();
    } catch (e) {
      if (e) {
        Alert.alert("MFNdogo does not exist");
        return;
      }
    }
    setAmt("");
    setBankAdminId("");
    setPhoneContact('');
    setTransId("");
    setpwss("");
    setIsLoading(false);
  };
  useEffect(() => {
    const bnkId = bankAdminId;
    if (!bnkId && bnkId !== "") {
      setBankAdminId("");
      return;
    }
    setBankAdminId(bnkId);
  }, [bankAdminId]);
  useEffect(() => {
    const trId = transId;
    if (!trId && trId !== "") {
      setTransId("");
      return;
    }
    setTransId(trId);
  }, [transId]);
  useEffect(() => {
    const phn = phoneContact;
    if (!phn && phn !== "") {
      setPhoneContact("");
      return;
    }
    setPhoneContact(phn);
  }, [phoneContact]);
  useEffect(() => {
    const amount = amt;
    if (!amount && amount !== "") {
      setAmt("");
      return;
    }
    setAmt(amount);
  }, [amt]);
  useEffect(() => {
    const pwssss = pwss;
    if (!pwssss && pwssss !== "") {
      setpwss("");
      return;
    }
    setpwss(pwssss);
  }, [pwss]);
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill MFNdogo Account Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="+2547xxxxxxxx" value={phoneContact} onChangeText={setPhoneContact} style={styles.sendLoanInput} editable={true}></TextInput>
            <Text style={styles.sendLoanText}>MFNdogo Phone Contact</Text>
          </View>
          
          <View style={styles.sendLoanView}>
            <TextInput keyboardType={"decimal-pad"} value={amt} onChangeText={setAmt} style={styles.sendLoanInput} editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Amount</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={bankAdminId} onChangeText={setBankAdminId} style={styles.sendLoanInput} editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Admin Id</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={pwss} onChangeText={setpwss} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Admin PassWord</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={transId} onChangeText={setTransId} style={styles.sendLoanInput} editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Transaction Id</Text>
          </View>          

          
          <TouchableOpacity onPress={ftchAgInfo} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>
              Click to Buy
            </Text>
            {isLoading && <ActivityIndicator color={'blue'} size="large" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default BuyFlt;