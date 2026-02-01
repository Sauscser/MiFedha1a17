import React, { useEffect, useState } from 'react';
import { createFloatAdd, updateAgent, updateCompany, updateGroup, updateSAgent, updateSMAccount } from '../../../src/graphql/mutations';
import { getAgent, getCompany, getGroup, getSAgent, getSMAccount } from '../../../src/graphql/queries';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const SMADepositForm = props => {
  const [UsrPWd, setUsrPWd] = useState("");
  const [AgentPhn, setAgentPhn] = useState("");
  const [grpKntct, setgrpKntct] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchAcDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const accountDtl: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const pws = accountDtl.data.getSMAccount.pw;
      const owner = accountDtl.data.getSMAccount.owner;
      const fetchChamaDtls = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
          const ChmAcDtl: any = await client.graphql({
            query: getGroup,
            variables: {
              grpContact: grpKntct
            }
          });
          const owners = ChmAcDtl.data.getGroup.signitory2Sub;
          const onChamaAc = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
              await client.graphql({
                query: updateGroup,
                variables: {
                  input: {
                    grpContact: grpKntct,
                    WithdrawCnfrmtn: "YES",
                    WithdrawCnfrmtnAmt: amount
                  }
                }
              });
            } catch (error) {
              console.log(error);
              Alert.alert("Check internet Connection");
              return;
            }
            setIsLoading(false);
            Alert.alert("Chama Withdrawal confirmed");
          };
          if (attributes.email !== owners) {
            Alert.alert("Not authorised to confirm chama withdrawal");
            return;
          } else if (UsrPWd !== pws) {
            Alert.alert("User credentials are wrong; access denied");
            return;
          } else {
            await onChamaAc();
          }
        } catch (error) {
          console.log(error);
          Alert.alert("Check your internet connection");
          return;
        } finally {
          setIsLoading(false);
        }
      };
      if (user.userId !== owner) {
        Alert.alert("Please first create main account");
      } else {
        await fetchChamaDtls();
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Check your internet connection");
      return;
    } finally {
      setIsLoading(false);
      setAmount("");
      setUsrPWd("");
      setgrpKntct("");
    }
  };
  useEffect(() => {
    setgrpKntct(grpKntct || "");
  }, [grpKntct]);
  useEffect(() => {
    setAmount(amount || "");
  }, [amount]);
  useEffect(() => {
    setUsrPWd(UsrPWd || "");
  }, [UsrPWd]);
  useEffect(() => {
    setAgentPhn(AgentPhn || "");
  }, [AgentPhn]);
  return <ScrollView>
      <View style={styles.amountTitleView}>
        <Text style={styles.title}>Fill Details Below</Text>
      </View>

      <View style={styles.sendAmtView}>
        <TextInput value={grpKntct} onChangeText={setgrpKntct} style={styles.sendAmtInput} editable={true} />
        <Text style={styles.sendAmtText}>Chama Account</Text>
      </View>

      <View style={styles.sendAmtView}>
        <TextInput value={amount} onChangeText={setAmount} style={styles.sendAmtInput} editable={true} />
        <Text style={styles.sendAmtText}>Amount</Text>
      </View>

      <View style={styles.sendAmtView}>
        <TextInput value={UsrPWd} onChangeText={setUsrPWd} secureTextEntry={true} style={styles.sendAmtInput} editable={true} />
        <Text style={styles.sendAmtText}>Signitory2 User PW</Text>
      </View>

      <TouchableOpacity onPress={fetchAcDtls} style={styles.sendAmtButton}>
        <Text style={styles.sendAmtButtonText}>Click to confirm Withdraw</Text>
        {isLoading && <ActivityIndicator size="large" color="blue" />}
      </TouchableOpacity>
    </ScrollView>;
};
export default SMADepositForm;