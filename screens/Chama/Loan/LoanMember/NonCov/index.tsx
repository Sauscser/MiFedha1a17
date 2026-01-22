import React, {useEffect, useState} from 'react';

import {
  
  createNonCvrdGroupLoans,
 
  updateChamaMembers,
 
  updateCompany,
  updateGroup,
  
  
  updateReqLoanChama,
  
  
  updateSMAccount,
  
} from '../../../../../src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  getCompany,
  getSMAccount,
  getGroup,
  
  getChamaMembers,
  getReqLoanChama,
} from '../../../../../src/graphql/queries';

import {useNavigation, useRoute} from '@react-navigation/native';

import {
  View,
  Text,
  
  TextInput,
  ScrollView,
  
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { parse } from 'expo-linking';

const ChmNonCovLns = props => {
  const [ChmPhn, setChmPhn] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [RecPhn, setRecPhn] = useState('');
  const [SnderPW, setSnderPW] = useState("");
  const [RepaymtPeriod, setRepaymtPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [AmtExp, setAmtExp] = useState("");
  const [AdvRegNo, setAdvRegNo] = useState("");
  const [Desc, setDesc] = useState("");
  const [ownr, setownr] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const [RecAccCode, setRecAccCode] = useState("");
  const [DfltPnlty, setDfltPnlty] = useState('');
  
  const [MmbrId, setMmbrId] = useState('');
  const ChmNMmbrPhns = MmbrId+ChmPhn
  const route = useRoute();

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    setownr(userInfo.attributes.sub);  
    
  }

  useEffect(() => {
    fetchUser();
    }, []);  

    
const fetchChmLnReqDtls = async () => {
      if(isLoading){
        return;
      }
      setIsLoading(true);
      try {
          const ChmMbrtDtlz:any = await API.graphql(
              graphqlOperation(getReqLoanChama, {id: route.params.id}),
              );

              const groupContacts =ChmMbrtDtlz.data.getReqLoanChama.chamaPhone;
              const memberContacts =ChmMbrtDtlz.data.getReqLoanChama.loaneePhone;
              const loaneeEmail =ChmMbrtDtlz.data.getReqLoanChama.loaneeEmail;
              const amount =ChmMbrtDtlz.data.getReqLoanChama.amount;
              const AmtExp =ChmMbrtDtlz.data.getReqLoanChama.repaymentAmt;
              const RepaymtPeriod =ChmMbrtDtlz.data.getReqLoanChama.repaymentPeriod;
              const loaneeMemberId =ChmMbrtDtlz.data.getReqLoanChama.loaneeMemberId;
              const ChmNMmbrPhns = loaneeMemberId+groupContacts

              const today = new Date();
              let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
              let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
              let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
              let years = (today.getFullYear() < 10 ? '0' : '') + today.getFullYear();
              let months = (today.getMonth() < 10 ? '0' : '') + today.getMonth();
              let months2 = parseFloat(months)
              let days = (today.getDate() < 10 ? '0' : '') + today.getDate();
              
              const now:any = years+ "-"+ "0"+months2 +"-"+ days+"T"+hours + ':' + minutes + ':' + seconds;
              const curYrs = parseFloat(years)*365;
              const curMnths = (months2)*30.4375;
              const daysUpToDate = curYrs + curMnths + parseFloat(days)

              const fetchChmMbrDtls = async () => {
                if(isLoading){
                  return;
                }
                setIsLoading(true);
                try {
                    const ChmMbrtDtl:any = await API.graphql(
                        graphqlOperation(getChamaMembers, {ChamaNMember: ChmNMmbrPhns}),
                        );
          
                        
                        const GrossLnsGvns =ChmMbrtDtl.data.getChamaMembers.GrossLnsGvn;
                        const LonAmtGvens =ChmMbrtDtl.data.getChamaMembers.LonAmtGven;
                        const LnBals =ChmMbrtDtl.data.getChamaMembers.LnBal;
                         


  const fetchSenderUsrDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getGroup, {grpContact: groupContacts}),
      );

      const grpBals =accountDtl.data.getGroup.grpBal;
      const signitoryPWs =accountDtl.data.getGroup.signitoryPW;
      const statuss =accountDtl.data.getGroup.status;
      
      const TtlActvLonsTmsLnrChmNonCovs =accountDtl.data.getGroup.TtlActvLonsTmsLnrChmNonCov;
      const TtlActvLonsAmtLnrChmNonCovs =accountDtl.data.getGroup.TtlActvLonsAmtLnrChmNonCov;
      const grpNames =accountDtl.data.getGroup.grpName;
  
      const SenderSub =accountDtl.data.getGroup.owner;
      
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
          
          const userLoanTransferFees = CompDtls.data.getCompany.userLoanTransferFee;
          
          
         
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
             
          const ttlChmLnsInAmtNonCovs = CompDtls.data.getCompany.ttlChmLnsInAmtNonCov;          
          const ttlChmLnsInTymsNonCovs = CompDtls.data.getCompany.ttlChmLnsInTymsNonCov;            
          const maxInterestGrps = CompDtls.data.getCompany.maxInterestGrp;  
          const Interest = ((parseFloat(AmtExp) - parseFloat(amount))*100)/(parseFloat(amount) *parseFloat(RepaymtPeriod));     
          const maxBLss = CompDtls.data.getCompany.maxBLs;

          const IntAmt = parseFloat(AmtExp) - (parseFloat(amount) + 
          parseFloat(userLoanTransferFees)*parseFloat(amount) )
          
         
          const MaxSMInterest = (parseFloat(amount) +
          (parseFloat(userLoanTransferFees)*parseFloat(amount) 
          ) )*parseFloat(maxInterestGrps)*parseFloat(RepaymtPeriod);
          
          const ActualMaxSMInterest = parseFloat(AmtExp) - (parseFloat(amount) +  parseFloat(userLoanTransferFees)*parseFloat(amount) 
          )

          const TransCost =  parseFloat(userLoanTransferFees)*parseFloat(amount) 
          const TtlTransCost =  parseFloat(userLoanTransferFees)*parseFloat(amount) +  parseFloat(amount)

          const AllTtlTrnsCst = TtlTransCost + MaxSMInterest;
          const TotalAmtExp = parseFloat(userLoanTransferFees)*parseFloat(amount) + parseFloat(AmtExp);
              

              const fetchRecUsrDtls = async () => {
                if(isLoading){
                  return;
                }
                setIsLoading(true);
                try {
                    const RecAccountDtl:any = await API.graphql(
                        graphqlOperation(getSMAccount, {awsemail: loaneeEmail}),
                        );
                        const RecUsrBal =RecAccountDtl.data.getSMAccount.balance;
                        const usrNoBL =RecAccountDtl.data.getSMAccount.MaxTymsBL;
                        const usrAcActvSttss =RecAccountDtl.data.getSMAccount.acStatus; 
                        const recAcptncCode =RecAccountDtl.data.getSMAccount.loanAcceptanceCode; 
                        const TtlActvLonsTmsLnrCovss =RecAccountDtl.data.getSMAccount.TtlActvLonsTmsLnrCov; 
                        const TtlActvLonsTmsLneeCovss =RecAccountDtl.data.getSMAccount.TtlActvLonsTmsLneeCov;
                        const TtlActvLonsTmsLneeChmNonCovs =RecAccountDtl.data.getSMAccount.TtlActvLonsTmsLneeChmNonCov;
                        const TtlActvLonsAmtLneeChmNonCovs =RecAccountDtl.data.getSMAccount.TtlActvLonsAmtLneeChmNonCov;
                        const namess =RecAccountDtl.data.getSMAccount.name;
                        const ttlDpstSMs =RecAccountDtl.data.getSMAccount.ttlDpstSM;
                        const MaxAcBals =RecAccountDtl.data.getSMAccount.MaxAcBal;
                        const DefaultPenaltySMs =RecAccountDtl.data.getSMAccount.DefaultPenaltySM;
                        const TtlWthdrwnSMs =RecAccountDtl.data.getSMAccount.TtlWthdrwnSM;
                        const DefaultPenaltyRate = parseFloat(DfltPnlty)/parseFloat(AmtExp) *100;
                        const RecomDfltPnltyRate = (parseFloat(AmtExp)*20) / 100;

               
                        const sendSMLn = async () => {
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try {
                            await API.graphql(
                              graphqlOperation(createNonCvrdGroupLoans, {
                                input: {
                                    grpContact: groupContacts,
                                    loaneePhn: loaneeEmail,
                                    loanerLoanee:groupContacts+memberContacts,
                                    repaymentPeriod: RepaymtPeriod,
                                    amountGiven: parseFloat(amount).toFixed(0),
                                    amountExpectedBack: TotalAmtExp.toFixed(0),
                                    amountExpectedBackWthClrnc:TotalAmtExp.toFixed(0),
                                    amountRepaid: 0,
                                    description: Desc,
                                    loaneeName:namess,
                                    timeExpBack: parseFloat(RepaymtPeriod) + daysUpToDate,
                                    timeExpBack2: 61 + daysUpToDate,
                                    loanerName:grpNames,
                                    memberId:ChmNMmbrPhns,
                                    lonBala:TotalAmtExp.toFixed(0),
                                    DefaultPenaltyChm:DfltPnlty,
                                    DefaultPenaltyChm2:0,
                                    
                                    status: "LoanActive",
                                    owner: ownr,
                                },
                              }),
                            );


                          } catch (error) {
                            if (error){
                              Alert.alert("Loaning unsuccessful; enter details correctly")
                              return}
                          }
                          setIsLoading(false);
                          await updatMmbr();
                        };



                        const updatMmbr = async () => {
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try {
                            await API.graphql(
                              graphqlOperation(updateChamaMembers, {
                                input: {
                                  ChamaNMember: ChmNMmbrPhns,
                                  LonAmtGven: (parseFloat(LonAmtGvens) + parseFloat(amount)).toFixed(0),
                                  GrossLnsGvn: (parseFloat(GrossLnsGvns) + TotalAmtExp).toFixed(0),
                                  LnBal: (parseFloat(LnBals) + TotalAmtExp).toFixed(0),                                  
                                  loanStatus:"LoanActive",                                    
                                  blStatus: "AccountNotBL",
                                
                                },
                              }),
                            );


                          } catch (error) {
                            console.log(error)
                            if(error){
                              Alert.alert("Member doesnt exist")
                              
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
                                graphqlOperation(updateGroup, {
                                  input:{
                                    grpContact:groupContacts,
                                    TtlActvLonsTmsLnrChmNonCov: parseFloat(TtlActvLonsTmsLnrChmNonCovs)+1,
                                    TtlActvLonsAmtLnrChmNonCov: (parseFloat(TtlActvLonsAmtLnrChmNonCovs) + TotalAmtExp).toFixed(0),
                                                                              
                                    grpBal:(parseFloat(grpBals)  - TtlTransCost).toFixed(0) 
                                   
                                    
                                  }
                                })
                              )


                          }
                          catch(error){
                            if (error){Alert.alert("Check your internet connection")
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
                                    awsemail:loaneeEmail,
                                    TtlActvLonsTmsLneeChmNonCov: parseFloat(TtlActvLonsTmsLneeChmNonCovs) +1 ,
                                    TtlActvLonsAmtLneeChmNonCov: (parseFloat(TtlActvLonsAmtLneeChmNonCovs)+ TotalAmtExp).toFixed(0),
                                    balance:(parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0),
                                    loanStatus:"LoanActive",                                    
                                    blStatus: "AccountNotBL",
                                    loanAcceptanceCode:"None"                                
                                    
                                  }
                                })
                              )                              
                          }
                          catch(error){
                            console.log(error)
                            if (error){Alert.alert("Check your internet connection")
                            return;}
                          }
                          setIsLoading(false);
                          await updtComp();
                        }

                        const updtComp = async () =>{
                          if(isLoading){
                            return;
                          }
                          setIsLoading(false);
                          
                          try{
                              await API.graphql(
                                graphqlOperation(updateCompany, {
                                  input:{
                                    AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                                        
                                    
                                    companyEarningBal:parseFloat(userLoanTransferFees)*parseFloat(amount)+parseFloat(companyEarningBals),
                                    companyEarning: parseFloat(userLoanTransferFees)*parseFloat(amount) +(companyEarnings),                                                    
                                    
                                    ttlChmLnsInAmtNonCov: TotalAmtExp + parseFloat(ttlChmLnsInAmtNonCovs),
                                   
                                    ttlChmLnsInTymsNonCov: 1 + parseFloat(ttlChmLnsInTymsNonCovs),
                                          
                                    
                                     
                                    
                                  }
                                })
                              )
                              
                              
                          }
                          catch(error){
                            console.log(error);
                            if (error){Alert.alert("Check your internet connection")
                        return;}
                          }
                          Alert.alert("Transaction Fee:Ksh. "+ (parseFloat(userLoanTransferFees)*parseFloat(amount)).toFixed(2)
                         
                          );
                          setIsLoading(false);
                          await updtLnReq();
                        }

                        const updtLnReq = async () =>{
                          if(isLoading){
                            return;
                          }
                          setIsLoading(false);
                          
                          try{
                              await API.graphql(
                                graphqlOperation(updateReqLoanChama, {
                                  input:{
                                    id:route.params.id,                                                      
                                    status:"Approved"
                                  }
                                })
                              )
                              
                              
                          }
                          catch(error){
                            console.log(error);
                            if (error){Alert.alert("Check your internet connection")
                        return;}
                          }
                          Alert.alert("Transaction Fee:Ksh. "+ (parseFloat(userLoanTransferFees)*parseFloat(amount)).toFixed(2)
                         
                          );
                          setIsLoading(false);
                          
                        }
                        
                                              
                        if (parseFloat(usrNoBL) > parseFloat(maxBLss)){Alert.alert('Receiver does not qualify');
                      return;
                    }
                        

                    else if(parseFloat(ttlDpstSMs) === 0 && parseFloat(TtlWthdrwnSMs) === 0){Alert.alert('Loanee National ID be verified through deposit at MFNdogo');}

                   
                    else if(ownr !==SenderSub){Alert.alert('You are not the creator/signitory of this Chama');}
                        else if(statuss !== "AccountActive"){Alert.alert('Sender account is inactive');}
                        
                      else if((parseFloat(RecUsrBal) + parseFloat(amount)) > parseFloat(MaxAcBals))
                    {Alert.alert('Loanee call customer care to have wallet capacity adjusted');
                      return;
                    }

                    else if((DefaultPenaltyRate) > 20)
                    {Alert.alert('Please enter Default Penalty less than ' + RecomDfltPnltyRate);
                      return;
                    }
                    
                        else if(groupContacts === memberContacts){Alert.alert('You cannot Loan Yourself');}
                        else if(usrAcActvSttss !== "AccountActive"){Alert.alert('Receiver account is inactive');}
                        
                        else if (
                          parseFloat(grpBals) < TtlTransCost 
                        ) {Alert.alert("Cancelled."+ "Bal: "+ grpBals +". Deductable: " + TtlTransCost.toFixed(2) 
                        + ". "+ ((TtlTransCost) - parseFloat(grpBals)).toFixed(2) + ' more needed');}
                        
                        else if(signitoryPWs !==SnderPW){Alert.alert('Wrong password');}
                                                                 
            
                                                 else {
                                                  sendSMLn();
                        }                                                
                    }       
                    catch(e) {    
                      console.log(e); 
                      if (e){Alert.alert("Check your internet connection")
      return;}                 
                    }
                    setIsLoading(false);
                    }                    
                      await fetchRecUsrDtls();        
                    

            
          
        
        } catch (e) {
          console.log(e);
          if (e){Alert.alert("Check your internet connection")
      return;}
        } 
        setIsLoading(false);       
      };
      await fetchCompDtls();
    
      
    } catch (e) {
      console.log(e)
      if (e){Alert.alert("Please fill details correctly or check your internet connection")
      return;}
  };
      setIsLoading(false);
      
      
}
await fetchSenderUsrDtls();


} catch (e) {
      console.log(e)
      if (e){Alert.alert("Please fill details correctly or check your internet connection")
      return;}
  };
      setIsLoading(false);
      
      
}
await fetchChmMbrDtls();

} catch (e) {
  console.log(e);
  if (e){Alert.alert("Check internet or enter correct Member ID")
return;}
}
setAmount("");
   setChmPhn("")   
