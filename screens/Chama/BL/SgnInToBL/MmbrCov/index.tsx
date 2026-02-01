import React, { useEffect, useState } from 'react';
import { getGroup } from '../../../../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
const client = generateClient();
const ChmSignIn = props => {
  const navigation = useNavigation();
  const [grpContact, setChmPhn] = useState('');
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState('');
  const [ownr, setownr] = useState(null);
  const ChmNMmbrPhns = grpContact;
  const FetchGrpLonsSts = () => {
    navigation.navigate("Vw2BLCovs", {
      ChmNMmbrPhns
    });
  };
  const fetchUser = async () => {
    const userInfo = await getCurrentUser();
    setownr(userInfo.userId);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const gtChmDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attrs = await fetchUserAttributes();
      const compDtls: any = await client.graphql({
        query: getGroup,
        variables: {
          grpContact
        }
      });
      const group = compDtls.data.getGroup;
      const {
        signitoryPW,
        owner,
        signitory2Sub,
        objectionStatus,
        Admin1,
        Admin2,
        Admin3,
        Admin4,
        Admin5,
        Admin6,
        Admin7,
        Admin8,
        Admin9,
        Admin10,
        Admin11,
        Admin12,
        Admin13,
        Admin14,
        Admin15,
        Admin16,
        Admin17,
        Admin18,
        Admin19,
        Admin20
      } = group;
      if (signitoryPW !== pword) {
        Alert.alert("Wrong author credentials");
      } else if (ownr !== owner && signitory2Sub !== userInfo.userId && Admin1 !== attrs.email && Admin2 !== attrs.email && Admin3 !== attrs.email && Admin4 !== attrs.email && Admin5 !== attrs.email && Admin6 !== attrs.email && Admin7 !== attrs.email && Admin8 !== attrs.email && Admin9 !== attrs.email && Admin10 !== attrs.email && Admin11 !== attrs.email && Admin12 !== attrs.email && Admin13 !== attrs.email && Admin14 !== attrs.email && Admin15 !== attrs.email && Admin16 !== attrs.email && Admin17 !== attrs.email && Admin18 !== attrs.email && Admin19 !== attrs.email && Admin20 !== attrs.email) {
        Alert.alert("You are neither the author nor signatory nor admin of this Group");
        return;
      } else if (objectionStatus === "Objected") {
        Alert.alert("Group account is locked by the admin");
      } else {
        FetchGrpLonsSts();
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Group does not exist; otherwise check internet connection");
    } finally {
      setIsLoading(false);
      setChmPhn('');
      setPW('');
      setPhoneContacts("");
      setChmDesc("");
      setChmNm("");
      setmemberPhn("");
    }
  };
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Chama Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={grpContact} onChangeText={setChmPhn} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama Account Number</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={pword} onChangeText={setPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama PassWord</Text>
          </View>

          <TouchableOpacity onPress={gtChmDtls} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>Click to View</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default ChmSignIn;