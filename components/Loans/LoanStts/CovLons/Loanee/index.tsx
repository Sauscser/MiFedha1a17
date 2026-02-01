import React from 'react';
import {View, Text,    ScrollView} from 'react-native';
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
        advregnu: string,
        loaneename:string,
        status: string,
        description: string,
        createdAt:string,
        updatedAt:string,
        amountExpectedBackWthClrnc: number,
        DefaultPenaltySM2:number,
        
    }}

const SMCvLnStts = (props:SMCvLnSttus) => {
   const {
    Loanee: {
      loanID,
    loaneePhn,
    amountgiven,
    amountexpected,
    amountrepaid,
    lonBala,
    repaymentPeriod,
    advregnu,
    amountExpectedBackWthClrnc,
    DefaultPenaltySM2,
    loaneename,
    status,
    description,
    createdAt,
    updatedAt,
   }} = props ;
    return (
        <View style = {styles.pageContainer}>    
            <View style = {styles.card}>
            <Text style = {styles.prodName}>                       
                       {/*loaner details */}   
                       {loaneename}               
                    </Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loan Id:</Text> {loanID}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loanee Contact:</Text> {loaneePhn}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance with penalties:</Text> KES {LonBal1.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Amount Given:</Text> KES {amountgiven.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Amount Expected Back:</Text> KES {amountexpected.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Amount Repaid:</Text> KES {amountrepaid.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Balance if Blacklisted:</Text> KES {amountExpectedBackWthClrnc.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Blacklisting Penalty:</Text> KES {DefaultPenaltySM2.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance:</Text> KES {lonBala.toFixed(2)}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Repayment Period in days:</Text> {repaymentPeriod}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Advocate Registration Number:</Text> {advregnu}</Text>

                <Text style={styles.prodInfo}><Text style={styles.label}>Loan Status:</Text> {status}</Text>
                
        </View>
        </View>
    );
}; 

export default SMCvLnStts