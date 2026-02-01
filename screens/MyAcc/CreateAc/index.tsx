import React, { useState } from 'react';
import { createSMAccount, updateCompany } from '../../../src/graphql/mutations';
import { getCompany, listSMAccounts } from '../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes, updateUserAttribute } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { uploadData } from '@aws-amplify/storage';
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
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { PhoneNumberUtil } from 'google-libphonenumber';

const client = generateClient();

const CreateAcForm = () => {
  const navigation = useNavigation();

  const countryNamesByCode: Record<string, string> = {
  AF: "Afghanistan", AL: "Albania", DZ: "Algeria", AS: "American Samoa", AD: "Andorra", AO: "Angola", AI: "Anguilla", 
  AG: "Antigua and Barbuda", AR: "Argentina", AM: "Armenia", AW: "Aruba", AU: "Australia", AT: "Austria", AZ: "Azerbaijan",
  BS: "Bahamas", BH: "Bahrain", BD: "Bangladesh", BB: "Barbados", BY: "Belarus", BE: "Belgium", BZ: "Belize",
  BJ: "Benin", BM: "Bermuda", BT: "Bhutan", BO: "Bolivia", BA: "Bosnia and Herzegovina", BW: "Botswana", BR: "Brazil",
  BN: "Brunei", BG: "Bulgaria", BF: "Burkina Faso", BI: "Burundi", KH: "Cambodia", CM: "Cameroon", CA: "Canada", CV: "Cabo Verde",
  KY: "Cayman Islands", CF: "Central African Republic", TD: "Chad", CL: "Chile", CN: "China", CO: "Colombia",
  CR: "Costa Rica", HR: "Croatia", CU: "Cuba", CY: "Cyprus", CZ: "Czech Republic", DK: "Denmark", DJ: "Djibouti",
  DO: "Dominican Republic", EC: "Ecuador", EG: "Egypt", SV: "El Salvador", GQ: "Equatorial Guinea", ER: "Eritrea",
  EE: "Estonia", ET: "Ethiopia", FJ: "Fiji", FI: "Finland", FR: "France", GA: "Gabon", GM: "Gambia", GE: "Georgia",
  DE: "Germany", GH: "Ghana", GR: "Greece", GT: "Guatemala", HN: "Honduras", HK: "Hong Kong", HU: "Hungary",
  IS: "Iceland", IN: "India", ID: "Indonesia", IR: "Iran", IQ: "Iraq", IE: "Ireland", IL: "Israel", IT: "Italy",
  JM: "Jamaica", JP: "Japan", JO: "Jordan", KZ: "Kazakhstan", KE: "Kenya", KI: "Kiribati", KP: "North Korea",
  KR: "South Korea", KW: "Kuwait", KG: "Kyrgyzstan", LA: "Laos", LV: "Latvia", LB: "Lebanon", LS: "Lesotho",
  LR: "Liberia", LY: "Libya", LI: "Liechtenstein", LT: "Lithuania", LU: "Luxembourg", MO: "Macao", MW: "Malawi",
  MY: "Malaysia", MV: "Maldives", ML: "Mali", MT: "Malta", MH: "Marshall Islands", MQ: "Martinique", MR: "Mauritania",
  MU: "Mauritius", MX: "Mexico", FM: "Micronesia", MD: "Moldova", MC: "Monaco", MN: "Mongolia", ME: "Montenegro",
  MA: "Morocco", MZ: "Mozambique", MM: "Myanmar", NA: "Namibia", NR: "Nauru", NP: "Nepal", NL: "Netherlands",
  NZ: "New Zealand", NI: "Nicaragua", NE: "Niger", NG: "Nigeria", NO: "Norway", OM: "Oman", PK: "Pakistan", PA: "Panama",
  PG: "Papua New Guinea", PY: "Paraguay", PE: "Peru", PH: "Philippines", PL: "Poland", PT: "Portugal", QA: "Qatar",
  RO: "Romania", RU: "Russia", RW: "Rwanda", SA: "Saudi Arabia", SN: "Senegal", RS: "Serbia", SG: "Singapore",
  SK: "Slovakia", SI: "Slovenia", ES: "Spain", LK: "Sri Lanka", SD: "Sudan", SR: "Suriname", SZ: "Swaziland",
  SE: "Sweden", CH: "Switzerland", SY: "Syria", TW: "Taiwan", TJ: "Tajikistan", TZ: "Tanzania", TH: "Thailand",
  TL: "Timor-Leste", TG: "Togo", TO: "Tonga", TT: "Trinidad and Tobago", TN: "Tunisia", TR: "Turkey", TM: "Turkmenistan",
  UG: "Uganda", UA: "Ukraine", AE: "United Arab Emirates", GB: "United Kingdom", US: "United States", UY: "Uruguay",
  UZ: "Uzbekistan", VU: "Vanuatu", VE: "Venezuela", VN: "Vietnam", YE: "Yemen", ZA: "SOuth Africa",ZM: "Zambia", ZW: "Zimbabwe",
};

const officialDocumentByCountry: Record<string, string> = {
  AF: "National ID Card",       // Afghanistan
  AL: "National ID Card",       // Albania (supported national ID) :contentReference[oaicite:1]{index=1}
  DZ: "National ID Card",       // Algeria :contentReference[oaicite:2]{index=2}
  AS: "Passport Number",        // American Samoa (no formal national ID) :contentReference[oaicite:3]{index=3}
  AD: "Passport Number",        // Andorra
  AO: "National ID Card",       // Angola
  AI: "Passport Number",
  AG: "National ID Card",
  AR: "Documento Nacional de Identidad (DNI)", // Argentina :contentReference[oaicite:4]{index=4}
  AM: "National ID Card",
  AW: "Passport Number",
  AU: "Passport Number",        // Australia – no national ID card :contentReference[oaicite:5]{index=5}
  AT: "National ID Card",       // Austria :contentReference[oaicite:6]{index=6}
  AZ: "Passport Number",
  BS: "Passport Number",
  BH: "National ID Card",
  BD: "National ID Card",       // Bangladesh
  BB: "Passport Number",
  BY: "National ID Card",
  BE: "National ID Card",       // Belgium :contentReference[oaicite:7]{index=7}
  BZ: "Passport Number",
  BJ: "National ID Card",
  BM: "Passport Number",
  BT: "Passport Number",
  BO: "National ID Card",
  BA: "National ID Card",
  BW: "National ID Card",
  BR: "Registro Geral ID (RG)", // Brazil official citizen ID :contentReference[oaicite:8]{index=8}
  BN: "Passport Number",
  BG: "National ID Card",
  BF: "National ID Card",
  BI: "National ID Card",
  KH: "National ID Card",       // Cambodia’s National ID :contentReference[oaicite:9]{index=9}
  CM: "National ID Card",
  CA: "Social Insurance Number (SIN)", // Canada :contentReference[oaicite:10]{index=10}
  CV: "National ID Card",
  KY: "Passport Number",
  CF: "National ID Card",
  TD: "National ID Card",
  CL: "RUN / National ID",      // Chile’s national registry number :contentReference[oaicite:11]{index=11}
  CN: "Resident Identity Card", // China official ID :contentReference[oaicite:12]{index=12}
  CO: "Cédula de Ciudadanía",    // Colombia :contentReference[oaicite:13]{index=13}
  CR: "Cédula de Identidad",     // Costa Rica :contentReference[oaicite:14]{index=14}
  HR: "National ID Card",        // Croatia :contentReference[oaicite:15]{index=15}
  CU: "Número de Identidad",     // Cuba :contentReference[oaicite:16]{index=16}
  CY: "National ID Card",        // Cyprus :contentReference[oaicite:17]{index=17}
  CZ: "National ID Card",        // Czech Republic :contentReference[oaicite:18]{index=18}
  DK: "CPR Number",              // Denmark ID :contentReference[oaicite:19]{index=19}
  DJ: "Passport Number",
  DO: "Cédula de Identidad",     // Dominican Republic :contentReference[oaicite:20]{index=20}
  EC: "Cédula de Identidad",     // Ecuador :contentReference[oaicite:21]{index=21}
  EG: "Personal Verification Card", // Egypt :contentReference[oaicite:22]{index=22}
  SV: "National ID Card",        // El Salvador
  GQ: "National ID Card",
  ER: "National ID Card",
  EE: "Estonian Identity Card",  // Estonia :contentReference[oaicite:23]{index=23}
  ET: "National ID Card",        // Ethiopia
  FJ: "Passport Number",
  FI: "Personal Identity Code",  // Finland identity code :contentReference[oaicite:24]{index=24}
  FR: "National Identity Card",  // France :contentReference[oaicite:25]{index=25}
  GA: "Passport Number",
  GM: "Passport Number",
  GE: "National ID Card",
  DE: "Personalausweis",         // Germany :contentReference[oaicite:26]{index=26}
  GH: "National ID Card",        // Ghana
  GR: "National ID Card",        // Greece :contentReference[oaicite:27]{index=27}
  GT: "Passport Number",
  HN: "Tarjeta de Identidad",    // Honduras :contentReference[oaicite:28]{index=28}
  HK: "Hong Kong Identity Card (HKID)", // Hong Kong :contentReference[oaicite:29]{index=29}
  HU: "Personal ID Number",      // Hungary :contentReference[oaicite:30]{index=30}
  IS: "Kennitala (ID Number)",    // Iceland :contentReference[oaicite:31]{index=31}
  IN: "Aadhaar Number",          // India national ID :contentReference[oaicite:32]{index=32}
  ID: "KTP/NIK",                 // Indonesia :contentReference[oaicite:33]{index=33}
  IR: "Code Melli",              // Iran national ID :contentReference[oaicite:34]{index=34}
  IQ: "Civil ID",                // Iraq national ID :contentReference[oaicite:35]{index=35}
  IE: "Passport Number",         // Ireland uses passport/other IDs :contentReference[oaicite:36]{index=36}
  IL: "Mispar Zehut",            // Israel national ID :contentReference[oaicite:37]{index=37}
  IT: "Codice Fiscale",          // Italy national ID :contentReference[oaicite:38]{index=38}
  JM: "Passport Number",
  JP: "My Number",               // Japan national ID :contentReference[oaicite:39]{index=39}
  JO: "Civil ID",                // Jordan national ID :contentReference[oaicite:40]{index=40}
  KZ: "National ID Card",
  KE: "National ID Number",      // Kenya national ID :contentReference[oaicite:41]{index=41}
  KI: "Passport Number",
  KP: "Passport Number",
  KR: "Passport Number",
  KW: "Civil ID Card",           // Kuwait :contentReference[oaicite:42]{index=42}
  KG: "Passport Number",
  LA: "Passport Number",
  LV: "National ID Card",        // Latvia :contentReference[oaicite:43]{index=43}
  LB: "Passport Number",
  LS: "Passport Number",
  LR: "National ID Card",
  LY: "Passport Number",
  LI: "Passport Number",
  LT: "National ID Card",        // Lithuania :contentReference[oaicite:44]{index=44}
  LU: "National ID Card",        // Luxembourg :contentReference[oaicite:45]{index=45}
  MO: "Passport Number",
  MW: "National ID Card",
  MY: "MyKad (NRIC)",            // Malaysia national ID :contentReference[oaicite:46]{index=46}
  MV: "Passport Number",
  ML: "National ID Card",
  MT: "Passport Number",
  MH: "Passport Number",
  MQ: "Passport Number",
  MR: "Passport Number",
  MU: "Passport Number",
  
  MX: "CURP",                   // Mexico national ID :contentReference[oaicite:47]{index=47}
  FM: "Passport Number",
  MD: "Passport Number",
  MC: "Passport Number",
  MN: "Passport Number",
  ME: "Passport Number",
  MA: "National ID Card",
  MZ: "National ID Card",
  MM: "Passport Number",
  NA: "Passport Number",
  NR: "Passport Number",
  NP: "Passport Number",
  NL: "National ID Card",       // Netherlands :contentReference[oaicite:48]{index=48}
  NZ: "Passport Number",        // NZ has no national ID :contentReference[oaicite:49]{index=49}
  NI: "Passport Number",
  NE: "National ID Card",
  NG: "National ID Number",      // Nigeria national ID :contentReference[oaicite:50]{index=50}
  NO: "Passport Number",
  OM: "Passport Number",
  PK: "CNIC",                   // Pakistan national ID :contentReference[oaicite:51]{index=51}
  PA: "Passport Number",
  PG: "Passport Number",
  PY: "Passport Number",
  PE: "Documento Nacional de Identidad (Peru DNI)", // Peru national ID :contentReference[oaicite:52]{index=52}
  PH: "Passport Number",
  PL: "National ID Card",       // Poland :contentReference[oaicite:53]{index=53}
  PT: "National ID Card",
  QA: "Passport Number",
  RO: "National ID Card",
  RU: "Internal Passport ID",   
  RW: "Passport Number",
  SA: "National ID Card",
  SN: "Passport Number",
  RS: "National ID Card",
  SG: "NRIC",                   // Singapore national ID :contentReference[oaicite:54]{index=54}
  SK: "National ID Card",
  SI: "National ID Card",
  ES: "DNI NIE",                // Spain national ID :contentReference[oaicite:55]{index=55}
  LK: "Passport Number",
  SD: "Passport Number",
  SR: "Passport Number",
  SZ: "Passport Number",
  SE: "Personal Identification Number", 
  CH: "AHV Number",              // Switzerland ID :contentReference[oaicite:56]{index=56}
  SY: "Passport Number",
  TW: "Passport Number",        // Taiwan uses passports/other IDs
  TJ: "Passport Number",
  TZ: "National ID Card",
  TH: "Thai National ID",
  TL: "Passport Number",
  TG: "Passport Number",
  TO: "Passport Number",
  TT: "Passport Number",
  TN: "Passport Number",
  TR: "Turkish Identification Number", 
  TM: "Passport Number",
  UG: "National ID Card",
  UA: "Individual Identification Number", 
  AE: "Emirates ID Card",
  GB: "National ID Card",
  US: "Social Security Number (SSN)", // USA :contentReference[oaicite:57]{index=57}
  UY: "Passport Number",
  UZ: "Passport Number",
  VU: "Passport Number",
  VE: "National ID Card",
  VN: "National ID Card",
  YE: "Passport Number",
  ZA: "National ID Card",
  ZM: "Passport Number",
  ZW: "Passport Number",
};




  const [nationalId, setNationalid] = useState('');
  const [officialName, setOfficialName] = useState('');
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

  // Phone update modal state
  const [phoneUpdateModalVisible, setPhoneUpdateModalVisible] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneValidation, setPhoneValidation] = useState<{
    isValid: boolean;
    corrected: string;
    country: string;
    feedback: string;
  } | null>(null);


  /* ================= COUNTRY + DOCUMENT DERIVATION ================= */

