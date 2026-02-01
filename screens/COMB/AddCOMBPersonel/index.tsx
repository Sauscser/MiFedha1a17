import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { createBizna, createChamaMembers, createGroup, createMessages, createPersonel, sendNotification, updateCompany } from '../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount } from '../../../src/graphql/queries';
import styles from './styles';
const client = generateClient();
export type UserReg = {
  usr: String;
};
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
  const [showPassword, setShowPassword] = useState(false);
  const WorkerID = ChmDesc + ChmRegNo;
  const ChckUsrExistence = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      const attrs = await fetchUserAttributes();
      const usrRes: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: ChmPhn
        }
      });
      const {
        nationalid: nationalidsss,
        name: namess,
        awsemail: awsemails,
        owner: owners,
        pw
      } = usrRes.data.getSMAccount;
      const bizRes: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: ChmRegNo
        }
      });
      const biz = bizRes.data.getBizna;
      if (pw !== pword) {
        Alert.alert('Wrong Main Account password');
        return;
      }
      const isAdmin = biz.owner === user.userId || Object.values(biz).includes(attrs.email);
      if (!isAdmin) {
        Alert.alert('Neither the Creator nor Admin of this Institution');
        return;
      }
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
            BiznaName: biz.busName,
            ownrsss: owners
          }
        }
      });
      const msgRes: any = await client.graphql({
        query: createMessages,
        variables: {
          input: {
            senderEmail: ChmPhn,
            messageBody: `You have been registered as a COMB Officer under Institution ${biz.busName} successfully.`
          }
        }
      });
      if (msgRes?.data?.createMessages) {
        await client.graphql({
          query: sendNotification,
          variables: {
            riderEmail: ChmPhn,
            title: 'MiFedha: COMB Officer Registration',
            body: `You have been registered as a COMB Officer under Institution ${biz.busName} successfully.`
          }
        });
        Alert.alert('COMB Officer registered successfully');
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error! Ensure you enter details correctly!');
    } finally {
      setIsLoading(false);
      setChmPhn('');
      setPW('');
      setChmDesc('');
      setChmNm('');
      setChmRegNo('');
      setMmbaID('');
      setSign2Phn('');
    }
  };
  return <LinearGradient colors={['#e58d29', '#87ceeb']} style={{
    flex: 1
  }}>
      <ScrollView contentContainerStyle={{
      padding: 20
    }}>
        <View style={ui.header}>
          <Text style={ui.headerTitle}>Register COMB Officer</Text>
          <Text style={ui.headerSub}> Institution Portal</Text>
        </View>

        <View style={ui.card}>
          <Text style={ui.label}>Institution Account Number</Text>
          <TextInput placeholder="07xxxxxxxx" value={ChmRegNo} onChangeText={setChmRegNo} style={ui.input} />

          <Text style={ui.label}>COMB Officer Email</Text>
          <TextInput placeholder="email@example.com" value={ChmPhn} onChangeText={setChmPhn} style={ui.input} />

          <Text style={ui.label}>COMB Officer Work ID</Text>
          <TextInput value={ChmDesc} onChangeText={setChmDesc} style={ui.input} />

          <Text style={{
          marginTop: 10
        }}>Main Account Password</Text>
          <View style={ui.passwordRow}>
            <TextInput style={[ui.input, {
            flex: 1
          }]} value={pword} placeholder="Main Account Password" onChangeText={setPW} secureTextEntry={!showPassword} />
            <TouchableOpacity style={ui.eyeButton} onPress={() => setShowPassword(p => !p)}>
              <Text style={{
              color: '#fff'
            }}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={ChckUsrExistence} disabled={isLoading}>
            <LinearGradient colors={['#e58d29', '#f2b66d']} style={ui.button}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={ui.buttonText}>
                  Register Sales Officer
                </Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>;
};
export default CreateChama;
const ui = StyleSheet.create({
  /* ===== Screen ===== */
  screen: {
    flex: 1
  },
  /* ===== Header ===== */
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5
  },
  headerSub: {
    fontSize: 14,
    color: "#f2f2f2",
    marginTop: 6
  },
  /* ===== Card ===== */
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6
  },
  /* ===== Labels ===== */
  label: {
    fontSize: 13,
    color: "#444",
    marginBottom: 6,
    marginTop: 16,
    fontWeight: "500"
  },
  /* ===== Inputs ===== */
  input: {
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: "#fafafa",
    color: "#222"
  },
  /* ===== Password Row ===== */
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  eyeButton: {
    marginLeft: 10,
    backgroundColor: "#e58d29",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  /* ===== Button ===== */
  button: {
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.4
  }
});