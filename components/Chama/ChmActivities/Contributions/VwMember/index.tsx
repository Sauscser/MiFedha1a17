import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';


export interface MmbrContriInfo {
   MmbrContriDtls: {
     id: string,
     grpContact: string,
     
     GrpName:string,
     
     contriAmount: number,
   
    
   
     status: string,
     createdAt:string,
     
   }}

const MemberContriInfo = (props:MmbrContriInfo) => {
  const {
     MmbrContriDtls: {
        id,
        grpContact,
        
        GrpName,
        status,
        contriAmount,
        createdAt,       
      
      
      
  }} = props ;

  const navigation = useNavigation;

  const TryChmLn = () => {
   navigation.navigate("ChmLnsGvnOuts", {grpContact});
  }
   return (
      <View style = {styles.pageContainer}>              
      <View style={styles.card}>

  <Text style={styles.prodInfo}><Text style={styles.label}>Transaction ID: </Text> {id}</Text>
  <Text style={styles.prodInfo}><Text style={styles.label}> Chama Name: </Text> {GrpName}</Text>
  <Text style={styles.prodInfo}><Text style={styles.label}> Amount: </Text> KES {contriAmount.toFixed(2)}</Text>
  <Text style={styles.prodInfo}><Text style={styles.label}> Time Sent :</Text> {createdAt}</Text>
                         
                  
       </View>
               
       </View>
   );
}; 

export default MemberContriInfo