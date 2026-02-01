import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {View, Text,   ScrollView, Pressable} from 'react-native';


import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { updateReqLoanCredSl } from '../../../src/graphql/mutations';


export interface SMAccount {
    SMAc: {
      id:string,
      itemName:string,
      loaneeEmail:string,
      loaneePhone:string,
      amount:number,
      repaymentAmt:number,
      repaymentPeriod:number
      loaneeName:string,
      status:string
    }}

const SMCvLnStts = (props:SMAccount) => {
   const {
      SMAc: {
        loaneeEmail,
        loaneePhone,
        itemName,
        amount,
        repaymentAmt,
        repaymentPeriod,
        loaneeName,
        id,
        status
   }} = props ;

   const[isLoading, setIsLoading] = useState(false);
   const navigation = useNavigation();
   

   const SndChmMmbrMny = () => {
       navigation.navigate("NonCovCredSlss", {id})

   }

   const SndChmMmbrMny2 = () => {
    navigation.navigate("DeclCredSls", {id})

}
    return (
        
                  
                  
            <View style = {styles.pageContainer}>

                  
                       
                      <View style = {styles.card}>
                      <Text style = {styles.prodName}>                       
                       {/*loaner details */}   
                      Hi! it's {loaneeName}. Kindly Loan me {itemName} worth Ksh. {amount}. I 
                      commit to repay a Total of Ksh. {repaymentAmt} within {repaymentPeriod} days. 
                      You can reach me through {loaneePhone}. {status}    
                    </Text>
                    </View>  
                     
                    <View style = {styles.buttonRow}>
                   
                    <Pressable
                      onPress={SndChmMmbrMny}
                      style = {styles.loanFriendButton}
                      >            
                        <Text>Accept</Text>            
                    </Pressable>

                    <Pressable
                      onPress={SndChmMmbrMny2}
                      style = {styles.redeemButton}>            
                        <Text>Decline</Text>            
                    </Pressable>  
                    </View>
                    
            </View>
            
                
        
    );
}; 

export default SMCvLnStts