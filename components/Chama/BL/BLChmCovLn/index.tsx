import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text,  Pressable,  } from 'react-native';

import styles from './styles';


export interface ChamaMmbrshpInfo {
    ChamaMmbrshpDtls: {
      loanID: string,
      lonBala:number,
      amountExpectedBackWthClrnc: number,
      loaneeName:string,
      createdAt:string,
      crtnDate: number,
      interest:number
        amountExpectedBack
:number,
      amountRepaid:number
      
    }}

const ChmMbrShpInfo = (props:ChamaMmbrshpInfo) => {
   const {
      ChamaMmbrshpDtls: {
         loanID,
         lonBala,
         loaneeName,
         createdAt,
         amountExpectedBackWthClrnc,
         crtnDate,
         interest,
         amountExpectedBack,
         amountRepaid
         
   }} = props ;

   const navigation = useNavigation();
    
   const SndChmMmbrMny = () => {
      navigation.navigate("BLChmMmberCovs", {loanID})
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

              const dayselapsed = crtnDate - daysUpToDate

              const netLnBal = amountExpectedBack - amountRepaid

              const lonBalance = ((netLnBal) * 
              ((Math.pow(1 + interest/36500, dayselapsed) ))
    )
   
    return (
       <Pressable 
       onPress={SndChmMmbrMny}
       style = {styles.pageContainer}>          
          
        <Text style={styles.prodInfo}><Text style={styles.label}>Loan ID: </Text> {loanID}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>member Name: </Text> {loaneeName}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Time loan was taken: </Text> {createdAt}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>loan Balance with penalties: </Text> KES {lonBalance.toFixed(2)}</Text>
      

               
        </Pressable>
    );
}; 

export default ChmMbrShpInfo