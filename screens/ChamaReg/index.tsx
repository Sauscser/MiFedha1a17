import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { createChamasNPwnBrkrs } from '../../src/graphql/mutations';
const client = generateClient();
const RegisterMFAdvAcForms = props => {
  const navigation = useNavigation();
  const [nationalId, setNationalid] = useState('');
  const [nam, setName] = useState('');
  const [phoneContact, setPhoneContact] = useState('');
  const [eml, setEml] = useState('');
  const [ownr, setOwnr] = useState(null);
  const [pword, setPW] = useState('');
  const [advRegNo, setAdvRegNo] = useState('');
  const [officeLocs, setOfficeLoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [UsrPhn, setUsrPhn] = useState(null);
  const fetchUser = async () => {
    const user = await getCurrentUser();
    const attrs = await fetchUserAttributes();
    setOwnr(user.userId);
    setUsrPhn(attrs.phone_number);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const onCreateNewMFN = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await client.graphql({
        query: createChamasNPwnBrkrs,
        variables: {
          input: {
            contact: pword,
            regNo: advRegNo,
            owner: ownr,
            AcStatus: 'AccountActive'
          }
        }
      });
      setNationalid('');
      setPW('');
      setName('');
      setEml('');
      setAdvRegNo('');
      setPhoneContact('');
      setOfficeLoc('');
      Alert.alert('Account successfully created');
    } catch (error) {
      console.log(error);
      Alert.alert('Not authorised');
    } finally {
      setIsLoading(false);
    }
  };
  return <View style={styles.image}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.loanTitleView}>
          <Text style={styles.title}>Fill Account Details Below</Text>
        </View>

        <View style={styles.sendLoanView}>
          <TextInput value={advRegNo} onChangeText={setAdvRegNo} style={styles.sendLoanInput} editable={true} />
          <Text style={styles.sendLoanText}>Registration Number</Text>
        </View>

        <View style={styles.sendLoanView}>
          <TextInput placeholder="+2547xxxxxxxx" value={pword} onChangeText={setPW} style={styles.sendLoanInput} editable={true} />
          <Text style={styles.sendLoanText}> Phone Number</Text>
        </View>

        <TouchableOpacity onPress={onCreateNewMFN} style={styles.sendLoanButton}>
          <Text style={styles.sendLoanButtonText}>
            Click to Create Account
          </Text>
          {isLoading && <ActivityIndicator color={'Blue'} size="large" />}
        </TouchableOpacity>
      </ScrollView>
    </View>;
};
export default RegisterMFAdvAcForms;