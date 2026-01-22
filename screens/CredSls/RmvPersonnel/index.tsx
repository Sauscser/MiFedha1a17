import React, {useEffect, useState} from 'react';

import {  deleteChamaMembers,   deletePersonel,   updateGroup} from '../../../src/graphql/mutations';
import {  getBizna, getChamaMembers,  getGroup, getSMAccount } from '../../../src/graphql/queries';
import {  graphqlOperation, API,Auth} from 'aws-amplify';

import {useNavigation, useRoute} from '@react-navigation/native';


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


  


const DeregChmMmbr = (props) => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [ChmMmbrId, setChmMmbrId] = useState("");
  
  
  const [grpContact, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [MmberId, setMmberId] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState(''); 
 
  const ChmNMmbrPhns = MmberId+grpContact
  const route = useRoute()
  
  
        
                const ftchChmDtls = async () =>{
                    if(isLoading){
                      return;
                    }
                    setIsLoading(true);
                    const userInfo = await Auth.currentAuthenticatedUser();
    
   
                    try{
                      const compDtls :any= await API.graphql(
                        graphqlOperation(getBizna,{BusKntct:grpContact})
                        );
                        const signitoryPWs = compDtls.data.getBizna.pw
                        
                        const owners = compDtls.data.getBizna.owner

                        

                        const updateChmMmbrAc = async()=>{
                                    if(isLoading){
                                      return;
                                    }
                                    setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(deletePersonel,{
                                                
                                                  input:{workerId:ChmNMmbrPhns}
                                                                                                    
                                                
                                              })
                                            )
                                        }
                                        catch(error){
                                          if (error){
                                            Alert.alert("Removal unsuccessful; Retry")
                                            return
                                          }
                                        }
                                          setIsLoading(false)
                                          Alert.alert("Worker Removed")
                                       
                                      }
                                      if(signitoryPWs!==pword)
                                      {
                                          Alert.alert("Wrong Administrator password");
                                      }
                                      
                                      else if(owners !== userInfo.attributes.sub)
                                      {
                                          Alert.alert("Not authorised to deregister worker");
                                      }

                                      
                                      else {updateChmMmbrAc();}
                          
                                      
                                  
                                  } catch (error) {
                        if(error){
                          console.log(error)
                          Alert.alert("Unsuccessful, retry")
                          return
                        }
                      }
                      setIsLoading(false);
                      setMmberId("");
                      setSigntryPW("")
                      setChmPhn('');
                    setPW('');
                    setPhoneContacts("")
                    setChmDesc("")
                    
                    setmemberPhn("")
                  
                    }
     
        useEffect(() =>{
          const ChmMmbrIds=MmberId
            if(!ChmMmbrIds && ChmMmbrIds!=="")
            {
              setMmberId("");
              return;
            }
            setMmberId(ChmMmbrIds);
            }, [MmberId]
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
                    const memberPhns=memberPhn
                      if(!memberPhns && memberPhns!=="")
                      {
                        setmemberPhn("");
                        return;
                      }
                      setmemberPhn(memberPhns);
                      }, [memberPhn]
                       );
        
                       useEffect(() =>{
              const phoneContactss=phoneContacts
                if(!phoneContactss && phoneContactss!=="")
                {
                  setPhoneContacts("");
                  return;
                }
                setPhoneContacts(phoneContactss);
                }, [phoneContacts]
                 );
      
            
      
                 useEffect(() =>{
                  const ChmDescs=ChmDesc
                    if(!ChmDescs && ChmDescs!=="")
                    {
                      setChmDesc("");
                      return;
                    }
                    setChmDesc(ChmDescs);
                    }, [ChmDesc]
                     );
      
      useEffect(() =>{
        const ChmPhns=grpContact
          if(!ChmPhns && ChmPhns!=="")
          {
            setChmPhn("");
            return;
          }
          setChmPhn(ChmPhns);
          }, [grpContact]
           );
      
           useEffect(() =>{
            const pws=pword
              if(!pws && pws!=="")
              {
                setPW("");
                return;
              }
              setPW(pws);
              }, [pword]
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
                            placeholder="+2547xxxxxxxx"
                              value={grpContact}
                              onChangeText={setChmPhn}
                              style={styles.sendLoanInput}
                              editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Business Phone</Text>
                          </View>
        
                          <View style={styles.sendLoanView}>
                            <TextInput
                            
                              value={MmberId}
                              onChangeText={setMmberId}
                              style={styles.sendLoanInput}
                              editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Personnel Work ID</Text>
                          </View>
        
                          <View style={styles.sendLoanView}>
                            <TextInput
                            
                              value={pword}
                              onChangeText={setPW}
                              secureTextEntry = {true}
                              style={styles.sendLoanInput}
                              editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Business AC PW</Text>
                          </View>
        
                          <TouchableOpacity
                            onPress={ftchChmDtls}
                            style={styles.sendLoanButton}>
                            <Text style={styles.sendLoanButtonText}>
                              Click to DeRegister
                            </Text>
                            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                          </TouchableOpacity>
                        </ScrollView>
                      </View>
                    </View>
                  );}
        
        export default DeregChmMmbr;