import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getSMAccount } from '../../../../src/graphql/queries';
import { Ionicons } from '@expo/vector-icons';

const DepositScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const amountValue = parseFloat(amount);

  const createPayPalOrder = async (amount, email) => {
    try {
      const response = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${"PAYPAL_CLIENT_ID"}`,
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [{ amount: { currency_code: 'USD', value: amount } }],
          payer: { email_address: email }
        })
      });
      
      const data = await response.json();
      return data.links.find(link => link.rel === 'approve').href;
    } catch (error) {
      console.error('PayPal Order Error:', error);
      return null;
    }
  };

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

      const url = await createPayPalOrder(amountValue, userEmail);
      if (!url) {
        Alert.alert('Transaction Error', 'Could not start PayPal transaction. Try again.');
      } else {
        setCheckoutUrl(url);
      }
    } catch (error) {
      Alert.alert('Transaction Error', 'Could not start transaction. Try again.');
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

              <Text style={styles.label}>Select Payment Method:</Text>
              <TouchableOpacity onPress={initializeTransaction} style={styles.paymentButton}>
                <Text style={styles.buttonText}>Pay with PayPal</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <WebView source={{ uri: checkoutUrl }} />
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  formContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 5 },
  input: { height: 45, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, borderRadius: 5, paddingLeft: 10 },
  buttonText: { fontSize: 16, color: '#fff' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, marginBottom: 10, height: 50 },
  passwordInput: { flex: 1, padding: 12 },
  label: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  paymentButton: { backgroundColor: '#e58d29', paddingVertical: 12, borderRadius: 5, alignItems: 'center', marginTop: 10 },
});

export default DepositScreen;
