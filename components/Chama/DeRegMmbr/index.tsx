import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text,  Pressable,  View, ScrollView} from 'react-native';

import styles from './styles';


export interface ChamaMmbrshpInfo {
    ChamaMmbrshpDtls: {
      id: string,
      memberContact:string,
      memberName:string,
      
    }}

const ChmMbrShpInfo = (props:ChamaMmbrshpInfo) => {
   const {
      ChamaMmbrshpDtls: {
         id,
         memberContact,
         memberName,
         
   }} = props ;

   const navigation = useNavigation();
    
   const SndChmMmbrMny = () => {
      navigation.navigate("RemoveChmMbrs", {id})
   }
   
    return (
       <Pressable 
       onPress={SndChmMmbrMny}
       style = {styles.pageContainer}>          
          
          <View style = {styles.card}>
         
         <Text style={styles.prodInfo}><Text style={styles.label}>Member Name:</Text> {memberName}</Text>
         <Text style={styles.prodInfo}><Text style={styles.label}> Member Chama ID:</Text> {id}</Text>
         <Text style={styles.prodInfo}><Text style={styles.label}>Member Contact:</Text> {memberContact}</Text>
        
             </View>                   
               
        </Pressable>
    );
}; 

export default ChmMbrShpInfo