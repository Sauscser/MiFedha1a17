import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export interface SMAccount {
    SMAc: {
      beneficiaryID: string,
benefactorAc: string,
benefactorPhone: string,
prodName: string,
creatorName: string,
prodCost: number,
prodDesc: string,
benefitsAmount: number,
beneficiaryPhone:string
    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        beneficiaryID ,
        benefactorAc,
        benefactorPhone,
        prodName,
        creatorName,
        prodCost,
        prodDesc,
        benefitsAmount,
        beneficiaryPhone
    
   }} = props ;

   const navigation = useNavigation();
   

   const BenefitPal = () => {
    navigation.navigate("SharePalBenefits", {beneficiaryID});
  }

  const BenefitBiz = () => {
    navigation.navigate("ShareBizBenefits", {beneficiaryID});
  }

  const BenDtls = () => {
    navigation.navigate("VwBenProdsDtls", {beneficiaryID});
  }



    return (
        
             <View style={styles.pageContainer}>
      <Pressable style={styles.card} onPress={BenDtls}>
        <Text style={styles.prodName}>{prodName}</Text>

        <Text style={styles.prodInfo}><Text style={styles.label}>Benefactor Business/Company:</Text> {creatorName}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Beneficiary Name:</Text> {beneficiaryPhone}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Cost:</Text> KES {prodCost.toLocaleString()}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Benefits Pooled:</Text> KES {benefitsAmount.toLocaleString()}</Text>
       <Text style={styles.prodDesc}>{prodDesc}</Text>
      </Pressable>

<View style ={styles.buttonRow}>
<Pressable
onPress={BenefitPal}
style = {styles.loanFriendButton}
>            
  <Text>Share Benefits (Pal)</Text>            
</Pressable>

<Pressable
onPress={BenefitBiz}
style = {styles.redeemButton}>            
  <Text>Share Benefits (Bizna)</Text>            
</Pressable>  
</View>


       </View> 

        
                
       
    );
}; 

export default SMCvLnStts