import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



 
  const SETTINGS_OPTIONS = [
    { label: 'View groups Deals', navigateTo: 'VwAdvChamaCovLnss' },
    { label: 'View Credit Sales Deals', navigateTo: 'VwAdvCrdSlrCovLnss' },
    { label: 'View Pal Deals', navigateTo: 'VwAdvSMCovLnss' },
    { label: 'My Withdrawals', navigateTo: 'AdvWthdrwlSgnIns' },
    { label: 'Update Account', navigateTo: 'UpdtMFAdvPWs' },
    { label: 'View Account', navigateTo: 'AdvVwAcSgnIns' },
    { label: 'Register Advocate', navigateTo: 'VwCompMFAdvTC' },
    { label: 'Search Advocate', navigateTo: 'EntrAdvLoc' },
    { label: 'Approve PalPal Deals', navigateTo: 'Vw2ApprovePPReq' },
    { label: 'Approve Group Deals', navigateTo: 'Vw2ApproveChmReq' },
    { label: 'Approve Biz Deals', navigateTo: 'Vw2ApproveBizReq' },
    { label: 'Withdraw Earnings', navigateTo: 'WithdwAdvs' },
    { label: 'View Withdrawals', navigateTo: 'AdvWthdrwlSgnIns' },
    
  ];
  
  const KFAdvHome = () => {
    const navigation = useNavigation();
  
    const goToMainAccount = () => {
      navigation.navigate('Homes');
    };
    
    
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* LinearGradient Title */}
          <LinearGradient
            colors={['#ffffff', '#87CEEB']}
            style={styles.header}>
              <TouchableOpacity onPress={goToMainAccount} >
            <Text style={styles.headerText}>Go Home</Text>
            </TouchableOpacity>
          </LinearGradient>
  
          {/* Render Options */}
          {SETTINGS_OPTIONS.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(option.navigateTo)}
              style={styles.optionButton}>
              <LinearGradient
                colors={['#87CEEB', '#e58d29']}
                style={styles.gradientButton}>
                <Text style={styles.optionText}>{option.label}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default KFAdvHome;
   
  
  
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    container: {
      padding: 15,
    },
    header: {
      marginBottom: 15,
      paddingVertical: 15,
      alignItems: 'center',
      borderRadius: 10,
      elevation: 2,
    },
    headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'black',
    },
    optionButton: {
      marginVertical: 8,
      borderRadius: 10,
      elevation: 2,
      overflow: 'hidden',
    },
    gradientButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
    },

  })