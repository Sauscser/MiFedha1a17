import React, { useEffect, useState } from 'react';
import { getCompany, getGroup, getSMAccount, listSMAccounts } from '../../../../../src/graphql/queries';
import { getBizna, listPersonels } from '../../../../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
const client = generateClient();
const ChmSignIn = () => {
  const navigation = useNavigation();
  const [BiznaContact, setChmPhn] = useState('');
  const [nam, setName] = useState<string | null>(null);
  const [phoneContacts, setPhoneContacts] = useState('');
  const [awsEmail, setAWSEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState('');
  const [ownr, setownr] = useState<string | null>(null);
  const FetchGrpLonsSts = () => {
    navigation.navigate('VwSlsAds2Remove', {
      BiznaContact
    });
  };
  const gtUzr = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const compDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const owner = compDtls.data.getSMAccount.owner;
      const ChckPersonelExistence = async () => {
        try {
          const UsrDtls: any = await client.graphql({
            query: listPersonels,
            variables: {
              filter: {
                phoneKontact: {
                  eq: attributes.email
                },
                BusinessRegNo: {
                  eq: BiznaContact
                }
              }
            }
          });
          const gtChmDtls = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
              const compDtls: any = await client.graphql({
                query: getBizna,
                variables: {
                  BusKntct: BiznaContact
                }
              });
              const signitoryPWs = compDtls.data.getBizna.pw;
              const owners = compDtls.data.getBizna.owner;
              const signitory2Subs = compDtls.data.getBizna.signitory2Sub;
              if (signitoryPWs !== pword) {
                Alert.alert('Wrong Business PassWord');
              } else if (UsrDtls.data.listPersonels.items.length < 1) {
                Alert.alert('You do not work here');
                return;
              } else {
                FetchGrpLonsSts();
              }
            } catch (e) {
              console.log(e);
              Alert.alert('Error! Access denied');
            }
          };
          await gtChmDtls();
        } catch (e) {
          console.log(e);
          Alert.alert('Error! Access denied');
        } finally {
          setIsLoading(false);
        }
      };
      if (userInfo.userId !== owner) {
        Alert.alert('Please first create main account');
      } else {
        await ChckPersonelExistence();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setChmPhn('');
      setPW('');
      setPhoneContacts('');
      setChmDesc('');
      setChmNm('');
      setmemberPhn('');
    }
  };
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Business Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="Business Phone Number" value={BiznaContact} onChangeText={setChmPhn} style={styles.sendLoanInput} editable={true} />
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="Business PassWord" value={pword} onChangeText={setPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
          </View>

          <TouchableOpacity onPress={gtUzr} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>View Sales Ads</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default ChmSignIn;