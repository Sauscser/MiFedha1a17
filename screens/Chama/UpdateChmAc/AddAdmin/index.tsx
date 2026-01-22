import React, {useEffect, useState} from 'react';

import {  updateBizna, updateCompany, updateGroup,  updateSMAccount} from '../../../../src/graphql/mutations';
import {  getGroup, getCompany,   getSMAccount, 
  listSMAccounts, listChamaMembers } from '../../../../src/graphql/queries';
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
                graphqlOperation(getGroup,{grpContact:groupCnt})
                );

                const UsrDtls :any= await API.graphql(
                graphqlOperation(getSMAccount,{awsemail:userInfo.attributes.email})
                );
                
                const owners = compDtls.data.getGroup.owner 
                const AdminNo = compDtls.data.getGroup.AdminNo
                
                const pw = compDtls.data.getGroup.signitoryPW

                const UsrDtlx = UsrDtls.data.getSMAccount

                const ChckUsrExistence = async () => {
                  try {
                    const UsrDtls:any = await API.graphql(
                      graphqlOperation(listChamaMembers,
                        { filter: 
                          {
                            and:{
                              memberContact: { eq: LnAcCod},
                              
                          }                          
                          }}
                      )
                    )

                                        
                
                          
                    const updtSMDtls1 = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateGroup,{
                              input:{
                                grpContact:groupCnt,
                                Admin1:LnAcCod,
                                AdminNo:(parseFloat(AdminNo)+1)
                                
                              }
                            })
                          )
                  
                          
                      }
                      catch(error){if(error){
                        console.log(error)
                        Alert.alert("Failed; Update your app or re-check business Phone number")
                        return
                        
                    } 
                  }
                      setIsLoading(false);
                      Alert.alert(UsrDtlx.name +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                    } 
                    
                    const updtSMDtls2 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin2:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls3 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin3:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls4 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin4:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls5 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin5:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls6 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin6:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls7 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin7:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls8 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin8:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls9 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin9:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls10 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin10:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls11 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin11:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls12 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin12:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls13 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin13:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls14 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin14:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls15 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin15:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls16 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin16:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls17 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin17:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls18 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin18:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls19 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin19:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                      const updtSMDtls20 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:groupCnt,
                                                  Admin20:LnAcCod,
                                                  AdminNo:(parseFloat(AdminNo)+1)
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or re-check business Phone number")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                                      } 

                                     

                                      
                                      if(userInfo.attributes.sub!==owners)
                                      {
                                          Alert.alert("Unauthorised to add admin");
                                      }

                                      else if (UsrDtls.data.listChamaMembers.items.length <1) {
                                        Alert.alert("Admin should create Main Account");
                                       
                                      }

                                     

                                      else if (SMPW !== pw) {
                                        Alert.alert("Wrong Group Password");
                                       
                                      }

                                      else if (AdminNo === 0) {
                                        updtSMDtls1();                                       
                                      }

                                      else if (AdminNo === 1) {
                                        updtSMDtls2();                                       
                                      }

                                      else if (AdminNo === 2) {
                                        updtSMDtls3();                                       
                                      }

                                      else if (AdminNo === 3) {
                                        updtSMDtls4();                                       
                                      }

                                      else if (AdminNo === 4) {
                                        updtSMDtls5();                                       
                                      }

                                      else if (AdminNo === 5) {
                                        updtSMDtls6();                                       
                                      }

                                      else if (AdminNo === 6) {
                                        updtSMDtls7();                                       
                                      }

                                      else if (AdminNo === 7) {
                                        updtSMDtls8();                                       
                                      }

                                      else if (AdminNo === 8) {
                                        updtSMDtls9();                                       
                                      }

                                      else if (AdminNo === 9) {
                                        updtSMDtls10();                                       
                                      }

                                      else if (AdminNo === 10) {
                                        updtSMDtls11();                                       
                                      }

                                      else if (AdminNo === 11) {
                                        updtSMDtls12();                                       
                                      }

                                      else if (AdminNo === 12) {
                                        updtSMDtls13();                                       
                                      }

                                      else if (AdminNo === 13) {
                                        updtSMDtls14();                                       
                                      }

                                      else if (AdminNo === 14) {
                                        updtSMDtls15();                                       
                                      }

                                      else if (AdminNo === 15) {
                                        updtSMDtls16();                                       
                                      }

                                      else if (AdminNo === 16) {
                                        updtSMDtls17();                                       
                                      }

                                      else if (AdminNo === 17) {
                                        updtSMDtls18();                                       
                                      }

                                      else if (AdminNo === 18) {
                                        updtSMDtls19();                                       
                                      }

                                      else if (AdminNo === 19) {
                                        updtSMDtls20();                                       
                                      }

                                     
                                      
                                      else {Alert.alert("You have exhausted admin slots");}

        
                                

                                    } catch (e) {
                                      if(e){Alert.alert("Retry or update app or call customer care")
                                    return}
                                      
                                    }
                                              
                                  }
                                  
                                  await ChckUsrExistence ();
                                
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
                    <Text style={styles.sendLoanText}>Group Phone</Text>
                  </View>    
                  
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={LnAcCod}
                      onChangeText={setLnAcCod}
                  
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Admin Main Account Email</Text>
                  </View>    
                  
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={SMPW}
                      onChangeText={setSMPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Group Ac PW</Text>
                  </View>       

                  
                  <TouchableOpacity
                    onPress={fetchSMDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Update Group Details
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default UpdtSMPW;