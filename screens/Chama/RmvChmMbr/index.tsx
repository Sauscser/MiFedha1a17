import React, { useEffect, useState } from 'react';
import { deleteChamaMembers, updateGroup, updateBankAdmin } from '../../../src/graphql/mutations';
import { getChamaMembers, getGroup, getSMAccount } from '../../../src/graphql/queries';
import Communications from 'react-native-communications';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const DeregChmMmbr = props => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [ChmMmbrId, setChmMmbrId] = useState("");
  const [grpContactz, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [MmberId, setMmberId] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState('');
  const ChmNMmbrPhns = MmberId + grpContactz;
  const route = useRoute();
  const fetchChmMmbrDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const compDtls: any = await client.graphql({
        query: getChamaMembers,
        variables: {
          ChamaNMember: ChmNMmbrPhns
        }
      });
      const groupContacts = compDtls.data.getChamaMembers.groupContact;
      const memberContacts = compDtls.data.getChamaMembers.memberContact;
      const memberNames = compDtls.data.getChamaMembers.memberName;
      const ftchChmDtls = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
          const compDtls: any = await client.graphql({
            query: getGroup,
            variables: {
              grpContact: grpContactz
            }
          });
          const signitoryPWs = compDtls.data.getGroup.signitoryPW;
          const grpNames = compDtls.data.getGroup.grpName;
          const ttlGrpMemberss = compDtls.data.getGroup.ttlGrpMembers;
          const owners = compDtls.data.getGroup.owner;
          const ftchUsrDtls = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
              const UsrDtls: any = await client.graphql({
                query: getSMAccount,
                variables: {
                  awsemail: memberContacts
                }
              });
              const ownersss = UsrDtls.data.getSMAccount.owner;
              const name = UsrDtls.data.getSMAccount.name;
              const phonecontact = UsrDtls.data.getSMAccount.phonecontact;
              const updtChmDtls = async () => {
                if (isLoading) return;
                setIsLoading(true);
                try {
                  await client.graphql({
                    query: updateGroup,
                    variables: {
                      input: {
                        grpContact: grpContactz,
                        ttlGrpMembers: parseFloat(ttlGrpMemberss) - 1
                      }
                    }
                  });
                } catch (error) {
                  console.log(error);
                }
                setIsLoading(false);
                Alert.alert(grpNames + " has deregistered " + memberNames);
                Communications.textWithoutEncoding(phonecontact, 'Hi ' + name + ', you have been de-registered from group ' + grpNames + '. For clarification please contact the group admin through ' + attributes.phone_number + '. Thank you. MiFedha.');
              };
              const updateChmMmbrAc = async () => {
                if (isLoading) return;
                setIsLoading(true);
                try {
                  await client.graphql({
                    query: deleteChamaMembers,
                    variables: {
                      input: {
                        ChamaNMember: ChmNMmbrPhns
                      }
                    }
                  });
                } catch (error) {
                  Alert.alert("Deletion unsuccessful; Retry");
                  return;
                }
                setIsLoading(false);
                await updtChmDtls();
              };
              if (signitoryPWs !== pword) {
                Alert.alert("Wrong Signitory password");
                return;
              } else if (owners !== user.userId) {
                Alert.alert("Not authorised to deactivate member");
                return;
              } else if (owners === ownersss && parseFloat(ttlGrpMemberss) > 1) {
                Alert.alert("Deactivate yourself, the Chama author, as the last one");
                return;
              } else {
                updateChmMmbrAc();
              }
            } catch (error) {
              console.log(error);
              Alert.alert("Error! Access denied!");
              return;
            }
          };
          await ftchUsrDtls();
        } catch (error) {
          console.log(error);
          Alert.alert("Error! Access denied!");
          return;
        }
      };
      await ftchChmDtls();
    } catch (error) {
      console.log(error);
      Alert.alert("Error! Access denied!");
      return;
    }
    setIsLoading(false);
    setMmberId("");
    setSigntryPW("");
    setChmPhn('');
    setPW('');
    setPhoneContacts("");
    setChmDesc("");
    setmemberPhn("");
  };
  return <View>
                      <View style={styles.image}>
                        <ScrollView>
                   
                          <View style={styles.loanTitleView}>
                            <Text style={styles.title}>Fill Details Below</Text>
                          </View>
                
                          <View style={styles.sendLoanView}>
                            <TextInput placeholder="+2547xxxxxxxx" value={grpContactz} onChangeText={setChmPhn} style={styles.sendLoanInput} editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Chama Phone Number</Text>
                          </View>
        
                          <View style={styles.sendLoanView}>
                            <TextInput value={MmberId} onChangeText={setMmberId} style={styles.sendLoanInput} editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Chama Member Number</Text>
                          </View>
        
                          <View style={styles.sendLoanView}>
                            <TextInput value={pword} onChangeText={setPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Signitory PW</Text>
                          </View>
        
                         
                
                          <TouchableOpacity onPress={fetchChmMmbrDtls} style={styles.sendLoanButton}>
                            <Text style={styles.sendLoanButtonText}>
                              Click to DeRegister
                            </Text>
                            {isLoading && <ActivityIndicator size="large" color="blue" />}
                          </TouchableOpacity>
                        </ScrollView>
                      </View>
                    </View>;
};
export default DeregChmMmbr;