const phoneUtil = PhoneNumberUtil.getInstance();

const [countryCode, setCountryCode] = useState<string | any>(null);


const officialDocument =
  (countryCode ? officialDocumentByCountry[countryCode] : "") || "Passport Number";

const isPassport = officialDocument.includes("Passport");

const nationality =
  (countryCode ? countryNamesByCode[countryCode] : "") || "Unknown Country";


 React.useEffect(() => {
  const deriveCountry = async () => {
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const phone = attributes.phone_number;

      if (!phone) {
        setCountryCode(null);
        return;
      }

      // Normalize phone string (remove spaces)
      const normalized = phone.replace(/\s+/g, "");
      
      // Ensure phone starts with + for proper E.164 parsing
      const phoneWithPlus = normalized.startsWith('+') ? normalized : '+' + normalized;

      // Parse directly - works well for E.164 format
      let number;
      let region;
      
      try {
        number = phoneUtil.parse(phoneWithPlus);
        region = phoneUtil.getRegionCodeForNumber(number) || null;
        console.log('Initial parse successful. Region:', region);
      } catch (e) {
        console.log('Initial parse failed, trying fallback:', e);
        try {
          // Only use fallback if initial parse threw an error
          number = phoneUtil.parse(phoneWithPlus, 'KE');
          region = phoneUtil.getRegionCodeForNumber(number) || null;
          console.log('Fallback parse successful. Region:', region);
        } catch (fallbackErr) {
          console.log('Both parse attempts failed:', fallbackErr);
          throw fallbackErr;
        }
      }

      // Only set countryCode — nationality and officialDocument
      // will be derived automatically from your existing state logic
      setCountryCode(region);
    } catch (err) {
      console.log("Country derivation failed:", err);
      setCountryCode(null);
    }
  };

  deriveCountry();
}, []);

