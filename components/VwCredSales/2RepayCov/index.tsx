import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text, ImageBackground, Pressable, TextInput, ScrollView} from 'react-native';
import styles from './styles';



     
     export interface ChmCvLnSttusRec {
         Loanee: {
           id: string,
           itemName: string,
           sellerContact:string,
           buyerContact: string,
           
           SellerName:string,
        
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
           SellerName,
           sellerContact,
           lonBala,
         
        }} = props ;
        const navigation = useNavigation();
     
        const SndChmMmbrMny = () => {
           navigation.navigate("RpayCredSlrCovs", {id})
        }
         return (

            <View style = {styles.pageContainer}>
           <Pressable 
           onPress={SndChmMmbrMny}
           style = {styles.card}>            
                 
                 <Text style = {styles.prodName}>                       
                            {/*loaner details */}   
                            {SellerName}               
                         </Text>
               

            <Text style={styles.prodInfo}><Text style={styles.label}>Loan ID:</Text> {id}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance:</Text> KES {lonBala.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Item Name:</Text> {itemName}</Text>
                  
             </Pressable>

             </View>
         );
     }; 
     
     export default CredSlrCvLnStts
     