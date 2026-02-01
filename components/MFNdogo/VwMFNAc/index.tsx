import React from 'react';
import {View, Text,   ScrollView} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {
      phonecontact: string,

    
      ttlEarnings: number,

      email: string,
      sagentregno: string,
      TtlFltIn: number,
      TtlFltOut: number,
      floatBal: number,
      latitude: number,
      longitude: number,
      agentEarningBal: number,

      createdAt:string,
      updatedAt:string,      
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         
         ttlEarnings,
   
         sagentregno,
         TtlFltIn,
         TtlFltOut,
         floatBal,
         
         agentEarningBal,
         createdAt,
         updatedAt,
                 
   }} = props ;

 
    return (
        <View style = {styles.pageContainer}>             
          
            <View style = {styles.card}>              
             <Text style={styles.prodInfo}><Text style={styles.label}>Total Float In:</Text> KES {TtlFltIn.toFixed(2)}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Total Float Out:</Text> KES {TtlFltOut.toFixed(2)}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Float Balance:</Text> KES {floatBal.toFixed(2)}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Total Earnings:</Text> KES {ttlEarnings.toFixed(2)}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Earning Balance:</Text> KES {agentEarningBal.toFixed(2)}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>MFKubwa Number:</Text> {sagentregno}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Created At:</Text> {createdAt}</Text>
                  
        </View>
                
        </View>
    );
}; 

export default ViewSMDeposts