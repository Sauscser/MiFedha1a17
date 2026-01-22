import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { Auth, API, graphqlOperation } from "aws-amplify";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

import { createBizna, createPersonel } from "../../../src/graphql/mutations";
import { listBiznas, getSMAccount } from "../../../src/graphql/queries";
import { useNavigation } from "@react-navigation/native";

const CreateBiz = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [businessType, setbusinessType] = useState("");
  const [bizContact, setbizContact] = useState("");
  const [bankType, setbankType] = useState("");
  const [bankAccount, setbankAccount] = useState("");
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied.");
        return;
      }

      const locationServicesEnabled = await Location.hasServicesEnabledAsync();
      if (!locationServicesEnabled) {
        Alert.alert("Location services are disabled. Please enable GPS.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation, // Best possible GPS accuracy
             // Wait up to 10 seconds for a good fix
          });
      
          const coords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
      
          // Optional: check for acceptable accuracy
          if (loc.coords.accuracy && loc.coords.accuracy > 30) {
            Alert.alert(
              "Low GPS Accuracy",
              `Location accuracy is about ${Math.round(
                loc.coords.accuracy
              )} meters. Try moving near a window or outside.`
            );
          }
      
      setLocation(coords);    

      
    } catch (error) {
      console.warn("Error fetching location:", error);
    }
  };

  fetchLocation();
}, []);

  const resetForm = () => {
    setBusinessName("");
    setBusinessPhone("");
    setLicenseNumber("");
    setPassword("");
    setConfirmPassword("");
    setDescription("");
    setbusinessType("");
            setbizContact("");
            setbankType("");
            setbankAccount("")
  };

  const handleCreateBusiness = async () => {
    if (isLoading) return;
    setIsLoading(true);
const userInfo = await Auth.currentAuthenticatedUser();
    try {
      const user = await Auth.currentAuthenticatedUser();
      const { email, sub, username } = user.attributes;

      const accountData = await API.graphql(
        graphqlOperation(getSMAccount, { awsemail: email })
      );
      const account = accountData.data.getSMAccount;

      if (sub !== account.owner) {
        Alert.alert("Please first create main account");
        setIsLoading(false);
        return;
      }

      const existingByLicense = await API.graphql(
        graphqlOperation(listBiznas, {
          filter: {
            and: [
              { licenseNo: { eq: licenseNumber } },
              { status: { eq: "AccountActive" } },
              { noBL: { gt: 0 } },
            ],
          },
        })
      );

      if (existingByLicense.data.listBiznas.items.length > 0) {
        Alert.alert("This license number is blacklisted by one of your clients");
        setIsLoading(false);
        return;
      }

      const existingByUser = await API.graphql(
        graphqlOperation(listBiznas, {
          filter: {
            and: [
              { email: { eq: email } },
              { status: { eq: "AccountActive" } },
              { noBL: { gt: 0 } },
            ],
          },
        })
      );

      if (existingByUser.data.listBiznas.items.length > 0) {
        Alert.alert("You have a business blacklisted by one of your clients");
        setIsLoading(false);
        return;
      }

      if (password.length < 8) {
        Alert.alert("Password must be at least 8 characters.");
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Passwords do not match.");
        setIsLoading(false);
        return;
      }

      const coords = location || { latitude: 0, longitude: 0 };

      await API.graphql(
        graphqlOperation(createBizna, {
          input: {
            BusKntct:businessPhone,
            busName: businessName,
            pw: password,
            email: userInfo.attributes.email,
            owner2email:userInfo.attributes.email,
            TtlEarnings: 0,
            earningsBal: 0,
            bizBeneficiary:userInfo.attributes.email,
            netEarnings:0,
            description: description,
            licenseNo: licenseNumber,
            bizType:"bizType",
            status: "AccountActive",
            businessType: businessType,
            bizContact: bizContact,
            owner: userInfo.attributes.sub,
            beneficiaryType: "Biz",
            benefitsAmount: 0,
            noBL:0,
            bankType:bankType,
            bankAccount: bankAccount,

            TtlActvLonsTmsLnrCredSlsB2B: 0,
            TtlActvLonsAmtLnrCredSlsB2B: 0,
            TtlBLLonsTmsLnrCredSlsB2B: 0,
            TtlBLLonsAmtLnrCredSlsB2B: 0,
            TtlClrdLonsTmsLnrCredSlsB2B: 0,
            TtlClrdLonsAmtLnrCredSlsB2B: 0,
            TtlActvLonsTmsLneeCredSlsB2B: 0,
            TtlActvLonsAmtLneeCredSlsB2B: 0,
            TtlBLLonsTmsLneeCredSlsB2B: 0,
            TtlBLLonsAmtLneeCredSlsB2B: 0,
            TtlClrdLonsTmsLneeCredSlsB2B: 0,
            TtlClrdLonsAmtLneeCredSlsB2B: 0,
          
            TtlActvLonsTmsLnrCredSlsB2P: 0,
            TtlActvLonsAmtLnrCredSlsB2P: 0,
            TtlBLLonsTmsLnrCredSlsB2P: 0,
            TtlBLLonsAmtLnrCredSlsB2P: 0,
            TtlClrdLonsTmsLnrCredSlsB2P: 0,
            TtlClrdLonsAmtLnrCredSlsB2P: 0,
            TtlActvLonsTmsLneeCredSlsP2B: 0,
            TtlActvLonsAmtLneeCredSlsP2B: 0,
            TtlBLLonsTmsLneeCredSlsP2B: 0,
            TtlBLLonsAmtLneeCredSlsP2B: 0,
            TtlClrdLonsTmsLneeCredSlsP2B: 0,
            TtlClrdLonsAmtLneeCredSlsP2B: 0,
            
            objectionStatus:"NotObjected",
            objOfficer: "None",
            objReason: "None",
            AdminNo:1,
            Admin1:userInfo.attributes.email,
            Admin2:"None",
            Admin3:"None",
            Admin4:"None",
            Admin5:"None",
            Admin6:"None",
            Admin7:"None",
            Admin8:"None",
            Admin9:"None",
            Admin10:"None",
            Admin11:"None",
            Admin12:"None",
            Admin13:"None",
            Admin14:"None",
            Admin15:"None",
            Admin16:"None",
            Admin17:"None",
            Admin18:"None",
            Admin19:"None",
            Admin20:"None",
            Admin21:"None",
            Admin22:"None",
            Admin23:"None",
            Admin24:"None",
            Admin25:"None",
            Admin26:"None",
            Admin27:"None",
            Admin28:"None",
            Admin29:"None",
            Admin30:"None",
            Admin31:"None",
            Admin32:"None",
            Admin33:"None",
            Admin34:"None",
            Admin35:"None",
            Admin36:"None",
            Admin37:"None",
            Admin38:"None",
            Admin39:"None",
            Admin40:"None",
            Admin41:"None",
            Admin42:"None",
            Admin43:"None",
            Admin44:"None",
            Admin45:"None",
            Admin46:"None",
            Admin47:"None",
            Admin48:"None",
            Admin49:"None",
            Admin50:"None",
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        })
      );

      const workerId = "00001" + businessPhone;

      await API.graphql(
        graphqlOperation(createPersonel, {
          input: {
            BusinessRegNo: businessPhone,
                          phoneKontact:userInfo.attributes.email,
                          name: account.name,
                          workerId: workerId,
                          workId:"00001",
                          email: userInfo.attributes.email,
                          
            nationalid: account.nationalid,
            BiznaName: businessName,
            ownrsss: account.owner,
          },
        })
      );

      Alert.alert("Business and owner accounts successfully created");
      resetForm();
    } catch (error) {
      console.error("Error creating business:", error);
      Alert.alert("An error occurred. Please try again or contact support.");
    }

    setIsLoading(false);
  };

  return (
              <LinearGradient
                colors={['#e58d29', 'skyblue']}
                start={[0, 0]}
                end={[1, 1]}
                style={{ flex: 1 }}
              >
                <View style={styles.container}>
                  <ScrollView>
                  
                    <View style={styles.formContainer}>
                      <TextInput
                        placeholder="Business Phone Number"
                        value={businessPhone}
                        onChangeText={setBusinessPhone}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Business Name"
                        value={businessName}
                        onChangeText={setBusinessName}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Registration Number"
                        value={licenseNumber}
                        onChangeText={setLicenseNumber}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Business Contact"
                        value={bizContact}
                        onChangeText={setbizContact}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Business Type"
                        value={businessType}
                        onChangeText={setbusinessType}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Bank Name"
                        value={bankType}
                        onChangeText={setbankType}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Bank Account Number"
                        value={bankAccount}
                        onChangeText={setbankAccount}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Business Description"
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                        multiline={true}  // Enables multi-line input
                textAlignVertical="top"
                      />

                      <View style={styles.passwordContainer}>
                                                                 <TextInput
                                                                   placeholder="Biz Account Password"
                                                               style={styles.passwordInput}
                                                                                                    
                                                               value={password}
                                                               onChangeText={setPassword}
                                                               secureTextEntry={!isPasswordVisible}
                                                               placeholderTextColor="#ccc"
                                                                       />
                                                               <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                              <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                               </TouchableOpacity>
                                                               </View>
                     
                                                               <View style={styles.passwordContainer}>
                                                                 <TextInput
                                                                   placeholder="Confirm Biz Account Password"
                                                               style={styles.passwordInput}
                                                                                                    
                                                               value={confirmPassword}
                                                               onChangeText={setConfirmPassword}
                                                               secureTextEntry={!isPasswordVisible}
                                                               placeholderTextColor="#ccc"
                                                               />
                                                               <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                              <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                               </TouchableOpacity>
                                                              </View>
                      
                      <TouchableOpacity onPress={handleCreateBusiness} style={styles.button}>
                        {isLoading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text style={styles.locationText}>Submit</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </LinearGradient>
            );
          };
          
          const styles = StyleSheet.create({
              gradient: {
                flex: 1,
              },
              container: {
                flex: 1,
                padding: 20,
              },
              loanTitleView: {
                marginBottom: 20,
                alignItems: 'center',
              },
              title: {
                fontSize: 24,
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
              },
              formContainer: {
                backgroundColor: '#ffffff',
                borderRadius: 10,
                padding: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              },
              input: {
                height: 45,
                borderColor: '#ccc',
                borderWidth: 1,
                marginBottom: 15,
                borderRadius: 5,
                paddingLeft: 10,
              },
              button: {
                backgroundColor: '#e58d29',
                paddingVertical: 12,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 20,
              },
              locationContainer: {
                marginVertical: 10,
              },
              locationText: {
                fontSize: 16,
                color: '#333',
              },
              passwordContainer: { flexDirection: 'row', alignItems: 'center', 
                  backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, height:50 },
          passwordInput: { flex: 1, padding: 12 },
            });
        
        export default CreateBiz;