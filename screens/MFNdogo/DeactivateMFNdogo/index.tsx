import React, {useEffect, useState} from 'react';

import {createSMAccount, deleteAgent, updateAgent, updateCompany} from '../../../src/graphql/mutations';
import { getAgent, getCompany, getSMAccount, } from '../../../src/graphql/queries';
import {Auth, DataStore, graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';


  


const DeregMFNForm = (props) => {
  const navigation = useNavigation();

  const [phoneContact, setPhoneContact] = useState("");
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
        const ActvMFNUsrs = compDtls.data.getCompany.ttlKFNdgActv
        const InActvMFNUsrs = compDtls.data.getCompany.ttlKFNdgInActv
        
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
                    ttlKFNdgActv:parseFloat(ActvMFNUsrs) - 1,
                    ttlKFNdgInActv:parseFloat(InActvMFNUsrs) + 1,
                  }
                })
              )
          }
          catch(error){if(error){
            Alert.alert("Check your internet connection")
            return;
          }
        }
        setIsLoading(false);
        
      }
      

        const KFNDtls = async () => {
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try{
              await API.graphql(
                graphqlOperation(deleteAgent,{
                  input:{
                    phonecontact:phoneContact,
                    
                  }
                })
              )        
          }
          catch(error){if (error){
            Alert.alert("Deactivation unsuccessful; Retry")
            return
          }
        } 
          Alert.alert("MFNdogo successfully deactivated")
          setIsLoading(false);
          await updtActAdm();
      }
    
      KFNDtls();
    }
           catch (error) {
            if(error){
              Alert.alert("Check your internet connection")
              return;
          }
        }
          setIsLoading(false);
          setPhoneContact(""); 
        };    

        useEffect(() =>{
          const mfnphn=phoneContact
            if(!mfnphn && mfnphn!=="")
            {
              setPhoneContact("");
              return;
            }
            setPhoneContact(mfnphn);
            }, [phoneContact]
             );


 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill MFNdogo Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                   placeholder="+2547xxxxxxxx"
                      value={phoneContact}
                      onChangeText={setPhoneContact}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MFNdogo Phone</Text>
                  </View>
        
                  
        
                  <TouchableOpacity
                    onPress={gtCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to DeRegister 
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default DeregMFNForm;