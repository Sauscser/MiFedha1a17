import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';


import styles from './styles';
import { getCompany, getExRates, getSMAccount, listExRates, listSMAccounts } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';


export interface SMCvLnSttus {
  SMAc: {
      cur:string,
      buyingPrice: number,
      
      
      symbol:string
      
      
  }}

const FetchSMNonCovLns = props => {

  const {
    SMAc: {
    cur,
    buyingPrice,
    
    symbol,
    
   
   }} = props ;


    const[LneePhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    
    const [Recom, setRecom] = useState();
    const [Cur, setCur] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const PyPlDpst = () => {
      navigation.navigate("ReadPayPalTNC");
    }

    const PyPlDpst2 = () => {
      navigation.navigate("Homeie");
    }
    

  return (
   

<View style = {{marginTop:"10%"}}>

                  
                       
<View >
<Text style = {styles.ownerName}>                       
 {/*loaner details */}   

 
We are buying one US dollar at {symbol} {buyingPrice}.
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