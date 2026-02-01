import React, { useState } from 'react';
import { updateCompany, updateGroup } from '../../../../src/graphql/mutations';
import { getCompany, getGroup, getSMAccount } from '../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
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
      const grpNames = compDtls.data.getGroup.grpName;
      const statuss = compDtls.data.getGroup.status;
      const owners = compDtls.data.getGroup.owner;
      const updtChmDtls = async () => {
        await client.graphql({
          query: updateGroup,
          variables: {
            input: {
              grpContact: groupCnt,
              signitoryPW: SigntryPW
            }
          }
        });
        Alert.alert(user.username + " has updated " + grpNames + "'s Chama password");
      };
      if (SMPW !== pws) {
        Alert.alert("Wrong Main A/C PW; Prove authorship of Chama");
      } else if (user.userId !== owners) {
        Alert.alert("You are not the author of the Chama");
      } else if (statuss !== "AccountActive") {
        Alert.alert("This Chama Account is inactive");
      } else if (user.userId !== owner) {
        Alert.alert("Please first create main account");
      } else {
        await updtChmDtls();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Check internet; otherwise Chama doesn't exist");
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
            <Text style={styles.title}>Fill Group Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="+2547xxxxxxxx" value={groupCnt} onChangeText={setgroupCnt} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Group Phone</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={SMPW} onChangeText={setSMPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Signitory User PW</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={SigntryPW} onChangeText={setSigntryPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>New Group PassWord</Text>
          </View>

          <TouchableOpacity onPress={fetchChmAuthorDtls} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>Click to Update Group Details</Text>
            {isLoading && <ActivityIndicator color={'Blue'} size="large" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default UpdtChm;