import React, {useEffect, useState} from 'react';

import {  updateBizna, updateCompany, updateGroup,  updateSMAccount} from '../../../../src/graphql/mutations';
import {  getBizna, getCompany, getGroup,  getSMAccount, listPersonels, listSMAccounts } from '../../../../src/graphql/queries';
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
            
            try{
              const compDtls :any= await API.graphql(
                graphqlOperation(getBizna,{BusKntct:groupCnt})
                );
                
                const owners = compDtls.data.getBizna.owner 
                const AdminNo = compDtls.data.getBizna.AdminNo
                const email = compDtls.data.getBizna.email
                const pw = compDtls.data.getBizna.pw

                const ChckUsrExistence = async () => {
                  const userInfo = await Auth.currentAuthenticatedUser();
                  try {
                    const UsrDtls:any = await API.graphql(
                      graphqlOperation(listPersonels,
                        { filter: 
                          {
                            and:{
                              awsemail: { eq: LnAcCod},
                              
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
                            graphqlOperation(updateBizna,{
                              input:{
                                BusKntct:groupCnt,
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
                      Alert.alert(userInfo.username +", You have successfully Added Admin number "+ (parseFloat(AdminNo)+1));
                    } 
                    
                    const updtSMDtls2 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
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

                                      const updtSMDtls21 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin21:LnAcCod,
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

                                      const updtSMDtls22 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin22:LnAcCod,
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

                                      const updtSMDtls23 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin23:LnAcCod,
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

                                      const updtSMDtls24 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin24:LnAcCod,
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

                                      const updtSMDtls25 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin25:LnAcCod,
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

                                      const updtSMDtls26 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin26:LnAcCod,
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

                                      const updtSMDtls27 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin27:LnAcCod,
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

                                      const updtSMDtls28 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin28:LnAcCod,
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

                                      const updtSMDtls29 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin29:LnAcCod,
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

                                      const updtSMDtls30 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin30:LnAcCod,
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

                                      const updtSMDtls31 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin31:LnAcCod,
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

                                      const updtSMDtls32 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin32:LnAcCod,
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

                                      const updtSMDtls33 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin33:LnAcCod,
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

                                      const updtSMDtls34 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin34:LnAcCod,
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

                                      const updtSMDtls35 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin35:LnAcCod,
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

                                      const updtSMDtls36 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin36:LnAcCod,
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
                                      
                                      const updtSMDtls37 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin37:LnAcCod,
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

                                      const updtSMDtls38 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin38:LnAcCod,
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

                                      const updtSMDtls39 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin39:LnAcCod,
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

                                      const updtSMDtls40 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin40:LnAcCod,
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

                                      const updtSMDtls41 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin41:LnAcCod,
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

                                      const updtSMDtls42 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin42:LnAcCod,
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

                                      const updtSMDtls43 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin43:LnAcCod,
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

                                      const updtSMDtls44 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin44:LnAcCod,
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

                                      const updtSMDtls45 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin45:LnAcCod,
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

                                      const updtSMDtls46 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin46:LnAcCod,
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

                                      const updtSMDtls47 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin47:LnAcCod,
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

                                      const updtSMDtls48 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin48:LnAcCod,
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

                                      const updtSMDtls49 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin49:LnAcCod,
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

                                      const updtSMDtls50 = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateBizna,{
                                                input:{
                                                  BusKntct:groupCnt,
                                                  Admin50:LnAcCod,
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

                                      else if (UsrDtls.data.listPersonels.items.length <1) {
                                        Alert.alert("Admin should be a Sales Officer in the business");
                                       
                                      }

                                      else if (LnAcCod === email) {
                                        Alert.alert("You are the Creator of the business");
                                       
                                      }

                                      else if (SMPW !== pw) {
                                        Alert.alert("Wrong Business Password");
                                       
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

                                      else if (AdminNo === 20) {
                                        updtSMDtls21();                                       
                                      }

                                      else if (AdminNo === 21) {
                                        updtSMDtls22();                                       
                                      }

                                      else if (AdminNo === 22) {
                                        updtSMDtls23();                                       
                                      }

                                      else if (AdminNo === 23) {
                                        updtSMDtls24();                                       
                                      }

                                      else if (AdminNo === 24) {
                                        updtSMDtls25();                                       
                                      }

                                      else if (AdminNo === 25) {
                                        updtSMDtls26();                                       
                                      }

                                      else if (AdminNo === 26) {
                                        updtSMDtls27();                                       
                                      }

                                      else if (AdminNo === 27) {
                                        updtSMDtls28();                                       
                                      }

                                      else if (AdminNo === 28) {
                                        updtSMDtls29();                                       
                                      }

                                      else if (AdminNo === 29) {
                                        updtSMDtls30();                                       
                                      }

                                      else if (AdminNo === 30) {
                                        updtSMDtls31();                                       
                                      }

                                      else if (AdminNo === 31) {
                                        updtSMDtls32();                                       
                                      }

                                      else if (AdminNo ===32) {
                                        updtSMDtls33();                                       
                                      }

                                      else if (AdminNo === 33) {
                                        updtSMDtls34();                                       
                                      }

                                      else if (AdminNo === 34) {
                                        updtSMDtls35();                                       
                                      }

                                      else if (AdminNo === 35) {
                                        updtSMDtls36();                                       
                                      }

                                      else if (AdminNo === 36) {
                                        updtSMDtls37();                                       
                                      }

                                      else if (AdminNo === 37) {
                                        updtSMDtls38();                                       
                                      }

                                      else if (AdminNo === 38) {
                                        updtSMDtls39();                                       
                                      }

                                      else if (AdminNo === 39) {
                                        updtSMDtls40();                                       
                                      }

                                      else if (AdminNo === 40) {
                                        updtSMDtls41();                                       
                                      }

                                      else if (AdminNo === 41) {
                                        updtSMDtls42();                                       
                                      }

                                      else if (AdminNo === 42) {
                                        updtSMDtls43();                                       
                                      }

                                      else if (AdminNo === 43) {
                                        updtSMDtls44();                                       
                                      }

                                      else if (AdminNo === 44) {
                                        updtSMDtls45();                                       
                                      }

                                      else if (AdminNo === 45) {
                                        updtSMDtls46();                                       
                                      }

                                      else if (AdminNo === 46) {
                                        updtSMDtls47();                                       
                                      }

                                      else if (AdminNo === 47) {
                                        updtSMDtls48();                                       
                                      }

                                      else if (AdminNo === 48) {
                                        updtSMDtls49();                                       
                                      }

                                      else if (AdminNo === 49) {
                                        updtSMDtls50();                                       
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
                    <Text style={styles.sendLoanText}>Business Phone</Text>
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
                    <Text style={styles.sendLoanText}>Business Ac PW</Text>
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