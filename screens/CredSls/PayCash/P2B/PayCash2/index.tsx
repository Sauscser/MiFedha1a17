// SMASendNonLns.js - Refactored Version

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {
  createBenefitContributions2,
  createNonLoans,
  updateCompany,
  updateSMAccount,
  updateBizna,
} from '../../../../../src/graphql/mutations';
import {
  getBizna,
  getCompany,
  getSMAccount,
  listCovCreditSellers,
  listCvrdGroupLoans,
  listSMLoansCovereds,
} from '../../../../../src/graphql/queries';

const SMASendNonLns = () => {
  const [SnderPW, setSnderPW] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const {
    sokoname, sokoprice, sokokntct, quantity, itemUnit,
    totalCost
  } = route.params;

  const navigateToChmRepay = () => navigation.navigate("AutomaticRepayAllTyps");

  const showError = (msg) => {
    Alert.alert(msg);
    setIsLoading(false);
  }

  const fetchCvLnSM = async () => {
    setIsLoading(true);

    let userInfo;
    try {
      userInfo = await Auth.currentAuthenticatedUser();
    } catch {
      return showError("User authentication failed");
    }

    const checkLoans = async () => {
      try {
        const [loan1, loan2, loan3] = await Promise.all([
          API.graphql(graphqlOperation(listSMLoansCovereds, {
            filter: {
              and: [
                { status: { eq: "LoanBL" } },
                { lonBala: { gt: 0 } },
                { loaneeEmail: { eq: userInfo.attributes.email } }
              ]
            }
          })),
          API.graphql(graphqlOperation(listCovCreditSellers, {
            filter: {
              and: [
                { status: { eq: "LoanBL" } },
                { lonBala: { gt: 0 } },
                { buyerContact: { eq: userInfo.attributes.email } }
              ]
            }
          })),
          API.graphql(graphqlOperation(listCvrdGroupLoans, {
            filter: {
              and: [
                { status: { eq: "LoanBL" } },
                { lonBala: { gt: 0 } },
                { loaneePhn: { eq: userInfo.attributes.email } }
              ]
            }
          }))
        ])

        const hasLoan = loan1.data.listSMLoansCovereds.items.length > 0 ||
          loan2.data.listCovCreditSellers.items.length > 0 ||
          loan3.data.listCvrdGroupLoans.items.length > 0;

        if (hasLoan) {
          return navigateToChmRepay();
        }

        await validateAndTransact(userInfo);

      } catch (e) {
        console.log(e);
        return showError("Loan check failed");
      }
    };

    await checkLoans();
  };

  const validateAndTransact = async (userInfo) => {
    try {
      const senderAccount = await API.graphql(graphqlOperation(getSMAccount, {
        awsemail: userInfo.attributes.email
      }));
      const sender = senderAccount.data.getSMAccount;

      const {
        pw: storedPW,
        acStatus,
        owner: senderOwner,
        ttlNonLonsSentSM,
        loanLimit,
        balance,
        beneficiaryType,
        name,
        beneficiary,
        benefitsAmount
      } = sender;

      if (userInfo.attributes.sub !== senderOwner) return showError("Invalid account owner");
      if (acStatus !== "AccountActive") return showError("Account inactive");
      setIsLoading(true);
if (storedPW !== SnderPW) {
  setIsLoading(false); // reset loading so UI returns to normal
  return showError("Wrong password");
}
      if (parseFloat(loanLimit) < parseFloat(totalCost)) return showError("Send limit exceeded");

      const companyData = await API.graphql(graphqlOperation(getCompany, { AdminId: "BaruchHabaB'ShemAdonai2" }));
      const company = companyData.data.getCompany;
      const { userTransferFee, p2bBenCom, companyEarningBal, companyEarning, ttlNonLonssRecSM, ttlNonLonssSentSM } = company;

      console.log(p2bBenCom)

      const fee = parseFloat(userTransferFee || 0) * parseFloat(totalCost);
      const totalDebit = parseFloat(totalCost) + fee;

      if (parseFloat(balance) < totalDebit) return showError("Insufficient balance");

      const benefit = parseFloat(p2bBenCom || 0) * fee;
      const compEarnings = fee - 2 * benefit;

      const bizData = await API.graphql(graphqlOperation(getBizna, { BusKntct: sokokntct }));
      const biz = bizData.data.getBizna;

      const recipientName = biz.busName;
      const bizBeneficiary = biz.bizBeneficiary;
      const netEarnings = parseFloat(biz.netEarnings);
      const bizBenefits = parseFloat(biz.benefitsAmount);

      if (beneficiaryType === "Biz") {

      await API.graphql(graphqlOperation(createNonLoans, {
        input: {
          recPhn: sokokntct,
          senderPhn: userInfo.attributes.email,
          amount: parseFloat(totalCost).toFixed(0),
          description: `${quantity} ${itemUnit} of ${sokoname} @ ${sokoprice} = ${totalCost}`,
          RecName: recipientName,
          SenderName: name,
          status: "cashSales",
          owner: userInfo.attributes.sub
        }
      }));

      await API.graphql(graphqlOperation(createBenefitContributions2, {
        input: {
          benefitsID: "String",
          benefactorAc: sokokntct,
          benefactorPhone: recipientName,
          beneficiaryAc: userInfo.attributes.email,
          beneficiaryPhone: "String",
          creatorEmail: userInfo.attributes.email,
          prodName: "String",
          creatorName: "String",
          owner: userInfo.attributes.sub,
          prodCost: 0,
          benefitsAmount: benefit,
          beneficiaryType: "Pal",
          prodDesc: "String",
          benefitStatus: "Active",
          amount: benefit
        }
      }));

      await Promise.all([
        API.graphql(graphqlOperation(updateSMAccount, {
          input: {
            awsemail: userInfo.attributes.email,
            ttlNonLonsSentSM: (parseFloat(ttlNonLonsSentSM) + parseFloat(totalCost)).toFixed(0),
            balance: (parseFloat(balance) - totalDebit).toFixed(0),
            benefitsAmount: parseFloat(benefitsAmount) + benefit
          }
        })),

        API.graphql(graphqlOperation(updateBizna, {
          input: {
            BusKntct: sokokntct,
            netEarnings: (netEarnings + parseFloat(totalCost)).toFixed(0),
            earningsBal: (netEarnings + parseFloat(totalCost)).toFixed(0),
            benefitsAmount: bizBenefits + benefit
          }
        })),

        API.graphql(graphqlOperation(updateCompany, {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            companyEarningBal: compEarnings + parseFloat(companyEarningBal),
            companyEarning: compEarnings + parseFloat(companyEarning),
            ttlNonLonssRecSM: parseFloat(totalCost) + parseFloat(ttlNonLonssRecSM),
            ttlNonLonssSentSM: parseFloat(totalCost) + parseFloat(ttlNonLonssSentSM)
          }
        }))
      ]);

      Alert.alert(`Successful! Transaction fee: Ksh. ${fee.toFixed(0)}`);
      setIsLoading(false);
      setSnderPW("");

    } 

    if (beneficiaryType === "Pal")
    {
      await API.graphql(graphqlOperation(createNonLoans, {
        input: {
          recPhn: sokokntct,
          senderPhn: userInfo.attributes.email,
          amount: parseFloat(totalCost).toFixed(0),
          description: `${quantity} ${itemUnit} of ${sokoname} @ ${sokoprice} = ${totalCost}`,
          RecName: recipientName,
          SenderName: name,
          status: "cashSales",
          owner: userInfo.attributes.sub
        }
      }));


      await Promise.all([
        API.graphql(graphqlOperation(updateSMAccount, {
          input: {
            awsemail: userInfo.attributes.email,
            ttlNonLonsSentSM: (parseFloat(ttlNonLonsSentSM) + parseFloat(totalCost)).toFixed(0),
            balance: ((parseFloat(balance) - totalDebit) + benefit).toFixed(0),
           
          }
        })),

        API.graphql(graphqlOperation(updateBizna, {
          input: {
            BusKntct: sokokntct,
            netEarnings: (netEarnings + parseFloat(totalCost)).toFixed(0),
            earningsBal: (netEarnings + parseFloat(totalCost)).toFixed(0),
            benefitsAmount: bizBenefits + benefit
          }
        })),

        API.graphql(graphqlOperation(updateCompany, {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            companyEarningBal: compEarnings + parseFloat(companyEarningBal),
            companyEarning: compEarnings + parseFloat(companyEarning),
            ttlNonLonssRecSM: parseFloat(totalCost) + parseFloat(ttlNonLonssRecSM),
            ttlNonLonssSentSM: parseFloat(totalCost) + parseFloat(ttlNonLonssSentSM)
          }
        }))
      ]);

      Alert.alert(`Successful! Transaction fee: Ksh. ${fee.toFixed(0)}`);
      setIsLoading(false);
      setSnderPW("");

    }
  }
   
  catch (e) {
      console.log(e);
      return showError("Transaction failed");
    }
  };

  return (
    <LinearGradient colors={['#e58d29', '#2c5364']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Main Account Password"
            style={styles.passwordInput}
            value={SnderPW}
            onChangeText={setSnderPW}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
  style={styles.button}
  disabled={isLoading}
  onPress={fetchCvLnSM}
>
  {isLoading ? (
    <ActivityIndicator color="#fff" style={{ marginVertical: 10 }} />
  ) : (
    <Text style={styles.buttonText}>Authenticate Owner</Text>
  )}
</TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#f5a623',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1b1b1b',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SMASendNonLns;