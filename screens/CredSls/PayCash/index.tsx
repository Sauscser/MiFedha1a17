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

    const ViewBiznaShareRecP2B = () => {
      navigation.navigate('ViewBiznaShareRecP2B');
    };

    const ViewBiznaShareSentP2B = () => {
      navigation.navigate('ViewBiznaShareSentP2B');
    };

    const ViewBiznaShareRecB2P = () => {
      navigation.navigate('ViewBiznaShareRecB2P');
    };

    const ViewBiznaShareSentB2P = () => {
      navigation.navigate('ViewBiznaShareSentB2P');
    };
  
    const ViewBiznaShareRecB2B = () => {
      navigation.navigate('ViewBiznaShareRecB2B');
    };

    const ViewBiznaShareSentB2B = () => {
      navigation.navigate("ViewBiznaShareSentB2B");
    };

    const P2BPayCash = () => {
      navigation.navigate('PayCash3');
    };

    const PersonelVw2GrntB2P = () => {
      navigation.navigate('PersonelVw2GrntB2P');
    };
  
    const B2PPayCashVw2Grant = () => {
      navigation.navigate('B2PPayCashVw2Grant');
    };
  
    const B2BPayCashVw2Grant = () => {
      navigation.navigate('B2BPayCashVw2Grant');
    };

    const B2PPayCashReq = () => {
      navigation.navigate('B2PPayCashReq');
    };

    const B2BPayCashReq = () => {
      navigation.navigate('B2BPayCashReq');
    };
    
  

  return (
    <SafeAreaView style= {{height:"100%"}}>
    
 



            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Request Cash Transfer</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={B2BPayCashReq}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Biz2Biz</Text>
                  </Pressable>
                </View>

            

                <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={B2PPayCashReq}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Biz2Pal</Text>

                  </Pressable>
                </View>

               
              </View>
            </View>

            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Granting Cash Transfers</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={B2BPayCashVw2Grant}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Biz2Biz</Text>
                  </Pressable>
                </View>

            

                <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={B2PPayCashVw2Grant}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Biz2Pal</Text>

                  </Pressable>
                </View>

                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={P2BPayCash}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Pal2Biz</Text>

                  </Pressable>
                </View>

              </View>
            </View>

            <View style={styles.clientsView}>
              <Text style={styles.salesText}>View Cash Sent</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Biz2Biz</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={ViewBiznaShareSentB2B}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Sent</Text>
                    </Pressable>

                    <Pressable
                      onPress={ViewBiznaShareRecB2B}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        Received
                      </Text>
                    </Pressable>
                  </View>
                </View>

            

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Biz2Pal</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={ViewBiznaShareSentB2P}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Sent</Text>
                    </Pressable>

                    <Pressable
                      onPress={ViewBiznaShareRecB2P}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                       Received
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Pal2Biz</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={ViewBiznaShareSentP2B}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Sent</Text>
                    </Pressable>

                    <Pressable
                      onPress={ViewBiznaShareRecP2B}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                      Received
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

  
    </SafeAreaView> 
    
  );
};

export default MyLoanAccount;