import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {
      id: string,
benefactorAc: string,
benefactorPhone: string,
beneficiaryPhone:string,
benefitStatus:string,
prodName: string,
creatorName: string,
prodCost: number,
prodDesc: string,
createdAt: string,
amount:number,
benefitsID:string

    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        id ,
        benefactorAc,
        benefactorPhone,
        beneficiaryPhone,
        prodName,
        creatorName,
        prodCost,
        prodDesc,
        benefitStatus,
        amount,
        benefitsID
    
   }} = props ;

   const navigation = useNavigation();
   
   const VwBenefactorContriDtls = () => {
    navigation.navigate("VwBenefactorContriDtls", 
      {benefactorAc, benefactorPhone, creatorName, prodName})
}

    return (
        
             
                        
      <View style = {styles.pageContainer}>
        <View style = {styles.card}>              
       <Text style={styles.prodInfo}><Text style={styles.label}>ProdCost:</Text> KES {prodCost.toLocaleString()}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Contributer:</Text> {benefitsID}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}>Contributions Amount:</Text> KES {amount.toLocaleString()}</Text>
       
       
       <Text style={styles.prodDesc}>{prodDesc}</Text>                   
        </View >      
       </View> 

    );
}; 

export default SMCvLnStts