import React, {useEffect, useState} from 'react';

import {createBankAdmin, createMiFedhaBankAdmin, updateChamaControlTable, updateCompany} from '../../../src/graphql/mutations';
import {getChamaControlTable, getCompany, getSMAccount,  } from '../../../src/graphql/queries';
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
  const [AdminBank, setAdminBank] = useState("");
  const [AdminBankAcNu, setAdminBankAcNu] = useState("");
  const [ownr, setOwner] = useState("");
  const [pword, setPW] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

 
    

    const gtCompDtls = async () =>{
      const userInfo = await Auth.currentAuthenticatedUser();
      if(isLoading){
        return;
      }
      setIsLoading(true);
        try{
            const compDtls :any= await API.graphql(
              graphqlOperation(getChamaControlTable,{id:"EQUITYTABLEID"})
            );
            const BankAdminTotal = compDtls.data.getChamaControlTable.BankAdminTotal

            console.log("EQUITYTABLEID")
            

            const gtUsrDtls4AdminDtls = async () => {
             
              try {
                const resp:any = await API.graphql(
                  graphqlOperation(getSMAccount, { awsemail: nationalId })
                );
                const adminId = resp.data.getSMAccount.nationalid; 
                const adminName = resp.data.getSMAccount.name; 
                const ownrsz = resp.data.getSMAccount.owner; 
                const adminEml = resp.data.getSMAccount.awsemail;           
                const Phonecontact = resp.data.getSMAccount.phonecontact;               
                
                
                const CrtAdminAc = async () => {
                  
                  try {
                    await API.graphql(
                      graphqlOperation(createMiFedhaBankAdmin, {
                        input: {
                          /*Bank Admin Acc */
                          nationalid: adminId,
                          name: adminName,
                         
                          TtlEarnings: 0,
                          pw: pword,
                          BankAdmBal: 0,
                          email: adminEml,
                          /*Bank Branch Number */
                          bank:AdminBank,
                          phonecontact: Phonecontact,
                          BankAcNu: AdminBankAcNu,
                          status: "AccountActive",
                          owner:ownrsz,
                        },
                      }),
                    );
        
                    
                    
                   
                  } catch (error) {

                    console.log(error)
                    
                    if (error){
                      Alert.alert("Creation unsuccessful; Retry")
                      return
                    }
                              
                  }
                        
                  await updtActAdm();               
                };
              
                if (!resp) {
                  Alert.alert("A main account with such an email does not exist")
                  return
                }
                
                else { CrtAdminAc();}

                const updtActAdm = async()=>{
                  try{
                      await API.graphql(
                        graphqlOperation(updateChamaControlTable,{
                          input:{
                            id:"EQUITYTABLEID",
                            BankAdminTotal:parseFloat(BankAdminTotal) + 1,
                          }
                        })
                      )
                  }
                  catch(error){
                    if(error)
                      {
                    console.log(error)
                    Alert.alert("Please Check your internet now")
                    return
                  }}
                  Alert.alert("Congrats "+ adminName + ", you are now an Admin")
                
                };

          
                
              } catch (error) {
                if(error){
                  console.log(error)
                  Alert.alert("Error! Retry or update your app")
                  return;
                }
              }
             
            };

            await gtUsrDtls4AdminDtls();
                  
        }

        catch(e){
          if(e){
            console.log(e)
            Alert.alert("Check your internet")
            return
          }
        }     setIsLoading(false);
              setOwner("");
              setPW("");
              setNationalid("")
              setAdminBank("");
              setAdminBankAcNu("")
    };

    useEffect(() =>{
      const AdminBanks=AdminBank
        if(!AdminBanks && AdminBanks!=="")
        {
          setAdminBank("");
          return;
        }
        setAdminBank(AdminBanks);
        }, [AdminBank]
         );

         useEffect(() =>{
          const AdminBankAcNus=AdminBankAcNu
            if(!AdminBankAcNus && AdminBankAcNus!=="")
            {
              setAdminBankAcNu("");
              return;
            }
            setAdminBankAcNu(AdminBankAcNus);
            }, [AdminBankAcNu]
             );

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
                      value={AdminBank}
                      onChangeText={setAdminBank}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Bank Branch Number</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={AdminBankAcNu}
                      onChangeText={setAdminBankAcNu}                      
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Bank Account</Text>
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