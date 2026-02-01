import messaging from '@react-native-firebase/messaging';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Pressable, Dimensions, Linking, Animated, Alert, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { getCompany, getCompanyUrls, getNotification, getSMAccount, listMessages } from '../../src/graphql/queries';
import { createNotification, updateNotification } from '../../src/graphql/mutations';
import { getUrl } from '@aws-amplify/storage';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
const {
  height,
  width
} = Dimensions.get('window');
const client = generateClient();
const HomeScreen = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const [Url, setUrl] = useState("");
  const [Url4, setUrl4] = useState("");
  const [userPhotoUri, setUserPhotoUri] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [photoLoading, setPhotoLoading] = useState(true);
  const [mainAccExists, setMainAccExists] = useState(false);
  const navigation = useNavigation();
  const letterAnim = useRef(new Animated.Value(0)).current;
  const navigateTo = (screen, params = {}) => {
    navigation.navigate(screen, params);
  };

  // ------------------- FCM Helpers -------------------
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }
  async function getFcmToken() {
    const token = await messaging().getToken();
    console.log("FCM Token:", token);
    return token;
  }

  // ------------------- Business Logic -------------------
  const getCompUrls = async () => {
    try {
      const compDetailsz: any = await client.graphql({
        query: getCompanyUrls,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2Ulr"
        }
      });
      setUrl(compDetailsz.data.getCompanyUrls.Url1);
      setUrl4(compDetailsz.data.getCompanyUrls.Url4);
    } catch (error) {
      console.error("Error fetching company URLs:", error);
    }
  };
  useEffect(() => {
    const init = async () => {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        const email = attributes.email;

        // Check if main account exists
        const userDtls: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: email
          }
        });
        const note: any = await client.graphql({
          query: getNotification,
          variables: {
            awsemail: email
          }
        });
        const mainAccExists = userDtls.data.getSMAccount;
        const noteDtls = note.data.getNotification;

        // ================= FETCH USER PHOTO =================
        if (mainAccExists) {
          try {
            setMainAccExists(true);
            const photoKey = mainAccExists.photoPassport;
            setUserName(mainAccExists.name || "User");
            
            if (photoKey && photoKey !== 'None') {
              console.log('Fetching photo with key:', photoKey);
              const signedUrl: any = await getUrl({ key: photoKey });
              const photoUrl = signedUrl.url.toString();
              console.log('User photo URL generated:', photoUrl);
              setUserPhotoUri(photoUrl);
            } else {
              console.log('No photo key available');
              setUserPhotoUri(null);
            }
          } catch (photoErr) {
            console.log('Error fetching user photo URL:', photoErr);
            setUserPhotoUri(null);
          } finally {
            setPhotoLoading(false);
          }
        } else {
          setPhotoLoading(false);
        }

        // Refresh FCM token every time HomeScreen renders
        const permissionGranted = await requestUserPermission();
        if (!permissionGranted) {
          console.log("Notification permission not granted");
          return;
        }
        const token = await getFcmToken();
        if (!mainAccExists) {
          Alert.alert("Click 'Create Main Account' button to create it.");
        }
        if (mainAccExists && noteDtls) {
          await client.graphql({
            query: updateNotification,
            variables: {
              input: {
                awsemail: email,
                firebaseKey: token
              }
            }
          });
        }
        if (mainAccExists && !noteDtls) {
          await client.graphql({
            query: createNotification,
            variables: {
              input: {
                awsemail: email,
                firebaseKey: token
              }
            }
          });
        }
        if (!mainAccExists && !noteDtls) {
          await client.graphql({
            query: createNotification,
            variables: {
              input: {
                awsemail: email,
                firebaseKey: token
              }
            }
          });
        }
      } catch (error) {
        console.error("Error initializing HomeScreen:", error);
      }
    };
    init();
    getCompUrls();
  }, []);
  useEffect(() => {
    const animate = () => {
      letterAnim.setValue(0);
      Animated.timing(letterAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }).start(() => animate());
    };
    animate();
  }, [letterAnim]);
  const renderAnimatedBoom = () => {
    const letters = "BOOOOM!".split("");
    return letters.map((letter, index) => {
      const inputRange = [0, (index + 1) / letters.length, 1];
      const translateX = letterAnim.interpolate({
        inputRange,
        outputRange: [0, index * 20, index * 20]
      });
      const scale = letterAnim.interpolate({
        inputRange,
        outputRange: [0, 1 + index * 0.1, 1 + index * 0.1]
      });
      const opacity = letterAnim.interpolate({
        inputRange,
        outputRange: [0, 1, 1]
      });
      return <Animated.Text key={index} style={{
        transform: [{
          translateX
        }, {
          scale
        }],
        opacity,
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold'
      }}>
          {letter}
        </Animated.Text>;
    });
  };
  useEffect(() => {
    // Foreground notifications
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.notification?.title || "Notification", remoteMessage.notification?.body || "You have a new message");
    });

    // Background/terminated notifications
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Background notification:", remoteMessage);
    });
    return unsubscribe;
  }, []);
  return <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={['#e58d29', '#f3c642']} style={styles.backgroundGradient}>
        
          {/* ================= USER PROFILE SECTION WITH BUTTONS ================= */}
          <View style={styles.profileSectionWithButtons}>
            {/* Create Main Account Button - Left */}
            <View style={styles.sideButtonWrapper}>
              <LinearGradient colors={['#72ebd8', '#34a4a1']} style={styles.sideButton}>
                <TouchableOpacity style={styles.sideButton} onPress={() => navigateTo('WelcomePgss')}>
                  <MaterialCommunityIcons name="plus-circle" size={24} color="#ffffff" style={styles.sideButtonIcon} />
                  <Text style={styles.sideButtonText}>Create{"\n"}Account</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* Photo Container - Center */}
            <View style={styles.photoContainer}>
              {photoLoading ? (
                <ActivityIndicator size="large" color="#ffffff" />
              ) : userPhotoUri ? (
                <Image
                  source={{ uri: userPhotoUri }}
                  style={styles.userPhoto}
                  onError={() => {
                    console.log('Image failed to load');
                    setUserPhotoUri(null);
                  }}
                />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <MaterialCommunityIcons name="account-circle" size={80} color="#ffffff" />
                </View>
              )}
            </View>

            {/* View Main Account Button - Right */}
            <View style={styles.sideButtonWrapper}>
              <LinearGradient colors={['#72ebd8', '#34a4a1']} style={styles.sideButton}>
                <TouchableOpacity style={styles.sideButton} onPress={() => navigateTo('ViewSmAcs')}>
                  <MaterialCommunityIcons name="eye" size={24} color="#ffffff" style={styles.sideButtonIcon} />
                  <Text style={styles.sideButtonText}>View{"\n"}Account</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          {/* ================= QUOTE SECTION ================= */}
          <LinearGradient colors={['#e58d29', '#f3c642']} style={styles.quoteContainer}>
            <Pressable style={styles.quotePressable} onPress={() => Linking.openURL(Url)}>
              <Text style={styles.quoteText}>We are Humans and Being Humane is our Business!</Text>
              <FontAwesome name="globe" size={24} color="white" style={styles.globeIcon} />
            </Pressable>
          </LinearGradient>

          {/* ================= MESSAGES BUTTON ================= */}
          <View style={styles.buttonContainer2}>
            <LinearGradient colors={['#72ebd8', '#34a4a1']} style={styles.mainButton2}>
              <TouchableOpacity style={styles.mainButton2} onPress={() => navigateTo('COMB')}>
                <Text style={styles.mainButtonText}>Consume On My Bill (COMB)</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* ================= PRODUCTS SECTION ================= */}
          <View style={styles.productContainer}>
            <TouchableOpacity style={styles.productButton} onPress={() => navigateTo('LnsScreen')}>
              <Text style={styles.productButtonText}>Pal-Pal Products</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.productButton} onPress={() => navigateTo('ChamaScreen')}>
              <Text style={styles.productButtonText}>Chama Products</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.productButton} onPress={() => navigateTo('CredSlsScreen')}>
              <Text style={styles.productButtonText}>Business Products</Text>
            </TouchableOpacity>
          </View>

          {/* ================= COMB BUTTON ================= */}
          <LinearGradient colors={['#72ebd8', '#34a4a1']} style={styles.loanButton}>
            <TouchableOpacity style={styles.loanContainer} onPress={() => navigateTo('ViewMessages')}>
              <Text style={styles.loanButtonText}>Messages</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* ================= ALERTS SECTION ================= */}
          <View style={styles.alertContainer}>
            <TouchableOpacity style={styles.pressable} onPress={() => Linking.openURL(Url4)}>
              <FontAwesome name="bullhorn" size={24} color="red" />
              <View style={{
              flexDirection: 'row'
            }}>{renderAnimatedBoom()}</View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>;
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e58d29',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  backgroundGradient: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  // ================= USER PROFILE SECTION WITH BUTTONS =================
  profileSectionWithButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 16,
    minHeight: 170,
    gap: 16,
  },
  sideButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    maxWidth: 70,
  },
  sideButton: {
    width: '100%',
    height: 100,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtonIcon: {
    marginBottom: 8,
  },
  sideButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 14,
  },
  photoContainer: {
    flex: 0.35,
    height: 130,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: 6,
  },
  userPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 16,
    height: 55,
  },
  mainButton2: {
    width: '85%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  quoteContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  quotePressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 20,
  },
  globeIcon: {
    marginTop: 12,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 12,
    marginTop: 8,
  },
  sectionLabelText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 5,
    gap: 10,
  },
  productButton: {
    flex: 1,
    height: 70,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    paddingHorizontal: 8,
  },
  productButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 15,
  },
  loanContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanButton: {
    width: '90%',
    height: 50,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  loanButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  alertContainer: {
    width: '90%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: '5%',
    marginTop: 12,
    backgroundColor: '#fff5f5',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  alertText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red'
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  }
});