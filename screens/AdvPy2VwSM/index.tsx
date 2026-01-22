import React, {useEffect, useState} from 'react';

import { getCompany, getSMAccount} from '../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
 
} from 'react-native';
import styles from './styles';
import { updateCompany, updateSMAccount } from '../../src/graphql/mutations';



const AdvPayToVwChm = (props) => {  
  const navigation = useNavigation();

  const [AdvReNo, setMFNId] = useState("");
  const [MFNPW, setMFNPW] = useState(""); 
  const [ownr, setownr] = useState(null); 
  


  const VwMFNAc = () => {
    navigation.navigate("VwAdvAcs", {AdvReNo});
  };

 
    
    const fetchUsrDtls = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
    
   
      try {
              const MFNDtls: any = await API.graphql(
                  graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}
              ),);

              const balances = MFNDtls.data.getSMAccount.balance;
              const owner = MFNDtls.data.getSMAccount.owner;
              
              const fetchCompDtls = async () => {
                try {
                        const MFNDtls: any = await API.graphql(
                            graphqlOperation(getCompany, {AdminId: "BaruchHabaB'ShemAdonai2"}
                        ),);
        
                        const companyEarningBals = MFNDtls.data.getCompany.companyEarningBal;
                        const companyEarnings = MFNDtls.data.getCompany.companyEarning;
                        const enquiryFees = MFNDtls.data.getCompany.enquiryFee;
                        
                        
                                    const updtActAdm = async()=>{
                                      
                                      try{
                                          await API.graphql(
                                            graphqlOperation(updateCompany,{
                                              input:{
                                                AdminId:"BaruchHabaB'ShemAdonai2",
                                                companyEarningBal:parseFloat(companyEarningBals) + parseFloat(enquiryFees),
                                                companyEarning:parseFloat(companyEarnings) + parseFloat(enquiryFees),
                                              }
                                            })
                                          )
                                      }
                                      catch(error){
                                        if(error){
                                          Alert.alert("Check entered Details")
                                          return;
                                      }
                                      }
                                      updtUsrAc();
                                      
                                    }

                                    const updtUsrAc = async()=>{
                                      
                                      try{
                                          await API.graphql(
                                            graphqlOperation(updateSMAccount,{
                                              input:{
                                                awsemail:userInfo.attributes.email,
                                                balance:parseFloat(balances) - parseFloat(enquiryFees),
                                              }
                                            })
                                          )
                                      }
                                      catch(error){
                                        if(error){
                                          Alert.alert("Retry or update app or call customer care")
                                          return;
                                      }
                                      }
                                      VwMFNAc();
                                      
                                    }
                


                

        if(balances < parseFloat(enquiryFees) ){
            Alert.alert("Account Balance cannot facilitate the request");
          }
          else{
              
            updtActAdm();
              }
              
                }
            catch (e)
            {
              if(e){
                Alert.alert("Advocate does not exist; otherwise check internet connection");
                return;
              }
                console.log(e)
               
                
            }    

    
             }

             if (userInfo.attributes.sub !== owner)
    {Alert.alert ("Please first create main account")}
    else{
             await fetchCompDtls();}

            }

            catch (e)
            {
              if(e){
                Alert.alert("Advocate does not exist; otherwise check internet connection");
                return;
              }
                console.log(e)
               
                
            }    

            setMFNId("");
            setMFNPW("");
             }


             useEffect(() =>{
              const mfnID=AdvReNo
                if(!mfnID && mfnID!=="")
                {
                  setMFNId("");
                  return;
                }
                setMFNId(mfnID);
                }, [AdvReNo]
                 );
  
                 useEffect(() =>{
                  const mfnPW=MFNPW
                    if(!mfnPW && mfnPW!=="")
                    {
                      setMFNPW("");
                      return;
                    }
                    setMFNPW(mfnPW);
                    }, [MFNPW]
                     );



         return (
           
              <View
                 style={styles.image}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                      value={AdvReNo}
                      onChangeText={setMFNId}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Advocate License Number</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={MFNPW}
                      onChangeText={setMFNPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Pass Word</Text>
                  </View>
        
                  <TouchableOpacity
                    onPress={fetchUsrDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to View
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            
          );
        };
        
        export default AdvPayToVwChm;