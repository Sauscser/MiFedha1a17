import React, {useEffect, useState} from 'react';

import {  updateAdvocate} from '../../../src/graphql/mutations';
import {  getAdvocate, getSMAccount} from '../../../src/graphql/queries';
import {  graphqlOperation, API,Auth} from 'aws-amplify';



import {
  View,
  Text,
 
  TextInput,
  ScrollView,
  ActivityIndicator,
  
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';


  


const UpdtMFAdvPW = (props) => {
  
  const [AdvRegNo, setAdvRegNo] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [NewAdmnPW, setNewAdmnPW] = useState("");
  const [OldAdmnPW, setOldAdmnPW] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  
  
  

  
        const fetchAdvDtls = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);

                const userInfo = await Auth.currentAuthenticatedUser();

            try{
              const AdvDtls :any= await API.graphql(
                graphqlOperation(getAdvocate,{advregnu:AdvRegNo})
                );
                const pwds = AdvDtls.data.getAdvocate.pwd   
                const owners = AdvDtls.data.getAdvocate.owner 
                const statuss = AdvDtls.data.getAdvocate.status    
                
                const UserDtls :any= await API.graphql(
                graphqlOperation(getSMAccount,{awsemail:userInfo.attributes.email})
                );
                const usrDtl = UserDtls.data.getSMAccount 
                
                          
                                      const updtAdvDtls = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateAdvocate,{
                                                input:{
                                                  advregnu:AdvRegNo,
                                                  pwd:NewAdmnPW
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Error! Access denied!")
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(usrDtl.name +", You have successfully updated your PassWord");
                                      } 

                                       if(userInfo.attributes.owner!==owners)
                                      {
                                          Alert.alert("You are not the owner of this Advocate A/c");
                                      }

                                      else if(statuss!=="AccountActive")
                                      {
                                          Alert.alert("This Advocate Account is inactive");
                                      }

                                      
                                      else {updtAdvDtls();}

        
                                

            } catch (error) {
                if(error){
                  Alert.alert("Error! Access denied!")
                  return
                }
              }
         
           

            setIsLoading(false);
              setNewAdmnPW("");
              
              setOldAdmnPW("")
              setAdvRegNo("")
          
            }
        
        useEffect(() =>{
          const NewAdmnPWs=NewAdmnPW
            if(!NewAdmnPWs && NewAdmnPWs!=="")
            {
              setNewAdmnPW("");
              return;
            }
            setNewAdmnPW(NewAdmnPWs);
            }, [NewAdmnPW]
             );

             useEffect(() =>{
                const OldAdmnPWs=OldAdmnPW
                  if(!OldAdmnPWs && OldAdmnPWs!=="")
                  {
                    setOldAdmnPW("");
                    return;
                  }
                  setOldAdmnPW(OldAdmnPWs);
                  }, [OldAdmnPW]
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
                        const AdvRegNos=AdvRegNo
                          if(!AdvRegNos && AdvRegNos!=="")
                          {
                            setAdvRegNo("");
                            return;
                          }
                          setAdvRegNo(AdvRegNos);
                          }, [AdvRegNo]
                           );
  
  
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView showsVerticalScrollIndicator={false}>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Advocate Details Below</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={AdvRegNo}
                      onChangeText={setAdvRegNo}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Advocate License No</Text>
                  </View> 
        
                  

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={NewAdmnPW}
                      onChangeText={setNewAdmnPW}
                      style={styles.sendLoanInput}
                      secureTextEntry = {true}
                      editable={true}></TextInput>
                      
                    <Text style={styles.sendLoanText}>New Advocate PW</Text>
                  </View>     

                                   
        
                  <TouchableOpacity
                    onPress={fetchAdvDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Update Advocate Details
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default UpdtMFAdvPW;