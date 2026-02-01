
import React from 'react';
import {View, Text,   ScrollView} from 'react-native';

import styles from './styles';


export interface ChmaInfo {
    ChmDtls: {
      
      BusKntct: string,
      netEarnings: number,
      busName: string,
      TtlEarnings: number,
      earningsBal: number
      benefitsAmount:number,
      description: string,
        
    }}

const ChmInfo = (props:ChmaInfo) => {
   const {
      ChmDtls: {
        
         benefitsAmount,
      netEarnings,
      busName,
      TtlEarnings,
      earningsBal,
      
      description,
   }} = props ;

    return (
        <View style = {styles.pageContainer}>              
               
            <View style = {styles.card}>
            <Text style = {styles.prodName}>                       
                       {/*loaner details */}   
                       Business Info          
                    </Text>
                

                   <Text style={styles.prodInfo}><Text style={styles.label}>Business Name:</Text> {busName}</Text>
                   <Text style={styles.prodInfo}><Text style={styles.label}>Business Balance:</Text> KES {netEarnings.toFixed(2)}</Text>
                   <Text style={styles.prodInfo}><Text style={styles.label}>Pooled Benefits:</Text> KES {benefitsAmount.toFixed(2)}</Text>
                   <Text style={styles.prodDesc} > {description} </Text>     
                     </View>
                
        </View>
    );
}; 

export default ChmInfo