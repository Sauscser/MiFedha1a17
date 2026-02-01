import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text, ImageBackground, Pressable, TextInput, ScrollView} from 'react-native';

import styles from './styles';


export interface ChamaMmbrshpInfo {
    ChamaMmbrshpDtls: {
      ChamaNMember: string,
      MembaId:string,
      groupName:string,
      
    }}

const ChmMbrShpInfo = (props:ChamaMmbrshpInfo) => {
   const {
      ChamaMmbrshpDtls: {
         ChamaNMember,
         MembaId,
         groupName,
        
   }} = props ;

   const navigation = useNavigation();
    
   const SndChmMmbrMny = () => {
      navigation.navigate("Contributionssss", {ChamaNMember})
   }
   
    return (
       <Pressable 
       onPress={SndChmMmbrMny}
       style = {styles.pageContainer}>          
          
          <Text style={styles.prodInfo}><Text style={styles.label}>Member Chama ID:</Text> {MembaId}</Text>
         <Text style={styles.prodInfo}><Text style={styles.label}>Chama Name:</Text> {groupName}</Text>
          
               
        </Pressable>
    );
}; 

export default ChmMbrShpInfo