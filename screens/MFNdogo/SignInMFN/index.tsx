/* import React, {useEffect, useState} from 'react';

import {createCompany} from '../../../src/graphql/mutations';
import { getAgent, getBankAdmin, getCompany, getSAgent} from '../../../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
 
} from 'react-native';
import styles from './styles';




const MFNSignIn = (props) => {  
  const navigation = useNavigation();

  const [town, settown] = useState("");
  



  const moveToMFNHm = () => {
    navigation.navigate("SearchMFNsssss", {town});
  
            settown("");
            
      
    
             }

             
  
                 useEffect(() =>{
                  const towns=town
                    if(!towns && towns!=="")
                    {
                      settown("");
                      return;
                    }
                    settown(towns);
                    }, [town]
                     );



         return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                      value={town}
                      onChangeText={settown}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Town</Text>
                    <Text style={styles.sendLoanText2}>(Enter part or full name)</Text>
                  </View>
        
                  
                  <TouchableOpacity
                    onPress={moveToMFNHm}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText2}>
                      Find convenient MFNdogo
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default MFNSignIn;

        */
// GenralShpMpViewThree.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  Pressable,
  useWindowDimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { API, graphqlOperation } from 'aws-amplify';
import { listAgents, getCompany, getSAgent } from '../../../src/graphql/queries';
import { getDistance } from 'geolib';

import CustomMarker from '../../../components/MFNdogo/CustomMarkr';
import Carousels from '../../../components/MFNdogo/MFNCarousel';

const INITIAL_RADIUS_KM = 0.1;
const MAX_RADIUS_KM = 1000;

