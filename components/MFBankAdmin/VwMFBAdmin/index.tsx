import React from 'react';
import {View, Text,   ScrollView} from 'react-native';


import styles from './styles';



export interface SMAccount {
    SMAc: {
      name: string,
  phonecontact: string,
 
  BankAdmBal: number,
 
  bank:string,

              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         name,
         phonecontact,
        
         BankAdmBal,
        
         bank,
                 
   }} = props ;

 
    return (
        <View style = {styles.pageContainer}>              
                      
            <View style = {styles.card}>   
              <Text style={styles.prodInfo}><Text style={styles.label}>Name:</Text> {name}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Phone Number:</Text> {phonecontact}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Account Balance:</Text> KES {BankAdmBal.toFixed(2)}</Text>
        
        </View>
                
        </View>
    );
}; 

export default ViewSMDeposts