/* ================= PHONE VALIDATION DIALOG ================= */

React.useEffect(() => {
  const validatePhoneOnLoad = async () => {
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const phone = attributes.phone_number;

      if (!phone) {
        Alert.alert('Phone Missing', 'Your account has no phone number on file.');
        return;
      }

      const normalized = (phone || '').replace(/\s+/g, "");
      
      // Ensure phone starts with + for proper E.164 parsing
      const phoneWithPlus = normalized.startsWith('+') ? normalized : '+' + normalized;

      // Parse and validate
      let number;
      let region;
      
      try {
        number = phoneUtil.parse(phoneWithPlus);
        region = phoneUtil.getRegionCodeForNumber(number) || null;
        console.log('Initial parse successful. Phone:', phoneWithPlus, 'Region:', region);
      } catch (e) {
        console.log('Initial parse failed, trying fallback:', e);
        try {
          // Only use fallback if initial parse threw an error
          number = phoneUtil.parse(phoneWithPlus, 'KE');
          region = phoneUtil.getRegionCodeForNumber(number) || null;
          console.log('Fallback parse successful. Region:', region);
        } catch (fallbackErr) {
          console.log('Both parse attempts failed:', fallbackErr);
          throw fallbackErr;
        }
      }
      
      if (!region || region === 'ZZ') {
        console.log('Warning: Region is null or ZZ');
      }
      
      const isValid = phoneUtil.isValidNumber(number);
      
      const countryDisplay = region ? (countryNamesByCode[region] || region) : 'Unknown';
      console.log('Validation result - Country:', countryDisplay, 'Valid:', isValid, 'Region code:', region);

      // Display confirmation dialog
      Alert.alert(
        'Confirm Your Phone Details',
        `Country: ${countryDisplay}\nPhone: ${phone}\n\nIs this correct?`,
        [
          {
            text: 'Yes, Correct',
            onPress: () => {
              if (!isValid) {
                Alert.alert(
                  'Invalid Phone Format',
                  `Your phone number ${phone} appears to be invalid for your country. This might cause issues with account creation.\n\nWould you like to update your phone number through Cognito?`,
                  [
                    {
                      text: 'Update Phone',
                      onPress: () => showPhoneUpdateDialog(),
                    },
                    {
                      text: 'Continue Anyway',
                      onPress: () => console.log('User chose to continue with invalid phone'),
                    },
                  ]
                );
              }
            },
          },
          {
            text: 'No, Update Phone',
            onPress: () => showPhoneUpdateDialog(),
          },
        ]
      );
    } catch (err) {
      console.log('Phone validation error:', err);
    }
  };

  validatePhoneOnLoad();
}, []);

