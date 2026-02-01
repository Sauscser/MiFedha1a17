import React, { useEffect, useState } from 'react';
import { updateCompany, updateGroup, updateGrpMembers, updateSAgent, updateSMAccount } from '../../../src/graphql/mutations';
import { getBankAdmin, getCompany, getGroup, getGrpMembers, getSAgent, getSMAccount } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { updateBankAdmin } from '../../../src/graphql/mutations';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const UpdtMFKPW = props => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [AdminID, setAdminId] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [NewAdmnPW, setNewAdmnPW] = useState("");
  const [OldAdmnPW, setOldAdmnPW] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchMFKDtls = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const MFKDtls: any = await client.graphql({
        query: getSAgent,
        variables: {
          saPhoneContact: AdminID
        }
      });
      const pws = MFKDtls.data.getSAgent.pw;
      const owners = MFKDtls.data.getSAgent.owner;
      const acStatuss = MFKDtls.data.getSAgent.status;
      const fetchCompDtls = async () => {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        try {
          const CompDtls: any = await client.graphql({
            query: getCompany,
            variables: {
              AdminId: "BaruchHabaB'ShemAdonai2"
            }
          });
          const sagentComs = CompDtls.data.getCompany.sagentCom;
          const userDtls: any = await client.graphql({
            query: getSMAccount,
            variables: {
              awsemail: attributes.email
            }
          });
          const UserDtls = userDtls.data.getSMAccount;
          const updtMFKDtls = async () => {
            if (isLoading) {
              return;
            }
            setIsLoading(true);
            try {
              await client.graphql({
                query: updateSAgent,
                variables: {
                  input: {
                    saPhoneContact: AdminID,
                    MFKWithdrwlFee: NewAdmnPW
                  }
                }
              });
            } catch (error) {
              if (error) {
                Alert.alert("Adjustment unsuccessful; Retry");
                return;
              }
            }
            setIsLoading(false);
            Alert.alert(UserDtls.name + ", You have successfully Adjusted your Commission");
          };
          if (pws !== OldAdmnPW) {
            Alert.alert("Wrong MFKubwa Password");
          } else if (userInfo.sub !== owners) {
            Alert.alert("You are not the owner of this MFKubwa A/c");
          } else if (parseFloat(sagentComs) < parseFloat(NewAdmnPW)) {
            Alert.alert("Set lower commission, maximum is: " + sagentComs);
          } else if (acStatuss !== "AccountActive") {
            Alert.alert("This MFKubwa Account is inactive");
          } else {
            updtMFKDtls();
          }
        } catch (error) {
          if (error) {
            Alert.alert("Retry or update app or call customer care");
            return;
          }
        }
      };
      await fetchCompDtls();
    } catch (error) {
      if (error) {
        Alert.alert("Retry or update app or call customer care");
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
                    <Text style={styles.title}>Fill MFK Details Below</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput placeholder="+2547xxxxxxxx" value={AdminID} onChangeText={setAdminId} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MFKubwa Phone</Text>
                  </View> 
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={OldAdmnPW} onChangeText={setOldAdmnPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MFKubwa PW</Text>
                  </View>   

                       

                  <View style={styles.sendLoanView}>
                    <TextInput value={NewAdmnPW} onChangeText={setNewAdmnPW} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Commission Discount</Text>
                  </View>     

                                   
        
                  <TouchableOpacity onPress={fetchMFKDtls} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Update MFK Details
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large" />}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default UpdtMFKPW;