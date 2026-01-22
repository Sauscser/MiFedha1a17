import React, {useEffect, useState} from 'react';

import {
  
  createSMLoansCovered,
  
  createSMLoansNonCovered,
  
  createNonLoans,
  
  updateCompany,
  
  updateSMAccount,
  updateSMLoansCovered,
  updateCvrdGroupLoans,
  updateGroup,
 
  updateNonCvrdGroupLoans,
  updateChamaMembers,
  
} from '../../../../../../src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  
  getChamaMembers,
  getCompany,
  getCvrdGroupLoans,
  getGroup,
  
  getNonCvrdGroupLoans,
  getSMAccount,
  getSMLoansCovered,
  
} from '../../../../../../src/graphql/queries';

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


const RepayNonCovChmLnsss = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  
  const [SnderPW, setSnderPW] = useState("");
  
  const [amounts, setAmount] = useState("");
  const[LnId, setLnId] = useState("")
  const [Desc, setDesc] = useState("");

  const[isLoading, setIsLoading] = useState(false);
  
  const route = useRoute();
  
  

  


    const ftchCvdSMLn = async () => {
      if(isLoading){
        return;
      }
      setIsLoading(true);
      const userInfo = await Auth.currentAuthenticatedUser();
     
      try {
          const RecAccountDtl:any = await API.graphql(
              graphqlOperation(getNonCvrdGroupLoans, {id: route.params.id}),
              );
              
              const amountExpectedBackWthClrncs =RecAccountDtl.data.getNonCvrdGroupLoans.amountExpectedBackWthClrnc; 
              const memberIds =RecAccountDtl.data.getNonCvrdGroupLoans.memberId;
              const DefaultPenaltyChm2s =RecAccountDtl.data.getNonCvrdGroupLoans.DefaultPenaltyChm2;
              const grpContactssss =RecAccountDtl.data.getNonCvrdGroupLoans.grpContact; 
              const loaneePhnssss =RecAccountDtl.data.getNonCvrdGroupLoans.loaneePhn;
              const statuss =RecAccountDtl.data.getNonCvrdGroupLoans.status;
              const lonBalas =RecAccountDtl.data.getNonCvrdGroupLoans.lonBala;
              const amountExpectedBacks =RecAccountDtl.data.getNonCvrdGroupLoans.amountExpectedBack;
              const amountRepaidss =RecAccountDtl.data.getNonCvrdGroupLoans.amountRepaid; 
              const LonBalsss = parseFloat(amountExpectedBackWthClrncs) - parseFloat(amountRepaidss); 
              const ClranceAmt = parseFloat(amountExpectedBackWthClrncs) - parseFloat(amountExpectedBacks); 

  const fetchSenderUsrDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(false);
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getSMAccount, {awsemail: loaneePhnssss}),
      );

      const SenderUsrBal =accountDtl.data.getSMAccount.balance;
      const usrPW =accountDtl.data.getSMAccount.pw;
      const usrAcActvStts =accountDtl.data.getSMAccount.acStatus;
      const TtlClrdLonsTmsLneeChmNonCovs =accountDtl.data.getSMAccount.TtlClrdLonsTmsLneeChmNonCov;
      const TtlActvLonsTmsLneeChmNonCovs =accountDtl.data.getSMAccount.TtlActvLonsTmsLneeChmNonCov;
      const TtlActvLonsAmtLneeChmNonCovs =accountDtl.data.getSMAccount.TtlActvLonsAmtLneeChmNonCov;
      const TtlClrdLonsAmtLneeChmNonCovs =accountDtl.data.getSMAccount.TtlClrdLonsAmtLneeChmNonCov;
      const TtlBLLonsTmsLneeChmNonCovs =accountDtl.data.getSMAccount.TtlBLLonsTmsLneeChmNonCov;
      const TtlBLLonsAmtLneeChmNonCovs =accountDtl.data.getSMAccount.TtlBLLonsAmtLneeChmNonCov;
      const names =accountDtl.data.getSMAccount.name;
      
      const nonLonLimits =accountDtl.data.getSMAccount.nonLonLimit;
      const MaxTymsBLss =accountDtl.data.getSMAccount.MaxTymsBL;
      
      const fetchCompDtls = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
          const CompDtls:any = await API.graphql(
            graphqlOperation(getCompany, {
              AdminId: "BaruchHabaB'ShemAdonai2",
            }),
          );
          
            
          const UsrTransferFee = CompDtls.data.getCompany.chmLnRpymntFee;
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact;  
          const ttlChmLnsInClrdTymsNonCovs = CompDtls.data.getCompany.ttlChmLnsInClrdTymsNonCov; 
          const ttlChmLnsInClrdAmtNonCovs = CompDtls.data.getCompany.ttlChmLnsInClrdAmtNonCov;
          const ttlChmLnsInBlTymsNonCovs = CompDtls.data.getCompany.ttlChmLnsInBlTymsNonCov; 
          const ttlChmLnsInBlAmtNonCovs = CompDtls.data.getCompany.ttlChmLnsInBlAmtNonCov;
          const ttlChmLnsInActvAmtNonCov = CompDtls.data.getCompany.ttlChmLnsInActvAmtNonCov;
          const ttlChmLnsInActvTymsNonCov = CompDtls.data.getCompany.ttlChmLnsInActvTymsNonCov;
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const maxBLss = CompDtls.data.getCompany.maxBLs;
          const totalLnsRecovereds = CompDtls.data.getCompany.totalLnsRecovered;
          const TotalTransacted = parseFloat(amounts)  + parseFloat(UsrTransferFee)*parseFloat(amounts) + ClranceAmt; 

         
                    
          const fetchRecUsrDtls = async () => {
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try {
                const RecAccountDtl:any = await API.graphql(
                    graphqlOperation(getGroup, {grpContact: grpContactssss}),
                    );
                    const RecUsrBal =RecAccountDtl.data.getGroup.grpBal;                    
                    const usrAcActvSttss =RecAccountDtl.data.getGroup.status; 
                   
                    const tymsChmHvBLs =RecAccountDtl.data.getGroup.tymsChmHvBL;                    
                    const TtlClrdLonsTmsLnrChmNonCovs =RecAccountDtl.data.getGroup.TtlClrdLonsTmsLnrChmNonCov;
                    const TtlClrdLonsAmtLnrChmNonCovs =RecAccountDtl.data.getGroup.TtlClrdLonsAmtLnrChmNonCov;
                    const TtlBLLonsTmsLnrChmNonCovs =RecAccountDtl.data.getGroup.TtlBLLonsTmsLnrChmNonCov;
                    const TtlBLLonsAmtLnrChmNonCovs =RecAccountDtl.data.getGroup.TtlBLLonsAmtLnrChmNonCov;
                    const namess =RecAccountDtl.data.getGroup.grpName;
                    const TtlActvLonsTmsLnrChmNonCovs =RecAccountDtl.data.getGroup.TtlActvLonsTmsLnrChmNonCov;
                    const TtlActvLonsAmtLnrChmNonCovs =RecAccountDtl.data.getGroup.TtlActvLonsAmtLnrChmNonCov;
                    
                    

                    
                              
                              const fetchMmbrDtls = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try {
                                    const RecAccountDtl:any = await API.graphql(
                                        graphqlOperation(getChamaMembers, {ChamaNMember: memberIds}),
                                        );
                                        
                                        const AmtRepaids =RecAccountDtl.data.getChamaMembers.AmtRepaid;
                                        const LnBals =RecAccountDtl.data.getChamaMembers.LnBal;
                                         
                                        const updtSendrAcLonOvr1 = async () =>{
                                          if(isLoading){
                                            return;
                                          }
                                          setIsLoading(true);
                                          try{
                                              await API.graphql(
                                                graphqlOperation(updateSMAccount, {
                                                  input:{
                                                    awsemail:userInfo.attributes.email,
                                                    
                                                    balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0) ,
                                                    TtlClrdLonsTmsLneeChmNonCov:parseFloat(TtlClrdLonsTmsLneeChmNonCovs)+1,                                          
                                                    TtlClrdLonsAmtLneeChmNonCov: (parseFloat(TtlClrdLonsAmtLneeChmNonCovs) + parseFloat(amounts)).toFixed(0), 
                                                    
                                                    MaxTymsBL: 0,
                                                    
                                                                                       
                                                    
                                                  }
                                                })
                                              )
                    
                    
                                          }
                                          catch(error){
                                            if (error){
                                              Alert.alert("Repayment unsuccessful; Retry")
                                              return
                                            }
                                          }
                                          setIsLoading(false);
                                          await updtChmMbrTTlBlOvr();
                                        }

                                        const updtSendrAcLonOvr2 = async () =>{
                                          if(isLoading){
                                            return;
                                          }
                                          setIsLoading(true);
                                          try{
                                              await API.graphql(
                                                graphqlOperation(updateSMAccount, {
                                                  input:{
                                                    awsemail:userInfo.attributes.email,
                                                    
                                                    balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0) ,
                                                    TtlClrdLonsTmsLneeChmNonCov:parseFloat(TtlClrdLonsTmsLneeChmNonCovs)+1,                                          
                                                    TtlClrdLonsAmtLneeChmNonCov: (parseFloat(TtlClrdLonsAmtLneeChmNonCovs) + parseFloat(amounts)).toFixed(0), 
                                                    TtlBLLonsTmsLneeChmNonCov: parseFloat(TtlBLLonsTmsLneeChmNonCovs) - 1,
                                                    TtlBLLonsAmtLneeChmNonCov: (parseFloat(TtlBLLonsAmtLneeChmNonCovs) - parseFloat(amounts)).toFixed(0),
                                                    MaxTymsBL: parseFloat(MaxTymsBLss) - 1,
                                                    
                                                                                       
                                                    
                                                  }
                                                })
                                              )
                    
                    
                                          }
                                          catch(error){
                                            if (error){
                                              Alert.alert("Repayment unsuccessful; Retry")
                                              return
                                            }
                                          }
                                          setIsLoading(false);
                                          await updtChmMbrTTlBlOvr();
                                        }

                                        const updtChmMbrTTlBlOvr  = async () =>{
                                          if(isLoading){
                                            return;
                                          }
                                          setIsLoading(true);
                                          try{
                                              await API.graphql(
                                                graphqlOperation(updateChamaMembers, {
                                                  input:{
                                                    ChamaNMember:memberIds,
                                                    AmtRepaid: (parseFloat(AmtRepaids)+parseFloat(amounts)).toFixed(0) ,
                                                    LnBal: (parseFloat(LnBals)-parseFloat(amounts)).toFixed(0) ,
                                                    
                                                }})
                                              )
                    
                    
                                          }
                                          catch(error){
                                            console.log(error)
                                            if (error){Alert.alert("Retry or update app or call customer care")
                                            return;}
                                          }
                                          setIsLoading(false);
                                          await updtSMCvLnLnOver();
                                        }

                              const updtSMCvLnLnOver  = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateNonCvrdGroupLoans, {
                                        input:{
                                          id:route.params.id,
                                          amountRepaid: (parseFloat(amounts) + parseFloat(amountRepaidss)).toFixed(0),
                                          lonBala: (parseFloat(lonBalas)-parseFloat(amounts)).toFixed(0),
                                          amountExpectedBackWthClrnc:(parseFloat(amountExpectedBackWthClrncs) - ClranceAmt).toFixed(0),
                                          DefaultPenaltyChm2:0,
                                          status: "LoanCleared",
                                      }})
                                    )
          
          
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Retry or update app or call customer care")
                                  return;}
                                }
                                setIsLoading(false);
                                await sendNonLnLnOver();
                              }
                              
                              const sendNonLnLnOver = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true)
                                try {
                                  await API.graphql(
                                    graphqlOperation(createNonLoans, {
                                      input: {
                                        senderPhn: loaneePhnssss,
                                        recPhn: grpContactssss,  
                                        RecName:namess,
                                        SenderName:names,                                
                                        amount: parseFloat(amounts).toFixed(0),                              
                                        description: Desc,
                                        status: "ChmLonRepayment",
                                        owner: userInfo.attributes.sub
                                      },
                                    }),
                                  );
          
          
                                } catch (error) {
                                  if (error){
                                    Alert.alert("Repayment unsuccessful; Retry")
                                    return
                                  }
                                }
                                setIsLoading(false);
                                await updtRecAcLonOver();
                              };
                              
                              
          
                              const updtRecAcLonOver = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateGroup, {
                                        input:{
                                          grpContact:grpContactssss,
                                          
                                          grpBal:(parseFloat(RecUsrBal) + (parseFloat(amounts) + parseFloat(DefaultPenaltyChm2s))).toFixed(0),                                     
                                         
                                          TtlClrdLonsTmsLnrChmNonCov: parseFloat(TtlClrdLonsTmsLnrChmNonCovs) + 1,
                                          tymsChmHvBL: parseFloat(tymsChmHvBLs) - 1,
                                          TtlClrdLonsAmtLnrChmNonCov: (parseFloat(TtlClrdLonsAmtLnrChmNonCovs) + parseFloat(amounts)).toFixed(0),
                                         
                                        }
                                      })
                                    )                              
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Retry or update app or call customer care")
                                  return;}
                                }
                                setIsLoading(false);
                                await updtCompLnOvr();
                              }
          
                              const updtCompLnOvr = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateCompany, {
                                        input:{
                                          AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                                         
                                          companyEarningBal:UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarningBals) + ClranceAmt - parseFloat(DefaultPenaltyChm2s),
                                          companyEarning: UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarnings) + ClranceAmt - parseFloat(DefaultPenaltyChm2s),                                                    
                                          totalLnsRecovered: parseFloat(totalLnsRecovereds) + parseFloat(amounts) ,
                                          
                                          ttlChmLnsInClrdAmtNonCov: parseFloat(ttlChmLnsInClrdAmtNonCovs) + parseFloat(amounts) ,
                                          ttlChmLnsInClrdTymsNonCov: parseFloat(ttlChmLnsInClrdTymsNonCovs) + 1 ,
                                          
                                        }
                                      })
                                    )
                                    
                                    
                                }
                                catch(error){
                                  if (error){
                                    Alert.alert("Repayment unsuccessful; Retry")
                                    return
                                  }
                                  
                                }
                                Alert.alert("Cleared. Clearance charge: " +ClranceAmt.toFixed(2) + ". Transaction: "+ (parseFloat(UsrTransferFee)*parseFloat(amounts)).toFixed(2));
                                setIsLoading(false);
                              }    
                              
                              const updtChmMbrTTlBl  = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateChamaMembers, {
                                        input:{
                                          ChamaNMember:memberIds,
                                          AmtRepaid: (parseFloat(AmtRepaids)+parseFloat(amounts)).toFixed(0) ,
                                          LnBal: (parseFloat(LnBals)-parseFloat(amounts)).toFixed(0) ,
                                      }})
                                    )
          
          
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Retry or update app or call customer care")
                                  return;}
                                }
                                setIsLoading(false);
                                await repyCovLn();
                              }
                        

                              const repyCovLn = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateNonCvrdGroupLoans, {
                                        input:{
                                          id:route.params.id,
                                          DefaultPenaltyChm2:0,
                                          amountRepaid: (parseFloat(amounts) + parseFloat(amountRepaidss)).toFixed(0),
                                          lonBala: (parseFloat(lonBalas)-parseFloat(amounts)).toFixed(0),
                                          amountExpectedBackWthClrnc:(parseFloat(amountExpectedBackWthClrncs) - ClranceAmt).toFixed(0),
                                        }
                                      })
                                    )
          
          
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Retry or update app or call customer care")
                                  return;}
                                }
                                setIsLoading(false);
                                await updtSendrAc();
                              }
                              
                              
                              const updtSendrAc = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMAccount, {
                                        input:{
                                          awsemail:userInfo.attributes.email,
                                          TtlClrdLonsAmtLneeChmNonCov: (parseFloat(TtlClrdLonsAmtLneeChmNonCovs) + parseFloat(amounts)).toFixed(0), 
                                          balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0),
                                          
                                        }
                                      })
                                    )
          
          
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Retry or update app or call customer care")
                                  return;}
                                }
                                setIsLoading(false);
                                await updtRecAc();
                              }
          
                              const updtRecAc = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateGroup, {
                                        input:{
                                          grpContact:grpContactssss,
                                          TtlClrdLonsAmtLnrChmNonCov: (parseFloat(TtlClrdLonsAmtLnrChmNonCovs) + parseFloat(amounts)).toFixed(0),
                                          grpBal:(parseFloat(RecUsrBal) + (parseFloat(amounts) + parseFloat(DefaultPenaltyChm2s))).toFixed(0),                                     
                                          
                                          
                                        }
                                      })
                                    )                              
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Retry or update app or call customer care")
                                  return;}
                                }
                                setIsLoading(false);
                                await updtComp();
                              }
          
                              const updtComp = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateCompany, {
                                        input:{
                                          AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                                          ttlChmLnsInClrdAmtNonCov: parseFloat(ttlChmLnsInClrdAmtNonCovs) + parseFloat(amounts),
                                          companyEarningBal:parseFloat(UsrTransferFee) * parseFloat(amounts) + parseFloat(companyEarningBals) + ClranceAmt - parseFloat(DefaultPenaltyChm2s),
                                          companyEarning: parseFloat(UsrTransferFee) * parseFloat(amounts) + parseFloat(companyEarnings) + ClranceAmt - parseFloat(DefaultPenaltyChm2s),                                                    
                                          totalLnsRecovered: parseFloat(totalLnsRecovereds) + parseFloat(amounts) ,
                                        }
                                      })
                                    )
                                    
                                    
                                }
                                catch(error){
                                  
                                }
                                Alert.alert("Partially repaid. Clearance: " +ClranceAmt.toFixed(2) + ". TransactionFee: "+ (parseFloat(UsrTransferFee)*parseFloat(amounts)).toFixed(2));
                                setIsLoading(false);await sendCovLn();
                              }

                              const sendCovLn = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true)
                                try {
                                  await API.graphql(
                                    graphqlOperation(createNonLoans, {
                                      input: {
                                        recPhn: grpContactssss,
                                        senderPhn: userInfo.attributes.email,  
                                        RecName:namess,
                                        SenderName:names,                                  
                                        amount: parseFloat(amounts).toFixed(0),                              
                                        description: Desc,
                                        status: "ChmLonRepayment",
                                        owner: userInfo.attributes.sub
                                      },
                                    }),
                                  );
          
          
                                } catch (error) {
                                  if (error){
                                    Alert.alert("Repayment unsuccessful; Retry")
                                    return
                                  }
                                }
                                setIsLoading(false);
                                
                              };

                                                          
                                                    
                              
                              if(usrAcActvStts === "AccountInactive"){Alert.alert('Sender account is inactive');
                              return;
                            }
                              else if(usrAcActvSttss === "AccountInactive"){Alert.alert('Receiver account is inactive');
                              return;
                            }
                            else if(ClranceAmt > parseFloat(amounts) ){Alert.alert( "Too little repayment: at least "+ClranceAmt);
                            return;
                          }

                              else if (
                                parseFloat(SenderUsrBal) < TotalTransacted 
                              ) {Alert.alert('Requested amount is more than you have in your account');
                            return;
                          }
                          
                              else if(usrPW !==SnderPW){Alert.alert('Wrong password');
                            return;
                          }
                              
                              
                              else if(parseFloat(nonLonLimits) < parseFloat(amounts)){Alert.alert('Call ' + CompPhoneContact + ' to have your send Amount limit adjusted');
                            return;
                          }

                          else if(parseFloat(amounts) > lonBalas){Alert.alert("Your Loan Balance is lesser: Ksh. "+lonBalas )}
                          

                          else if(parseFloat(amounts) === parseFloat(lonBalas)  && parseFloat(MaxTymsBLss) === parseFloat(maxBLss) )
                          {updtSendrAcLonOvr1();}          
                          
                          else if(parseFloat(amounts) === parseFloat(lonBalas)  && parseFloat(MaxTymsBLss) > parseFloat(maxBLss) )
                          {updtSendrAcLonOvr2();} 
                              
                               else {
                                updtChmMbrTTlBl();
                              }

                            }
                            catch (e) {
                              console.log(e)
                              if (e){Alert.alert("Retry or update app or call customer care")
                              return;}
                          };
                        }
                      
                        await fetchMmbrDtls();
                          }
                          catch (e) {
                            if (e){Alert.alert("Retry or update app or call customer care")
                            return;}
                        };
                      }
                    
                      await fetchRecUsrDtls();
                                                                                         
                }       
                catch(e) {     
                  if (e){Alert.alert("Retry or update app or call customer care")
  return;}                 
                }
                setIsLoading(false);
                }                    
                  await fetchCompDtls();
        } catch (e) {
          console.log(e)
          if (e){Alert.alert("Retry or update app or call customer care")
      return;}
        }
        setIsLoading(false);        
      };
      await fetchSenderUsrDtls();
    
      
    } catch (e) {
      console.log(e)
      if (e){Alert.alert("Retry or update app or call customer care")
      return;}
  };
      setIsLoading(false);
      
      setAmount("");
     
      setLnId("");
      setDesc("");
      setSnderPW("");
      
      
}


