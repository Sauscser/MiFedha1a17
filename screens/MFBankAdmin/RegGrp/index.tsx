import React, {useEffect, useState} from 'react';

import {createBankAdmin, createChamaApply, createChamaApply2, updateCompany} from '../../../src/graphql/mutations';
import {getBankAdmin, getCompany, getMiFedhaBankAdmin, getSMAccount} from '../../../src/graphql/queries';
import {Auth, graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';

const CreateAdminForm = () => { 
  const navigation = useNavigation();
  const [BankAdminAccounts, setBankAdminAccounts] = useState("");
  const [ChamaAcNus, setChamaAcNus] = useState("");
  const [nationalId, setNationalid] = useState("");
  const [pword, setPW] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {};

  useEffect(() => {
    fetchUser();
  }, []);

  const gtUsrDtls4AdminDtls = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const resp = await API.graphql(
        graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email})
      );
      const adminId = resp.data.getSMAccount.nationalid;
      const adminEml = resp.data.getSMAccount.awsemail;

      const gtCompDtls = async () => {
        try {
          const compDtls = await API.graphql(
            graphqlOperation(getMiFedhaBankAdmin, {nationalid: adminId})
          );
          const bank = compDtls.data.getMiFedhaBankAdmin.bank;
          const pws = compDtls.data.getMiFedhaBankAdmin.pw;

          if (pws !== pword) {
            Alert.alert("Wrong Bank Admin Password");
            setIsLoading(false);
            return;
          }

          await API.graphql(
            graphqlOperation(createChamaApply2, {
              input: {
                ChamaAdminEmail: nationalId,
                bankAdminEmail: adminId,
                BankAdminAccount: bank,
                ChamaAcNu: ChamaAcNus,
                mfnReg: 0,
                status: "AccountActive",
              },
            })
          );

          await API.graphql(
            graphqlOperation(updateCompany, {
              input: {AdminId: "BaruchHabaB'ShemAdonai2"},
            })
          );

          Alert.alert("Successful. Group admin may create group account");
        } catch (error) {
          console.log(error);
          Alert.alert("Application unsuccessful; Retry or update app");
        } finally {
          setIsLoading(false);
          setNationalid("");
          setChamaAcNus("");
          setBankAdminAccounts("");
          setPW("");
        }
      };

      await gtCompDtls();
    } catch (e) {
      console.log(e);
      Alert.alert("Check your internet");
      setIsLoading(false);
    }
  };

  return (
    <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Account Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={nationalId}
              onChangeText={setNationalid}
              style={styles.sendLoanInput}
              placeholder="Chama Admin Email"
              editable={!isLoading}
            />
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={ChamaAcNus}
              onChangeText={setChamaAcNus}
              style={styles.sendLoanInput}
              placeholder="Chama Account Number"
              editable={!isLoading}
            />
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={pword}
              onChangeText={setPW}
              secureTextEntry={true}
              style={styles.sendLoanInput}
              placeholder="Password"
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity
            onPress={gtUsrDtls4AdminDtls}
            style={styles.sendLoanButton}
            disabled={isLoading}
          >
            <Text style={styles.sendLoanButtonText}>Click to Apply Account</Text>
            {isLoading && <ActivityIndicator color={'blue'} size="large" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateAdminForm;
