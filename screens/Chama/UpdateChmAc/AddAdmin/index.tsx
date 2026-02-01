import React, { useEffect, useState } from 'react';
import { updateBizna, updateCompany, updateGroup, updateSMAccount, updateBankAdmin } from '../../../../src/graphql/mutations';
import { getGroup, getCompany, getSMAccount, listSMAccounts, listChamaMembers } from '../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const UpdtSMPW = props => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [groupCnt, setgroupCnt] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [SMPW, setSMPW] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchSMDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const compDtls: any = await client.graphql({
        query: getGroup,
        variables: {
          grpContact: groupCnt
        }
      });
      const UsrDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const owners = compDtls.data.getGroup.owner;
      const AdminNo = compDtls.data.getGroup.AdminNo;
      const pw = compDtls.data.getGroup.signitoryPW;
      const UsrDtlx = UsrDtls.data.getSMAccount;

      // Check user existence
      const memberCheck: any = await client.graphql({
        query: listChamaMembers,
        variables: {
          filter: {
            and: {
              memberContact: {
                eq: LnAcCod
              }
            }
          }
        }
      });

      // ✅ Single reusable function for updating Admin slots
      const updateAdmin = async (slot: number, displayName: string) => {
        const fieldName = `Admin${slot}`;
        await client.graphql({
          query: updateGroup,
          variables: {
            input: {
              grpContact: groupCnt,
              [fieldName]: LnAcCod,
              AdminNo: parseFloat(AdminNo) + 1
            }
          }
        });
        Alert.alert(`${displayName}, You have successfully Added Admin number ${parseFloat(AdminNo) + 1}`);
      };

      // Example usage:
      // Call updateAdmin with the slot number you want to update
      // and the name you want to display in the alert.
      // For instance:
      await updateAdmin(1, UsrDtlx.name);
      // await updateAdmin(2, user.username);
      // await updateAdmin(3, user.username);
      // …and so on up to 16
    } catch (error) {
      console.log(error);
      Alert.alert("Check your internet connection");
    } finally {
      setIsLoading(false);
    }
  };
  return <View>
              <View style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={groupCnt} onChangeText={setgroupCnt} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Group Phone</Text>
                  </View>    
                  
                  <View style={styles.sendLoanView}>
                    <TextInput value={LnAcCod} onChangeText={setLnAcCod} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Admin Main Account Email</Text>
                  </View>    
                  
                  <View style={styles.sendLoanView}>
                    <TextInput value={SMPW} onChangeText={setSMPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Group Ac PW</Text>
                  </View>       

                  
                  <TouchableOpacity onPress={fetchSMDtls} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Update Group Details
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large" />}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default UpdtSMPW;