import React, { useEffect, useState } from 'react';
import { createChamasNPwnBrkrs, createSMAccount, updateCompany } from '../../../src/graphql/mutations';
import { getCompany, listSMAccounts } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const CreateAcForm = props => {
  const navigation = useNavigation();
  const [nationalId, setNationalid] = useState('');
  const [phoneContact, setPhoneContact] = useState(null);
  const [awsEmail, setAWSEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ownr, setownr] = useState(null);
  const moveToWelcomPg = () => {
    navigation.navigate("WelcomePgss", {
      awsEmail
    });
  };
  const fetchUser = async () => {
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    setownr(userInfo.userId);
    setPhoneContact(attributes.phone_number);
    setAWSEmail(attributes.email);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const ChckUsrExistence = async () => {
    try {
      const UsrDtls: any = await client.graphql({
        query: listSMAccounts,
        variables: {
          filter: {
            awsemail: {
              eq: nationalId
            }
          }
        }
      });
      if (UsrDtls.data.listSMAccounts.items.length < 1) {
        Alert.alert("Let User first register a single member account");
        return;
      } else {
        onCreateNewSMAc();
      }
    } catch (e) {
      if (e) {
        Alert.alert("Unauthorised to register");
      }
      console.error(e);
    }
  };
  const onCreateNewSMAc = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await client.graphql({
        query: createChamasNPwnBrkrs,
        variables: {
          input: {
            contact: nationalId,
            regNo: pword,
            AcStatus: 'AccountActive',
            owner: ownr
          }
        }
      });
    } catch (error) {
      console.log(error);
      if (error) {
        Alert.alert("Sign up using a different Phone Number");
        return;
      }
    }
    setNationalid("");
    setPW("");
    setIsLoading(false);
    Alert.alert("Account successfully created");
  };
  useEffect(() => {
    const natid = nationalId;
    if (!natid && natid !== "") {
      setNationalid("");
      return;
    }
    setNationalid(natid);
  }, [nationalId]);
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
                    <Text style={styles.title}>Enter Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput placeholder={"Loaner Email"} value={nationalId} onChangeText={setNationalid} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Loaner Email </Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={pword} onChangeText={setPW} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Loaner Registration Number </Text>
                  </View>
        
                  <TouchableOpacity onPress={ChckUsrExistence} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Register
                    </Text>
                    {isLoading && <ActivityIndicator size="large" color="blue" />}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default CreateAcForm;