import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {
      id: string,
      benefitsID:string,
benefactorAc: string,
benefactorPhone: string,
beneficiaryPhone:string,
beneficiaryAc:string,
prodName: string,
creatorName: string,
prodCost: number,
prodDesc: string,
createdAt: string,
amount: number,
beneficiaryType:string

    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        id ,
        beneficiaryType,
        benefactorAc,
        beneficiaryPhone,
        creatorName,
        beneficiaryAc,
        benefactorPhone,
        prodDesc,
        createdAt,
        amount,
        benefitsID
    
   }} = props ;

   const navigation = useNavigation();
   
   

    return (
        
    <View style = {styles.pageContainer}>
      <View style = {styles.card}>          

        <Text style={styles.prodInfo}><Text style={styles.label}>Contribution ID:</Text> {id}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Benefactor Account:</Text> {benefactorAc}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Contributor Account:</Text> {beneficiaryType}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}> Contributor Name:</Text> {benefitsID}</Text>

        <Text style={styles.prodInfo}><Text style={styles.label}>Product Creator Account:</Text> {beneficiaryPhone}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Contribution Amount:</Text> KES {amount.toFixed(2)}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Contribution Time:</Text> {createdAt}</Text>

</View>
       </View> 

    );
}; 

export default SMCvLnStts