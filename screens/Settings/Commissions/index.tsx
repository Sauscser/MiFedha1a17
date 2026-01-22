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
  const [CompCom, setCompCom] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [CompPW1, setCompPW1] = useState("");
  const [VAT, setVAT] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const[ownr, setownr] = useState(null);
  const[AdvComs, setAdvComs] = useState("");
  const[PhoneContact, setPhoneContact] = useState(null);
  
  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    
    
    setownr(userInfo.attributes.sub);
    setPhoneContact(userInfo.attributes.email);
    
  };
  useEffect(() => {
    fetchUser();
  }, []);

  
        const fetchSMDtls = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
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
                    const compDtls :any= await API.graphql(
                      graphqlOperation(getSMAccount,{awsemail:PhoneContact})
                      );
                      const loanAcceptanceCodes = compDtls.data.getSMAccount.loanAcceptanceCode   
                               
                          
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
                                                  agentCom:CompPW1,
                                                  sagentCom:CompPW2,
                                                  companyCom:CompCom,
                                                  AdvCom:AdvComs,
                                                  vat:VAT
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
                                        Alert.alert("You have successfully updated Company Commissions");
                                      } 
if(ownr!==owners)
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
              setCompCom("");
              setCompPW1("")
              setCompPW2("")
              setLnAcCod("")
              setAdvComs("");
              setVAT("")
          
            }
        
            useEffect(() =>{
              const VATs=VAT
                if(!VATs && VATs!=="")
                {
                  setVAT("");
                  return;
                }
                setVAT(VATs);
                }, [VAT]
                 );
                 
                 useEffect(() =>{
          const CompComs=CompCom
            if(!CompComs && CompComs!=="")
            {
              setCompCom("");
              return;
            }
            setCompCom(CompComs);
            }, [CompCom]
             );

             useEffect(() =>{
              const AdvComss=AdvComs
                if(!AdvComss && AdvComss!=="")
                {
                  setAdvComs("");
                  return;
                }
                setAdvComs(AdvComss);
                }, [AdvComs]
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
           
              <View
                 style={styles.image}>
                   <View style={styles.scrollVw}>

                   <ScrollView >
           
           <View style={styles.loanTitleView}>
             <Text style={styles.title}>Fill Ac Details Below</Text>
           </View>
 
           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={VAT}
               onChangeText={setVAT}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>GovVAT</Text>
           </View>   
           
           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={CompPW1}
               onChangeText={setCompPW1}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>MFNdogo Com</Text>
           </View>   

           

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={CompPW2}
               onChangeText={setCompPW2}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
               
             <Text style={styles.sendLoanText}>MFKubwa Comp</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={AdvComs}
               onChangeText={setAdvComs}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>Advocate Com</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={CompCom}
               onChangeText={setCompCom}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>Company Com</Text>
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