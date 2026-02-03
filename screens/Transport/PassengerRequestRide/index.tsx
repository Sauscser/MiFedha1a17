import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Animated, Image, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listTransportRegisters, listRideRequests, getSMAccount, getTransportRegister } from '../../../src/graphql/queries';
import { createRideRequest, sendNotification } from '../../../src/graphql/mutations';
import GooglePlacesAutocompleteNew from './GooglePlacesAutoCompleteNew';
import messaging from '@react-native-firebase/messaging';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DEFAULT_RADIUS_KM = 0.1;
export default function RideRequestMapScreen({
  navigation
}: {
  navigation: any;
}) {
  const [pendingCheckDone, setPendingCheckDone] = useState(false);
  const [pendingRides, setPendingRides] = useState<any[]>([]);
  const [pickupInput, setPickupInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [allRiders, setAllRiders] = useState<any[]>([]);
  const [filteredRiders, setFilteredRiders] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    pickup: null as {
      latitude: number;
      longitude: number;
    } | null,
    destination: null as {
      latitude: number;
      longitude: number;
    } | null,
    radiusKm: String(DEFAULT_RADIUS_KM)
  });

  // On mount, check for pending rides for this passenger
  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        const pendingRes: any = await client.graphql({
          query: listRideRequests,
          variables: {
            filter: {
              passengerEmail: { eq: attributes.email },
              rideStatus: { ne: 'Completed' }
            },
            limit: 10
          }
        });
        const pending = pendingRes?.data?.listRideRequests?.items || [];
        if (pending.length > 0) {
          Alert.alert(
            'Pending Rides',
            'You have pending ride requests. Do you want to go to your pending rides?',
            [
              {
                text: 'Go to Pending Rides',
                onPress: () => {
                  setPendingRides(pending);
                  navigation.replace('RideTrackingScreen', { pendingRides: pending });
                },
                style: 'default'
              },
              {
                text: 'Continue',
                onPress: () => setPendingCheckDone(true),
                style: 'cancel'
              }
            ],
            { cancelable: false }
          );
        } else {
          setPendingCheckDone(true);
        }
      } catch (err) {
        setPendingCheckDone(true);
      }
    })();
  }, []);

  // Fetch all riders on mount (after pending check)
  useEffect(() => {
    if (!pendingCheckDone) return;
    (async () => {
      try {
        const res: any = await client.graphql({
          query: listTransportRegisters,
          variables: {
            filter: { dutyStatus: { eq: "TransportOnduty" }, engagementStatus: { eq: "TransportNotEngaged" } },
            limit: 1000
          }
        });
        const items = res?.data?.listTransportRegisters?.items || [];
        // Parse lat/lng as numbers
        const riders = items.map((item: any) => ({
          ...item,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude)
        })).filter((r: any) => !isNaN(r.latitude) && !isNaN(r.longitude));
        setAllRiders(riders);
      } catch (err) {
        console.error('Error fetching riders:', err);
      }
    })();
  }, [pendingCheckDone]);

  // Loading state for filtering
  const [filteringLoading, setFilteringLoading] = useState(false);
  // Filter riders by pickup location and radius, and calculate estimated trip distance/cost
  useEffect(() => {
    const fetchEstimates = async () => {
      setFilteringLoading(true);
      if (!filters.pickup || !filters.radiusKm || !filters.destination) {
        // Only filter by radius if no destination
        const radius = Math.max(0.05, parseFloat(filters.radiusKm) || 0.05); // in km
        const filtered = allRiders
          .map(rider => {
            let dist = Infinity;
            if (filters.pickup) {
              dist = getDistance(
                { latitude: filters.pickup.latitude, longitude: filters.pickup.longitude },
                { latitude: rider.latitude, longitude: rider.longitude }
              ) / 1000;
            }
            return {
              ...rider,
              _distanceKm: dist
            };
          })
          .filter(rider => rider._distanceKm <= radius)
          .sort((a, b) => a._distanceKm - b._distanceKm);
        setFilteredRiders(filtered);
        setFilteringLoading(false);
        return;
      }
      // If both pickup and destination are set, calculate trip distance and cost for each rider
      const radius = Math.max(0.05, parseFloat(filters.radiusKm) || 0.05); // in km
      const promises = allRiders.map(async rider => {
        let distToPickup = getDistance(
          { latitude: filters.pickup!.latitude, longitude: filters.pickup!.longitude },
          { latitude: rider.latitude, longitude: rider.longitude }
        ) / 1000;
        if (distToPickup > radius) return null;
        // Use OSRM to get route distance from pickup to destination
        let tripDistanceKm = 0;
        try {
          const url = `https://router.project-osrm.org/route/v1/driving/${filters.pickup!.longitude},${filters.pickup!.latitude};${filters.destination!.longitude},${filters.destination!.latitude}?overview=false`;
          const res = await axios.get(url);
          if (res.data.routes && res.data.routes.length > 0) {
            tripDistanceKm = res.data.routes[0].distance / 1000;
          } else {
            // fallback to geolib
            tripDistanceKm = getDistance(filters.pickup!, filters.destination!) / 1000;
          }
        } catch (err) {
          tripDistanceKm = getDistance(filters.pickup!, filters.destination!) / 1000;
        }
        const estimatedCost = Math.round((rider.transportRate || 0) * tripDistanceKm);
        return {
          ...rider,
          _distanceKm: distToPickup,
          _tripDistanceKm: tripDistanceKm,
          _estimatedCost: estimatedCost
        };
      });
      const ridersWithEstimates = (await Promise.all(promises)).filter(Boolean).sort((a, b) => a._distanceKm - b._distanceKm);
      setFilteredRiders(ridersWithEstimates);
      setFilteringLoading(false);
    };
    fetchEstimates();
  }, [allRiders, filters.pickup, filters.radiusKm, filters.destination]);

  // Polyline state for showing route from selected rider to pickup
  const [polylineCoords, setPolylineCoords] = useState<Array<{ latitude: number; longitude: number }>>([]);
  // Polyline for pickup -> destination (orange), computed when both pickup and destination present
  const [dropPolylineCoords, setDropPolylineCoords] = useState<Array<{ latitude: number; longitude: number }>>([]);
  // Route cache to avoid repeated OSRM calls: keyed by rider id
  const routeCache = useRef<Record<string, { pickup?: any[]; drop?: any[]; dropDistanceKm?: number }>>({});
  // Persist/load route cache to reduce OSRM calls
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('routeCache');
        if (raw) routeCache.current = JSON.parse(raw);
      } catch (e) {
        console.warn('Failed to load route cache', e);
      }
    })();
  }, []);
  const saveRouteCache = async () => {
    try {
      await AsyncStorage.setItem('routeCache', JSON.stringify(routeCache.current));
    } catch (e) {
      console.warn('Failed to save route cache', e);
    }
  };

  // Selected route distance (pickup -> destination) for the currently selected rider
  const [selectedRouteDistanceKm, setSelectedRouteDistanceKm] = useState<number | null>(null);

  // Selected rider id
  const [selectedRiderId, setSelectedRiderId] = useState<string | null>(null);

  // Update polyline when a rider is focused/selected
  useEffect(() => {
    const drawPolyline = async () => {
      if (!selectedRiderId || !filters.pickup) {
        setPolylineCoords([]);
        setDropPolylineCoords([]);
        setSelectedRouteDistanceKm(null);
        return;
      }
      const rider = filteredRiders.find(r => r.id === selectedRiderId);
      if (!rider) {
        setPolylineCoords([]);
        setDropPolylineCoords([]);
        setSelectedRouteDistanceKm(null);
        return;
      }

      // use cache if available
      const cache = routeCache.current[selectedRiderId] || {};
      if (cache.pickup) {
        setPolylineCoords(cache.pickup);
      } else {
        try {
          const url = `https://router.project-osrm.org/route/v1/driving/${rider.longitude},${rider.latitude};${filters.pickup!.longitude},${filters.pickup!.latitude}?overview=full&geometries=geojson`;
          const res = await axios.get(url);
          if (res.data.routes && res.data.routes.length > 0) {
            const coords = res.data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({ latitude: lat, longitude: lng }));
            setPolylineCoords(coords);
            routeCache.current[selectedRiderId] = { ...(routeCache.current[selectedRiderId] || {}), pickup: coords };
            saveRouteCache().catch(() => {});
          } else {
            const coords = [
              { latitude: rider.latitude, longitude: rider.longitude },
              { latitude: filters.pickup!.latitude, longitude: filters.pickup!.longitude }
            ];
            setPolylineCoords(coords);
            routeCache.current[selectedRiderId] = { ...(routeCache.current[selectedRiderId] || {}), pickup: coords };
            saveRouteCache().catch(() => {});
          }
        } catch (err) {
          const coords = [
            { latitude: rider.latitude, longitude: rider.longitude },
            { latitude: filters.pickup!.latitude, longitude: filters.pickup!.longitude }
          ];
          setPolylineCoords(coords);
          routeCache.current[selectedRiderId] = { ...(routeCache.current[selectedRiderId] || {}), pickup: coords };
        }
      }

      // pickup -> destination polyline
      if (filters.pickup && filters.destination) {
        if (cache.drop) {
          setDropPolylineCoords(cache.drop);
          setSelectedRouteDistanceKm(cache.dropDistanceKm ?? null);
        } else {
          try {
            const url2 = `https://router.project-osrm.org/route/v1/driving/${filters.pickup!.longitude},${filters.pickup!.latitude};${filters.destination!.longitude},${filters.destination!.latitude}?overview=full&geometries=geojson`;
            const res2 = await axios.get(url2);
            if (res2.data.routes && res2.data.routes.length > 0) {
              const coords2 = res2.data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({ latitude: lat, longitude: lng }));
              setDropPolylineCoords(coords2);
              const distKm = res2.data.routes[0].distance / 1000;
              setSelectedRouteDistanceKm(distKm);
              routeCache.current[selectedRiderId] = { ...(routeCache.current[selectedRiderId] || {}), drop: coords2, dropDistanceKm: distKm };
              saveRouteCache().catch(() => {});
            } else {
              const coords2 = [
                { latitude: filters.pickup!.latitude, longitude: filters.pickup!.longitude },
                { latitude: filters.destination!.latitude, longitude: filters.destination!.longitude }
              ];
              setDropPolylineCoords(coords2);
              setSelectedRouteDistanceKm(null);
              routeCache.current[selectedRiderId] = { ...(routeCache.current[selectedRiderId] || {}), drop: coords2 };
              saveRouteCache().catch(() => {});
            }
          } catch (err) {
            const coords2 = [
              { latitude: filters.pickup!.latitude, longitude: filters.pickup!.longitude },
              { latitude: filters.destination!.latitude, longitude: filters.destination!.longitude }
            ];
            setDropPolylineCoords(coords2);
            setSelectedRouteDistanceKm(null);
            routeCache.current[selectedRiderId] = { ...(routeCache.current[selectedRiderId] || {}), drop: coords2 };
          }
        }
      } else {
        setDropPolylineCoords([]);
        setSelectedRouteDistanceKm(null);
      }
    };
    drawPolyline();
  }, [selectedRiderId, filters.pickup, filters.destination, filteredRiders]);
  const [loadingRiders, setLoadingRiders] = useState<{
    [id: string]: boolean;
  }>({});
  const [paymentMethod, setPaymentMethod] = useState<'MiFedha' | 'Cash'>('Cash');
  const [pickupText, setPickupText] = useState('Current Location');
  const [destinationText, setDestinationText] = useState('');
  const mapRef = useRef<MapView | null>(null);
  const carouselRef = useRef<FlatList | null>(null);
  const carouselPosition = useRef(new Animated.Value(SCREEN_HEIGHT * 0.6)).current;

  // ---------- Notification Handlers ----------
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.notification?.title || "Notification", remoteMessage.notification?.body || "You have a new message");
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Background notification:", remoteMessage);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const {
          status
        } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied', 'Location permission is required to show the map.');
          return;
        }
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });
        const coords = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        };
        setUserLocation(coords);

        // also set pickup to current location if not already set
        setFilters(prev => ({
          ...prev,
          pickup: prev.pickup || coords
        }));
      } catch (err) {
        console.warn('Error fetching location:', err);
      }
    })();
  }, []);

  // ---------- Focus rider ----------
  const focusOnRider = useCallback((rider: any, index: number) => {
    setSelectedRiderId(rider.id);
    mapRef.current?.animateToRegion({
      latitude: rider.latitude,
      longitude: rider.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }, 300);
    try {
      carouselRef.current?.scrollToIndex({
        index,
        animated: true
      });
    } catch {}
    Animated.spring(carouselPosition, {
      toValue: SCREEN_HEIGHT * 0.6,
      useNativeDriver: false
    }).start();
  }, [carouselPosition]);

  // ---------- Fetch place details ----------
  const fetchPlaceDetails = (place: any, type: 'pickup' | 'destination') => {
    if (!place?.location) return;
    setFilters(prev => ({
      ...prev,
      [type]: place.location
    }));
    if (type === 'pickup') {
      setPickupText(place.displayName || 'Pickup');
      setPickupInput(place.displayName || '');
    } else {
      setDestinationText(place.displayName || 'Destination');
      setDestinationInput(place.displayName || '');
    }
  };

  // ---------- Confirm ride ----------
  const confirmAndRequestRide = (rider: any) => {
    Alert.alert('Confirm Ride', `Request ride from ${rider.transportName || 'Rider'}?\nEstimated cost: KES ${Math.round(rider._estimatedCost || 0)}\nDistance: ${(rider._tripDistanceKm || 0).toFixed(2)} km`, [{
      text: 'Cancel',
      style: 'cancel'
    }, {
      text: 'Confirm',
      onPress: () => requestRide(rider)
    }]);
  };

  // ---------- Request ride ----------
  const requestRide = async (rider: any) => {
    if (!filters.pickup || !filters.destination) {
      Alert.alert('Pick locations', 'Select both pickup and destination.');
      return;
    }
    try {
      setLoadingRiders(prev => ({ ...prev, [rider.id]: true }));
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      // Check for pending ride requests for this passenger
      const pendingRes: any = await client.graphql({
        query: listRideRequests,
        variables: {
          filter: {
            passengerEmail: { eq: attributes.email },
            rideStatus: { ne: 'Completed' }
          },
          limit: 10
        }
      });
      const pendingRides = pendingRes?.data?.listRideRequests?.items || [];
      if (pendingRides.length > 0) {
        Alert.alert(
          'Pending Rides',
          'You have pending ride requests. Do you want to proceed with a new request or view your pending rides?',
          [
            {
              text: 'Go to Pending Rides',
              onPress: () => navigation.navigate('RideTrackingScreen', { pendingRides })
            },
            {
              text: 'Proceed',
              onPress: async () => await actuallyRequestRide(rider, attributes, user)
            },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
        setLoadingRiders(prev => ({ ...prev, [rider.id]: false }));
        return;
      }
      await actuallyRequestRide(rider, attributes, user);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to request ride.');
    } finally {
      setLoadingRiders(prev => ({ ...prev, [rider.id]: false }));
    }
  };

  // Helper to actually request ride
  const actuallyRequestRide = async (rider: any, attributes: any, user: any) => {
    const userDtls: any = await client.graphql({
      query: getSMAccount,
      variables: { awsemail: attributes.email }
    });
    const passengerInfo = userDtls.data.getSMAccount;
    if (!passengerInfo) {
      Alert.alert('No Account', 'Please create a Main Account first.');
      return;
    }

    // Ensure we use authoritative TransportRegister data for the rider
    let transporter: any = null;
    try {
      const trRes: any = await client.graphql({ query: getTransportRegister, variables: { id: rider.id } });
      transporter = trRes?.data?.getTransportRegister || null;
    } catch (err) {
      console.warn('Failed to fetch transport register for rider, falling back to card data', err);
      transporter = null;
    }

    const selectedRider = transporter || rider;

    const input = {
      passengerEmail: attributes.email,
      passengerName: passengerInfo.name,
      passengerContact: attributes.phone_contact,
      pickupLatitude: filters.pickup!.latitude,
      pickupLongitude: filters.pickup!.longitude,
      destinationLatitude: filters.destination!.latitude,
      destinationLongitude: filters.destination!.longitude,
      distance: rider._tripDistanceKm || 0,
      estimatedCost: rider._estimatedCost || 0,
      selectedRiderID: selectedRider.id,
      riderName: selectedRider.transportName || selectedRider.transportName,
      riderContact: selectedRider.transportkntct || selectedRider.transportkntct,
      riderRate: selectedRider.transportRate || selectedRider.transportRate || 0,
      paymentMethod,
      paymentStatus: 'NotCleared',
      rideStatus: 'transportRequestYes',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      riderLatitude: Number(selectedRider.latitude) || Number(rider.latitude) || 0,
      riderLongitude: Number(selectedRider.longitude) || Number(rider.longitude) || 0
    };
    const rideRes: any = await client.graphql({
      query: createRideRequest,
      variables: { input }
    });
    const ride = rideRes?.data?.createRideRequest;
    if (ride) {
      Alert.alert('Ride requested', `Ride request sent to ${rider.transportName || 'Rider'}.`);
      // 🔔 Trigger backend Lambda to send push notification
      const riderEmail = rider.transportOwnerEmail;
      if (!riderEmail) {
        Alert.alert('Error', 'Rider email is missing. Cannot send notification.');
      } else {
        await client.graphql({
          query: sendNotification,
          variables: {
            riderEmail,
            title: "MiFedha: New Ride Request",
            body: `Passenger ${ride.passengerName} requested a ride. Estimated cost: KES ${ride.estimatedCost}`
          }
        });
      }
      navigation.navigate('RideTrackingScreen', { rideId: ride.id });
    }
  };
  if (!pendingCheckDone || !userLocation) {
    return <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading…</Text>
      </View>;
  }
  // Keep map fitted to current polylines when they change
  useEffect(() => {
    if (!mapRef.current) return;
    const coords = [...polylineCoords, ...dropPolylineCoords];
    if (coords.length > 1) {
      try {
        (mapRef.current as any).fitToCoordinates(coords, {
          edgePadding: { top: 80, right: 80, bottom: 240, left: 80 },
          animated: true
        });
      } catch (e) {}
    }
  }, [polylineCoords, dropPolylineCoords]);

  return <View style={{
    flex: 1
  }}>
      {/* Map */}
      <MapView ref={mapRef} style={{
        flex: 1
      }} showsUserLocation initialRegion={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      }}>
        {/* Riders: custom marker showing numberPlate (if available) or price */}
        {filteredRiders.map((rider, idx) => (
          <Marker key={rider.id} coordinate={{ latitude: rider.latitude, longitude: rider.longitude }} onPress={() => focusOnRider(rider, idx)}>
            <View style={[styles.markerContainer, selectedRiderId === rider.id && styles.selectedMarker]}>
              <Text style={styles.markerText}>{selectedRiderId === rider.id ? `🚗 ${rider.numberPlate || rider.transportName?.slice(0,6)}` : `KES ${Math.round(rider._estimatedCost || 0)}`}</Text>
            </View>
          </Marker>
        ))}

        {/* Pickup marker */}
        {filters.pickup && (
          <Marker coordinate={{ latitude: filters.pickup.latitude, longitude: filters.pickup.longitude }}>
            <View style={{ backgroundColor: '#27ae60', padding: 6, borderRadius: 6 }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>📍 Pick up</Text>
            </View>
          </Marker>
        )}

        {/* Destination marker */}
        {filters.destination && (
          <Marker coordinate={{ latitude: filters.destination.latitude, longitude: filters.destination.longitude }}>
            <View style={{ backgroundColor: '#9b59b6', padding: 6, borderRadius: 6 }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>🎯 Destination</Text>
            </View>
          </Marker>
        )}

        {/* Rider -> Pickup (blue) */}
        {polylineCoords.length > 1 && (
          <Polyline coordinates={polylineCoords} strokeColor="blue" strokeWidth={4} />
        )}

        {/* Pickup -> Destination (orange) */}
        {dropPolylineCoords.length > 1 && (
          <Polyline coordinates={dropPolylineCoords} strokeColor="#e58d29" strokeWidth={4} />
        )}
      </MapView>

      {/* Filter/Search Panel */}
      <View style={styles.filterPanel}>
        <GooglePlacesAutocompleteNew
          placeholder="Pickup location"
          value={pickupInput}
          onValueChange={setPickupInput}
          onPlaceSelected={(place: any) => fetchPlaceDetails(place, 'pickup')}
          clearOnSelect={false}
        />
        <GooglePlacesAutocompleteNew
          placeholder="Destination"
          value={destinationInput}
          onValueChange={setDestinationInput}
          onPlaceSelected={(place: any) => fetchPlaceDetails(place, 'destination')}
          clearOnSelect={false}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Radius (km)"
            value={filters.radiusKm}
            keyboardType="numeric"
            onChangeText={t => setFilters(f => ({ ...f, radiusKm: t }))}
            style={[styles.smallInput, { width: 80, marginTop: 6 }]}
          />
          {filteringLoading && (
            <ActivityIndicator size="small" color="#e58d29" style={{ marginLeft: 8, marginTop: 6 }} />
          )}
        </View>
      </View>

      {/* Payment */}
      
      {/* Payment Method Toggle */}
    <View style={styles.paymentToggle}>

   <TouchableOpacity style={[styles.payBtn, paymentMethod === 'MiFedha' && styles.payBtnActive]}>
    <Text style={[styles.payTxt, paymentMethod === 'MiFedha' && styles.payTxtActive]}>
      Payment method
    </Text>
  </TouchableOpacity>

   <TouchableOpacity style={[styles.payBtn, paymentMethod === 'Cash' && styles.payBtnActive]} onPress={() => setPaymentMethod('Cash')}>

    
    <Text style={[styles.payTxt, paymentMethod === 'Cash' && styles.payTxtActive]}>
      Cash
    </Text>
  </TouchableOpacity>
  
  <TouchableOpacity style={[styles.payBtn, paymentMethod === 'MiFedha' && styles.payBtnActive]} onPress={() => setPaymentMethod('MiFedha')}>
    <Text style={[styles.payTxt, paymentMethod === 'MiFedha' && styles.payTxtActive]}>
      MiFedha
    </Text>
  </TouchableOpacity>
 

 
    </View>


      {/* Carousel */}
      <Animated.View style={[styles.carouselContainer, {
      top: carouselPosition
    }]}>
        <FlatList ref={carouselRef} data={filteredRiders} horizontal keyExtractor={item => item.id} showsHorizontalScrollIndicator={false} renderItem={({
        item,
        index
      }) => <TouchableOpacity style={[styles.card, selectedRiderId === item.id && styles.cardSelected]} onPress={() => focusOnRider(item, index)} onLongPress={() => confirmAndRequestRide(item)}>
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
              Est: KES {Math.round(item._estimatedCost || 0)} || {selectedRiderId === item.id && selectedRouteDistanceKm != null ? selectedRouteDistanceKm.toFixed(2) : (item._tripDistanceKm || 0).toFixed(2)} km
            </Text>
            {/* New button for TransportDetails */}
            <TouchableOpacity
              style={[styles.requestBtn, { backgroundColor: '#4CAF50', marginTop: 6 }]}
              onPress={() => navigation.navigate('TransportDetails', { riderId: item.id })}
            >
              <Text style={{ color: '#fff' }}>View Details</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.requestBtn} onPress={() => confirmAndRequestRide(item)}>
            {loadingRiders[item.id] ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff' }}>Request</Text>}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>} />
      </Animated.View>
    </View>;
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterPanel: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    elevation: 6,
    zIndex: 5
  },
  smallInput: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 6,
    fontSize: 12
  },
  paymentToggle: {
    position: 'absolute',
    top: 250,
    left: 12,
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 4,
    borderRadius: 8,
    elevation: 6
  },
  payBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6
  },
  payBtnActive: {
    backgroundColor: '#e58d29'
  },
  payTxt: {
    color: '#333'
  },
  payTxtActive: {
    color: '#fff'
  },
  carouselContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: 140,
    backgroundColor: 'rgba(255,255,255,0.95)',
    zIndex: 10,
    bottom: 12,
    paddingTop: 6
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    width: SCREEN_WIDTH * 0.82,
    elevation: 3
  },
  cardSelected: {
    borderColor: '#1f8ef1',
    borderWidth: 2
  },
  thumbPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#e58d29',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerContainer: {
    backgroundColor: '#1f8ef1',
    padding: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedMarker: {
    backgroundColor: '#e58d29'
  },
  markerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12
  },
  requestBtn: {
    backgroundColor: '#1f8ef1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8
  }
});