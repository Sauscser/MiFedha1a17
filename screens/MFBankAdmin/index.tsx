import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, FlatList, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
const Section = ({
  title,
  options
}) => <View style={styles.clientsView}>
    <Text style={styles.salesText}>{title}</Text>
    <View style={styles.viewForClientsAndTitle}>
      {options.map(({
      label,
      onPress,
      style
    }, index) => <Pressable key={index} onPress={onPress} style={style || styles.viewForClientsPressables}>
          <LinearGradient colors={['#FF8C00', '#00BFFF']} // Orange to Sky Blue gradient
      start={{
        x: 0,
        y: 0
      }} // Gradient starts from the top left (vertical direction)
      end={{
        x: 1,
        y: 1
      }} // Gradient ends at the bottom right (vertical and horizontal)
      style={styles.clientsPressableGradient}>
            <Text style={styles.salesPressableText}>{label}</Text>
          </LinearGradient>
        </Pressable>)}
    </View>
  </View>;
const RegKFKubwa = props => {
  const navigation = useNavigation();
  const goToBuyFloat = () => {
    navigation.navigate('BuyFloatBnkAdm');
  };
  const RegPwnBrkrss = () => {
    navigation.navigate('RegPwnBrkrs');
  };
  const AdjustUsrLimitsss = () => {
    navigation.navigate('AdjustUsrLimitss');
  };
  const DActvteMFAds = () => {
    navigation.navigate('DActvteMFAd');
  };
  const PwnBrkrRegss = () => {
    navigation.navigate('PwnBrkrRegss');
  };
  const ChamaRegss = () => {
    navigation.navigate('ChamaRegss');
  };
  const DActivateMFN = () => {
    navigation.navigate('DActvteMFN');
  };
  const ClearGroupMemberLoan = () => {
    navigation.navigate('ClearGroupMemberLoan');
  };
  const SyncGrpWithdrawals = () => {
    navigation.navigate('SyncGrpWithdrawals');
  };
  const ApplyMFKubwa = () => {
    navigation.navigate('AddMFKubwas');
  };
  const SyncGrpLoansOut = () => {
    navigation.navigate('SyncGrpLoansOut');
  };
  const SyncGrpdividends = () => {
    navigation.navigate('SyncGrpdividends');
  };
  const UpdateBankAdminAc = () => {
    navigation.navigate('UpdateBankAdminAc');
  };
  const RegGrp = () => {
    navigation.navigate('RegGrp');
  };
  const WithdrawBankAdmin = () => {
    navigation.navigate('WithdrawBankAdmin');
  };
  const SyncGrpBenefits = () => {
    navigation.navigate('SyncGrpBenefits');
  };
  const ViewSyncedGrpdividends = () => {
    navigation.navigate('ViewSyncedGrpdividends');
  };
  const ViewSyncedGrpLoansOut = () => {
    navigation.navigate('ViewSyncedGrpLoansOut');
  };
  const ViewSyncedGrpWithdrawals = () => {
    navigation.navigate('ViewSyncedGrpWithdrawals');
  };
  const ViewSyncedGrpBenefits = () => {
    navigation.navigate('ViewSyncedGrpBenefits');
  };
  const ViewMFBankAdmin = () => {
    navigation.navigate('ViewMFBankAdmin');
  };
  return <SafeAreaView>
      <ScrollView>
      <LinearGradient colors={['#FF8C00', 'skyblue', 'white']} // Linear gradient for orange hues
      start={{
        x: 0,
        y: 0
      }} // Gradient starts from the top left (vertical direction)
      end={{
        x: 1,
        y: 1
      }} style={styles.clientsPressableGradient}>
            
        <Section title="Account" options={[{
          label: 'Register Group',
          onPress: RegGrp,
          style: styles.ClientsPressables
        }, {
          label: 'Clear Group Member Loan Applications',
          onPress: ClearGroupMemberLoan,
          style: styles.ClientsPressables
        }, {
          label: 'Apply MFKubwa Account',
          onPress: ApplyMFKubwa,
          style: styles.ClientsPressables
        }, {
          label: 'Update Bank Admin Account',
          onPress: UpdateBankAdminAc,
          style: styles.ClientsPressables
        }, {
          label: 'Top up Float',
          onPress: goToBuyFloat,
          style: styles.ClientsPressables
        }, {
          label: 'Withdraw Earnings',
          onPress: WithdrawBankAdmin,
          style: styles.ClientsPressables
        }, {
          label: 'View Account',
          onPress: ViewMFBankAdmin,
          style: styles.ClientsPressables
        }]} />

        <Section title="Sync" options={[{
          label: 'Sync Group Loans',
          onPress: SyncGrpLoansOut,
          style: styles.ClientsPressables
        }, {
          label: 'Sync Group Dividends',
          onPress: SyncGrpdividends,
          style: styles.ClientsPressables
        }, {
          label: 'Sync Group Withdrawals',
          onPress: SyncGrpWithdrawals,
          style: styles.ClientsPressables
        }, {
          label: 'Sync Group Benefits',
          onPress: SyncGrpBenefits,
          style: styles.ClientsPressables
        }]} />

        <Section title="View Syncs" options={[{
          label: 'View Synced Group Benefits',
          onPress: ViewSyncedGrpBenefits,
          style: styles.ClientsPressables
        }, {
          label: 'View Synced Group Withdrawals',
          onPress: ViewSyncedGrpWithdrawals,
          style: styles.ClientsPressables
        }, {
          label: 'View Synced Group Loans',
          onPress: ViewSyncedGrpLoansOut,
          style: styles.ClientsPressables
        }, {
          label: 'View Synced Group DIvidends',
          onPress: ViewSyncedGrpdividends,
          style: styles.ClientsPressables
        }]} />



        

      </LinearGradient>
      </ScrollView>
      
    </SafeAreaView>;
};
export default RegKFKubwa;