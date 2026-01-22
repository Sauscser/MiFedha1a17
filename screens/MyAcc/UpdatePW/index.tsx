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
  const [SigntryPW, setSigntryPW] = useState("");
  const [groupCnt, setgroupCnt] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [SMPW, setSMPW] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  

  
        const fetchSMDtls = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();    
              
            try{
              const compDtls :any= await API.graphql(
                graphqlOperation(getSMAccount,{awsemail:userInfo.attributes.email})
                );
                const loanAcceptanceCodes = compDtls.data.getSMAccount.loanAcceptanceCode   
                const owners = compDtls.data.getSMAccount.owner 
                const acStatuss = compDtls.data.getSMAccount.acStatus            
                
                          
                                      const updtSMDtls = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateSMAccount,{
                                                input:{
                                                  awsemail:userInfo.attributes.email,
                                                  pw:SMPW
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully updated your PassWord");
                                      } 

                                      
                                      
                                      if(userInfo.attributes.sub!==owners)
                                      {
                                          Alert.alert("Please create main account");
                                      }

                                      else if(acStatuss==="AccountInactive")
                                      {
                                          Alert.alert("This User Account is inactive");
                                      }

                                      
                                      else {updtSMDtls();}

        
                                

            } catch (error) {
                if(error){
                  Alert.alert("Check internet; otherwise Chama doesnt exist")
                  return
                }
              }
         
           

            setIsLoading(false);
              setgroupCnt("");
              setSigntryPW("")
              setSMPW("")
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
                const SigntryPWs=SigntryPW
                  if(!SigntryPWs && SigntryPWs!=="")
                  {
                    setSigntryPW("");
                    return;
                  }
                  setSigntryPW(SigntryPWs);
                  }, [SigntryPW]
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
                        const SMPWs=SMPW
                          if(!SMPWs && SMPWs!=="")
                          {
                            setSMPW("");
                            return;
                          }
                          setSMPW(SMPWs);
                          }, [SMPW]
                           );
  
  
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={SMPW}
                      onChangeText={setSMPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>New Main Ac PW</Text>
                  </View>       

                  
                  <TouchableOpacity
                    onPress={fetchSMDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Update User Details
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default UpdtSMPW;