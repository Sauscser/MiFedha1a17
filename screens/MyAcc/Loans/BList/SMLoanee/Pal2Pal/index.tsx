import React, {useEffect, useState} from 'react';

import {updateCompany, updateSMAccount, updateSMLoansCovered, } from '../../../../../../src/graphql/mutations';
import {getCompany, getSMAccount, getSMLoansCovered } from '../../../../../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import {useNavigation, useRoute} from '@react-navigation/native';
import Communications from 'react-native-communications';

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


  


const BLSMCovLoanee = (props) => {
  const navigation = useNavigation();

  const [LonId, setLonId] = useState("");
  
  const[isLoading, setIsLoading] = useState(false);
  const route = useRoute()
  

 
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
        const ttlSMLnsInBlAmtCovs = compDtls.data.getCompany.ttlSMLnsInBlAmtCov
        const ttlSMLnsInBlTymsCovs = compDtls.data.getCompany.ttlSMLnsInBlTymsCov
        const userClearanceFees = compDtls.data.getCompany.userClearanceFee
        const ttlBLUsrss = compDtls.data.getCompany.ttlBLUsrs

        const gtLoanDtls = async () =>{
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try{
            const compDtls :any= await API.graphql(
              graphqlOperation(getSMLoansCovered,{loanID:route.params.loanID})
              );
              const loaneePhns = compDtls.data.getSMLoansCovered.loaneeEmail
              const loanerPhns = compDtls.data.getSMLoansCovered.loanerEmail
              const amountexpecteds = compDtls.data.getSMLoansCovered.amountexpected
              const lonBala = compDtls.data.getSMLoansCovered.lonBala
              
              const amountrepaids = compDtls.data.getSMLoansCovered.amountrepaid              
              const amountExpectedBackWthClrncs = compDtls.data.getSMLoansCovered.amountExpectedBackWthClrnc
              const interest = compDtls.data.getSMLoansCovered.interest              
              const dfltUpdate = compDtls.data.getSMLoansCovered.dfltUpdate
              const crtnDate = compDtls.data.getSMLoansCovered.crtnDate
              const statusssss = compDtls.data.getSMLoansCovered.status
              const dfltDeadLn = compDtls.data.getSMLoansCovered.repaymentPeriod
              const DefaultPenaltySMs = compDtls.data.getSMLoansCovered.DefaultPenaltySM
              const ClrnceCosts = parseFloat(userClearanceFees) * parseFloat(amountexpecteds)
              
              const LonBal = parseFloat(lonBala);
              const createdAt = compDtls.data.getSMLoansCovered.createdAt;
              const repaymentPeriod = compDtls.data.getSMLoansCovered.repaymentPeriod;
              const today = new Date();
              let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
              let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
              let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
              let years = (today.getFullYear() < 10 ? '0' : '') + today.getFullYear();
              let months = (today.getMonth() < 10 ? '0' : '') + today.getMonth();
              let months2 = parseFloat(months)
              let days = (today.getDate() < 10 ? '0' : '') + today.getDate();
              
              const now:any = years+ "-"+ "0"+months2 +"-"+ days+"T"+hours + ':' + minutes + ':' + seconds;

              const now1:any = "2024-05-20";
             
              
              
              
              

        
              const curYrs = parseFloat(years)*365;
              const curMnths = (months2)*30.4375;
              const daysUpToDate = curYrs + curMnths + parseFloat(days)

              

              let charz = createdAt;
              let char1z = charz.charAt(0)
              let char2z = charz.charAt(1)
              let char3z = charz.charAt(2)
              let char4z = charz.charAt(3)
              let char5z = charz.charAt(4)
              let char6z = charz.charAt(5)
              let char7z = charz.charAt(6)
              let char8z = charz.charAt(7)
              let char9z = charz.charAt(8)
              let char10z = charz.charAt(9)
              let char11z = charz.charAt(10)
              let char12z = charz.charAt(11)
              let char13z = charz.charAt(12)

              
              let crtnYrz = char1z+char2z+char3z+char4z;
              let crtnMnthz = char6z+char7z;
              let crtnDyz = char9z+char10z;
              let crtnHrz = char12z+char13z;
              const crtnYearsz = parseFloat(crtnYrz)*365;
              const crtnMnthsz = parseFloat(crtnMnthz)*30.4375;
              const daysAtCrtnz = crtnYearsz + crtnMnthsz + parseFloat(crtnDyz)

              const tmDif = daysUpToDate -  dfltUpdate
              const tmDif2 = daysUpToDate - crtnDate;
              
              const lglGrcePrd = 60 - tmDif;
              const paymentFrequency = compDtls.data.getSMLoansCovered.paymentFrequency;              
              const installmentAmount = compDtls.data.getSMLoansCovered.installmentAmount;
              const clearanceAmts = parseFloat(userClearanceFees) * parseFloat(amountexpecteds);
              const MmbrClrnceCosts = parseFloat(userClearanceFees) * parseFloat(amountexpecteds) + parseFloat(DefaultPenaltySMs);
              const MmbrClrnceCost = parseFloat(userClearanceFees) * parseFloat(amountexpecteds)

              const netLnBal = amountexpecteds - amountrepaids
      
              const LonBal1a = (amountexpecteds)*
              ((Math.pow(1 + parseFloat(interest)/36500, tmDif2)))
              
              const LonBal1 = (netLnBal)*
              ((Math.pow(1 + parseFloat(interest)/36500, tmDif2)))

              const LonBal4 = LonBal1 + MmbrClrnceCosts
              const LonBal5 = LonBal1 + DefaultPenaltySMs
           
              const pymtFrqncy = tmDif2/parseFloat(paymentFrequency)
              const Amt2HvBnPaid = pymtFrqncy* parseFloat(installmentAmount)
              const LonBal6 = parseFloat(lonBala) + parseFloat(DefaultPenaltySMs)
              
              
              const gtLoanerDtls = async () =>{
                if(isLoading){
                  return;
                }
                setIsLoading(true);
                try{
                  const compDtls2 :any= await API.graphql(
                    graphqlOperation(getSMAccount,{awsemail:loanerPhns})
                    );
                    const owners = compDtls2.data.getSMAccount.owner
                    const acStatuss = compDtls2.data.getSMAccount.acStatus
                    const TtlBLLonsTmsLnrCovs = compDtls2.data.getSMAccount.TtlBLLonsTmsLnrCov
                    const TtlBLLonsAmtLnrCovs = compDtls2.data.getSMAccount.TtlBLLonsAmtLnrCov
                    const names = compDtls2.data.getSMAccount.name
                    const MaxTymsIHvBLs = compDtls2.data.getSMAccount.MaxTymsIHvBL
                    const pws = compDtls2.data.getSMAccount.pw
                    const TtlActvLonsAmtLnrCovs = compDtls2.data.getSMAccount.TtlActvLonsAmtLnrCov
                    
                    
                    const gtLoaneeDtls = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                        const compDtls3 :any= await API.graphql(
                          graphqlOperation(getSMAccount,{awsemail:loaneePhns})
                          );
                          const TtlBLLonsTmsLneeCovs = compDtls3.data.getSMAccount.TtlBLLonsTmsLneeCov
                          const TtlBLLonsAmtLneeCovs = compDtls3.data.getSMAccount.TtlBLLonsAmtLneeCov
                          const TtlActvLonsAmtLneeCovs = compDtls3.data.getSMAccount.TtlActvLonsAmtLneeCov
                          const acStatusss = compDtls3.data.getSMAccount.acStatus
                          const namess = compDtls3.data.getSMAccount.name
                          const MaxTymsBLs =compDtls3.data.getSMAccount.MaxTymsBL;
                          const phonecontact =compDtls3.data.getSMAccount.phonecontact;
                          
                          const updateLoanDtls3 = async () => {
                            if(isLoading){
                              return;
                            }
                            setIsLoading(true);
                            try{
                                await API.graphql(
                                  graphqlOperation(updateSMLoansCovered, {
                                    input:{
                                      loanID:route.params.loanID,
                                      amountExpectedBackWthClrnc:(LonBal5).toFixed(0),
                                      lonBala:LonBal5.toFixed(0),
                                      DefaultPenaltySM2:DefaultPenaltySMs.toFixed(0),
                                      dfltUpdate: daysUpToDate,
                                      blOfficer:userInfo.attributes.email
                                    }
                                  })
                                )
                        
                                
                            }
                            catch(error){
                              console.log(error)
                              if(error){
                              Alert.alert("Retry or update app or call customer care")
                              return;
                          } 
                           }
                          Alert.alert(names +", you have penalised  "+ namess);
                          Communications.textWithoutEncoding(phonecontact,'MiFedha. Hi '
                          + namess + ', your loan of ID ' 
                          +  route.params.loanID 
                          + ' has been penalised by '+ names 
                          + '. The following is a breakdown of your repayable loan. Loan balance before blacklisting was Ksh. '
                        + LonBal.toFixed(0) + '. Default Penalty as you had agreed with your loaner is Ksh. ' + parseFloat(DefaultPenaltySMs).toFixed(0) 
                        + '. Total current loan repayable: Ksh. '+ LonBal6.toFixed(0)
                         +'. For clarification call the Business Owner: '
                        + userInfo.attributes.phone_number + '. Thank you. MiFedha');
                            setIsLoading(false);          
                          } 


                          const updateLoanerDtls = async () => {
                            if(isLoading){
                              return;
                            }
                            setIsLoading(true);
                            try{
                                await API.graphql(
                                  graphqlOperation(updateSMAccount,{
                                    input:{
                                      awsemail:loanerPhns,
                                      TtlBLLonsTmsLnrCov: parseFloat(TtlBLLonsTmsLnrCovs) + 1,
                                      MaxTymsIHvBL: parseFloat(MaxTymsIHvBLs) + 1,
                                      TtlBLLonsAmtLnrCov: (parseFloat(TtlBLLonsAmtLnrCovs) + LonBal4).toFixed(0),
                                      TtlActvLonsAmtLnrCov: (parseFloat(TtlActvLonsAmtLnrCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(0),
                                    }
                                  })
                                )
                        
                                
                            }
                            catch(error){if (error){
                              Alert.alert("Blacklisting unsuccessful; Retry")
                              return
                            }
                      }

                            setIsLoading(false);          
                            await updtActAdm ();
                          } 
                          
                          

                           
                          
                  
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
                                          ttlSMLnsInBlAmtCov: (parseFloat(ttlSMLnsInBlAmtCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(2),
                                          ttlSMLnsInBlTymsCov: parseFloat(ttlSMLnsInBlTymsCovs) + 1,
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
                              
                              const updateLoaneeDtls = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMAccount,{
                                        input:{
                                          awsemail:loaneePhns,
                                          TtlBLLonsTmsLneeCov: parseFloat(TtlBLLonsTmsLneeCovs) + 1,
                                          MaxTymsBL: parseFloat(MaxTymsBLs) + 1,
                                          TtlBLLonsAmtLneeCov: (parseFloat(TtlBLLonsAmtLneeCovs) + LonBal4).toFixed(0),
                                          TtlActvLonsAmtLneeCov: (parseFloat(TtlActvLonsAmtLneeCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(0),
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
                                      graphqlOperation(updateSMLoansCovered, {
                                        input:{
                                          loanID:route.params.loanID,
                                          amountExpectedBackWthClrnc:(LonBal4).toFixed(0),
                                          lonBala:LonBal4.toFixed(0),
                                          DefaultPenaltySM2:DefaultPenaltySMs.toFixed(0),
                                          status:"LoanBL",
                                          clearanceAmt:(clearanceAmts).toFixed(0),
                                          dfltUpdate:daysUpToDate,
                                          blOfficer:userInfo.attributes.email
                                        }
                                      })
                                    )
                            
                                    
                                }
                                catch(error){
                                  console.log(error)
                                  if(error){
                                  Alert.alert("Retry or update app or call customer care")
                                  return;
                              } 
                               }
                              Alert.alert(names +", you have blacklisted "+ namess);
                              Communications.textWithoutEncoding(phonecontact,'MiFedha. Hi '
                              + namess + ', your loan of ID ' 
                              + route.params.loanID
                              + ' has been blacklisted by '+ names 
                              + '. The following is a breakdown of your repayable loan. Loan balance before blacklisting was Ksh. '
                            + LonBal.toFixed(0) + '. Default Penalty as you had agreed with your loaner is Ksh. ' + parseFloat(DefaultPenaltySMs).toFixed(0) 
                            + '. Clearance fee is Ksh. ' + MmbrClrnceCost.toFixed(0) + '. compounded loan balance is Ksh. ' 
                            + LonBal1.toFixed(0) + '. Total current loan repayable: Ksh. '+ LonBal4.toFixed(0)
                             +'. For clarification call the Loaner: '
                            + userInfo.attributes.phone_number + '. Thank you. MiFedha');
                                setIsLoading(false);          
                              } 
                              

                              const updateLoanerDtls2 = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMAccount,{
                                        input:{
                                          awsemail:loanerPhns,
                                          TtlBLLonsTmsLnrCov: parseFloat(TtlBLLonsTmsLnrCovs) + 1,
                                          MaxTymsIHvBL: parseFloat(MaxTymsIHvBLs) + 1,
                                          TtlBLLonsAmtLnrCov: (parseFloat(TtlBLLonsAmtLnrCovs) + LonBal5).toFixed(0),
                                          TtlActvLonsAmtLnrCov: (parseFloat(TtlActvLonsAmtLnrCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(0),
                                        }
                                      })
                                    )
                            
                                    
                                }
                                catch(error){if (error){
                                  Alert.alert("Blacklisting unsuccessful; Retry")
                                  return
                                }
                          }
    
                                setIsLoading(false);          
                                await updtActAdm2 ();
                              } 
                              
                              
    
                               if(acStatusss === "AccountInactive"){
                                Alert.alert("Loanee account has been deactivated")
                              } 
    
                             
                              else if (tmDif < parseFloat(paymentFrequency))
                              {Alert.alert("Time to Blacklist is not yet")}
                              else if (tmDif2 > parseFloat(paymentFrequency) 
                              && parseFloat(amountrepaids) < LonBal1a && tmDif2 < dfltDeadLn
                              && statusssss !== "LoanBL"){
                                updateLoanDtls3()
                              }
                               else if(tmDif2 > dfltDeadLn && statusssss !== "LoanBL"){
                                updateLoanerDtls();
                              } 
    
                              else if(tmDif > parseFloat(paymentFrequency) && statusssss === "LoanBL"){
                                updateLoanerDtls2();
                              } 

                              else {Alert.alert("Time to Blacklist/Penalise is not yet")}
                              
                              
                      
                              const updtActAdm2 = async()=>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                    try{
                                        await API.graphql(
                                          graphqlOperation(updateCompany,{
                                            input:{
                                              AdminId:"BaruchHabaB'ShemAdonai2",
                                              ttlSMLnsInBlAmtCov: (parseFloat(ttlSMLnsInBlAmtCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(2),
                                              ttlSMLnsInBlTymsCov: parseFloat(ttlSMLnsInBlTymsCovs) + 1,
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
                                  await updateLoaneeDtls2();
                                  setIsLoading(false);
                                  }
                                  
                                  const updateLoaneeDtls2 = async () => {
                                    if(isLoading){
                                      return;
                                    }
                                    setIsLoading(true);
                                    try{
                                        await API.graphql(
                                          graphqlOperation(updateSMAccount,{
                                            input:{
                                              awsemail:loaneePhns,
                                              TtlBLLonsTmsLneeCov: parseFloat(TtlBLLonsTmsLneeCovs) + 1,
                                            
                                              TtlBLLonsAmtLneeCov: (parseFloat(TtlBLLonsAmtLneeCovs) + LonBal5).toFixed(0),
                                              TtlActvLonsAmtLneeCov: (parseFloat(TtlActvLonsAmtLneeCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(0),
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
                                  await updateLoanDtls2();
                                    setIsLoading(false);          
                                  } 
    
                                  const updateLoanDtls2 = async () => {
                                    if(isLoading){
                                      return;
                                    }
                                    setIsLoading(true);
                                    try{
                                        await API.graphql(
                                          graphqlOperation(updateSMLoansCovered, {
                                            input:{
                                              loanID:route.params.loanID,
                                              amountExpectedBackWthClrnc:(LonBal5).toFixed(0),
                                              lonBala:LonBal5.toFixed(0),
                                              DefaultPenaltySM2:DefaultPenaltySMs.toFixed(0),
                                              status:"LoanBL",
                                              dfltUpdate:daysUpToDate,
                                              blOfficer:userInfo.attributes.email
                                            }
                                          })
                                        )
                                
                                        
                                    }
                                    catch(error){
                                      console.log(error)
                                      if(error){
                                      Alert.alert("Retry or update app or call customer care")
                                      return;
                                  } 
                                   }
                                  Alert.alert(names +", you have penalised after blacklisting "+ namess);
                                  Communications.textWithoutEncoding(phonecontact,'Hi '
                                  + namess + ', your loan of ID ' 
                                  +  route.params.loanID
                                  + ' has been penalised after being blacklisted by '+ names 
                                  + '. The following is a breakdown of your repayable loan. Loan balance before blacklisting was Ksh. '
                                + LonBal.toFixed(0) 
                                + '. Clearance fee is Ksh. ' + MmbrClrnceCost.toFixed(0) + '. compounded loan balance is Ksh. ' 
                                + LonBal1.toFixed(0) + '. Total current loan repayable: Ksh. '+ LonBal5.toFixed(0)
                                 +'. For clarification call the Business Owner: '
                                + userInfo.attributes.phone_number + '. Thank you. MiFedha');
                                    setIsLoading(false);          
                                  } 
                              
                                  
                        }
            
                        
                        catch(error){
                          console.log(error)
                          if(error){
                          Alert.alert("Retry or update app or call customer care")
                          
                      
                      return;} }
                        setIsLoading(false);         
                        
                      }
                      await gtLoaneeDtls(); 
                  }
      
                  catch(error){ console.log(error)}
                  setIsLoading(false);         
                  
                }
                await gtLoanerDtls(); 
            }

            catch(error){
              console.log(error)
              if(error){
              Alert.alert("Retry or update app or call customer care")
              return;              
          } 
           }
            setIsLoading(false);                     
          } 
          await gtLoanDtls();        
            
          } catch (error) {
            console.log(error)
            
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
        
        export default BLSMCovLoanee;