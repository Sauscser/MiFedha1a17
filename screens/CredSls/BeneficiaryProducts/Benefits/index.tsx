import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Pressable } from 'react-native';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';

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



const MyLoanAccount = () => {

  const navigation = useNavigation()

  const VwPal2BizLners = () => {
    navigation.navigate('VwPal2BizLners');
  };

  const SI2VwBiz2PalLoanees = () => {
    navigation.navigate('SI2VwBiz2PalLoanees');
  };
  const SI2VwBiz2BizLoaners = () => {
    navigation.navigate('SI2VwBiz2BizLoaners');
  };

  const SI2VwBiz2BizLoanees = () => {
    navigation.navigate('SI2VwBiz2BizLoanees');
  };

  const SI2VwBiz2PalLoaners = () => {
    navigation.navigate('VwBiz2PalLners');
  };

  const CrtBusinessss = () => {
    navigation.navigate('CrtBusinesss');
  };

  

  const SgnIn2VwBiznasss = () => {
    navigation.navigate('SgnIn2VwBiznass');
  };

  const ShareCredSlsRevsss = () => {
    navigation.navigate('ShareCredSlsRevss');
  };

  const AddPersonelss = () => {
    navigation.navigate('AddPersonels');
  };

  const RmvPersonnelsss = () => {
    navigation.navigate('RmvPersonnelss');
  };

  const SgnIn2RemoveSlAd = () => {
    navigation.navigate('SgnIn2RemoveSlAd');
  };

  const ViewBiznaShareRec = () => {
    navigation.navigate('ViewBiznaShareRec');
  };

  const SgnIn2VwRevenueShare = () => {
    navigation.navigate('SgnIn2VwRevenueShare');
  };

  const PayCash = () => {
    navigation.navigate('PayCash');
  };

  const VwPalLners = () => {
    navigation.navigate('VwPalLners');
  };

  const VwCashPaySent = () => {
    navigation.navigate('VwCashPaySent');
  };

  const MakeNVwPayPalDpsits = () => {
    navigation.navigate('MakeNVwPayPalDpsits');
  };

  const VwPal2BizLnees = () => {
    navigation.navigate('VwPal2BizLnees');
  };

  const VwPalLnees = () => {
    navigation.navigate('VwPalLnees');
  };

  const Vw2GrntPal2Biz = () => {
    navigation.navigate("Vw2GrntPal2Biz");
  };

  const ItemAds = () => {
    navigation.navigate('ItemAds');
  };

  const Vw2GrntPal2Pal = () => {
    navigation.navigate('Vw2GrntPal2Pal');
  };

  const PersonelVw2GrntB2P = () => {
    navigation.navigate('PersonelVw2GrntB2P');
  };

  const PersonelVw2GrntB2B = () => {
    navigation.navigate('PersonelVw2GrntB2B');
  };

  const giveBizna = () => {
    navigation.navigate('giveBizna');
  };

  const TakeOverBizna = () => {
    navigation.navigate('TakeOverBizna');
  };

  const VwBizDpsts = () => {
    navigation.navigate('VwBizDpsts');
  };

  const AddBeneficiaryProduct = () => {
    navigation.navigate('AddBeneficiaryProduct');
  };

  

  const UpdateBizAc = () => {
    navigation.navigate('UpdateBizAc');
  };

  const ViewBenShares = () => {
    navigation.navigate('ViewBenShares');
  };

  const VwBenToShare = () => {
    navigation.navigate('VwBenToShare');
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
          title="Benefit Products"
          options={[
            
            { label: 'Share', onPress: VwBenToShare, style: styles.ClientsPressables },
            { label: 'View Benefits Shares', onPress: ViewBenShares, style: styles.ClientsPressables },
            
          ]}
        />
        
        

</LinearGradient>
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default MyLoanAccount;