const GenralShpMpViewThree = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [selectedAgentPhone, setSelectedAgentPhone] = useState(null);
  const [radiusKm, setRadiusKm] = useState(INITIAL_RADIUS_KM);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loadingAgents, setLoadingAgents] = useState(false);

  const mapRef = useRef(null);
  const carouselRef = useRef(null);
  const isManualScroll = useRef(false);
  const { width } = useWindowDimensions();
  const CARD_WIDTH = width * 0.8 + 20;

  // Convert radius in km to map delta
  const radiusToDelta = (radius) => Math.max(radius * 0.018, 0.01);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  const fetchAgents = async () => {
    setLoadingAgents(true);
    try {
      const res = await API.graphql(graphqlOperation(listAgents));
      const baseAgents = res?.data?.listAgents?.items || [];

      const enrichedAgents = await Promise.all(
        baseAgents.map(async (agent) => {
          try {
            const sagentregno = agent.sagentregno;

            const [sAgentRes, companyRes] = await Promise.all([
              sagentregno
                ? API.graphql(graphqlOperation(getSAgent, { saPhoneContact: sagentregno }))
                : Promise.resolve({ data: { getSAgent: { MFKWithdrwlFee: 0 } } }),
              API.graphql(graphqlOperation(getCompany, { AdminId: "BaruchHabaB'ShemAdonai2" })),
            ]);

            const MFN = parseFloat(agent.MFNWithdrwlFee || 0);
            const MFK = parseFloat(sAgentRes?.data?.getSAgent?.MFKWithdrwlFee || 0);
            const companyDisc = parseFloat(companyRes?.data?.getCompany?.companyComDisc || 0);
            const totalDiscount = MFN + MFK + companyDisc;

            return { ...agent, totalDiscount };
          } catch (error) {
            console.warn(`Failed to enrich agent ${agent.phonecontact}:`, error);
            return { ...agent, totalDiscount: parseFloat(agent.MFNWithdrwlFee || 0) };
          }
        })
      );

      setAgents(enrichedAgents);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      setErrorMsg('Failed to load agents. Please try again later.');
    } finally {
      setLoadingAgents(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    if (!userLocation || agents.length === 0) return;

    const filtered = agents.filter((agent) => {
      if (!agent.latitude || !agent.longitude) return false;
      const distance = getDistance(userLocation, {
        latitude: parseFloat(agent.latitude),
        longitude: parseFloat(agent.longitude),
      });
      return distance <= radiusKm * 1000;
    });

    setFilteredAgents(filtered);

    if (!filtered.some((a) => a.phonecontact === selectedAgentPhone)) {
      setSelectedAgentPhone(null);
    }
  }, [userLocation, radiusKm, agents]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (selectedAgentPhone) {
      const selected = filteredAgents.find((a) => a.phonecontact === selectedAgentPhone);
      if (selected) {
        mapRef.current.animateToRegion(
          {
            latitude: parseFloat(selected.latitude),
            longitude: parseFloat(selected.longitude),
            latitudeDelta: radiusToDelta(radiusKm),
            longitudeDelta: radiusToDelta(radiusKm),
          },
          1000
        );

        const index = filteredAgents.findIndex((a) => a.phonecontact === selectedAgentPhone);
        if (index !== -1 && carouselRef.current) {
          setTimeout(() => {
            isManualScroll.current = true;
            carouselRef.current.scrollToIndex({
              index,
              animated: true,
              viewOffset: (width - CARD_WIDTH) / 2,
            });
            setTimeout(() => (isManualScroll.current = false), 500);
          }, 100);
        }
      }
    } else if (userLocation) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: radiusToDelta(radiusKm),
          longitudeDelta: radiusToDelta(radiusKm),
        },
        1000
      );
    }
  }, [selectedAgentPhone, radiusKm, userLocation, filteredAgents]);

  const onViewChanged = useRef(({ viewableItems }) => {
    if (!isManualScroll.current && viewableItems.length > 0) {
      const phone = viewableItems[0]?.item?.phonecontact;
      if (phone) setSelectedAgentPhone(phone);
    }
  });

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 70 });

  const adjustRadius = (increment = true) => {
    setRadiusKm((prev) => {
      const next = parseFloat((prev + (increment ? 0.1 : -0.1)).toFixed(2));
      return Math.max(0.1, Math.min(next, MAX_RADIUS_KM));
    });
  };

  if (!userLocation) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {errorMsg ? <Text>{errorMsg}</Text> : <ActivityIndicator size="large" />}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: radiusToDelta(radiusKm),
          longitudeDelta: radiusToDelta(radiusKm),
        }}
      >
        {filteredAgents.map((agent) => (
          <CustomMarker
            key={agent.phonecontact}
            coordinate={{
              latitude: parseFloat(agent.latitude),
              longitude: parseFloat(agent.longitude),
            }}
            totalDiscount={agent.totalDiscount || 0}
            onPress={() => setSelectedAgentPhone(agent.phonecontact)}
            isSelected={selectedAgentPhone === agent.phonecontact}
          />
        ))}
      </MapView>

      <View style={{ position: 'absolute', bottom: 30, width: '100%' }}>
        <FlatList
          ref={carouselRef}
          data={filteredAgents}
          keyExtractor={(item) => item.phonecontact}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          snapToAlignment="start"
          decelerationRate="fast"
          onViewableItemsChanged={onViewChanged.current}
          viewabilityConfig={viewabilityConfig.current}
          renderItem={({ item }) => (
            <Carousels Agent={item} isSelected={item.phonecontact === selectedAgentPhone} />
          )}
          getItemLayout={(_, index) => ({
            length: CARD_WIDTH,
            offset: CARD_WIDTH * index,
            index,
          })}
          contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 2 }}
        />
      </View>

      {/* Radius Controls */}
      <View
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? 50 : 30,
          right: 20,
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: 10,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Pressable
          onPress={() => adjustRadius(false)}
          style={{
            marginHorizontal: 5,
            padding: 8,
            backgroundColor: radiusKm > 0.1 ? '#007AFF' : '#ccc',
            borderRadius: 5,
          }}
          disabled={radiusKm <= 0.1}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>-100M</Text>
        </Pressable>

        <Text style={{ marginHorizontal: 10, fontWeight: 'bold' }}>
          {(radiusKm * 1000).toFixed(0)} M
        </Text>

        <Pressable
          onPress={() => adjustRadius(true)}
          style={{
            marginHorizontal: 5,
            padding: 8,
            backgroundColor: '#007AFF',
            borderRadius: 5,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>+100M</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GenralShpMpViewThree;