useEffect(() =>{
  const SnderNatIds=SenderNatId
    if(!SnderNatIds && SnderNatIds!=="")
    {
      setSenderNatId("");
      return;
    }
    setSenderNatId(SnderNatIds);
    }, [SenderNatId]
     );

     useEffect(() =>{
      const amt=amounts
        if(!amt && amt!=="")
        {
          setAmount("");
          return;
        }
        setAmount(amt);
        }, [amounts]
         );

         

             
             

                     useEffect(() =>{
                      const descr=Desc
                        if(!descr && descr!=="")
                        {
                          setDesc("");
                          return;
                        }
                        setDesc(descr);
                        }, [Desc]
                         );

                         useEffect(() =>{
                          const SnderPWss=SnderPW
                            if(!SnderPWss && SnderPWss!=="")
                            {
                              setSnderPW("");
                              return;
                            }
                            setSnderPW(SnderPWss);
                            }, [SnderPW]
                             );

                             useEffect(() =>{
                              const LnIds=LnId
                                if(!LnIds && LnIds!=="")
                                {
                                  setLnId("");
                                  return;
                                }
                                setLnId(LnIds);
                                }, [LnId]
                                 );
    

                             

                                 

  return (
    <View>
      <View
        
        style={styles.image}>
        <ScrollView>
         
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>

        
          <View style={styles.sendAmtView}>
            <TextInput
            keyboardType={"decimal-pad"}
              value={amounts}
              onChangeText={setAmount}
              style={styles.sendAmtInput}
              editable={true}
              ></TextInput>
              
            <Text style={styles.sendAmtText}>Amount Sent</Text>
          </View>


          <View style={styles.sendAmtView}>
            <TextInput
              value={SnderPW}
              onChangeText={setSnderPW}
              secureTextEntry = {true}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Loanee PassWord</Text>
          </View>

          
          <View style={styles.sendAmtViewDesc}>
            <TextInput
              multiline={true}
              value={Desc}
              onChangeText={setDesc}
              style={styles.sendAmtInputDesc}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Description</Text>
          </View>
          
          

          <TouchableOpacity
            onPress={ftchCvdSMLn}
            style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Send</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    </View>
  );
};

export default RepayNonCovChmLnsss;