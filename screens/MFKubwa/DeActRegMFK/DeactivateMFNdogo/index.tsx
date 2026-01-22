import React, {useEffect, useState} from 'react';

import { deleteAgent, deleteSAgent, updateAgent, updateCompany, updateSAgent} from '../../../../src/graphql/mutations';
import { getAgent, getCompany,  } from '../../../../src/graphql/queries';
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
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';


  


const DeregMFKForm = (props) => {
  const navigation = useNavigation();

  const [MFKID, setMFKID] = useState("");
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
        const ActvMFKUsrs = compDtls.data.getCompany.ttlKFKbwActv
        const InActvMFKUsrs = compDtls.data.getCompany.ttlKFKbwInActv
           
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
                        ttlKFKbwActv:parseFloat(ActvMFKUsrs) - 1,
                        ttlKFKbwInActv:parseFloat(InActvMFKUsrs) + 1,
                      }
                    })
                  )
              }
              catch(error){if(error){
                Alert.alert("Please check your internet")
                return;
              }}
              setIsLoading(false);
              
              
            }
           
            const KFKDtls = async () => {
              if(isLoading){
                return;
                            }
                            setIsLoading(true);
              try{
                  await API.graphql(
                    graphqlOperation(deleteSAgent,{
                      input:{
                        phonecontact:MFKID,
                        
                      }
                    })
                  )        
              }
              catch(error){if (error){
                Alert.alert("Deactivation unsuccessful; Retry")
                return
              }
             }
            Alert.alert("Account deactivated successfully")
            setIsLoading(false);
            await updtActAdm()
            } 
            KFKDtls();
          
            
          } catch (error) {
            if(error){
              Alert.alert("Check your internet")
              return
            }
          }
          setIsLoading(false);
          setMFKID("");
        };    

        useEffect(() =>{
          const mfkID=MFKID
            if(!mfkID && mfkID!=="")
            {
              setMFKID("");
              return;
            }
            setMFKID(mfkID);
            }, [MFKID]
             );

 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill MFKubwa Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={MFKID}
                      onChangeText={setMFKID}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MFKubwa Phone Number</Text>
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
        
        export default DeregMFKForm;