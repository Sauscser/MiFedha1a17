import React, { useState } from 'react';
import Communications from 'react-native-communications';
import { createSMLoansCovered, createNonLoans, updateCompany, updateSMAccount, updateBizna } from '../../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount } from '../../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
const client = generateClient();
const SMASendNonLns = (props: any) => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState('');
  const [SendrPhn, setSendrPhn] = useState(null);
  const [amounts, setAmount] = useState('');
  const [Desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fetchSenderUsrDtls = async () => {
    if (isLoading) return;
    setIsLoading(false);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const accountDtl: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: SenderNatId
        }
      });
      const netEarningss = accountDtl.data.getBizna.netEarnings;
      const usrPW = accountDtl.data.getBizna.pw;
      const busNames = accountDtl.data.getBizna.busName;
      const SenderSub = accountDtl.data.getBizna.owner;
      const noBL = accountDtl.data.getBizna.noBL;
      const benefitsAmount = accountDtl.data.getBizna.benefitsAmount;
      const status = accountDtl.data.getBizna.status;
      const fetchCompDtls = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
          const CompDtls: any = await client.graphql({
            query: getCompany,
            variables: {
              AdminId: "BaruchHabaB'ShemAdonai2"
            }
          });
          const UsrTransferFee = CompDtls.data.getCompany.biznaTransferFee;
          const TotalTransacted = parseFloat(amounts) + parseFloat(UsrTransferFee) * parseFloat(amounts);
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
          const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM;
          const sendSMNonLn = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
              await client.graphql({
                query: createNonLoans,
                variables: {
                  input: {
                    recPhn: SenderNatId,
                    senderPhn: SenderNatId,
                    amount: parseFloat(amounts).toFixed(2),
                    description: Desc,
                    RecName: busNames,
                    SenderName: busNames,
                    status: 'BenefitBoost',
                    owner: userInfo.userId
                  }
                }
              });
            } catch (error) {
              Alert.alert('Boost unsuccessful; Retry');
              return;
            }
            setIsLoading(false);
            await updtSendrAc();
          };
          const updtSendrAc = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
              await client.graphql({
                query: updateBizna,
                variables: {
                  input: {
                    BusKntct: SenderNatId,
                    benefitsAmount: parseFloat(benefitsAmount) + parseFloat(amounts),
                    netEarnings: (parseFloat(netEarningss) - TotalTransacted).toFixed(2)
                  }
                }
              });
            } catch (error) {
              Alert.alert('Error! Enter details correctly');
              return;
            }
            setIsLoading(false);
            await updtComp();
          };
          const updtComp = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
              await client.graphql({
                query: updateCompany,
                variables: {
                  input: {
                    AdminId: "BaruchHabaB'ShemAdonai2",
                    companyEarningBal: parseFloat(UsrTransferFee) * parseFloat(amounts) + parseFloat(companyEarningBals),
                    companyEarning: parseFloat(UsrTransferFee) * parseFloat(amounts) + parseFloat(companyEarnings),
                    ttlNonLonssRecSM: parseFloat(amounts) + parseFloat(ttlNonLonssRecSMs),
                    ttlNonLonssSentSM: parseFloat(amounts) + parseFloat(ttlNonLonssSentSMs)
                  }
                }
              });
            } catch (error) {
              Alert.alert('Check your internet connection');
              return;
            }
            Alert.alert('Boost of Amount: Ksh. ' + parseFloat(amounts).toFixed(2) + ' successful. Fees: Ksh. ' + (parseFloat(UsrTransferFee) * parseFloat(amounts)).toFixed(2));
          };
          if (status !== 'AccountActive') {
            Alert.alert('Your Account is not active');
          } else if (parseFloat(netEarningss) < TotalTransacted) {
            Alert.alert('Requested amount is more than you have in your account');
          } else if (noBL > 0) {
            Alert.alert('Please first clear your lenders');
          } else if (usrPW !== SnderPW) {
            Alert.alert('Wrong password');
          } else if (userInfo.userId !== SenderSub) {
            Alert.alert('You do not own this business');
          } else {
            await sendSMNonLn();
          }
        } catch (e) {
          Alert.alert('Retry or update app or call customer care');
          return;
        }
        setIsLoading(false);
      };
      await fetchCompDtls();
    } catch (e) {
      Alert.alert('Retry or update app or call customer care');
      return;
    }
    setIsLoading(false);
    setSenderNatId('');
    setAmount('');
    setRecNatId('');
    setDesc('');
    setSnderPW('');
  };
  return <View>
      <View style={styles.image}>
        <ScrollView>
         
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>
          <View style={styles.sendAmtView}>
            <TextInput placeholder="+2547xxxxxxxx" value={SenderNatId} onChangeText={setSenderNatId} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Business Phone</Text>
          </View>
          
          <View style={styles.sendAmtView}>
            <TextInput keyboardType={"decimal-pad"} value={amounts} onChangeText={setAmount} style={styles.sendAmtInput} editable={true}></TextInput>
              
            <Text style={styles.sendAmtText}>Amount Sent</Text>
          </View>


          <View style={styles.sendAmtView}>
            <TextInput value={SnderPW} onChangeText={setSnderPW} secureTextEntry={true} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Business PassWord</Text>
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