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
  const [RpymtPrd, setRpymtPrd] = useState("");
  const [DfltPnlty, setDfltPnlty] = useState("");
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
                
                const owners = compDtls.data.getSMAccount.owner 
                const acStatuss = compDtls.data.getSMAccount.acStatus  
                const pwss = compDtls.data.getSMAccount.pw   
                const names = compDtls.data.getSMAccount.name             
                
                          
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
                                                  DefaultPenaltySM:parseFloat(DfltPnlty).toFixed(2),
                                                  loanAcceptanceCode:LnAcCod,
                                                  TtlActvLonsTmsLnrCov:groupCnt,
                                                  TtlActvLonsTmsLneeCov:RpymtPrd
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Please check internet; otherwise member doesnt exist")
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert( names+", You have requested a Loan from " + LnAcCod);
                                      } 

                                      if(SMPW!==pwss)
                                      {
                                          Alert.alert("Wrong SM A/C password; Prove Ownership of Account");
                                      }
                                      
                                      else if( userInfo.attributes.owner !==owners)
                                      {
                                          Alert.alert("You are not the Owner of the Account");
                                      }

                                      else if(userInfo.attributes.email===LnAcCod)
                                      {
                                          Alert.alert("You should not request a loan from yourself");
                                      }

                                      else if(parseFloat(groupCnt)<parseFloat(DfltPnlty))
                                      {
                                          Alert.alert("Exploitative penalty! please enter a lesser penalty");
                                      }

                                      

                                      else if(acStatuss!=="AccountActive")
                                      {
                                          Alert.alert("This User Account is inactive");
                                      }

                                      
                                      else {updtSMDtls();}

        
                                

            } catch (error) {
              console.log(error)
                if(error){
                  Alert.alert("Check internet; otherwise User doesnt exist")
                  return
                }
              }
         
           

            setIsLoading(false);
              setgroupCnt("");
              setSigntryPW("")
              setSMPW("")
              setLnAcCod("")
              setRpymtPrd("");
              setDfltPnlty("")
          
            }
        
            useEffect(() =>{
              const DfltPnltys=DfltPnlty
                if(!DfltPnltys && DfltPnltys!=="")
                {
                  setDfltPnlty("");
                  return;
                }
                setDfltPnlty(DfltPnltys);
                }, [DfltPnlty]
                 );

                 useEffect(() =>{
                  const RpymtPrds=RpymtPrd
                    if(!RpymtPrds && RpymtPrds!=="")
                    {
                      setRpymtPrd("");
                      return;
                    }
                    setRpymtPrd(RpymtPrds);
                    }, [RpymtPrd]
                     );
                 
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
                    placeholder="Chama/Bizna Phone"
                      value={LnAcCod}
                      onChangeText={setLnAcCod}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Chama/Bizna Phone</Text>
                  </View>  

                  <View style={styles.sendLoanView}>
                    <TextInput
                    keyboardType={"decimal-pad"}
                      value={groupCnt}
                      autoCompleteType ={"off"}
                      onChangeText={setgroupCnt}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Amount</Text>
                  </View>     

                  <View style={styles.sendLoanView}>
                    <TextInput
                    keyboardType={"decimal-pad"}
                      value={RpymtPrd}
                      autoCompleteType ={"off"}
                      onChangeText={setRpymtPrd}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Repayment Period in days</Text>
                  </View>          

                  <View style={styles.sendLoanView}>
                    <TextInput
                    keyboardType={"decimal-pad"}
                      value={DfltPnlty}
                      autoCompleteType ={"off"}
                      onChangeText={setDfltPnlty}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Default Penalty (Ksh)</Text>
                  </View>       

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={SMPW}
                      autoCompleteType ={"off"}
                      onChangeText={setSMPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>User Pass Word</Text>
                  </View>     

                                   
        
                  <TouchableOpacity
                    onPress={fetchSMDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Request Loan
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default UpdtSMPW;