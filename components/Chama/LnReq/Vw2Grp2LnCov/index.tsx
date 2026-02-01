import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export interface SMAccount {
    SMAc: {
      groupContact:string,
      groupName:string,
      
      
    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        groupName,
        
        groupContact
   }} = props ;

   const[isLoading, setIsLoading] = useState(false);
   const navigation = useNavigation();
   

   const SndChmMmbrMny = () => {
       navigation.navigate("ChamaVw2GrantLnReqCov", {groupContact})

   }

   

    return (
        
                  
                  
            <Pressable onPress = {SndChmMmbrMny}
            style = {styles.pageContainer}
            >
        <Text style={styles.prodInfo}><Text style={styles.label}>Group Name:</Text> {groupName}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Group Contact:</Text> {groupContact}</Text>
              
            </Pressable>
            
                
        
    );
}; 

export default SMCvLnStts