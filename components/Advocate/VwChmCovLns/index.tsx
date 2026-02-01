import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import styles from './styles';



export interface SMAccount {
    SMAc: {
      loanID: string,
      
      itemName: string,  
      itemSerialNumber:string,
      
      buyerContact:string,
      sellerContact:string,
      buyerName: string,
      
      SellerName: string,  
      amountSold:number,
      
      amountexpectedBack:number,
      amountRepaid:number,
      advregnu: string,
      
      repaymentPeriod: number,  
      lonBala:number,
      description: string,  
      
      
      createdAt:string,
      updatedAt:string,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         loanID,
         itemName,  
         itemSerialNumber,
         buyerContact,
         sellerContact,
         buyerName,
         SellerName,  
         amountSold,
         amountexpectedBack,
         amountRepaid,
         
         repaymentPeriod,  
         lonBala,
         description,
         createdAt,
         updatedAt,
                 
   }} = props ;

 
    return (
        <View style = {styles.container}>              
            
            <View style = {{alignItems:"center"}}>
            <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                       Loan ID: {loanID}             
                    </Text>
            </View>
            <ScrollView >              
                       
                        
                   <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Seller Name : {SellerName}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Buyer Name: {buyerName}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                      Item Name: {itemName}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                     Item Serial Number: {itemSerialNumber}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                      Cost (Ksh): {amountSold.toFixed(2)}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                     Amount Expected Back (Ksh): {amountexpectedBack.toFixed(2)}                 
                    </Text>
                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                      Repayment Period : {repaymentPeriod}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Amount Repaid : {amountRepaid.toFixed(2)}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Loan Balance: {lonBala.toFixed(2)}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Seller Contact : {sellerContact}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                      Buyer Contact: {buyerContact}                 
                    </Text>
                                                         
                  
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       Created At: {createdAt}
                    </Text>
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                     Last Update: {updatedAt}
                    </Text>
                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                    More: {description}                 
                    </Text>
                    
                    </ScrollView >             
                
        </View>
    );
}; 

export default ViewSMDeposts