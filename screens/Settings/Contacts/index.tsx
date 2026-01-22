import React, {useEffect, useState} from 'react';

import {  updateCompany, updateGroup, updateGrpMembers, updateSMAccount} from '../../../src/graphql/mutations';
import {  getCompany, getGroup, getGrpMembers, getSMAccount } from '../../../src/graphql/queries';
import {  graphqlOperation, API,Auth} from 'aws-amplify';

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
import { updateBankAdmin } from '../../../src/graphql/mutations';


  


const UpdtSMPW = (props) => {
  const navigation = useNavigation();
  const [CompPW2, setCompPW2] = useState("");
  const [groupCnt, setgroupCnt] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [CompPW1, setCompPW1] = useState("");
  const[isLoading, setIsLoading] = useState(false);
 

  
        const fetchSMDtls = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
                const userInfo = await Auth.currentAuthenticatedUser();
            
            try{
              const compDtls :any= await API.graphql(
                graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
                );
                  
                const owners = compDtls.data.getCompany.owner 
                      
                const fetchSMDtls = async () =>{
                  if(isLoading){
                    return;
                  }
                  setIsLoading(true);
                  try{
                   
                          
                                      const updtSMDtls = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateCompany,{
                                                input:{
                                                  AdminId:"BaruchHabaB'ShemAdonai2",
                                                  phoneContact:CompPW1,
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Please check internet")
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert("You have successfully updated Company Contacts");
                                      } 
 if(userInfo.attributes.owner!==owners)
                                      {
                                          Alert.alert("You are not the author of this Account");
                                      }

                                      

                                      
                                      else {updtSMDtls();}

                                    } catch (error) {
                                      if(error){
                                        Alert.alert("Check internet; otherwise Usr doesnt exist")
                                        return
                                      }
                                    }}
                                    await fetchSMDtls();
                                

            } catch (error) {
                if(error){
                  Alert.alert("Check internet; otherwise Chama doesnt exist")
                  return
                }
              }
         
           

            setIsLoading(false);
              setgroupCnt("");
              setCompPW1("")
              setCompPW2("")
              setLnAcCod("")
          
            }
        
        useEffect(() =>{
          const groupCnts=groupCnt
            if(!groupCnts && groupCnts!=="")
            {
              setgroupCnt("");
              return;
            }
            setgroupCnt(groupCnts);
            }, [groupCnt]
             );

             useEffect(() =>{
                const CompPW1s=CompPW1
                  if(!CompPW1s && CompPW1s!=="")
                  {
                    setCompPW1("");
                    return;
                  }
                  setCompPW1(CompPW1s);
                  }, [CompPW1]
                   );

                   useEffect(() =>{
                    const LnAcCods=LnAcCod
                      if(!LnAcCods && LnAcCods!=="")
                      {
                        setLnAcCod("");
                        return;
                      }
                      setLnAcCod(LnAcCods);
                      }, [LnAcCod]
                       );

                       useEffect(() =>{
                        const CompPW2s=CompPW2
                          if(!CompPW2s && CompPW2s!=="")
                          {
                            setCompPW2("");
                            return;
                          }
                          setCompPW2(CompPW2s);
                          }, [CompPW2]
                           );
  
  
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Ac Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={CompPW1}
                      onChangeText={setCompPW1}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>New Contacts</Text>
                  </View>   

                  
                  <TouchableOpacity
                    onPress={fetchSMDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Update Comp Details
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default UpdtSMPW;