import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,  Pressable,  } from 'react-native';
import styles from './styles';


export interface SMCvLnSttus {
    Loanee: {
      loanID:string,
        loaneePhn: string,
        
        lonBala: number,
        createdAt:string
        loaneename:string,
        
    }}

const SMCvLnStts = (props:SMCvLnSttus) => {
   const {
    Loanee: {
      loanID,
    loaneePhn,
    
    lonBala,
    createdAt,
    loaneename,
   
   }} = props ;

   const navigation = useNavigation()

   
   const SndChmMmbrMny = () => {
      navigation.navigate("BLPal2Pal", {loanID})
   }
    return (
      
      <View style = {styles.pageContainer}>
      <Pressable 
       onPress={SndChmMmbrMny}
       style = {styles.card}>  
            <Text style={styles.prodInfo}><Text style={styles.label}>Loanee Name:</Text> {loaneename}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Loan ID:</Text> {loanID}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}> Loanee Contact:</Text> {loaneePhn}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}> Loan Balance:</Text> KES {lonBala}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Time Loan was given:</Text> {createdAt}</Text>
            
        </Pressable>
        </View>

    );
}; 

export default SMCvLnStts