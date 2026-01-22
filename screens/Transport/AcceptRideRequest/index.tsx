import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Animated,
  AppState,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import axios from 'axios';

import {
  listRideRequests,
  getSMAccount,
  getTransportRegister,
  getCompany,
  getRideRequest,
} from '../../../src/graphql/queries';
import {
  updateRideRequest,
  updateSMAccount,
  updateTransportRegister,
  updateCompany,
} from '../../../src/graphql/mutations';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MIN_PICKUP_DISTANCE = 0.2; // km
const MIN_REAL_MOVEMENT_KM = 0.150; // 30m
const COMPANY_ADMIN_ID = "BaruchHabaB'ShemAdonai2";

const GOOGLE_MAPS_API_KEY = "AIzaSyA0rFIOCDBr3WI-I4SGHGPFLUW7bWSAnvA";

export default function RiderRideRequestScreen() {
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userContact, setUserContact] = useState<string | null>(null);
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const [riderLocation, setRiderLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [tripStarted, setTripStarted] = useState(false);

  const mapRef = useRef<MapView | null>(null);
  const carouselRef = useRef<FlatList | null>(null);
  // Triggers carousel re-render whenever distance/cost changes
const [rideMetricsTick, setRideMetricsTick] = useState(0);

  const carouselPosition = useRef(new Animated.Value(SCREEN_HEIGHT * 0.62)).current;
  const appState = useRef(AppState.currentState);

  const locationSubscription = useRef<Location.LocationSubscription | null>(null);
  const lastLocationRef = useRef<{ latitude: number; longitude: number } | null>(null);
  const lastCameraCenter = useRef<{ latitude: number; longitude: number } | null>(null);
  const routeCache = useRef<Record<string, { pickup?: any[]; drop?: any[] }>>({});
  const cumulativeDistanceRef = useRef<Record<string, number>>({});
  const cumulativeCostRef = useRef<Record<string, number>>({});
  const routeToPickupRef = useRef<any[]>([]);
  const routeToDropRef = useRef<any[]>([]);
const updateIntervalRef = useRef<number | null>(null);

  const [polylineTick, setPolylineTick] = useState(0);


  useEffect(() => {
  const init = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const contact = user.attributes?.phone_number;
      setUserContact(contact);
      await fetchRides(contact);
    } catch (err) {
      console.error('Failed to fetch user or rides', err);
    }
  };
  init();
}, []);


  const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const decodePolyline = (t: string) => {
    let points: any[] = [];
    let index = 0, lat = 0, lng = 0;
    while (index < t.length) {
      let b, shift = 0, result = 0;
      do { b = t.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
      const dlat = (result & 1) ? ~(result >> 1) : result >> 1;
      lat += dlat; shift = 0; result = 0;
      do { b = t.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
      const dlng = (result & 1) ? ~(result >> 1) : result >> 1;
      lng += dlng;
      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  const routeFetchTimestamps = useRef<Record<string, number>>({});
  const ROUTE_FETCH_THROTTLE_MS = 10_000;

  const fetchRoute = useCallback(async (start: { latitude: number; longitude: number }, end: { latitude: number; longitude: number }) => {
    try {
      if (!GOOGLE_MAPS_API_KEY) return [];
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`;
      const res = await axios.get(url);
      if (res.data.routes?.length) return decodePolyline(res.data.routes[0].overview_polyline.points);
      return [];
    } catch (err) {
      console.error('fetchRoute error', err);
      return [];
    }
  }, []);




  //part 2
    const maybeAnimateCamera = (newLoc: any) => {
    const last = lastCameraCenter.current;
    const moved = last ? getDistanceKm(last.latitude, last.longitude, newLoc.latitude, newLoc.longitude) : Infinity;
    if (moved > 0.01 && mapRef.current) {
      try {
        (mapRef.current as any).animateCamera?.({ center: newLoc, zoom: 15 }, { duration: 300 }) ||
        (mapRef.current as any).animateToRegion?.({ ...newLoc, latitudeDelta: 0.01, longitudeDelta: 0.01 }, 300);
      } catch (e) {}
      lastCameraCenter.current = newLoc;
    }
  };

const fetchCachedRoute = useCallback(async (ride: any, currentLoc: any) => {
  if (!ride?.id) return;
  const now = Date.now();
  const stampKey = `${ride.id}-${ride.rideStatus}`;
  if (routeFetchTimestamps.current[stampKey] && now - routeFetchTimestamps.current[stampKey] < ROUTE_FETCH_THROTTLE_MS) return;
  routeFetchTimestamps.current[stampKey] = now;

  const cache = routeCache.current[ride.id] || {};
  const isPickup = ride.rideStatus === 'TransportApproved';
  const target = isPickup
    ? { latitude: ride.pickupLatitude, longitude: ride.pickupLongitude }
    : { latitude: ride.destinationLatitude, longitude: ride.destinationLongitude };
  const routeType = isPickup ? 'pickup' : 'drop';

  if (cache[routeType]) {
    if (routeType === 'pickup') routeToPickupRef.current = cache.pickup!;
    else routeToDropRef.current = cache.drop!;
    setPolylineTick(t => t + 1);
    return;
  }

  const start = currentLoc || lastCameraCenter.current || { latitude: ride.pickupLatitude, longitude: ride.pickupLongitude };
  const route = await fetchRoute(start, target);
  routeCache.current[ride.id] = { ...cache, [routeType]: route };
  if (routeType === 'pickup') routeToPickupRef.current = route;
  else routeToDropRef.current = route;
  setPolylineTick(t => t + 1);
}, [fetchRoute]);



const startTrackingRide = useCallback(async (ride: any) => {
  if (!ride) return;

  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Location permission required');
    return;
  }

  // Remove any existing location subscription
  if (locationSubscription.current) {
    try { locationSubscription.current.remove(); } catch (e) {}
    locationSubscription.current = null;
  }

 
locationSubscription.current = await Location.watchPositionAsync(
  {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 5000,
    distanceInterval: 10,
  },
  async loc => {
    if (!ride?.id || !selectedRideId) return;
    if (ride.id !== selectedRideId) return; // track only selected ride

    const lat = loc.coords.latitude;
    const lng = loc.coords.longitude;
    const newLoc = { latitude: lat, longitude: lng };
    const prev = lastLocationRef.current;

    const smoothLoc = prev
      ? { latitude: 0.7 * prev.latitude + 0.3 * newLoc.latitude, longitude: 0.7 * prev.longitude + 0.3 * newLoc.longitude }
      : newLoc;

    const movedKm = prev ? getDistanceKm(prev.latitude, prev.longitude, smoothLoc.latitude, smoothLoc.longitude) : Infinity;
    if (movedKm < MIN_REAL_MOVEMENT_KM) return;

    // Always track distance & cost for selected ride
    const rate = Number(ride.riderRate || 0);
    cumulativeDistanceRef.current[ride.id] = (cumulativeDistanceRef.current[ride.id] || 0) + movedKm;
    cumulativeCostRef.current[ride.id] = (cumulativeCostRef.current[ride.id] || 0) + movedKm * rate;

    setRideMetricsTick(t => t + 1); // trigger carousel re-render

    lastLocationRef.current = smoothLoc;
    setRiderLocation(smoothLoc);

    try { await fetchCachedRoute(ride, smoothLoc); } catch (err) {}

    maybeAnimateCamera(smoothLoc);
  }
);




  // Clear any existing update interval
  if (updateIntervalRef.current) {
    clearInterval(updateIntervalRef.current);
    updateIntervalRef.current = null;
  }

  // Start 30-second auto-update interval
  updateIntervalRef.current = setInterval(async () => {
    if (!ride.id || !lastLocationRef.current) return;

    const movedKm = cumulativeDistanceRef.current[ride.id] || 0;
    if (movedKm >= MIN_REAL_MOVEMENT_KM) {
      try {
        await API.graphql(graphqlOperation(updateRideRequest, {
          input: {
            id: ride.id,
            riderLatitude: lastLocationRef.current.latitude,
            riderLongitude: lastLocationRef.current.longitude,
            estimatedCost: cumulativeCostRef.current[ride.id] || 0,
            distance: cumulativeDistanceRef.current[ride.id] || 0,
          },
        }));
        console.log(`Rider location auto-updated for ride ${ride.id}`);
      } catch (err) {
        console.error('Auto-update error', err);
      }
    }
  }, 30_000) as unknown as number;

}, [tripStarted, fetchCachedRoute, maybeAnimateCamera]);


const stopTracking = useCallback(() => {
  if (locationSubscription.current) {
    try { locationSubscription.current.remove(); } catch (e) {}
    locationSubscription.current = null;
  }

  if (updateIntervalRef.current) {
    try { clearInterval(updateIntervalRef.current); } catch (e) {}
    updateIntervalRef.current = null;
  }
}, []);



const fetchRides = useCallback(async (userContact: string) => {
  setLoading(true);
  try {
    const res: any = await API.graphql(
      graphqlOperation(listRideRequests, {
        filter: {
          and: [
            { riderContact: { eq: userContact } },

            {
              or: [
                { rideStatus: { eq: 'transportRequestYes' } },
                { rideStatus: { eq: 'TransportApproved' } },
                { rideStatus: { eq: 'TransportEngaged' } },
                { rideStatus: { eq: 'Active' } },

                // NEW: Completed but NOT cleared
                {
                  and: [
                    { rideStatus: { eq: 'Completed' } },
                    { paymentStatus: { ne: 'Cleared' } }
                  ]
                }
              ]
            },

            // Still hide cancelled rides
            { rideStatus: { ne: 'Cancelled' } }
          ]
        }
      })
    );

    setRides(res?.data?.listRideRequests?.items || []);

  } catch (err) {
    console.error('fetchRides error:', err);
    Alert.alert('Error', 'Failed to fetch ride requests.');
  } finally {
    setLoading(false);
  }
}, []);


  const processMiFedhaPayment = useCallback(
  async (ride: any): Promise<boolean> => {
    if (!ride || !ride.id) return false;

    try {
      const totalFare = Number(cumulativeCostRef.current[ride.id] ?? ride.estimatedCost ?? 0);
      if (totalFare <= 0) {
        Alert.alert('Payment', 'No fare to charge.');
        return false;
      }

      const passengerEmail = ride.passengerEmail;

      // Get passenger SMAccount
      const smRes: any = await API.graphql(graphqlOperation(getSMAccount, { awsemail: passengerEmail }));
      const sm = smRes?.data?.getSMAccount;
      if (!sm) {
        Alert.alert('Payment error', 'Passenger account not found.');
        return false;
      }

      const passengerBalance = Number(sm.balance ?? 0);

      const transporterRes: any = await API.graphql(
        graphqlOperation(getTransportRegister, { id: ride.selectedRiderID })
      );
      const transporter = transporterRes?.data?.getTransportRegister;

      if (passengerBalance < totalFare) {
        // Payment pending → mark overdue
        await API.graphql(graphqlOperation(updateRideRequest, {
          input: {
            id: ride.id,
            rideStatus: 'Completed',
            paymentStatus: 'Pending',
            endTime: new Date().toISOString(),
            estimatedCost: totalFare,
            distance: cumulativeDistanceRef.current[ride.id] || ride.distance || 0,
          },
        }));

        if (transporter) {
          await API.graphql(graphqlOperation(updateTransportRegister, {
            input: {
              id: transporter.id,
              overdue: true,
            },
          }));
        }

        Alert.alert('Insufficient funds', 'Passenger MiFedha balance insufficient. Marked as pending.');
        if (userContact) fetchRides(userContact);
        return true; // Overdue
      }

      // Payment succeeds
      const companyRes: any = await API.graphql(graphqlOperation(getCompany, { AdminId: COMPANY_ADMIN_ID }));
      const company = companyRes?.data?.getCompany;
      const companySharePct = Number(company?.transportCompanyShare ?? 0) / 100;
      const companyShare = totalFare * companySharePct;
      const transporterShare = totalFare - companyShare;

      // Deduct passenger balance
      await API.graphql(graphqlOperation(updateSMAccount, {
        input: { awsemail: passengerEmail, balance: passengerBalance - totalFare },
      }));

      // Update transporter earnings
      if (transporter) {
        const newEarnings = Number(transporter.Earnings ?? 0) + transporterShare;
        await API.graphql(graphqlOperation(updateTransportRegister, {
          input: {
            id: transporter.id,
            Earnings: newEarnings,
            lastForwardedTime: new Date().toISOString(),
            overdue: false,
          },
        }));
      }

      // Update company earnings
      if (company) {
        const companyEarning = Number(company.companyEarning ?? 0) + companyShare;
        const companyEarningBal = Number(company.companyEarningBal ?? 0) + companyShare;
        await API.graphql(graphqlOperation(updateCompany, { input: { AdminId: COMPANY_ADMIN_ID, companyEarning, companyEarningBal } }));
      }

      // Mark ride completed & paid
      await API.graphql(graphqlOperation(updateRideRequest, {
        input: {
          id: ride.id,
          rideStatus: 'Completed',
          paymentStatus: 'Cleared',
          endTime: new Date().toISOString(),
          estimatedCost: totalFare,
          distance: cumulativeDistanceRef.current[ride.id] || ride.distance || 0,
        },
      }));

      // Reset local tracking
      cumulativeCostRef.current[ride.id] = 0;
      cumulativeDistanceRef.current[ride.id] = 0;
      lastLocationRef.current = null;
      stopTracking();
      setTripStarted(false);

      Alert.alert('Payment successful', `Charged KES ${totalFare.toFixed(2)} from ${passengerEmail}.`);
      if (userContact) fetchRides(userContact);

      return false; // Not overdue
    } catch (err) {
      console.error('processMiFedhaPayment error', err);
      Alert.alert('Payment error', 'Could not complete MiFedha payment.');
      return false;
    }
  },
  [fetchRides, stopTracking, userContact]
);


const focusOnRide = useCallback(
  async (ride: any, index: number) => {
    if (!ride) return;

    // 1️⃣ Select ride and initialize cumulative metrics
    setSelectedRideId(ride.id);
    if (!cumulativeDistanceRef.current[ride.id]) cumulativeDistanceRef.current[ride.id] = 0;
    if (!cumulativeCostRef.current[ride.id]) cumulativeCostRef.current[ride.id] = 0;
    setTripStarted(ride.rideStatus === 'Active');

    // 2️⃣ Get current location immediately
    let currentLoc = riderLocation;
    try {
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
      currentLoc = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
      lastLocationRef.current = currentLoc;
      setRiderLocation(currentLoc);

      // Push immediate location to backend
      await API.graphql(
        graphqlOperation(updateRideRequest, {
          input: {
            id: ride.id,
            riderLatitude: currentLoc.latitude,
            riderLongitude: currentLoc.longitude,
          },
        })
      );
      console.log(`Immediate rider location update for ride ${ride.id}`);
    } catch (err) {
      console.error('Immediate location fetch/update failed', err);
      // fallback
      currentLoc = riderLocation || { latitude: ride.pickupLatitude, longitude: ride.pickupLongitude };
    }

    // 3️⃣ Center map on current location
    if (mapRef.current) {
      maybeAnimateCamera(currentLoc);
    }

    // 4️⃣ Scroll carousel to the selected ride
    try {
      carouselRef.current?.scrollToIndex({ index, animated: true });
    } catch (e) {
      console.warn('Carousel scroll failed:', e);
    }

    // 5️⃣ Expand the carousel panel
    Animated.spring(carouselPosition, {
      toValue: SCREEN_HEIGHT * 0.62,
      useNativeDriver: false,
    }).start();

    // 6️⃣ Fetch route to pickup or drop if needed
    try {
      const isPickup = ride.rideStatus === 'TransportApproved';
      const target = isPickup
        ? { latitude: ride.pickupLatitude, longitude: ride.pickupLongitude }
        : { latitude: ride.destinationLatitude, longitude: ride.destinationLongitude };

      const route = await fetchRoute(currentLoc, target);
      routeCache.current[ride.id] = {
        ...(routeCache.current[ride.id] || {}),
        [isPickup ? 'pickup' : 'drop']: route,
      };

      if (isPickup) routeToPickupRef.current = route;
      else routeToDropRef.current = route;

      setPolylineTick(t => t + 1);
    } catch (e) {
      console.warn('Immediate route fetch failed:', e);
    }

    // 7️⃣ Start live tracking for distance/cost updates
    if (ride.rideStatus === 'TransportApproved' || ride.rideStatus === 'Active') {
      await startTrackingRide(ride);
    }
  },
  [riderLocation, maybeAnimateCamera, startTrackingRide, carouselPosition, fetchRoute]
);







const manualClearPayment = useCallback(
  async (ride: any): Promise<boolean> => {
    if (!ride || !ride.id) return false;

    try {
      const totalFare = Number(cumulativeCostRef.current[ride.id] ?? ride.estimatedCost ?? 0);
      if (totalFare <= 0) {
        Alert.alert('No fare', 'No fare recorded to clear.');
        return false;
      }

      const transporterRes: any = await API.graphql(
        graphqlOperation(getTransportRegister, { id: ride.selectedRiderID })
      );
      const transporter = transporterRes?.data?.getTransportRegister;
      if (!transporter) return false;

      const companyRes: any = await API.graphql(graphqlOperation(getCompany, { AdminId: COMPANY_ADMIN_ID }));
      const company = companyRes?.data?.getCompany;

      const companySharePct = Number(company?.transportCompanyShare ?? 0) / 100;
      const companyShare = totalFare * companySharePct;
      const transporterShare = totalFare - companyShare;

      // Deduct company share from transporter SMAccount
      const transporterEmail = transporter.transportOwnerEmail; // authenticated user
      const smRes: any = await API.graphql(graphqlOperation(getSMAccount, { awsemail: transporterEmail }));
      const smAccount = smRes?.data?.getSMAccount;
      const transporterBalance = Number(smAccount?.balance ?? 0);

      if (transporterBalance < companyShare) {
        // Not enough to forward → mark overdue
        await API.graphql(graphqlOperation(updateTransportRegister, {
          input: {
            id: transporter.id,
            overdue: true,
          },
        }));

        Alert.alert('Insufficient funds', 'You do not have enough balance to forward company share.');
        return true; // Overdue
      }

      // Deduct company share
      await API.graphql(graphqlOperation(updateSMAccount, {
        input: { awsemail: transporterEmail, balance: transporterBalance - companyShare },
      }));

      // Update transporter earnings
      const newEarnings = Number(transporter.Earnings ?? 0) + transporterShare;
      await API.graphql(graphqlOperation(updateTransportRegister, {
        input: {
          id: transporter.id,
          Earnings: newEarnings,
          lastForwardedTime: new Date().toISOString(),
          overdue: false,
        },
      }));

      // Update company earnings
      if (company) {
        const companyEarning = Number(company.companyEarning ?? 0) + companyShare;
        const companyEarningBal = Number(company.companyEarningBal ?? 0) + companyShare;
        await API.graphql(graphqlOperation(updateCompany, {
          input: { AdminId: COMPANY_ADMIN_ID, companyEarning, companyEarningBal },
        }));
      }

      // Mark ride completed & paid
      await API.graphql(graphqlOperation(updateRideRequest, {
        input: {
          id: ride.id,
          rideStatus: 'Completed',
          paymentStatus: 'Cleared',
          endTime: new Date().toISOString(),
          estimatedCost: totalFare,
          distance: cumulativeDistanceRef.current[ride.id] || ride.distance || 0,
        },
      }));

      // Reset local tracking
      cumulativeCostRef.current[ride.id] = 0;
      cumulativeDistanceRef.current[ride.id] = 0;
      lastLocationRef.current = null;
      stopTracking();
      setTripStarted(false);

      Alert.alert('Payment cleared', 'Company share forwarded successfully.');
      if (userContact) fetchRides(userContact);

      return false; // Not overdue
    } catch (err) {
      console.error('manualClearPayment error', err);
      Alert.alert('Error', 'Could not clear payment.');
      return false;
    }
  },
  [fetchRides, stopTracking, userContact]
);



const updateStatus = useCallback(
  async (status: string) => {
    if (!selectedRideId) return;
    const ride = rides.find(r => r.id === selectedRideId);
    if (!ride) return;

    // Check distance before starting trip
    if (status === 'Active' && riderLocation) {
      const distanceToPickup = getDistanceKm(
        riderLocation.latitude,
        riderLocation.longitude,
        ride.pickupLatitude,
        ride.pickupLongitude
      );
      if (distanceToPickup > MIN_PICKUP_DISTANCE) {
        Alert.alert('Too far from pickup', `You are ${distanceToPickup.toFixed(2)} km away from the pickup point.`);
        return;
      }
    }

    try {
      if (status === 'Completed') {
        // Fetch fresh ride to avoid stale data
        const rideRes: any = await API.graphql(graphqlOperation(getRideRequest, { id: selectedRideId }));
        const freshRide = rideRes?.data?.getRideRequest ?? ride;

        // Update ride status first
        await API.graphql(graphqlOperation(updateRideRequest, {
          input: { id: selectedRideId, rideStatus: 'Completed', endTime: new Date().toISOString() },
        }));

        // Handle payment depending on method
        if (freshRide.paymentMethod === 'MiFedha') {
          // Passenger pays via MiFedha
          await processMiFedhaPayment(freshRide);
        } else {
          // Cash collected: only forward company share
          await manualClearPayment(freshRide);
        }

        // Refresh ride list
        if (userContact) fetchRides(userContact);

        // Stop local tracking
        stopTracking();
        setTripStarted(false);
        return;
      }

      // Other status updates (Active, Cancelled, etc.)
      await API.graphql(graphqlOperation(updateRideRequest, {
        input: { id: selectedRideId, rideStatus: status },
      }));

      if (status === 'Active') setTripStarted(true);
      if (status === 'Cancelled') {
        setTripStarted(false);
        routeToPickupRef.current = [];
        routeToDropRef.current = [];
        setPolylineTick(t => t + 1);
        stopTracking();
      }

      if (userContact) fetchRides(userContact);

    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to update status.');
    }
  },
  [selectedRideId, riderLocation, rides, userContact, fetchRides, processMiFedhaPayment, manualClearPayment, stopTracking]
);


const respondToRequest = useCallback(
  async (rideId: string, accept: boolean) => {
    try {
      const rideRes: any = await API.graphql(graphqlOperation(getRideRequest, { id: rideId }));
      const ride = rideRes?.data?.getRideRequest;
      if (!ride) {
        Alert.alert('Error', 'Ride not found.');
        return;
      }

      const newStatus = accept ? 'TransportApproved' : 'Cancelled';

      await API.graphql(graphqlOperation(updateRideRequest, {
        input: {
          id: rideId,
          rideStatus: newStatus,
          selectedRiderID: accept ? ride.selectedRiderID : null,
        },
      }));

      Alert.alert('Success', accept ? 'Ride accepted.' : 'Ride rejected.');
      if (userContact) fetchRides(userContact);
    } catch (err) {
      console.error('respondToRequest error', err);
      Alert.alert('Error', 'Failed to respond to ride request.');
    }
  },
  [userContact, fetchRides]
);









  //part 3
   
  
  const rideMarkers = useMemo(() => {
  return rides.map(ride => {
    const showRide = selectedRideId === ride.id;
    return (
      <React.Fragment key={ride.id}>
        {!tripStarted && showRide && (
          <Marker coordinate={{ latitude: ride.pickupLatitude, longitude: ride.pickupLongitude }}>
            <View style={{ backgroundColor: '#e58d29', padding: 6, borderRadius: 6 }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>Pickup</Text>
            </View>
          </Marker>
        )}
        {tripStarted && showRide && (
          <Marker coordinate={{ latitude: ride.destinationLatitude, longitude: ride.destinationLongitude }}>
            <View style={{ backgroundColor: '#e58d29', padding: 6, borderRadius: 6 }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Drop</Text>
            </View>
          </Marker>
        )}
        {riderLocation && showRide && (
          <Marker coordinate={riderLocation} pinColor="blue">
            <View style={{ backgroundColor: 'blue', padding: 6, borderRadius: 6 }}>
              <Text style={{ color: 'white', fontWeight: '700' }}>Rider</Text>
            </View>
          </Marker>
        )}
      </React.Fragment>
    );
  });
}, [rides, selectedRideId, riderLocation, tripStarted]);


  const activeRide = useMemo(() => rides.find(r => r.id === selectedRideId), [rides, selectedRideId]);

  const pickupPolyline = useMemo(() => {
    if (!activeRide) return null;
    if (activeRide.rideStatus === 'TransportApproved' && routeToPickupRef.current.length) {
      return <Polyline coordinates={routeToPickupRef.current} strokeColor="blue" strokeWidth={4} />;
    }
    return null;
  }, [polylineTick, selectedRideId, rides]);

  const dropPolyline = useMemo(() => {
    if (!activeRide) return null;
    if (activeRide.rideStatus === 'Active' && routeToDropRef.current.length) {
      return <Polyline coordinates={routeToDropRef.current} strokeColor="#e58d29" strokeWidth={4} />;
    }
    return null;
  }, [polylineTick, selectedRideId, rides]);

  const viewabilityConfigRef = useRef({ itemVisiblePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (!viewableItems || !viewableItems.length) return;
    const first = viewableItems[0];
    if (!first) return;
    const item = first.item;
    const index = first.index;
    if (!item) return;
    focusOnRide(item, index).catch(() => {});
  }).current;

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (!rides.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No active or pending ride requests at the moment</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation
        onRegionChangeComplete={(reg) => { lastCameraCenter.current = { latitude: reg.latitude, longitude: reg.longitude }; }}
        initialRegion={{
          latitude: rides[0].pickupLatitude,
          longitude: rides[0].pickupLongitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {rideMarkers}
        {pickupPolyline}
        {dropPolyline}
      </MapView>

    
    
    
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT * 0.18,
          maxHeight: 200,
          minHeight: 160,
          backgroundColor: 'rgba(255,255,255,0.98)',
          paddingTop: 6,
          paddingHorizontal: 6,
        }}
      >
<FlatList
  style={{ flexGrow: 0 }}
  contentContainerStyle={{ paddingBottom: 12 }}
  ref={carouselRef}
  data={rides.filter(r => r.rideStatus !== 'Cancelled' && r.paymentStatus !== 'Cleared')}
  extraData={rideMetricsTick} // ← important!
  horizontal
  keyExtractor={item => item.id}
  showsHorizontalScrollIndicator={false}
  onViewableItemsChanged={onViewableItemsChanged}
  viewabilityConfig={viewabilityConfigRef.current}
  renderItem={({ item, index }) => {
    const isSelected = selectedRideId === item.id;
    const { rideStatus } = item;
    let distanceText = '';
    let costText = '';

    if (tripStarted && selectedRideId === item.id) {
      const distance = cumulativeDistanceRef.current[item.id] ?? 0;
const cost = cumulativeCostRef.current[item.id] ?? item.estimatedCost ?? 0;
distanceText = `Distance: ${distance.toFixed(2)} km`;
costText = `KES ${cost.toFixed(2)}`;

    } else if (riderLocation && rideStatus === 'TransportApproved') {
      const distanceToPickup = getDistanceKm(
        riderLocation.latitude,
        riderLocation.longitude,
        item.pickupLatitude,
        item.pickupLongitude
      );
      distanceText = `Distance to pickup: ${distanceToPickup.toFixed(2)} km`;
      costText = `Estimated cost: KES ${item.estimatedCost?.toFixed?.(2) ?? item.estimatedCost ?? '0.00'}`;
    } else {
      costText = `Estimated cost: KES ${item.estimatedCost?.toFixed?.(2) ?? item.estimatedCost ?? '0.00'}`;
    }
            return (
              <View
                key={item.id}
                style={{
                  backgroundColor: '#fff',
                  marginHorizontal: 8,
                  padding: 10,
                  borderRadius: 10,
                  width: SCREEN_WIDTH * 0.88,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                <TouchableOpacity onPress={() => focusOnRide(item, index)} activeOpacity={0.9}>
                  <Text style={{ fontWeight: '700', fontSize: 16 }}>{item.passengerName} || {item.passengerContact}</Text>
                  <Text>Status: {rideStatus} {item.paymentStatus ? `| ${item.paymentStatus}` : ''}</Text>
                 
                  {distanceText ? <Text>{distanceText} || {costText}</Text> : null}
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  {rideStatus === 'transportRequestYes' && (
                    <>
                      <TouchableOpacity
                        onPress={() => respondToRequest(item.id, true)}
                        style={{ backgroundColor: '#1f8ef1', padding: 10, borderRadius: 8, marginRight: 8 }}
                      >
                        <Text style={{ color: '#fff' }}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => respondToRequest(item.id, false)}
                        style={{ backgroundColor: '#95c7ff', padding: 10, borderRadius: 8 }}
                      >
                        <Text style={{ color: '#fff' }}>Reject</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  {rideStatus === 'TransportApproved' && (
                    <>
                      <TouchableOpacity
                        onPress={() => updateStatus('Active')}
                        style={{ backgroundColor: '#e74c3c', padding: 10, borderRadius: 8 }}
                      >
                        <Text style={{ color: '#fff' }}>Start Trip</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => updateStatus('Cancelled')}
                        style={{ backgroundColor: '#bbb', padding: 10, borderRadius: 8 }}
                      >
                        <Text style={{ color: '#fff' }}>Cancel</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  {(rideStatus === 'Active' || rideStatus === 'TransportEngaged') && (
                    <>
                      <TouchableOpacity
                        onPress={() => updateStatus('Completed')}
                        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 8 }}
                      >
                        <Text style={{ color: '#fff' }}>Complete Trip</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => updateStatus('Cancelled')}
                        style={{ backgroundColor: '#bbb', padding: 10, borderRadius: 8 }}
                      >
                        <Text style={{ color: '#fff' }}>Cancel</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  {rideStatus === 'Completed' && item.paymentStatus !== 'Paid' && (
                    <>
                      {item.paymentMethod === 'MiFedha' ? (
                        <TouchableOpacity
                          onPress={() => processMiFedhaPayment(item)}
                          style={{ backgroundColor: '#2ecc71', padding: 10, borderRadius: 8 }}
                        >
                          <Text style={{ color: '#fff' }}>Charge Passenger (MiFedha)</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => manualClearPayment(item)}
                          style={{ backgroundColor: '#f39c12', padding: 10, borderRadius: 8 }}
                        >
                          <Text style={{ color: '#fff' }}>Forward from own Account</Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </View>
              </View>
            );
          }}
        />
      </Animated.View>
    </View>
  );
}


