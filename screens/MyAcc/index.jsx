import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  FlatList,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const MyAccount = props => {
  const navigation = useNavigation();

  const Section = ({ title, options }) => (
    <View style={styles.clientsView}>
      <Text style={styles.salesText}>{title}</Text>
      <View style={styles.viewForClientsAndTitle}>
        {options.map(({ label, onPress, style }, index) => (
          <Pressable key={index} onPress={onPress} style={style || styles.viewForClientsPressables}>
            <LinearGradient
              colors={['#FF8C00', '#00BFFF']} // Orange to Sky Blue gradient
              start={{ x: 0, y: 0 }} // Gradient starts from the top left (vertical direction)
              end={{ x: 1, y: 1 }}   // Gradient ends at the bottom right (vertical and horizontal)
              style={styles.clientsPressableGradient}
            >
              <Text style={styles.salesPressableText}>{label}</Text>
            </LinearGradient>
          </Pressable>
        ))}
      </View>
    </View>
  );
  

  const SMDpsitsss = () => {
    navigation.navigate('ElimDpstss');
  };

  const ViewNonLnsRecs = () => {
    navigation.navigate('ViewNonLnsRecs');
  };

  const ViewNonLnsSents = () => {
    navigation.navigate('ViewNonLnsSents');
  };

  

  const SearchUser = () => {
    navigation.navigate('VwMakeLnReq');
  };


  const SMWthdrwlsss = () => {
    navigation.navigate('ElimWthdrwlss');
  };

  const goWithdrwMny = () => {
    navigation.navigate('WithdrawalOptions');
  };

  const goToSMASndnonln = () => {
    navigation.navigate('Vw2SelectChmBeneficiary');
  };

 

  const LoanAds = () => {
    navigation.navigate('LoanAds');
  };

  const UpdateMainAc = () => {
    navigation.navigate('UpdateMainAc');
  };

  const SrchLoanAdz = () => {
    navigation.navigate('SrchLoanAdz');
  };

  const DepositOptions = () => {
    navigation.navigate('DepositOptions');
  };

  const VwPlLn2Remove = () => {
    navigation.navigate('VwPlLn2Remove');
  };

  const BoostPalBenefits = () => {
    navigation.navigate('BoostPalBenefits');
  };

  const UrLnks = () => {
    navigation.navigate('UrLnks');
  };

   const ViewBiznaShareRec = () => {
    navigation.navigate('ViewBiznaShareRec');
  };

  

  
  return (
    <SafeAreaView>
      <ScrollView>
      <LinearGradient
            colors={['#FF8C00', 'skyblue', 'white']} // Linear gradient for orange hues
            start={{ x: 0, y: 0 }} // Gradient starts from the top left (vertical direction)
            end={{ x: 1, y: 1 }}
            style={styles.clientsPressableGradient}
          >
            
        <Section 
          title="Account"
          options={[
            
          /*  { label: 'Deposit Money', onPress: DepositOptions, style: styles.ClientsPressables },
          */
            { label: 'View Deposits', onPress: SMDpsitsss, style: styles.ClientsPressables },
            { label: 'Update Main Account', onPress: UpdateMainAc, style: styles.ClientsPressables },
            { label: 'Send Cash', onPress: goToSMASndnonln, style: styles.ClientsPressables },
            { label: 'View Cash sent to Pals/Transpoter', onPress: ViewNonLnsSents, style: styles.ClientsPressables },
            { label: 'View Cash received from Biz', onPress: ViewBiznaShareRec, style: styles.ClientsPressables },
            { label: 'View Cash received from Pals', onPress: ViewNonLnsRecs, style: styles.ClientsPressables }
          ]}
        />



        <Section 
          title="Withdrawals"
          options={[
            { label: 'Withdraw Money', onPress: goWithdrwMny },
            { label: 'View Withdrawn Money', onPress: SMWthdrwlsss },
            
            
           
          ]}
        />

        <Section 
          title="Other Operations"
          options={[
            { label: 'Boost pooled Benefits', onPress: BoostPalBenefits },
             { label: 'Search Loan Ads', onPress: SrchLoanAdz },
            { label: 'Advertise', onPress: LoanAds },
            { label: 'Delete ', onPress: VwPlLn2Remove },
           
          ]}
        />

        

</LinearGradient>
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default MyAccount;