setAdvRegNo("");
setAmtExp("");
setDesc("");
setSnderPW("");
setRepaymtPeriod("");
setRecAccCode("");
setDfltPnlty("");
setMmbrId("")
setIsLoading(false);        
};

useEffect(() =>{
  const DfltPnltys=DfltPnlty
    if(!DfltPnltys && DfltPnltys!=="")
    {
      setDfltPnlty("");
      return;
    }
    setDfltPnlty(DfltPnltys);
    }, [DfltPnlty]
     );

     useEffect(() =>{
      const SnderNatIds=MmbrId
        if(!SnderNatIds && SnderNatIds!=="")
        {
          setMmbrId("");
          return;
        }
        setMmbrId(SnderNatIds);
        }, [MmbrId]
         );

useEffect(() =>{
  const RecPhns=RecPhn
    if(!RecPhns && RecPhns!=="")
    {
      setRecPhn("");
      return;
    }
    setRecPhn(RecPhns);
    }, [RecPhn]
     );
     
     useEffect(() =>{
  const ChmPhns=ChmPhn
    if(!ChmPhns && ChmPhns!=="")
    {
      setChmPhn("");
      return;
    }
    setChmPhn(ChmPhns);
    }, [ChmPhn]
     );

     useEffect(() =>{
      const amt=amount
        if(!amt && amt!=="")
        {
          setAmount("");
          return;
        }
        setAmount(amt);
        }, [amount]
         );

         useEffect(() =>{
          const RecNatIds=RecNatId
            if(!RecNatIds && RecNatIds!=="")
            {
              setRecNatId("");
              return;
            }
            setRecNatId(RecNatIds);
            }, [RecNatId]
             );

             useEffect(() =>{
              const AdvRegNoss=AdvRegNo
                if(!AdvRegNoss && AdvRegNoss!=="")
                {
                  setAdvRegNo("");
                  return;
                }
                setAdvRegNo(AdvRegNoss);
                }, [AdvRegNo]
                 );

                 useEffect(() =>{
                  const AmtExpss=AmtExp
                    if(!AmtExpss && AmtExpss!=="")
                    {
                      setAmtExp("");
                      return;
                    }
                    setAmtExp(AmtExpss);
                    }, [AmtExp]
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
                              const RepaymtPeriods=RepaymtPeriod
                                if(!RepaymtPeriods && RepaymtPeriods!=="")
                                {
                                  setRepaymtPeriod("");
                                  return;
                                }
                                setRepaymtPeriod(RepaymtPeriods);
                                }, [RepaymtPeriod]
                                 );

                                 useEffect(() =>{
                                  const RecAccCodes=RecAccCode
                                    if(!RecAccCodes && RecAccCodes!=="")
                                    {
                                      setRecAccCode("");
                                      return;
                                    }
                                    setRecAccCode(RecAccCodes);
                                    }, [RecAccCode]
                                     );

  return (
    
      <View style={styles.image}>
        <ScrollView >
         
         <View style={styles.amountTitleView}>
           <Text style={styles.title}>Fill Loan Details Below</Text>
         </View>

         

         <View style={styles.sendAmtView}>
           <TextInput
           placeholder='Chama PassWord'
             value={SnderPW}
             onChangeText={setSnderPW}
             secureTextEntry = {true}
             style={styles.sendAmtInput}
             editable={true}></TextInput>
           
         </View>

         <View style={styles.sendAmtView}>
           <TextInput
           keyboardType={"decimal-pad"}
           placeholder="Default Penalty"
             value={DfltPnlty}
             onChangeText={setDfltPnlty}
             style={styles.sendAmtInput}
             editable={true}></TextInput>
           
         </View>

        
         <View style={styles.sendAmtViewDesc}>
           <TextInput
             multiline={true}
             placeholder="Description"
             value={Desc}
             onChangeText={setDesc}
             style={styles.sendAmtInputDesc}
             editable={true}></TextInput>
          
         </View>

         
         

         <TouchableOpacity
           onPress={fetchChmLnReqDtls}
           style={styles.sendAmtButton}>
           <Text style={styles.sendAmtButtonText}>Loan without Advocate Coverage</Text>
           {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
         </TouchableOpacity>

         
       </ScrollView>
      </View>
             
    
  );
};

export default ChmNonCovLns;