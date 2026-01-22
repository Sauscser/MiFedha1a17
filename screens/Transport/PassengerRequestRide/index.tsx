import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet,
  Dimensions, ActivityIndicator, Animated, Image, Alert
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import { listTransportRegisters, listRideRequests, getSMAccount } from '../../../src/graphql/queries';
import { createRideRequest, sendNotification } from '../../../src/graphql/mutations';
import GooglePlacesAutocompleteNew from './GooglePlacesAutoCompleteNew';
import messaging from '@react-native-firebase/messaging';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DEFAULT_RADIUS_KM = 0.1;

export default function RideRequestMapScreen({ navigation }: { navigation: any }) {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [allRiders, setAllRiders] = useState<any[]>([]);
  const [filteredRiders, setFilteredRiders] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    pickup: null as { latitude: number; longitude: number } | null,
    destination: null as { latitude: number; longitude: number } | null,
    radiusKm: String(DEFAULT_RADIUS_KM),
  });
  const [selectedRiderId, setSelectedRiderId] = useState<string | null>(null);
  const [loadingRiders, setLoadingRiders] = useState<{ [id: string]: boolean }>({});
  const [paymentMethod, setPaymentMethod] = useState<'MiFedha' | 'Cash'>('Cash');
  const [pickupText, setPickupText] = useState('Current Location');
  const [destinationText, setDestinationText] = useState('');

  const mapRef = useRef<MapView | null>(null);
  const carouselRef = useRef<FlatList | null>(null);
  const carouselPosition = useRef(new Animated.Value(SCREEN_HEIGHT * 0.6)).current;

  // ---------- Notification Handlers ----------
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.notification?.title || "Notification",
                  remoteMessage.notification?.body || "You have a new message");
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Background notification:", remoteMessage);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
  (async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to show the map.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      setUserLocation(coords);

      // also set pickup to current location if not already set
      setFilters(prev => ({ ...prev, pickup: prev.pickup || coords }));
    } catch (err) {
      console.warn('Error fetching location:', err);
    }
  })();
}, []);

  // ---------- Focus rider ----------
  const focusOnRider = useCallback((rider: any, index: number) => {
    setSelectedRiderId(rider.id);
    mapRef.current?.animateToRegion(
      { latitude: rider.latitude, longitude: rider.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 },
      300
    );
    try {
      carouselRef.current?.scrollToIndex({ index, animated: true });
    } catch {}
    Animated.spring(carouselPosition, { toValue: SCREEN_HEIGHT * 0.6, useNativeDriver: false }).start();
  }, [carouselPosition]);

  // ---------- Fetch place details ----------
  const fetchPlaceDetails = (place: any, type: 'pickup' | 'destination') => {
    if (!place?.location) return;
    setFilters(prev => ({ ...prev, [type]: place.location }));
    if (type === 'pickup') setPickupText(place.displayName || 'Pickup');
    else setDestinationText(place.displayName || 'Destination');
  };

  // ---------- Confirm ride ----------
  const confirmAndRequestRide = (rider: any) => {
    Alert.alert(
      'Confirm Ride',
      `Request ride from ${rider.transportName || 'Rider'}?\nEstimated cost: KES ${Math.round(
        rider._estimatedCost || 0
      )}\nDistance: ${(rider._tripDistanceKm || 0).toFixed(2)} km`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => requestRide(rider) },
      ]
    );
  };

  // ---------- Request ride ----------
  const requestRide = async (rider: any) => {
    if (!filters.pickup || !filters.destination) {
      Alert.alert('Pick locations', 'Select both pickup and destination.');
      return;
    }

    try {
      setLoadingRiders(prev => ({ ...prev, [rider.id]: true }));
      const user = await Auth.currentAuthenticatedUser();

      const userDtls: any = await API.graphql(
        graphqlOperation(getSMAccount, { awsemail: user.attributes.email })
      );

      const passengerInfo = userDtls.data.getSMAccount;

      if (!passengerInfo) {
        Alert.alert('No Account', 'Please create a Main Account first.');
        setLoadingRiders(prev => ({ ...prev, [rider.id]: false }));
        return;
      }

      const input = {
        passengerEmail: user.attributes.email,
        passengerName: passengerInfo.name,
        passengerContact: user.attributes.phone_contact,
        pickupLatitude: filters.pickup.latitude,
        pickupLongitude: filters.pickup.longitude,
        destinationLatitude: filters.destination.latitude,
        destinationLongitude: filters.destination.longitude,
        distance: rider._tripDistanceKm || 0,
        estimatedCost: rider._estimatedCost || 0,
        selectedRiderID: rider.id,
        riderName: rider.transportName || rider.owner || '',
        riderContact: rider.transportkntct || '',
        riderRate: rider.transportRate || 0,
        paymentMethod,
        paymentStatus: 'NotCleared',
        rideStatus: 'transportRequestYes',
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        riderLatitude: rider.latitude,
        riderLongitude: rider.longitude,
      };

      const rideRes: any = await API.graphql(graphqlOperation(createRideRequest, { input }));
      const ride = rideRes?.data?.createRideRequest;

      if (ride) {
        Alert.alert('Ride requested', `Ride request sent to ${rider.transportName || 'Rider'}.`);

        // 🔔 Trigger backend Lambda to send push notification
        await API.graphql(graphqlOperation(sendNotification, {
          riderEmail: rider.ownerEmail,
          title: "MiFedha: New Ride Request",
          body: `Passenger ${ride.passengerName} requested a ride. Estimated cost: KES ${ride.estimatedCost}`
        }));

        navigation.navigate('RideTrackingScreen', { rideId: ride.id });
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to request ride.');
    } finally {
      setLoadingRiders(prev => ({ ...prev, [rider.id]: false }));
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
      {/* Map */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {filteredRiders.map((rider, idx) => (
          <Marker
            key={rider.id}
            coordinate={{ latitude: rider.latitude, longitude: rider.longitude }}
            onPress={() => focusOnRider(rider, idx)}
          >
            <View style={[styles.markerContainer, selectedRiderId === rider.id && styles.selectedMarker]}>
              <Text style={styles.markerText}>{Math.round(rider._estimatedCost || 0)}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Filter/Search Panel */}
      <View style={styles.filterPanel}>
        <GooglePlacesAutocompleteNew
          apiKey="AIzaSyA0rFIOCDBr3WI-I4SGHGPFLUW7bWSAnvA"
          placeholder="Pickup location"
          onPlaceSelected={(place: any) => fetchPlaceDetails(place, 'pickup')}
          clearOnSelect
        />
        <GooglePlacesAutocompleteNew
          apiKey="AIzaSyA0rFIOCDBr3WI-I4SGHGPFLUW7bWSAnvA"
          placeholder="Destination"
          onPlaceSelected={(place: any) => fetchPlaceDetails(place, 'destination')}
          clearOnSelect
        />

        <TextInput
          placeholder="Radius (km)"
          value={filters.radiusKm}
          keyboardType="numeric"
          onChangeText={t => setFilters(f => ({ ...f, radiusKm: t }))}
          style={[styles.smallInput, { width: 80, marginTop: 6 }]}
        />
      </View>

      {/* Payment */}
      
      {/* Payment Method Toggle */}
<View style={styles.paymentToggle}>

   <TouchableOpacity
    style={[styles.payBtn, paymentMethod === 'MiFedha' && styles.payBtnActive]}
    
  >
    <Text style={[styles.payTxt, paymentMethod === 'MiFedha' && styles.payTxtActive]}>
      Payment method
    </Text>
  </TouchableOpacity>

   <TouchableOpacity
    style={[styles.payBtn, paymentMethod === 'Cash' && styles.payBtnActive]}
    onPress={() => setPaymentMethod('Cash')}
  >

    
    <Text style={[styles.payTxt, paymentMethod === 'Cash' && styles.payTxtActive]}>
      Cash
    </Text>
  </TouchableOpacity>
  
  <TouchableOpacity
    style={[styles.payBtn, paymentMethod === 'MiFedha' && styles.payBtnActive]}
    onPress={() => setPaymentMethod('MiFedha')}
  >
    <Text style={[styles.payTxt, paymentMethod === 'MiFedha' && styles.payTxtActive]}>
      MiFedha
    </Text>
  </TouchableOpacity>
 

 
</View>


      {/* Carousel */}
      <Animated.View style={[styles.carouselContainer, { top: carouselPosition }]}>
        <FlatList
          ref={carouselRef}
          data={filteredRiders}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.card, selectedRiderId === item.id && styles.cardSelected]}
              onPress={() => focusOnRider(item, index)}
              onLongPress={() => confirmAndRequestRide(item)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item.signedUrl ? (
                  <Image source={{ uri: item.signedUrl }} style={{ width: 60, height: 60, borderRadius: 8 }} />
                ) : (
                  <View style={styles.thumbPlaceholder}>
                    <Text style={{ color: '#fff' }}>{(item.transportType || 'TR').slice(0, 2).toUpperCase()}</Text>
                  </View>
                )}
                <View style={{ flex: 1, paddingLeft: 10 }}>
                  <Text style={{ fontWeight: '700' }}>{item.transportName || 'Rider'}</Text>
                  <Text style={{ fontSize: 12 }}>
                    {item.transportType} • KES {item.transportRate}/km
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    Est: KES {Math.round(item._estimatedCost || 0)} || {(item._tripDistanceKm || 0).toFixed(2)} km
                  </Text>
                  <Text style={{ fontSize: 12, color: '#666' }}>Tap to focus • Long-press to request</Text>
                </View>
                <TouchableOpacity style={styles.requestBtn} onPress={() => confirmAndRequestRide(item)}>
                  {loadingRiders[item.id] ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff' }}>Request</Text>}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  filterPanel: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    elevation: 6,
    zIndex: 5,
  },
  smallInput: { backgroundColor: '#f5f5f5', padding: 8, borderRadius: 6, fontSize: 12 },
  paymentToggle: {
    position: 'absolute',
    top: 250,
    left: 12,
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 4,
    borderRadius: 8,
    elevation: 6,
  },
  payBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  payBtnActive: { backgroundColor: '#e58d29' },
  payTxt: { color: '#333' },
  payTxtActive: { color: '#fff' },
  carouselContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: 140,
    backgroundColor: 'rgba(255,255,255,0.95)',
    zIndex: 10,
    bottom: 12,
    paddingTop: 6,
  },
  card: { backgroundColor: 'white', marginHorizontal: 8, padding: 8, borderRadius: 8, width: SCREEN_WIDTH * 0.82, elevation: 3 },
  cardSelected: { borderColor: '#1f8ef1', borderWidth: 2 },
  thumbPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#e58d29',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerContainer: { backgroundColor: '#1f8ef1', padding: 4, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  selectedMarker: { backgroundColor: '#e58d29' },
  markerText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  requestBtn: { backgroundColor: '#1f8ef1', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, marginLeft: 8 },
}); 
