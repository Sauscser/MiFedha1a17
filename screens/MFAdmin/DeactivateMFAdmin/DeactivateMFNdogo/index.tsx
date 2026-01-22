import React, {useEffect, useState} from 'react';

import { updateAgent, updateCompany} from '../../../../src/graphql/mutations';
import {  getCompany, } from '../../../../src/graphql/queries';
import {Auth, DataStore, graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import { updateBankAdmin } from '../../../../src/graphql/mutations';


  


const DeregMFAdminForm = (props) => {
  const navigation = useNavigation();

  const [AdminId, setAdminId] = useState("");
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
        const inActvMFAdmin = compDtls.data.getCompany.ttlKFAdmInActv
        const actvMFAdmin = compDtls.data.getCompany.ttlKFAdmActv
           
        const KFAdminDtls = async () => {
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try{
              await API.graphql(
                graphqlOperation(updateBankAdmin,{
                  input:{
                    nationalid:AdminId,
                    status:"AccountInactive"
                  }
                })
              )
      
              
          }
          catch(error){if (error){
            Alert.alert("Deactivation unsuccessful; Retry")
            return
          }
        }

      await updtActAdm();
          setIsLoading(false);
        } 

        KFAdminDtls();
        
        
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
                        ttlKFAdmActv:parseFloat(actvMFAdmin) - 1,
                        ttlKFAdmInActv:parseFloat(inActvMFAdmin) + 1,
                      }
                    })
                  )
              }
              catch(error){
                
              }
                setIsLoading(false)
              
            }
            

            

           
            
          } catch (error) {
            if(error){
              Alert.alert("Check your internet")
              return
            }
          }
          setIsLoading(false);
          setAdminId("") 
        };    

        
        useEffect(() =>{
          const AdmID=AdminId
            if(!AdmID && AdmID!=="")
            {
              setAdminId("");
              return;
            }
            setAdminId(AdmID);
            }, [AdminId]
             );
  
  
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill MFAdmin Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={AdminId}
                      onChangeText={setAdminId}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MFAdmin ID</Text>
                  </View>
        
                  
        
                  <TouchableOpacity
                    onPress={gtCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to DeRegister 
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default DeregMFAdminForm;