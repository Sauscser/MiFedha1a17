import React, { useEffect, useState } from 'react';
import { getCompany, getGroup, getSMAccount, listSMAccounts } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
const client = generateClient();
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
  const [memberPhn, setmemberPhn] = useState('');
  const ChmNMmbrPhns = grpContact + memberPhn;
  const FetchGrpLonsSts = () => {
    navigation.navigate("VwChmMbrs2Ln", {
      ChmNMmbrPhns
    });
  };
  const gtChmDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const user = await getCurrentUser();
    try {
      const compDtls: any = await client.graphql({
        query: getGroup,
        variables: {
          grpContact
        }
      });
      const signitoryPWs = compDtls.data.getGroup.signitoryPW;
      const owners = compDtls.data.getGroup.owner;
      if (signitoryPWs !== pword) {
        Alert.alert("Wrong author credentials");
      } else if (user.userId !== owners) {
        Alert.alert("You are not the author of the group");
      } else {
        FetchGrpLonsSts();
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Group does not exist; otherwise check internet connection");
      return;
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
                    <TextInput placeholder="+2547xxxxxxxx" value={grpContact} onChangeText={setChmPhn} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Chama Phone Number</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput placeholder="Member Email" value={memberPhn} onChangeText={setmemberPhn} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Member Email</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput value={pword} onChangeText={setPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Chama PassWord</Text>
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