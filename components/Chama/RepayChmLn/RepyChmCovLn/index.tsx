import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text,  Pressable,  } from 'react-native';

import styles from './styles';


export interface ChamaMmbrshpInfo {
    ChamaMmbrshpDtls: {
      loanID: string,
      lonBala:number,
      LoanerName:string,
      memberId:string,
      
    }}

const ChmMbrShpInfo = (props:ChamaMmbrshpInfo) => {
   const {
      ChamaMmbrshpDtls: {
         loanID,
         lonBala,
         LoanerName,
         memberId
   }} = props ;

   const navigation = useNavigation();
    
   const SndChmMmbrMny = () => {
      navigation.navigate("RepyChmCovLns", {loanID})
   }
   
    return (
       <Pressable 
       onPress={SndChmMmbrMny}
       style = {styles.pageContainer}>   

       <Text style={styles.prodInfo}><Text style={styles.label}>Group Name:</Text> {LoanerName}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Loan Id:</Text> {loanID}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Member Chama ID:</Text> {memberId}</Text>
      <Text style={styles.prodInfo}><Text style={styles.label}>loan Balance:</Text> {lonBala.toFixed(2)}</Text>
            
        </Pressable>
    );
}; 

export default ChmMbrShpInfo