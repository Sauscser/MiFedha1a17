import React from 'react';
import {View, Text,   ScrollView} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {
      id: string,
      senderEmail: string,  
      messageBody: string,
      createdAt: string,
      
    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
         id,
         senderEmail,   
         messageBody,
         createdAt,
       
        
   }} = props ;

 
    return (
        <View style = {styles.pageContainer}>              
            
            
            <View style={styles.card}>         
            <Text style={styles.prodInfo}><Text style={styles.label}>Message:</Text>  {messageBody}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Time: </Text> {createdAt}</Text>
            
        </View>
                
        </View>
    );
}; 

export default SMCvLnStts