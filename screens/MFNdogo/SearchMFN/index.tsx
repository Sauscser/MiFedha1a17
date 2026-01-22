import React, {useState, useEffect, useRef} from 'react';

import {View, FlatList, useWindowDimensions, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {listAgents} from '../../../src/graphql/queries';
import * as Location from 'expo-location';

import {graphqlOperation, API} from 'aws-amplify';
import { useRoute } from '@react-navigation/core';
import CustomMarker from '../../../components/MFNdogo/CustomMarkr';
import Carousels from '../../../components/MFNdogo/MFNCarousel';

const GenralShpMpViewThree = props => {
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const [MFN, setMFN] = useState([]);
    const [MFNss, setMFNss] = useState([]);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const[loading, setLoading] = useState(false);
    const route = useRoute()

    const flatlist = useRef();
    const map = useRef();
    const width = useWindowDimensions().width;
    
    const fetchMFN = async () => {
      try {
        const response:any = await API.graphql(
          graphqlOperation(
            listAgents,

            { filter: {
              and: {
                town: { contains: route.params.town},
                
              }
            }}
          )
        )

        setMFN(response.data.listAgents.items);
      } catch (e) {
        console.error(e);
      }
    };

    useEffect(() => {
      fetchMFN();
    }, []);

    
    const viewConfig = useRef({itemVisiblePercentThreshold: 70})
  const onViewChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const selectedPlace = viewableItems[0].item;
      setSelectedPlaceId(selectedPlace.id)
    }
  })

  

  useEffect(() => {
    if (!selectedPlaceId || !flatlist) {
      return;
    }
    const index = MFN.findIndex(place => place.id === selectedPlaceId)
    flatlist.current.scrollToIndex({index})

    const selectedPlace = MFN[index];
    const region = {
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      latitudeDelta: 0.8,
      longitudeDelta: 0.8,
    }
    map.current.animateToRegion(region);
  }, [selectedPlaceId])

    

  
    
      
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  

    return (
      


<MapView
  ref={map}
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={{
            latitude: -0.5261561709274195,
            longitude: 37.58980744767201,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8,
          }}>
          {MFN.map((place) => (
        <CustomMarker
          key={place.phonecontact}
          coordinate={{latitude: place.latitude, longitude: place.longitude}}
          MFNWithdrwlFee={place.MFNWithdrwlFee}
          name={place.name}
          phonecontact={place.phonecontact}
        isSelected={place.id === selectedPlaceId}
        onPress={() => setSelectedPlaceId(place.id)}
        />
      ))}
    </MapView>


    



  );
};
  export default GenralShpMpViewThree;