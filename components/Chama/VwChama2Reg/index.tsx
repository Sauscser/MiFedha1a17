import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {
      id: string,
      bankAdminEmail: string,
      ChamaAcNu: string,

      createdAt:string

    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        id ,
        bankAdminEmail,
        ChamaAcNu,
        createdAt
        
   }} = props ;

   const navigation = useNavigation();
   
   const VwChamaApplications = () => {
    navigation.navigate("CreateChms", 
      {id, 
        bankAdminEmail, 
        ChamaAcNu,
        }
    )
}


    return (
        <View style={styles.pageContainer}>
          <View style={styles.card}>
            <Text style={styles.prodInfo}><Text style={styles.label}>Group Account:</Text> {ChamaAcNu}</Text>
             <Text style={styles.prodInfo}><Text style={styles.label}>Applied on:</Text> {createdAt}</Text>
          
        </View >
        <View style = {styles.buttonRow}>

<Pressable
onPress={VwChamaApplications}
style = {styles.loanFriendButton}
>            
  <Text>Click to Proceed to Create</Text>            
</Pressable>



</View>
       </View> 

        
                
       
    );
}; 

export default SMCvLnStts