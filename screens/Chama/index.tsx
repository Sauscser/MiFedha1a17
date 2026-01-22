import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

// Reusable Gradient Button
const GradientButton = ({ onPress, text }) => (
  <LinearGradient
    colors={['#FF8C00', '#00BFFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gradientPressable}
  >
    <Pressable onPress={onPress} style={styles.clientsPressable}>
      <Text style={styles.clientsPressableText}>{text}</Text>
    </Pressable>
  </LinearGradient>
);

const MyLoanAccount = () => {
  const navigation = useNavigation();
  const [id, setID] = useState('');
  const [ChamaNMember, setChamaNMember] = useState('');

  // Navigation functions
  const navigateTo = (screen, params) => () => navigation.navigate(screen, params);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.adminImage}>

          {/* ------------------- Group Advance ------------------- */}
          <View style={styles.clientsView}>
            <Text style={styles.salesText}>Group Advance</Text>
            <GradientButton onPress={navigateTo('Vw2SelectChm2Req')} text="Request loan from group - member" />
            <GradientButton onPress={navigateTo('ChamaVw2DelLnReqs')} text="Delete a loan request - member" />
            <GradientButton onPress={navigateTo('VwGrp2LnCov')} text="Give Member Advance - Group Signatory" />
            <GradientButton onPress={navigateTo('Vw2FloatGrpLoans')} text="Float Group Loans - Group signatory" />
            <GradientButton onPress={navigateTo('Vw2SignLoanRequests')} text="Approve member loan - members" />
            <GradientButton onPress={navigateTo('CreateChamaMinutes')} text="Group Minutes" />

          </View>

          {/* ------------------- Group Status ------------------- */}
          <View style={styles.clientsView}>
            <Text style={styles.salesPressableText}>View Group Status</Text>
            <GradientButton onPress={navigateTo('ChmSignInss')} text="View Group Debts Status: Blacklist, View Repayments, Waive" />
          </View>

          {/* ------------------- Member Status ------------------- */}
          <View style={styles.clientsView}>
            <Text style={styles.salesPressableText}>View Member Status</Text>
            <GradientButton onPress={navigateTo('ChmLnsRec')} text="View Member Debts Status: View Repayments, Repay Debts" />
          </View>

          {/* ------------------- Registration ------------------- */}
          <View style={styles.clientsView}>
            <Text style={styles.salesText}>Registration</Text>
            <GradientButton onPress={navigateTo('AddChmMembrsss')} text="Register Member" />
            <GradientButton onPress={navigateTo('SgnIn2RemoveMmbrs', { id })} text="Deregister Member" />
          </View>

          {/* ------------------- Group Remittance ------------------- */}
          <View style={styles.clientsView}>
            <Text style={styles.salesText}>Group Remittance</Text>
            <GradientButton onPress={navigateTo('ViewGrp2ConfirmDividends')} text="View Group's remittances: confirm remittances (Signatories), View Remittances" />
            <GradientButton onPress={navigateTo('ChamaMmbrRemts')} text="View My remittances" />
          </View>

          {/* ------------------- Membership ------------------- */}
          <View style={styles.clientsView}>
            <Text style={styles.salesText}>Membership</Text>
            <GradientButton onPress={navigateTo('ViewGrp2ShareDividends')} text="View Members: Approve/disapprove Transport, Share dividends/Profits, View subscriptions, Penalise late Repayments" />
            <GradientButton onPress={navigateTo('ChmMmbrMmbrss')} text="View my Groups: View my subscriptions, send my Subscriptions" />
          </View>

          {/* ------------------- Group Account ------------------- */}
          <View style={styles.clientsView2}>
            <Text style={styles.salesText}>Group Account</Text>
            <GradientButton onPress={navigateTo('ViewGrpApplications')} text="Create" />
            <GradientButton onPress={navigateTo('DissolveChms')} text="Dissolve" />
            <GradientButton onPress={navigateTo('UpdateChmAc')} text="Update" />
            <GradientButton onPress={navigateTo('ChamSignIn3s')} text="View Group Account" />
          </View>

          {/* ------------------- Signatory Works ------------------- */}
          <View style={styles.clientsView2}>
            <Text style={styles.salesText}>Signatory Works</Text>
            <GradientButton onPress={navigateTo('Sgn2CnfrmWthdrwlsss')} text="Signatory 2 Confirm Group Withdrawals" />
            <GradientButton onPress={navigateTo('SignitoryWthdrwFndsss')} text="Signatory 3 Confirm Group Withdrawals" />
            <GradientButton onPress={navigateTo('SignitoryWthdrwFndsss')} text="Execute Group Withdrawls" />
            <GradientButton onPress={navigateTo('SgnIn2VwChmDpstss')} text="View Group Deposits" />
            <GradientButton onPress={navigateTo('SgnIn2VwChmWthdrwlss')} text="View Group Withdrawals" />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyLoanAccount;
