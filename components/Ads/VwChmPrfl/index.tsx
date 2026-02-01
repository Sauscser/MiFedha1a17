import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';



import styles from './styles';



export interface SMAccount {
    SMAc: {
      grpContact: string,
      
      grpName: string,  
      venture:string,
      
      oprtnArea:string,
      description:string,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         
         grpContact,  
         grpName,
         venture,
         oprtnArea,
         description,  

                 
   }} = props ;

   const navigation = useNavigation();
   const SndChmMmbrMny = () => {
      navigation.navigate ("DetailedChmPrfl", {grpContact})
   }
 
    return (
      <TouchableOpacity 
      onPress={SndChmMmbrMny}
      style = {styles.pageContainer}>     

      <Text style={styles.prodInfo}><Text style={styles.label}>Chama Name:</Text> {grpName}</Text>
      <Text style={styles.prodInfo}><Text style={styles.label}>Chama Contact:</Text> {grpContact}</Text>
      <Text style={styles.prodInfo}><Text style={styles.label}>Chama Venture:</Text> {venture}</Text>
                    
        </TouchableOpacity>
    );
}; 

export default ViewSMDeposts