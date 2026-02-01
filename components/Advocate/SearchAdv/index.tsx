import React from 'react';
import {View, Text,ScrollView} from 'react-native';


import styles from './styles';



export interface SMAccount {
    SMAc: {
      name:string,
      phonecontact: string,
      email: string,
      officeLoc: number,  
      advregnu:string,
      
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         name,
         phonecontact,
         officeLoc,  
         advregnu,
         email,
                 
   }} = props ;

 
    return (
        <View style = {styles.pageContainer}>              
            
            <View style = {styles.card}>
                
         <Text style={styles.prodInfo}><Text style={styles.label}>Phone: </Text> {phonecontact}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Email: </Text> {email}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Location: </Text> {officeLoc}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>License Number: </Text> {advregnu}</Text>
        
        </View>
                
        </View>
    );
}; 

export default ViewSMDeposts