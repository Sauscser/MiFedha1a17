import React, {useEffect, useState} from 'react';

import {  updateBizna, updateCompany, updateGroup,  updateSMAccount} from '../../../../src/graphql/mutations';
import {  getBizna, getCompany, getGroup,  getSMAccount } from '../../../../src/graphql/queries';
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
import { updateBankAdmin } from '../../../../src/graphql/mutations';


  


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
                graphqlOperation(getBizna,{BusKntct:groupCnt})
                );
                
                const owners = compDtls.data.getBizna.owner 
                const pw = compDtls.data.getBizna.pw
                const Admin1 = compDtls.data.getBizna.Admin1;
                
                const Admin2 = compDtls.data.getBizna.Admin2;
                const Admin3 = compDtls.data.getBizna.Admin3;
                const objOfficer = compDtls.data.getBizna.objOfficer;   
                
                          
                                      const updtSMDtls = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  objReason:"None",
                                                  objectionStatus: "NotObjected",
                                                  objOfficer: "None",
                                                  
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
                                        Alert.alert(userInfo.username +", You have stopped financial operations on this Business Account");
                                      } 

                                      
                                      
                                      if(userInfo.attributes.sub!==owners
                                        &&Admin1 !== userInfo.attributes.email
                                        &&
                                        Admin2 !== userInfo.attributes.email 
                                        &&
                                        Admin3 !== userInfo.attributes.email
                                        )
                                      {
                                          Alert.alert("Unauthorised to remove operations");
                                      }

                                      else if (userInfo.attributes.email !== objOfficer)
                                      {Alert.alert ("You are not the objecting Admin")}

                                      else if(pw !== SMPW)
                                      {
                                          Alert.alert("Wrong Business password");
                                      }

                                      
                                      
                                      else {updtSMDtls();}

        
                                

            } catch (error) {
                if(error){
                  Alert.alert("Error! Update your app or call customer care!")
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
                      value={groupCnt}
                      onChangeText={setgroupCnt}
                     
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Business Phone</Text>
                  </View>    

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={LnAcCod}
                      onChangeText={setLnAcCod}
                      
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}> Reason</Text>
                  </View>       
                  
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={SMPW}
                      onChangeText={setSMPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}> Business Ac PW</Text>
                  </View>       

                  
                  <TouchableOpacity
                    onPress={fetchSMDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Update Business Details
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default UpdtSMPW;