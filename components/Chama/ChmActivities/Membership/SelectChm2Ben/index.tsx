import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,  Pressable} from 'react-native';

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
      memberChmBenefit:number,
      
      AcStatus: string,
      loanStatus: string,
      blStatus: string,
      createdAt:string,
      
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
         memberChmBenefit,
         
         createdAt,       
         AcStatus,
       
       
   }} = props ;

   const navigation = useNavigation();
   const ViewMmberDtls = () => {
      navigation.navigate ("ChamaDtls", {ChamaNMember})
   }
   
    return (
      <View style = {styles.pageContainer}>              
      <View  style = {styles.card}>
         <Text style={styles.prodName}>{groupName}</Text>
         <Text style={styles.prodInfo}><Text style={styles.label}>Member Chama Number:</Text> {MembaId}</Text>
         <Text style={styles.prodInfo}><Text style={styles.label}> Group Benefits:</Text> KES {memberChmBenefit.toFixed(2)}</Text>
         <Text style={styles.prodInfo}><Text style={styles.label}>Chama Phone:</Text> {groupContact}</Text>
         <Text style={styles.prodInfo}><Text style={styles.label}>Membership Status:</Text> {AcStatus}</Text>

          </View>      
        
      </View>
    );
}; 

export default ChmMbrShpInfo