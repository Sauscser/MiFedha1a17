import React, {useEffect, useState} from 'react';

import {  updateBizna, updateCompany, updateGroup,  updateSMAccount} from '../../../../src/graphql/mutations';
import {  getBizna, getCompany, getGroup,  getSMAccount } from '../../../../src/graphql/queries';
import {  graphqlOperation, API,Auth} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {
  View,
  Text,
  
  
  TextInput,
  ScrollView,
  StyleSheet,
  
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';



  


const UpdtSMPW = (props) => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [groupCnt, setgroupCnt] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [SMPW, setSMPW] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  

  
        const fetchSMDtls = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();    
              
            try{
              const compDtls :any= await API.graphql(
                graphqlOperation(getSMAccount,{awsemail:userInfo.attributes.email})
                );
                
                const owners = compDtls.data.getSMAccount.owner 
                const pw = compDtls.data.getSMAccount.pw
                        
                
                          
                                      const updtSMDtls = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateSMAccount,{
                                                input:{
                                                  awsemail:userInfo.attributes.email,
                                                  beneficiary:LnAcCod
                                                  
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if(error){
                                          console.log(error)
                                          Alert.alert("Failed; Update your app or call customer care")
                                          return
                                          
                                      } 
                                    }
                                        setIsLoading(false);
                                        Alert.alert(userInfo.username +", You have updated your Beneficiary");
                                      } 

                                      
                                      
                                      if(userInfo.attributes.sub!==owners)
                                      {
                                          Alert.alert("Unauthorised to update Beneficiary");
                                      }

                                      else if(pw !== SMPW)
                                      {
                                          Alert.alert("Wrong password");
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
                          <LinearGradient
                            colors={['#e58d29', 'skyblue']}
                            start={[0, 0]}
                            end={[1, 1]}
                            style={{ flex: 1 }}
                          >
                            <View style={styles.container}>
                              <ScrollView>
          
                    <View style={styles.formContainer}>
                      <TextInput
                       placeholder="Beneficiary Email"
                        value={LnAcCod}
                        onChangeText={setLnAcCod}
                        style={styles.input}
                        editable={true}></TextInput>
                     
                     <View style={styles.passwordContainer}>
                                                                   <TextInput
                                                                     placeholder="My Main Account Password"
                                                                 style={styles.passwordInput}
                                                                                                      
                                                                 value={SMPW}
                                                                 onChangeText={setSMPW}
                                                                 secureTextEntry={!isPasswordVisible}
                                                                 placeholderTextColor="#ccc"
                                                                         />
                                                                 <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                                <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                                 </TouchableOpacity>
                                                                 </View>
                       
                                                                
                    <TouchableOpacity
                      onPress={fetchSMDtls}
                      style={styles.button}>
                      {isLoading ? (
                                                <ActivityIndicator color="#fff" />
                                              ) : (
                                                <Text style={styles.locationText}>Submit</Text>
                                              )}
                                            </TouchableOpacity>
                                          </View>
                                        </ScrollView>
                                      </View>
                                    </LinearGradient>
                                  );
                                };
                                
                                const styles = StyleSheet.create({
                                    gradient: {
                                      flex: 1,
                                    },
                                    container: {
                                      flex: 1,
                                      padding: 20,
                                    },
                                    loanTitleView: {
                                      marginBottom: 20,
                                      alignItems: 'center',
                                    },
                                    title: {
                                      fontSize: 24,
                                      fontWeight: 'bold',
                                      color: '#ffffff',
                                      textAlign: 'center',
                                    },
                                    formContainer: {
                                      backgroundColor: '#ffffff',
                                      borderRadius: 10,
                                      padding: 20,
                                      shadowColor: '#000',
                                      shadowOffset: { width: 0, height: 2 },
                                      shadowOpacity: 0.25,
                                      shadowRadius: 4,
                                      elevation: 5,
                                    },
                                    input: {
                                      height: 45,
                                      borderColor: '#ccc',
                                      borderWidth: 1,
                                      marginBottom: 15,
                                      borderRadius: 5,
                                      paddingLeft: 10,
                                    },
                                    button: {
                                      backgroundColor: '#e58d29',
                                      paddingVertical: 12,
                                      borderRadius: 5,
                                      alignItems: 'center',
                                      marginTop: 20,
                                    },
                                    locationContainer: {
                                      marginVertical: 10,
                                    },
                                    locationText: {
                                      fontSize: 16,
                                      color: '#333',
                                    },
                                    passwordContainer: { flexDirection: 'row', alignItems: 'center', 
                                        backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, height:50 },
                                passwordInput: { flex: 1, padding: 12 },
                                  });
        
        export default UpdtSMPW;