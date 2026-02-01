import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';



export interface SMAccount {
    SMAc: {
      acMainAc: string,
      id:string,
      mfkAc: string,  
      acChamp:string,
      createdAt:string,
      updatedAt:string,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         acMainAc,
         acChamp,  
         id,
         createdAt,
         updatedAt,
                 
   }} = props ;

 const navigation = useNavigation();

 const VwToReg = () =>{
   navigation.navigate( "VwCompMFKTC", {id})
 }
    return (
        <View style = {styles.container}>              
                      
            <Pressable onPress={VwToReg}>              
                    
            
            <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                      Group Account: {acChamp}
                    </Text>
                    
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                     MFKubwa Account Number: {acMainAc}
                    </Text>

                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       Created At: {createdAt}
                    </Text>
                    
                    
                    
        </Pressable>
                
        </View>
    );
}; 

export default ViewSMDeposts