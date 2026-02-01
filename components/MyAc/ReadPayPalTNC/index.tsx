import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import styles from './styles';
import {  getSMAccount } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';


export interface SMCvLnSttus {
  SMAc: {
    PayPalTNC:string,
      
      
  }}

const FetchSMNonCovLns = props => {

  const {
    SMAc: {
      PayPalTNC,
    
    
   
   }} = props ;


    const[LneePhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    
    const [Recom, setRecom] = useState();
    const [Cur, setCur] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const PyPlDpst = () => {
      navigation.navigate("Mpesa");
    }

    const PyPlDpst2 = () => {
      navigation.navigate("Homeie");
    }
    

  return (
   

<View style = {{marginTop:"10%"}}>

                  
                       
<View >
<Text style = {styles.ownerName}>                       
 {/*loaner details */}   

 
{PayPalTNC}
</Text>
</View>  

<View style = {styles.viewForPressables2}>
<View>
<Pressable
onPress={PyPlDpst}
style = {styles.loanFriendButton}
>            
  <Text>Proceed</Text>            
</Pressable>
</View>   
<View>
<Pressable
onPress={PyPlDpst2}
style = {styles.loanFriendButton}>            
  <Text>Return</Text>            
</Pressable>  
</View>

</View>



</View>
      
   
  );
};

export default FetchSMNonCovLns;