/* ================= PHONE VALIDATION HELPER ================= */

const validatePhoneInput = (input: string) => {
  if (!input) {
    return {
      isValid: false,
      corrected: '',
      country: '',
      feedback: 'Enter a phone number with country code',
    };
  }

  let normalized = input.replace(/\s+/g, '');

  // Check if it starts with + 
  if (!normalized.startsWith('+')) {
    return {
      isValid: false,
      corrected: normalized,
      country: '',
      feedback: '❌ Must start with + (country code)',
    };
  }

  // Smart correction: if user entered +{countrycode}0{number}, remove the leading 0
  if (normalized.match(/^\+\d{1,3}0/)) {
    normalized = normalized.replace(/^(\+\d{1,3})0/, '$1');
    return {
      isValid: false,
      corrected: normalized,
      country: '',
      feedback: '✓ Removed leading 0 → ' + normalized,
    };
  }

  try {
    let number;
    let region;
    
    try {
      number = phoneUtil.parse(normalized);
      region = phoneUtil.getRegionCodeForNumber(number) || null;
    } catch (e) {
      try {
        // Only use fallback if initial parse threw an error
        number = phoneUtil.parse(normalized, 'KE');
        region = phoneUtil.getRegionCodeForNumber(number) || null;
      } catch (fallbackErr) {
        throw fallbackErr;
      }
    }
    
    const isValid = phoneUtil.isValidNumber(number);
    const countryName = region ? (countryNamesByCode[region] || region) : 'Unknown';

    if (isValid) {
      return {
        isValid: true,
        corrected: normalized,
        country: countryName,
        feedback: `✓ Valid! Country: ${countryName}`,
      };
    } else {
      return {
        isValid: false,
        corrected: normalized,
        country: region || '',
        feedback: `❌ Invalid format for ${countryName}`,
      };
    }
  } catch (err) {
    return {
      isValid: false,
      corrected: normalized,
      country: '',
      feedback: '❌ Invalid format. Check country code and number',
    };
  }
};

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
        // Maintain 3:4 portrait aspect for head & shoulders capture
        const width = Math.min(origW, origH * 0.75); // 3:4 ratio
        const height = (width * 4) / 3; // Ensure 4:3 height
        
        // Center horizontally, position vertically to capture head & shoulders
        const crop = {
          originX: Math.floor((origW - width) / 2),
          originY: Math.floor((origH - height) * 0.15), // Position higher to get head & shoulders
          width: Math.floor(width),
          height: Math.floor(height),
        };
        
        actions.push({ crop });
        // Resize maintaining 3:4 aspect ratio: width 675 x height 900
        actions.push({ resize: { width: 675, height: 900 } });
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
      await uploadData({ key, data: blob, options: { contentType: 'image/jpeg' } }).result;

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
  aspect: role === 'passport' ? [3, 4] : undefined,
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
  aspect: role === 'passport' ? [3, 4] : undefined,
  cameraType:
    role === 'passport'
      ? ImagePicker.CameraType.front
      : ImagePicker.CameraType.back,
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

