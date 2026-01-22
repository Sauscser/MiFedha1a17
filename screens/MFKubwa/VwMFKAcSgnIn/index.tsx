import React, { useEffect, useState } from 'react';
import { createCompany } from '../../../src/graphql/mutations';
import { getSAgent } from '../../../src/graphql/queries';
import { graphqlOperation, API, Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';

const MFNSignIn = () => {
  const navigation = useNavigation();
  const [MFKPhn, setMFNId] = useState("");
  const [MFNPW, setMFNPW] = useState("");

  const moveToMFNHm = () => {
    navigation.navigate("VwMFKAcs", { MFKPhn });
  };

  const fetchMFNDts = async () => {
    let userInfo;
    try {
      userInfo = await Auth.currentAuthenticatedUser();
    } catch (error) {
      Alert.alert("User not authenticated. Please log in.");
      return;
    }

    try {
      const MFNDtls: any = await API.graphql(
        graphqlOperation(getSAgent, { saPhoneContact: MFKPhn })
      );

      if (!MFNDtls.data.getSAgent) {
        Alert.alert("MFKubwa not found. Check your phone number.");
        return;
      }

      const pw1s = MFNDtls.data.getSAgent.pw;
      const owners = MFNDtls.data.getSAgent.owner;

      if (owners !== userInfo.attributes.sub) {
        Alert.alert("You don’t own this MFKubwa");
        setMFNId("");
        setMFNPW("");
        return;
      } else if (MFNPW !== pw1s) {
        Alert.alert("Wrong MFKubwa credentials");
        setMFNPW("");
        return;
      }

      moveToMFNHm();
    } catch (e) {
      console.log(e);
      Alert.alert("Error! Retry or update app");
    }
  };

  useEffect(() => {
    setMFNId(MFKPhn);
  }, [MFKPhn]);

  useEffect(() => {
    setMFNPW(MFNPW);
  }, [MFNPW]);

  return (
    <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              placeholder="+2547xxxxxxxx"
              value={MFKPhn}
              onChangeText={setMFNId}
              style={styles.sendLoanInput}
              editable={true}
            />
            <Text style={styles.sendLoanText}>MFKubwa Phone</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={MFNPW}
              onChangeText={setMFNPW}
              secureTextEntry={true}
              style={styles.sendLoanInput}
              editable={true}
            />
            <Text style={styles.sendLoanText}>Pass Word</Text>
          </View>

          <TouchableOpacity onPress={fetchMFNDts} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>Click to View</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default MFNSignIn;
