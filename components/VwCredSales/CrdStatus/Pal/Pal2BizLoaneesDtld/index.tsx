import React from 'react';
import {View, Text,    ScrollView} from 'react-native';
import styles from './styles';


export interface ChmCvLnSttusRec {
    Loanee: {
      loanID: string,
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
      crtnDate: number,
      interest:number,
      amountExpectedBackWthClrnc:number,
      DefaultPenaltyCredSl2:number,
      clearanceAmt:number
        
    }}

const CredSlrCvLnStts = (props:ChmCvLnSttusRec) => {
   const {
    Loanee: {
      loanID,
      itemName,
      amountExpectedBackWthClrnc,
      DefaultPenaltyCredSl2,
      clearanceAmt,
     
      buyerContact,
      
      buyerName,
   
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
      crtnDate,
         interest
   }} = props ;

   const today = new Date();
              let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
              let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
              let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
              let years = (today.getFullYear() < 10 ? '0' : '') + today.getFullYear();
              let months = (today.getMonth() < 10 ? '0' : '') + today.getMonth();
              let months2 = parseFloat(months)
              let days = (today.getDate() < 10 ? '0' : '') + today.getDate();
              
              const now:any = years+ "-"+ "0"+months2 +"-"+ days+"T"+hours + ':' + minutes + ':' + seconds;

              const curYrs = parseFloat(years)*365;
              const curMnths = (months2)*30.4375;
              const daysUpToDate = curYrs + curMnths + parseFloat(days)

              const dayselapsed = (crtnDate - daysUpToDate) *(-1)

              const netLnBal = (amountExpectedBackWthClrnc) - 
              (clearanceAmt) -  (DefaultPenaltyCredSl2)
      
              const netLnBal2 = (netLnBal) * 
              ((Math.pow(1 + (interest)/36500, dayselapsed)))

              const LonBal1 = netLnBal2 + (clearanceAmt) +  (DefaultPenaltyCredSl2)


    return (
        <View style = {styles.pageContainer}>              
           <View style = {styles.card}>
           <Text style = {styles.prodName}>                       
                      {/*loaner details */}   
                      {buyerName}               
                   </Text>

                    <Text style={styles.prodInfo}><Text style={styles.label}>Loan ID:</Text> {loanID}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Cash Price:</Text> KES {amountSold.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Credit Sale Price:</Text> KES {amountexpectedBack.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Amount Repaid:</Text> KES {amountRepaid.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance with Penalties:</Text> KES {LonBal1.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Repayment Period in days:</Text> {repaymentPeriod}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Buyer Contact:</Text> {buyerContact}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Advocate Registration Number:</Text> {advregnu}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Item Name(s):</Text> {itemName}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Loan Status:</Text> {status}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Created At:</Text> {createdAt}</Text>
            <Text style={styles.prodDesc} > {description} </Text>           
                   
                 </View>
               
       </View>
   
    );
}; 

export default CredSlrCvLnStts