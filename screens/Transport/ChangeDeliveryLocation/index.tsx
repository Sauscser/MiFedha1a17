import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  Alert, ActivityIndicator, StyleSheet, Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';

import { createSokoAd, createTransportRegister, updateTransportOrder, updateTransportRegister } from '../../../src/graphql/mutations';
import { getSMAccount, getBizna, listPersonels, getTransportOrder } from '../../../src/graphql/queries';
import { Route, useRoute } from '@react-navigation/native';


const MAX_IMAGE_SIZE_MB = 5;

const CreateBiz = () => {
  const [formData, setFormData] = useState({
    itemName: '', itemTown: '', itemDesc: '',
    itemPrice: '', brandName: '', businessType: '',
    itemUnit: '', unitQuantity: '', bizPassword: '', ItemCode: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [itemPhotoKey, setItemPhotoKey] = useState<string | null>(null);
  const [itemPhotoUri, setItemPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  const route = useRoute();

  const updateForm = (key: string, value: string) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  

  
  const clearForm = () => {
    setFormData({
      itemName: '', itemTown: '', itemDesc: '',
      itemPrice: '', brandName: '', businessType: '',
      itemUnit: '', unitQuantity: '', bizPassword: '', ItemCode: '',
    });
    setItemPhotoKey(null);
    setItemPhotoUri(null);
  };

  const handleAdCreation = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const {
      itemName, itemTown, itemDesc, itemPrice,
      brandName, itemUnit, unitQuantity, bizPassword, ItemCode,
    } = formData;

    try {
      const userEmail = await Auth.currentAuthenticatedUser();

      const accRes = await API.graphql(graphqlOperation(getSMAccount, { awsemail: userEmail.attributes.email }));
      const account = accRes?.data?.getSMAccount;

      const orderDtl = await API.graphql(graphqlOperation(getTransportOrder, { id: route.params.id}));
                   const orderDtlz = orderDtl.data.getTransportOrder;
         

      if (orderDtlz.engagementStatus === "TransportEngaged") {
        Alert.alert('Sorry', 'Delivery order is already engaged.');
        return;
      }

      if (!account || bizPassword !== account.pw) {
        Alert.alert('Error', 'Incorrect user password.');
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Permission to access location was denied.");
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

    const deliveryLocation =  await API.graphql(
                                 graphqlOperation(updateTransportOrder, {
                                 input: {
                                   id: route.params.id,
                                   deliveryLatitude: itemName,
                                   deliveryLongitude: brandName
                                   
                                 }}))

                                 if(deliveryLocation?.data?.updateTransportOrder)
                                 {
                                  Alert.alert("Update of delivery Location was successful")
                                 }

      clearForm();
    } catch (err) {
      console.error('Transport update failed:', err);
      Alert.alert('Error', 'Failed to update delivery location. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#e58d29', '#2c5364']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Register Transport</Text>
  <InputField label="Enter the latitude values" value={formData.itemName} onChange={v => updateForm('itemName', v)} />
        <InputField label="Enter longitude values" value={formData.brandName} onChange={v => updateForm('brandName', v)} />
      
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="User Main Account Password"
            style={styles.passwordInput}
            value={formData.bizPassword}
            onChangeText={v => updateForm('bizPassword', v)}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#ccc"
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAdCreation}>
          <Text style={styles.buttonText}>Click to Add</Text>
          {isLoading && <ActivityIndicator color="#fff" style={{ marginTop: 10 }} />}
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const InputField = ({ label, value, onChange, ...props }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, props.multiline && { height: props.height || 100 }]}
      value={value}
      onChangeText={onChange}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 22, color: '#fff', fontWeight: 'bold',
    marginBottom: 20, textAlign: 'center',
  },
  inputContainer: { marginBottom: 15 },
  label: { color: '#ccc', marginBottom: 5, fontSize: 14 },
  input: {
    backgroundColor: '#fff', borderRadius: 8,
    padding: 12, fontSize: 16, color: '#333',
  },
  button: {
    marginTop: 20, backgroundColor: '#f5a623',
    paddingVertical: 15, borderRadius: 10, alignItems: 'center',
    padding:10
  },
  buttonText: { color: '#1b1b1b', fontWeight: 'bold', fontSize: 16 },
  imagePreview: {
    width: '100%', height: 200, marginTop: 10,
    borderRadius: 10, resizeMode: 'cover',
  },
  passwordContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 8,
    marginTop: 20, marginBottom: 10, height: 50, paddingHorizontal: 10,
  },
  passwordInput: { flex: 1, padding: 12 },
});

export default CreateBiz;
