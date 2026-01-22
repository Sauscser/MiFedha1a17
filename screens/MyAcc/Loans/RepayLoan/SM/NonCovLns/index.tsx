import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  
  createSMLoansCovered,
  
  createSMLoansNonCovered,
  
  createNonLoans,
  
  updateCompany,
  
  updateSMAccount,
  updateSMLoansCovered,
  updateSMLoansNonCovered,
  
} from '../../../../../../src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  
  getCompany,
  getSMAccount,
  getSMLoansCovered,
  getSMLoansNonCovered,
  
} from '../../../../../../src/graphql/queries';

import {useNavigation, useRoute } from '@react-navigation/native';

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


const RepayNonCovLnsss = props => {
  
  
  const [SnderPW, setSnderPW] = useState("");
  
  const [amounts, setAmount] = useState("");

  const [Desc, setDesc] = useState("");
  
  const[isLoading, setIsLoading] = useState(false);
 
  const route = useRoute();
  
  

  


  const fetchSenderUsrDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(false);
    const userInfo = await Auth.currentAuthenticatedUser();
   
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}),
      );

      const SenderUsrBal =accountDtl.data.getSMAccount.balance;
      const usrPW =accountDtl.data.getSMAccount.pw;
      const MaxTymsBLs =accountDtl.data.getSMAccount.MaxTymsBL;
      
      const usrAcActvStts =accountDtl.data.getSMAccount.acStatus;
      const owner =accountDtl.data.getSMAccount.owner;
      const TtlActvLonsAmtLneeCovs =accountDtl.data.getSMAccount.TtlActvLonsAmtLneeNonCov;
      const TtlClrdLonsTmsLneeCovs =accountDtl.data.getSMAccount.TtlClrdLonsTmsLneeNonCov;
      const TtlClrdLonsAmtLneeCovs =accountDtl.data.getSMAccount.TtlClrdLonsAmtLneeNonCov;
      const TtlBLLonsTmsLneeNonCovs =accountDtl.data.getSMAccount.TtlBLLonsTmsLneeNonCov;
      const TtlBLLonsAmtLneeNonCovs =accountDtl.data.getSMAccount.TtlBLLonsAmtLneeNonCov;
      const names =accountDtl.data.getSMAccount.name;
      const ttlNonLonsSentSMs =accountDtl.data.getSMAccount.ttlNonLonsSentSM;
      const nonLonLimits =accountDtl.data.getSMAccount.nonLonLimit;
        
        
        
      const ftchCvdSMLn = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
            const RecAccountDtl:any = await API.graphql(
                graphqlOperation(getSMLoansNonCovered, {id: route.params.id}),
                );

                const DefaultPenaltySM2s =RecAccountDtl.data.getSMLoansNonCovered.DefaultPenaltySM2;
                
                const statusssss =RecAccountDtl.data.getSMLoansNonCovered.status; 
                const amountExpectedBackWthClrncs =RecAccountDtl.data.getSMLoansNonCovered.amountExpectedBackWthClrnc; 
                const loanerPhns =RecAccountDtl.data.getSMLoansNonCovered.loanerPhn; 
                const amountrepaids =RecAccountDtl.data.getSMLoansNonCovered.amountrepaid; 
                const LonBal = RecAccountDtl.data.getSMLoansNonCovered.lonBala; 
                const amountExpectedBacks =RecAccountDtl.data.getSMLoansNonCovered.amountexpected;
                const ClranceAmt = parseFloat(amountExpectedBackWthClrncs) - parseFloat(amountExpectedBacks); 
                const LonBalsss = parseFloat(amountExpectedBackWthClrncs) - parseFloat(amountrepaids);     
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
          
            
          const UsrTransferFee = CompDtls.data.getCompany.userTransferFee;
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact;  
          const ttlSMLnsInClrdAmtCovs = CompDtls.data.getCompany.ttlSMLnsInClrdAmtNonCov; 
          const ttlSMLnsInClrdTymsCovs = CompDtls.data.getCompany.ttlSMLnsInClrdTymsNonCov;
          const totalLnsRecovereds = CompDtls.data.getCompany.totalLnsRecovered;
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
          const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM; 
          const TotalTransacted = parseFloat(amounts)  + parseFloat(UsrTransferFee)*parseFloat(amounts) + ClranceAmt; 
          const maxBLss = CompDtls.data.getCompany.maxBLs;
         
                    
          const fetchRecUsrDtls = async () => {
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try {
                const RecAccountDtl:any = await API.graphql(
                    graphqlOperation(getSMAccount, {awsemail: loanerPhns}),
                    );
                    const RecUsrBal =RecAccountDtl.data.getSMAccount.balance;                    
                    const usrAcActvSttss =RecAccountDtl.data.getSMAccount.acStatus; 
                    const ttlNonLonsRecSMs =RecAccountDtl.data.getSMAccount.ttlNonLonsRecSM;
                    const TtlActvLonsTmsLnrCovssss =RecAccountDtl.data.getSMAccount.TtlActvLonsTmsLnrNonCov;
                    const TtlActvLonsAmtLnrCovssss =RecAccountDtl.data.getSMAccount.TtlActvLonsAmtLnrNonCov;
                    const TtlClrdLonsTmsLneeCovssss =RecAccountDtl.data.getSMAccount.TtlClrdLonsTmsLnrNonCov;
                    const TtlClrdLonsAmtLneeCovssss =RecAccountDtl.data.getSMAccount.TtlClrdLonsAmtLnrNonCov;
                    const ttlDpstSMs =RecAccountDtl.data.getSMAccount.ttlDpstSM;
                    const TtlWthdrwnSMs =RecAccountDtl.data.getSMAccount.TtlWthdrwnSM;
                    const namess =RecAccountDtl.data.getSMAccount.name;
                    const TymsMyLnClrds =RecAccountDtl.data.getSMAccount.TymsMyLnClrd;
                    const MaxTymsIHvBLs =RecAccountDtl.data.getSMAccount.MaxTymsIHvBL;
                    const phonecontactz =RecAccountDtl.data.getSMAccount.phonecontact;
                    
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
                                
                                balance: (parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0) ,
                                MaxTymsBL: 0 ,
                                
                                TtlClrdLonsTmsLneeNonCov: 1 + parseFloat(TtlClrdLonsTmsLneeCovs),
                                TtlClrdLonsAmtLneeNonCov: (parseFloat(TtlClrdLonsAmtLneeCovs) + parseFloat(amounts)).toFixed(0),
                                
                               
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
                      await updtSMCvLnLnOver();
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
                                
                                balance: (parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0) ,
                                MaxTymsBL: parseFloat(MaxTymsBLs) - 1 ,
                                TtlBLLonsTmsLneeNonCov: parseFloat(TtlBLLonsTmsLneeNonCovs) - 1,
                                TtlBLLonsAmtLneeNonCov: (parseFloat(TtlBLLonsAmtLneeNonCovs) - parseFloat(amounts)).toFixed(0),
                                TtlClrdLonsTmsLneeNonCov: 1 + parseFloat(TtlClrdLonsTmsLneeCovs),
                                TtlClrdLonsAmtLneeNonCov: (parseFloat(TtlClrdLonsAmtLneeCovs) + parseFloat(amounts)).toFixed(0),
                                
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
                      await updtSMCvLnLnOver();
                    }
                               
                              const updtSMCvLnLnOver  = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMLoansNonCovered, {
                                        input:{
                                          id:route.params.id,
                                          amountrepaid: (parseFloat(amounts) + parseFloat(amountrepaids)).toFixed(0),
                                          lonBala:(parseFloat(LonBal)-parseFloat(amounts)).toFixed(0),
                                          amountExpectedBackWthClrnc: (parseFloat(amountExpectedBackWthClrncs) - ClranceAmt).toFixed(0),
                                          status: "LoanCleared",
                                          DefaultPenaltySM2:0
                                      }})
                                    )
          
          
                                }
                                catch(error){
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
                                        senderPhn: userInfo.attributes.email,
                                        recPhn: loanerPhns,  
                                        RecName:namess,
                                        SenderName:names,                                  
                                        amount: parseFloat(amounts).toFixed(0),                              
                                        description: Desc,
                                        status: "SMLonRepayment",
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
                                      graphqlOperation(updateSMAccount, {
                                        input:{
                                          awsemail:loanerPhns,
                                          
                                          balance:(parseFloat(RecUsrBal) + (parseFloat(amounts) + parseFloat(DefaultPenaltySM2s))).toFixed(0),                                     
                                          TymsMyLnClrd: parseFloat(TymsMyLnClrds) + 1,
                                          TtlClrdLonsTmsLnrNonCov: parseFloat(TtlClrdLonsTmsLneeCovssss) + 1,
                                          TtlClrdLonsAmtLnrNonCov: (parseFloat(TtlClrdLonsAmtLneeCovssss) + parseFloat(amounts)).toFixed(0),
                                          
                                          MaxTymsIHvBL:parseFloat(MaxTymsIHvBLs)-1 ,                                  
                                          
                                        }
                                      })
                                    ) ;
                                 
                                }
                                catch(error){
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
                                         
                                          companyEarningBal:UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarningBals) + ClranceAmt - parseFloat(DefaultPenaltySM2s),
                                          companyEarning: UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarnings) + ClranceAmt - parseFloat(DefaultPenaltySM2s),                                                    
                                          
                                          totalLnsRecovered: parseFloat(totalLnsRecovereds) + parseFloat(amounts) ,
                                          ttlSMLnsInClrdAmtNonCov: parseFloat(ttlSMLnsInClrdAmtCovs) + parseFloat(amounts), 
                                          ttlSMLnsInClrdTymsNonCov: parseFloat(ttlSMLnsInClrdTymsCovs) + 1
                                          
                                          
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
                                Alert.alert("Cleared. Clearance charge: " +(ClranceAmt).toFixed(2) + ". Transaction: "+ (parseFloat(UsrTransferFee)*parseFloat(amounts)).toFixed(2));
                                Communications.textWithoutEncoding(phonecontactz,'Hi '
                              + namess + ', your loan of ID ' 
                              +  route.params.id 
                              + 'has been repaid Ksh. ' + amounts + ' by '+ names 
                              +'. For clarification call the loanee: '
                            + userInfo.attributes.phone_number + '. Thank you. MiFedha');
                            setIsLoading(false);
                              }                                                                                                            
                        

                              const repyCovLn = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMLoansNonCovered, {
                                        input:{
                                          id:route.params.id,
                                          amountrepaid: (parseFloat(amounts) + parseFloat(amountrepaids)).toFixed(0),
                                          lonBala: (parseFloat(LonBal) - parseFloat(amounts)).toFixed(0),
                                          DefaultPenaltySM2:0,
                                          amountExpectedBackWthClrnc:(parseFloat(amountExpectedBackWthClrncs) - ClranceAmt).toFixed(0),
                                        }
                                      })
                                    )
          
          
                                }
                                catch(error){
                                  if (error){Alert.alert("Retry or update app or call customer care")
                                  return;}
                                }
                                setIsLoading(false);
                                await sendCovLn();
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
                                        recPhn: loanerPhns,
                                        senderPhn: userInfo.attributes.email,  
                                        RecName:namess,
                                        SenderName:names,                                  
                                        amount: parseFloat(amounts).toFixed(0),                              
                                        description: Desc,
                                        status: "SMLonRepayment",
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
                                await updtSendrAc();
                              };
          
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
                                          
                                          balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0),
                                          TtlClrdLonsAmtLneeNonCov: (parseFloat(TtlClrdLonsAmtLneeCovs) + parseFloat(amounts)).toFixed(0),
                                
                                        }
                                      })
                                    )
          
          
                                }
                                catch(error){
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
                                      graphqlOperation(updateSMAccount, {
                                        input:{
                                          awsemail:loanerPhns,
                                          
                                          balance:(parseFloat(RecUsrBal) + (parseFloat(amounts) + DefaultPenaltySM2s)).toFixed(0),
                                          TtlClrdLonsAmtLnrNonCov: (parseFloat(TtlClrdLonsAmtLneeCovssss) + parseFloat(amounts)).toFixed(0),
                                          
                                                                                }
                                      })
                                    )                              
                                }
                                catch(error){
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
                                          ttlSMLnsInClrdAmtNonCov: parseFloat(ttlSMLnsInClrdAmtCovs) + parseFloat(amounts), 
                                          companyEarningBal:UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarningBals) + ClranceAmt - DefaultPenaltySM2s,
                                          companyEarning: UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarnings) + ClranceAmt - DefaultPenaltySM2s,                                                    
                                          
                                          totalLnsRecovered: parseFloat(totalLnsRecovereds) + parseFloat(amounts) ,
                                          
                                          
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
                                Alert.alert("Partially paid. Clearance: " +ClranceAmt.toFixed(2) + ". Transaction: "+ (parseFloat(UsrTransferFee)*parseFloat(amounts)).toFixed(2));
                                Communications.textWithoutEncoding(phonecontactz,'Hi '
                              + namess + ', your loan of ID ' 
                              +  route.params.id 
                              + ' has been repaid Ksh. ' + amounts + ' by '+ names 
                              +'. For clarification call the loanee: '
                            + userInfo.attributes.phone_number + '. Thank you. MiFedha');
                            
                            setIsLoading(false);
                              }

                                                          
                                                    
                              
                              if (userInfo.attributes.sub!==owner) {
                                Alert.alert("Please first create a main account")
                                return;
                              }  else if(usrAcActvStts === "AccountInactive"){Alert.alert('Sender account is inactive');
                              return;
                            }
                              else if(usrAcActvSttss === "AccountInactive"){Alert.alert('Receiver account is inactive');
                              return;
                            }
                              
                            else if(ClranceAmt > parseFloat(amounts) ){Alert.alert( "Too little repayment: at least "+ClranceAmt.toFixed(2));
                            return;
                          }

                              else if (
                                parseFloat(SenderUsrBal) < TotalTransacted 
                              ) {Alert.alert('Requested amount is more than you have in your account');
                            return;
                          }
                          
                          else if(userInfo.attributes.email === loanerPhns){Alert.alert('You cannot Repay Yourself');}
                              
                              else if(usrPW !==SnderPW){Alert.alert('Wrong password');
                            return;
                          }
                              
                          else if(parseFloat(ttlDpstSMs) === 0 && parseFloat(TtlWthdrwnSMs) ===0)
                          {Alert.alert('Loanee ID be verified through deposit at MFNdogo');}

                              else if(parseFloat(nonLonLimits) < parseFloat(amounts)){Alert.alert('Call ' + CompPhoneContact + ' to have your send Amount limit adjusted');
                            return;
                          }

                          else if(parseFloat(amounts) > parseFloat(LonBal)){Alert.alert("Your Loan Balance is lesser: "+LonBal)}
                          

                          else if((parseFloat(amounts) === parseFloat(LonBal))  && (parseFloat(MaxTymsBLs) === parseFloat(maxBLss)) )
                          {updtSendrAcLonOvr1();}          
                          
                          else if((parseFloat(amounts) === parseFloat(LonBal))  && (parseFloat(MaxTymsBLs) > parseFloat(maxBLss)) )
                          {updtSendrAcLonOvr2();}        
                          
                              
                               else {
                                repyCovLn();
                              }
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
          if (e){Alert.alert("Retry or update app or call customer care")
      return;}
        }
        setIsLoading(false);        
      };
      await ftchCvdSMLn();
    
      
    } catch (e) {
      if (e){Alert.alert("Retry or update app or call customer care")
      return;}
  };
      setIsLoading(false);
      
      setAmount("");
      
     
      setDesc("");
      setSnderPW("");
      
      
}



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
            onPress={fetchSenderUsrDtls}
            style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Send</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    </View>
  );
};

export default RepayNonCovLnsss;