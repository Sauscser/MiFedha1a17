import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const KFNdogoScreen = () => {
  const navigation = useNavigation();

  const nav = (route: string) => () => navigation.navigate(route);

  const Section = ({ title, children, gradient }: { title: string, children: React.ReactNode, gradient: string[] }) => (
    <LinearGradient colors={gradient} style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.buttonGroup}>{children}</View>
    </LinearGradient>
  );

  const CustomButton = ({ title, onPress }: { title: string, onPress: () => void }) => (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Top Navigation */}
        <LinearGradient colors={['#ffffff', 'skyblue']} style={styles.topBar}>
          <CustomButton title="🏠 Go Home" onPress={nav('Homes')} />
        </LinearGradient>

        {/* Sections */}
        <Section title="📊 View" gradient={['#e58d29', 'skyblue']}>
          <CustomButton title="Deposit" onPress={nav('FloatBghtSgnIns')} />
          <CustomButton title="Float Bought" onPress={nav('UsrDpositSgnIns')} />
          <CustomButton title="MFNdogo Withdrawals" onPress={nav('MFNWithdrawlsSgnIns')} />
          <CustomButton title="Client Withdrawals" onPress={nav('UsrWthdrwlsSgnIns')} />
          <CustomButton title="Float Withdrawals" onPress={nav('FltWthdrwlsSgnIns')} />
        </Section>

        <Section title="👤 My Account" gradient={['skyblue', '#e58d29']}>
          <CustomButton title="Update Ac" onPress={nav('UpdtMFNPWs')} />
          <CustomButton title="View Ac" onPress={nav('VwMFNAccountSgnIns')} />
          <CustomButton title="Create Ac" onPress={nav('VwCompMFNTC')} />
        </Section>

        <Section title="💰 Float" gradient={['#e58d29', 'skyblue']}>
          <CustomButton title="MFNdogo Withdraw" onPress={nav('WthdrwMFNFlts')} />
          <CustomButton title="User Deposit" onPress={nav('DpstMney')} />
          <CustomButton title="Chama Deposit" onPress={nav('SignitoryDepositss')} />
          <CustomButton title="Biz Deposit" onPress={nav('MakeBizDpsts')} />
         <CustomButton title="View Deposit" onPress={nav('VwBizDpstsMFN')} />
          <CustomButton title="View Withdrawals" onPress={nav('VwUsrWthdrwlss')} />
       </Section>

        <Section title="💸 Earnings" gradient={['skyblue', '#e58d29']}>
          <CustomButton title="Withdraw" onPress={nav('WthdrwMFNs')} />
          <CustomButton title="Update Commission" onPress={nav('UpdateMFNComs')} />
        </Section>

      </ScrollView>
    </SafeAreaView>
  );
};

export default KFNdogoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  topBar: {
    width: '90%',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  section: {
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#ffffffcc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 10,
    minWidth: 130,
    alignItems: 'center',
    shadowColor: '#333',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
});
