import React, { useEffect, useState } from 'react';
import Communications from 'react-native-communications';
import { createSMLoansCovered, createNonLoans, updateCompany, updateSMAccount, updateBizna, createBizSlsReq } from '../../../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount, listCovCreditSellers, listCvrdGroupLoans, listPersonels, listSMLoansCovereds } from '../../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Alert, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
  const [amounts, setAmount] = useState("");
  const [Desc, setDesc] = useState("");
  const [AttendAdmin, setAttendAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps");
  };
  const fetchSenderUsrDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const accountDtl: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: SenderNatId
        }
      });
      const SenderUsrBal = accountDtl.data.getBizna.netEarnings;
      const bizBeneficiaryz = accountDtl.data.getBizna.bizBeneficiary;
      const name = accountDtl.data.getBizna.busName;
      const ownerz = accountDtl.data.getBizna.owner;
      const SenderAcstatus = accountDtl.data.getBizna.status;
      const pw = accountDtl.data.getBizna.pw;

      // Collect all Admin fields into an array
      const Admins = Array.from({
        length: 50
      }, (_, i) => accountDtl.data.getBizna[`Admin${i + 1}`]);
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const UsrDtls: any = await client.graphql({
        query: listPersonels,
        variables: {
          filter: {
            phoneKontact: {
              eq: attributes.email
            },
            BusinessRegNo: {
              eq: SenderNatId
            }
          }
        }
      });
      const RecAccountDtl: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: RecNatId
        }
      });
      const namess = RecAccountDtl.data.getSMAccount.name;
      const RecAcstatus = RecAccountDtl.data.getSMAccount.status;
      const accountDtl7: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: AttendAdmin
        }
      });
      const phonecontactxs = accountDtl7.data.getSMAccount.phonecontact;
      const namexs = accountDtl7.data.getSMAccount.name;
      const accountDtl7b: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const namezx = accountDtl7b.data.getSMAccount.name;
      const phonecontactzx = accountDtl7b.data.getSMAccount.phonecontact;
      const pwscx = accountDtl7b.data.getSMAccount.pw;
      async function sendSMNonLn() {
        await client.graphql({
          query: createBizSlsReq,
          variables: {
            input: {
              recPhn: RecNatId,
              senderPhn: SenderNatId,
              amount: parseFloat(amounts).toFixed(0),
              description: Desc,
              RecName: namess,
              SenderName: name,
              status: "cashSales",
              owner: ownerz,
              attendingAdmin: AttendAdmin
            }
          }
        });
        Communications.textWithoutEncoding(phonecontactxs, 'MiFedha. Hi ' + namexs + ', ' + namezx + ' of ' + name + ' business has requested to send Ksh. ' + amounts + ' to ' + namess + '. Please proceed to authorise if it is a legitimate transaction ' + ' as per your business policies. For clarification reach the personnel through ' + phonecontactzx + '. Thank you.');
      }

      // Conditional checks
      if (UsrDtls.data.listPersonels.items.length < 1) {
        Alert.alert("You dont work here");
      } else if (RecAcstatus === "AccountInactive") {
        Alert.alert('Receiver account is inactive');
      } else if (SnderPW !== pwscx) {
        Alert.alert('Wrong Password');
      } else if (SenderAcstatus === "AccountInactive") {
        Alert.alert('Sender account is inactive');
      } else if (!Admins.includes(AttendAdmin)) {
        Alert.alert("The admin is not an admin in this business");
      } else {
        await sendSMNonLn();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Retry, update app or call customer care");
    } finally {
      setIsLoading(false);
      setSenderNatId('');
      setAmount("");
      setRecNatId('');
      setAttendAdmin("");
      setDesc("");
      setSnderPW("");
    }
  };
  return <View>
      <View style={styles.image}>
        <ScrollView>
         
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput placeholder="Sending Business Phone" value={SenderNatId} onChangeText={setSenderNatId} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Sending Business Phone</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput placeholder="Receiving Person Email" value={RecNatId} onChangeText={setRecNatId} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Receiving Person Email</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput placeholder="AttendingAdminEmail" value={AttendAdmin} onChangeText={setAttendAdmin} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Attending Admin Email</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput keyboardType={"decimal-pad"} value={amounts} onChangeText={setAmount} style={styles.sendAmtInput} editable={true}></TextInput>
              
            <Text style={styles.sendAmtText}>Amount Sent</Text>
          </View>


          <View style={styles.sendAmtView}>
            <TextInput value={SnderPW} onChangeText={setSnderPW} secureTextEntry={true} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Main Account PassWord</Text>
          </View>


          <View style={styles.sendAmtViewDesc}>
            <TextInput multiline={true} value={Desc} onChangeText={setDesc} style={styles.sendAmtInputDesc} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Description</Text>
          </View>

          <TouchableOpacity onPress={fetchSenderUsrDtls} style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Send</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    </View>;
};
export default SMASendNonLns;