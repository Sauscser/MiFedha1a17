import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text,  Pressable,  } from 'react-native';

import styles from './styles';


export interface ChamaMmbrshpInfo {
    ChamaMmbrshpDtls: {
      id: string,
      lonBala:number,
      loaneeName:string,
      createdAt:string
      
      
    }}

const ChmMbrShpInfo = (props:ChamaMmbrshpInfo) => {
   const {
      ChamaMmbrshpDtls: {
         id,
         lonBala,
         loaneeName,
         createdAt
         
   }} = props ;

   const navigation = useNavigation();
    
   const SndChmMmbrMny = () => {
      navigation.navigate("BLChmMmberNonCovs", {id})
   }
   
    return (
       <Pressable 
       onPress={SndChmMmbrMny}
       style = {styles.pageContainer}>          
          
       <Text style={styles.prodInfo}><Text style={styles.label}>Loan ID: </Text> {id}</Text>
     <Text style={styles.prodInfo}><Text style={styles.label}>member Name: </Text> {loaneeName}</Text>
     <Text style={styles.prodInfo}><Text style={styles.label}>Time loan was taken: </Text> {createdAt}</Text>
     <Text style={styles.prodInfo}><Text style={styles.label}>loan Balance: </Text> KES {lonBala.toFixed(2)}</Text>
   
               
        </Pressable>
    );
}; 

export default ChmMbrShpInfo