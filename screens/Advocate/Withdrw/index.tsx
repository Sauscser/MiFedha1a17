import React, { useEffect, useState } from 'react';
import { createAdvocateWithdrawals, updateAdvocate, updateSMAccount } from '../../../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { getAdvocate, getSMAccount } from '../../../src/graphql/queries';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
const client = generateClient();
const AdvWthdwl = props => {
  const [UsrPWd, setUsrPWd] = useState("");
  const [AdvReNo, setAdvReNo] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchAcDtls = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attrs = await fetchUserAttributes();
      const accountDtl: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attrs.email
        }
      });
      const usrBala = accountDtl.data.getSMAccount.balance;
      const usrStts = accountDtl.data.getSMAccount.acStatus;
      const owners = accountDtl.data.getSMAccount.owner;
      const fetchAdvDtls = async () => {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        try {
          const AdvDtl: any = await client.graphql({
            query: getAdvocate,
            variables: {
              advregnu: AdvReNo
            }
          });
          const advBals = AdvDtl.data.getAdvocate.advBal;
          const pwds = AdvDtl.data.getAdvocate.pwd;
          const names = AdvDtl.data.getAdvocate.name;
          const statussssss = AdvDtl.data.getAdvocate.status;
          const bankNames = AdvDtl.data.getAdvocate.bankName;
          const bkAcNos = AdvDtl.data.getAdvocate.bkAcNo;
          const CrtAdvWthdrwls = async () => {
            try {
              await client.graphql({
                query: createAdvocateWithdrawals,
                variables: {
                  input: {
                    bankAdmnId: "BnkkAdmNatId",
                    advregnu: AdvReNo,
                    owner: userInfo.userId,
                    amount: amount,
                    bankName: bankNames,
                    bkAcNo: bkAcNos,
                    status: 'AccountActive'
                  }
                }
              });
            } catch (error) {
              if (error) {
                Alert.alert("Error! Access denied!");
                return;
              }
            }
            setIsLoading(false);
            await onUpdtAdvBal();
          };
          const onUpdtAdvBal = async () => {
            if (isLoading) {
              return;
            }
            setIsLoading(true);
            try {
              await client.graphql({
                query: updateAdvocate,
                variables: {
                  input: {
                    advregnu: AdvReNo,
                    advBal: (parseFloat(advBals) - parseFloat(amount)).toFixed(2)
                  }
                }
              });
            } catch (error) {
              if (error) {
                Alert.alert("Error! Access denied!");
                return;
              }
            }
            Alert.alert(names + ", You have Withdrawn Ksh. " + amount);
            setIsLoading(false);
          };
          if (parseFloat(amount) > parseFloat(advBals)) {
            Alert.alert("Insufficient Advocate Balance");
            return;
          } else if (statussssss === "AccountInactive") {
            Alert.alert("Advocate Account is inactive");
            return;
          } else if (userInfo.userId !== owners) {
            Alert.alert("This is not your Advocate Account");
            return;
          } else if (UsrPWd !== pwds) {
            Alert.alert("Advocate credentials are wrong; access denied");
            return;
          } else {
            await CrtAdvWthdrwls();
          }
        } catch (e) {
          if (e) {
            Alert.alert("Error! Access denied!");
            return;
          }
        }
        setIsLoading(false);
      };
      if (userInfo.userId !== owners) {
        Alert.alert("Please first create main account");
      } else {
        await fetchAdvDtls();
      }
    } catch (e) {
      if (e) {
        Alert.alert("Error! Access denied!");
        return;
      }
    }
    setIsLoading(false);
    setAmount("");
    setUsrPWd("");
    setAdvReNo("");
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
    const AdvReNos = AdvReNo;
    if (!AdvReNos && AdvReNos !== "") {
      setAdvReNo("");
      return;
    }
    setAdvReNo(AdvReNos);
  }, [AdvReNo]);
  return <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.amountTitleView}>
        <Text style={styles.title}>Fill Account Details Below</Text>
      </View>

      <View style={styles.sendAmtView}>
        <TextInput value={AdvReNo} onChangeText={setAdvReNo} style={styles.sendAmtInput} editable={true} />
        <Text style={styles.sendAmtText}>Advocate License Number</Text>
      </View>

      <View style={styles.sendAmtView}>
        <TextInput keyboardType={"decimal-pad"} value={amount} onChangeText={setAmount} style={styles.sendAmtInput} editable={true} />
        <Text style={styles.sendAmtText}>Amount</Text>
      </View>

      <View style={styles.sendAmtView}>
        <TextInput value={UsrPWd} onChangeText={setUsrPWd} secureTextEntry={true} style={styles.sendAmtInput} editable={true} />
        <Text style={styles.sendAmtText}>Advocate PassWord</Text>
      </View>

      <TouchableOpacity onPress={fetchAcDtls} style={styles.sendAmtButton}>
        <Text style={styles.sendAmtButtonText}>Click to Withdraw</Text>
        {isLoading && <ActivityIndicator size="large" color="blue" />}
      </TouchableOpacity>
    </ScrollView>;
};
export default AdvWthdwl;