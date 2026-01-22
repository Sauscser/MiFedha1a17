import React, {useEffect, useState} from 'react';

import {createBankAdmin, updateCompany} from '../../../src/graphql/mutations';
import {getCompany, getSMAccount,  } from '../../../src/graphql/queries';
import {Auth, graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';

const CreateAdminForm = () => { 

  const navigation = useNavigation();
  const [PhoneContact, setPhoneContact] = useState("");
  const [nationalId, setNationalid] = useState("");
  const [ownr, setOwner] = useState("");
  const [pword, setPW] = useState("");
  const [isLoading, setISLoading] = useState(false);

  const fetchUser = async () => {
  

      };
      useEffect(() => {
      fetchUser();
    }, []); 

    

    const gtCompDtls = async () =>{
      const userInfo = await Auth.currentAuthenticatedUser();
      if(isLoading){
        return;
      }
      setISLoading(true);
        try{
            const compDtls :any= await API.graphql(
              graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
            );
            const actvAdm = compDtls.data.getCompany.ttlKFAdmActv
            

            const gtUsrDtls4AdminDtls = async () => {
              if(isLoading){
                return;
              }
              setISLoading(true);
              try {
                const resp:any = await API.graphql(
                  graphqlOperation(getSMAccount, { awsemail: nationalId })
                );
                const adminId = resp.data.getSMAccount.nationalid; 
                const adminName = resp.data.getSMAccount.name; 
                const ownrsz = resp.data.getSMAccount.owner; 
                const adminEml = resp.data.getSMAccount.awsemail;           
                                
                const CrtAdminAc = async () => {
                  if(isLoading){
                    return;
                  }
                  setISLoading(true);
                  try {
                    await API.graphql(
                      graphqlOperation(createBankAdmin, {
                        input: {
                          nationalid: adminId,
                          name: adminName,
                          phonecontact: userInfo.attributes.phone_number,
                          TtlEarnings: 0,
                          pw: pword,
                          BankAdmBal: 0,
                          email: adminEml,
                          status: "AccountActive",
                          owner:ownrsz,
                        },
                      }),
                    );
        
                    
                    
                   
                  } catch (error) {
                    
                    if (error){
                      Alert.alert("Creation unsuccessful; Retry")
                      return
                    }
                              
                  }
                     setISLoading(false);           
                  await updtActAdm();               
                };
              
                CrtAdminAc();

                const updtActAdm = async()=>{
                  try{
                      await API.graphql(
                        graphqlOperation(updateCompany,{
                          input:{
                            AdminId:"BaruchHabaB'ShemAdonai2",
                            ttlKFAdmActv:parseFloat(actvAdm) + 1,
                          }
                        })
                      )
                  }
                  catch(error){if(error){
                    console.log(error)
                    Alert.alert("Please Check your internet now")
                    return
                  }}
                  Alert.alert("Congrats "+ adminName + ", you are now an Admin")
                  setISLoading(false);
                };

          
                
              } catch (error) {
                if(error){
                  console.log(error)
                  Alert.alert("Please first create this user Account")
                  return;
                }
              }
              setISLoading(false);
            };

            await gtUsrDtls4AdminDtls();
                  
        }

        catch(e){
          if(e){
            Alert.alert("Check your internet")
            return
          }
        }     setISLoading(false);
              setOwner("");
              setPW("");
              setNationalid("")
    };

    useEffect(() =>{
      const ownrs=nationalId
        if(!ownrs && ownrs!=="")
        {
          setNationalid("");
          return;
        }
        setNationalid(ownrs);
        }, [nationalId]
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
                    <Text style={styles.title}>Fill Account Details Below</Text>
                  </View>
        
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={nationalId}
                      onChangeText={setNationalid}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Admin Email</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={pword}
                      onChangeText={setPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Pass Word</Text>
                  </View>

                  
                  <TouchableOpacity
                    onPress={gtCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Create Account
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default CreateAdminForm;