import React, { useState } from 'react';
import { createSMAccount, updateCompany } from '../../../src/graphql/mutations';
import { getCompany, listSMAccounts } from '../../../src/graphql/queries';
import { Auth, graphqlOperation, API, Storage } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { PhoneNumberUtil } from 'google-libphonenumber';

const CreateAcForm = () => {
  const navigation = useNavigation();

  const [nationalId, setNationalid] = useState('');
  const [officialName, setOfficialName] = useState('');
  const [idType, setIdType] = useState<'passport' | 'nationalId'>('nationalId');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');

  // UI preview URIs
  const [photoPassportUri, setPhotoPassportUri] = useState<string | null>(null);
  const [idFrontUri, setIdFrontUri] = useState<string | null>(null);
  const [idBackUri, setIdBackUri] = useState<string | null>(null);

  // Persisted S3 keys
  const [photoPassportKey, setPhotoPassportKey] = useState<string | null>(null);
  const [idFrontKey, setIdFrontKey] = useState<string | null>(null);
  const [idBackKey, setIdBackKey] = useState<string | null>(null);

  /* ================= IMAGE LOGIC ================= */

  const uploadImageToS3 = async (
    uri: string,
    role: 'passport' | 'idFront' | 'idBack',
    origW?: number,
    origH?: number
  ) => {
    try {
      let actions: any[] = [];

      if (role === 'passport' && origW && origH) {
        // Center-square crop only for passport
        const size = Math.min(origW, origH);
        const crop = {
         originX: Math.floor((origW - size) / 2), 
         originY: Math.floor((origH - size) * 0.18), // shift crop window down 
         width: size, height: size,
        };
        actions.push({ crop });
        actions.push({ resize: { width: 900, height: 900 } });
      } else {
        // IDs: just resize/compress, no crop
        actions.push({ resize: { width: 900 } });
      }

      const manipulated = await ImageManipulator.manipulateAsync(
        uri,
        actions,
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      const response = await fetch(manipulated.uri);
      const blob = await response.blob();

      const key = `${role}_${Date.now()}.jpg`;
      await Storage.put(key, blob, { contentType: 'image/jpeg' });

      switch (role) {
        case 'passport':
          setPhotoPassportUri(manipulated.uri);
          setPhotoPassportKey(key);
          break;
        case 'idFront':
          setIdFrontUri(manipulated.uri);
          setIdFrontKey(key);
          break;
        case 'idBack':
          setIdBackUri(manipulated.uri);
          setIdBackKey(key);
          break;
      }
    } catch (err) {
      console.error('uploadImageToS3 error:', err);
      Alert.alert('Image upload failed, please retry');
    }
  };

  const pickImage = async (role: 'passport' | 'idFront' | 'idBack') => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Please allow access to your photos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const asset = result.assets[0];
        await uploadImageToS3(asset.uri, role, asset.width, asset.height);
      }
    } catch (err) {
      console.error('pickImage error:', err);
      Alert.alert('Image selection failed');
    }
  };

  const takeImage = async (role: 'passport' | 'idFront' | 'idBack') => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Please allow access to your camera');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const asset = result.assets[0];
        await uploadImageToS3(asset.uri, role, asset.width, asset.height);
      }
    } catch (err) {
      console.error('takeImage error:', err);
      Alert.alert('Camera capture failed');
    }
  };

  /* ================= BUSINESS LOGIC ================= */

  const ChckUsrExistence = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const userInfo = await Auth.currentAuthenticatedUser();

    const phoneUtil = PhoneNumberUtil.getInstance();
    const number = phoneUtil.parse(userInfo.attributes.phone_number);
    const nationality = phoneUtil.getRegionCodeForNumber(number);

    try {
      const UsrDtls: any = await API.graphql(
        graphqlOperation(listSMAccounts, {
          filter: { and: { nationalid: { eq: nationalId } } },
        })
      );

      const UsrDtlsz: any = await API.graphql(
        graphqlOperation(listSMAccounts, {
          filter: { and: { awsemail: { eq: userInfo.attributes.email } } },
        })
      );

      const compDtls: any = await API.graphql(
        graphqlOperation(getCompany, { AdminId: "BaruchHabaB'ShemAdonai2" })
      );
      const actvSMUsrs = compDtls.data.getCompany.ttlActiveUsers;

      if (pword.length < 8) {
        Alert.alert('Short password; at least 8 mixed characters');
      } else if (UsrDtls.data.listSMAccounts.items.length > 0) {
        Alert.alert('National ID already exists');
      } else if (UsrDtlsz.data.listSMAccounts.items.length > 0) {
        Alert.alert('Email already exists');
      } else {
        await API.graphql(
          graphqlOperation(createSMAccount, {
            input: {
            nationalid: nationalId,
                name: officialName,
                phonecontact: userInfo.attributes.phone_number,
                awsemail: userInfo.attributes.email,
                balance: 0,
                p2pchmBenefits:0,           
                pw: pword,
                nationality: nationality,
                MFKubwaCost: 0,
                MFKubwaNetCost: 0,
                MFNdogoDue: 0,
                MFNdogoNet: 0,
                beneficiary:   userInfo.attributes.email,
                beneficiaryAmt:0,
                loanAcceptanceCode:userInfo.attributes.email,
                beneficiaryType: "Biz",
                benefitsAmount: 0,
                mfchampEarnings:0,
      
                ttlDpstSM: 0,
                TtlWthdrwnSM: 0,
      
                TtlActvLonsTmsLnrCov: 0,
                TtlActvLonsTmsLneeCov: 0,
                TtlActvLonsAmtLnrCov: 0,
                TtlActvLonsAmtLneeCov: 0,
                TtlBLLonsTmsLnrCov: 0,
                TtlBLLonsTmsLneeCov: 0,
                TtlBLLonsAmtLnrCov: 0,
                TtlBLLonsAmtLneeCov: 0,
                TtlClrdLonsTmsLnrCov: 0,
                TtlClrdLonsTmsLneeCov: 0,
                TtlClrdLonsAmtLnrCov: 0,
                TtlClrdLonsAmtLneeCov: 0,
                
                TtlActvLonsTmsLneeChmCov: 0,
                TtlActvLonsAmtLneeChmCov: 0,
                TtlBLLonsTmsLneeChmCov: 0,
                TtlBLLonsAmtLneeChmCov: 0,
                TtlClrdLonsTmsLneeChmCov: 0,
                TtlClrdLonsAmtLneeChmCov: 0,
                   
                TtlActvLonsTmsSllrCov: 0,
                TtlActvLonsTmsByrCov: 0,
                TtlActvLonsAmtSllrCov: 0,
                TtlActvLonsAmtByrCov: 0,
                TtlBLLonsTmsSllrCov: 0,
                TtlBLLonsTmsByrCov: 0,
                TtlBLLonsAmtSllrCov: 0,
                TtlBLLonsAmtByrCov: 0,
                TtlClrdLonsTmsSllrCov: 0,
                TtlClrdLonsTmsByrCov: 0,
                TtlClrdLonsAmtSllrCov: 0,
                TtlClrdLonsAmtByrCov: 0,
                
              
                TtlActvLonsTmsLnrNonCov: 0,
                TtlActvLonsTmsLneeNonCov: 0,
                TtlActvLonsAmtLnrNonCov: 0,
                TtlActvLonsAmtLneeNonCov: 0,
                TtlBLLonsTmsLnrNonCov: 0,
                TtlBLLonsTmsLneeNonCov: 0,
                TtlBLLonsAmtLnrNonCov: 0,
                TtlBLLonsAmtLneeNonCov: 0,
                TtlClrdLonsTmsLnrNonCov: 0,
                TtlClrdLonsTmsLneeNonCov: 0,
                TtlClrdLonsAmtLnrNonCov: 0,
                TtlClrdLonsAmtLneeNonCov: 0,
                
                TtlActvLonsTmsLneeChmNonCov: 0,
                TtlActvLonsAmtLneeChmNonCov: 0,
                TtlBLLonsTmsLneeChmNonCov: 0,
                TtlBLLonsAmtLneeChmNonCov: 0,
                TtlClrdLonsTmsLneeChmNonCov: 0,
                TtlClrdLonsAmtLneeChmNonCov: 0,
                
                TtlActvLonsTmsSllrNonCov: 0,
                TtlActvLonsTmsByrNonCov: 0,
                TtlActvLonsAmtSllrNonCov: 0,
                TtlActvLonsAmtByrNonCov: 0,
                TtlBLLonsTmsSllrNonCov: 0,
                TtlBLLonsTmsByrNonCov: 0,
                TtlBLLonsAmtSllrNonCov: 0,
                TtlBLLonsAmtByrNonCov: 0,
                TtlClrdLonsTmsSllrNonCov: 0,
                TtlClrdLonsTmsByrNonCov: 0,
                TtlClrdLonsAmtSllrNonCov: 0,
                TtlClrdLonsAmtByrNonCov: 0,

                TtlActvLonsTmsLnrCredSlsP2P: 0,
                TtlActvLonsAmtLnrCredSlsP2P: 0,
                TtlBLLonsTmsLnrCredSlsP2P: 0,
                TtlBLLonsAmtLnrCredSlsP2P: 0,
                TtlClrdLonsTmsLnrCredSlsP2P: 0,
                TtlClrdLonsAmtLnrCredSlsP2P: 0,
              
                TtlActvLonsTmsLnrCredSlsP2B: 0,
                TtlActvLonsAmtLnrCredSlsP2B: 0,
                TtlBLLonsTmsLnrCredSlsP2B: 0,
                TtlBLLonsAmtLnrCredSlsP2B: 0,
                TtlClrdLonsTmsLnrCredSlsP2B: 0,
                TtlClrdLonsAmtLnrCredSlsP2B: 0,
              
                TtlActvLonsTmsLneeB2P: 0,
                TtlActvLonsAmtLneeB2P: 0,
                TtlBLLonsTmsLneeB2P: 0,
                TtlBLLonsAmtLneeB2P: 0,
                TtlClrdLonsLneeB2P: 0,
                TtlClrdLonsAmtLneeB2P: 0,
              
                TtlActvLonsTmsLneeP2P: 0,
                TtlActvLonsAmtLneeP2P: 0,
                TtlBLLonsTmsLneeP2P: 0,
                TtlBLLonsAmtLneeP2P: 0,
                TtlClrdLonsLneeP2P: 0,
                TtlClrdLonsAmtLneeP2P: 0,
              
                TtlActvLonsTmsLnrP2P: 0,
                TtlActvLonsAmtLnrP2P: 0,
                TtlBLLonsTmsLnrP2P: 0,
                TtlBLLonsAmtLnrP2P: 0,
                TtlClrdLonsLnrP2P: 0,
                TtlClrdLonsAmtLnrP2P: 0,
      
                ttlNonLonsRecSM: 0,
                ttlNonLonsSentSM:0,
                ttlNonLonsRecChm: 0,
                ttlNonLonsSentChm:0,
              
                MaxTymsBL: 0,
                MaxTymsIHvBL: 0,

                TymsIHvGivnLn: 0,
                TymsMyLnClrd: 0,
                

                DefaultPenaltySM:0,

                MaxAcBal:10000000,

                acStatus: 'AccountActive',
                deActvtnReason:"None",
                blStatus: 'AccountNotBL',
                loanStatus: "NoLoan",
                loanLimit: 10000000,
                nonLonLimit:100000,
                withdrawalLimit: 3000000,
                depositLimit: 500000,
                owner:userInfo.attributes.sub,
              photoPassport: photoPassportKey || 'None',
              idFront: idFrontKey || 'None',
              idBack: idBackKey || 'None',
            },
          })
        );

        await API.graphql(
          graphqlOperation(updateCompany, {
            input: {
              AdminId: "BaruchHabaB'ShemAdonai2",
              ttlActiveUsers: parseFloat(actvSMUsrs) + 1,
            },
          })
        );

        Alert.alert('Account successfully created');

        setNationalid('');
        setPW('');
        setOfficialName('');
        setPhotoPassportUri(null);
        setIdFrontUri(null);
        setIdBackUri(null);
        setPhotoPassportKey(null);
        setIdFrontKey(null);
        setIdBackKey(null);
      }
    } catch (err) {
      console.log('ChckUsrExistence error:', err);
      Alert.alert('Retry or update app or call customer care');
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= UI ================= */



  return (
    <LinearGradient colors={['#e58d29', 'skyblue']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Official Names (as on ID/Passport)"
              value={officialName}
              onChangeText={setOfficialName}
              style={styles.input}
            />

            <TextInput
              placeholder="National ID Number"
              value={nationalId}
              onChangeText={setNationalid}
              style={styles.input}
            />

            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, idType === 'nationalId' && styles.toggleActive]}
                onPress={() => setIdType('nationalId')}
              >
                <Text style={{ color: idType === 'nationalId' ? '#fff' : '#333' }}>
                  National ID
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, idType === 'passport' && styles.toggleActive]}
                onPress={() => setIdType('passport')}
              >
                <Text style={{ color: idType === 'passport' ? '#fff' : '#333' }}>
                  Passport
                </Text>
              </TouchableOpacity>
            </View>

            {idType === 'passport' ? (
              <View style={styles.imageSection}>
                <TouchableOpacity onPress={() => pickImage('passport')} style={styles.button3}>
                  <Text style={styles.buttonText}>Upload Personal Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => takeImage('passport')} style={styles.button3}>
                  <Text style={styles.buttonText}>Take Personal Photo</Text>
                </TouchableOpacity>
                {photoPassportUri && (
                  <View style={styles.passportWrapper}>
                    <Image source={{ uri: photoPassportUri }} style={styles.passportImage} />
                  </View>
                )}
              </View>
            ) : (
              <>
                <View style={styles.imageSection}>
                  <TouchableOpacity onPress={() => pickImage('idFront')} style={styles.button2}>
                    <Text style={styles.buttonText}>Upload ID Copy (Front)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => takeImage('idFront')} style={styles.button2}>
                    <Text style={styles.buttonText}>Take ID Copy (Front)</Text>
                  </TouchableOpacity>
                  {idFrontUri && (
                    <Image source={{ uri: idFrontUri }} style={styles.previewImage} />
                  )}
                </View>

                <View style={styles.imageSection}>
                  <TouchableOpacity onPress={() => pickImage('idBack')} style={styles.button2}>
                    <Text style={styles.buttonText}>Upload ID Copy (Back)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => takeImage('idBack')} style={styles.button2}>
                    <Text style={styles.buttonText}>Take ID Copy (Back)</Text>
                  </TouchableOpacity>
                  {idBackUri && (
                    <Image source={{ uri: idBackUri }} style={styles.previewImage} />
                  )}
                </View>
              </>
            )}

            {/* password + submit unchanged */}
            {/* Password input with visibility toggle */}
