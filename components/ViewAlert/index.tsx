import React from 'react';
import {View, Text,   ScrollView} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {
      alert: string,
      
    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
         alert,
         
   }} = props ;

 
    return (
        <View style = {styles.container}>              
            
            
            <View style = {{alignItems:"center"}}>
            <Text style = {styles.subTitle}>                       
                       {alert}   
                                 
                    </Text>
            </View>
   
                
        </View>
    );
}; 

export default SMCvLnStts