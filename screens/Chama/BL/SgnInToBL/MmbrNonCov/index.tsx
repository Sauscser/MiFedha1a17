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
    navigation.navigate("Vw2BLNonCovs", {
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
      const compDtls: any = await client.graphql({
        query: getGroup,
        variables: {
          grpContact
        }
      });
      const group = compDtls.data.getGroup;
      const signitoryPW = group.signitoryPW;
      const owner = group.owner;
      if (signitoryPW !== pword) {
        Alert.alert("Wrong author credentials");
      } else if (ownr !== owner) {
        Alert.alert("You are not the author of the group");
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
            <TextInput placeholder="+2547xxxxxxxx" value={grpContact} onChangeText={setChmPhn} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama Phone Number</Text>
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