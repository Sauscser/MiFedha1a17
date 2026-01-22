import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert, ActivityIndicator} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/MyAc/ReadPayPalTNC";
import styles from './styles';
import {   listBiznas } from '../../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const FetchSMNonCovLns = props => {

  const[LneePhn, setLneePhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const [sellingPrice, setsellingPrice] = useState([]);
  const [Recom, setRecom] = useState([]);
  const [Cur, setCur] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const [itemPrys, setitemPrys] = useState('');
    const navigation = useNavigation();
    

    const PyPlDpst = () => {
      navigation.navigate("BizPayPalDposit", {itemPrys});
    }

    const PyPlDpst2 = () => {
      navigation.navigate("Homeie");
    }
    

                
                      
                        const gtCompDtls = async () =>{
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try{
                            const compDtlszx:any= await API.graphql(
                              graphqlOperation(listBiznas,{ filter: {
                                and: {
                                  BusKntct: { eq: itemPrys},
                                 
                                }
                              }})
                              );
                              
                              setRecom(compDtlszx.data.listBiznas.items);
                              if(compDtlszx.data.listBiznas.items.length <1)
            {
              Alert.alert("This business does not exist in MiFedha")
            }
            else {
              PyPlDpst();
              Alert.alert("If you dont have a paypal account please dont proceed!")
            }
                           
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setitemPrys('')
    };
  }
    

  return (
   
<View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Strictly, Dont proceed if you have no paypal Account! 
                    First create a paypal account. Otherwise your money will not reflect in MiFedha</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={itemPrys}
                      onChangeText={setitemPrys}
                      
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Business Phone</Text>
                  </View>
        
                  
        
                  <TouchableOpacity
                    onPress={gtCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Proceed
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
  );
};

export default FetchSMNonCovLns;