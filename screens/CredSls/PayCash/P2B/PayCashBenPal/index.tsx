import React, { useEffect, useState } from 'react';
import Communications from 'react-native-communications';
import { createSMLoansCovered, createNonLoans, updateCompany, updateSMAccount, updateBizna } from '../../../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount, listCovCreditSellers, listCvrdGroupLoans, listSMLoansCovereds } from '../../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const SMASendNonLns = () => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState('');
  const [amounts, setAmount] = useState('');
  const [Desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const SndChmMmbrMny = () => navigation.navigate('AutomaticRepayAllTyps');
  const fetchCvLnSM = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      // Loan checks
      const [loan1, loan2, loan3] = await Promise.all([client.graphql({
        query: listSMLoansCovereds,
        variables: {
          filter: {
            status: {
              eq: 'LoanBL'
            },
            lonBala: {
              gt: 0
            },
            loaneeEmail: attributes.email
          }
        }
      }), client.graphql({
        query: listCovCreditSellers,
        variables: {
          filter: {
            status: {
              eq: 'LoanBL'
            },
            lonBala: {
              gt: 0
            },
            buyerContact: attributes.email
          }
        }
      }), client.graphql({
        query: listCvrdGroupLoans,
        variables: {
          filter: {
            status: {
              eq: 'LoanBL'
            },
            lonBala: {
              gt: 0
            },
            loaneePhn: attributes.email
          }
        }
      })]);
      const hasLoan = loan1.data.listSMLoansCovereds.items.length > 0 || loan2.data.listCovCreditSellers.items.length > 0 || loan3.data.listCvrdGroupLoans.items.length > 0;
      if (hasLoan) {
        SndChmMmbrMny();
        return;
      }

      // Sender account
      const senderRes = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const sender = senderRes.data.getSMAccount;
      if (!sender) throw new Error('Sender account not found');
      const {
        pw,
        acStatus,
        owner,
        balance,
        loanLimit,
        name
      } = sender;
      if (pw !== SnderPW) return Alert.alert('Wrong password');
      if (acStatus !== 'AccountActive') return Alert.alert('Sender account is inactive');
      if (userInfo.userId !== owner) return Alert.alert('Please send from your own account');
      if (parseFloat(loanLimit) < parseFloat(amounts)) return Alert.alert('Send limit exceeded');

      // Company
      const compRes = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const company = compRes.data.getCompany;
      if (!company) throw new Error('Company not found');
      const {
        userTransferFee,
        companyEarningBal,
        companyEarning,
        ttlNonLonssRecSM,
        ttlNonLonssSentSM
      } = company;
      const fee = parseFloat(userTransferFee || 0) * parseFloat(amounts);
      const totalDebit = parseFloat(amounts) + fee;
      if (parseFloat(balance) < totalDebit) return Alert.alert('Insufficient balance');

      // Recipient
      const recRes = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: RecNatId
        }
      });
      const rec = recRes.data.getBizna;
      if (!rec) throw new Error('Recipient business not found');
      const recipientName = rec.busName;

      // Transaction
      await client.graphql({
        query: createNonLoans,
        variables: {
          input: {
            recPhn: RecNatId,
            senderPhn: attributes.email,
            amount: parseFloat(amounts).toFixed(0),
            description: Desc,
            RecName: recipientName,
            SenderName: name,
            status: 'cashSales',
            owner: userInfo.userId
          }
        }
      });
      await Promise.all([client.graphql({
        query: updateSMAccount,
        variables: {
          input: {
            awsemail: attributes.email,
            ttlNonLonsSentSM: (parseFloat(sender.ttlNonLonsSentSM) + parseFloat(amounts)).toFixed(0),
            balance: (parseFloat(balance) - totalDebit).toFixed(0)
          }
        }
      }), client.graphql({
        query: updateBizna,
        variables: {
          input: {
            BusKntct: RecNatId,
            netEarnings: (parseFloat(rec.netEarnings) + parseFloat(amounts)).toFixed(0),
            earningsBal: (parseFloat(rec.netEarnings) + parseFloat(amounts)).toFixed(0)
          }
        }
      }), client.graphql({
        query: updateCompany,
        variables: {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            companyEarningBal: fee + parseFloat(companyEarningBal),
            companyEarning: fee + parseFloat(companyEarning),
            ttlNonLonssRecSM: parseFloat(amounts) + parseFloat(ttlNonLonssRecSM),
            ttlNonLonssSentSM: parseFloat(amounts) + parseFloat(ttlNonLonssSentSM)
          }
        }
      })]);
      Alert.alert(`Successful! Transaction fee: Ksh. ${fee.toFixed(0)}`);
    } catch (e) {
      console.error(e);
      Alert.alert('Transaction failed, please retry or update your app');
    } finally {
      setIsLoading(false);
      setSenderNatId('');
      setAmount('');
      setRecNatId('');
      setDesc('');
      setSnderPW('');
    }
  };
  return <View style={styles.root}>
      <ScrollView>
        <View style={styles.amountTitleView}>
          <Text style={styles.title}>Fill account Details Below</Text>
        </View>

        <View style={styles.sendAmtView}>
          <TextInput placeholder="Business Phone" value={RecNatId} onChangeText={setRecNatId} style={styles.sendAmtInput} />
          <Text style={styles.sendAmtText}>Business Phone</Text>
        </View>

        <View style={styles.sendAmtView}>
          <TextInput keyboardType="numeric" placeholder="Amount" value={amounts} onChangeText={setAmount} style={styles.sendAmtInput} />
          <Text style={styles.sendAmtText}>Amount</Text>
        </View>

        <View style={styles.sendAmtView}>
          <TextInput placeholder="Description" value={Desc} onChangeText={setDesc} style={styles.sendAmtInput} />
          <Text style={styles.sendAmtText}>Description</Text>
        </View>

        <View style={styles.sendAmtView}>
          <TextInput placeholder="Password" secureTextEntry value={SnderPW} onChangeText={setSnderPW} style={styles.sendAmtInput} />
          <Text style={styles.sendAmtText}>Password</Text>
        </View>

        <TouchableOpacity style={styles.sendAmtButton} disabled={isLoading} onPress={fetchCvLnSM}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.sendAmtButtonText}>Send</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>;
};
export default SMASendNonLns;