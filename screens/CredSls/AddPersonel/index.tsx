import React, { useState } from 'react';
import { createBizna, createChamaMembers, createGroup, createPersonel, updateCompany } from '../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount } from '../../../src/graphql/queries';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import styles from './styles';
export type UserReg = {
  usr: String;
};
const client = generateClient();
const CreateChama = (props: UserReg) => {
  const {
    usr
  } = props;
  const navigation = useNavigation();
  const [ChmPhn, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContact, setPhoneContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [Sign2Phn, setSign2Phn] = useState('');
  const WorkerID = ChmDesc + ChmRegNo;
  const ChckUsrExistence = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const UsrDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: ChmPhn
        }
      });
      const nationalidsss = UsrDtls.data.getSMAccount.nationalid;
      const namess = UsrDtls.data.getSMAccount.name;
      const awsemails = UsrDtls.data.getSMAccount.awsemail;
      const owners = UsrDtls.data.getSMAccount.owner;
      const PckBiznaDtls = async () => {
        if (isLoading) return;
        setIsLoading(true);
        const BznaDtls: any = await client.graphql({
          query: getBizna,
          variables: {
            BusKntct: ChmRegNo
          }
        });
        const pws = BznaDtls.data.getBizna.pw;
        const ownerz = BznaDtls.data.getBizna.owner;
        const BiznaNames = BznaDtls.data.getBizna.busName;
        const Admins = Object.keys(BznaDtls.data.getBizna).filter(key => key.startsWith('Admin')).map(key => BznaDtls.data.getBizna[key]);
        const onCreateNewSMAc = async () => {
          if (isLoading) return;
          setIsLoading(true);
          await client.graphql({
            query: createPersonel,
            variables: {
              input: {
                BusinessRegNo: ChmRegNo,
                phoneKontact: ChmPhn,
                name: namess,
                workerId: WorkerID,
                workId: ChmDesc,
                email: awsemails,
                nationalid: nationalidsss,
                BiznaName: BiznaNames,
                ownrsss: owners
              }
            }
          });
          Alert.alert('Sales Officer added successfully');
          setIsLoading(false);
        };
        if (pws !== pword) {
          Alert.alert('Wrong Business password');
        } else if (ownerz === userInfo.userId || Admins.includes(attributes.email)) {
          await onCreateNewSMAc();
        } else {
          Alert.alert('Neither the Creator nor Admin of this business');
        }
        setIsLoading(false);
      };
      await PckBiznaDtls();
    } catch (e) {
      Alert.alert('Error! Access denied!');
    }
    setIsLoading(false);
    setChmPhn('');
    setPW('');
    setChmDesc('');
    setChmNm('');
    setChmRegNo('');
    setMmbaID('');
    setSign2Phn('');
  };
  return <LinearGradient colors={['#e58d29', '#87ceeb']} style={{
    flex: 1
  }}>
      <ScrollView contentContainerStyle={{
      padding: 20
    }}>
        <View style={ui.header}>
          <Text style={ui.headerTitle}>Register Sales Officer</Text>
          <Text style={ui.headerSub}>MiFedha Business Portal</Text>
        </View>

        <View style={ui.card}>
          <Text style={ui.label}>Business Phone</Text>
          <TextInput placeholder="07xxxxxxxx" placeholderTextColor="#aaa" value={ChmRegNo} onChangeText={setChmRegNo} style={ui.input} />

          <Text style={ui.label}>Sales Officer Email</Text>
          <TextInput placeholder="email@example.com" placeholderTextColor="#aaa" value={ChmPhn} onChangeText={setChmPhn} style={ui.input} />

          <Text style={ui.label}>Business Password</Text>
          <TextInput secureTextEntry value={pword} onChangeText={setPW} style={ui.input} />

          <Text style={ui.label}>Sales Officer Work ID</Text>
          <TextInput value={ChmDesc} onChangeText={setChmDesc} style={ui.input} />

          <TouchableOpacity onPress={ChckUsrExistence} disabled={isLoading}>
            <LinearGradient colors={['#e58d29', '#f2b66d']} style={ui.button}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={ui.buttonText}>Register Sales Officer</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>;
};
export default CreateChama;
const ui = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff'
  },
  headerSub: {
    fontSize: 14,
    color: '#f5f5f5',
    marginTop: 5
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  label: {
    color: '#555',
    fontSize: 13,
    marginBottom: 5,
    marginTop: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: '#fafafa'
  },
  button: {
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});