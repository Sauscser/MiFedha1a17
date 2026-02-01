import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,  ScrollView} from 'react-native';

import styles from './styles';


export interface ChamaMmbrshpInfo {
    ChamaMmbrshpDtls: {
      MembaId: string,
      ChamaNMember: string,
      groupContact: string,
      
      groupName:string,
      GrossLnsGvn:number,
      LonAmtGven: number,
      AmtRepaid:number,
      LnBal: number,
      NonLoanAcBal:number,
      ttlNonLonAcBal: number,
      AcStatus: string,
      loanStatus: string,
      blStatus: string,
      createdAt:string,
      subscriptionFrequency:number,
      subscriptionAmt:number,
      lateSubscriptionPenalty:number,
      ttlLateSubs:number,
      timeCrtd:number,
      subscribedAmt:number,
      memberChmBenefit:number,
      totalSubAmt:number
    }}

const ChmMbrShpInfo = (props:ChamaMmbrshpInfo) => {
   const {
      ChamaMmbrshpDtls: {
         MembaId,
         ChamaNMember,
         groupContact,
         subscriptionFrequency,
         subscriptionAmt,
         lateSubscriptionPenalty,
         ttlLateSubs,
         timeCrtd,
      subscribedAmt,
      totalSubAmt,
         groupName,
         loanStatus,
         blStatus,
         GrossLnsGvn,
         LonAmtGven,
         AmtRepaid,
         LnBal,
         NonLoanAcBal,
         ttlNonLonAcBal,
         createdAt,       
         AcStatus,
         memberChmBenefit
       
       
   }} = props ;

   const navigation = useNavigation();
   const today = new Date();
   let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
   let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
   let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
   let years = (today.getFullYear() < 10 ? '0' : '') + today.getFullYear();
   let months = (today.getMonth() < 10 ? '0' : '') + today.getMonth();
   let months2 = parseFloat(months)
   let days = (today.getDate() < 10 ? '0' : '') + today.getDate();
   
   const now:any = years+ "-"+ "0"+months2 +"-"+ days+"T"+hours + ':' + minutes + ':' + seconds;

   const now1:any = "2024-05-20";
  
   const curYrs = parseFloat(years)*365;
   const curMnths = (months2)*30.4375;
   const daysUpToDate = curYrs + curMnths + parseFloat(days)          
   const tmDif = daysUpToDate - timeCrtd;
   const subFreq = tmDif/subscriptionFrequency
   const Amt2HvBnSub = subFreq*subscriptionAmt
   const subPnlties = totalSubAmt - subscribedAmt
   const ttlArrears = (ttlLateSubs + Amt2HvBnSub).toFixed(0)
   
    return (
        <View style = {styles.pageContainer}>              
            <View style = {styles.card}>

<Text style={styles.prodName}>{groupName}</Text>

<Text style={styles.prodInfo}><Text style={styles.label}>Member Chama Number:</Text> {MembaId}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Member Chama ID:</Text> {ChamaNMember}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Funds to and from member Account:</Text> KES {NonLoanAcBal.toFixed(2)}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Subscription due:</Text> KES {Amt2HvBnSub.toFixed(2)}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Late subscription Penalties:</Text> KES {ttlLateSubs.toFixed(2)}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Subscription and Penalties:</Text> KES {ttlArrears}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Group Benefits:</Text> KES {ttlNonLonAcBal.toFixed(2)}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Group subscriptions:</Text> KES {subscribedAmt.toFixed(2)}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Gross Loans:</Text> KES {GrossLnsGvn.toFixed(2)}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Actual Loans:</Text> KES {LonAmtGven}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Amount repaid:</Text> KES {AmtRepaid.toFixed(2)}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance:</Text> KES {LnBal.toFixed(2)}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Gross Loans:</Text> KES {GrossLnsGvn.toFixed(2)}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Loan Status:</Text> {loanStatus}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Black-Listing Statuse:</Text> {blStatus}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Membership Status:</Text> {AcStatus}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Time Created:</Text>  {createdAt}</Text>
         
        </View>
                
        </View>
    );
}; 

export default ChmMbrShpInfo