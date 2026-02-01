import React from 'react';
import {View, Text, ScrollView} from 'react-native';


import styles from './styles';



export interface SMAccount {
    SMAc: {
      rafikiName: string,
      
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
         rafikiEmail,
         rafikiamnt,
         rafikidesc,  
         rafikiprcntg,
         rafikirpymntperiod,

                 
   }} = props ;

 
    return (
        <View style = {styles.pageContainer}>              
              
            
              <View style={styles.card}>           
                       
            <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Name:</Text> {rafikiName}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Contact:</Text> {rafikicntct}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Email:</Text> {rafikiEmail}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Loan Amount:</Text> KES {rafikiamnt.toLocaleString()}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Repayment days:</Text> {rafikirpymntperiod.toLocaleString()}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Annual Percentage Rate:</Text> {rafikiprcntg.toLocaleString()}</Text>
            <Text style={styles.prodDesc}>{rafikidesc}</Text>            
                   
        </View>
                
        </View>
    );
}; 

export default ViewSMDeposts