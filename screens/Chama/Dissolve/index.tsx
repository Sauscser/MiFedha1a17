import React, { useEffect, useState } from 'react';
import { deleteGroup, updateCompany } from '../../../src/graphql/mutations';
import { getCompany, getGroup, getSMAccount } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const DissolveChm = props => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [groupCnt, setgroupCnt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ownr, setownr] = useState<string | null>(null);
  const fetchUser = async () => {
    const user = await getCurrentUser();
    setownr(user.userId); // ✅ sub comes from getCurrentUser().userId
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchCompDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const compDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const ttlActiveChms = compDtls.data.getCompany.ttlActiveChm;
      const ttlInactvChms = compDtls.data.getCompany.ttlInactvChm;
      const ftchChmDtls = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
          const grpDtls: any = await client.graphql({
            query: getGroup,
            variables: {
              grpContact: groupCnt
            }
          });
          const signitoryPWs = grpDtls.data.getGroup.signitoryPW;
          const grpNames = grpDtls.data.getGroup.grpName;
          const owners = grpDtls.data.getGroup.owner;
          const ttlNonLonsRecChms = grpDtls.data.getGroup.ttlNonLonsRecChm;
          const ttlNonLonsSentChms = grpDtls.data.getGroup.ttlNonLonsSentChm;
          const grpBals = grpDtls.data.getGroup.grpBal;
          const ttlGrpMemberss = grpDtls.data.getGroup.ttlGrpMembers;
          const usrDtls: any = await client.graphql({
            query: getSMAccount,
            variables: {
              awsemail: attributes.email
            }
          });
          const awsEmails = usrDtls.data.getSMAccount.name;
          const updateComp = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
              await client.graphql({
                query: updateCompany,
                variables: {
                  input: {
                    AdminId: "BaruchHabaB'ShemAdonai2",
                    ttlActiveChm: parseFloat(ttlActiveChms) - 1,
                    ttlInactvChm: parseFloat(ttlInactvChms) + 1
                  }
                }
              });
            } catch (error) {
              Alert.alert("Dissolution unsuccessful; enter details correctly");
              return;
            }
            setIsLoading(false);
            await updtChmDtls();
          };
          if (ttlNonLonsRecChms > ttlNonLonsSentChms) {
            Alert.alert("Chama has Members Money");
            return;
          } else if (signitoryPWs !== SigntryPW) {
            Alert.alert("Wrong signitory password");
            return;
          } else if (ownr !== owners) {
            Alert.alert("You are not the author of the Chama");
            return;
          } else if (parseFloat(ttlGrpMemberss) > 0) {
            Alert.alert("Pls first deregister all members");
            return;
          } else if (grpBals > 1) {
            Alert.alert("Chama has money in its account");
            return;
          } else {
            await updateComp();
          }
          const updtChmDtls = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
              await client.graphql({
                query: deleteGroup,
                variables: {
                  input: {
                    grpContact: groupCnt
                  }
                }
              });
            } catch (error) {
              console.log(error);
              Alert.alert("Error! Access denied!");
            }
            setIsLoading(false);
            Alert.alert(awsEmails + " has dissolved " + grpNames + " Chama");
          };
        } catch (e) {
          Alert.alert("Error! Access denied!");
          return;
        }
      };
      await ftchChmDtls();
    } catch (e) {
      Alert.alert("Error! Access denied!");
      return;
    }
    setIsLoading(false);
    setgroupCnt("");
    setSigntryPW("");
  };
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Chama Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="+2547xxxxxxxx" value={groupCnt} onChangeText={setgroupCnt} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama Account Number</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={SigntryPW} onChangeText={setSigntryPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama PassWord</Text>
          </View>

          <TouchableOpacity onPress={fetchCompDtls} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>
              Click to dissolve Chama
            </Text>
            {isLoading && <ActivityIndicator color={'Blue'} size="large" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default DissolveChm;