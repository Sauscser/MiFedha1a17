import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { getBankAdmin } from '../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const ChmSignIn = props => {
  const navigation = useNavigation();
  const [grpContact, setChmPhn] = useState('');
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [id, setid] = useState('');
  const [ownr, setownr] = useState(null);
  const FetchGrpLonsSts = () => {
    navigation.navigate("SendNonLonsRevVw", {
      phoneContacts
    });
  };
  const fetchUser = async () => {
    const userInfo = await getCurrentUser();
    setownr(userInfo.userId);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const gtAdmDtls = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const compDtls: any = await client.graphql({
        query: getBankAdmin,
        variables: {
          nationalid: grpContact
        }
      });
      const signitoryPWs = compDtls.data.getBankAdmin.pw;
      const owners = compDtls.data.getBankAdmin.owner;
      if (signitoryPWs !== pword) {
        Alert.alert("Wrong Admin credentials");
      } else if (ownr !== owners) {
        Alert.alert("This is not your Admin Account");
      } else {
        FetchGrpLonsSts();
      }
    } catch (e) {
      console.log(e);
      if (e) {
        Alert.alert("Admin does not exist; otherwise check internet");
        return;
      }
    }
    setIsLoading(false);
    setChmPhn('');
    setPW('');
    setPhoneContacts("");
    setid("");
    setChmNm("");
    setIsLoading(false);
  };
  useEffect(() => {
    const phoneContactss = phoneContacts;
    if (!phoneContactss && phoneContactss !== "") {
      setPhoneContacts("");
      return;
    }
    setPhoneContacts(phoneContactss);
  }, [phoneContacts]);
  useEffect(() => {
    const ChmNms = ChmNm;
    if (!ChmNms && ChmNms !== "") {
      setChmNm("");
      return;
    }
    setChmNm(ChmNms);
  }, [ChmNm]);
  useEffect(() => {
    const ChmPhns = grpContact;
    if (!ChmPhns && ChmPhns !== "") {
      setChmPhn("");
      return;
    }
    setChmPhn(ChmPhns);
  }, [grpContact]);
  useEffect(() => {
    const pws = pword;
    if (!pws && pws !== "") {
      setPW("");
      return;
    }
    setPW(pws);
  }, [pword]);
  return <View>
              <View style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Chama Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={grpContact} onChangeText={setChmPhn} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Admin ID</Text>
                  </View>



                  <View style={styles.sendLoanView}>
                    <TextInput value={pword} onChangeText={setPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Admin PW</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput placeholder="+2547xxxxxxxx" value={phoneContacts} onChangeText={setPhoneContacts} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>User Phone Number</Text>
                  </View>

                 
        
                  <TouchableOpacity onPress={gtAdmDtls} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to View
                    </Text>
                    {isLoading && <ActivityIndicator size="large" color="blue" />}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default ChmSignIn;