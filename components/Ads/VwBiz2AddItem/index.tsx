import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,  Pressable,  } from 'react-native';
import styles from './styles';


export interface ChmCvLnSttusRec {
    Loanee: {
      BiznaName: string,
      workerId:string,
      BusinessRegNo: string,
      workId:string
    
      
    }}

const CredSlrCvLnStts = (props:ChmCvLnSttusRec) => {
   const {
    Loanee: {
      BiznaName,
      workerId,
      BusinessRegNo,
      workId
      
   }} = props ;
   const navigation = useNavigation();

   const SndChmMmbrMny = () => {
      navigation.navigate("ItemAds", {BusinessRegNo})
   }
    return (
      <Pressable 
      onPress={SndChmMmbrMny}
      style = {styles.pageContainer}> 
      <View style = {styles.card}>          
            <Text style={styles.prodInfo}><Text style={styles.label}>Bizna Name:</Text> {BiznaName}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>BiznaAccount:</Text> {BusinessRegNo}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Perssonel Id:</Text> {workerId}</Text>
        </View> 
        </Pressable>
    );
}; 

export default CredSlrCvLnStts