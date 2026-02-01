import React from 'react';
import { Text,    View} from 'react-native';
import styles from './styles';


export interface ChmCvLnSttusRec {
    Loanee: {
      privacy: string,
      
    }}

const CredSlrCvLnStts = (props:ChmCvLnSttusRec) => {
   const {
    Loanee: {
      privacy,
      
   }} = props ;
   
    return (
               <View style = {styles.pageContainer}>
                      <View style = {styles.card}>
                        <Text style={styles.prodName}>{privacy}</Text>
                      </View> 
              </View>     
           
    );
}; 

export default CredSlrCvLnStts