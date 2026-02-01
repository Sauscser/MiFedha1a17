import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export interface SMAccount {
    SMAc: {
     
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
   


    return (
            <View style={styles.pageContainer}>
            <View style={styles.card}>
              
              <Text style={styles.prodInfo}><Text style={styles.label}>Benefactor Business/Company:</Text> {creatorName}</Text>
              <Text style={styles.prodInfo}><Text style={styles.label}>Product Cost:</Text> {prodCost}</Text>
              <Text style={styles.prodInfo}><Text style={styles.label}>Benefits Shared:</Text> {benefitsAmount}</Text>
              <Text style={styles.prodInfo}><Text style={styles.label}>Product Name:</Text> {prodName}</Text>
              <Text style={styles.prodInfo}><Text style={styles.label}>Beneficiary Name:</Text> {beneficiaryPhone}</Text>
              <Text style={styles.prodDesc}>{prodDesc}</Text>
             
          </View >      
        </View >
    );
}; 

export default SMCvLnStts