import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,  ScrollView, Pressable} from 'react-native';

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
      memberChmBenefit:number,
      
    }}

const ChmMbrShpInfo = (props:ChamaMmbrshpInfo) => {
   const {
      ChamaMmbrshpDtls: {
         MembaId,
         ChamaNMember,
         groupContact,
       
         groupName,
         loanStatus,
         blStatus,
         GrossLnsGvn,
         LonAmtGven,
         AmtRepaid,
         LnBal,
         NonLoanAcBal,
         memberChmBenefit,
         createdAt,       
         AcStatus,
       
       
   }} = props ;

   const navigation = useNavigation();

 
   const VwFloatedLoans = () => {
      navigation.navigate("VwFloatedLoans", {groupContact, MembaId})
   }
  

    return (
      <View style = {styles.pageContainer}>              
            
      <Pressable style = {styles.card}
      onPress={VwFloatedLoans}>

         <Text style={styles.prodInfo}><Text style={styles.label}>Group Name:</Text> {groupName}</Text>           
           <Text style={styles.prodInfo}><Text style={styles.label}>Group Contact:</Text> {groupContact}</Text>           
           <Text style={styles.prodInfo}><Text style={styles.label}>Membership number:</Text> {MembaId}</Text>
            
              </Pressable>

              
  </View>
        
    );
}; 

export default ChmMbrShpInfo