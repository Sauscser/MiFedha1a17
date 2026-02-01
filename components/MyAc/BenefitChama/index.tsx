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

   const BenefitChama = () => {
      navigation.navigate("SendNLBnftChm", {ChamaNMember})
   }

   const BenefitChmSenderOnly = () => {
      navigation.navigate("BenefitChmSenderOnly")
   }


    return (
      <View style = {styles.pageContainer}>     
      <View style = {styles.card}>

        <Text style={styles.prodInfo}><Text style={styles.label}>GroupName:</Text> {groupName}</Text>
           
            <Text style={styles.prodInfo}><Text style={styles.label}> Chama Benefits Earned:</Text> KES {memberChmBenefit.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}> Group Contact:</Text> {groupContact}</Text>
            
              </View>

              <View style = {styles.buttonRow}>
              <Pressable
                onPress={BenefitChama}
                style = {styles.loanFriendButton}
                >            
                  <Text style = {styles.buttonText}>Benefit</Text>            
              </Pressable>
              
              
              <Pressable
                onPress={BenefitChmSenderOnly}
                style = {styles.loanFriendButton}>            
                  <Text style = {styles.buttonText}>Dont Benefit</Text>            
              </Pressable>  
             
              </View>
  </View>
        
    );
}; 

export default ChmMbrShpInfo