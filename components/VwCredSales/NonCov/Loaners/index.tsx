import React from 'react';
import {View, Text,    ScrollView} from 'react-native';
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
   
     createdAt:string,
     updatedAt:string,
       
   }}

const CredSlrCvLnStts = (props:ChmCvLnSttusRec) => {
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
     
     createdAt,
     updatedAt,
  }} = props ;
   return (
       <View style = {styles.container}>              
           <View style = {{alignItems:"center"}}>
           <Text style = {styles.loanAdvert}>                       
                      {/*loaner details */}   
                      {SellerName}               
                   </Text>
           </View>
           
           <ScrollView >              
                
                    <Text style = {styles.ownerName}>                       
                      {/*loaner details */}   
                      Loan Id: {id}                 
                   </Text>
                   
                   <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                       Cash Price (Ksh): {amountSold.toFixed(2)}                
                    </Text>                     
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       Credit Sale Price(Ksh): {amountexpectedBack.toFixed(2)}
                    </Text>   
                   <Text style = {styles.repaymentPeriod}>                       
                      {/* repaymentPeriod*/}
                      Amount Repaid(Ksh): {amountRepaid.toFixed(2)}                  
                   </Text> 
                   <Text style = {styles.interest}>                       
                      {/* interest*/}
                      Loan Balance(Ksh): {lonBala.toFixed(2)}                    
                   </Text> 
                   <Text style = {styles.interest}>                       
                      {/* interest*/}
                      Repayment Period in days: {repaymentPeriod}                    
                   </Text> 
                   <Text style = {styles.interest}>                       
                      {/* interest*/}
                    Seller Contact: {sellerContact}                    
                   </Text> 
                
                   <Text style = {styles.interest}>                       
                      {/* interest*/}
                     Item Name(s): {itemName}                    
                   </Text> 
               
                   <Text style = {styles.interest}>                       
                      {/* interest*/}
                     Loan Status: {status}                    
                   </Text> 
                   <ScrollView>
                   <Text style = {styles.loanerotherdescriptions} >                       
                      {/* other description*/} 
                      Created At: {createdAt}                 
                   </Text>   
                   <Text style = {styles.loanerotherdescriptions} >                       
                      {/* other description*/} 
                      Last Update: {updatedAt}                 
                   </Text>   
                   <Text style = {styles.loanerotherdescriptions} >                       
                      {/* other description*/} 
                      More: {description}                 
                   </Text>   
                   </ScrollView>              
           
           
       </ScrollView>
               
       </View>
   );
}; 

export default CredSlrCvLnStts