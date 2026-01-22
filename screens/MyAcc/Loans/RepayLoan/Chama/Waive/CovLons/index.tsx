import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { StyleSheet, Dimensions } from 'react-native';
import {
  getCvrdGroupLoans,
  getSMAccount,
  getGroup,
  getCompany,
  getChamaMembers,
} from '../../../../../../../src/graphql/queries';
import {
  updateSMAccount,
  updateCvrdGroupLoans,
  updateGroup,
  updateCompany,
  updateChamaMembers,
  createLoanRepayments,
} from '../../../../../../../src/graphql/mutations';
import { useRoute } from '@react-navigation/native';

const WaiverScreen = () => {
  const [amounts, setAmount] = useState('');
  const [Desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();

  const ftchCvdSMLn = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      // Fetch loan details
      const loanRes: any = await API.graphql(
        graphqlOperation(getCvrdGroupLoans, { loanID: route.params.loanID })
      );
      const loan = loanRes.data.getCvrdGroupLoans;
      const {
        amountExpectedBackWthClrnc,
        memberId,
        DefaultPenaltyChm2,
        grpContact,
        loaneePhn,
        lonBala,
        interest,
        amountExpectedBack,
        amountRepaid,
        amountGiven,
        crtnDate,
        dfltUpdate,
        repaymentPeriod,
        clearanceAmt,
      } = loan;

      // Loan calculations
      const ClranceAmt = parseFloat(clearanceAmt) + parseFloat(DefaultPenaltyChm2);
      const netLnBalz = amountExpectedBack - amountRepaid;
      const now = new Date();
      const daysElapsed = Math.floor((now.getTime() - crtnDate) / (1000 * 60 * 60 * 24));
      const LonBal1 =
        ((netLnBalz * Math.pow(1 + parseFloat(interest) / 36500, daysElapsed)) +
          parseFloat(clearanceAmt) +
          parseFloat(DefaultPenaltyChm2)
        ).toFixed(0);
      const LonBalsss = parseFloat(LonBal1) - parseFloat(amounts);

      // Fetch sender account
      const accountRes: any = await API.graphql(
        graphqlOperation(getSMAccount, { awsemail: loaneePhn })
      );
      const senderAcc = accountRes.data.getSMAccount;
      if (senderAcc.acStatus === 'AccountInactive') {
        Alert.alert('Sender account is inactive');
        setIsLoading(false);
        return;
      }

      // Fetch receiver group
      const groupRes: any = await API.graphql(
        graphqlOperation(getGroup, { grpContact })
      );
      const recGrp = groupRes.data.getGroup;
      if (recGrp.status === 'AccountInactive') {
        Alert.alert('Receiver account is inactive');
        setIsLoading(false);
        return;
      }

      // Validation checks
      if (ClranceAmt > parseFloat(amounts)) {
        Alert.alert(`Too little amount waived: at least ${ClranceAmt}`);
        setIsLoading(false);
        return;
      }

      if (parseFloat(amounts) > parseFloat(LonBal1)) {
        Alert.alert(`The Loan Balance is lesser: Ksh. ${lonBala}`);
        setIsLoading(false);
        return;
      }

      // Update functions
      const updateChamaMember = async () => {
        await API.graphql(
          graphqlOperation(updateChamaMembers, {
            input: {
              ChamaNMember: memberId,
              AmtRepaid: (parseFloat(senderAcc.AmtRepaids) + parseFloat(amounts)).toFixed(0),
              LnBal: LonBalsss.toFixed(0),
            },
          })
        );
      };

      const updateLoan = async () => {
        await API.graphql(
          graphqlOperation(updateCvrdGroupLoans, {
            input: {
              loanID: route.params.loanID,
              amountRepaid: (parseFloat(amounts) + parseFloat(amountRepaid)).toFixed(0),
              lonBala: LonBalsss.toFixed(0),
              amountExpectedBackWthClrnc: LonBalsss.toFixed(0),
              DefaultPenaltyChm2: 0,
              clearanceAmt: 0,
              status: 'LoanCleared',
            },
          })
        );
      };

      // Execute updates
      await updateChamaMember();
      await updateLoan();

      // Create repayment record
      await API.graphql(
        graphqlOperation(createLoanRepayments, {
          input: {
            senderPhn: loaneePhn,
            recPhn: grpContact,
            RecName: recGrp.grpName,
            SenderName: senderAcc.name,
            loanId1: route.params.loanID,
            loanId2: route.params.loanID,
            loanId3: route.params.loanID,
            amount: parseFloat(amounts).toFixed(0),
            description: Desc,
            status: 'Waived',
            owner: userInfo.attributes.sub,
          },
        })
      );

      Alert.alert('Waived successfully!');
      setAmount('');
      setDesc('');
    } catch (e) {
      console.log(e);
      Alert.alert('Error! Retry or contact support.');
    }
    setIsLoading(false);
  };

  return (
    <LinearGradient colors={['#e29d58', '#f2c27a']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Waive Loan</Text>
            <Text style={styles.subHeaderText}>Fill account details below</Text>
          </View>

          {/* Amount */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount Waived</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder="Enter amount"
              value={amounts}
              onChangeText={setAmount}
              editable={!isLoading}
            />
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Enter description"
              multiline
              numberOfLines={4}
              value={Desc}
              onChangeText={setDesc}
              editable={!isLoading}
            />
          </View>

          {/* Waive Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={ftchCvdSMLn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Waive</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default WaiverScreen;


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Header section
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },

  // Input container
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  // Button
  button: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  buttonText: {
    color: '#e29d58',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Optional: card style for future loan summary section
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e29d58',
  },

  // ScrollView padding
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
});

