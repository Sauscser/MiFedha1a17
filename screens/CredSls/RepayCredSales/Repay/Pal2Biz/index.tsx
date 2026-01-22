import React, {useEffect, useState} from 'react';



import {API, Auth, graphqlOperation} from 'aws-amplify';


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
import { getBizna, getCompany, getCovCreditSeller, getSMAccount } from '../../../../../src/graphql/queries';
import { createLoanRepayments, createNonLoans, updateBizna, updateCompany, updateCovCreditSeller, updateSMAccount } from '../../../../../src/graphql/mutations';


const RepayCovSellerLnsss = props => {
  
  const [SnderPW, setSnderPW] = useState("");
  
  const [amounts, setAmount] = useState("");
  
  const [Desc, setDesc] = useState("");
  
  const[isLoading, setIsLoading] = useState(false);
  
  
  const route = useRoute();
  

  

  
      const ftchCvdSMLn = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
            const RecAccountDtl:any = await API.graphql(
                graphqlOperation(getCovCreditSeller, {loanID: route.params.loanID}),
                );
                
                const amountExpectedBackWthClrncs =RecAccountDtl.data.getCovCreditSeller.amountExpectedBackWthClrnc; 
                const lonBalas =RecAccountDtl.data.getCovCreditSeller.lonBala; 
                const statuss =RecAccountDtl.data.getCovCreditSeller.status; 
                const amountrepaids =RecAccountDtl.data.getCovCreditSeller.amountRepaid; 
                const sellerContacts =RecAccountDtl.data.getCovCreditSeller.sellerContact; 
                const buyerNames =RecAccountDtl.data.getCovCreditSeller.buyerName; 
                const SellerNames =RecAccountDtl.data.getCovCreditSeller.SellerName; 
                const buyerContact =RecAccountDtl.data.getCovCreditSeller.buyerContact; 
                const amountExpectedBacks =RecAccountDtl.data.getCovCreditSeller.amountexpectedBack;
                const amountRepaidss =RecAccountDtl.data.getCovCreditSeller.amountRepaid; 
             const DefaultPenaltyCredSl2s =RecAccountDtl.data.getCovCreditSeller.DefaultPenaltyCredSl2;
                const clearanceAmts = RecAccountDtl.data.getCovCreditSeller.clearanceAmt
                  const ClranceAmt = parseFloat(clearanceAmts)+ parseFloat(DefaultPenaltyCredSl2s)
              
              const dfltUpdate = RecAccountDtl.data.getCovCreditSeller.dfltUpdate
              const crtnDate = RecAccountDtl.data.getCovCreditSeller.crtnDate
              const interest = RecAccountDtl.data.getCovCreditSeller.interest
              const repaymentPeriod = RecAccountDtl.data.getCovCreditSeller.repaymentPeriod

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


              const tmDif = daysUpToDate - dfltUpdate;
              const tmDif2 = daysUpToDate - crtnDate;
      
              const netLnBal = parseFloat(amountExpectedBackWthClrncs) - 
              parseFloat(clearanceAmts) - parseFloat (DefaultPenaltyCredSl2s)
      
              const netLnBal2 = (netLnBal) * 
              ((Math.pow(1 + parseFloat(interest)/36500, tmDif2)))

              const LonBal1 = (netLnBal2 + parseFloat(clearanceAmts) + parseFloat (DefaultPenaltyCredSl2s)).toFixed(0)

              const LoanBalz = parseFloat(LonBal1) - parseFloat(amounts)
            
             
             

              const fetchLoanerDtls = async () => {
                if(isLoading){
                  return;
                }
                setIsLoading(false);
                const userInfo = await Auth.currentAuthenticatedUser();
               
                try {
                  const accountDtl:any = await API.graphql(
                    graphqlOperation(getSMAccount, {awsemail: sellerContacts}),
                  );
            
                  const SenderUsrBal =accountDtl.data.getSMAccount.balance;
                  const usrPW =accountDtl.data.getSMAccount.pw;
                  const usrAcActvStts =accountDtl.data.getSMAccount.acStatus;
                  const owner =accountDtl.data.getSMAccount.owner;
                  const TtlActvLonsTmsByrCovs =accountDtl.data.getSMAccount.TtlActvLonsTmsByrCov;
                  const TtlActvLonsAmtByrCovs =accountDtl.data.getSMAccount.TtlActvLonsAmtByrCov;
                  const TtlClrdLonsAmtByrCovs =accountDtl.data.getSMAccount.TtlClrdLonsAmtByrCov;
                  const TtlBLLonsTmsByrCovs =accountDtl.data.getSMAccount.TtlBLLonsTmsByrCov;
                  const TtlBLLonsAmtByrCovs =accountDtl.data.getSMAccount.TtlBLLonsAmtByrCov;
                  const names =accountDtl.data.getSMAccount.name;
                  const ttlNonLonsSentSMs =accountDtl.data.getSMAccount.ttlNonLonsSentSM;
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
          
            
          const UsrTransferFee = CompDtls.data.getCompany.crdSllrLnRpymntFee;
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact;  
          const ttlSellerLnsInClrdTymsCovs = CompDtls.data.getCompany.ttlSellerLnsInClrdTymsCov; 
          const ttlSellerLnsInClrdAmtCovs = CompDtls.data.getCompany.ttlSellerLnsInClrdAmtCov;
          const ttlSellerLnsInBlTymsCovs = CompDtls.data.getCompany.ttlSellerLnsInBlTymsCov; 
          const ttlSellerLnsInBlAmtCovs = CompDtls.data.getCompany.ttlSellerLnsInBlAmtCov;
          const totalLnsRecovereds = CompDtls.data.getCompany.totalLnsRecovered;
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
          const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM; 
          const TotalTransacted = parseFloat(amounts)  + parseFloat(UsrTransferFee)*parseFloat(amounts) ; 
          const maxBLss = CompDtls.data.getCompany.maxBLs;
         
                    
          const fetchLoaneeDtls = async () => {
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try {
                const RecAccountDtl:any = await API.graphql(
                    graphqlOperation(getBizna, {BusKntct: buyerContact}),
                    );
                    const netEarnings2 =RecAccountDtl.data.getBizna.netEarnings;                    
                    const earningsBal2 =RecAccountDtl.data.getBizna.earningsBal; 
                    
                    const noBL =accountDtl.data.getSMAccount.noBL;

                    const busName2 =RecAccountDtl.data.getBizna.busName;
                    const owner =RecAccountDtl.data.getBizna.owner;
                    
                    const updtSendrAcLonOvr1 = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateBizna, {
                              input:{
                                BusKntct: buyerContact,
                                
                                netEarnings:(parseFloat(netEarnings2)-TotalTransacted).toFixed(0) ,
                                
                                noBL: 0, 
                                 
                              }
                            })
                          )


                      }
                      catch(error){
                        console.log(error)
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
                            graphqlOperation(updateBizna, {
                              input:{
                                BusKntct: buyerContact,
                                netEarnings:(parseFloat(netEarnings2) - TotalTransacted ).toFixed(0) ,
                                noBL: parseFloat(noBL) - 1, 
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
                                      graphqlOperation(updateCovCreditSeller, {
                                        input:{
                                          loanID:route.params.loanID,
                                          amountRepaid: (parseFloat(amounts) + parseFloat(amountrepaids)).toFixed(0),
                                          lonBala: LoanBalz.toFixed(0),
                                          amountExpectedBackWthClrnc:LoanBalz.toFixed(0),
                                          status: "LoanCleared",
                                          DefaultPenaltyCredSl2:0,
                                          clearanceAmt: 0
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
                                    graphqlOperation(createLoanRepayments, {
                                      input: {
                                        senderPhn: userInfo.attributes.email,
                                        recPhn: sellerContacts,    
                                        RecName:SellerNames,
                                        loanId2: route.params.loanID,  
                                        loanId1: "route.params.id",                                        
                                        loanId3: "route.params.id", 
                                        SenderName:buyerNames,                             
                                        amount: parseFloat(amounts).toFixed(0),                              
                                        description: Desc,
                                        status: "CredSlrLonRepayment",
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
                                          awsemail:sellerContacts,
                                          
                                          balance: (parseFloat(SenderUsrBal) + (parseFloat(amounts) - parseFloat(clearanceAmts))).toFixed(0),
                                          
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
                                         
                                          companyEarningBal:UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarningBals) + ClranceAmt - parseFloat(DefaultPenaltyCredSl2s),
                                          companyEarning: UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarnings) + ClranceAmt - parseFloat(DefaultPenaltyCredSl2s),                                                    
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
                                Alert.alert("Cleared. ClearanceFee: " +ClranceAmt.toFixed(2) + " TransactionFee: "+ (parseFloat(UsrTransferFee)*parseFloat(amounts)).toFixed(2));
                                setIsLoading(false);
                              }                                                                                                            
                        

                              const repyCovLn = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateCovCreditSeller, {
                                        input:{
                                          loanID:route.params.loanID,
                                          amountRepaid: (parseFloat(amounts) + parseFloat(amountrepaids)).toFixed(0),
                                          lonBala: LoanBalz.toFixed(0),
                                          DefaultPenaltyCredSl2:0,
                                          amountExpectedBackWthClrnc: LoanBalz.toFixed(0),
                                          clearanceAmt: 0
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
                                await sendCovLn();
                              }
                              
                              const sendCovLn = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true)
                                try {
                                  await API.graphql(
                                    graphqlOperation(createLoanRepayments, {
                                      input: {
                                        recPhn: sellerContacts,
                                        senderPhn: buyerContact, 
                                        RecName:SellerNames,
                                        loanId2: route.params.loanID, 
                                        loanId1: "route.params.id",                                        
                                        loanId3: "route.params.id",  
                                        SenderName:buyerNames,                                    
                                        amount: parseFloat(amounts).toFixed(0),                              
                                        description: Desc,
                                        status: "CredSlrLonRepayment",
                                        owner: userInfo.attributes.sub
                                      },
                                    }),
                                  );
          
          
                                } catch (error) {
                                  console.log(error)
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
                                      graphqlOperation(updateBizna, {
                                        input:{
                                            BusKntct: buyerContact,
                                
                                            netEarnings:(parseFloat(netEarnings2)-TotalTransacted).toFixed(0) ,
                                            
                                          
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
                                      graphqlOperation(updateSMAccount, {
                                        input:{
                                          awsemail:sellerContacts,
                                          
                                          balance:(parseFloat(SenderUsrBal) + parseFloat(amounts) - parseFloat(clearanceAmts)).toFixed(0) ,
                                         
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
                                          ttlSellerLnsInClrdAmtCov: parseFloat(ttlSellerLnsInClrdAmtCovs) + parseFloat(amounts) ,
                                          companyEarningBal:UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarningBals) + ClranceAmt - parseFloat(DefaultPenaltyCredSl2s),
                                          companyEarning: UsrTransferFee * parseFloat(amounts) + parseFloat(companyEarnings) + ClranceAmt - parseFloat(DefaultPenaltyCredSl2s),                                                    
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
                                Alert.alert("Partially paid. Clearance: " +(ClranceAmt).toFixed(2) + " TransactionFee: "+ (parseFloat(UsrTransferFee)*parseFloat(amounts)).toFixed(2));
                                setIsLoading(false);
                              }

                                                          
                                                    
                              
                              if (userInfo.attributes.sub!==owner) {
                                Alert.alert("Please first create a main account")
                                return;
                              }  
                              else if (
                                parseFloat(netEarnings2) < TotalTransacted 
                              ) {Alert.alert('Requested amount is more than you have in your account');
                            return;
                          }
                          
                             

                          else if(ClranceAmt > parseFloat(amounts) ){Alert.alert( "Too little repayment: at least "+ClranceAmt.toFixed(2));
                            return;
                          }

                          else if(parseFloat(amounts) > parseFloat(LonBal1)){Alert.alert("Your Loan Balance is lesser: "+ LonBal1.toFixed(0))}
                          

                          else if((parseFloat(amounts) === parseFloat(LonBal1))  && (parseFloat(noBL) === parseFloat(maxBLss)) )
                          {updtSendrAcLonOvr1();}          
                          
                          else if((parseFloat(amounts) === parseFloat(LonBal1))  && (parseFloat(noBL) > parseFloat(maxBLss)))
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
                    
                      await fetchLoaneeDtls();
                                                                                         
                }       
                catch(e) {     
                  if (e){Alert.alert("Retry or update app or call customer care")
  return;}                 
                }
                setIsLoading(false);
                }                    
                  await fetchCompDtls ();
        } catch (e) {
          console.log(e)
          if (e){Alert.alert("Retry or update app or call customer care")
      return;}
        }
        setIsLoading(false);        
      };
      await fetchLoanerDtls ();
    
      
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
export default RepayCovSellerLnsss;