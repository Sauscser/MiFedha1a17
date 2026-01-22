import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Auth, API, graphqlOperation } from 'aws-amplify';

import { createAuditor, createMessages, sendNotification } from '../../../src/graphql/mutations';
import { getSMAccount } from '../../../src/graphql/queries';

type AuditorRegistrationProps = {
  usr: string;
};

const RegisterAuditor = ({ usr }: AuditorRegistrationProps) => {
  const navigation = useNavigation();

  // Form state
  const [institutionAccount, setInstitutionAccount] = useState('');
  const [auditorEmail, setAuditorEmail] = useState('');
  const [workId, setWorkId] = useState('');
  const [mainPassword, setMainPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Verify main account credentials
  const checkUserExistence = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const accountRes: any = await API.graphql(
        graphqlOperation(getSMAccount, { awsemail: userInfo.attributes.email })
      );

      const userData = accountRes?.data?.getSMAccount;
      if (!userData || userData.pw !== mainPassword) {
        Alert.alert('Error', 'Wrong password or account does not exist!');
        setIsLoading(false);
        return;
      }

      await registerAuditor();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'Access denied or network error.');
      setIsLoading(false);
    }
  };

  // Register auditor in GraphQL
  const registerAuditor = async () => {
    try {
      const createdAt = new Date().toISOString();

     const AuditorDtl = await API.graphql(
        graphqlOperation(getSMAccount, { awsemail: auditorEmail })
      );

      const auditorData = (AuditorDtl as any)?.data?.getSMAccount;
      if (!auditorData) {
        Alert.alert('Error', 'The specified auditor email does not exist in the system.');
        setIsLoading(false);
        return;
      }

      await API.graphql(
        graphqlOperation(createAuditor, {
          input: {
            name: auditorData.name, // you may replace with full name if you have
            email: auditorEmail,
            active: true,
            organization: usr,
            regions: [],
            createdAt,
            updatedAt: createdAt,
          },
        })
      );

      // Send confirmation message
      await API.graphql(
        graphqlOperation(createMessages, {
          input: {
            senderEmail: auditorEmail,
            messageBody: `You have been registered as a COMB Officer under Institution ${usr} successfully.`,
          },
        })
      );

      await API.graphql(
        graphqlOperation(sendNotification, {
          riderEmail: auditorEmail,
          title: 'MiFedha: COMB Officer Registration',
          body: `You have been registered as a COMB Officer under Institution ${usr} successfully.`,
        })
      );

      Alert.alert('Success', 'COMB Officer registered successfully!');
      navigation.goBack();
      resetForm();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'Failed to register auditor. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setInstitutionAccount('');
    setAuditorEmail('');
    setWorkId('');
    setMainPassword('');
    setShowPassword(false);
  };

  return (
    <LinearGradient colors={['#e58d29', '#87ceeb']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <View style={ui.header}>
          <Text style={ui.headerTitle}>Register COMB Officer</Text>
          <Text style={ui.headerSub}>Institution Portal</Text>
        </View>

        {/* Card */}
        <View style={ui.card}>
         

          <Text style={ui.label}>COMB Officer Email</Text>
          <TextInput
            placeholder="email@example.com"
            placeholderTextColor="#333"
            value={auditorEmail}
            onChangeText={setAuditorEmail}
            style={ui.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={ui.label}>Main Account Password</Text>
          <View style={ui.passwordRow}>
            <TextInput
              style={[ui.input, { flex: 1 }]}
              placeholder="Main Account Password"
              value={mainPassword}
              onChangeText={setMainPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity style={ui.eyeButton} onPress={() => setShowPassword(p => !p)}>
              <Text style={{ color: '#fff', fontSize: 14 }}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          {/* Button */}
          <TouchableOpacity onPress={checkUserExistence} disabled={isLoading}>
            <LinearGradient colors={['#e58d29', '#f2b66d']} style={ui.button}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={ui.buttonText}>Register COMB Officer</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default RegisterAuditor;

const ui = StyleSheet.create({
  header: { alignItems: 'center', marginBottom: 30, marginTop: 40 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 14, color: '#f5f5f5', marginTop: 5 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  label: { color: '#333', fontSize: 13, marginBottom: 5, marginTop: 15 },
  passwordRow: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
  eyeButton: { marginLeft: 8, backgroundColor: '#e58d29', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
  input: { borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 12, padding: 14, fontSize: 15, backgroundColor: '#fafafa' },
  button: { marginTop: 30, paddingVertical: 16, borderRadius: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
