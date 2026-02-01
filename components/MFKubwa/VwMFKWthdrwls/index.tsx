import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';



export interface SMAccount {
    SMAc: {
      acMainAc: string,
      id:string,
      mfkAc: string,  
        
      createdAt:string,
      updatedAt:string,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         acMainAc,
         mfkAc,  
         id,
         createdAt,
         updatedAt,
                 
   }} = props ;

 const navigation = useNavigation();

 const VwToReg = () =>{
   navigation.navigate( "CompMFKTC", {id})
 }
    return (
        <View style = {styles.container}>              
                      
            <Pressable onPress={VwToReg}>              
                      
                     

                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       User Email: {mfkAc}
                    </Text>
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                     MFKubwa ACNo: {acMainAc}
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