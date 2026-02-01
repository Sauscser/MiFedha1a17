import React, { useEffect, useState } from 'react';
import { deleteChamaMembers, updateGroup, updateBankAdmin } from '../../../../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
const client = generateClient();
const DeregChmMmbr = () => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState('');
  const [ChmMmbrId, setChmMmbrId] = useState('');
  const [grpContactz, setChmPhn] = useState('');
  const [nam, setName] = useState<string | null>(null);
  const [phoneContacts, setPhoneContacts] = useState('');
  const [awsEmail, setAWSEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [MmberId, setMmberId] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState('');
  const ChmNMmbrPhns = MmberId + grpContactz;
  const route = useRoute();
  const updateChmMmbrAc = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await client.graphql({
        query: deleteChamaMembers,
        variables: {
          input: {
            ChamaNMember: ChmNMmbrPhns
          }
        }
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error! Access denied');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    updateChmMmbrAc();
  }, []);
  useEffect(() => {
    const ChmMmbrIds = MmberId;
    if (!ChmMmbrIds && ChmMmbrIds !== '') {
      setMmberId('');
      return;
    }
    setMmberId(ChmMmbrIds);
  }, [MmberId]);
  useEffect(() => {
    const SigntryPWs = SigntryPW;
    if (!SigntryPWs && SigntryPWs !== '') {
      setSigntryPW('');
      return;
    }
    setSigntryPW(SigntryPWs);
  }, [SigntryPW]);
  useEffect(() => {
    const memberPhns = memberPhn;
    if (!memberPhns && memberPhns !== '') {
      setmemberPhn('');
      return;
    }
    setmemberPhn(memberPhns);
  }, [memberPhn]);
  useEffect(() => {
    const phoneContactss = phoneContacts;
    if (!phoneContactss && phoneContactss !== '') {
      setPhoneContacts('');
      return;
    }
    setPhoneContacts(phoneContactss);
  }, [phoneContacts]);
  useEffect(() => {
    const ChmDescs = ChmDesc;
    if (!ChmDescs && ChmDescs !== '') {
      setChmDesc('');
      return;
    }
    setChmDesc(ChmDescs);
  }, [ChmDesc]);
  useEffect(() => {
    const ChmPhns = grpContactz;
    if (!ChmPhns && ChmPhns !== '') {
      setChmPhn('');
      return;
    }
    setChmPhn(ChmPhns);
  }, [grpContactz]);
  useEffect(() => {
    const pws = pword;
    if (!pws && pws !== '') {
      setPW('');
      return;
    }
    setPW(pws);
  }, [pword]);
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="+2547xxxxxxxx" value={grpContactz} onChangeText={setChmPhn} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama Phone Number</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={MmberId} onChangeText={setMmberId} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama Member Number</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={pword} onChangeText={setPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama PassWord</Text>
          </View>

          <TouchableOpacity onPress={updateChmMmbrAc} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>Click to DeRegister</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default DeregChmMmbr;