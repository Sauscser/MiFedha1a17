import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,  Pressable,  } from 'react-native';
import styles from './styles';


export interface SMCvLnSttus {
    Loanee: {
        id:string,
        loaneePhn: string,
        
        lonBala: number,
        createdAt:string,
        loaneename:string,
        
        
    }}

const SMCvLnStts = (props:SMCvLnSttus) => {
   const {
    Loanee: {
    id,
    loaneePhn,
    
    lonBala,
    createdAt,
    loaneename,
    
   }} = props ;

   const navigation = useNavigation();
   const SndChmMmbrMny = () => {
       navigation.navigate("BListSMLneeNonCovs", {id})
   }

    return (
        <Pressable 
       onPress={SndChmMmbrMny}
       style = {styles.container}>  
            
            <View style = {{alignItems:"center"}}>
            <Text style = {styles.loanAdvert}>                       
                       {/*loaner details */}   
                       {loaneename}               
                    </Text>
            </View>
                  
            
           
                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Loan Id: {id}                 
                    </Text>
                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Loanee Contact: {loaneePhn}                 
                    </Text>
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       Loan Balance (Ksh): {lonBala}
                    </Text>   

                    <Text style = {styles.amountoffered}>                       
                       {/*loaner details */}  
                     Time given: {createdAt}                
                    </Text>                       
        
        </Pressable>
    );
}; 

export default SMCvLnStts