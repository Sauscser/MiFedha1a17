import React from 'react';
import {View, Text, ImageBackground, Pressable, TextInput, ScrollView} from 'react-native';
import styles from './styles';


export interface ChmCvLnSttusRec {
   Loanee: {
     id: string,
     itemName: string,
 
     sellerContact: string,
     
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

const CredByrCvLnStts = (props:ChmCvLnSttusRec) => {
  const {
   Loanee: {
     id,
     itemName,
     
     sellerContact,
     
     SellerName,
  
     amountSold,
     amountexpectedBack,
     amountRepaid,
     repaymentPeriod,
     lonBala,
     description,
     status,
     advregnu,
     createdAt,
     updatedAt,
  }} = props ;
   return (
       <View style = {styles.pageContainer}>              
            <View style = {styles.card}>
            <Text style = {styles.prodName}>                       
                       {/*loaner details */}   
                       {SellerName}               
                    </Text>

            <Text style={styles.prodInfo}><Text style={styles.label}>Transaction ID:</Text> {id}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Cash Price:</Text> KES {amountSold.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Credit Sale Price:</Text> KES {amountexpectedBack.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Amount Repaid:</Text> KES {amountRepaid.toFixed(2)}</Text>
           <Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance:</Text> KES {lonBala.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Repayment Period in days:</Text> {repaymentPeriod}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Seller Contact:</Text> {sellerContact}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Advocate Registration Number:</Text> {advregnu}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Item Name(s):</Text> {itemName}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Loan Status:</Text> {status}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Created At:</Text> {createdAt}</Text>
            <Text style={styles.prodDesc} > {description} </Text>           
                      
                      </View>
               
       </View>
   );
}; 

export default CredByrCvLnStts