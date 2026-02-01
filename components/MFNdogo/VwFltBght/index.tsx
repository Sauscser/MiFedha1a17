import React from 'react';
import {View, Text,   ScrollView} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {
      id: string,
      
      transactId: string,  
      agentphone:string,
      amount: number,
      
      
      createdAt:string,
      updatedAt:string,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         id,
         transactId,  
         agentphone,
         amount,
        
         createdAt,
         updatedAt,
                 
   }} = props ;

 
    return (
        <View style = {styles.pageContainer}>    
          <View style = {styles.card}>

             <Text style={styles.prodInfo}><Text style={styles.label}>Transaction ID:</Text> {id}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Transaction Code:</Text> {transactId}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Amount:</Text> KES {amount.toFixed(2)}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Transaction Time:</Text> {createdAt}</Text>
             </View>
                
        </View>
    );
}; 

export default ViewSMDeposts