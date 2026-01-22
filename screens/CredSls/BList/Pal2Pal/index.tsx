import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';

import {graphqlOperation, API, Auth} from 'aws-amplify';

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
import { getBizna, getCompany, getCovCreditSeller, getSMAccount } from '../../../../src/graphql/queries';
import { updateCompany, updateCovCreditSeller, updateSMAccount } from '../../../../src/graphql/mutations';


  


const BLCovCredByr = (props) => {
  const navigation = useNavigation();

  const route = useRoute();
  const [ownr, setownr] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const [LonId, setLonId] = useState("")
  

    
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
        const ttlSellerLnsInBlAmtCovs = compDtls.data.getCompany.ttlSellerLnsInBlAmtCov
        const ttlSellerLnsInBlTymsCovs = compDtls.data.getCompany.ttlSellerLnsInBlTymsCov
        const userClearanceFees = compDtls.data.getCompany.userClearanceFee
        const ttlBLUsrss = compDtls.data.getCompany.ttlBLUsrs

        const gtLoanDtls = async () =>{
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try{
            const compDtls :any= await API.graphql(
              graphqlOperation(getCovCreditSeller,{loanID:route.params.loanID})
              );
              const buyerContacts = compDtls.data.getCovCreditSeller.buyerContact
              const sellerContacts = compDtls.data.getCovCreditSeller.sellerContact
              const amountexpecteds = compDtls.data.getCovCreditSeller.amountexpectedBack
              const amountrepaids = compDtls.data.getCovCreditSeller.amountRepaid
              const interest = compDtls.data.getCovCreditSeller.interest
              const dfltUpdate = compDtls.data.getCovCreditSeller.dfltUpdate
              const crtnDate = compDtls.data.getCovCreditSeller.crtnDate
              const lonBala = compDtls.data.getCovCreditSeller.lonBala
              const amountExpectedBackWthClrncs = compDtls.data.getCovCreditSeller.amountExpectedBackWthClrnc
              
              const statusssss = compDtls.data.getCovCreditSeller.status
              const DefaultPenaltyCredSls = compDtls.data.getCovCreditSeller.DefaultPenaltyCredSl
              const amountExpectedBackWthClrncss = parseFloat(userClearanceFees) * parseFloat(amountexpecteds) 
              + parseFloat(amountExpectedBackWthClrncs) + parseFloat(DefaultPenaltyCredSls)
              
              const dfltDeadLn = compDtls.data.getCovCreditSeller.repaymentPeriod
              const createdAt = compDtls.data.getCovCreditSeller.createdAt;
              const repaymentPeriod = compDtls.data.getCovCreditSeller.repaymentPeriod;
            
              
              
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
             
              /*
              
              
              let char = dfltUpdate;
              let char1 = char.charAt(0)
              let char2 = char.charAt(1)
              let char3 = char.charAt(2)
              let char4 = char.charAt(3)
              let char5 = char.charAt(4)
              let char6 = char.charAt(5)
              let char7 = char.charAt(6)
              let char8 = char.charAt(7)
              let char9 = char.charAt(8)
              let char10 = char.charAt(9)
              let char11 = char.charAt(10)
              let char12 = char.charAt(11)
              let char13 = char.charAt(12)

              
              let crtnYr = char1+char2+char3+char4;
              let crtnMnth = char6+char7;
              let crtnDy = char9+char10;
              let crtnHr = char12+char13;

        
              const curYrs = parseFloat(years)*365;
              const curMnths = (months2)*30.4375;
              const daysUpToDate = curYrs + curMnths + parseFloat(days)

              const crtnYears = parseFloat(crtnYr)*365;
              const crtnMnths = parseFloat(crtnMnth)*30.4375;
              const daysAtCrtn = crtnYears + crtnMnths + parseFloat(crtnDy)
*/

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

              const tmDif = daysUpToDate - dfltUpdate;
              const tmDif2 = daysUpToDate - crtnDate;
              
              const LonBal = parseFloat(lonBala)
              const paymentFrequency = compDtls.data.getCovCreditSeller.paymentFrequency;              
              const installmentAmount = compDtls.data.getCovCreditSeller.installmentAmount;

              const clearanceAmts = parseFloat(userClearanceFees) * parseFloat(amountexpecteds);
             
              const netLnBalz = amountexpecteds - amountrepaids

              const LonBal1a = (amountexpecteds) * 
              ((Math.pow(1 + parseFloat(interest)/36500, tmDif2)))
              
              const LonBal1 = (netLnBalz) * 
              ((Math.pow(1 + parseFloat(interest)/36500, tmDif2)))

              const ClrnceCosts = parseFloat(userClearanceFees) * parseFloat(amountexpecteds)  + parseFloat(DefaultPenaltyCredSls)
              const ClrnceCost = parseFloat(userClearanceFees) * parseFloat(amountexpecteds)
              const LonBal4 = LonBal1 + ClrnceCosts
              const LonBal5 = LonBal1 + DefaultPenaltyCredSls
             
              const pymtFrqncy = tmDif2/parseFloat(paymentFrequency)
              const Amt2HvBnPaid = pymtFrqncy* parseFloat(installmentAmount)
             
              
              
              const gtLoanerDtls = async () =>{
                if(isLoading){
                  return;
                }
                setIsLoading(true);
                try{
                  const compDtls :any= await API.graphql(
                    graphqlOperation(getSMAccount,{awsemail:sellerContacts})
                    );
                    
                    const names = compDtls.data.getSMAccount.name
                    
                    const gtLoaneeDtls = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                        const compDtls2 :any= await API.graphql(
                          graphqlOperation(getSMAccount,{awsemail:buyerContacts})
                          );
                          const TtlBLLonsTmsByrCovs = compDtls2.data.getSMAccount.TtlBLLonsTmsByrCov
                          const TtlBLLonsAmtByrCovs = compDtls2.data.getSMAccount.TtlBLLonsAmtByrCov
                          const TtlActvLonsAmtByrCovs = compDtls2.data.getSMAccount.TtlActvLonsAmtByrCov
                          const acStatusss = compDtls2.data.getSMAccount.acStatus
                          const namess = compDtls2.data.getSMAccount.name
                          const MaxTymsBLs =compDtls2.data.getSMAccount.MaxTymsBL;
                          const phonecontactz =compDtls2.data.getSMAccount.phonecontact;

                          
                  
                          const updateLoanDtls3 = async () => {
                            if(isLoading){
                              return;
                            }
                            setIsLoading(true);
                            try{
                                await API.graphql(
                                  graphqlOperation(updateCovCreditSeller, {
                                    input:{
                                      loanID:route.params.loanID,
                                      amountExpectedBackWthClrnc:(LonBal5).toFixed(0),
                                      
                                      DefaultPenaltyCredSl2:DefaultPenaltyCredSls.toFixed(0),
                                      lonBala:LonBal5.toFixed(0),
                                      dfltUpdate:daysUpToDate,
                                      blOfficer:userInfo.attributes.email
                                      
                                    }
                                  })
                                )
                        
                                
                            }
                            catch(error){
                              console.log(error)
                              if(error){
                              Alert.alert("Ensure User Exists");
                              return;
                          } 
                           }
                          Alert.alert(names +", you have Penalised "+ namess);
                          Communications.textWithoutEncoding(buyerContacts,'MiFedha. Hi '
                          + namess + ', your loan of ID ' 
                          +  route.params.loanID 
                          + ' has been Penalised by '+ names 
                          + ' Business. The following is a breakdown of your repayable loan. Loan balance before blacklisting was Ksh. '
                          + LonBal.toFixed(0) + '. Default Penalty as you had agreed with your loaner is Ksh. ' + parseFloat(DefaultPenaltyCredSls).toFixed(0) 
                          + '. Total current loan repayable: Ksh. '+ LonBal6.toFixed(0)
                         +'. For clarification call the Business Owner: '
                        + sellerContacts + '. Thank you. MiFedha');
                            setIsLoading(false);          
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
                                          ttlSellerLnsInBlTymsCov: parseFloat(ttlSellerLnsInBlTymsCovs) + 1,
                                          ttlSellerLnsInBlAmtCov: (parseFloat(ttlSellerLnsInBlAmtCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(2),
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
                                          awsemail:buyerContacts,
                                          MaxTymsBL: parseFloat(MaxTymsBLs) + 1,
                                          
                                          blStatus:"AccountBlackListed",
                                          loanStatus: "LoanActive"
                                        }
                                      })
                                    )
                            
                                    
                                }
                                catch(error){
                                  console.log(error)
                                  if(error){
                                  Alert.alert("Retry or update app or call customer care")
                                  
                             
                              return;} }
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
                                      graphqlOperation(updateCovCreditSeller, {
                                        input:{
                                          loanID:route.params.loanID,
                                          amountExpectedBackWthClrnc:(LonBal4).toFixed(0),
                                          status:"LoanBL",
                                          DefaultPenaltyCredSl2:DefaultPenaltyCredSls.toFixed(0),
                                          lonBala:LonBal4.toFixed(0),
                                          dfltUpdate:daysUpToDate,
                                          clearanceAmt: clearanceAmts,
                                          blOfficer:userInfo.attributes.email
                                        }
                                      })
                                    )
                            
                                    
                                }
                                catch(error){
                                  console.log(error)
                                  if(error){
                                  Alert.alert("Ensure User Exists");
                                  return;
                              } 
                               }
                              Alert.alert(names +", you have blacklisted "+ namess);
                              Communications.textWithoutEncoding(phonecontactz,'Hi '
                              + namess + ', your loan of ID ' 
                              +  route.params.loanID 
                              + ' has been blacklisted by '+ names 
                              + ' Business. The following is a breakdown of your repayable loan. Loan balance before blacklisting was Ksh. '
                            + LonBal.toFixed(0) + '. Default Penalty as you had agreed with your loaner is Ksh. ' + parseFloat(DefaultPenaltyCredSls).toFixed(0) 
                            + '. Clearance fee is Ksh. ' + ClrnceCost.toFixed(0) + '. compounded loan balance is Ksh. ' 
                            + LonBal1.toFixed(0) + '. Total current loan repayable: Ksh. '+ LonBal4.toFixed(0)
                             +'. For clarification call the Business Owner: '
                            + userInfo.attributes.phone_number + '. Thank you. MiFedha');
                                setIsLoading(false);          
                              } 
                              

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
                                              ttlSellerLnsInBlTymsCov: parseFloat(ttlSellerLnsInBlTymsCovs) + 1,
                                              ttlSellerLnsInBlAmtCov: (parseFloat(ttlSellerLnsInBlAmtCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(2),
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
    
                                  if(LonBal === 0){
                                    Alert.alert("Loanee has cleared this loan")
                                  }
        
                                  
        
        
                                  else if(acStatusss === "AccountInactive"){
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
                                    {updtActAdm();}
                                  } 
        
                                  else if(tmDif > parseFloat(paymentFrequency) && statusssss === "LoanBL"){
                                    {updtActAdm2();}
                                  } 
    
                                  else {Alert.alert("Time to Blacklist/Penalise is not yet")}
                                  
                                  const updateLoaneeDtls2 = async () => {
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
                                      console.log(error)
                                      if(error){
                                      Alert.alert("Retry or update app or call customer care")
                                      
                                 
                                  return;} }
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
                                          graphqlOperation(updateCovCreditSeller, {
                                            input:{
                                              loanID:route.params.loanID,
                                              amountExpectedBackWthClrnc:(LonBal5).toFixed(0),
                                              status:"LoanBL",
                                              DefaultPenaltyCredSl2:DefaultPenaltyCredSls.toFixed(0),
                                              lonBala:LonBal5.toFixed(0),
                                              dfltUpdate:daysUpToDate,
                                              blOfficer:userInfo.attributes.email
                                            }
                                          })
                                        )
                                
                                        
                                    }
                                    catch(error){
                                      console.log(error)
                                      if(error){
                                      Alert.alert("Ensure User Exists");
                                      return;
                                  } 
                                   }
                                  Alert.alert(names +", you have Penalised "+ namess +"'s blacklisted loan ");
                                  Communications.textWithoutEncoding(phonecontactz,'Hi '
                                  + namess + ', your loan of ID ' 
                                  +  route.params.loanID 
                                  + ' has been penalised after blacklisting by '+ names 
                                  + ' Business. The following is a breakdown of your repayable loan. Loan balance before blacklisting was Ksh. '
                                + LonBal.toFixed(0) 
                                + '. Clearance fee is Ksh. ' + ClrnceCost.toFixed(0) + '. compounded loan balance is Ksh. ' 
                                + LonBal1.toFixed(0) + '. Total current loan repayable: Ksh. '+ LonBal5.toFixed(0)
                                 +'. For clarification call the Business Owner: '
                                + userInfo.attributes.phone_number + '. Thank you. MiFedha');
                                    setIsLoading(false);          
                                  } 


                        }
            
                        
                        catch(error){
                          console.log(error)
                          if (error){
                            Alert.alert("Blacklisting unsuccessful1; Retry")
                            return
                          }}
                        setIsLoading(false);         
                        
                      }
                      await gtLoaneeDtls(); 
                  }
      
                  catch(error){ 
                    if (error){
                      console.log(error)
                      Alert.alert("Blacklisting unsuccessful2; Retry")
                      return
                    }
                  }
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
        
        export default BLCovCredByr;