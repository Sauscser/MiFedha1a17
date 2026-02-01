import React, { useEffect, useState } from 'react';
import { createAgentWithdrawals, createBankAdmWithdrawals, createFloatAdd, createFloatReduction, createSAgentWithdrawals, updateAgent, updateCompany, updateSAgent, updateSMAccount } from '../../../src/graphql/mutations';
import { getAgent, getBankAdmin, getCompany, getSAgent, getSMAccount } from '../../../src/graphql/queries';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const MFNWthdwFlt = props => {
  const [UsrPWd, setUsrPWd] = useState("");
  const [MFKPhn, setMFKPhn] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      const usrStts = accountDtl.data.getSMAccount.acStatus;
      const owners = accountDtl.data.getSMAccount.owner;
      const namess = accountDtl.data.getSMAccount.name;
      const fetchMFNDtls = async () => {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        try {
          const MFNDtl: any = await client.graphql({
            query: getAgent,
            variables: {
              phonecontact: MFKPhn
            }
          });
          const floatBals = MFNDtl.data.getAgent.floatBal;
          const pws = MFNDtl.data.getAgent.pw;
          const names = MFNDtl.data.getAgent.name;
          const statussssss = MFNDtl.data.getAgent.status;
          const CrtMFNFltWthdrwls = async () => {
            try {
              await client.graphql({
                query: createFloatReduction,
                variables: {
                  input: {
                    depositerid: "None",
                    agContact: MFKPhn,
                    agentName: "None",
                    userName: "None",
                    amount: amount,
                    status: 'AccountActive'
                  }
                }
              });
            } catch (error) {
              if (!error) {
                Alert.alert("Account deactivated successfully");
              } else {
                Alert.alert("Please check your internet connection");
                return;
              }
            }
            setIsLoading(false);
            await onUpdtUsrBal();
          };
          const onUpdtUsrBal = async () => {
            if (isLoading) {
              return;
            }
            setIsLoading(true);
            try {
              await client.graphql({
                query: updateSMAccount,
                variables: {
                  input: {
                    awsemail: attributes.email,
                    balance: parseFloat(usrBala) + parseFloat(amount)
                  }
                }
              });
            } catch (error) {
              if (error) {
                Alert.alert("Check internet Connection");
                return;
              }
            }
            Alert.alert(names + ", You have transfered Ksh. " + parseFloat(amount).toFixed(2) + " float to your SM account");
            setIsLoading(false);
            await onUpdtMFNBal();
          };
          const onUpdtMFNBal = async () => {
            if (isLoading) {
              return;
            }
            setIsLoading(true);
            try {
              await client.graphql({
                query: updateAgent,
                variables: {
                  input: {
                    phonecontact: MFKPhn,
                    floatBal: parseFloat(floatBals) - parseFloat(amount)
                  }
                }
              });
            } catch (error) {
              if (error) {
                Alert.alert("Check internet Connection");
                return;
              }
            }
            Alert.alert(names + ", You have transfered Ksh. " + amount + " to your SM account");
            setIsLoading(false);
          };
          if (parseFloat(amount) > parseFloat(floatBals)) {
            Alert.alert("Insufficient Admin Balance");
            return;
          } else if (usrStts !== "AccountActive") {
            Alert.alert("User Account has been deactivated");
            return;
          } else if (statussssss !== "AccountActive") {
            Alert.alert("Admin Account is inactive");
            return;
          } else if (userInfo.userId !== owners) {
            Alert.alert("You cannot withdraw from another's account");
            return;
          }
          if (UsrPWd !== pws) {
            Alert.alert("MFNdogo credentials are wrong; access denied");
            return;
          } else {
            await CrtMFNFltWthdrwls();
          }
        } catch (e) {
          if (e) {
            Alert.alert("Check your internet connection");
            return;
          }
        }
        setIsLoading(false);
      };
      if (userInfo.userId !== owners) {
        Alert.alert("Please first create main account");
      } else {
        await fetchMFNDtls();
      }
    } catch (e) {
      if (e) {
        Alert.alert("Check your internet connection");
        return;
      }
    }
    setIsLoading(false);
    setAmount("");
    setUsrPWd("");
    setMFKPhn("");
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
    const MFKPhns = MFKPhn;
    if (!MFKPhns && MFKPhns !== "") {
      setMFKPhn("");
      return;
    }
    setMFKPhn(MFKPhns);
  }, [MFKPhn]);
  return <View>
      <View>
        
        <ScrollView>
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill Account Details Below</Text>
          </View>
      

          <View style={styles.sendAmtView}>
            <TextInput placeholder="+2547xxxxxxxx" value={MFKPhn} onChangeText={setMFKPhn} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>MFNdogo Phone</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput keyboardType={"decimal-pad"} value={amount} onChangeText={setAmount} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Amount</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput value={UsrPWd} onChangeText={setUsrPWd} secureTextEntry={true} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>MFN PW</Text>
          </View>

          <TouchableOpacity onPress={fetchAcDtls} style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Click to Withdraw</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default MFNWthdwFlt;