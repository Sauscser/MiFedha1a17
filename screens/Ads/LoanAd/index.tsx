import React, { useEffect, useState } from 'react';
import { createBizna, createChamaMembers, createGroup, createRafikiLnAd, updateCompany } from '../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount, listChamasRegConfirms, vwViaPhonss } from '../../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
const client = generateClient();
const CreateBiz = () => {
  const [ChmPhn, setChmPhn] = useState('');
  const [UsrEmail, setUsrEmail] = useState<string | null>(null);
  const [awsEmail, setAWSEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [Sign2Phn, setSign2Phn] = useState('');
  const [itemPrys, setitemPrys] = useState('');
  const [itemTwn, setitemTwn] = useState('');
  const [lnPrsntg, setlnPrsntg] = useState('');
  const [rpymntPrd, setrpymntPrd] = useState('');
  const gtUzr = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    try {
      const compDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: UsrEmail
        }
      });
      const pws = compDtls.data.getSMAccount.pw;
      const owner = compDtls.data.getSMAccount.owner;
      const namez = compDtls.data.getSMAccount.name;
      const CreateNewSMAc = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
          await client.graphql({
            query: createRafikiLnAd,
            variables: {
              input: {
                rafikiName: namez,
                rafikicntct: awsEmail,
                rafikiEmail: UsrEmail,
                rafikiamnt: parseFloat(itemPrys),
                rafikidesc: ChmDesc,
                AdvEmail: ChmNm,
                advLicNo: ChmRegNo,
                defaultPenalty: 0,
                rafikiprcntg: parseFloat(lnPrsntg),
                rafikirpymntperiod: rpymntPrd,
                owner: userInfo.userId
              }
            }
          });
          Alert.alert('Advert successfully Published');
        } catch (error) {
          console.log(error);
          Alert.alert('Error! Access denied');
        } finally {
          setIsLoading(false);
        }
      };
      if (pword !== pws) {
        Alert.alert('Wrong User password');
      } else if (owner !== userInfo.userId) {
        Alert.alert('Please first create main account');
      } else if (parseFloat(lnPrsntg) >= 36) {
        Alert.alert('Cancelled: Exploitative Annual Interest Rate');
      } else if (parseFloat(rpymntPrd) < 60) {
        Alert.alert('Repayment period must be greater than 60 days');
      } else {
        await CreateNewSMAc();
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error! Access denied');
    } finally {
      setIsLoading(false);
      setChmPhn('');
      setPW('');
      setAWSEmail('');
      setChmDesc('');
      setChmNm('');
      setChmRegNo('');
      setMmbaID('');
      setSign2Phn('');
      setrpymntPrd('');
      setlnPrsntg('');
      setitemTwn('');
      setitemPrys('');
    }
  };
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Ad Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={awsEmail} onChangeText={setAWSEmail} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Loaner Phone</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput keyboardType="decimal-pad" value={itemPrys} onChangeText={setitemPrys} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Amount</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput keyboardType="decimal-pad" value={rpymntPrd} onChangeText={setrpymntPrd} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Repayment Period in days</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput keyboardType="decimal-pad" value={lnPrsntg} onChangeText={setlnPrsntg} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Annual Percentage Rate</Text>
          </View>

          <View style={styles.sendAmtViewDesc}>
            <TextInput value={ChmDesc} multiline={true} onChangeText={setChmDesc} style={styles.sendAmtInputDesc} editable={true} />
            <Text style={styles.sendLoanText}>Loan Desc</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={pword} onChangeText={setPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Loaner PassWord</Text>
          </View>

          <TouchableOpacity onPress={gtUzr} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>Click to Advertise</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default CreateBiz;