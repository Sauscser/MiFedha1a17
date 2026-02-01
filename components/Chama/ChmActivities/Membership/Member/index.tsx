import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,  ScrollView, Pressable} from 'react-native';

import styles from './styles';


export interface ChamaMmbrshpInfo {
    ChamaMmbrshpDtls: {
      MembaId: string,
      ChamaNMember: string,
      memberContact: string,
      groupName:string,
      memberNatId:string,
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
      totalSubAmt:number
      
    }}

const ChmMbrShpInfo = (props:ChamaMmbrshpInfo) => {
   const {
      ChamaMmbrshpDtls: {
         MembaId,
         ChamaNMember,
         memberNatId,
         memberContact,
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
         subscribedAmt,
         totalSubAmt,
         subscriptionFrequency,
         subscriptionAmt,
         lateSubscriptionPenalty,
         ttlLateSubs,
         timeCrtd,
         
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

              const now1:any = "2024-05-20";
             
              const curYrs = parseFloat(years)*365;
              const curMnths = (months2)*30.4375;
              const daysUpToDate = curYrs + curMnths + parseFloat(days)          
              const tmDif = daysUpToDate - timeCrtd;
              const subFreq = tmDif/subscriptionFrequency
              const Amt2HvBnSub = subFreq*subscriptionAmt
              const subPnlties = totalSubAmt - subscribedAmt
              const ttlArrears = (ttlLateSubs + Amt2HvBnSub).toFixed(0)

   const navigation = useNavigation();
   const SndChmMmbrMny = () => {
      navigation.navigate("Contributionssss", {ChamaNMember})
   }

   const ViewMmberDtls = () => {
      navigation.navigate ("MemberDtls", {ChamaNMember})
   }

   const ViewSubs = () => {
      navigation.navigate ("ChmMmbrContriss", {ChamaNMember})
   }
   
    return (
      <View style = {styles.pageContainer}>              
            
      <Pressable onPress={ViewMmberDtls} style = {styles.card}>
      <Text style={styles.prodName}>{groupName}</Text>

<Text style={styles.prodInfo}><Text style={styles.label}>Member Chama Number:</Text> {MembaId}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Subscription done up to date:</Text> KES {subscribedAmt.toFixed(2)}</Text>
<Text style={styles.prodInfo}><Text style={styles.label}>Subscription due with Penalties:</Text> KES {ttlArrears}</Text>

              </Pressable>

              <View style = {styles.buttonRow}>
              <Pressable
                onPress={ViewSubs}
                style = {styles.loanFriendButton}
                >            
                  <Text style = {styles.buttonText}>Subscriptions</Text>            
              </Pressable>
              
              
              <Pressable
                onPress={SndChmMmbrMny}
                style = {styles.loanFriendButton}>            
                  <Text style = {styles.buttonText}>Subscribe</Text>            
              </Pressable>  
             
            
             
               
              </View>
  </View>
    );
}; 

export default ChmMbrShpInfo