import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Communications from 'react-native-communications';
import { useRoute } from '@react-navigation/native';
import { getChamaMembers, getGroup, getCompany, getSMAccount, getMiFedhaBankAdmin, getChamaControlTable } from '../../../src/graphql/queries';
import { createGroupNonLoans, updateChamaMembers, updateMiFedhaBankAdmin, updateChamaControlTable, updateCompany, updateSMAccount, updateGroup } from '../../../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const themeColor = '#e29d59';
const SMASendNonLns = () => {
  const [senderNatId, setSenderNatId] = useState('');
  const [senderPW, setSenderPW] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const resetForm = () => {
    setAmount('');
    setDescription('');
    setSenderPW('');
  };
  const showAlert = (message: string) => Alert.alert(message);
  const fetchChamaMemberDetails = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const memberData: any = await client.graphql({
        query: getChamaMembers,
        variables: {
          ChamaNMember: route.params.ChamaNMember
        }
      });
      const {
        groupContact,
        memberContact,
        NonLoanAcBal,
        ttlNonLonAcBal
      } = memberData.data.getChamaMembers;

      // Fetch group details
      const groupData: any = await client.graphql({
        query: getGroup,
        variables: {
          grpContact: groupContact
        }
      });
      const group = groupData.data.getGroup;
      if (group.status !== 'AccountActive') {
        showAlert('Sender account is inactive');
        setIsLoading(false);
        return;
      }

      // Fetch receiver details
      const receiverData: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: memberContact
        }
      });
      const receiver = receiverData.data.getSMAccount;
      if (receiver.acStatus !== 'AccountActive') {
        showAlert('Receiver account is inactive');
        setIsLoading(false);
        return;
      }
      if (parseFloat(receiver.balance) + parseFloat(amount) > parseFloat(receiver.MaxAcBal)) {
        showAlert('Receiver wallet capacity exceeded. Contact customer care.');
        setIsLoading(false);
        return;
      }
      const totalTransaction = parseFloat(amount); // Simplified; add fees if needed

      if (parseFloat(group.grpBal) < totalTransaction) {
        showAlert(`Insufficient group balance. Available: ${group.grpBal}`);
        setIsLoading(false);
        return;
      }

      // Create Non-Loan transaction
      await client.graphql({
        query: createGroupNonLoans,
        variables: {
          input: {
            grpContact: groupContact,
            recipientPhn: memberContact,
            receiverName: receiver.name,
            SenderName: group.grpName,
            amountSent: parseFloat(amount).toFixed(0),
            description,
            memberId: route.params.ChamaNMember,
            senderEmail: attributes.email,
            confirm1: 'NO',
            confirm2: 'NO',
            signatory2: group.signatory2Email,
            signatory3: group.Signatory3Email,
            status: 'AccountActive',
            owner: user.userId
          }
        }
      });

      // Notify receiver
      Communications.textWithoutEncoding(receiver.phonecontact, `Hi ${receiver.name}, ${group.grpName} has sent you Ksh. ${amount}. Contact ${attributes.phone_number} for clarification.`);
      showAlert(`Remittance of Ksh. ${parseFloat(amount).toFixed(2)} successfully booked`);
      resetForm();
    } catch (error) {
      console.log(error);
      showAlert('Error! Retry or update app.');
    }
    setIsLoading(false);
  };
  return <View style={{
    flex: 1,
    backgroundColor: '#fff'
  }}>
      <ScrollView contentContainerStyle={{
      padding: 20
    }}>
        <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: themeColor
      }}>
          Fill Account Details Below
        </Text>

        <View style={{
        marginBottom: 15
      }}>
          <TextInput keyboardType="decimal-pad" value={amount} onChangeText={setAmount} placeholder="Enter Amount" style={{
          borderWidth: 1,
          borderColor: themeColor,
          borderRadius: 8,
          padding: 12,
          fontSize: 16
        }} />
          <Text style={{
          color: '#555',
          marginTop: 5
        }}>Amount Sent</Text>
        </View>

        <View style={{
        marginBottom: 25
      }}>
          <TextInput multiline value={description} onChangeText={setDescription} placeholder="Enter Description" style={{
          borderWidth: 1,
          borderColor: themeColor,
          borderRadius: 8,
          padding: 12,
          fontSize: 16,
          minHeight: 80,
          textAlignVertical: 'top'
        }} />
          <Text style={{
          color: '#555',
          marginTop: 5
        }}>Description</Text>
        </View>

        <TouchableOpacity onPress={fetchChamaMemberDetails} style={{
        backgroundColor: themeColor,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
      }} disabled={isLoading}>
          {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold'
        }}>Send</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>;
};
export default SMASendNonLns;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollViewContent: {
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e29d58',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: "#e29d58",
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: "#e29d58",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top' // ensures text aligns at the top
  },
  inputLabel: {
    color: '#555',
    marginTop: 5,
    fontSize: 14
  },
  sendButton: {
    backgroundColor: themeColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  activityIndicator: {
    marginLeft: 10
  }
});