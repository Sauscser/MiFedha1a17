
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';

import styles from './styles';


export interface ChmaInfo {
    ChmDtls: {
      
      BusKntct: string,
      status: number,
      busName: string,
      TtlEarnings: number,
      earningsBal: number
      
      description: string,
        
    }}

const ChmInfo = (props:ChmaInfo) => {
   const {
      ChmDtls: {
        
      BusKntct,
      status,
      busName,
      TtlEarnings,
      earningsBal,
      
      description,
   }} = props ;

   const navigation = useNavigation();

   const SndChmMmbrMny = () => {
      navigation.navigate("TakeOverBizna", {BusKntct})
   }

    return (

      <View style = {styles.pageContainer}>
      <Pressable 
      onPress={SndChmMmbrMny}
      style = {styles.card}>   

      <Text style={styles.prodInfo}><Text style={styles.label}>Business Name:</Text> {busName}</Text>
      <Text style={styles.prodInfo}><Text style={styles.label}>Business Contact:</Text> {BusKntct}</Text>
      <Text style={styles.prodInfo}><Text style={styles.label}>Business Status:</Text> {status}</Text>
           
        </Pressable>
        </View>

    );
}; 

export default ChmInfo