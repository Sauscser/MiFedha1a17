import React from 'react';
import {View, Text, ScrollView} from 'react-native';


import styles from './styles';



export interface SMAccount {
    SMAc: {
      advregnu: string,
      
      TtlEarnings: number,  
      advBal:number,
      
      createdAt:string,
      updatedAt:string,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         
         TtlEarnings,  
         advBal,
         createdAt,
         updatedAt,
                 
   }} = props ;

 
    return (
        <View style = {styles.pageContainer}>              
            <View style = {styles.card}>

            <Text style={styles.prodInfo}><Text style={styles.label}>Total Earnings:</Text> KES {TtlEarnings.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Account Balance:</Text> KES {advBal.toFixed(2)}</Text>
                
        </View>
                
        </View>
    );
}; 

export default ViewSMDeposts