<View style={styles.passwordContainer}>
  <TextInput
    placeholder="Main Account Password"
    style={styles.passwordInput}
    value={pword}
    onChangeText={setPW}
    secureTextEntry={!isPasswordVisible}
  />
  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
    <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} />
  </TouchableOpacity>
</View>

{/* Submit button */}
<TouchableOpacity onPress={ChckUsrExistence} style={styles.button}>
  {isLoading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.buttonText}>Submit</Text>
  )}
</TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default CreateAcForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
  },
  toggleButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  toggleActive: {
    backgroundColor: '#e58d29',
    borderColor: '#e58d29',
  },
  imageSection: {
    marginVertical: 18,
    alignItems: 'center',
  },
  // Passport avatar wrapper (circular)
  passportWrapper: {
  width: 360,
  height: 360,
  borderRadius: 180,
  borderWidth: 3,
  borderColor: '#e58d29',
  alignSelf: 'center',
  marginTop: 16,
  overflow: 'hidden',
  backgroundColor: '#fff',
},

  

  passportImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // ID previews (rectangular)
 previewImage: {
  width: '100%',
  height: 380,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: '#ddd',
  resizeMode: 'cover',
  marginTop: 16,
  backgroundColor: '#f5f5f5',
},

 
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#e58d29',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  button2: {
    backgroundColor: '#e58d29',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    width: '75%',
  },
  button3: {
    backgroundColor: '#e58d29',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    width: '75%',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  passwordContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#ddd',
  borderWidth: 1,
  borderRadius: 10,
  marginBottom: 16,
  height: 52,
  paddingHorizontal: 12,
  backgroundColor: '#fafafa',
},


});
