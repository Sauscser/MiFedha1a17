import React from 'react';
import {View, Text,    ScrollView} from 'react-native';
import styles from './styles';


export interface SMCvLnSttus {
    Loanee: {
      loanID:string,
        loanerPhn: string,
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
        amountExpectedBackWthClrnc: number,
        DefaultPenaltySM2:number,
        advEmail:string,
        crtnDate: number,
      interest:number,
      clearanceAmt:number
        
        
    }}

const SMCvLnStts = (props:SMCvLnSttus) => {
   const {
    Loanee: {
      loanID,
    loanerPhn,
    amountgiven,
    amountexpected,
    amountrepaid,
    clearanceAmt,
    repaymentPeriod,
    advregnu,
    amountExpectedBackWthClrnc,
    DefaultPenaltySM2,
    loanername,
    status,
    description,
    createdAt,
    advEmail,
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

              const netLnBal = amountexpected - amountrepaid
              const netLnBal2 = (netLnBal) * 
              ((Math.pow(1 + (interest)/36500, dayselapsed)))

              const LonBal1 = netLnBal2 + (clearanceAmt) +  (DefaultPenaltySM2)

    return (
       <View style = {styles.pageContainer}>      
            <View style = {styles.card}>
            <Text style = {styles.prodName}>                       
                       {/*loaner details */}   
                       {loanername}               
                    </Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loan Id:</Text> {loanID}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Contact:</Text> {loanerPhn}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance with penalties:</Text> KES {LonBal1.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Amount Given:</Text> KES {amountgiven.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Amount Expected Back:</Text> KES {amountexpected.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Amount Repaid:</Text> KES {amountrepaid.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Balance if Blacklisted:</Text> KES {amountExpectedBackWthClrnc.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Blacklisting Penalty:</Text> KES {DefaultPenaltySM2.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance:</Text> KES {LonBal1.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Repayment Period in days:</Text> {repaymentPeriod}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Advocate Registration Number:</Text> {advregnu}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Advocate Email:</Text> {advEmail}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loan Status:</Text> {status}</Text>
                <Text style={styles.prodDesc}> {description}</Text>
            
            
        </View>
                
        </View>
    );
}; 

export default SMCvLnStts