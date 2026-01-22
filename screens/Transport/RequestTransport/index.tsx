// Complete, integrated MapView + Cart + Checkout + Filters + Custom Markers
// Responsive design with draggable filter, collapsible cart, responsive carousel spacing

import React, { useState, useEffect, useRef, useMemo, useCallback, } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  StyleSheet, Dimensions, ActivityIndicator,
   Animated, PanResponder, ScrollView, Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';


import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { API, graphqlOperation, Auth, Storage} from 'aws-amplify';
import { 
  getBizna,
  getCompany,
  getNonLoans,
  getSokoAd,
  getTransportRegister,
  listTransportRegisters
} from '../../../src/graphql/queries';
  import { getSignedImageUrl } from '../../../src/utils/getSignedImageUrl';
import {
  createTransportOrder,
  updateTransportRegister,
} from '../../../src/graphql/mutations';
import { Linking } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native'; // ✅ This is correct


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const INPUT_KEYS = [
    'radius', 
    'transportRate', 
    'transportName', 
    'transportType',     
];
const GAP = 4;
const SIDE_PADDING = 8;
const INPUT_WIDTH = (SCREEN_WIDTH - SIDE_PADDING * 2 - GAP * (INPUT_KEYS.length - 1)) / INPUT_KEYS.length;

const PLACEHOLDERS = {
  radius: 'Radius',
  transportRate: 'RateRank',
  transportName: 'TransportName',
  transportType: 'TransportType', 
};

