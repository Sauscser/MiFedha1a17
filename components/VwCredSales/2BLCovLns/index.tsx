import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,  Pressable,  } from 'react-native';
import styles from './styles';


export interface ChmCvLnSttusRec {
    Loanee: {
      id: string,
      itemName: string,
     
      buyerContact: string,
      
      buyerName:string,
   
      amountSold: number,
      amountexpectedBack: number,
      amountRepaid: number,
      repaymentPeriod: number,
      lonBala:number,
      description: string,
      status: string,
      advregnu: string,
      createdAt:string,
      updatedAt:string,
        
    }}

const CredSlrCvLnStts = (props:ChmCvLnSttusRec) => {
   const {
    Loanee: {
      id,
      itemName,
      createdAt,
      buyerName,
   
      lonBala,
      
   }} = props ;
   const navigation = useNavigation();

   const SndChmMmbrMny = () => {
      navigation.navigate("BListCredByrCovs", {id})
   }
    return (

      <View style = {styles.pageContainer}>
      <Pressable 
      onPress={SndChmMmbrMny}
      style = {styles.card}>            
           
            <Text style = {styles.prodName}>                       
                       {/*loaner details */}   
                       {buyerName}               
                    </Text>
           <Text style={styles.prodInfo}><Text style={styles.label}>Loan ID:</Text> {id}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance:</Text> KES {lonBala.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Item Name:</Text> {itemName}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Time loan was given:</Text> {createdAt}</Text>
           
        </Pressable>

        </View>
    );
}; 

export default CredSlrCvLnStts