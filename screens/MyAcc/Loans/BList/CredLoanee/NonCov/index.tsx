import React, {useEffect, useState} from 'react';

import {updateCompany, updateNonCovCreditSeller, updateSMAccount, updateSMLoansCovered, } from '../../../../../../src/graphql/mutations';
import {getBizna, getCompany, getNonCovCreditSeller, getSMAccount, getSMLoansCovered, getSMLoansNonCovered } from '../../../../../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';
import Communications from 'react-native-communications';
import {useNavigation, useRoute} from '@react-navigation/native';


import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';


  


const BLNonCovCredByr = (props) => {
  const route = useRoute();

  const [LonId, setLonId] = useState("");
  const [ownr, setownr] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  

    const gtCompDtls = async () =>{
    if(isLoading){
      return;
    }
    setIsLoading(true);
    const userInfo = await Auth.currentAuthenticatedUser();
    try{
      const compDtls :any= await API.graphql(
        graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
        );
        const ttlSellerLnsInBlAmtNonCovs = compDtls.data.getCompany.ttlSellerLnsInBlAmtNonCov
        const ttlSellerLnsInBlTymsNonCovs = compDtls.data.getCompany.ttlSellerLnsInBlTymsNonCov
        const userClearanceFees = compDtls.data.getCompany.userClearanceFee
        const ttlBLUsrss = compDtls.data.getCompany.ttlBLUsrs

        const gtLoanDtls = async () =>{
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try{
            const compDtls :any= await API.graphql(
              graphqlOperation(getNonCovCreditSeller,{id:route.params.id})
              );
              const buyerContacts = compDtls.data.getNonCovCreditSeller.buyerContact
              const sellerContacts = compDtls.data.getNonCovCreditSeller.sellerContact
              const amountexpecteds = compDtls.data.getNonCovCreditSeller.amountexpectedBack
              const amountrepaids = compDtls.data.getNonCovCreditSeller.amountRepaid
              const lonBala = compDtls.data.getNonCovCreditSeller.lonBala
              const amountExpectedBackWthClrncs = compDtls.data.getNonCovCreditSeller.amountExpectedBackWthClrnc
              
              const statusssss = compDtls.data.getNonCovCreditSeller.status
              const DefaultPenaltyCredSls = compDtls.data.getNonCovCreditSeller.DefaultPenaltyCredSl
              const amountExpectedBackWthClrncss = parseFloat(userClearanceFees) * parseFloat(amountexpecteds) 
              + parseFloat(amountExpectedBackWthClrncs) + parseFloat(DefaultPenaltyCredSls)
              const LonBal = amountExpectedBackWthClrncss - parseFloat(amountrepaids);

              const createdAt = compDtls.data.getNonCovCreditSeller.createdAt;
              const repaymentPeriod = compDtls.data.getNonCovCreditSeller.repaymentPeriod;
              const ClrnceCosts = parseFloat(userClearanceFees) * parseFloat(amountexpecteds) 
             
              

              const gtLoanerDtls = async () =>{
                if(isLoading){
                  return;
                }
                setIsLoading(true);
                try{
                  const compDtls :any= await API.graphql(
                    graphqlOperation(getBizna,{BusKntct:sellerContacts})
                    );
                    
                    const names = compDtls.data.getBizna.busName
                    
                         
                    const gtLoaneeDtls = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                        const compDtls :any= await API.graphql(
                          graphqlOperation(getSMAccount,{awsemail:buyerContacts})
                          );
                          const TtlBLLonsTmsByrNonCovs = compDtls.data.getSMAccount.TtlBLLonsTmsByrNonCov
                          const TtlBLLonsAmtByrNonCovs = compDtls.data.getSMAccount.TtlBLLonsAmtByrNonCov
                          const TtlActvLonsAmtByrNonCovs = compDtls.data.getSMAccount.TtlActvLonsAmtByrNonCov
                          const acStatusss = compDtls.data.getSMAccount.acStatus
                          const namess = compDtls.data.getSMAccount.name
                          const phonecontactz = compDtls.data.getSMAccount.phonecontact
                          

                          
                  
                          const updtActAdm = async()=>{
                            if(isLoading){
                              return;
                            }
                            setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateCompany,{
                                        input:{
                                          AdminId:"BaruchHabaB'ShemAdonai2",
                                          ttlSellerLnsInBlTymsNonCov: parseFloat(ttlSellerLnsInBlTymsNonCovs) + 1,
                                          ttlSellerLnsInBlAmtNonCov: (parseFloat(ttlSellerLnsInBlAmtNonCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(2),
                                          ttlBLUsrs:parseFloat(ttlBLUsrss) + 1,

                                        }
                                      })
                                    )
                                }
                                catch(error){
                                  console.log(error)
                                  if(error){
                                  Alert.alert("Retry or update app or call customer care")
                                  return;
                              }}
                              await updateLoaneeDtls();
                              setIsLoading(false);
                              }

                              if(LonBal === 0){
                                Alert.alert("Loanee has cleared this loan")
                              }

                              
    
                              else if(statusssss === "LoanBL"){
                                Alert.alert("This Loan is already Black Listed")
                              } 
    
    
                              else if(acStatusss === "AccountInactive"){
                                Alert.alert("Loanee account has been deactivated")
                              } 

                              else {updtActAdm();}
                              
                              const updateLoaneeDtls = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMAccount,{
                                        input:{
                                          awsemail:buyerContacts,
                                         
                                          blStatus:"AccountBlackListed",
                                          loanStatus: "LoanActive"
                                        }
                                      })
                                    )
                            
                                    
                                }
                                catch(error){
                                  if (error){
                                    Alert.alert("Blacklisting unsuccessful; Retry")
                                    return
                                  } }
                              await updateLoanDtls();
                                setIsLoading(false);          
                              } 

                              const updateLoanDtls = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateNonCovCreditSeller, {
                                        input:{
                                          id:route.params.id,
                                          amountExpectedBackWthClrnc:(amountExpectedBackWthClrncss).toFixed(0),
                                          lonBala:LonBal.toFixed(0),
                                          DefaultPenaltyCredSl2:DefaultPenaltyCredSls.toFixed(0),
                                          status:"LoanBL",
                                        }
                                      })
                                    )
                            
                                    
                                }
                                catch(error){
                                  
                                  if(error){
                                  Alert.alert("Ensure User Exists");
                                  return;
                                  
                              } 
                               }
                              Alert.alert(names +", you have blacklisted "+ namess)
                              Communications.textWithoutEncoding(phonecontactz,'Hi '
                              + namess + ', your loan of ID ' 
                              +  route.params.id 
                              + 'has been blacklisted by '+ names 
                              + ' Business. The following is a breakdown of your repayable loan. Loan balance before blacklisting was Ksh. '
                            + lonBala + '. Default Penalty as you had agreed with your loaner is Ksh. ' + DefaultPenaltyCredSls 
                            + '. Clearance fee is Ksh. ' + ClrnceCosts + '. Total current loan repayable is Ksh. ' + LonBal
                             +'. For clarification call the Business Owner: '
                            + userInfo.attributes.phone_number + '. Thank you. MiFedha');
                                setIsLoading(false);          
                              } 
                              
                        }
            
                        
                        catch(error){
                          if (error){
                            Alert.alert("Blacklisting unsuccessful; Retry")
                            return
                          }}
                        setIsLoading(false);         
                        
                      }
                      await gtLoaneeDtls(); 
                  }
      
                  catch(error){ if (error){
                    Alert.alert("Blacklisting unsuccessful; Retry")
                    return
                  }}
                  setIsLoading(false);         
                  
                }
                await gtLoanerDtls(); 
            }

            catch(error){
             
              if(error){
              Alert.alert("Retry or update app or call customer care")
              return;              
          } 
           }
            setIsLoading(false);                     
          } 
          await gtLoanDtls();        
            
          } catch (error) {
           
            
            if(error){
              Alert.alert("Retry or update app or call customer care")
              return;
          };
          }
          
          setIsLoading(false);
          setLonId("") 
        };    

        useEffect(() =>{
          const usId=LonId
            if(!usId && usId!=="")
            {
              setLonId("");
              return;
            }
            setLonId(usId);
            }, [LonId]
             );
        
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill User Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={LonId}
                      onChangeText={setLonId}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Comment</Text>
                  </View>
        
                  
        
                  <TouchableOpacity
                    onPress={gtCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Black List 
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default BLNonCovCredByr;