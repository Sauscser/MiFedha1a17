import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,  Pressable,  } from 'react-native';
import styles from './styles';


export interface SMCvLnSttus {
    Loanee: {
        loanID:string,
        loaneePhn: string,
        amountgiven: number,
        amountexpected: number,
        amountrepaid: number,
        lonBala: number,
        repaymentPeriod: number,
        advregnu: string,
        loanername:string,
        status: string,
        description: string,
        createdAt:string,
        updatedAt:string,
        crtnDate: number,
      interest:number
        
    }}

const SMCvLnStts = (props:SMCvLnSttus) => {
   const {
    Loanee: {
        loanID,
    
    lonBala,
    
    loanername,
    crtnDate,
         interest
    
   }} = props ;

   const navigation = useNavigation();

   const SndChmMmbrMny = () => {
       navigation.navigate("RpyBiz2Pal", {loanID})
   }

   
    return (

        <View style = {styles.pageContainer}>
        <Pressable 
        onPress={SndChmMmbrMny}
        style = {styles.card}>             
            
            

            <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Name:</Text> {loanername}</Text>           
           <Text style={styles.prodInfo}><Text style={styles.label}>Loan ID:</Text> {loanID}</Text>           
           <Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance:</Text> KES {lonBala.toFixed(2)}</Text>

                        
                    </Pressable>
                     </View>
    );
}; 

export default SMCvLnStts