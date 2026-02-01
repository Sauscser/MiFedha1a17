import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Linking, TouchableOpacity } from 'react-native';

import HomeTabNav from "../HomeTabNav";
import FindKFNdogoLoc from '../../screens/MFNdogo/SignInMFN';
import MyAccount from '../../screens/MyAcc';
import HowTo2 from "../../screens/HowTos";
import SearchPal from '../../screens/MyAcc/LoanRequest/VwMakeLnReq';
import Transport from '../../screens/Transport'
import GoShopping from '../../screens/Ads/Search/SrchItemAd'


const BottomTab = createBottomTabNavigator();


const HomeTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"

      screenOptions={{
        headerShown: false,
      }}
      >
      <BottomTab.Screen
        name='Home'
        component={HomeTabNav}
        options={{
          tabBarIcon: ({color: string}) => (
            <Fontisto name="home" size={25} color={'skyblue'} />
          ),
        }}
      />

      {/* MFNdogo (Location) */}
      <BottomTab.Screen
        name="MFNdogo"
        component={FindKFNdogoLoc}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="map-marker" size={25} color={color} />,
        }}
      />

      {/* My Account */}
      <BottomTab.Screen
        name="HowTo"
        component={HowTo2}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="youtube-play" size={25} color={color} />,
        }}
      />

      {/* Pal Deals */}
      <BottomTab.Screen
        name="Transport"
        component={Transport}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="emoji-transportation" size={25} color={color} />,
        }}
      />

      {/* How To (Opens YouTube Channel) */}
      <BottomTab.Screen
        name="GoShopping"
        component={GoShopping} // No actual screen, just an action
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="map-marker" size={25} color={color} />,
          
        }}
      />

      {/* Search Pal */}
      <BottomTab.Screen
        name="Search Pal"
        component={SearchPal}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="search" size={25} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default HomeTabNavigator;
