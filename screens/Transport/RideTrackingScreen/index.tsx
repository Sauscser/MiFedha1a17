import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { API, graphqlOperation } from 'aws-amplify';
import { onUpdateRideRequest } from '../../../src/graphql/subscriptions';
import { getRideRequest } from '../../../src/graphql/queries';
import { updateRideRequest } from '../../../src/graphql/mutations';
import * as Location from 'expo-location';
import PolylineDecoder from '@mapbox/polyline';
import { PaymentMethod } from '../../../types';
import { Observable } from 'zen-observable-ts';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const GOOGLE_MAPS_API_KEY = 'AIzaSyA0rFIOCDBr3WI-I4SGHGPFLUW7bWSAnvA';

interface RideTrackingScreenProps {
  route: { params: { rideId: string } };
  navigation: any;
}

export default function RideTrackingScreen({ route, navigation }: RideTrackingScreenProps) {
  const { rideId } = route.params;

  const [ride, setRide] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [routeCoords, setRouteCoords] = useState<Array<{ latitude: number; longitude: number }>>([]);
  const [shouldGoBack, setShouldGoBack] = useState(false);

  const mapRef = useRef<MapView | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const routeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ---------- Get passenger location ----------
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      } catch (err) {
        console.warn('Location error', err);
      }
    })();
  }, []);

  // ---------- Fetch ride ----------
  const fetchRide = useCallback(async () => {
    try {
      const res: any = await API.graphql(graphqlOperation(getRideRequest, { id: rideId }));
      setRide(res.data.getRideRequest);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching ride', err);
      Alert.alert('Error', 'Failed to fetch ride details.');
      setLoading(false);
    }
  }, [rideId]);

  useEffect(() => {
    fetchRide();
  }, [fetchRide]);

  // ---------- Update ride status ----------
  const updateRideStatus = async (status: string) => {
    if (!ride) return;
    try {
      await API.graphql(graphqlOperation(updateRideRequest, { input: { id: ride.id, rideStatus: status } }));
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to update ride status.');
    }
  };

  // ---------- Passenger actions ----------
  const cancelRide = () => updateRideStatus('Cancelled');
  const completeRide = () => updateRideStatus('Completed');
  const initiateTrip = () => updateRideStatus('Active');

  // ---------- Fetch route ----------
  const fetchRoute = async (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.routes.length) {
        const points = PolylineDecoder.decode(data.routes[0].overview_polyline.points);
        return points.map((p: any) => ({ latitude: p[0], longitude: p[1] }));
      }
    } catch (err) {
      console.error('Directions API error:', err);
    }
    return [];
  };

  // ---------- Update polyline based on status ----------
  const updateRoutePolyline = useCallback(async () => {
    if (!ride) return;

    let start, end;
    if (ride.rideStatus === 'TransportApproved') {
      start = { lat: ride.riderLatitude, lng: ride.riderLongitude };
      end = { lat: ride.pickupLatitude, lng: ride.pickupLongitude };
    } else if (ride.rideStatus === 'Active') {
      start = { lat: ride.pickupLatitude, lng: ride.pickupLongitude };
      end = { lat: ride.destinationLatitude, lng: ride.destinationLongitude };
    } else {
      setRouteCoords([]);
      return;
    }

    const coords = await fetchRoute(start, end);
    setRouteCoords(coords);
  }, [ride]);

  // ---------- Ride subscription & periodic updates ----------
  useEffect(() => {
    if (!rideId) return;

    let pollInterval: NodeJS.Timeout | null = null;

    // Cast as Observable for TypeScript
    const sub = (API.graphql(
      graphqlOperation(onUpdateRideRequest, { id: rideId })
    ) as Observable<any>).subscribe({
      next: ({ value }) => {
        const updatedRide = value?.data?.onUpdateRideRequest;
        if (updatedRide) {
          setRide(updatedRide);

          // When rider approves or passenger starts, start periodic route updates
          if (updatedRide.rideStatus === 'TransportApproved' || updatedRide.rideStatus === 'Active') {
            setLoading(false);
            if (routeIntervalRef.current) clearInterval(routeIntervalRef.current);
            updateRoutePolyline();
            routeIntervalRef.current = setInterval(updateRoutePolyline, 10000);
          }

          // Stop countdown if ride approved or declined
          if (updatedRide.rideStatus === 'TransportApproved' || updatedRide.rideStatus === 'transportRequestNo') {
            if (countdownRef.current) clearInterval(countdownRef.current);
          }
        }
      },
      error: (err) => console.warn('Ride subscription error', err),
    });

    // Poll fallback every 10s
    pollInterval = setInterval(async () => {
      try {
        const res: any = await API.graphql(graphqlOperation(getRideRequest, { id: rideId }));
        setRide(res.data.getRideRequest);
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 10000);

    return () => {
      sub.unsubscribe();
      if (pollInterval) clearInterval(pollInterval);
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (routeIntervalRef.current) clearInterval(routeIntervalRef.current);
    };
  }, [rideId, updateRoutePolyline]);

  // ---------- Polyline color ----------
  const polylineColor = useMemo(() => {
    if (!ride) return '#7f8c8d';
    if (ride.rideStatus === 'Active') return '#27ae60';
    if (ride.rideStatus === 'TransportApproved') return '#e58d29';
    return '#7f8c8d';
  }, [ride?.rideStatus]);

  // ---------- Navigate safely ----------
  useEffect(() => {
    if (shouldGoBack) {
      navigation.goBack();
      setShouldGoBack(false);
    }
  }, [shouldGoBack, navigation]);

  if (loading || !ride || !userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Waiting for rider to accept…</Text>
        {ride?.rideStatus === 'Pending' && <Text>Time remaining: {countdown}s</Text>}
      </View>
    );
  }

  const pickup = ride.pickupLatitude && ride.pickupLongitude ? { latitude: ride.pickupLatitude, longitude: ride.pickupLongitude } : null;
  const destination = ride.destinationLatitude && ride.destinationLongitude ? { latitude: ride.destinationLatitude, longitude: ride.destinationLongitude } : null;
  const riderLocation = ride.riderLatitude && ride.riderLongitude ? { latitude: ride.riderLatitude, longitude: ride.riderLongitude } : null;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {userLocation && <Marker coordinate={userLocation}><View style={styles.passengerMarker}><Text style={{ color: '#fff' }}>You</Text></View></Marker>}
        {riderLocation && <Marker coordinate={riderLocation}><View style={styles.riderMarker}><Text style={{ color: '#fff' }}>{ride.riderName}</Text></View></Marker>}
        {pickup && <Marker coordinate={pickup}><View style={styles.pickupMarker}><Text style={{ color: '#fff' }}>Pickup</Text></View></Marker>}
        {destination && <Marker coordinate={destination}><View style={styles.destinationMarker}><Text style={{ color: '#fff' }}>Drop</Text></View></Marker>}
        {routeCoords.length > 0 && <Polyline
          key={`${ride?.rideStatus}-${polylineColor}-${routeCoords.length}`}
          coordinates={routeCoords}
          strokeColor={polylineColor}
          strokeWidth={4}
        />}
      </MapView>

      <View style={styles.infoPanel}>
        <Text style={{ fontWeight: '700', fontSize: 16 }}>{ride.riderName}</Text>
        <Text>Contact: {ride.riderContact}</Text>
        <Text>Distance: {(ride.distance || 0).toFixed(2)} km • Est: KES {ride.estimatedCost || 0}</Text>
        <Text>Payment: {ride.paymentMethod as PaymentMethod} ({ride.paymentStatus})</Text>
        <Text>Status: {ride.rideStatus}</Text>

        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {ride.rideStatus === 'TransportApproved' && <TouchableOpacity style={[styles.btn, { backgroundColor: '#e58d29' }]} onPress={initiateTrip}><Text style={{ color: '#fff' }}>Initiate Trip</Text></TouchableOpacity>}
          {ride.rideStatus !== 'Cancelled' && ride.rideStatus !== 'Completed' && <>
            <TouchableOpacity style={styles.btn} onPress={cancelRide}><Text style={{ color: '#fff' }}>Cancel Ride</Text></TouchableOpacity>
            {ride.rideStatus === 'Active' && <TouchableOpacity style={[styles.btn, { marginLeft: 10 }]} onPress={completeRide}><Text style={{ color: '#fff' }}>Mark Complete</Text></TouchableOpacity>}
          </>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  infoPanel: { position: 'absolute', bottom: 12, left: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.95)', padding: 12, borderRadius: 8, elevation: 6 },
  btn: { backgroundColor: '#1f8ef1', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  passengerMarker: { backgroundColor: '#e58d29', padding: 4, borderRadius: 4, alignItems: 'center' },
  riderMarker: { backgroundColor: '#1f8ef1', padding: 4, borderRadius: 4, alignItems: 'center' },
  pickupMarker: { backgroundColor: '#27ae60', padding: 4, borderRadius: 4, alignItems: 'center' },
  destinationMarker: { backgroundColor: '#9b59b6', padding: 4, borderRadius: 4, alignItems: 'center' },
});
