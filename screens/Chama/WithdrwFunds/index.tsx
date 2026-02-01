import React, { useState } from 'react';
import { createFloatAdd, updateAgent, updateCompany, updateSAgent, updateSMAccount } from '../../../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { getAgent, getCompany, getSAgent, getSMAccount } from '../../../src/graphql/queries';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
const client = generateClient();
const SMADepositForm = props => {
  const [UsrPWd, setUsrPWd] = useState('');
  const [AgentPhn, setAgentPhn] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fetchAcDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      const attrs = await fetchUserAttributes();
      const accountDtl = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attrs.email
        }
      });
      const usrBala = accountDtl.data.getSMAccount.balance;
      const TtlWthdrwnSMs = accountDtl.data.getSMAccount.TtlWthdrwnSM;
      const usrStts = accountDtl.data.getSMAccount.acStatus;
      const withdrawalLimits = accountDtl.data.getSMAccount.withdrawalLimit;
      const pws = accountDtl.data.getSMAccount.pw;
      const owners = accountDtl.data.getSMAccount.owner;
      const names = accountDtl.data.getSMAccount.name;
      if (user.userId !== owners) {
        Alert.alert('Please create main account');
        return;
      }
      const AgentBal = await client.graphql({
        query: getAgent,
        variables: {
          phonecontact: AgentPhn
        }
      });
      const TtlFltInsss = AgentBal.data.getAgent.TtlFltIn;
      const floatBals = AgentBal.data.getAgent.floatBal;
      const ttlEarningssss = AgentBal.data.getAgent.ttlEarnings;
      const agentEarningBalsss = AgentBal.data.getAgent.agentEarningBal;
      const AgAcAct = AgentBal.data.getAgent.status;
      const sagentregnos = AgentBal.data.getAgent.sagentregno;
      const namess = AgentBal.data.getAgent.name;
      const MFNWithdrwlFees = AgentBal.data.getAgent.MFNWithdrwlFee;
      if (AgAcAct === 'AccountInactive') {
        Alert.alert('MFNdogo Account has been deactivated');
        return;
      }
      const compDtls = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const ttlUserWthdrwls = compDtls.data.getCompany.ttlUserWthdrwl;
      const agentComs = compDtls.data.getCompany.agentCom;
      const sagentComs = compDtls.data.getCompany.sagentCom;
      const companyComs = compDtls.data.getCompany.companyCom;
      const companyComDisc = compDtls.data.getCompany.companyComDisc;
      const UsrWthdrwlFeess = compDtls.data.getCompany.UsrWthdrwlFees;
      const companyEarningBals = compDtls.data.getCompany.companyEarningBal;
      const companyEarnings = compDtls.data.getCompany.companyEarning;
      const agentEarningBals = compDtls.data.getCompany.agentEarningBal;
      const agentEarnings = compDtls.data.getCompany.agentEarning;
      const saEarningBals = compDtls.data.getCompany.saEarningBal;
      const saEarnings = compDtls.data.getCompany.saEarning;
      const agentFloatIns = compDtls.data.getCompany.agentFloatIn;
      const saDtls = await client.graphql({
        query: getSAgent,
        variables: {
          saPhoneContact: sagentregnos
        }
      });
      const TtlEarningss = saDtls.data.getSAgent.TtlEarnings;
      const saBalances = saDtls.data.getSAgent.saBalance;
      const namessssssss = saDtls.data.getSAgent.name;
      const MFKWithdrwlFees = saDtls.data.getSAgent.MFKWithdrwlFee;
      const AgentCommission = (parseFloat(sagentComs) - parseFloat(MFNWithdrwlFees)) / 100 * parseFloat(amount) * parseFloat(UsrWthdrwlFeess);
      const saCommission = (parseFloat(agentComs) - parseFloat(MFKWithdrwlFees)) / 100 * parseFloat(amount) * parseFloat(UsrWthdrwlFeess);
      const compCommission = (parseFloat(companyComs) - companyComDisc) / 100 * parseFloat(amount) * parseFloat(UsrWthdrwlFeess);
      const UsrWithdrawalFee = AgentCommission + saCommission + compCommission;
      const TTlAmtTrnsctd = parseFloat(amount) + UsrWithdrawalFee;
      if (TTlAmtTrnsctd > parseFloat(usrBala)) {
        Alert.alert('Cancelled.' + 'Bal: ' + usrBala + '. Deductable: ' + TTlAmtTrnsctd.toFixed(2));
        return;
      }
      if (usrStts === 'AccountInactive') {
        Alert.alert('User Account has been deactivated');
        return;
      }
      if (parseFloat(amount) > parseFloat(withdrawalLimits)) {
        Alert.alert('Withdrawal limit exceeded');
        return;
      }
      if (UsrPWd !== pws) {
        Alert.alert('User credentials are wrong; access denied');
        return;
      }
      await client.graphql({
        query: createFloatAdd,
        variables: {
          input: {
            withdrawerid: attrs.email,
            agentPhonecontact: AgentPhn,
            sagentId: sagentregnos,
            owner: user.userId,
            amount: parseFloat(amount).toFixed(0),
            agentName: namess,
            userName: names,
            saName: namessssssss,
            saPhone: sagentregnos,
            status: 'AccountActive'
          }
        }
      });
      await client.graphql({
        query: updateSMAccount,
        variables: {
          input: {
            awsemail: attrs.email,
            balance: (parseFloat(usrBala) - TTlAmtTrnsctd).toFixed(0),
            TtlWthdrwnSM: (parseFloat(TtlWthdrwnSMs) + parseFloat(amount)).toFixed(0)
          }
        }
      });
      await client.graphql({
        query: updateAgent,
        variables: {
          input: {
            phonecontact: AgentPhn,
            ttlEarnings: (parseFloat(ttlEarningssss) + AgentCommission).toFixed(0),
            agentEarningBal: (parseFloat(agentEarningBalsss) + AgentCommission).toFixed(0),
            floatBal: (parseFloat(floatBals) + parseFloat(amount)).toFixed(0),
            TtlFltIn: (parseFloat(TtlFltInsss) + parseFloat(amount)).toFixed(0)
          }
        }
      });
      await client.graphql({
        query: updateSAgent,
        variables: {
          input: {
            saPhoneContact: sagentregnos,
            TtlEarnings: (parseFloat(TtlEarningss) + saCommission).toFixed(0),
            saBalance: (parseFloat(saBalances) + saCommission).toFixed(0)
          }
        }
      });
      await client.graphql({
        query: updateCompany,
        variables: {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            companyEarningBal: parseFloat(companyEarningBals) + compCommission,
            companyEarning: parseFloat(companyEarnings) + compCommission,
            agentEarningBal: parseFloat(agentEarningBals) + AgentCommission,
            agentEarning: parseFloat(agentEarnings) + AgentCommission,
            saEarningBal: parseFloat(saEarningBals) + saCommission,
            saEarning: parseFloat(saEarnings) + saCommission,
            ttlUserWthdrwl: parseFloat(ttlUserWthdrwls) + parseFloat(amount),
            agentFloatIn: parseFloat(agentFloatIns) + parseFloat(amount)
          }
        }
      });
      Alert.alert(names + ' has withdrawn Ksh. ' + parseFloat(amount).toFixed(2) + ' from ' + namess + ' MFNdogo');
      setAmount('');
      setUsrPWd('');
      setAgentPhn('');
    } catch (e) {
      console.log(e);
      Alert.alert('Check your internet connection');
    } finally {
      setIsLoading(false);
    }
  };
  return <ScrollView>
      <View style={styles.amountTitleView}>
        <Text style={styles.title}>Fill Details Below</Text>
      </View>

      <View style={styles.sendAmtView}>
        <TextInput placeholder="+2547xxxxxxxx" value={AgentPhn} onChangeText={setAgentPhn} style={styles.sendAmtInput} />
        <Text style={styles.sendAmtText}>Agent Phone</Text>
      </View>

      <View style={styles.sendAmtView}>
        <TextInput keyboardType="decimal-pad" value={amount} onChangeText={setAmount} style={styles.sendAmtInput} />
        <Text style={styles.sendAmtText}>Amount</Text>
      </View>

      <View style={styles.sendAmtView}>
        <TextInput value={UsrPWd} onChangeText={setUsrPWd} secureTextEntry={true} style={styles.sendAmtInput} />
        <Text style={styles.sendAmtText}>User PW</Text>
      </View>

      <TouchableOpacity onPress={fetchAcDtls} style={styles.sendAmtButton}>
        <Text style={styles.sendAmtButtonText}>
          Click to Withdraw
        </Text>
        {isLoading && <ActivityIndicator size="large" color="blue" />}
      </TouchableOpacity>
    </ScrollView>;
};
export default SMADepositForm;