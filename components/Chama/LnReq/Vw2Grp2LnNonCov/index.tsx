import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export interface SMAccount {
    SMAc: {
      grpContact:string,
      grpName:string,
      grpBal:number,
      
    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        grpName,
        grpBal,
       
        grpContact
   }} = props ;

   const[isLoading, setIsLoading] = useState(false);
   const navigation = useNavigation();
   

   const SndChmMmbrMny = () => {
       navigation.navigate("ChamaVw2GrantLnReqNonCov", {grpContact})

   }

   

    return (
        
           <Pressable onPress = {SndChmMmbrMny}
            style = {styles.pageContainer}
            >
        <Text style={styles.prodInfo}><Text style={styles.label}>Group Name:</Text> {grpName}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Group Contact:</Text> {grpContact}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Group Balance:</Text> {grpBal.toFixed(2)}</Text>
       
                     
                  
            </Pressable>
    );
}; 

export default SMCvLnStts