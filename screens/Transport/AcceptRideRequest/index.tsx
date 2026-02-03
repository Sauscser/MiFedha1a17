import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
// import axios from 'axios';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, FlatList, Dimensions, Animated, AppState, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listRideRequests, getSMAccount, getTransportRegister, getCompany, getRideRequest } from '../../../src/graphql/queries';
import { onUpdateRideRequest } from '../../../src/graphql/subscriptions';
import { Observable } from 'zen-observable-ts';
import { updateRideRequest, updateSMAccount, updateTransportRegister, updateCompany } from '../../../src/graphql/mutations';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MIN_PICKUP_DISTANCE = 0.1; // km (100 meters minimum)
const MIN_REAL_MOVEMENT_KM = 0.150; // 30m
const COMPANY_ADMIN_ID = "BaruchHabaB'ShemAdonai2";
// Removed Google Maps API Key. Using OSRM and OSM.
export default function RiderRideRequestScreen() {
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userContact, setUserContact] = useState<string | null>(null);
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const [riderLocation, setRiderLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [tripStarted, setTripStarted] = useState(false);
  const mapRef = useRef<MapView | null>(null);
  const carouselRef = useRef<FlatList | null>(null);
  // Triggers carousel re-render whenever distance/cost changes
  const [rideMetricsTick, setRideMetricsTick] = useState(0);
  const carouselPosition = useRef(new Animated.Value(SCREEN_HEIGHT * 0.62)).current;
  const appState = useRef(AppState.currentState);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);
  const lastLocationRef = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const lastCameraCenter = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const routeCache = useRef<Record<string, {
    pickup?: any[];
    drop?: any[];
  }>>({});
  // Persist/load route cache for faster UX
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

  const transportMap = useRef<Record<string, any>>({});
  const cumulativeDistanceRef = useRef<Record<string, number>>({});
  const cumulativeCostRef = useRef<Record<string, number>>({});
  const routeToPickupRef = useRef<any[]>([]);
  const routeToDropRef = useRef<any[]>([]);
  const updateIntervalRef = useRef<number | null>(null);
  const [polylineTick, setPolylineTick] = useState(0);
  useEffect(() => {
    let sub: any = null;
    const init = async () => {
      try {
        const attributes = await fetchUserAttributes();
        const email = attributes.email;
        if (email) {
          setUserContact(email);
          await fetchRides(email);
        } else {
          console.warn('No user email found');
        }

        // Subscribe to ride updates to get rider location updates in real-time
        sub = (client.graphql({ query: onUpdateRideRequest }) as unknown as Observable<any>).subscribe({
          next: ({ value }: any) => {
            const updated = value?.data?.onUpdateRideRequest;
            if (!updated) return;
            // Keep rides array in sync for this transporter's phone number
            if (updated.riderContact === attributes.phone_number) {
              setRides(prev => prev.map(r => r.id === updated.id ? updated : r));
              // If the currently selected ride has new rider coords, refetch cached routes for it
              if (selectedRideId === updated.id) {
                fetchCachedRoute(updated, { latitude: updated.riderLatitude, longitude: updated.riderLongitude }).catch(() => {});
              }
            }
          },
          error: (err: any) => console.warn('ride updates subscription error', err)
        });
      } catch (err) {
        console.error('Failed to fetch user or rides', err);
      }
    };
    init();
    return () => sub?.unsubscribe?.();
  }, []);
  const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (x: number) => x * Math.PI / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  // Decode OSRM GeoJSON LineString coordinates to {latitude, longitude}
  const decodeOSRMLine = (coordinates: number[][]) => {
    return coordinates.map(([lng, lat]) => ({ latitude: lat, longitude: lng }));
  };

  // Fetch route and distance from OSRM
  const fetchRouteWithDistance = async (start: { latitude: number; longitude: number }, end: { latitude: number; longitude: number }) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;
      const res = await axios.get(url);
      if (res.data.routes && res.data.routes.length > 0) {
        return {
          coords: decodeOSRMLine(res.data.routes[0].geometry.coordinates),
          distanceKm: res.data.routes[0].distance / 1000
        };
      }
    } catch (err) {
      // fallback: straight line
      return {
        coords: [start, end],
        distanceKm: getDistanceKm(start.latitude, start.longitude, end.latitude, end.longitude)
      };
    }
    return { coords: [start, end], distanceKm: getDistanceKm(start.latitude, start.longitude, end.latitude, end.longitude) };
  };
  const routeFetchTimestamps = useRef<Record<string, number>>({});
  const ROUTE_FETCH_THROTTLE_MS = 10_000;
  // Fetch route from OSRM (Open Source Routing Machine)
  const fetchRoute = useCallback(async (start: {
    latitude: number;
    longitude: number;
  }, end: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;
      const res = await axios.get(url);
      if (res.data.routes?.length) {
        return decodeOSRMLine(res.data.routes[0].geometry.coordinates);
      }
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
        (mapRef.current as any).animateCamera?.({
          center: newLoc,
          zoom: 15
        }, {
          duration: 300
        }) || (mapRef.current as any).animateToRegion?.({
          ...newLoc,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }, 300);
      } catch (e) {}
      lastCameraCenter.current = newLoc;
    }
  };
  // Fetch and update polyline and estimated cost/distance for each ride
  const fetchCachedRoute = useCallback(async (ride: any, currentLoc: any) => {
    if (!ride?.id) return;
    const now = Date.now();
    const stampKey = `${ride.id}-${ride.rideStatus}`;
    if (routeFetchTimestamps.current[stampKey] && now - routeFetchTimestamps.current[stampKey] < ROUTE_FETCH_THROTTLE_MS) return;
    routeFetchTimestamps.current[stampKey] = now;
    const cache = routeCache.current[ride.id] || {};
    const isPickup = ride.rideStatus === 'TransportApproved';
    const target = isPickup ? {
      latitude: ride.pickupLatitude,
      longitude: ride.pickupLongitude
    } : {
      latitude: ride.destinationLatitude,
      longitude: ride.destinationLongitude
    };
    const routeType = isPickup ? 'pickup' : 'drop';
    if (cache[routeType]) {
      if (routeType === 'pickup') routeToPickupRef.current = cache.pickup!;else routeToDropRef.current = cache.drop!;
      setPolylineTick(t => t + 1);
      return;
    }
    const start = currentLoc || (ride.riderLatitude && ride.riderLongitude ? { latitude: ride.riderLatitude, longitude: ride.riderLongitude } : lastCameraCenter.current || { latitude: ride.pickupLatitude, longitude: ride.pickupLongitude });
    const { coords, distanceKm } = await fetchRouteWithDistance(start, target);
    saveRouteCache().catch(() => {});
    routeCache.current[ride.id] = {
      ...cache,
      [routeType]: coords
    };
    if (routeType === 'pickup') routeToPickupRef.current = coords;else routeToDropRef.current = coords;
    setPolylineTick(t => t + 1);
    // Update backend with new distance/cost if changed
    const rate = Number(ride.riderRate || 0);
    if (distanceKm && (ride.distance !== distanceKm || ride.estimatedCost !== Math.round(rate * distanceKm))) {
      try {
        await client.graphql({
          query: updateRideRequest,
          variables: {
            input: {
              id: ride.id,
              distance: distanceKm,
              estimatedCost: Math.round(rate * distanceKm)
            }
          }
        });
      } catch (err) { /* ignore */ }
    }
  }, [fetchRouteWithDistance]);
  const startTrackingRide = useCallback(async (ride: any) => {
    if (!ride) return;
    const {
      status
    } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Location permission required');
      return;
    }

    // Remove any existing location subscription
    if (locationSubscription.current) {
      try {
        locationSubscription.current.remove();
      } catch (e) {}
      locationSubscription.current = null;
    }
    locationSubscription.current = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 5000,
      distanceInterval: 10
    }, async loc => {
      if (!ride?.id || !selectedRideId) return;
      if (ride.id !== selectedRideId) return; // track only selected ride

      const lat = loc.coords.latitude;
      const lng = loc.coords.longitude;
      const newLoc = {
        latitude: lat,
        longitude: lng
      };
      const prev = lastLocationRef.current;
      const smoothLoc = prev ? {
        latitude: 0.7 * prev.latitude + 0.3 * newLoc.latitude,
        longitude: 0.7 * prev.longitude + 0.3 * newLoc.longitude
      } : newLoc;
      const movedKm = prev ? getDistanceKm(prev.latitude, prev.longitude, smoothLoc.latitude, smoothLoc.longitude) : Infinity;
      if (movedKm < MIN_REAL_MOVEMENT_KM) return;

      // Always track distance & cost for selected ride
      const rate = Number(ride.riderRate || 0);
      cumulativeDistanceRef.current[ride.id] = (cumulativeDistanceRef.current[ride.id] || 0) + movedKm;
      cumulativeCostRef.current[ride.id] = (cumulativeCostRef.current[ride.id] || 0) + movedKm * rate;
      setRideMetricsTick(t => t + 1); // trigger carousel re-render

      lastLocationRef.current = smoothLoc;
      setRiderLocation(smoothLoc);
      try {
        await fetchCachedRoute(ride, smoothLoc);
      } catch (err) {}
      maybeAnimateCamera(smoothLoc);
    });

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
          await client.graphql({
            query: updateRideRequest,
            variables: {
              input: {
                id: ride.id,
                riderLatitude: lastLocationRef.current.latitude,
                riderLongitude: lastLocationRef.current.longitude,
                estimatedCost: cumulativeCostRef.current[ride.id] || 0,
                distance: cumulativeDistanceRef.current[ride.id] || 0
              }
            }
          });
          console.log(`Rider location auto-updated for ride ${ride.id}`);
        } catch (err) {
          console.error('Auto-update error', err);
        }
      }
    }, 30_000) as unknown as number;
  }, [tripStarted, fetchCachedRoute, maybeAnimateCamera]);
  const stopTracking = useCallback(() => {
    if (locationSubscription.current) {
      try {
        locationSubscription.current.remove();
      } catch (e) {}
      locationSubscription.current = null;
    }
    if (updateIntervalRef.current) {
      try {
        clearInterval(updateIntervalRef.current);
      } catch (e) {}
      updateIntervalRef.current = null;
    }
  }, []);
  const fetchRides = useCallback(async (transportOwnerEmail: string) => {
    setLoading(true);
    const user = await fetchUserAttributes();
    try {
      const res: any = await client.graphql({
        query: listRideRequests,
        variables: {
          filter: {
            or: [
              { rideStatus: { eq: 'transportRequestYes' } },
              { rideStatus: { eq: 'TransportApproved' } },
              { rideStatus: { eq: 'TransportEngaged' } },
              { rideStatus: { eq: 'Active' } },
              { and: [
                { rideStatus: { eq: 'Completed' } },
                { paymentStatus: { ne: 'Cleared' } }
              ]}
            ],
            riderContact: { eq: user.phone_number }
          }
        }
      });
      // Filter out cancelled rides in code
      const items = (res?.data?.listRideRequests?.items || []).filter((r: any) => r.rideStatus !== 'Cancelled');
      setRides(items);
    } catch (err) {
      console.error('fetchRides error:', err);
      Alert.alert('Error', 'Failed to fetch ride requests.');
    } finally {
      setLoading(false);
    }
  }, []);
  const processMiFedhaPayment = useCallback(async (ride: any): Promise<boolean> => {
    if (!ride || !ride.id) return false;
    try {
      const totalFare = Number(cumulativeCostRef.current[ride.id] ?? ride.estimatedCost ?? 0);
      if (totalFare <= 0) {
        Alert.alert('Payment', 'No fare to charge.');
        return false;
      }
      const passengerEmail = ride.passengerEmail;

      // Get passenger SMAccount
      const smRes: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: passengerEmail
        }
      });
      const sm = smRes?.data?.getSMAccount;
      if (!sm) {
        Alert.alert('Payment error', 'Passenger account not found.');
        return false;
      }
      const passengerBalance = Number(sm.balance ?? 0);
      const transporterRes: any = await client.graphql({
        query: getTransportRegister,
        variables: {
          id: ride.selectedRiderID
        }
      });
      const transporter = transporterRes?.data?.getTransportRegister;
      if (passengerBalance < totalFare) {
        // Payment pending → mark overdue
        await client.graphql({
          query: updateRideRequest,
          variables: {
            input: {
              id: ride.id,
              rideStatus: 'Completed',
              paymentStatus: 'Pending',
              endTime: new Date().toISOString(),
              estimatedCost: totalFare,
              distance: cumulativeDistanceRef.current[ride.id] || ride.distance || 0
            }
          }
        });
        if (transporter) {
          await client.graphql({
            query: updateTransportRegister,
            variables: {
              input: {
                id: transporter.id,
                overdue: true
              }
            }
          });
        }
        Alert.alert('Insufficient funds', 'Passenger MiFedha balance insufficient. Marked as pending.');
        if (userContact) fetchRides(userContact);
        return true; // Overdue
      }

      // Payment succeeds
      const companyRes: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: COMPANY_ADMIN_ID
        }
      });
      const company = companyRes?.data?.getCompany;
      const companySharePct = Number(company?.transportCompanyShare ?? 0) / 100;
      const companyShare = totalFare * companySharePct;
      const transporterShare = totalFare - companyShare;

      // Deduct passenger balance
      await client.graphql({
        query: updateSMAccount,
        variables: {
          input: {
            awsemail: passengerEmail,
            balance: passengerBalance - totalFare
          }
        }
      });

      // Update transporter earnings
      if (transporter) {
        const newEarnings = Number(transporter.Earnings ?? 0) + transporterShare;
        await client.graphql({
          query: updateTransportRegister,
          variables: {
            input: {
              id: transporter.id,
              Earnings: newEarnings,
              lastForwardedTime: new Date().toISOString(),
              overdue: false
            }
          }
        });
      }

      // Update company earnings
      if (company) {
        const companyEarning = Number(company.companyEarning ?? 0) + companyShare;
        const companyEarningBal = Number(company.companyEarningBal ?? 0) + companyShare;
        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: COMPANY_ADMIN_ID,
              companyEarning,
              companyEarningBal
            }
          }
        });
      }

      // Mark ride completed & paid
      await client.graphql({
        query: updateRideRequest,
        variables: {
          input: {
            id: ride.id,
            rideStatus: 'Completed',
            paymentStatus: 'Cleared',
            endTime: new Date().toISOString(),
            estimatedCost: totalFare,
            distance: cumulativeDistanceRef.current[ride.id] || ride.distance || 0
          }
        }
      });

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
  }, [fetchRides, stopTracking, userContact]);

  // Manual clear (cash): forwards company share from transporter account and marks ride completed
  const manualClearPayment = useCallback(async (ride: any): Promise<boolean> => {
    if (!ride || !ride.id) return false;
    try {
      const totalFare = Number(cumulativeCostRef.current[ride.id] ?? ride.estimatedCost ?? 0);
      if (totalFare <= 0) {
        Alert.alert('No fare', 'No fare recorded to clear.');
        return false;
      }
      const transporterRes: any = await client.graphql({
        query: getTransportRegister,
        variables: {
          id: ride.selectedRiderID
        }
      });
      const transporter = transporterRes?.data?.getTransportRegister;
      if (!transporter) return false;
      const companyRes: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: COMPANY_ADMIN_ID
        }
      });
      const company = companyRes?.data?.getCompany;
      const companySharePct = Number(company?.transportCompanyShare ?? 0) / 100;
      const companyShare = totalFare * companySharePct;
      const transporterShare = totalFare - companyShare;

      // Deduct company share from transporter SMAccount
      const transporterEmail = transporter.transportOwnerEmail; // authenticated user
      const smRes: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: transporterEmail
        }
      });
      const smAccount = smRes?.data?.getSMAccount;
      const transporterBalance = Number(smAccount?.balance ?? 0);
      if (transporterBalance < companyShare) {
        // Not enough to forward → mark overdue
        await client.graphql({
          query: updateTransportRegister,
          variables: {
            input: {
              id: transporter.id,
              overdue: true
            }
          }
        });
        Alert.alert('Insufficient funds', 'You do not have enough balance to forward company share.');
        return true; // Overdue
      }

      // Deduct company share
      await client.graphql({
        query: updateSMAccount,
        variables: {
          input: {
            awsemail: transporterEmail,
            balance: transporterBalance - companyShare
          }
        }
      });

      // Update transporter earnings
      const newEarnings = Number(transporter.Earnings ?? 0) + transporterShare;
      await client.graphql({
        query: updateTransportRegister,
        variables: {
          input: {
            id: transporter.id,
            Earnings: newEarnings,
            lastForwardedTime: new Date().toISOString(),
            overdue: false
          }
        }
      });

      // Update company earnings
      if (company) {
        const companyEarning = Number(company.companyEarning ?? 0) + companyShare;
        const companyEarningBal = Number(company.companyEarningBal ?? 0) + companyShare;
        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: COMPANY_ADMIN_ID,
              companyEarning,
              companyEarningBal
            }
          }
        });
      }

      // Mark ride completed & paid
      await client.graphql({
        query: updateRideRequest,
        variables: {
          input: {
            id: ride.id,
            rideStatus: 'Completed',
            paymentStatus: 'Cleared',
            endTime: new Date().toISOString(),
            estimatedCost: totalFare,
            distance: cumulativeDistanceRef.current[ride.id] || ride.distance || 0
          }
        }
      });

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
  }, [fetchRides, stopTracking, userContact]);
  const focusOnRide = useCallback(async (ride: any, index: number) => {
    if (!ride) return;

    // 1️⃣ Select ride and initialize cumulative metrics
    setSelectedRideId(ride.id);
    if (!cumulativeDistanceRef.current[ride.id]) cumulativeDistanceRef.current[ride.id] = 0;
    if (!cumulativeCostRef.current[ride.id]) cumulativeCostRef.current[ride.id] = 0;
    setTripStarted(ride.rideStatus === 'Active');

    // 2️⃣ Get current location immediately
    let currentLoc = riderLocation;
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation
      });
      currentLoc = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      };
      lastLocationRef.current = currentLoc;
      setRiderLocation(currentLoc);

      // Push immediate location to backend
      await client.graphql({
        query: updateRideRequest,
        variables: {
          input: {
            id: ride.id,
            riderLatitude: currentLoc.latitude,
            riderLongitude: currentLoc.longitude
          }
        }
      });
      console.log(`Immediate rider location update for ride ${ride.id}`);
    } catch (err) {
      console.error('Immediate location fetch/update failed', err);
      // fallback
      currentLoc = riderLocation || {
        latitude: ride.pickupLatitude,
        longitude: ride.pickupLongitude
      };
    }

    // 3️⃣ Center map on current location
    if (mapRef.current) {
      maybeAnimateCamera(currentLoc);
    }

    // 4️⃣ Scroll carousel to the selected ride
    try {
      carouselRef.current?.scrollToIndex({
        index,
        animated: true
      });
    } catch (e) {
      console.warn('Carousel scroll failed:', e);
    }

    // 5️⃣ Expand the carousel panel
    Animated.spring(carouselPosition, {
      toValue: SCREEN_HEIGHT * 0.62,
      useNativeDriver: false
    }).start();

    // 6️⃣ Fetch routes: rider->pickup and pickup->destination (or rider->destination when Active)
    try {
      const pickupTarget = { latitude: ride.pickupLatitude, longitude: ride.pickupLongitude };
      const dropTarget = { latitude: ride.destinationLatitude, longitude: ride.destinationLongitude };
      const riderLocForPickup = riderLocation || currentLoc;
      const pickupPromise = (ride.pickupLatitude && ride.pickupLongitude && riderLocForPickup) ? fetchRoute(riderLocForPickup, pickupTarget) : Promise.resolve([]);
      const dropPromise = (ride.pickupLatitude && ride.pickupLongitude && ride.destinationLatitude && ride.destinationLongitude) ? (ride.rideStatus === 'Active' ? fetchRoute(riderLocForPickup || pickupTarget, dropTarget) : fetchRoute(pickupTarget, dropTarget)) : Promise.resolve([]);
      const [pickupRoute, dropRoute] = await Promise.all([pickupPromise, dropPromise]);
      routeCache.current[ride.id] = {
        ...(routeCache.current[ride.id] || {}),
        pickup: pickupRoute || [],
        drop: dropRoute || []
      };
      saveRouteCache().catch(() => {});
      routeToPickupRef.current = pickupRoute || [];
      routeToDropRef.current = dropRoute || [];
      setPolylineTick(t => t + 1);

      // Fetch transporter info (numberPlate) and cache it
      if (ride.selectedRiderID && !transportMap.current[ride.selectedRiderID]) {
        try {
          const tRes: any = await client.graphql({ query: getTransportRegister, variables: { id: ride.selectedRiderID } });
          const transporter = tRes?.data?.getTransportRegister;
          if (transporter) transportMap.current[ride.selectedRiderID] = transporter;
        } catch (err) {
          console.warn('Failed to fetch transporter info', err);
        }
      }

    } catch (err) {
      console.warn('Immediate route fetch failed:', err);
    }
  }, [fetchRides, stopTracking, userContact]);
  const updateStatus = useCallback(async (status: string) => {
    if (!selectedRideId) return;
    const ride = rides.find(r => r.id === selectedRideId);
    if (!ride) return;

    // Check distance before starting trip
    if (status === 'Active' && riderLocation) {
      const distanceToPickup = getDistanceKm(riderLocation.latitude, riderLocation.longitude, ride.pickupLatitude, ride.pickupLongitude);
      // If location accuracy is available, increase required distance to account for inaccuracy
      const accuracyM = (riderLocation.accuracy || (riderLocation as any).coords?.accuracy) ?? 0;
      const requiredKm = Math.max(MIN_PICKUP_DISTANCE, (accuracyM ? (accuracyM * 1.5) / 1000 : 0));
      if (distanceToPickup > requiredKm) {
        const distanceM = Math.round(distanceToPickup * 1000);
        const reqM = Math.round(requiredKm * 1000);
        // Show meters in the message to be clearer to driver
        Alert.alert('Too far from pickup', `You are ${distanceM} m away from the pickup point. Move closer to within ${reqM} m to start the trip.`);
        return;
      }
    }
    try {
      if (status === 'Completed') {
        // Fetch fresh ride to avoid stale data
        const rideRes: any = await client.graphql({
          query: getRideRequest,
          variables: {
            id: selectedRideId
          }
        });
        const freshRide = rideRes?.data?.getRideRequest ?? ride;

        // Update ride status first
        await client.graphql({
          query: updateRideRequest,
          variables: {
            input: {
              id: selectedRideId,
              rideStatus: 'Completed',
              endTime: new Date().toISOString()
            }
          }
        });

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
      await client.graphql({
        query: updateRideRequest,
        variables: {
          input: {
            id: selectedRideId,
            rideStatus: status
          }
        }
      });
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
  }, [selectedRideId, riderLocation, rides, userContact, fetchRides, processMiFedhaPayment, manualClearPayment, stopTracking]);
  const respondToRequest = useCallback(async (rideId: string, accept: boolean) => {
    try {
      const rideRes: any = await client.graphql({
        query: getRideRequest,
        variables: {
          id: rideId
        }
      });
      const ride = rideRes?.data?.getRideRequest;
      if (!ride) {
        Alert.alert('Error', 'Ride not found.');
        return;
      }
      const newStatus = accept ? 'TransportApproved' : 'Cancelled';
      await client.graphql({
        query: updateRideRequest,
        variables: {
          input: {
            id: rideId,
            rideStatus: newStatus,
            selectedRiderID: accept ? ride.selectedRiderID : null
          }
        }
      });
      Alert.alert('Success', accept ? 'Ride accepted.' : 'Ride rejected.');
      if (userContact) fetchRides(userContact);
    } catch (err) {
      console.error('respondToRequest error', err);
      Alert.alert('Error', 'Failed to respond to ride request.');
    }
  }, [userContact, fetchRides]);

  //part 3

  const rideMarkers = useMemo(() => {
    return rides.map(ride => {
      const showRide = selectedRideId === ride.id;
      return <React.Fragment key={ride.id}>
        {!tripStarted && showRide && <Marker coordinate={{
          latitude: ride.pickupLatitude,
          longitude: ride.pickupLongitude
        }}>
            <View style={{
            backgroundColor: '#e58d29',
            padding: 6,
            borderRadius: 6
          }}>
              <Text style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 12
            }}>📍 Pickup</Text>
            </View>
          </Marker>}
        {tripStarted && showRide && <Marker coordinate={{
          latitude: ride.destinationLatitude,
          longitude: ride.destinationLongitude
        }}>
            <View style={{
            backgroundColor: '#e58d29',
            padding: 6,
            borderRadius: 6
          }}>
              <Text style={{
              color: '#fff',
              fontWeight: '700'
            }}>🎯 Drop</Text>
            </View>
          </Marker>}
        {riderLocation && showRide && <Marker coordinate={riderLocation}>
            <View style={{
            backgroundColor: 'blue',
            padding: 6,
            borderRadius: 6
          }}>
              <Text style={{
              color: 'white',
              fontWeight: '700'
            }}>{` ${transportMap.current[ride.selectedRiderID]?.numberPlate || 'Rider'}`}</Text>
            </View>
          </Marker>}
      </React.Fragment>;
    });
  }, [rides, selectedRideId, riderLocation, tripStarted]);
  const activeRide = useMemo(() => rides.find(r => r.id === selectedRideId), [rides, selectedRideId]);
  const pickupPolyline = useMemo(() => {
    if (!activeRide) return null;
    // Show rider -> pickup when ride has not started (any status except Active)
    if (activeRide.rideStatus !== 'Active' && routeToPickupRef.current.length) {
      return <Polyline coordinates={routeToPickupRef.current} strokeColor="blue" strokeWidth={4} />;
    }
    return null;
  }, [polylineTick, selectedRideId, rides]);
  const dropPolyline = useMemo(() => {
    if (!activeRide) return null;
    // Show pickup->destination before trip starts, and rider->destination during trip
    if (routeToDropRef.current.length) {
      return <Polyline coordinates={routeToDropRef.current} strokeColor="#e58d29" strokeWidth={4} />;
    }
    return null;
  }, [polylineTick, selectedRideId, rides]);
  const viewabilityConfigRef = useRef({
    itemVisiblePercentThreshold: 50
  });
  const onViewableItemsChanged = useRef(({
    viewableItems
  }: {
    viewableItems: any[];
  }) => {
    if (!viewableItems || !viewableItems.length) return;
    const first = viewableItems[0];
    if (!first) return;
    const item = first.item;
    const index = first.index;
    if (!item) return;
    focusOnRide(item, index).catch(() => {});
  }).current;
  if (loading) return <ActivityIndicator size="large" style={{
    flex: 1
  }} />;
  if (!rides.length) {
    return <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        <Text>No active or pending ride requests at the moment</Text>
      </View>;
  }
  return <View style={{
    flex: 1
  }}>
      <MapView ref={mapRef} style={{ flex: 1 }}
        showsUserLocation
        onRegionChangeComplete={reg => {
          lastCameraCenter.current = {
            latitude: reg.latitude,
            longitude: reg.longitude
          };
        }}
        initialRegion={{
          latitude: rides[0]?.pickupLatitude || 0,
          longitude: rides[0]?.pickupLongitude || 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}>
        <UrlTile
          urlTemplate="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=IXsiA7phXPF3BeMY5KKp"
          maximumZ={19}
          flipY={false}
        />
        {rideMarkers}
        {pickupPolyline}
        {dropPolyline}
      </MapView>

      {/* Action toolbar for selected ride (placed above the carousel) */}
      <View style={styles.actionBar} pointerEvents={loading ? 'none' : 'auto'}>
        {activeRide ? (
          <>
            {activeRide.rideStatus === 'transportRequestYes' && (
              <>
                <TouchableOpacity onPress={() => respondToRequest(activeRide.id, true)} style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => respondToRequest(activeRide.id, false)} style={[styles.actionButton, { backgroundColor: '#bbb' }]}>
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
            {activeRide.rideStatus === 'TransportApproved' && (
              <TouchableOpacity onPress={() => updateStatus('Active')} style={[styles.actionButton, { backgroundColor: '#e74c3c' }]}>
                <Text style={styles.actionButtonText}>Start Trip</Text>
              </TouchableOpacity>
            )}
            {(activeRide.rideStatus === 'Active' || activeRide.rideStatus === 'TransportEngaged') && (
              <TouchableOpacity onPress={() => updateStatus('Completed')} style={[styles.actionButton, { backgroundColor: 'blue' }]}>
                <Text style={styles.actionButtonText}>Complete Trip</Text>
              </TouchableOpacity>
            )}
            {activeRide.rideStatus === 'Completed' && activeRide.paymentStatus !== 'Paid' && (
              activeRide.paymentMethod === 'MiFedha' ? (
                <TouchableOpacity onPress={() => processMiFedhaPayment(activeRide)} style={[styles.actionButton, { backgroundColor: '#2ecc71' }]}>
                  <Text style={styles.actionButtonText}>Charge (MiFedha)</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => manualClearPayment(activeRide)} style={[styles.actionButton, { backgroundColor: '#f39c12' }]}>
                  <Text style={styles.actionButtonText}>Forward</Text>
                </TouchableOpacity>
              )
            )}
          </>
        ) : null}
      </View>

    
    
    
      <Animated.View style={{
      position: 'absolute',
      bottom: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.18,
      maxHeight: 200,
      minHeight: 160,
      backgroundColor: 'rgba(255,255,255,0.98)',
      paddingTop: 6,
      paddingHorizontal: 6
    }}>
      
      <FlatList style={{
        flexGrow: 0
      }} contentContainerStyle={{
        paddingBottom: 12
      }} ref={carouselRef} data={rides.filter(r => r.rideStatus !== 'Cancelled' && r.paymentStatus !== 'Cleared')} extraData={rideMetricsTick} // ← important!
      horizontal keyExtractor={item => item.id} showsHorizontalScrollIndicator={false} onViewableItemsChanged={onViewableItemsChanged} viewabilityConfig={viewabilityConfigRef.current} renderItem={({
        item,
        index
      }) => {
        const isSelected = selectedRideId === item.id;
        const {
          rideStatus
        } = item;
        let distanceText = '';
        let costText = '';
        // Live trip metrics when trip started and this ride is selected
        if (tripStarted && isSelected) {
          const distance = cumulativeDistanceRef.current[item.id] ?? 0;
          const cost = cumulativeCostRef.current[item.id] ?? item.estimatedCost ?? 0;
          distanceText = `Distance: ${distance.toFixed(2)} km`;
          costText = `KES ${cost.toFixed(2)}`;
        } else if (isSelected && rideStatus !== 'Active') {
          // When selected and trip not started, show distance-to-pickup (if available) and approx pickup->destination cost
          if (riderLocation) {
            const distanceToPickup = getDistanceKm(riderLocation.latitude, riderLocation.longitude, item.pickupLatitude, item.pickupLongitude);
            distanceText = `Distance to pickup: ${distanceToPickup.toFixed(2)} km`;
          }
          // Use server-estimated cost if available; otherwise compute from straight-line pickup->destination
          const est = item.estimatedCost ?? Math.round((item.riderRate || 0) * getDistanceKm(item.pickupLatitude, item.pickupLongitude, item.destinationLatitude, item.destinationLongitude));
          costText = `Approx cost: KES ${est.toFixed(2)}`;
        } else if (riderLocation && rideStatus === 'TransportApproved') {
          const distanceToPickup = getDistanceKm(riderLocation.latitude, riderLocation.longitude, item.pickupLatitude, item.pickupLongitude);
          distanceText = `Distance to pickup: ${distanceToPickup.toFixed(2)} km`;
          costText = `Estimated cost: KES ${item.estimatedCost?.toFixed?.(2) ?? item.estimatedCost ?? '0.00'}`;
        } else {
          costText = `Estimated cost: KES ${item.estimatedCost?.toFixed?.(2) ?? item.estimatedCost ?? '0.00'}`;
        }
        return <View key={item.id} style={{
          backgroundColor: '#fff',
          marginHorizontal: 8,
          padding: 10,
          borderRadius: 10,
          width: SCREEN_WIDTH * 0.88,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3
        }}>
                <TouchableOpacity onPress={() => focusOnRide(item, index)} activeOpacity={0.9}>
                  <Text style={{
              fontWeight: '700',
              fontSize: 16
            }}>{item.passengerContact}</Text>
                  <Text>Status: {rideStatus} {item.paymentStatus ? `| ${item.paymentStatus}` : ''}</Text>
                  {/* Route distance between pickup and destination */}
                  <Text>Route distance: {(item.distance ?? getDistanceKm(item.pickupLatitude, item.pickupLongitude, item.destinationLatitude, item.destinationLongitude)).toFixed(2)} km</Text>
                  {distanceText ? <Text>{distanceText} || {costText}</Text> : <Text>{costText}</Text>}
                </TouchableOpacity>

                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: '#666' }}>Select a ride to see actions above.</Text>
                </View>
              </View>;
      }} />
      </Animated.View>
    </View>;
}

const styles = StyleSheet.create({
  actionBar: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.18 + 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    zIndex: 10
  },
  actionButton: {
    backgroundColor: '#1f8ef1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 6
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '700'
  }
});