export default function SalesItemMapScreen({ navigation }) {
  const [filters, setFilters] = useState({ 
    radius: '0.05 KM', 
    transportRate: '1', 
    transportName: '', 
    transportType: '', 
    
    dutyStatus: 'TransportOnduty', 
    engagementStatus: 'TransportNotEngaged',  });
  const [allItems, setAllItems] = useState([]);
  
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  const [userLocation2, setUserLocation2] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [cartExpanded, setCartExpanded] = useState(true);
  const [sellerlongitude2, setsellerlongitude] = useState('');
  const [sellerlatitude2, setsellerlatitude] = useState('');
  const [filteredItems2, setItems3] = useState<any[]>([]);
  const [Ttl, setFilteredItems3] = useState<any[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [Rdz, setRdz] = useState(0);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [distanceMeters, setDistanceMeters] = useState<number>(0);
  const route = useRoute();
  const [ItemUrlz, setItemUrlz] = useState('');
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);


   const [OverallTotalDebit, setOverallTotalDebit] = useState(0);
   const carouselPosition = useRef(new Animated.Value(SCREEN_HEIGHT * 0.55)).current;

   
    const[isLoading2, setIsLoading2] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    

  const mapRef = useRef();
  const listRef = useRef();

  type SokoItem = {
  id: string;
  
  itemPhoto?: string;
  signedUrl?: string;
  ads:string;

  
  transportkntct: string;  
  transportRate: number; 
  transportdesc: string;
  transportPhoto: string; 
  owner: string;
 
  latitude: number;
  longitude: number;
  transportName: string;
  transportType: string;
  dutyStatus: string; 
  engagementStatus:string; 
  transportRequest: string;
  transportOwnerEmail: string; 
  Earnings: number;
  UsrAcCommitment: number;
  ChmAcCommitment: number;
  chmAcNumber: string;
  chmAcCommitmentStatus: string;
  deliveryLatitude: number;
  deliveryLongitude: number;
  buyerName:string;
  buyerContact: string;
  deliveryID: string;
  deliveryCost: number;
  customerEmail: string;
  deliveryDesc: string;
  bizAc:string;
  bizType: string;
  purchasePhoto: string;
  deliveryStart: number
  itemID: string
};

const sellerBuyerDistance = useMemo(() => {
 
  if (
    sellerlatitude2 &&
    sellerlongitude2 &&
    userLocation &&
    !isNaN(Number(sellerlatitude2)) &&
    !isNaN(Number(sellerlongitude2))
  ) {
    const distanceMeters = getDistance(
      { latitude: Number(sellerlatitude2), longitude: Number(sellerlongitude2) },
      { latitude: userLocation.latitude, longitude: userLocation.longitude }
    );

    setDistanceMeters(distanceMeters);
    return distanceMeters / 1000; // convert to kilometers
  }
  return 0;
}, [sellerlatitude2, sellerlongitude2, userLocation]);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.spring(carouselPosition, {
        toValue: SCREEN_HEIGHT * 0.25,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.spring(carouselPosition, {
        toValue: SCREEN_HEIGHT * 0.55,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const pan = useRef(new Animated.ValueXY({ x: 20, y: 40 })).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => pan.flattenOffset(),
    })
  ).current;

  
  const carouselPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
      onPanResponderMove: (_, gestureState) => {
        carouselPosition.setValue(Math.min(Math.max(gestureState.moveY, SCREEN_HEIGHT * 0.2), SCREEN_HEIGHT * 0.8));
      },
      onPanResponderRelease: (_, gestureState) => {
        const finalY = gestureState.moveY;
        let toValue = SCREEN_HEIGHT * 0.55;
        if (finalY < SCREEN_HEIGHT * 0.4) toValue = SCREEN_HEIGHT * 0.3;
        else if (finalY > SCREEN_HEIGHT * 0.7) toValue = SCREEN_HEIGHT * 0.75;
        Animated.spring(carouselPosition, {
          toValue,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
  

      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.graphql(graphqlOperation(listTransportRegisters));

        const rawItems = res.data.listTransportRegisters.items || [];
        setAllItems(rawItems || []);

        const ads = await Promise.all(
      rawItems.map(async (item: any) => {
        const signedUrl = item.transportPhoto
          ? await getSignedImageUrl(item.transportPhoto)
          : null;

        return {
          ...item,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
          signedUrl,
        };
      })
    );


      setItems3(ads);
    setFilteredItems3(ads);
      } catch (err) {
        console.error('Error fetching Transporters:', err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {

        const res3 = await API.graphql(graphqlOperation(getNonLoans,
           { id:  route.params.id }));
    const ItemUrl = res3.data.getNonLoans.owner;
    setItemUrlz(ItemUrl);


        const res = await API.graphql(graphqlOperation(getSokoAd,
           { id: ItemUrl }));

        const sellerlatitude = res.data.getSokoAd.latitude;
        const sellerlongitude = res.data.getSokoAd.longitude;

        console.log (sellerlatitude, sellerlongitude);
        
        setsellerlatitude(sellerlatitude);
        setsellerlongitude(sellerlongitude);

      } catch (err) {
        console.error('Error fetching Transporters:', err);
      }
    })();
  }, []);

 //  Calculate distance (in kilometers) between seller and buyer


  const filteredItems = useMemo(() => {
    if (!userLocation) return [];
    const radius = Math.max(1, parseFloat(filters.radius) || 0.05);
    const rank = Math.max(1, parseInt(filters.transportRate) || 1);
    return allItems
      .filter(item => {
        const hasCoords = sellerlatitude2 && sellerlongitude2;
       const distance = hasCoords && item.latitude && item.longitude
  ? getDistance(
      { latitude: +sellerlatitude2, longitude: +sellerlongitude2 },
      { latitude: item.latitude, longitude: item.longitude }
    ) / 1000
  : Infinity;

        return (
          distance <= radius &&
          (!filters.transportType || item.transportType?.toLowerCase().includes(filters.transportType.toLowerCase())) &&
          (!filters.transportName || item.transportName?.toLowerCase().includes(filters.transportName.toLowerCase())) &&
          (!filters.dutyStatus || item.dutyStatus?.toLowerCase().includes(filters.dutyStatus.toLowerCase())) &&
           (!filters.transportRequest || item.transportRequest?.toLowerCase().includes(filters.transportRequest.toLowerCase())) &&
           (!filters.engagementStatus || item.engagementStatus?.toLowerCase().includes(filters.engagementStatus.toLowerCase()))
        );
      })
      .sort((a, b) => a.transportRate - b.transportRate)
      .slice(0, rank);
  }, [filters, allItems, userLocation]);

  useEffect(() => {
    if (filteredItems.length && userLocation) {
      const radius = Math.max(0.05, parseFloat(filters.radius) || 0.05);
      mapRef.current?.animateToRegion({
        ...userLocation,
        latitudeDelta: radius * 0.018,
        longitudeDelta: radius * 0.018,
      });
      setRdz(radius)
    }
  }, [filteredItems]);

  const updateQuantity = useCallback((id, delta) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
  }, []);

  const onSelectItem = useCallback((item, index) => {
    setSelectedItemId(item.id);
    if (item.latitude && item.longitude) {
      mapRef.current?.animateToRegion({
        latitude: +item.latitude,
        longitude: +item.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    listRef.current?.scrollToIndex({ index, animated: true });

  }, []);
    useEffect(() => {
  const fetchCompany = async () => {
    try {
      const result = await API.graphql(graphqlOperation(getCompany, {
        AdminId: "BaruchHabaB'ShemAdonai2"
      }));
      setCompany(result.data.getCompany);
    } catch (err) {
      console.error("Error fetching company:", err);
    }
  };

  fetchCompany();
}, []);


   

// Handler function for registering transport
interface NonLoanDetails {
  SenderName: string;
  senderPhn: string;
  amount: number;
  id: string;
  owner: string;
  description: string;
}

interface SokoAdDetails {
  description: string;
  sokokntct: string;
  busName: string;
  businessType: string;
  bizName: string;
  transportkntct: string;
  transportRate: number;
  transportdesc: string;
  transportPhoto: string;
  latitude: number;
  longitude: number;
  transportName: string;
  transportType: string;
  owner: string;
  transportOwnerEmail: string;
  id: string;
}

interface RegisterTransportInput {
  
  transportRequest: string;
  deliveryLatitude: number;
  deliveryLongitude: number;
  buyerName: string;
  buyerContact: string;
  deliveryID: string;
  deliveryCost: number;
  customerEmail: string;
  deliveryDesc: string;
  purchasePhoto: string;
  deliveryStart: number;
  itemID: string;
  transportkntct: string;
  transportRate: number;
  transportdesc: string;
  transportPhoto: string;
  owner: string;
  latitude: number;
  longitude: number;
  transportName: string;
  transportType: string;
  dutyStatus: string;
  engagementStatus: string;
  transportOwnerEmail: string;
  Earnings: number;
  UsrAcCommitment: number;
  ChmAcCommitment: number;
  chmAcNumber: string;
  chmAcCommitmentStatus: string;
  bizAc: string;
  bizType: string; 
  distance: number;
  orderCost: number;
  
  
  sellerLatitude: number;
  sellerLongitude: number;
  sellerContact: string;
  sellerName: string;
}

interface AuthUser {
  attributes: {
    email: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const registerTransport = async (item: SokoItem): Promise<void> => {
  const userInfo: AuthUser = await Auth.currentAuthenticatedUser();
 setLoadingItemId(item.id);
  const coords: { latitude: number; longitude: number } = location || { latitude: 0, longitude: 0 };

  try {
    const res4 = await API.graphql(graphqlOperation(getNonLoans, { id: route.params.id }));
    const ItemDtls4: NonLoanDetails = res4.data.getNonLoans;

    const res2 = await API.graphql(graphqlOperation(getSokoAd, { id: ItemDtls4.owner }));
    const AdDtls: SokoAdDetails = res2.data.getSokoAd;

    const res6 = await API.graphql(graphqlOperation(getTransportRegister, 
      { id: item.id }));
    const ItemDtls6: SokoAdDetails = res6.data.getTransportRegister;

    console.log('ItemDtls6:', ItemDtls6);
    console.log('AdDtls:', AdDtls);
    console.log('ItemDtls4:', ItemDtls4);
    console.log(sellerlatitude2, sellerlongitude2);
    console.log(sellerBuyerDistance)
    console.log(userInfo.attributes.phone_number)
    if (!userLocation || !userLocation.latitude || !userLocation.longitude ) {
  Alert.alert("Location Error", "Waiting for your current location...");
  return;
}

                  
    const input: RegisterTransportInput = {

  transportkntct: ItemDtls6.transportkntct,  
  transportRate: ItemDtls6.transportRate,
  transportdesc: ItemDtls6.transportdesc,
  transportPhoto: ItemDtls6.transportPhoto, 
  owner: ItemDtls6.owner,
  
  latitude: Number(ItemDtls6.latitude),
  longitude: Number(ItemDtls6.longitude),
  transportName: ItemDtls6.transportName,
  transportType: ItemDtls6.transportType,
  dutyStatus: "TransportOnduty", 
  engagementStatus: "TransportNotEngaged", 
  transportRequest: "transportRequestYes",
  transportOwnerEmail: ItemDtls6.transportOwnerEmail,
  Earnings: 0,
   UsrAcCommitment: 0,
  ChmAcCommitment: 0,
  chmAcNumber: "String",
  chmAcCommitmentStatus: "TransportChmCommitmentNo",
  deliveryLatitude: Number(userLocation.latitude),
      deliveryLongitude: Number(userLocation.longitude),
  buyerName: ItemDtls4.SenderName,
      buyerContact: userInfo.attributes.phone_number, 

      deliveryID: ItemDtls4.id,
      deliveryCost: Number((sellerBuyerDistance * item.transportRate).toFixed(0)),
      
  customerEmail: userInfo.attributes.email,
      deliveryDesc: ItemDtls4.description,
      //transport account id
      bizAc: ItemDtls6.id,
      //dispatch status
  bizType: "NotDispatched",
      purchasePhoto: ItemDtls4.owner,
      deliveryStart: 0,
      itemID: ItemDtls4.owner,
      sellerContact: AdDtls.sokokntct,
      sellerName: AdDtls.bizName,
      
      
  sellerLatitude: Number(sellerlatitude2),
      sellerLongitude: Number(sellerlongitude2),
  
  distance: Number(sellerBuyerDistance),
  orderCost: ItemDtls4.amount
      
    };

  if (ItemDtls6.transportOwnerEmail ===userInfo.attributes.email) 
  {Alert.alert("Sorry", "You cannot request your own transport.");
    return;
  }
    
    {  const mutationResult = await API.graphql(
      graphqlOperation(createTransportOrder, { input })) as { data?: any };
  

    if (mutationResult?.data?.createTransportOrder) {
      Alert.alert('Transport Request Successful');
      setSelectedItemId(null);
      setQuantities({});
      setCart([]);
      setCartExpanded(false);
      setFilters({
        radius: '0.05 KM',
        transportRate: '1',
        transportName: '',
        transportType: '',
        
        dutyStatus: 'TransportOnduty',
        engagementStatus: 'TransportNotEngaged',
      });
      // Send SMS notification
      const sendSMS = (phoneNumber: string, message: string) => {
  const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
  Linking.openURL(url);
};

// Example usage inside registerTransport or on button press:
sendSMS(ItemDtls6.transportkntct, 'You have a new transport request from ' + AdDtls.bizName + " to " 
  + ItemDtls4.SenderName + " " + AdDtls.businessType);
    }
  }
  } catch (err) {
    console.error('Transport request failed:', err);
    Alert.alert('Error', 'Failed to request transport. Try again.');
  } finally {
    setLoadingItemId(null); 
  }
};
  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Locating you…</Text>
      </View>
    );
  }

  return (
   
    <View style={{ flex: 1 }}>
      <MapView ref={mapRef} style={{ flex: 1 }} showsUserLocation initialRegion={{
        ...userLocation,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
     
      
      >
        {filteredItems.map((item, index) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: +item.latitude, longitude: +item.longitude }}
            onPress={() => onSelectItem(item, index)}
          
          >
            <View style={[styles.markerContainer, selectedItemId === item.id && styles.selectedMarker]}>
              <Text style={styles.markerText}>{(sellerBuyerDistance * item.transportRate).toFixed(0)}</Text>
            </View>
          </Marker>
        ))}

        {sellerlatitude2 && sellerlongitude2 && (
    <Marker
      coordinate={{
        latitude: Number(sellerlatitude2),
        longitude: Number(sellerlongitude2),
      }}
      title="Seller"
      description="Seller Location"
      pinColor="orange" // You can use a custom color or icon
    >
      <View style={styles.sellerMarker}>
        <FontAwesome name="user" size={24} color="#fff" />
        <Text style={styles.sellerMarkerText}>Seller</Text>
      </View>
    </Marker>
  )}
      </MapView>

      {/* Draggable Filter Panel */}
      <Animated.View style={[styles.filterPanel, pan.getLayout()]} {...panResponder.panHandlers}>
        <View style={styles.inputsRow}>
          {INPUT_KEYS.map((key, idx) => (
            <View key={key} style={{ width: INPUT_WIDTH, marginRight: idx < INPUT_KEYS.length - 1 ? GAP : 0 }}>
              <TextInput
                placeholder={PLACEHOLDERS[key]}
                keyboardType={['radius', 'transportRate'].includes(key) ? 'numeric' : 'default'}
                style={styles.input}
                placeholderTextColor="#999"
                value={filters[key]}
                onChangeText={text => setFilters(f => ({ ...f, [key]: text }))}
              />
            </View>
          ))}
        </View>
        <View style={styles.handleWrapper}><View style={styles.handleLine} /></View>
      </Animated.View>

      {/* Responsive Carousel */}

      

      <Animated.View style={[styles.carouselContainer, { top: carouselPosition }]}>

     
        <FlatList
          ref={listRef}
          data={filteredItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item, index }: { item: SokoItem; index: number }) => {
            const qty = quantities[item.id] || 1;
            const total = sellerBuyerDistance * item.transportRate;

            return (
             <TouchableOpacity
      style={[
        styles.card,
        selectedItemId === item.id && styles.cardSelected,
        { flexDirection: 'row', alignItems: 'center' }, // Ensures side-by-side layout
      ]}
      onPress={() => onSelectItem(item, index)}
      onLongPress={() => registerTransport(item)}
    >
      {/* RIGHT: Image */}
      {item.transportPhoto && (
        <Image
          source={{ uri: `https://mifedhasalesadsphotosc789c-mifedha.s3.us-east-1.amazonaws.com/public/${item.transportPhoto}` }}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      )}

      {/* LEFT: Text and buttons */}
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={styles.text}>
          {item.transportName} offering {item.transportType} services
          @ KES {item.transportRate} / KM = Ksh {total.toFixed(0)} for {distanceMeters/1000} Aerial KiloMeters. Contact: {item.transportkntct}
          | Long press to Request transport
        </Text>

        <View style={styles.buttonRow}>
          
          <TouchableOpacity
            onPress={() => navigation.navigate("TransportDetails", { id: item.id })}
            style={[styles.btn, { backgroundColor: '#e58d29' }]}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
  onPress={() => registerTransport(item)}
  style={[
    styles.btn,
    {
      backgroundColor: '#e58d29',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: loadingItemId === item.id ? 0.7 : 1,
    },
  ]}
  disabled={loadingItemId === item.id}
>
  {loadingItemId === item.id && (
    <ActivityIndicator size="small" color="#fff" style={{ marginRight: 6 }} />
  )}
  <Text style={{ color: 'white', fontSize: 12 }}>
    {loadingItemId === item.id ? 'Processing...' : 'Transport'}
  </Text>
</TouchableOpacity>

        </View>
      </View>
    </TouchableOpacity>
            );
          }}
        />
        </Animated.View>

  
    </View>
   
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  filterPanel: {
    position: 'absolute', backgroundColor: 'white', borderRadius: 8, 
    padding: 6, elevation: 5, zIndex: 1, 
  },
  inputsRow: { flexDirection: 'row', justifyContent: 'space-between', },
  handleWrapper: { alignItems: 'center', marginTop: 4 , },
  handleLine: { width: 38, height: 10, backgroundColor: '#aaa', borderRadius: 2 },
  input: {
    borderBottomWidth: 1, fontSize: 10, fontWeight:'bold', color: '#e58d29',
    paddingVertical: 2, paddingHorizontal: 2, backgroundColor: '#f5f5f5', height: 15
  },

  carouselImage: {
  width: 100,
  height: 100,
  borderRadius: 8,
  alignSelf: 'center',
},

  markerContainer: {
    backgroundColor: '#fff', padding: 4, borderRadius: 6, borderWidth: 1, borderColor: 'gray',
  },
  selectedMarker: { backgroundColor: '#e58d29', borderColor: 'white' },
  markerText: { fontSize: 10, fontWeight: 'bold' },
  carouselContainer: {position: 'absolute',
  width: SCREEN_WIDTH,
  height: 130,
  
  backgroundColor: 'rgba(255,255,255,0.95)',
  zIndex: 1,
  pointerEvents: 'box-none',
  },
  card: {
    backgroundColor: 'white', marginHorizontal: 6, padding: 1, borderRadius: 6, 
    width: SCREEN_WIDTH*0.8, elevation: 2, 
    
  },
  cardSelected: { borderColor: '#00aaff', borderWidth: 2 },
  text: { fontSize: 12 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  btn: { backgroundColor: '#eee', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  cartContainer: {
    position: 'absolute', top: 10, right: 10, backgroundColor: 'white', padding: 8, borderRadius: 6, elevation: 5, maxHeight: SCREEN_HEIGHT * 0.5,
  },
  button: {

    marginTop: 20,
    backgroundColor: '#f5a623',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    
    justifyContent: 'center'
  },

  carouselHandle: {
  alignSelf: 'center',
  width: 40,
  height: 10,
  borderRadius: 3,
  backgroundColor: '#aaa',
  marginBottom: 6,
},

  buttonText: {
    color: '#1b1b1b',
    fontWeight: 'bold',
    fontSize: 16,
  },

  sellerMarker: {
    backgroundColor: '#e58d29',
    borderRadius: 20,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  sellerMarkerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 2,
  },
});
