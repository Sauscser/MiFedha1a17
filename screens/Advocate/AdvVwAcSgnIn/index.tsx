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
  const [ownr, setownr] = useState(null);
  const VwMFNAc = () => {
    navigation.navigate("VwAdvAcs", {
      AdvReNo
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
  };
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
  return <View style={styles.image}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.loanTitleView}>
          <Text style={styles.title}>Fill Details Below</Text>
        </View>

        <View style={styles.sendLoanView}>
          <TextInput value={AdvReNo} onChangeText={setMFNId} style={styles.sendLoanInput} editable={true} />
          <Text style={styles.sendLoanText}>Advocate License Number</Text>
        </View>

        <View style={styles.sendLoanView}>
          <TextInput value={MFNPW} onChangeText={setMFNPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
          <Text style={styles.sendLoanText}>Advocate PassWord</Text>
        </View>

        <TouchableOpacity onPress={fetchMFNDts} style={styles.sendLoanButton}>
          <Text style={styles.sendLoanButtonText}>
            Click to View
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>;
};
export default MFNSignIn;