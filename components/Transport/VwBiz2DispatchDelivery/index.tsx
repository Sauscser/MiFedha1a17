import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export interface SMAccount {
    SMAc: {
      workerId:string,
      phoneKontact:string,
      BusinessRegNo:string,
      BiznaName:string,
  
    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        workerId,
        phoneKontact,
        BusinessRegNo,
        BiznaName,
  
        
   }} = props ;

   const[isLoading, setIsLoading] = useState(false);
   const navigation = useNavigation();
   

   
   const SndChmMmbrMny2 = () => {
    navigation.navigate("DispatchDelivery", {BusinessRegNo})
}
 
    return (
                    <View style = {styles.pageContainer}>
                      <View style = {styles.card}>
                      <Text style = {styles.prodName}>                
                       {/*loaner details */}   
                     Bizna Name: {BiznaName}
                       
                    </Text>
                    <Text style = {styles.prodName}>                
                       {/*loaner details */}   
                     Business Number: {BusinessRegNo}
                       
                    </Text>
                    </View>  
                     
                    <View style = {styles.buttonRow}>
                    
                  
                    <Pressable
                      onPress={SndChmMmbrMny2}
                      style = {styles.redeemButton}>            
                        <Text>Select Business</Text>            
                    </Pressable>  
                    </View>
            </View>
            
                
        
    );
}; 

export default SMCvLnStts