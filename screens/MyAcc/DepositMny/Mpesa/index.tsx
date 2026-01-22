import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getCompany, getExRates, getSMAccount } from '../../../../src/graphql/queries';

import { createFloatReduction, updateCompany, updateSMAccount } from '../../../../src/graphql/mutations';
import { Ionicons } from '@expo/vector-icons';

const DepositScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const amountValue = parseFloat(amount);

  

  const initializeTransaction = async () => {
    setIsLoading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userEmail = user.attributes.email;

      if (isNaN(amountValue) || amountValue <= 0) {
        Alert.alert('Invalid amount');
        setIsLoading(false);
        return;
      }

      const accountData = await API.graphql(graphqlOperation(getSMAccount, { awsemail: userEmail }));
      const account = accountData.data.getSMAccount;

      if (!account || account.acStatus === 'AccountInactive') {
        Alert.alert('Account is inactive or not found');
        setIsLoading(false);
        return;
      }

      if (amountValue > parseFloat(account.depositLimit)) {
        Alert.alert('Limit exceeded; contact customer care.');
        setIsLoading(false);
        return;
      }

      
      if (password !== account.pw) {
        Alert.alert('Wrong Main Account Password');
        setIsLoading(false);
        return;
      }
        

      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${"PAYSTACK_SECRET_KEY"}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          amount: Math.round(amountValue * 100),
          currency: 'KES',
          reference: `MiFedha_${Date.now()}`,
        }),
      });

      const result = await response.json();
      if (result.status && result.data?.authorization_url) {
        setCheckoutUrl(result.data.authorization_url);
      } else {
        throw new Error(result.message || 'Transaction initialization failed');
      }
    } catch (error) {
      Alert.alert('Transaction Error', 'Could not start transaction. Try again.');
    }
    setIsLoading(false);
  };

  const verifyPaymentAndNavigate = async (reference) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${"PAYSTACK_SECRET_KEY"}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.data.status === 'success') {
        await updateUserBalance();
      } else {
        Alert.alert('Payment Failed', 'Verification error occurred.');
      }
    } catch (error) {
      Alert.alert('Payment Failed', 'Verification error occurred.');
    }
    setIsLoading(false);
  };

   const updateUserBalance = async () => {
      setIsLoading(true);
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userEmail = user.attributes.email;
        const accountData = await API.graphql(graphqlOperation(getSMAccount, { awsemail: userEmail }));
        const account = accountData.data.getSMAccount;

        const companyData = await API.graphql(graphqlOperation(getCompany, { AdminId: "BaruchHabaB'ShemAdonai2" }));
        const company = companyData.data.getCompany;
        const paystackFees = parseFloat(companyData.data.getCompany.maxInterestPwnBrkr);
        
        const exchangeData = await API.graphql(graphqlOperation(getExRates, { cur: 'Nig' }));
        const exchangeRate = parseFloat(exchangeData.data.getExRates.buyingPrice);
        const convertedAmount = (parseFloat(amount) * exchangeRate *(1 - paystackFees)).toFixed(2);
        
        await API.graphql(graphqlOperation(createFloatReduction, {
          input: {
            depositerid: account.nationalid,
            agContact: 'Paystack',
            agentName: 'Paystack',
            userName: account.name,
            amount: convertedAmount,
            status: 'AccountActive',
          },
        }));
  
        await API.graphql(graphqlOperation(updateSMAccount, {
          input: {
            awsemail: userEmail,
            balance: (parseFloat(account.balance) + parseFloat(convertedAmount)),
            ttlDpstSM: (parseFloat(account.ttlDpstSM) + parseFloat(convertedAmount)),
          },
        }));
  
        
  
        await API.graphql(graphqlOperation(updateCompany, {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            ttlUsrDep: parseFloat(company.ttlUsrDep) + parseFloat(convertedAmount),
            agentFloatOut: parseFloat(company.agentFloatOut) + parseFloat(convertedAmount),
          },
        }));
  
        Alert.alert(`KSH. ${convertedAmount} deposited in ${account.name}'s account`);
      } catch (error) {
        console.log(error)
        Alert.alert('Error', 'Transaction update failed. Try again.');
      }
      setIsLoading(false);
    };

  return (
    <LinearGradient colors={['#e58d29', 'skyblue']} start={[0, 0]} end={[1, 1]} style={{ flex: 1 }}>
      <View style={styles.container}>
        {!checkoutUrl ? (
          <ScrollView>
            <View style={styles.formContainer}>
              <TextInput
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
                keyboardType='decimal-pad'
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Main Account Password"
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={initializeTransaction} style={styles.button}>
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <WebView
            source={{ uri: checkoutUrl }}
            onNavigationStateChange={(navState) => {
              if (navState.url.includes('reference=')) {
                const referenceMatch = navState.url.match(/reference=([^&]+)/);
                if (referenceMatch) {
                  verifyPaymentAndNavigate(referenceMatch[1]);
                }
              }
            }}
          />
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  formContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 5 },
  input: { height: 45, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, borderRadius: 5, paddingLeft: 10 },
  button: { backgroundColor: '#e58d29', paddingVertical: 12, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  buttonText: { fontSize: 16, color: '#fff' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, marginBottom: 10, height: 50 },
  passwordInput: { flex: 1, padding: 12 },
});

export default DepositScreen;
