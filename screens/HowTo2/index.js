import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Pressable, Dimensions, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCompany, getCompanyUrls } from '../../src/graphql/queries';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const HowTo = props => {
  const [Urlz, setUrlz] = useState("");
  const getCompUrls = async () => {
    try {
      const compDetailsz = await client.graphql({
        query: getCompanyUrls,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2Ulr"
        }
      });
      const Url1 = compDetailsz.data.getCompanyUrls.Url2;
      setUrlz(Url1);
      console.log(Url1);
      Linking.openURL(Url1);
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };
  useEffect(() => {
    getCompUrls();
  }, []);
};
export default HowTo;