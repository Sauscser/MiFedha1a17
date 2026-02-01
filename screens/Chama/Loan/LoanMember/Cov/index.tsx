import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, Alert, ScrollView, TextInput, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { createCvrdGroupLoans, updateChamaMembers, updateGroup, updateSMAccount, updateCompany, updateMiFedhaBankAdmin, updateChamaControlTable, updateReqLoanChama, updateAdvocate, createMessages, sendNotification } from '../../../../../src/graphql/mutations';
import { getReqLoanChama, getSMAccount, getChamaMembers, getGroup, getCompany, getChamaControlTable, getMiFedhaBankAdmin, getAdvocate } from '../../../../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const ChmCovLns = () => {
  const [state, setState] = useState({
    ChmPhn: '',
    RecNatId: '',
    RecPhn: '',
    SnderPW: '',
    RepaymtPeriod: '',
    amount: '',
    AmtExp: '',
    RecAccCode: '',
    SendrPhn: null,
    MmbrId: '',
    isLoading: false
  });
  const route = useRoute();
  const [showPassword, setShowPassword] = useState(false);
  const setField = (field, value) => setState(prev => ({
    ...prev,
    [field]: value
  }));
  const fetchGraphQL = async (query, variables) => {
    try {
      const result = await client.graphql({
        query,
        variables
      });
      return result.data;
    } catch (e) {
      console.log(e);
      Alert.alert('Error! Access denied!');
      setField('isLoading', false);
      throw e;
    }
  };
  const fetchChmLoanReq = async () => {
    if (state.isLoading) return;
    setField('isLoading', true);
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const {
        getReqLoanChama: loanReq
      } = await fetchGraphQL(getReqLoanChama, {
        id: route.params.id
      });
      const {
        loaneeEmail,
        loaneePhone,
        loaneeMemberId,
        chamaPhone,
        amount,
        repaymentAmt,
        repaymentPeriod,
        advLicNo,
        description,
        defaultPenalty,
        statusNumber,
        AdvEmail,
        dfltDeadLn,
        installmentAmount,
        paymentFrequency,
        status
      } = loanReq;
      const ChmNMmbrPhns = loaneeMemberId + chamaPhone;
      const {
        getSMAccount: senderAccount
      } = await fetchGraphQL(getSMAccount, {
        awsemail: attributes.email
      });
      if (state.SnderPW !== senderAccount.pw) {
        Alert.alert('Wrong password');
        setField('isLoading', false);
        return;
      }
      const {
        getChamaMembers: chmMember
      } = await fetchGraphQL(getChamaMembers, {
        ChamaNMember: ChmNMmbrPhns
      });
      const {
        getGroup: group
      } = await fetchGraphQL(getGroup, {
        grpContact: chamaPhone
      });
      const {
        getCompany: company
      } = await fetchGraphQL(getCompany, {
        AdminId: "BaruchHabaB'ShemAdonai2"
      });
      const {
        getSMAccount: recAccount
      } = await fetchGraphQL(getSMAccount, {
        awsemail: loaneeEmail
      });
      const {
        getChamaControlTable: controlTable
      } = await fetchGraphQL(getChamaControlTable, {
        id: "EQUITYTABLEID"
      });
      const {
        getMiFedhaBankAdmin: bankAdmin
      } = await fetchGraphQL(getMiFedhaBankAdmin, {
        nationalid: group.BankAdminAcNu
      });
      if (status === 'Approved') {
        Alert.alert('Loan already granted');
        setField('isLoading', false);
        return;
      }
      if (status !== 'Cleared') {
        Alert.alert('Loan not yet cleared by Bank Admin');
        setField('isLoading', false);
        return;
      }
      if (state.MmbrId === chamaPhone) {
        Alert.alert('You cannot Loan Yourself');
        setField('isLoading', false);
        return;
      }
      if (recAccount.acStatus !== 'AccountActive') {
        Alert.alert('Receiver account inactive');
        setField('isLoading', false);
        return;
      }
      const ttlCovFeeAmount = parseFloat(company.CoverageFee) * parseFloat(amount);
      const transFee = parseFloat(company.userLoanTransferFee) * parseFloat(amount);
      const totalAmount = parseFloat(amount) + ttlCovFeeAmount + transFee;
      const grpSync = parseFloat(amount) + transFee;
      const grpSyncAdvocate = totalAmount;
      const createLoan = async (advRegNu = 'None', loanAmount = totalAmount, grpSyncAmount = grpSync) => {
        await client.graphql({
          query: createCvrdGroupLoans,
          variables: {
            input: {
              loanID: route.params.id,
              grpContact: chamaPhone,
              loaneePhn: loaneeEmail,
              loanerLoanee: chamaPhone + loaneePhone,
              loanerLoaneeAdv: chamaPhone + loaneePhone + advRegNu,
              repaymentPeriod,
              amountGiven: parseFloat(amount).toFixed(0),
              amountExpectedBack: loanAmount.toFixed(0),
              amountExpectedBackWthClrnc: loanAmount.toFixed(0),
              amountRepaid: 0,
              DefaultPenaltyChm: defaultPenalty,
              DefaultPenaltyChm2: 0,
              timeExpBack: parseFloat(repaymentPeriod),
              timeExpBack2: 61,
              crtnDate: new Date().getTime(),
              description,
              clearanceAmt: 0,
              clearanceAmt2: 0,
              lonBala: loanAmount.toFixed(0),
              advRegNu,
              loaneeName: recAccount.name,
              dfltDeadLn,
              LoanerName: group.grpName,
              memberId: ChmNMmbrPhns,
              status: 'LoanActive',
              lnType: 'GrpLn',
              interest: repaymentAmt,
              dfltUpdate: new Date().getTime(),
              owner: user.userId,
              blOfficer: 'None',
              advEmail: advRegNu === 'None' ? 'None' : AdvEmail,
              installmentAmount,
              paymentFrequency
            }
          }
        });
      };
      if (advLicNo === 'None') {
        await createLoan();
      } else {
        const {
          getAdvocate: adv
        } = await fetchGraphQL(getAdvocate, {
          advregnu: advLicNo
        });
        await createLoan(advLicNo, totalAmount, grpSyncAdvocate);
        const advEarning = ttlCovFeeAmount * parseFloat(company.AdvCom);
        await client.graphql({
          query: updateAdvocate,
          variables: {
            input: {
              advregnu: advLicNo,
              advBal: (parseFloat(adv.advBal) + advEarning).toFixed(0),
              TtlEarnings: (parseFloat(adv.TtlEarnings) + advEarning).toFixed(0)
            }
          }
        });
      }
      await client.graphql({
        query: updateChamaMembers,
        variables: {
          input: {
            ChamaNMember: ChmNMmbrPhns,
            LonAmtGven: (parseFloat(chmMember.LonAmtGven) + parseFloat(amount)).toFixed(0),
            GrossLnsGvn: (parseFloat(chmMember.GrossLnsGvn) + totalAmount).toFixed(0),
            LnBal: (parseFloat(chmMember.LnBal) + totalAmount).toFixed(0),
            loanStatus: 'LoanActive',
            blStatus: 'AccountNotBL'
          }
        }
      });
      await client.graphql({
        query: updateGroup,
        variables: {
          input: {
            grpContact: chamaPhone,
            TtlActvLonsTmsLnrChmCov: parseFloat(group.TtlActvLonsTmsLnrChmCov) + 1,
            TtlActvLonsAmtLnrChmCov: (parseFloat(group.TtlActvLonsAmtLnrChmCov) + grpSync).toFixed(0),
            grpBal: (parseFloat(group.grpBal) - grpSync).toFixed(0),
            GrpLoanOutSync: (parseFloat(group.GrpLoanOutSync) + grpSync).toFixed(0)
          }
        }
      });
      await client.graphql({
        query: updateSMAccount,
        variables: {
          input: {
            awsemail: loaneeEmail,
            TtlActvLonsTmsLneeChmCov: parseFloat(recAccount.TtlActvLonsTmsLneeChmCov) + 1,
            TtlActvLonsAmtLneeChmCov: (parseFloat(recAccount.TtlActvLonsAmtLneeChmCov) + totalAmount).toFixed(0),
            balance: (parseFloat(recAccount.balance) + parseFloat(amount)).toFixed(0),
            loanStatus: 'LoanActive',
            blStatus: 'AccountNotBL',
            loanAcceptanceCode: 'None'
          }
        }
      });
      const grossCompEarning = transFee;
      const bankAdminEarning = grossCompEarning * parseFloat(company.BankMifedhaSyncFee);
      const netCompEarning = grossCompEarning - bankAdminEarning;
      await client.graphql({
        query: updateCompany,
        variables: {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            ttlCompCovEarnings: parseFloat(company.ttlCompCovEarnings) + totalAmount,
            AdvEarningBal: parseFloat(company.AdvEarningBal) + ttlCovFeeAmount,
            AdvEarning: parseFloat(company.AdvEarning) + ttlCovFeeAmount,
            companyEarningBal: parseFloat(company.companyEarningBal) + netCompEarning,
            companyEarning: parseFloat(company.companyEarning) + netCompEarning,
            ttlChmLnsInAmtCov: parseFloat(company.ttlChmLnsInAmtCov) + totalAmount,
            ttlChmLnsInTymsCov: parseFloat(company.ttlChmLnsInTymsCov) + 1
          }
        }
      });
      await client.graphql({
        query: updateMiFedhaBankAdmin,
        variables: {
          input: {
            nationalid: group.BankAdminAcNu,
            BankAdmBal: (parseFloat(bankAdmin.BankAdmBal) + bankAdminEarning).toFixed(0)
          }
        }
      });
      await client.graphql({
        query: updateChamaControlTable,
        variables: {
          input: {
            id: 'EQUITYTABLEID',
            GrpLoanOutEarnings: (parseFloat(controlTable.GrpLoanOutEarnings) + bankAdminEarning).toFixed(0),
            BankAdminEarnings: (parseFloat(controlTable.BankAdminEarnings) + bankAdminEarning).toFixed(0)
          }
        }
      });
      await client.graphql({
        query: updateReqLoanChama,
        variables: {
          input: {
            id: route.params.id,
            status: 'Approved'
          }
        }
      });
      await client.graphql({
        query: createMessages,
        variables: {
          input: {
            senderEmail: loaneeEmail,
            messageBody: `You have received a loan from ${group.grpName} of ${amount} repayable as ${totalAmount} at an interest of ${repaymentAmt} after ${repaymentPeriod} days. The transaction fees were ${transFee} and advocate fees of ${ttlCovFeeAmount}. The monthly installment is ${installmentAmount} payable every ${paymentFrequency} days. The money has been credited to your main account.`
          }
        }
      });
      await client.graphql({
        query: sendNotification,
        variables: {
          riderEmail: loaneeEmail,
          title: "MiFedha: New Loan",
          body: `You have received a loan from ${group.grpName} of ${amount} repayable as ${totalAmount} at an interest of ${repaymentAmt} after ${repaymentPeriod} days. The monthly installment is ${installmentAmount} payable every ${paymentFrequency} days. The transaction fees were ${transFee} and advocate fees of ${ttlCovFeeAmount}. The money has been credited to your main account.`
        }
      });
      Alert.alert(`Success. TransactionFee: ${transFee.toFixed(2)}${advLicNo !== 'None' ? ` . AdvocateFee: ${ttlCovFeeAmount.toFixed(2)}` : ''}`);
      setField('amount', '');
      setField('AmtExp', '');
      setField('SnderPW', '');
      setField('RepaymtPeriod', '');
      setField('RecAccCode', '');
      setField('ChmPhn', '');
      setField('MmbrId', '');
    } catch (e) {
      console.log(e);
    } finally {
      setField('isLoading', false);
    }
  };
  return <KeyboardAvoidingView style={{
    flex: 1,
    backgroundColor: '#f2f6fc'
  }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chama Covered Loans</Text>
        <Text style={styles.subHeaderText}>Enter your password to approve loan</Text>
      </View>

      {/* Password Input Card */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Admin Password</Text>
      <TextInput placeholder="Enter password" value={state.SnderPW} secureTextEntry={!showPassword} onChangeText={text => setField('SnderPW', text)} // ✅ fixed
        style={styles.input} editable={!state.isLoading} // ✅ access isLoading from state
        />

        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Loan Button */}
    <TouchableOpacity onPress={fetchChmLoanReq} disabled={state.isLoading} // ✅ use state
      style={{
        marginTop: 30
      }}>
  <LinearGradient colors={['#e29d58', 'skyblue']} start={{
          x: 0,
          y: 0
        }} end={{
          x: 1,
          y: 0
        }} style={styles.buttonGradient}>
    <Text style={styles.buttonText}>Click to Loan</Text>
    {state.isLoading && <ActivityIndicator size="small" color="#fff" style={{
            marginLeft: 10
          }} />}
  </LinearGradient>
      </TouchableOpacity>


    </ScrollView>
  </KeyboardAvoidingView>;
};
export default ChmCovLns;
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f6fc'
  },
  header: {
    marginBottom: 30,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e29d58'
  },
  subHeaderText: {
    fontSize: 16,
    color: 'skyblue',
    marginTop: 5,
    textAlign: 'center'
  },
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative'
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9'
  },
  eyeIcon: {
    position: 'absolute',
    right: 25,
    top: 50
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 25
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});