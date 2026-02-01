import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import styles from './styles';


export interface ChamaContriInfo {
   ChamaContriDtls: {
     id: string,
     grpContact: string,
     memberPhn: string,
     mmberNme:string,
     memberId:string,
     contriAmount: number,
   
    
   
     status: string,
     createdAt:string,
     
   }}

const ChmContriInfo = (props:ChamaContriInfo) => {
  const {
     ChamaContriDtls: {
        id,
        grpContact,
        memberPhn,
        mmberNme,
        status,
        memberId,
        contriAmount,
        createdAt,       
      
      
      
  }} = props ;

  const navigation = useNavigation();

  const TryChmLn = () => {
   navigation.navigate("ChmLnsGvnOuts", {grpContact});
  }
   return (
       <View style = {styles.pageContainer}>              
           <View style={styles.card}>

       <Text style={styles.prodInfo}><Text style={styles.label}>Transaction ID: </Text> {id}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}> Member Name: </Text> {mmberNme}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}> Member Chama ID:</Text> {memberId}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}> Amount: </Text> KES {contriAmount.toFixed(2)}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}> Member Contact :</Text> {memberPhn}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}> Time Sent :</Text> {createdAt}</Text>
       
                  
       </View>
               
       </View>
   );
}; 

export default ChmContriInfo