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
prodName: string,
creatorName: string,
prodCost: number,
prodDesc: string,
createdAt: string,
benefitsAmount:number,
beneficiaryAc:string,
benefitStatus:string

    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        id ,
        beneficiaryAc,
        benefactorAc,
        benefactorPhone,
        beneficiaryPhone,
        prodName,
        creatorName,
        prodCost,
        prodDesc,
        benefitsAmount,
        benefitStatus
    
   }} = props ;

   const navigation = useNavigation();
   
   
   const VwBenefactorContriDtls = () => {

    
    navigation.navigate("VwBeneficiaryContriDtls", 
      {beneficiaryAc, 
        benefactorAc, 
        prodName}
    )
}




    return (
        
             <View style = {styles.pageContainer}>
            <View style = {styles.card}>              
       <Text style={styles.prodInfo}><Text style={styles.label}>Benefactor Name:</Text> {creatorName}</Text>
          <Text style={styles.prodInfo}><Text style={styles.label}>Benefactor Account:</Text> {benefactorAc}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Product Creator:</Text> {creatorName}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Beneficiary Name:</Text> {beneficiaryPhone}</Text>
         <Text style={styles.prodInfo}><Text style={styles.label}>Status:</Text> {benefitStatus}</Text>
       <Text style={styles.prodInfo}><Text style={styles.label}>Cost:</Text> KES {prodCost.toLocaleString()}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Benefits Pooled:</Text> KES {benefitsAmount.toLocaleString()}</Text>
       <Text style={styles.prodDesc}>{prodDesc}</Text>
                   
        </View >
        <View style = {styles.buttonRow}>          
                        

<Pressable

onPress={VwBenefactorContriDtls}
style = {styles.loanFriendButton}
>            
  <Text>View My Contributions</Text>            
</Pressable>
</View>   


</View>
    
    );
}; 

export default SMCvLnStts