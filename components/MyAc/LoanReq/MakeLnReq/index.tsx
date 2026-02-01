import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {
      name: string,
      phonecontact: string,
      awsemail:string,
      

        
    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
         name,
         phonecontact,   
        
         awsemail,
       
    
   }} = props ;

   const navigation = useNavigation();
   let LnrEml = awsemail;

   const SndChmMmbrMny = () => {
       navigation.navigate("PlaceLnReq")
   }
    return (
        
                  
            
            <View style = {styles.pageContainer}>   
            <View style = {styles.card}>           
                       
            <Text style={styles.prodInfo}><Text style={styles.label}>Name:</Text> {name}</Text>
           
           <Text style={styles.prodInfo}><Text style={styles.label}>Email:</Text> {awsemail}</Text>
           <Text style={styles.prodInfo}><Text style={styles.label}>Phone:</Text> {phonecontact}</Text>
          

          </View>
        </View >
                
       
    );
}; 

export default SMCvLnStts