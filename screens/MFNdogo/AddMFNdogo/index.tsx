import React, {useEffect, useState} from 'react';

import {updateSMAccount} from '../../../src/graphql/mutations';
import {getSMAccount} from '../../../src/graphql/queries';
import {  graphqlOperation, API,Auth} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


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
import { updateBankAdmin } from '../../../src/graphql/mutations';

const UpdtMFNPW = (props) => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [AdminID, setAdminId] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [NewAdmnPW, setNewAdmnPW] = useState("");
  const [OldAdmnPW, setOldAdmnPW] = useState("");
  const[isLoading, setIsLoading] = useState(false);

  
  


  
        const fetchMFNDtls = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
                const userInfo = await Auth.currentAuthenticatedUser();

            try{
              const MFNDtls :any= await API.graphql(
                graphqlOperation(getSMAccount,{awsemail:AdminID})
                );
                const TtlClrdLonsAmtByrCovs = MFNDtls.data.getSMAccount.TtlClrdLonsAmtByrCov   

                const userDtls :any= await API.graphql(
                  graphqlOperation(getSMAccount,{awsemail:userInfo.attributes.email})
                  );
                  const UserDtls = userDtls.data.getSMAccount
                
                          
                
                          
                                      const updtMFNDtls = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateSMAccount,{
                                                input:{
                                                  awsemail:AdminID,
                                                  TtlClrdLonsAmtByrCov:parseFloat(TtlClrdLonsAmtByrCovs) + parseFloat(OldAdmnPW)
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if (error){
                                          Alert.alert("Application unsuccessful; Retry")
                                          return
                                        }
                                    }
                                        setIsLoading(false);
                                        Alert.alert("MFNdogo creation successfully authorised");
                                      } 

                                      updtMFNDtls();

        
                                

            } catch (error) {
                if(error){
                  Alert.alert("Retry or update app or call customer care")
                  return
                }
              }
         
           

            setIsLoading(false);
              setNewAdmnPW("");
              setSigntryPW("")
              setOldAdmnPW("")
              setAdminId("")
          
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
                        const AdminIDs=AdminID
                          if(!AdminIDs && AdminIDs!=="")
                          {
                            setAdminId("");
                            return;
                          }
                          setAdminId(AdminIDs);
                          }, [AdminID]
                           );
  
  
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill MFN Details Below</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="User Email"
                      value={AdminID}
                      onChangeText={setAdminId}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>User Email</Text>
                  </View> 
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={OldAdmnPW}
                      onChangeText={setOldAdmnPW}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Number of MFNdogos</Text>
                  </View>   

                       

                  
                                   
        
                  <TouchableOpacity
                    onPress={fetchMFNDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Add
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default UpdtMFNPW;