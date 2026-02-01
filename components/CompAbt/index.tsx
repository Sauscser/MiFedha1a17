import React from 'react';
import { Text,    View} from 'react-native';
import styles from './styles';



export interface ChmCvLnSttusRec {
    Loanee: {
      about: string,
      
    }}

const CredSlrCvLnStts = (props:ChmCvLnSttusRec) => {
   const {
    Loanee: {
      about,
      
   }} = props ;
  

   
    return (
              <View style = {styles.pageContainer}>
                      <View style = {styles.card}>
                        <Text style={styles.prodName}>{about}</Text>
                      </View> 
              </View>  
           
    );
}; 

export default CredSlrCvLnStts