import React, { useEffect, useState } from 'react';
import { createChamaControlTable, createCompany } from '../../../src/graphql/mutations';
import { getCompany } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const AdminSignIn = props => {
  const navigation = useNavigation();
  const [PWOnes, setPWOne] = useState("");
  const [PWTwos, setPWTwo] = useState("");
  const [ownr, setownr] = useState(null);
  const GoHome = () => {
    navigation.navigate('Homes');
  };
  const fetchExDtls = async () => {
    const userInfo = await getCurrentUser();
    try {
      const ExDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const pw1s = ExDtls.data.getCompany.pw1;
      const pw2s = ExDtls.data.getCompany.pw2;
      const ownersss = ExDtls.data.getCompany.owner;
      if (PWTwos === pw1s && ownersss === userInfo.userId) {
        await CompCreation();
      } else {
        Alert.alert("Access Denied");
      }
    } catch (e) {
      if (e) {
        Alert.alert("Check internet; unauthorised access");
      }
    }
    setPWOne("");
    setPWTwo("");
  };
  const CompCreation = async () => {
    const userInfoz = await getCurrentUser();
    try {
      await client.graphql({
        query: createChamaControlTable,
        variables: {
          input: {
            GroupID: PWOnes,
            Institution: "Equity",
            LoansGiven: 0,
            LoansRepayment: 0,
            Subscriptions: 0,
            Dividends: 0,
            Withdrawals: 0,
            Deposits: 0,
            BankAdminEarnings: 0,
            GrpLoanOutEarnings: 0,
            GrpLoanEarnings: 0,
            SubscriptionsEarnings: 0,
            DividendsEarnings: 0,
            WithdrawalsEarnings: 0,
            DepositsEarnings: 0,
            GroupTotal: 0,
            MembersTotal: 0,
            BankAdminTotal: 0,
            status: "AccountActive"
          }
        }
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error, Retry or update app");
    }
  };
  useEffect(() => {
    const pw1 = PWOnes;
    if (!pw1 && pw1 !== "") {
      setPWOne("");
      return;
    }
    setPWOne(pw1);
  }, [PWOnes]);
  useEffect(() => {
    const pw2 = PWTwos;
    if (!pw2 && pw2 !== "") {
      setPWTwo("");
      return;
    }
    setPWTwo(pw2);
  }, [PWTwos]);
  return <View>
              <View style={styles.image}>
                <ScrollView>
                <TouchableOpacity onPress={GoHome} style={styles.loanTitleView}>
                    <Text style={styles.title}>Go Home</Text>
                  </TouchableOpacity>
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={PWOnes} onChangeText={setPWOne} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>TableID</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={PWTwos} onChangeText={setPWTwo} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Pass Word</Text>
                  </View>
        
                  <TouchableOpacity onPress={fetchExDtls} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Sign In
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default AdminSignIn;