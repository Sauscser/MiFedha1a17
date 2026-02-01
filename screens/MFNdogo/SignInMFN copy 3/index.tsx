import React, { useEffect, useState } from 'react';
import { createCompany } from '../../../src/graphql/mutations';
import { getAgent, getBankAdmin, getCompany, getSAgent } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const MFNSignIn = props => {
  const navigation = useNavigation();
  const [MFNId, setMFNId] = useState("");
  const [MFNPW, setMFNPW] = useState("");
  const [ownr, setownr] = useState(null);
  const moveToMFNHm = () => {
    navigation.navigate("VwMFNWthdrlss", {
      MFNId
    });
  };
  const fetchUser = async () => {
    const userInfo = await getCurrentUser();
    setownr(userInfo.userId);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchMFNDts = async () => {
    try {
      const MFNDtls: any = await client.graphql({
        query: getAgent,
        variables: {
          phonecontact: MFNId
        }
      });
      const pw1s = MFNDtls.data.getAgent.pw;
      const owners = MFNDtls.data.getAgent.owner;
      if (owners !== ownr) {
        Alert.alert("You dont own this MFNdogo");
      } else if (MFNPW !== pw1s) {
        Alert.alert("Wrong MFNdogo credentials");
      } else {
        moveToMFNHm();
      }
    } catch (e) {
      if (e) {
        Alert.alert("MFNdogo does not exist; otherwise check internet connection");
        return;
      }
      console.log(e);
    }
    setMFNId("");
    setMFNPW("");
  };
  useEffect(() => {
    const mfnID = MFNId;
    if (!mfnID && mfnID !== "") {
      setMFNId("");
      return;
    }
    setMFNId(mfnID);
  }, [MFNId]);
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
                <ScrollView>
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput placeholder="+2547xxxxxxxx" value={MFNId} onChangeText={setMFNId} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MFNdogo Phone</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={MFNPW} onChangeText={setMFNPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Pass Word</Text>
                  </View>
        
                  <TouchableOpacity onPress={fetchMFNDts} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Sign In
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default MFNSignIn;