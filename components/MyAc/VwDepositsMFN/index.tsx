import React from 'react';
import {View, Text,   ScrollView} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {
      id: string,
      
      depositerid: string,  
      agContact: string,
      amount: number,
      agentName:string,
      userName:string,
      
      createdAt:string,
      updatedAt:string,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         id,
         depositerid,  
         agContact,
         amount,
         agentName,
         createdAt,
         updatedAt,
         userName
                 
   }} = props ;

 
    return (
        <View style = {styles.pageContainer}>  
            <View style = {styles.card}>
            <Text style = {styles.prodName}>                       
                       {/*loaner details */}   
                       {userName}             
                    </Text>
             
            <Text style={styles.prodInfo}><Text style={styles.label}>Transaction ID:</Text> {id}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Amount:</Text> KES {amount.toFixed(2)}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Depositer Account:</Text> {depositerid}</Text>
           
            <Text style={styles.prodInfo}><Text style={styles.label}>Created At:</Text> {createdAt}</Text>
                                     
                    
        </View>
                
        </View>
    );
}; 

export default ViewSMDeposts