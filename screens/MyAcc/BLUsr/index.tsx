import React, {useEffect, useState} from 'react';

import {updateCompany, updateSMAccount, } from '../../../src/graphql/mutations';
import {getCompany } from '../../../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';



import {
  View,
  Text,
  
  TextInput,
  ScrollView,
  
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';


  


const BLUsrForm = (props) => {

  const [UsrId, setUsrId] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  

  const gtCompDtls = async () =>{
    if(isLoading){
      return;
    }
    setIsLoading(true);
    try{
      const compDtls :any= await API.graphql(
        graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
        );
        const ttlBLUsrss = compDtls.data.getCompany.ttlBLUsrs
        
        const KFUsrDtls = async () => {
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try{
              await API.graphql(
                graphqlOperation(updateSMAccount,{
                  input:{
                    awsemail:UsrId,
                    acStatus:"AccountBlackListed"
                  }
                })
              )
      
              
          }
          catch(error){if (error){
            Alert.alert("Blacklisting unsuccessful; Retry")
            return
          } }
          setIsLoading(false);          
          await updtActAdm ();
        } 

        await KFUsrDtls();

        const updtActAdm = async()=>{
          if(isLoading){
            return;
          }
          setIsLoading(true);
              try{
                  await API.graphql(
                    graphqlOperation(updateCompany,{
                      input:{
                        AdminId:"BaruchHabaB'ShemAdonai2",
                        ttlBLUsrs:parseFloat(ttlBLUsrss) + 1,
                        
                      }
                    })
                  )
              }
              catch(error){if(error){
                Alert.alert("Check your internet")
                return;
            }}
            Alert.alert("User has been Black-Listed")
            setIsLoading(false);
            }
            
            
          } catch (error) {
            if(error){
              Alert.alert("Retry or update app or call customer care")
              return;
          };
          }
          setIsLoading(false);
          setUsrId("") 
        };    

        useEffect(() =>{
          const usId=UsrId
            if(!usId && usId!=="")
            {
              setUsrId("");
              return;
            }
            setUsrId(usId);
            }, [UsrId]
             );
        
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill User Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="User Email"
                      value={UsrId}
                      onChangeText={setUsrId}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>User Email</Text>
                  </View>
        
                  
        
                  <TouchableOpacity
                    onPress={gtCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to BlackList
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default BLUsrForm;