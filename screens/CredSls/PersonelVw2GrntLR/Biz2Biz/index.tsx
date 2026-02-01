import React, { useEffect, useState } from 'react';
import { getSMAccount, listPersonels } from '../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const MFNSignIn = () => {
  const navigation = useNavigation();
  const [MFNId, setMFNId] = useState('');
  const [MFNPW, setMFNPW] = useState('');
  const [grpContact, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState('');
  const [awsEmail, setAWSEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [SendrPhn, setSendrPhn] = useState(null);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState('');
  const ChmNMmbrPhns = ChmDesc + memberPhn;
  const VwMFNAc = () => {
    navigation.navigate('Vw2GrntBiz2Biz', {
      MFNId
    });
  };
  const gtChmDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const compDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const signitoryPWs = compDtls.data.getSMAccount.pw;
      const owners = compDtls.data.getSMAccount.owner;
      const UsrDtls: any = await client.graphql({
        query: listPersonels,
        variables: {
          filter: {
            phoneKontact: {
              eq: attributes.email
            },
            BusinessRegNo: {
              eq: MFNId
            }
          }
        }
      });
      if (signitoryPWs !== pword) {
        Alert.alert('Wrong User credentials');
        setIsLoading(false);
        return;
      }
      if (UsrDtls.data.listPersonels.items.length < 1) {
        Alert.alert('You do not work here');
        setIsLoading(false);
        return;
      }
      if (userInfo.userId !== owners) {
        Alert.alert('This is not your Account');
        setIsLoading(false);
        return;
      }
      if (userInfo.userId !== owners) {
        Alert.alert('Please first create main account');
        setIsLoading(false);
        return;
      }
      VwMFNAc();
    } catch (e) {
      console.log(e);
      Alert.alert('Retry or update app or call customer care');
    } finally {
      setIsLoading(false);
      setChmPhn('');
      setPW('');
      setPhoneContacts('');
      setChmDesc('');
      setChmNm('');
      setmemberPhn('');
      setMFNId('');
    }
  };
  useEffect(() => {
    const pws = pword;
    if (!pws && pws !== '') {
      setPW('');
      return;
    }
    setPW(pws);
  }, [pword]);
  useEffect(() => {
    const mfnIDs = MFNId;
    if (!mfnIDs && mfnIDs !== '') {
      setMFNId('');
      return;
    }
    setMFNId(mfnIDs);
  }, [MFNId]);
  useEffect(() => {
    const mfnPWs = MFNPW;
    if (!mfnPWs && mfnPWs !== '') {
      setMFNPW('');
      return;
    }
    setMFNPW(mfnPWs);
  }, [MFNPW]);
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="+2547xxxxxxxx" value={MFNId} onChangeText={setMFNId} style={styles.sendLoanInput} />
            <Text style={styles.sendLoanText}>Business Phone</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={pword} onChangeText={setPW} secureTextEntry style={styles.sendLoanInput} />
            <Text style={styles.sendLoanText}>Sales Officer User PW</Text>
          </View>

          <TouchableOpacity onPress={gtChmDtls} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>Click to View</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default MFNSignIn;