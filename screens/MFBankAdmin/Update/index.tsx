import React, { useEffect, useState } from 'react';
import { updateCompany, updateGroup, updateMiFedhaBankAdmin, updateSMAccount } from '../../../src/graphql/mutations';
import { getBankAdmin, getCompany, getSMAccount } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { updateBankAdmin } from '../../../src/graphql/mutations';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const UpdtMFAdmPW = props => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [AdminID, setAdminId] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [NewAdmnPW, setNewAdmnPW] = useState("");
  const [OldAdmnPW, setOldAdmnPW] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchAdmnDtls = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const compDtls: any = await client.graphql({
        query: getBankAdmin,
        variables: {
          nationalid: AdminID
        }
      });
      const pws = compDtls.data.getBankAdmin.pw;
      const owners = compDtls.data.getBankAdmin.owner;
      const acStatuss = compDtls.data.getBankAdmin.acStatus;
      const userDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const UserDtls = userDtls.data.getSMAccount;
      const updtAdmnDtls = async () => {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        try {
          await client.graphql({
            query: updateMiFedhaBankAdmin,
            variables: {
              input: {
                nationalid: AdminID,
                pw: NewAdmnPW
              }
            }
          });
        } catch (error) {
          if (error) {
            Alert.alert("Update unsuccessful; Retry");
            return;
          }
        }
        setIsLoading(false);
        Alert.alert(UserDtls.name + ", You have successfully updated your PassWord");
      };
      if (userInfo.sub !== owners) {
        Alert.alert("You are not the owner of this Admin A/c");
      } else if (acStatuss !== "AccountActive") {
        Alert.alert("This Admin Account is inactive");
      } else {
        updtAdmnDtls();
      }
    } catch (error) {
      if (error) {
        Alert.alert("Check internet; otherwise Chama doesnt exist");
        return;
      }
    }
    setIsLoading(false);
    setNewAdmnPW("");
    setSigntryPW("");
    setOldAdmnPW("");
    setAdminId("");
  };
  useEffect(() => {
    const NewAdmnPWs = NewAdmnPW;
    if (!NewAdmnPWs && NewAdmnPWs !== "") {
      setNewAdmnPW("");
      return;
    }
    setNewAdmnPW(NewAdmnPWs);
  }, [NewAdmnPW]);
  useEffect(() => {
    const OldAdmnPWs = OldAdmnPW;
    if (!OldAdmnPWs && OldAdmnPWs !== "") {
      setOldAdmnPW("");
      return;
    }
    setOldAdmnPW(OldAdmnPWs);
  }, [OldAdmnPW]);
  useEffect(() => {
    const LnAcCods = LnAcCod;
    if (!LnAcCods && LnAcCods !== "") {
      setLnAcCod("");
      return;
    }
    setLnAcCod(LnAcCods);
  }, [LnAcCod]);
  useEffect(() => {
    const AdminIDs = AdminID;
    if (!AdminIDs && AdminIDs !== "") {
      setAdminId("");
      return;
    }
    setAdminId(AdminIDs);
  }, [AdminID]);
  return <View>
              <View style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Admin Details Below</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput value={AdminID} onChangeText={setAdminId} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Admin ID</Text>
                  </View> 
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={OldAdmnPW} onChangeText={setOldAdmnPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Old Admin PW</Text>
                  </View>   

                       

                  <View style={styles.sendLoanView}>
                    <TextInput value={NewAdmnPW} onChangeText={setNewAdmnPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>New Admin PW</Text>
                  </View>     

                                   
        
                  <TouchableOpacity onPress={fetchAdmnDtls} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Update Admin Details
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large" />}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default UpdtMFAdmPW;