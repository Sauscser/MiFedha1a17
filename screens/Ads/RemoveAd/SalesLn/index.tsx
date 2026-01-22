import React, {useEffect, useState} from 'react';

import {  deleteChamaMembers,   updateGroup} from '../../../../src/graphql/mutations';

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
import { updateBankAdmin } from '../../../../src/graphql/mutations';


  


const DeregChmMmbr = (props) => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [ChmMmbrId, setChmMmbrId] = useState("");
  
  
  const [grpContactz, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [MmberId, setMmberId] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState(''); 
  const ChmNMmbrPhns = MmberId+grpContactz
  const route = useRoute()
  
  
  
  const updateChmMmbrAc = async()=>{
    if(isLoading){
      return;
    }
    setIsLoading(true);
        try{
            await API.graphql(
              graphqlOperation(deleteChamaMembers,{
                
                  input:{ChamaNMember:ChmNMmbrPhns}
                                                                    
                
              })
            )
        }
        catch(error){
          console.log(error)
          if(error){
            Alert.alert("Error! Access denied")
            return;
          }
        }
          setIsLoading(false)
        
      }

      useEffect(() => {
        updateChmMmbrAc();
      }, []);
    

            
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
        const ChmPhns=grpContactz
          if(!ChmPhns && ChmPhns!=="")
          {
            setChmPhn("");
            return;
          }
          setChmPhn(ChmPhns);
          }, [grpContactz]
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
                              value={grpContactz}
                              onChangeText={setChmPhn}
                              style={styles.sendLoanInput}
                              editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Chama Phone Number</Text>
                          </View>
        
                          <View style={styles.sendLoanView}>
                            <TextInput
                            
                              value={MmberId}
                              onChangeText={setMmberId}
                              style={styles.sendLoanInput}
                              editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Chama Member Number</Text>
                          </View>
        
                          <View style={styles.sendLoanView}>
                            <TextInput
                            
                              value={pword}
                              onChangeText={setPW}
                              secureTextEntry = {true}
                              style={styles.sendLoanInput}
                              editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Chama PassWord</Text>
                          </View>
        
                         
                
                          <TouchableOpacity
                            onPress={updateChmMmbrAc}
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