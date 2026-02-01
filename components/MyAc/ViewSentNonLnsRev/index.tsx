import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';

import styles from './styles';


export interface SMAccount {
    SMAc: {
      id: string,
      SenderName:string,
      recPhn: string,  
      RecName: string,
      amount: number,
      description: string, 
      status: string,
      createdAt:string,
      updatedAt:string,
              
    }}

const SMNonLnSnt = (props:SMAccount) => {
   const {
      SMAc: {
         id,
         recPhn,  
         RecName,
         SenderName,
         amount,
         description, 
         status,
         createdAt,
         updatedAt,
                 
   }} = props ;

   const navigation = useNavigation();
    
   const SndChmMmbrMny = () => {
     navigation.navigate("SendNonLonsRev", {id})
   }

 
    return (

      <View style = {styles.pageContainer}>
        <Pressable
        onPress={SndChmMmbrMny}
        style = {styles.card}>
            
            
            <Text style = {styles.prodName}>                       
                       {/*loaner details */}   
                       {RecName}             
                    </Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Transaction ID:</Text> {id}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Amount:</Text> KES {amount.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Created At:</Text> {createdAt}</Text>
            
        </Pressable>

        </View>
    );
}; 

export default SMNonLnSnt