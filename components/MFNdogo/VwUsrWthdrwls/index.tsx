import React from 'react';
import {View, Text,   ScrollView} from 'react-native';


import styles from './styles';


export interface SMAccount {
   SMAc: {
     id: string,
     
     withdrawerid: string,  
     agentPhonecontact: string,
     amount: number,
     userName:string,
     
     createdAt:string,
     updatedAt:string,
             
   }}

const ViewSMWithdrwls = (props:SMAccount) => {
  const {
     SMAc: {
        id,
        withdrawerid,  
        agentPhonecontact,
        amount,
        userName,
        createdAt,
        updatedAt,
                
  }} = props ;


   return (
       <View style = {styles.pageContainer}>   
           <View style = {styles.card}>

            <Text style={styles.prodInfo}><Text style={styles.label}>Depositing Entity:</Text> {userName}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Transaction ID:</Text> {id}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}> Amount:</Text> KES {amount.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}> Depositer Account:</Text> {withdrawerid}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Created At:</Text> {createdAt}</Text>
           </View>
               
       </View>
   );
}; 

export default ViewSMWithdrwls