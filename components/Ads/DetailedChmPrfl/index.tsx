import React from 'react';
import {View, Text, ScrollView} from 'react-native';


import styles from './styles';



export interface SMAccount {
    SMAc: {
      grpContact: string,
      
      grpName: string,  
      venture:string,
      
      oprtnArea:string,
      description:string,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         
         grpContact,  
         grpName,
         venture,
         oprtnArea,
         description,  

                 
   }} = props ;

 
    return (
        <View style = {styles.pageContainer}>              
              
            
              <View style={styles.card}>              
                       
                        
                     <Text style = {styles.prodInfo}> <Text style={styles.label}>Chama Name:</Text> {grpName}</Text>  
                     <Text style = {styles.prodInfo}> <Text style={styles.label}>Chama Contact:</Text> {grpContact}</Text>                 
                     <Text style={styles.prodInfo}><Text style={styles.label}>Chama Venture:</Text> {venture}</Text>
                     
                     <Text style = {styles.prodInfo}> <Text style={styles.label}>Base Region/Town:</Text> {oprtnArea}</Text>  
                     <Text style={styles.prodDesc}>{description}</Text>
                    
                    
        </View>
                
        </View>
    );
}; 

export default ViewSMDeposts