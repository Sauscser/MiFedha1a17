import React, { useEffect, useState } from 'react';
import { createChamasRegConfirm, updateCompany, updateGroup, updateGrpMembers, updateSMAccount } from '../../../src/graphql/mutations';
import { getCompany, getGroup, getGrpMembers, getSMAccount } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { updateBankAdmin } from '../../../src/graphql/mutations';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const UpdtSMPW = props => {
  const navigation = useNavigation();
  const [CompPW2, setCompPW2] = useState("");
  const [groupCnt, setgroupCnt] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [CompPW1, setCompPW1] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchSMDtls = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const userInfo = await fetchUserAttributes();
    try {
      const compDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const owners = compDtls.data.getCompany.owner;
      const ttlvats = compDtls.data.getCompany.ttlvat;
      const pw1 = compDtls.data.getCompany.pw1;
      const updtSMDtls = async () => {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        try {
          await client.graphql({
            query: updateCompany,
            variables: {
              input: {
                AdminId: "BaruchHabaB'ShemAdonai2",
                ttlvat: parseFloat(ttlvats) - parseFloat(CompPW2)
              }
            }
          });
        } catch (error) {
          if (error) {
            console.log(error);
            Alert.alert("Please check internet");
          }
        }
        await onCreateNewMFN();
        setIsLoading(false);
        Alert.alert("You have successfully withdrawn VAT");
      };
      const onCreateNewMFN = async () => {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        try {
          await client.graphql({
            query: createChamasRegConfirm,
            variables: {
              input: {
                contact: CompPW2,
                regNo: "Nothing",
                owner: userInfo.owner,
                AcStatus: 'AccountActive'
              }
            }
          });
        } catch (error) {
          console.log(error);
          if (error) {
            Alert.alert("Not authorised");
            return;
          }
        }
        setIsLoading(false);
        Alert.alert("Account successfully created");
      };
      if (parseFloat(CompPW2) > ttlvats) {
        Alert.alert("Requested amount more than balance");
      } else if (userInfo.owner !== owners) {
        Alert.alert("You are not the author of this Account");
      } else if (pw1 !== CompPW1) {
        Alert.alert("Wrong Executive password");
      } else {
        updtSMDtls();
      }
    } catch (error) {
      if (error) {
        Alert.alert("Check internet; otherwise Chama doesnt exist");
        return;
      }
    }
    setIsLoading(false);
    setgroupCnt("");
    setCompPW1("");
    setCompPW2("");
    setLnAcCod("");
  };
  useEffect(() => {
    const groupCnts = groupCnt;
    if (!groupCnts && groupCnts !== "") {
      setgroupCnt("");
      return;
    }
    setgroupCnt(groupCnts);
  }, [groupCnt]);
  useEffect(() => {
    const CompPW1s = CompPW1;
    if (!CompPW1s && CompPW1s !== "") {
      setCompPW1("");
      return;
    }
    setCompPW1(CompPW1s);
  }, [CompPW1]);
  useEffect(() => {
    const LnAcCods = LnAcCod;
    if (!LnAcCods && LnAcCods !== "") {
      setLnAcCod("");
      return;
    }
    setLnAcCod(LnAcCods);
  }, [LnAcCod]);
  useEffect(() => {
    const CompPW2s = CompPW2;
    if (!CompPW2s && CompPW2s !== "") {
      setCompPW2("");
      return;
    }
    setCompPW2(CompPW2s);
  }, [CompPW2]);
  return <View>
              <View style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Ac Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={CompPW1} onChangeText={setCompPW1} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>PassWord</Text>
                  </View>   

                  <View style={styles.sendLoanView}>
                    <TextInput keyboardType={"decimal-pad"} value={CompPW2} onChangeText={setCompPW2} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Amount</Text>
                  </View>         

                  
                  <TouchableOpacity onPress={fetchSMDtls} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Withdraw
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large" />}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default UpdtSMPW;