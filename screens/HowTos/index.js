import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, 
  Pressable, Dimensions, Linking } from 'react-native';
  
import { useNavigation } from '@react-navigation/native';
import { graphqlOperation, API } from 'aws-amplify';
import { getCompany, getCompanyUrls } from '../../src/graphql/queries';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window'); // Get screen dimensions for dynamic scaling

const HomeScreen = () => {
  const [alert, setAlert] = useState("");
  const [Url, setUrl] = useState("");
  const navigation = useNavigation();

  const navigateTo = (screen, params = {}) => {
    navigation.navigate(screen, params);
  };

  const LnsScreen = () => {
    navigation.navigate('LnsScreen');
  };

  const ChamaScreen = () => {
    navigation.navigate('ChamaScreen');
  };

  const CredSlsScreen = () => {
    navigation.navigate('CredSlsScreen');
  };

  const CreateSMAcs = () => {
    navigation.navigate('WelcomePgss');
  };

  const ChmNonCovLonss = () => {
    navigation.navigate('ChmNonCovLons', {id});
  };

  const VwMakeLnReq = () => {
    navigation.navigate('PlaceLnReq');
  };

  const ViewMySMAcss = () => {
    navigation.navigate('ViewSmAcs');
  };

  const ViewAlertDtls = () => {
    navigation.navigate('ViewAlertDtls');
  };

  const HowTo2 = () => {
    navigation.navigate('HowTo2');
  };

  const getCompanyDetails = async () => {
    try {
      const compDetails = await API.graphql(
        graphqlOperation(getCompany, { AdminId: "BaruchHabaB'ShemAdonai2" })
      );
      const alertz = compDetails.data.getCompany.alert;
      setAlert(alertz);
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const getCompUrls = async () => {
    try {
      const compDetailsz = await API.graphql(
        graphqlOperation(getCompanyUrls, { AdminId: "BaruchHabaB'ShemAdonai2Ulr" })
      );
      const Url1 = compDetailsz.data.getCompanyUrls.Url2;
      setUrl(Url1);
      console.log(Url1)
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };

  useEffect(() => {
    getCompUrls();
  }, []);

 

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#e58d29', '#f3c642']}
        style={styles.backgroundGradient}
      >
        {/* Header Section */}
      

        {/* Main Buttons */}
       

        {/* Motivational Quote */}
        <LinearGradient colors={['#e58d29', '#f3c642']} style={styles.quoteContainer}>
        <Pressable onPress={HowTo2}>
    <Text style={styles.quoteText}>View Demos</Text>
    <FontAwesome name="youtube-play" size={24} color="white" style={{marginLeft: 5,}} />
  </Pressable>
        </LinearGradient>

        {/* Product Buttons */}
        

        {/* Loan Button */}
        
         
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    width: '90%',
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 20,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  pressable: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  signOutText: {
    fontSize: 16,
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
  },
  mainButton: {
    width: '45%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  quoteContainer: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center', 
  },
  quoteText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
  },
  productButton: {
    width: '30%',
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
  },
  productButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  loanContainer: {
    width: '90%',
    height:'100%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanButton: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  alertContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  alertText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});
