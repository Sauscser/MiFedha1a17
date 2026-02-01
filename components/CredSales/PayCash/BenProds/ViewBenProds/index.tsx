import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {
      id: string,
benefactorAc: string,
benefactorPhone: string,
prodName: string,
creatorName: string,
prodCost: number,
prodDesc: string,
createdAt: string
    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        id ,
        benefactorAc,
        benefactorPhone,
        prodName,
        creatorName,
        prodCost,
        prodDesc,
        createdAt
    
   }} = props ;

   const navigation = useNavigation();
   

   const LinkPalBeneficiary = () => {
    navigation.navigate("LinkPalBeneficiary", {id});
  }

  const LinkBizBeneficiary = () => {
    navigation.navigate("LinkBizBeneficiary", {id});
  }


    return (
        
             <View style = {styles.pageContainer}>
            <View style = {styles.card}>              
                <Text style={styles.prodInfo}><Text style={styles.label}>Product Creator:</Text> {creatorName}</Text>
                <Text style={styles.prodInfo}><Text style={styles.label}>Product Cost:</Text> KES {prodCost.toFixed(2)}</Text>
                <Text style={styles.prodDesc}>{prodDesc}</Text> 
                        
                    
        </View >
        <View style = {styles.buttonRow}>       
         
<Pressable
onPress={LinkPalBeneficiary}
style = {styles.loanFriendButton}
>            
  <Text>Link Pal Beneficiary </Text>            
</Pressable>

<Pressable
onPress={LinkBizBeneficiary}
style = {styles.redeemButton}>            
  <Text>Link Biz Beneficiary </Text>            
</Pressable>  
</View>
</View>
       
    );
}; 

export default SMCvLnStts