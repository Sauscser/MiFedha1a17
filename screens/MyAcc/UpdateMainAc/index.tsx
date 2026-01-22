import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  
  Pressable,
  
  SafeAreaView,
  ScrollView,
  
} from 'react-native';
import styles from './styles';

const MyLoanAccount = props => {
  const navigation = useNavigation();
  const[id, setID] =useState("")
  const[ChamaNMember, setChamaNMember] =useState("")


  
  
    

    const ItemAds = () => {
      navigation.navigate('ItemAds');
    };
  
    
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
      navigation.navigate('SI2VwBiz2PalLoaners');
    };

    const CrtBusinessss = () => {
      navigation.navigate('CrtBusinesss');
    };

    const DissolveBizsss = () => {
      navigation.navigate('DissolveBizss');
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
      navigation.navigate('P2BPayCash');
    };

    const VwPalLners = () => {
      navigation.navigate('VwPalLners');
    };

    const VwCashPaySent = () => {
      navigation.navigate('VwCashPaySent');
    };

    const SgnIn2VwCashSales = () => {
      navigation.navigate('SgnIn2VwCashSales');
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

    const BizUpdatePW = () => {
      navigation.navigate('UpdateSMPWs');
    };

    const PersonelVw2GrntB2P = () => {
      navigation.navigate('PersonelVw2GrntB2P');
    };
  
    const ChmCancelObjection = () => {
      navigation.navigate('ChmCancelObjection');
    };
  
    const ChmUpdate = () => {
      navigation.navigate('ChmUpdate');
    };

    const AddPalBizBeneficiary = () => {
      navigation.navigate('AddPalBizBeneficiary');
    };

    const AddPalPalBeneficiary = () => {
      navigation.navigate('AddPalPalBeneficiary');
    };
    
  return (
    <SafeAreaView>
      <ScrollView>
 
            <Pressable onPress={BizUpdatePW} style={styles.clientsView}>
              <Text style={styles.salesText}>Change Password</Text>

              <View style={styles.viewForClientsAndTitle}>
              

               

                <View style={styles.viewForClientsCategories7}>
                
                </View>

              </View>
            </Pressable>

       

    </ScrollView>
    </SafeAreaView> 
    
  );
};

export default MyLoanAccount;