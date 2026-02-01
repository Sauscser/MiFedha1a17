import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,    ScrollView, Pressable} from 'react-native';
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
        clearanceAmt:number,
        advEmail:string,
        crtnDate: number,
      interest:number
        
        
    }}

const SMCvLnStts = (props:SMCvLnSttus) => {
   const {
    Loanee: {
      loanID,
    loaneePhn,
    clearanceAmt,
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
    advEmail,
    crtnDate,
    interest
   }} = props ;

   const navigation = useNavigation();
   const SndChmMmbrMny = () => {
      navigation.navigate ("VwP2PMyLoaneesDtld", {loanID})
   }

   const VwRpayments = () => {
      navigation.navigate ("VwP2PReceived", {loanID})
   }

   const Blacklist = () => {
      navigation.navigate ("BLPal2Pal", {loanID})
   }

   const WaiveSMPal2Pal = () => {
      navigation.navigate ("WaiveSMPal2Pal", {loanID})
   }

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
            
            <Pressable onPress={SndChmMmbrMny} style = {styles.card}>
               <Text style={styles.prodInfo}><Text style={styles.label}>Loanee Name:</Text> {loaneename}</Text>
                 <Text style={styles.prodInfo}><Text style={styles.label}>Loan Id:</Text> {loanID}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loanee Contact:</Text> {loaneePhn}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Loan Balance with penalties:</Text> KES {LonBal1.toFixed(2)}</Text>
                

                    </Pressable>

                    <View style = {styles.buttonRow}>
                    
                    <Pressable
                      onPress={VwRpayments}
                      style = {styles.loanFriendButton}
                      >            
                        <Text style = {styles.buttonText}>ViewRpymnts</Text>            
                    </Pressable>
                    
                    
                    <Pressable
                      onPress={WaiveSMPal2Pal}
                      style = {styles.redeemButton}>            
                        <Text style = {styles.buttonText}>Waive</Text>            
                    </Pressable>  
                   
                  
                    <Pressable
                      onPress={Blacklist}
                      style = {styles.loanFriendButton}>            
                        <Text style = {styles.buttonText}>BL/Penalise</Text>            
                    </Pressable>  
                  
                     
                    </View>
        </View>
    );
}; 

export default SMCvLnStts