/* ================= PHONE VALIDATION BEFORE ACCOUNT CREATION ================= */

const validatePhoneBeforeAccountCreation = async (): Promise<boolean> => {
  try {
    const attributes = await fetchUserAttributes();
    const phone = attributes.phone_number;

    if (!phone) {
      Alert.alert('Phone Missing', 'Your account has no phone number on file.');
      return false;
    }

    const normalized = (phone || '').replace(/\s+/g, "");
    
    // Ensure phone starts with + for proper E.164 parsing
    const phoneWithPlus = normalized.startsWith('+') ? normalized : '+' + normalized;

    // Parse and validate
    let number;
    let region;
    
    try {
      number = phoneUtil.parse(phoneWithPlus);
      region = phoneUtil.getRegionCodeForNumber(number) || null;
      console.log('validatePhoneBeforeAccountCreation - Initial parse successful. Region:', region);
    } catch (e) {
      console.log('validatePhoneBeforeAccountCreation - Initial parse failed, trying fallback:', e);
      try {
        // Only use fallback if initial parse threw an error
        number = phoneUtil.parse(phoneWithPlus, 'KE');
        region = phoneUtil.getRegionCodeForNumber(number) || null;
        console.log('validatePhoneBeforeAccountCreation - Fallback parse successful. Region:', region);
      } catch (fallbackErr) {
        console.log('validatePhoneBeforeAccountCreation - Both parse attempts failed:', fallbackErr);
        throw fallbackErr;
      }
    }
    
    const isValid = phoneUtil.isValidNumber(number);
    
    const countryDisplay = region ? (countryNamesByCode[region] || region) : 'Unknown';

    // Display confirmation dialog
    return new Promise((resolve) => {
      Alert.alert(
        'Confirm Your Phone Details',
        `Country: ${countryDisplay}\nPhone: ${phone}\n\nIs this correct?`,
        [
          {
            text: 'Yes, Correct',
            onPress: () => {
              if (!isValid) {
                Alert.alert(
                  'Invalid Phone Format',
                  'Your phone number appears to be invalid for your country. This might cause issues with account creation.\n\nWould you like to update your phone number through Cognito?',
                  [
                    {
                      text: 'Update Phone',
                      onPress: () => {
                        showPhoneUpdateDialog();
                        resolve(false); // Don't proceed until phone is updated and confirmed
                      },
                    },
                    {
                      text: 'Continue Anyway',
                      onPress: () => resolve(true), // Proceed despite invalid phone
                    },
                  ]
                );
              } else {
                resolve(true); // Phone is valid, proceed
              }
            },
          },
          {
            text: 'No, Update Phone',
            onPress: () => {
              showPhoneUpdateDialog();
              resolve(false);
            },
          },
        ]
      );
    });
  } catch (err) {
    console.log('Phone validation error:', err);
    Alert.alert('Error', 'Failed to validate phone number. Please try again.');
    return false;
  }
};

  /* ================= BUSINESS LOGIC ================= */

  const ChckUsrExistence = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();

    // ================= VALIDATE PHONE BEFORE PROCEEDING =================
    const isPhoneValid = await validatePhoneBeforeAccountCreation();
    if (!isPhoneValid) {
      setIsLoading(false);
      return; // Stop here and let user fix the phone
    }

    try {
      const UsrDtls: any = await client.graphql({
        query: listSMAccounts,
        variables: {
          filter: { and: { nationalid: { eq: nationalId } } },
        },
      });

      const UsrDtlsz: any = await client.graphql({
        query: listSMAccounts,
        variables: {
          filter: { and: { awsemail: { eq: attributes.email } } },
        },
      });

      const compDtls: any = await client.graphql({
        query: getCompany,
        variables: { AdminId: "BaruchHabaB'ShemAdonai2" },
      });
      const actvSMUsrs = compDtls.data.getCompany.ttlActiveUsers;

      if (!photoPassportKey) {
  Alert.alert('Face photo required');
  return;
}

if (!isPassport && (!idFrontKey || !idBackKey)) {
  Alert.alert('Both front and back of the document are required');
  return;
}

if (pword.length < 8) {
        Alert.alert('Short password; at least 8 mixed characters');
        return;
      } else if (UsrDtls.data.listSMAccounts.items.length > 0) {
        Alert.alert('National ID already exists');
        return;
      } else if (UsrDtlsz.data.listSMAccounts.items.length > 0) {
        Alert.alert('Email already exists');
        return;
      } else {
        await client.graphql({
          query: createSMAccount,
          variables: {
            input: {
            nationalid: nationalId,
                name: officialName,
                phonecontact: attributes.phone_number,
                awsemail: attributes.email,
                balance: 0,
                p2pchmBenefits:0,           
                pw: pword,
                nationality: nationality,
                MFKubwaCost: 0,
                MFKubwaNetCost: 0,
                MFNdogoDue: 0,
                MFNdogoNet: 0,
                beneficiary:   attributes.email,
                beneficiaryAmt:0,
                loanAcceptanceCode:attributes.email,
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
                owner:userInfo.userId,
              photoPassport: photoPassportKey || 'None',
              idFront: idFrontKey || 'None',
              idBack: idBackKey || 'None',
            },
          }
        });

        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: "BaruchHabaB'ShemAdonai2",
              ttlActiveUsers: parseFloat(actvSMUsrs) + 1,
            },
          },
        });

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

  /* ================= PHONE UPDATE MODAL ================= */

  const PhoneUpdateModal = () => {
    return (
      <Modal
        visible={phoneUpdateModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPhoneUpdateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView 
              showsVerticalScrollIndicator={true}
              scrollEventThrottle={16}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              style={styles.modalScrollContent}
            >
              <Text style={styles.modalTitle}>Update Phone Number</Text>

              {/* Instructions */}
              <View style={styles.instructionBox}>
                <Text style={styles.instructionText}>
                  Enter with country code, <Text style={styles.bold}>without leading 0</Text>
                </Text>
                <Text style={styles.exampleText}>
                  Example: <Text style={styles.bold}>+254724071582</Text>
                </Text>
              </View>

              {/* Phone Input */}
              <TextInput
                style={styles.phoneInput}
                placeholder="e.g., +254724071582"
                placeholderTextColor="#999"
                value={phoneInput}
                onChangeText={(text) => {
                  setPhoneInput(text);
                  setPhoneValidation(validatePhoneInput(text));
                }}
                keyboardType="phone-pad"
                editable={!phoneValidation?.isValid || phoneInput.length === 0}
              />

              {/* Real-time Validation Feedback */}
              {phoneValidation && (
                <View
                  style={[
                    styles.feedbackBox,
                    phoneValidation.isValid
                      ? styles.feedbackSuccess
                      : styles.feedbackWarning,
                  ]}
                >
                  <Text style={styles.feedbackText}>{phoneValidation.feedback}</Text>
                  {phoneValidation.corrected && phoneValidation.corrected !== phoneInput && (
                    <Text style={styles.correctedText}>
                      Suggested: {phoneValidation.corrected}
                    </Text>
                  )}
                </View>
              )}
            </ScrollView>

            {/* Action Buttons - Fixed at bottom */}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setPhoneUpdateModalVisible(false);
                  setPhoneInput('');
                  setPhoneValidation(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.updateButton,
                  !phoneValidation?.isValid && styles.updateButtonDisabled,
                ]}
                onPress={async () => {
                  if (!phoneValidation?.isValid) {
                    Alert.alert('Error', 'Please enter a valid phone number');
                    return;
                  }

                  try {
                    setIsLoading(true);
                    await updateUserAttribute({
                      userAttribute: {
                        name: 'phone_number',
                        value: phoneValidation.corrected,
                      } as any,
                    });

                    Alert.alert(
                      'Success',
                      'Your phone number has been updated successfully.\n\nPlease sign out and sign back in for changes to take effect.'
                    );

                    setPhoneUpdateModalVisible(false);
                    setPhoneInput('');
                    setPhoneValidation(null);
                  } catch (err) {
                    console.log('Phone update error:', err);
                    Alert.alert(
                      'Error',
                      'Failed to update your phone number. Please try again.'
                    );
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={!phoneValidation?.isValid}
              >
                <Text style={styles.updateButtonText}>
                  {isLoading ? 'Updating...' : 'Update Phone'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  /* ================= PHONE UPDATE DIALOG ================= */

  const showPhoneUpdateDialog = () => {
    setPhoneUpdateModalVisible(true);
    setPhoneInput('');
    setPhoneValidation(null);
  };


return (
  <LinearGradient colors={['#e29d58', 'skyblue']} style={{ flex: 1 }}>
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>

            {/* ================= OFFICIAL NAME ================= */}
            <TextInput
              placeholder="Official Names (as on document)"
              placeholderTextColor="#666"
              value={officialName}
              onChangeText={setOfficialName}
              style={styles.input}
            />

            {/* ================= NATIONAL DOCUMENT ================= */}
            <TextInput
              placeholder={
                countryCode && officialDocumentByCountry[countryCode]
                  ? officialDocumentByCountry[countryCode]
                  : "Passport Number"
              }
              placeholderTextColor="#666"
              value={nationalId}
              onChangeText={setNationalid}
              style={styles.input}
            />

            {/* ================= FACE PHOTO (ALWAYS REQUIRED) ================= */}
            <View style={styles.imageSection}>
              {photoPassportUri && (
                <View style={styles.passportWrapper}>
                  <Image
                    source={{ uri: photoPassportUri }}
                    style={styles.passportImage}
                  />
                </View>
              )}

              <TouchableOpacity
                onPress={() => pickImage('passport')}
                style={styles.actionButton}
              >
                <Text style={styles.buttonText}>Upload Face Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => takeImage('passport')}
                style={styles.actionButton}
              >
                <Text style={styles.buttonText}>Take Face Photo</Text>
              </TouchableOpacity>
            </View>

            {/* ================= PASSPORT / ID UPLOAD ================= */}
            {isPassport ? (
              <View style={styles.imageSection}>
                {idFrontUri && (
                  <Image source={{ uri: idFrontUri }} style={styles.previewImage} />
                )}

                <TouchableOpacity
                  onPress={async () => {
                    await pickImage('idFront');
                    setIdBackKey(idFrontKey); // duplicate key for idBack
                    setIdBackUri(idFrontUri);
                  }}
                  style={styles.actionButtonAlt}
                >
                  <Text style={styles.buttonText}>Upload Passport Document</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.imageSection}>
                  {idFrontUri && <Image source={{ uri: idFrontUri }} style={styles.previewImage} />}
                  <TouchableOpacity onPress={() => pickImage('idFront')} style={styles.actionButtonAlt}>
                    <Text style={styles.buttonText}>
                      Upload {officialDocumentByCountry[countryCode] || "ID"} (Front)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => takeImage('idFront')} style={styles.actionButtonAlt}>
                    <Text style={styles.buttonText}>
                      Take {officialDocumentByCountry[countryCode] || "ID"} (Front)
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.imageSection}>
                  {idBackUri && <Image source={{ uri: idBackUri }} style={styles.previewImage} />}
                  <TouchableOpacity onPress={() => pickImage('idBack')} style={styles.actionButtonAlt}>
                    <Text style={styles.buttonText}>
                      Upload {officialDocumentByCountry[countryCode] || "ID"} (Back)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => takeImage('idBack')} style={styles.actionButtonAlt}>
                    <Text style={styles.buttonText}>
                      Take {officialDocumentByCountry[countryCode] || "ID"} (Back)
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* ================= PASSWORD ================= */}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Main Account Password"
                placeholderTextColor="#666"
                style={styles.passwordInput}
                value={pword}
                onChangeText={setPW}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={22} color="#333" />
              </TouchableOpacity>
            </View>

            {/* ================= SUBMIT ================= */}
            <TouchableOpacity
              onPress={ChckUsrExistence}
              style={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitText}>Create Main Account</Text>
              )}
            </TouchableOpacity>

          </View>
        </ScrollView>
        <PhoneUpdateModal />
      </KeyboardAvoidingView>
    </View>
  </LinearGradient>
);


}

