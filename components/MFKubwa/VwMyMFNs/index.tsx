import React from 'react';
import {View, Text,   ScrollView} from 'react-native';


import styles from './styles';



export interface SMAccount {
    SMAc: {
      phonecontact: string,
      
      name: string,
      ttlEarnings: number,
      
      email: string,
      sagentregno: string,
      TtlFltIn: number,
      TtlFltOut: number,
      floatBal: number,
      
      
      status: string,
    
      town:string,
      createdAt:string,
      updatedAt:string,      
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
        phonecontact,
      
        name,
        ttlEarnings,
        
        email,
        sagentregno,
        TtlFltIn,
        TtlFltOut,
        floatBal,
        
        
        town,
         createdAt,
         updatedAt,
                 
   }} = props ;

 
    return (
        <View style = {styles.container}>              
          <View style = {{alignItems:"center"}}>
            <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                       Name: {name}             
                    </Text>
            </View>
            <ScrollView >              
                       
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                      Phone: {phonecontact}
                    </Text>  
                     

                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       Email: {email}
                    </Text>
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                     Town: {town}
                     </Text>

                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       Created At: {createdAt}
                    </Text>
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                     Last Update: {updatedAt}
                    </Text>
                    
                    
        </ScrollView>
                
        </View>
    );
}; 

export default ViewSMDeposts