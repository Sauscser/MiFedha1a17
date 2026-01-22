import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  Alert, ActivityIndicator, StyleSheet, Image, Animated, Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import { createAveragePrices, createSokoAd } from '../../../src/graphql/mutations';
import { getSMAccount, getBizna, listPersonels, listAveragePrices } from '../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';

const MAX_IMAGE_SIZE_MB = 5;

const formatAndValidateUrl = (url) => {
  if (!url) return ''; // allow empty

  let formatted = url.trim();
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = 'https://' + formatted;
  }

  try {
    const parsed = new URL(formatted);

    // Must have a dot in hostname and not be localhost
    const hostname = parsed.hostname;
    const hasDot = hostname.includes('.');
    const notLocalhost = hostname.toLowerCase() !== 'localhost';

    if (!hasDot || !notLocalhost) return null;

    return formatted;
  } catch {
    return null;
  }
};


const CreateBiz = () => {
  const [formData, setFormData] = useState({
    itemName: '', itemTown: '', itemDesc: '',
    itemPrice: '', brandName: '', businessType: '',
    itemUnit: '', unitQuantity: '', bizPassword: '', ItemCode: '',
    itemSpecifications: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [itemPhotoKey, setItemPhotoKey] = useState(null);
  const [itemPhotoUri, setItemPhotoUri] = useState(null);
  const route = useRoute();

  // For pulsing animation
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [isUrlValid, setIsUrlValid] = useState(false);

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));

    if (key === 'itemTown') {
      const check = formatAndValidateUrl(value);
      setIsUrlValid(check !== null);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

// inside CreateBiz component


useEffect(() => {
  let animation:any;

  if (isUrlValid) {
    animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ])
    );
    animation.start();
  } else {
    pulseAnim.setValue(1); // reset size
    if (animation) {
      animation.stop();
    }
  }

  return () => {
    if (animation) {
      animation.stop();
    }
  };
}, [isUrlValid]);


const handleUrlChange = (v) => {
  updateForm('itemTown', v);
  const validUrl = formatAndValidateUrl(v);
  setIsUrlValid(validUrl !== null && validUrl !== '');
};


  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required.');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      handleImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      handleImage(result.assets[0].uri);
    }
  };

  const handleImage = async (uri) => {
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
      itemSpecifications: '',
    });
    setItemPhotoKey(null);
    setItemPhotoUri(null);
    setIsUrlValid(false);
  };

  const handleAdCreation = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const {
      itemName, itemTown, itemDesc, itemPrice,
      brandName, itemUnit, unitQuantity, bizPassword, ItemCode,
      itemSpecifications,
    } = formData;

    // Validate URL
    const formattedUrl = formatAndValidateUrl(itemTown);
    if (formattedUrl === null) {
      Alert.alert('Invalid URL', 'Please enter a valid link (http:// or https://)');
      setIsLoading(false);
      return;
    }

    try {
      const user = await Auth.currentAuthenticatedUser();
      const userEmail = user.attributes.email;

      const accRes = await API.graphql(graphqlOperation(getSMAccount, { awsemail: userEmail }));
      const account = accRes?.data?.getSMAccount;

      if (!account || bizPassword !== account.pw) {
        Alert.alert('Error', 'Incorrect user password.');
        return;
      }

      const bizRes = await API.graphql(graphqlOperation(getBizna, { BusKntct: route.params.BusinessRegNo }));
      const business = bizRes?.data?.getBizna;

      if (!business) {
        Alert.alert('Error', 'Business not found.');
        return;
      }

      const personnelRes = await API.graphql(graphqlOperation(listPersonels, {
        filter: {
          phoneKontact: { eq: userEmail },
          BusinessRegNo: { eq: route.params.BusinessRegNo }
        }
      }));
      const isStaff = personnelRes?.data?.listPersonels?.items?.length > 0;

      if (!isStaff) {
        Alert.alert('Access Denied', 'You are not listed as staff of this business.');
        return;
      }

      const adInput = {
        sokokntct: route.params.BusinessRegNo,
        sokotown: formattedUrl,
        sokolnprcntg: 1,
        sokolpymntperiod: 1,
        sokodesc: itemDesc,
        sokoname: itemName || '',
        itemSpecifications: itemSpecifications || '',
        itemCodeBar: ItemCode,
        itemPhoto: itemPhotoKey,
        sokoprice: parseFloat(itemPrice),
        latitude: business.latitude,
        longitude: business.longitude,
        itemBrand: brandName || '',
        bizContact: business.bizContact,
        bizName: business.busName,
        businessType: business.businessType,
        itemUnit: itemUnit,
        unitQuantity: parseFloat(unitQuantity),
        owner: user.attributes.sub,
      };

    const addItem =  await API.graphql(graphqlOperation(createSokoAd, { input: adInput }));

      const itemExistence = await API.graphql(graphqlOperation(listAveragePrices, {
        filter: {
          itemName: { eq: itemName },
          itemBrand: { eq: brandName },
          itemSpecs: { eq: itemSpecifications }
        }
      }));

      if (itemExistence?.data?.listAveragePrices?.items?.length === 0) {

    await API.graphql(graphqlOperation(createAveragePrices, 
        { input: 
        {itemName: itemName,
        itemBrand: brandName,
        itemSpecs: itemSpecifications,
        itemPrice: parseFloat(itemPrice).toFixed(2), 
      }
        }));

      }

if (addItem?.data?.createAveragePrices){
      Alert.alert('Success', 'Item successfully advertised.');
      clearForm();}
    } catch (err) {
      console.error('Ad creation failed:', err);
      Alert.alert('Error', 'Failed to create ad. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#e58d29', '#2c5364']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Advertise New Item</Text>

        <InputField label="Item Name" value={formData.itemName} onChange={v => updateForm('itemName', v)} />
        <InputField label="Brand/Model/Type (Optional)" value={formData.brandName} onChange={v => updateForm('brandName', v)} />
        <InputField label="Item Price (Ksh)" value={formData.itemPrice} onChange={v => updateForm('itemPrice', v)} keyboardType="numeric" />
        <InputField label="Unit of Measure (Optional)" value={formData.itemUnit} onChange={v => updateForm('itemUnit', v)} />
        <InputField label="Quantity per Unit (Optional)" value={formData.unitQuantity} onChange={v => updateForm('unitQuantity', v)} keyboardType="numeric" />
        <InputField label="Serial Number (Optional)" value={formData.ItemCode} onChange={v => updateForm('ItemCode', v)} />
        <InputField label="Item Specifications (Optional)" value={formData.itemSpecifications} onChange={v => updateForm('itemSpecifications', v)} multiline height={80} />
        {/* URL with pulsing valid icon */}
        <View style={styles.inputContainer}>
  <Text style={styles.label}>Ad Video URL (Optional)</Text>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TextInput
      style={[styles.input, { flex: 1 }]}
      value={formData.itemTown}
      onChangeText={handleUrlChange}
      placeholder="e.g. youtube.com/watch?v=abc123"
    />
    {isUrlValid && (
      <Animated.View style={{ transform: [{ scale: pulseAnim }], marginLeft: 8 }}>
        <Ionicons name="checkmark-circle" size={24} color="limegreen" />
      </Animated.View>
    )}
  </View>
</View>


        <InputField label="Item Description" value={formData.itemDesc} onChange={v => updateForm('itemDesc', v)} multiline height={100} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={pickImage} style={[styles.button, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.buttonText}>Attach Photo from Gallery</Text>
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
