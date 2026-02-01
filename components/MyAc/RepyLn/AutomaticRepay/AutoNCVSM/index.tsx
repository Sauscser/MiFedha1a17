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
        loanername:string,
        status: string,
        description: string,
        createdAt:string,
        updatedAt:string,
        
    }}

const SMCvLnStts = (props:SMCvLnSttus) => {
   const {
    Loanee: {
        loanID,
    
    lonBala,
   
    loanername,
    
   }} = props ;

   const navigation = useNavigation();

   const SndChmMmbrMny = () => {
       navigation.navigate("RepayNonCovLnss", {loanID})
   }
    return (
        <Pressable 
        onPress={SndChmMmbrMny}
        style = {styles.container}>  
             
            <View style = {{alignItems:"center"}}>
            <Text style = {styles.loanAdvert}>                       
                       {/*loaner details */}   
                       {loanername}               
                    </Text>
            </View>
           
                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Loan Id: {loanID}                 
                    </Text>
                    
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                      Loan Balance (Ksh): {lonBala.toFixed(2)}
                    </Text>                   
                   
                    </Pressable>
    );
}; 

export default SMCvLnStts