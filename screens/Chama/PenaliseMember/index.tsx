import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {updateCompany, updateSMAccount, updateCvrdGroupLoans, updateGroup,  updateChamaMembers, } from '../../../src/graphql/mutations';
import {getCompany, getSMAccount, getCvrdGroupLoans, 
  getGroup, getChamaMembers } from '../../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import {useNavigation, useRoute} from '@react-navigation/native';


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


  


const BLChmCovLoanee = (props) => {
  const navigation = useNavigation();

  const [LonId, setLonId] = useState("");
  const [ChmMbrId, setChmMbrId] = useState("");
  const [SigntryPW, setSigntryPW] = useState("");
  
 
  const[isLoading, setIsLoading] = useState(false);
  


  const route = useRoute();
  

  
    
    const gtCompDtls = async () =>{
      
    if(isLoading){
      return;
    }
    setIsLoading(true);
    const userInfo = await Auth.currentAuthenticatedUser();
    try{
      const compDtls :any= await API.graphql(
        graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
        );
        const ttlChmLnsInBlTymsCovs = compDtls.data.getCompany.ttlChmLnsInBlTymsCov
        const ttlChmLnsInBlAmtCovs = compDtls.data.getCompany.ttlChmLnsInBlAmtCov
        const userClearanceFees = compDtls.data.getCompany.userClearanceFee
        const ttlBLUsrss = compDtls.data.getCompany.ttlBLUsrs

        const gtMmbrDtls = async () =>{
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try{
            const compDtls2 :any= await API.graphql(
              graphqlOperation(getChamaMembers,{ChamaNMember:route.params.ChamaNMember})
              );
              const timeCrtd = compDtls2.data.getChamaMembers.timeCrtd
              const subscribedAmt = compDtls2.data.getChamaMembers.subscribedAmt
              const totalSubAmt = compDtls2.data.getChamaMembers.totalSubAmt
              const groupContact = compDtls2.data.getChamaMembers.groupContact
              const memberName = compDtls2.data.getChamaMembers.memberName
              const memberContact = compDtls2.data.getChamaMembers.memberContact
              const subscriptionFrequency = compDtls2.data.getChamaMembers.subscriptionFrequency
              const subscriptionAmt = compDtls2.data.getChamaMembers.subscriptionAmt
              const lateSubscriptionPenalty = compDtls2.data.getChamaMembers.lateSubscriptionPenalty
              const ttlLateSubs = compDtls2.data.getChamaMembers.ttlLateSubs
              
              

              const today = new Date();
              let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
              let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
              let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
              let years = (today.getFullYear() < 10 ? '0' : '') + today.getFullYear();
              let months = (today.getMonth() < 10 ? '0' : '') + today.getMonth();
              let months2 = parseFloat(months)
              let days = (today.getDate() < 10 ? '0' : '') + today.getDate();
              
              const now:any = years+ "-"+ "0"+months2 +"-"+ days+"T"+hours + ':' + minutes + ':' + seconds;

              const now1:any = "2024-05-20";
             
              
              
              
              
              
             

        
              const curYrs = parseFloat(years)*365;
              const curMnths = (months2)*30.4375;
              const daysUpToDate = curYrs + curMnths + parseFloat(days)          

              
              

              const gtChmDtls = async () =>{
                if(isLoading){
                  return;
                }
                setIsLoading(true);
                try{
                  const compDtls3 :any= await API.graphql(
                    graphqlOperation(getGroup,{grpContact:groupContact})
                    );
                    
                    const objectionStatus = compDtls3.data.getGroup.objectionStatus 
                    const grpName = compDtls3.data.getGroup.grpName                  
                    
                      const tmDif = daysUpToDate - timeCrtd;
                      const subFreq = tmDif/parseFloat(subscriptionFrequency)
                      const Amt2HvBnSub = subFreq*parseFloat(subscriptionAmt)
                      const subPnlties = parseFloat(totalSubAmt) - parseFloat(subscribedAmt)
                      const ttlArrears = (parseFloat(ttlLateSubs) + Amt2HvBnSub).toFixed(2)
                         
                    

                                const updateMmbrDtls3 = async () => {
                                  if(isLoading){
                                    return;
                                  }
                                  setIsLoading(true);
                                  try{
                                      await API.graphql(
                                        graphqlOperation(updateChamaMembers, {
                                          input:{
                                            ChamaNMember:route.params.ChamaNMember,
                                            totalSubAmt:ttlArrears,
                                            timeCrtd: daysUpToDate,
                                            ttlLateSubs: parseFloat(ttlLateSubs)+parseFloat(lateSubscriptionPenalty)
                                          }
                                        })
                                      )
                              
                                      
                                  }
                                  catch(error){
                                    console.log(error)
                                    if(error){
                                      console.log(error)
                                    Alert.alert("Retry or update app or call customer care");
                                    return;
                                } 
                                 }
                                 Alert.alert("You have Penalised "+ memberName +" for late payment ")
                                 Communications.textWithoutEncoding(memberContact,'MiFedha. Hi '
                                 + memberName + ', you have been penalised for late subscription by '+ grpName
                                 + ' group. The following is a breakdown of your subscription arrears and penalties: '
                                 + '. subscription you have done up to date are Ksh. ' + subscribedAmt.toFixed(2)
                                 + ' instead of Ksh. '+ Amt2HvBnSub.toFixed(2) 
                               
                                +'. For clarification call the group Admin: '
                               + userInfo.attributes.phone_number + '. Thank you.');
                                
                                  setIsLoading(false);          
                                } 
  
                                 if (parseFloat(subscriptionFrequency) > tmDif){
                                  Alert.alert(" Time to penalise is not yet")
                                }
                                else if ((Amt2HvBnSub + parseFloat(ttlLateSubs))< subscribedAmt){
                                Alert.alert(" Member subscription is upto date")
                              }                             
                              
                              else if (objectionStatus  === "Objected"
                            ){
                                Alert.alert("Sorry account operations have been stopped by an Admin")
                              }

                              else {updateMmbrDtls3()}
                             
                          
                  }
      
                  catch(error){ if (error){
                    console.log(error)
                    Alert.alert("Retry or update app or call customer care")
                    return
                  }}
                  setIsLoading(false);         
                  
                }
                await gtChmDtls(); 
            }

            catch(error){
              console.log(error)
              if(error){
                console.log(error)
              Alert.alert("Retry or update app or call customer care")
              return;              
          } 
           }
            setIsLoading(false);                     
          } 
          await gtMmbrDtls();        
            
          } catch (error) {
            console.log(error)
            
            if(error){
              console.log(error)
              Alert.alert("Retry or update app or call customer care")
              return;
          };
          }
          
          setIsLoading(false);
          setLonId("") 
          setChmMbrId("")
          setSigntryPW("")
        };    

        useEffect(() =>{
          const usId=LonId
            if(!usId && usId!=="")
            {
              setLonId("");
              return;
            }
            setLonId(usId);
            }, [LonId]
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
              const ChmMbrIds=ChmMbrId
                if(!ChmMbrIds && ChmMbrIds!=="")
                {
                  setChmMbrId("");
                  return;
                }
                setChmMbrId(ChmMbrIds);
                }, [ChmMbrId]
                 );
        
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <TouchableOpacity
                    onPress={gtCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Penalise 
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default BLChmCovLoanee;