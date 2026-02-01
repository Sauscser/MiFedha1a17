import React, { useEffect, useState } from 'react';
import { createCompany } from '../../../src/graphql/mutations';
import { getAgent, getBankAdmin, getBizna, getCompany, getSAgent } from '../../../src/graphql/queries';
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
  const fetchMFNDts = async () => {
    const userInfo = await getCurrentUser();
    try {
      const MFNDtls: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: MFNId
        }
      });
      const pw1s = MFNDtls.data.getBizna.pw;
      const owners = MFNDtls.data.getBizna.owner;
      const BusinessRegNos = MFNDtls.data.getBizna.BusinessRegNo;
      const VwMFNAc = () => {
        navigation.navigate("ViewBiznaShareSent", {
          MFNId
        });
      };
      if (owners !== userInfo.userId) {
        Alert.alert("You dont own this Business");
      } else if (MFNPW !== pw1s) {
        Alert.alert("Wrong Admin password");
      } else {
        VwMFNAc();
      }
    } catch (e) {
      if (e) {
        Alert.alert("Business does not exist; otherwise check internet connection");
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
                    <Text style={styles.sendLoanText}>Business Phone</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={MFNPW} onChangeText={setMFNPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Business PassWord</Text>
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