import React  from 'react';
import {View, Text, ScrollView} from 'react-native';

import styles from './styles';



export interface SMAccount {
   SMAc: {
      loanID:string,
      loaneePhn: string,      
      loanerPhn: string,  
      loanername:string,
      loaneename: string,  
      amountgiven:number,
      amountexpected: number,      
      amountrepaid: number,  
      lonBala:number,
      repaymentPeriod:number,
      advregnu:number,
      description:string,
      createdAt:string,
      updatedAt:string,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         loanID,
         loaneePhn,
         loanerPhn,  
         loanername,
         loaneename,
         amountgiven,
         amountexpected,
         amountrepaid,
         lonBala,
         repaymentPeriod,
         
         description,
         createdAt,
         updatedAt,
                 
   }} = props ;

 
    return (
        <View style = {styles.pageContainer}>              
          <View style = {styles.card}>
         <Text style={styles.prodInfo}><Text style={styles.label}>Loan ID: </Text> {loanID}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Name: </Text> {loanername}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Loanee Name: </Text> {loaneename}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Contact: </Text> {loanerPhn}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}> Loanee Contact: </Text> {loaneePhn}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Time taken: </Text> {createdAt}</Text>

        <Text style={styles.prodInfo}><Text style={styles.label}>Loan Amount:</Text> KES {amountgiven.toFixed(2)}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Amount Expected Back: </Text> KES {loanername}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Repayment Period: </Text> {loaneename} days</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Contact: </Text> {loanerPhn}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}> Amount Repaid:</Text> KES {lonBala.toFixed(2)}</Text>
        <Text style={styles.prodDesc}>{description}</Text>
        
        </View>
                
        </View>
    );
}; 

export default ViewSMDeposts