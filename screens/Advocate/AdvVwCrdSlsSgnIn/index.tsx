import React, { useEffect, useState } from 'react';
import { getAdvocate } from '../../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
const client = generateClient();
const MFNSignIn = props => {
  const navigation = useNavigation();
  const [AdvReNo, setMFNId] = useState("");
  const [MFNPW, setMFNPW] = useState("");
  const [MembrPhn, setMembrPhn] = useState("");
  const [ChamPhn, setChamPhn] = useState("");
  const [ownr, setownr] = useState(null);
  const AdvChmMmbr = ChamPhn + MembrPhn + AdvReNo;
  const VwMFNAc = () => {
    navigation.navigate("VwAdvCrdSlrCovLnss", {
      AdvChmMmbr
    });
  };
  const fetchUser = async () => {
    try {
      const userInfo = await getCurrentUser();
      setownr(userInfo.userId); // sub
    } catch (e) {
      console.log("Error fetching user:", e);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchMFNDts = async () => {
    try {
      const MFNDtls: any = await client.graphql({
        query: getAdvocate,
        variables: {
          advregnu: AdvReNo
        }
      });
      const pw1s = MFNDtls.data.getAdvocate.pwd;
      const owners = MFNDtls.data.getAdvocate.owner;
      if (owners !== ownr) {
        Alert.alert("You dont own this Advocacy");
      } else if (MFNPW !== pw1s) {
        Alert.alert("Wrong Advocate credentials");
      } else {
        VwMFNAc();
      }
    } catch (e) {
      if (e) {
        Alert.alert("Error! Access denied!");
        return;
      }
      console.log(e);
    }
    setMFNId("");
    setMFNPW("");
    setMembrPhn("");
    setChamPhn("");
  };
  useEffect(() => {
    const MembrPhns = MembrPhn;
    if (!MembrPhns && MembrPhns !== "") {
      setMembrPhn("");
      return;
    }
    setMembrPhn(MembrPhns);
  }, [MembrPhn]);
  useEffect(() => {
    const ChamPhns = ChamPhn;
    if (!ChamPhns && ChamPhns !== "") {
      setChamPhn("");
      return;
    }
    setChamPhn(ChamPhns);
  }, [ChamPhn]);
  useEffect(() => {
    const mfnID = AdvReNo;
    if (!mfnID && mfnID !== "") {
      setMFNId("");
      return;
    }
    setMFNId(mfnID);
  }, [AdvReNo]);
  useEffect(() => {
    const mfnPW = MFNPW;
    if (!mfnPW && mfnPW !== "") {
      setMFNPW("");
      return;
    }
    setMFNPW(mfnPW);
  }, [MFNPW]);
  return <View>
      <View style={styles.image}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="+2547xxxxxxxx" value={ChamPhn} onChangeText={setChamPhn} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Business Phone</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={MembrPhn} onChangeText={setMembrPhn} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Buyer email</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={AdvReNo} onChangeText={setMFNId} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Advocate License Number</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={MFNPW} onChangeText={setMFNPW} style={styles.sendLoanInput} secureTextEntry={true} editable={true} />
            <Text style={styles.sendLoanText}>Advocate Pass Word</Text>
          </View>

          <TouchableOpacity onPress={fetchMFNDts} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>
              Click to View
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default MFNSignIn;