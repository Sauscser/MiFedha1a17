import React from 'react';
import { Text,    View} from 'react-native';
import styles from './styles';


export interface ChmCvLnSttusRec {
    Loanee: {
      policy: string,
      
    }}

const CredSlrCvLnStts = (props:ChmCvLnSttusRec) => {
   const {
    Loanee: {
      policy,
      
   }} = props ;
   
    return (
              <View style = {styles.pageContainer}>
                      <View style = {styles.card}>
                        <Text style={styles.prodName}>{policy}</Text>
                      </View> 
              </View>    
            
    );
}; 

export default CredSlrCvLnStts