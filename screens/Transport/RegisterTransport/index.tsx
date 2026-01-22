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

import { createSokoAd, createTransportRegister } from '../../../src/graphql/mutations';
import { getSMAccount, getBizna, listPersonels } from '../../../src/graphql/queries';
import { Route, useRoute } from '@react-navigation/native';


const MAX_IMAGE_SIZE_MB = 5;

const CreateBiz = () => {
  const [formData, setFormData] = useState({
    itemName: '', itemTown: '', itemDesc: '',
    itemPrice: '', brandName: '', businessType: '',
    itemUnit: '', unitQuantity: '', bizPassword: '', ItemCode: '',
    ImageUrl: '', numberPlate: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [itemPhotoKey, setItemPhotoKey] = useState<string | null>(null);
  const [itemPhotoUri, setItemPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  const route = useRoute();

  const updateForm = (key: string, value: string) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
      const fetchLocation = async () => {
        try {
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
        } catch (error) {
          console.warn("Error fetching location:", error);
        }
      };
  
      fetchLocation();
    }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // ⛔ turn off editing for now
    aspect: [4, 3],
    quality: 1,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
    const uri = result.assets[0].uri;
    console.log('Picked image URI:', uri);
    handleImage(uri); // ✅ now valid image
  } else {
    console.log('Image selection canceled or failed.');
  }
};

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
     
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // ⛔ turn off editing for now
    aspect: [4, 3],
    quality: 1,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
    const uri = result.assets[0].uri;
    console.log('Picked image URI:', uri);
    handleImage(uri); // ✅ now valid image
  } else {
    console.log('Image selection canceled or failed.');
  }
};
 
  const handleImage = async (uri: string) => {

     console.log('Original image URI:', uri);
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      

      const response = await fetch(manipResult.uri);
      const blob = await response.blob();

      const imageSizeMB = blob.size / (1024 * 1024);
      if (imageSizeMB > MAX_IMAGE_SIZE_MB) {
        Alert.alert('Image too large', `Image is ${imageSizeMB.toFixed(2)}MB. Max allowed is ${MAX_IMAGE_SIZE_MB}MB.`);
        return;
      }

      const filename = `${Date.now()}_item.jpg`;
      await Storage.put(filename, blob, { contentType: 'image/jpeg' });

      setItemPhotoKey(filename);
      setItemPhotoUri(manipResult.uri);
      Alert.alert('Success', 'Image uploaded successfully.');
    } catch (err) {
      console.error('Image upload failed:', err);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  const clearForm = () => {
    setFormData({
      itemName: '', itemTown: '', itemDesc: '',
      itemPrice: '', brandName: '', businessType: '',
      itemUnit: '', unitQuantity: '', bizPassword: '', ItemCode: '',
      ImageUrl: '', numberPlate: ''
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
      ImageUrl, numberPlate
    } = formData;

    try {
      const user = await Auth.currentAuthenticatedUser();
      const userEmail = user.attributes.email;

      const accRes = await API.graphql(graphqlOperation(getSMAccount, { awsemail: userEmail }));
      const account = accRes?.data?.getSMAccount;

      if (!account || bizPassword !== account.pw) {
        Alert.alert('Error', 'Incorrect user password.');
        return;
      }

       const coords = location || { latitude: 0, longitude: 0 };

      
      const adInput = {
  transportkntct: account.phonecontact,  
  transportRate: itemPrice,
  transportdesc: itemDesc,
  transportPhoto: itemPhotoKey, 
  owner: account.owner,
  
  latitude: coords.latitude,
  longitude: coords.longitude,
  sellerLatitude: 0,
  sellerLongitude:0,
  
  distance: 0,

  transportName: itemName,
  transportType: brandName,
  dutyStatus: "TransportOnduty", 
  engagementStatus:"TransportNotEngaged", 
  transportRequest: "transportRequestNo",
  transportOwnerEmail: account.awsemail,
  Earnings: 0,
  UsrAcCommitment: 0,
  ChmAcCommitment: 0,
  chmAcNumber: "String",
  chmAcCommitmentStatus: "TransportChmCommitmentNo",
  deliveryLatitude: 0,
  deliveryLongitude: 0,
  buyerName:"None",
  buyerContact: "None",
  deliveryID: "None",
  deliveryCost: 0,
  customerEmail: "None",
  deliveryDesc: "None",
  bizAc:"None",
  bizType: "None",
  purchasePhoto: "None",
  deliveryStart: 0,
  itemID: "None",
  sellerContact:"None",
  sellerName: "None",
  numberPlate: numberPlate,
  ImageUrl: ImageUrl
  
      };

      await API.graphql(graphqlOperation(createTransportRegister, { input: adInput }));
      Alert.alert('Success', 'Transport successfully registered.');
      clearForm();
    } catch (err) {
      console.error('Transport registration failed:', err);
      Alert.alert('Error', 'Failed to register transport. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#e58d29', '#2c5364']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Register Transport</Text>
  <InputField label="Transport Business Name" value={formData.itemName} onChange={v => updateForm('itemName', v)} />
        <InputField label="Means of Transport e.g. motorbike, pickup, freight services, tuktuk" value={formData.brandName} onChange={v => updateForm('brandName', v)} />
        <InputField label="Cost per kilometer in Kenya Shillings" value={formData.itemPrice} onChange={v => updateForm('itemPrice', v)} keyboardType="numeric" />
        <InputField label="More Transport Description" value={formData.itemDesc} onChange={v => updateForm('itemDesc', v)} multiline height={100} />
        <InputField label="Transport Number Plate" value={formData.numberPlate} onChange={v => updateForm('numberPlate', v)} />
        <InputField label="Image URL (Optional)" value={formData.ImageUrl} onChange={v => updateForm('ImageUrl', v)} />
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={pickImage} style={[styles.button, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.buttonText}>Attach Transport Means Photo from Gallery</Text>
          </TouchableOpacity>
         
        </View>

        {itemPhotoUri && <Image source={{ uri: itemPhotoUri }} style={styles.imagePreview} />}

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
