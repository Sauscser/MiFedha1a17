import React, { useEffect, useState } from 'react';
import { getCompany, getSMAccount } from '../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { updateCompany, updateSMAccount } from '../../src/graphql/mutations';
const client = generateClient();
const AdvPayToVwChm = props => {
  const navigation = useNavigation();
  const [AdvReNo, setMFNId] = useState("");
  const [MFNPW, setMFNPW] = useState("");
  const [ownr, setownr] = useState(null);
  const VwMFNAc = () => {
    navigation.navigate("VwAdvAcs", {
      AdvReNo
    });
  };
  const fetchUsrDtls = async () => {
    try {
      const userInfo = await getCurrentUser();
      const attrs = await fetchUserAttributes();
      try {
        const MFNDtls: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: attrs.email
          }
        });
        const balances = MFNDtls.data.getSMAccount.balance;
        const owner = MFNDtls.data.getSMAccount.owner;
        const fetchCompDtls = async () => {
          try {
            const MFNDtls: any = await client.graphql({
              query: getCompany,
              variables: {
                AdminId: "BaruchHabaB'ShemAdonai2"
              }
            });
            const companyEarningBals = MFNDtls.data.getCompany.companyEarningBal;
            const companyEarnings = MFNDtls.data.getCompany.companyEarning;
            const enquiryFees = MFNDtls.data.getCompany.enquiryFee;
            const updtUsrAc = async () => {
              try {
                await client.graphql({
                  query: updateSMAccount,
                  variables: {
                    input: {
                      awsemail: attrs.email,
                      balance: parseFloat(balances) - parseFloat(enquiryFees)
                    }
                  }
                });
              } catch (error) {
                if (error) {
                  Alert.alert("Retry or update app or call customer care");
                  return;
                }
              }
              VwMFNAc();
            };
            const updtActAdm = async () => {
              try {
                await client.graphql({
                  query: updateCompany,
                  variables: {
                    input: {
                      AdminId: "BaruchHabaB'ShemAdonai2",
                      companyEarningBal: parseFloat(companyEarningBals) + parseFloat(enquiryFees),
                      companyEarning: parseFloat(companyEarnings) + parseFloat(enquiryFees)
                    }
                  }
                });
              } catch (error) {
                if (error) {
                  Alert.alert("Check entered Details");
                  return;
                }
              }
              updtUsrAc();
            };
            if (balances < parseFloat(enquiryFees)) {
              Alert.alert("Account Balance cannot facilitate the request");
            } else {
              updtActAdm();
            }
          } catch (e) {
            if (e) {
              Alert.alert("Advocate does not exist; otherwise check internet connection");
              return;
            }
            console.log(e);
          }
        };
        if (userInfo.userId !== owner) {
          Alert.alert("Please first create main account");
        } else {
          await fetchCompDtls();
        }
      } catch (e) {
        if (e) {
          Alert.alert("Advocate does not exist; otherwise check internet connection");
          return;
        }
        console.log(e);
      }
      setMFNId("");
      setMFNPW("");
    } catch (e) {
      if (e) {
        Alert.alert("Advocate does not exist; otherwise check internet connection");
        return;
      }
      console.log(e);
    }
  };
  useEffect(() => {
    const mfnID = AdvReNo;
    if (!mfnID && mfnID !== "") {
      setMFNId("");
      return;
    }
    setMFNId(mfnID);
  }, [AdvReNo]);
  useEffect(() => {
    const mfnPW = MFNPW;
    if (!mfnPW && mfnPW !== "") {
      setMFNPW("");
      return;
    }
    setMFNPW(mfnPW);
  }, [MFNPW]);
  return <View style={styles.image}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.loanTitleView}>
          <Text style={styles.title}>Fill Details Below</Text>
        </View>

        <View style={styles.sendLoanView}>
          <TextInput value={AdvReNo} onChangeText={setMFNId} style={styles.sendLoanInput} editable={true} />
          <Text style={styles.sendLoanText}>Advocate License Number</Text>
        </View>

        <View style={styles.sendLoanView}>
          <TextInput value={MFNPW} onChangeText={setMFNPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
          <Text style={styles.sendLoanText}>Pass Word</Text>
        </View>

        <TouchableOpacity onPress={fetchUsrDtls} style={styles.sendLoanButton}>
          <Text style={styles.sendLoanButtonText}>
            Click to View
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>;
};
export default AdvPayToVwChm;