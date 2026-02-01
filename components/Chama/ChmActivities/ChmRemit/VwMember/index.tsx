import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';


export interface MmbrContriInfo {
   memberContriDtls: {
     id: string,
     grpContact: string,
     
     SenderName:string,
     memberId:string,
     amountSent: number,
   
     description: string,
   
     status: string,
     createdAt:string,
     
   }}

const MmbrContriInfo = (props:MmbrContriInfo) => {
  const {
     memberContriDtls: {
        id,
        grpContact,
        memberId,
        SenderName,
        status,
        amountSent,
        createdAt,       
        description,
      
      
  }} = props ;

  const navigation = useNavigation;

 
   return (
      <View style = {styles.pageContainer}>              
      <View style={styles.card}>
       <Text style={styles.prodInfo}><Text style={styles.label}>Transaction ID: </Text> {id}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}> Member Chama ID: </Text> {memberId}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}> Chama Name:</Text> {SenderName}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}> Amount: </Text> KES {amountSent.toFixed(2)}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}> Time Sent :</Text> {createdAt}</Text>
       <Text style={styles.prodDesc}>{description}</Text>
     </View>
     </View>
               
       
   );
}; 

export default MmbrContriInfo