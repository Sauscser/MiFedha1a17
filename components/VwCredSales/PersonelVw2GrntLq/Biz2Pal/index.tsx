import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {View, Text,  Pressable,  } from 'react-native';
import styles from './styles';


export interface ChmCvLnSttusRec {
    Loanee: {
      BiznaName: string,
      workerId:string,
      BusinessRegNo: string,
      workId:string
    
      
    }}

const CredSlrCvLnStts = (props:ChmCvLnSttusRec) => {
   const {
    Loanee: {
      BiznaName,
      workerId,
      BusinessRegNo,
      workId
      
   }} = props ;
   const navigation = useNavigation();

   const SndChmMmbrMny = () => {
      navigation.navigate("Vw2GrntBiz2Pal", {BusinessRegNo})
   }
    return (
      <View style = {styles.pageContainer}>
      <Pressable 
      onPress={SndChmMmbrMny}
      style = {styles.card}>            
           
            <Text style = {styles.prodName}>                       
                       {/*loaner details */}   
                       {BiznaName}               
                    </Text>
              <Text style={styles.prodInfo}><Text style={styles.label}>Business Phone:</Text> {BusinessRegNo}</Text>
              <Text style={styles.prodInfo}><Text style={styles.label}>Work ID:</Text> {workId}</Text>
            
        </Pressable>
        </View>

    );
}; 

export default CredSlrCvLnStts