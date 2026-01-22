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
      navigation.navigate('BizUpdatePW');
    };

    const PersonelVw2GrntB2P = () => {
      navigation.navigate('PersonelVw2GrntB2P');
    };
  
    const BizCancelObjection = () => {
      navigation.navigate('BizCancelObjection');
    };
  
    const BizObject = () => {
      navigation.navigate('BizObject');
    };

    const AddBizBeneficiary = () => {
      navigation.navigate('AddBizBeneficiary');
    };

    const BizAddAdmin = () => {
      navigation.navigate('BizAddAdmin');
    };
    

    const DissolveBizsss = () => {
      navigation.navigate('DissolveBizss');
    };
  

  return (
    <SafeAreaView>
      <ScrollView>
 



            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Update Biz Account</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={BizAddAdmin}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Add Admin</Text>
                  </Pressable>
                </View>

            

               
              
                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={BizUpdatePW}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Change PassWord</Text>

                  </Pressable>
                </View>

             

              </View>
            </View>

       
            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Update Biz Account</Text>

              <View style={styles.viewForClientsAndTitle}>
             

                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={BizObject}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Stop Operations</Text>

                  </Pressable>
                </View>

                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={BizCancelObjection}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Allow Operations</Text>

                  </Pressable>
                </View>

               

                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={DissolveBizsss}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Dissolve Business</Text>

                  </Pressable>
                </View>

              </View>
            </View>


    </ScrollView>
    </SafeAreaView> 
    
  );
};

export default MyLoanAccount;