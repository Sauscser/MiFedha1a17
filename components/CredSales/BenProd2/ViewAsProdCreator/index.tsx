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
benefitStatus: string,
prodCost: number,
prodDesc: string,
createdAt: string,
benefitsAmount:number,
beneficiaryAc:string
creatorName:string

    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        id ,
        benefactorAc,
        benefactorPhone,
        beneficiaryPhone,
        prodName,
        benefitStatus,
        creatorName,
        prodCost,
        prodDesc,
        benefitsAmount,
        beneficiaryAc
    
   }} = props ;

   const navigation = useNavigation();
   
   const VwBenefactorContriDtls = () => {
    navigation.navigate("VwBenCreatorContriDtls", 
      {benefactorAc, benefactorPhone, beneficiaryAc, prodName})
}

    return (
        <View style={styles.pageContainer}>
            <View style={styles.card}>
              <Text style={styles.prodName}>{prodName}</Text>
              <Text style={styles.prodInfo}><Text style={styles.label}>Beneficiary Name:</Text> {beneficiaryPhone}</Text>
              <Text style={styles.prodInfo}><Text style={styles.label}>Benefactor Name:</Text> {creatorName}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Cost:</Text> KES {prodCost.toLocaleString()}</Text>
              <Text style={styles.prodInfo}><Text style={styles.label}>Status:</Text> {benefitStatus}</Text>
             
              <Text style={styles.prodInfo}><Text style={styles.label}>Benefits Pooled:</Text> KES {benefitsAmount.toLocaleString()}</Text>
              <Text style={styles.prodDesc}>{prodDesc}</Text>
            </View >
            <View style = {styles.buttonRow}>

            <Pressable
              onPress={VwBenefactorContriDtls}
              style = {styles.loanFriendButton}>
              <Text>View Client's Contributions</Text>            
            </Pressable>

            </View>
       </View> 

        
                
       
    );
}; 

export default SMCvLnStts