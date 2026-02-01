// PaystackPayment.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getSMAccount } from '../../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const PaystackPayment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const amounts = route.params.amount;
  const amountz = parseFloat(amounts);
  useEffect(() => {
    initializeTransaction();
  }, []);
  const initializeTransaction = async () => {
    try {
      const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
      const userEmail = attributes.email;
      if (isNaN(amountz) || amountz <= 0) {
        Alert.alert('Invalid amount');
        navigation.goBack();
        return;
      }
      const accountData = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: userEmail
        }
      });
      const account = accountData.data.getSMAccount;
      if (!account || account.acStatus === 'AccountInactive') {
        Alert.alert('Account is inactive or not found');
        navigation.goBack();
        return;
      }
      if (amountz > parseFloat(account.depositLimit)) {
        Alert.alert('Limit exceeded; contact customer care.');
        navigation.goBack();
        return;
      }
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${"PAYSTACK_SECRET_KEY"}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          amount: Math.round(amountz * 100),
          currency: 'KES',
          reference: `MiFedha_${Date.now()}`
        })
      });
      const result = await response.json();
      if (result.status && result.data?.authorization_url) {
        setCheckoutUrl(result.data.authorization_url);
      } else {
        throw new Error(result.message || 'Transaction initialization failed');
      }
    } catch (error) {
      Alert.alert('Transaction Error', 'Could not start transaction. Try again.');
      navigation.goBack();
    }
    setIsLoading(false);
  };
  const verifyPayment = async reference => {
    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${"PAYSTACK_SECRET_KEY"}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      console.log(result);
      if (result.data.status === 'success') {
        console.log(result);
        navigation.navigate('UpdatePayStack', {
          amounts
        });
      } else {
        Alert.alert('Payment Failed', 'Verification error occurred.');
        navigation.navigate('DepositOptions');
      }
    } catch (error) {
      Alert.alert('Payment Failed', 'Verification error occurred.');
      navigation.navigate('DepositOptions');
    }
  };
  return <View style={{
    flex: 1
  }}>
      {isLoading ? <ActivityIndicator size="large" color="#e58d29" /> : <WebView source={{
      uri: checkoutUrl
    }} onNavigationStateChange={navState => {
      if (navState.url.includes('reference=')) {
        const referenceMatch = navState.url.match(/reference=([^&]+)/);
        if (referenceMatch) {
          verifyPayment(referenceMatch[1]);
        }
      }
    }} />}
    </View>;
};
export default PaystackPayment;