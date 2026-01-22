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
  const [maxInttSM, setmaxInttSM] = useState("");
  const [maxIntCredSllr, setmaxIntCredSllr] = useState("");
  const [maxIntGrp, setmaxIntGrp] = useState("");
  const[maxMFNdogo, setmaxMFNdogo] = useState("");
  const[maxPwnBrkr, setPwnBrkr] = useState("");
  const[maxBL, setmaxBL] = useState("");

  const[PhoneContact, setPhoneContact] = useState(null);

  const [LnAcCod, setLnAcCod] = useState("");
  
  const[isLoading, setIsLoading] = useState(false);
  const[ownr, setownr] = useState(null);
  
  
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
                                                  maxInterestSM:maxInttSM,
                                                  maxInterestCredSllr:maxIntCredSllr,
                                                  maxMFNdogos:maxMFNdogo,
                                                  maxInterestGrp:maxIntGrp,    
                                                  maxInterestPwnBrkr: maxPwnBrkr,                                             
                                                  maxBLs:maxBL,
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
                                        Alert.alert("You have successfully updated Company Maximums");
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
              setmaxInttSM("");
              setmaxIntCredSllr("")
              setmaxIntGrp("")
              setmaxMFNdogo("");
              setmaxBL("")
              setPwnBrkr("")
              setLnAcCod("")
          
            }
        
            useEffect(() =>{
              const maxPwnBrkrs=maxPwnBrkr
                if(!maxPwnBrkrs && maxPwnBrkrs!=="")
                {
                  setPwnBrkr("");
                  return;
                }
                setPwnBrkr(maxPwnBrkrs);
                }, [maxPwnBrkr]
                 );
                 
                 useEffect(() =>{
          const maxInttSMs=maxInttSM
            if(!maxInttSMs && maxInttSMs!=="")
            {
              setmaxInttSM("");
              return;
            }
            setmaxInttSM(maxInttSMs);
            }, [maxInttSM]
             );

             useEffect(() =>{
                const maxIntCredSllrs=maxIntCredSllr
                  if(!maxIntCredSllrs && maxIntCredSllrs!=="")
                  {
                    setmaxIntCredSllr("");
                    return;
                  }
                  setmaxIntCredSllr(maxIntCredSllrs);
                  }, [maxIntCredSllr]
                   );

                   useEffect(() =>{
                    const maxIntGrps=maxIntGrp
                      if(!maxIntGrps && maxIntGrps!=="")
                      {
                        setmaxIntGrp("");
                        return;
                      }
                      setmaxIntGrp(maxIntGrps);
                      }, [maxIntGrp]
                       );

                       useEffect(() =>{
                        const maxMFNdogos=maxMFNdogo
                          if(!maxMFNdogos && maxMFNdogos!=="")
                          {
                            setmaxMFNdogo("");
                            return;
                          }
                          setmaxMFNdogo(maxMFNdogos);
                          }, [maxMFNdogo]
                           );

                           useEffect(() =>{
                            const maxBLs=maxBL
                              if(!maxBLs && maxBLs!=="")
                              {
                                setmaxBL("");
                                return;
                              }
                              setmaxBL(maxBLs);
                              }, [maxBL]
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

                       
  
  
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Ac Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={maxInttSM}
               onChangeText={setmaxInttSM}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>SM Int Max</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={maxIntCredSllr}
               onChangeText={setmaxIntCredSllr}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>CredSlr Int Max</Text>
           </View>   

           

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={maxIntGrp}
               onChangeText={setmaxIntGrp}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>Grp Int Max</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={maxPwnBrkr}
               onChangeText={setPwnBrkr}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>PawnBroker Int Max</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={maxMFNdogo}
               onChangeText={setmaxMFNdogo}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>Max MFNdogos</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={maxBL}
               onChangeText={setmaxBL}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>Max BListings</Text>
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