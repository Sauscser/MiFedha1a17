import React, { useEffect, useState } from 'react';
import { updateCompany, updateGroup } from '../../../../src/graphql/mutations';
import { getCompany, getGroup, getSMAccount } from '../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { updateBankAdmin } from '../../../../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const UpdtChm = props => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [groupCnt, setgroupCnt] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [SMPW, setSMPW] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchChmAuthorDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const UsrDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const pws = UsrDtls.data.getSMAccount.pw;
      const owner = UsrDtls.data.getSMAccount.owner;
      const compDtls: any = await client.graphql({
        query: getGroup,
        variables: {
          grpContact: groupCnt
        }
      });
      const statuss = compDtls.data.getGroup.status;
      const owners = compDtls.data.getGroup.owner;
      const Admin1 = compDtls.data.getGroup.Admin1;
      const objectionStatus = compDtls.data.getGroup.objectionStatus;
      const Admin2 = compDtls.data.getGroup.Admin2;
      const Admin3 = compDtls.data.getGroup.Admin3;
      const updtChmDtls = async () => {
        await client.graphql({
          query: updateGroup,
          variables: {
            input: {
              grpContact: groupCnt,
              objReason: LnAcCod,
              objectionStatus: "Objected",
              objOfficer: attributes.email
            }
          }
        });
        Alert.alert("Operations on this group stopped");
      };
      if (SMPW !== pws) {
        Alert.alert("Wrong Main A/C PW");
      } else if (user.userId !== owners && Admin1 !== attributes.email && Admin2 !== attributes.email && Admin3 !== attributes.email) {
        Alert.alert("Unauthorised to stop operations");
      } else if (objectionStatus === "Objected") {
        Alert.alert("Already objected");
      } else if (statuss !== "AccountActive") {
        Alert.alert("This Chama Account is inactive");
      } else if (user.userId !== owner) {
        Alert.alert("Please first create main account");
      } else {
        await updtChmDtls();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Retry or update your app or call customer care");
    } finally {
      setIsLoading(false);
      setgroupCnt("");
      setSigntryPW("");
      setSMPW("");
      setLnAcCod("");
    }
  };
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Chama Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="+2547xxxxxxxx" value={groupCnt} onChangeText={setgroupCnt} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Group Phone</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={LnAcCod} onChangeText={setLnAcCod} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Reason</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={SMPW} onChangeText={setSMPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Signitory User PW</Text>
          </View>

          <TouchableOpacity onPress={fetchChmAuthorDtls} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>Click to Update Chama Details</Text>
            {isLoading && <ActivityIndicator color={'Blue'} size="large" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default UpdtChm;