export default CreateAcForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  formContainer: {
    backgroundColor: '#ffffffee', // slightly transparent white
    margin: 16,
    borderRadius: 20,
    padding: 20,
  },

  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 14,
    color: '#333',
  },

  imageSection: {
    alignItems: 'center',
    marginVertical: 18,
    width: '100%',
  },

  // ================= FACE PHOTO =================
  passportWrapper: {
    width: 320,
    height: 380, // taller to show full face up to shoulders
    borderRadius: 20, // slight rounding
    borderWidth: 3,
    borderColor: '#e29d58',
    marginBottom: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },

  passportImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // ensures full face fills the box
  },

  // ================= DOCUMENT PREVIEWS =================
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'contain', // keep aspect ratio for document
    backgroundColor: '#fff',
  },

  // ================= BUTTONS =================
  actionButton: {
    backgroundColor: '#e29d58',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },

  actionButtonAlt: {
    backgroundColor: 'skyblue',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  // ================= PASSWORD =================
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 10,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },

  // ================= SUBMIT BUTTON =================
  submitButton: {
    backgroundColor: '#e29d58',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 24,
    alignItems: 'center',
  },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // ================= PHONE UPDATE MODAL =================
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '75%',
    maxHeight: '95%',
    flexDirection: 'column',
  },

  modalScrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: 300,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },

  instructionBox: {
    backgroundColor: '#f0f8ff',
    borderLeftColor: '#0066cc',
    borderLeftWidth: 4,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  instructionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },

  bold: {
    fontWeight: '700',
    color: '#000',
  },

  exampleText: {
    fontSize: 12,
    color: '#666',
  },

  phoneInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },

  feedbackBox: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },

  feedbackSuccess: {
    backgroundColor: '#e8f5e9',
    borderLeftColor: '#4caf50',
    borderLeftWidth: 4,
  },

  feedbackWarning: {
    backgroundColor: '#fff3e0',
    borderLeftColor: '#ff9800',
    borderLeftWidth: 4,
  },

  feedbackText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },

  correctedText: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    fontStyle: 'italic',
    marginBottom: 12,
  },

  modalButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 100,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    minHeight: 65,
    justifyContent: 'center',
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },

  updateButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#e29d58',
    alignItems: 'center',
    justifyContent: 'center',
  },

  updateButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },

  updateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});