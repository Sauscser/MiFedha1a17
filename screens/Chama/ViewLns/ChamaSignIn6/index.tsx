import React, { useEffect, useState } from 'react';
import { getCompany, getGroup, getSMAccount, listSMAccounts } from '../../../../src/graphql/queries';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
const graphqlClient = generateClient();
const ChmSignIn = props => {
  const navigation = useNavigation();
  const [grpContact, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const FetchGrpLonsSts = () => {
    navigation.navigate("ChmVwMmbrss", {
      groupContact
    });
  };
  const gtChmDtls = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    const userInfo2 = await fetchUserAttributes();
    try {
      const compDtls1: any = await graphqlClient.graphql({
        query: getSMAccount,
        variables: {
          awsemail: userInfo2.email
        }
      });
      const pw = compDtls1.data.getSMAccount.pw;
      const gtChmDtls2 = async () => {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        const userInfo = await getCurrentUser();
        const userInfo2 = await fetchUserAttributes();
        try {
          const compDtls: any = await graphqlClient.graphql({
            query: getGroup,
            variables: {
              grpContact: grpContact
            }
          });
          const owners = compDtls.data.getGroup.owner;
          const signitory2Subs = compDtls.data.getGroup.signitory2Sub;
          const Admin1 = compDtls.data.getGroup.Admin1;
          const Admin2 = compDtls.data.getGroup.Admin2;
          const Admin3 = compDtls.data.getGroup.Admin3;
          const Admin4 = compDtls.data.getGroup.Admin4;
          const Admin5 = compDtls.data.getGroup.Admin5;
          const Admin6 = compDtls.data.getGroup.Admin6;
          const Admin7 = compDtls.data.getGroup.Admin7;
          const Admin8 = compDtls.data.getGroup.Admin8;
          const Admin9 = compDtls.data.getGroup.Admin9;
          const Admin10 = compDtls.data.getGroup.Admin10;
          const Admin11 = compDtls.data.getGroup.Admin11;
          const Admin12 = compDtls.data.getGroup.Admin12;
          const Admin13 = compDtls.data.getGroup.Admin13;
          const Admin14 = compDtls.data.getGroup.Admin14;
          const Admin15 = compDtls.data.getGroup.Admin15;
          const Admin16 = compDtls.data.getGroup.Admin16;
          const Admin17 = compDtls.data.getGroup.Admin17;
          const Admin18 = compDtls.data.getGroup.Admin18;
          const Admin19 = compDtls.data.getGroup.Admin19;
          const Admin20 = compDtls.data.getGroup.Admin20;
          if (pw !== pword) {
            Alert.alert("Wrong admin main account credentials");
          } else if (userInfo.userId !== owners && signitory2Subs !== userInfo.userId && Admin1 === userInfo2.email && Admin2 === userInfo2.email && Admin3 === userInfo2.email && Admin4 === userInfo2.email && Admin5 === userInfo2.email && Admin6 === userInfo2.email && Admin7 === userInfo2.email && Admin8 === userInfo2.email && Admin9 === userInfo2.email && Admin10 === userInfo2.email && Admin11 === userInfo2.email && Admin12 === userInfo2.email && Admin13 === userInfo2.email && Admin14 === userInfo2.email && Admin14 === userInfo2.email && Admin15 === userInfo2.email && Admin16 === userInfo2.email && Admin17 === userInfo2.email && Admin18 === userInfo2.email && Admin19 === userInfo2.email && Admin20 === userInfo2.email) {
            Alert.alert("Neither the author nor signatory nor admin of this Chama");
          } else {
            FetchGrpLonsSts();
          }
        } catch (e) {
          console.log(e);
          if (e) {
            Alert.alert("Group does not exist; otherwise check inernet connection");
            return;
          }
        }
        setIsLoading(false);
      };
      await gtChmDtls2();
    } catch (e) {
      console.log(e);
      if (e) {
        Alert.alert("Group does not exist; otherwise check inernet connection");
        return;
      }
    }
    setIsLoading(false);
    setChmPhn('');
    setPW('');
    setPhoneContacts("");
    setChmDesc("");
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
    const ChmDescs = ChmDesc;
    if (!ChmDescs && ChmDescs !== "") {
      setChmDesc("");
      return;
    }
    setChmDesc(ChmDescs);
  }, [ChmDesc]);
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
            <Text style={styles.sendLoanText}>Chama Account Number</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={pword} onChangeText={setPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
            <Text style={styles.sendLoanText}>AdminMainAcPassWord</Text>
          </View>

          <TouchableOpacity onPress={gtChmDtls} style={styles.sendLoanButton}>
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