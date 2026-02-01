import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';


import styles from './styles';



export interface SMAccount {
    SMAc: {
      rafikiName: string,
      id:string,
      rafikicntct: string,  
      rafikiEmail:string,
      
      rafikiamnt:number,
      rafikiprcntg:number
      rafikidesc:string,
      rafikirpymntperiod:number,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         
         rafikiName,  
         rafikicntct,
         id,
         rafikiamnt,
         rafikidesc,  
         rafikiprcntg,
         rafikirpymntperiod,

                 
   }} = props ;
   const navigation = useNavigation();
   const SndChmMmbrMny = () => {
      navigation.navigate ("DtldPalLnInfo", {id})
   }
 
    return (

      <View style = {styles.pageContainer}>
      <TouchableOpacity 
      onPress={SndChmMmbrMny}
      style = {styles.card}>    

      <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Name: </Text> {rafikiName}</Text>
      <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Contact: </Text> {rafikicntct}</Text>
      <Text style={styles.prodInfo}><Text style={styles.label}>Loan Amount:</Text> KES {rafikiamnt.toLocaleString()}</Text>
         
      </TouchableOpacity>
      </View>
    );
}; 

export default ViewSMDeposts