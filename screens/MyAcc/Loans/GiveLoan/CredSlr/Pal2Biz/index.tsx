import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  createCovCreditSeller,
  createFloatAdd,
  createSMAccount,
  createSMLoansCovered,
  updateAdvocate,
  updateAgent,
  updateBizna,
  updateCompany,
  updateCovCreditSeller,
  updateReqLoanCredSl,
  updateSAgent,
  updateSMAccount,
  
} from '../../../../../../src/graphql/mutations';

import {API, Auth, graphqlOperation, DataStore} from 'aws-amplify';
import {
  getAgent,
  getCompany,
  getSMAccount,
  getSAgent,
  getAdvocate,
  getPersonel,
  getBizna,
  getReqLoanCredSl,
  listSMLoansCovereds,
  listCovCreditSellers,
  listCvrdGroupLoans,
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
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { parse } from 'expo-linking';

const CovCredSls = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
 
  const [SnderPW, setSnderPW] = useState("");
  const [RepaymtPeriod, setRepaymtPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [AmtExp, setAmtExp] = useState("");
  const [AdvRegNo, setAdvRegNo] = useState("");
  const [Desc, setDesc] = useState("");
  
  const[isLoading, setIsLoading] = useState(false);
  const [RecAccCode, setRecAccCode] = useState("");
  
  const [ItmNm, setItmNm] = useState("");
  const [ItmSrlNu, setItmSrlNu] = useState("");
  const [DfltPnlty, setDfltPnlty] = useState("");

  const route = useRoute();
  
  const navigation = useNavigation();
  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps")
 }
 
  const fetchCredSlLnReq = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);
    const userInfo = await Auth.currentAuthenticatedUser();
    
    try {
      const PersnlDtl:any = await API.graphql(
        graphqlOperation(getReqLoanCredSl, {id: route.params.id}),
      );

      const RecPhn =PersnlDtl.data.getReqLoanCredSl.loaneeEmail;
      const dfltDeadLn =PersnlDtl.data.getReqLoanCredSl.dfltDeadLn;
      const advLicNo =PersnlDtl.data.getReqLoanCredSl.advLicNo;
      const BusinessRegNos =PersnlDtl.data.getReqLoanCredSl.businessNo;
      const statusNumber =PersnlDtl.data.getReqLoanCredSl.statusNumber;
      const itemName =PersnlDtl.data.getReqLoanCredSl.itemName;
      const amount =PersnlDtl.data.getReqLoanCredSl.amount;
      const AmtExp =PersnlDtl.data.getReqLoanCredSl.repaymentAmt;
      const RepaymtPeriod =PersnlDtl.data.getReqLoanCredSl.repaymentPeriod;
      const status =PersnlDtl.data.getReqLoanCredSl.status;
      const description =PersnlDtl.data.getReqLoanCredSl.description;
      const defaultPenalty =PersnlDtl.data.getReqLoanCredSl.defaultPenalty;
      const AdvEmail =PersnlDtl.data.getReqLoanCredSl.AdvEmail;
      const installmentAmount =PersnlDtl.data.getReqLoanCredSl.installmentAmount;
      const paymentFrequency =PersnlDtl.data.getReqLoanCredSl.paymentFrequency;
      const DefaultPenaltyRate = parseFloat(defaultPenalty)/parseFloat(AmtExp) *100;
      const RecomDfltPnltyRate = (parseFloat(AmtExp)*20) / 100;

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

              const fetchCvLnSM = async () => {
                setIsLoading(true);
                const userInfo = await Auth.currentAuthenticatedUser();
                
                
                try {
                  const Lonees1:any = await API.graphql(graphqlOperation(listSMLoansCovereds, 
                    { filter: {
                        and: {
                          status: { eq: "LoanBL"},
                          lonBala: { gt: 0},
                          loaneeEmail: { eq: RecPhn},
                        }
                      }}
                      ));
          
                      
                  
                              const fetchCLCrdSl = async () => {
                                setIsLoading(true);
                                try {
                                  const Lonees3:any = await API.graphql(graphqlOperation(listCovCreditSellers, 
                                    { filter: {
                                        and: {
                                          status: { eq: "LoanBL"},
                                  lonBala: { gt: 0},
                                  buyerContact: { eq: RecPhn},
                                        }
                                      }}
                                      ));
          
                                      
          
                                              const fetchCLChm = async () => {
                                                setIsLoading(true);
                                                try {
                                                  const Lonees5:any = await API.graphql(graphqlOperation(listCvrdGroupLoans, 
                                                    { filter: {
                                                        and: {
                                                          status: { eq: "LoanBL"},
                                                  lonBala: { gt: 0},
                                                  loaneePhn: { eq: userInfo.attributes.email},
                                                        }
                                                      }}
                                                      ));


      
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
          
          const userLoanTransferFees = CompDtls.data.getCompany.biznaCredSaleFee;
          const AdvComs = CompDtls.data.getCompany.AdvCom;
          const CoverageFees = CompDtls.data.getCompany.CoverageFee;
          const AdvCompanyComs = CompDtls.data.getCompany.AdvCompanyCom;
          const AdvCovFee =(parseFloat(CoverageFees)*parseFloat(AdvComs))
          const CompCovFee = parseFloat(CoverageFees)*parseFloat(AdvCompanyComs);
          const AdvCovAmt = AdvCovFee*parseFloat(amount)
          const CompCovAmt = CompCovFee*parseFloat(amount)
          const ttlCovFeeAmount = parseFloat(CoverageFees)*parseFloat(amount)
         
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact;         
          const ttlCompCovEarningss = CompDtls.data.getCompany.ttlCompCovEarnings;

          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const AdvEarningBals = CompDtls.data.getCompany.AdvEarningBal;
          const AdvEarnings = CompDtls.data.getCompany.AdvEarning; 
         
          const ttlSellerLnsInAmtCovs = CompDtls.data.getCompany.ttlSellerLnsInAmtCov;
          
          const ttlSellerLnsInTymsCovs = CompDtls.data.getCompany.ttlSellerLnsInTymsCov;
          const ttlSellerLnsInActvAmtCovs = CompDtls.data.getCompany.ttlSellerLnsInActvAmtCov;
          
          const ttlSellerLnsInActvTymsCovs = CompDtls.data.getCompany.ttlSellerLnsInActvTymsCov;
          const maxInterestCredSllrs = CompDtls.data.getCompany.maxInterestCredSllr;
          const maxBLss = CompDtls.data.getCompany.maxBLs; 
          
          const Interest = ((parseFloat(AmtExp) - parseFloat(amount))*100)/(parseFloat(amount) *parseFloat(RepaymtPeriod))    

          const IntAmt = parseFloat(AmtExp) - (parseFloat(amount) + 
          parseFloat(userLoanTransferFees)*parseFloat(amount) + ttlCovFeeAmount)

          
          
          const ActualMaxPwnBrkrInterest = parseFloat(AmtExp) - parseFloat(amount)
          const phoneContacts = CompDtls.data.getCompany.phoneContact;  
          const TransCost = ttlCovFeeAmount + parseFloat(userLoanTransferFees)*parseFloat(amount) 
          const TtlTransCost = ttlCovFeeAmount + parseFloat(userLoanTransferFees)*parseFloat(amount)  + parseFloat(amount)
          const MaxSMInterest = (parseFloat(amount) + 
          (parseFloat(userLoanTransferFees)*parseFloat(amount) + 
              ttlCovFeeAmount))*parseFloat(maxInterestCredSllrs)*parseFloat(RepaymtPeriod);

          const ActualMaxSMInterest = parseFloat(AmtExp) - 
                  (parseFloat(amount) +  parseFloat(userLoanTransferFees)*parseFloat(amount) + 
                  ttlCovFeeAmount);

          const lnTrnsfrFee = parseFloat(userLoanTransferFees)*parseFloat(amount);
          
          const TransCost2 = parseFloat(userLoanTransferFees)*parseFloat(amount)

          const amtrpayable2 = parseFloat(amount) * 
          ((Math.pow(1 + parseFloat(AmtExp)/36500, parseFloat(RepaymtPeriod)) - 
          Math.pow(1 + parseFloat(AmtExp)/36500, 0)) /
          (Math.pow(1 + parseFloat(AmtExp)/36500, parseFloat(RepaymtPeriod)) - 1))

          const amtrpayable = parseFloat(amount) * 
          ((Math.pow(1 + parseFloat(AmtExp)/36500, parseFloat(RepaymtPeriod)) - 
          Math.pow(1 + parseFloat(AmtExp)/36500, 0)) /
          (Math.pow(1 + parseFloat(AmtExp)/36500, parseFloat(RepaymtPeriod)) - 1))

          const TotalAmtExp = (ttlCovFeeAmount + (parseFloat(userLoanTransferFees)*parseFloat(amount))) + amtrpayable;
          const TotalAmtExp2 =  (parseFloat(userLoanTransferFees)*parseFloat(amount)) + amtrpayable2;
          
          
              

              const fetchRecUsrDtls = async () => {
                if(isLoading){
                  return;
                }
                setIsLoading(true);
                try {
                    const RecAccountDtl:any = await API.graphql(
                        graphqlOperation(getBizna, {BusKntct: RecPhn}),
                        );
                        const TtlEarningsz2 =RecAccountDtl.data.getBizna.TtlEarnings;
                                  const netEarnings =RecAccountDtl.data.getBizna.netEarnings;
                                  const busNames2 =RecAccountDtl.data.getBizna.busName;
                                  const noBL =RecAccountDtl.data.getBizna.noBL;
                                  const status =RecAccountDtl.data.getBizna.status;
                                  const email2 =RecAccountDtl.data.getBizna.email;
                                  const UsrTransferFee2 = parseFloat(netEarnings) -parseFloat(amount);
                                  const TotalTransacted2 = parseFloat(amount)  + UsrTransferFee2;
                                  const TotalAmtExp3 =  UsrTransferFee2 + amtrpayable2;
                                  const RecobjectionStatus =RecAccountDtl.data.getBizna.objectionStatus;

                        
                                  

                                  const FetchWrkrDtls = async () => {
                                    if(isLoading){
                                      return;
                                    }
                                    setIsLoading(true);
                                    try {
                                        const RecAccountDtl1:any = await API.graphql(
                                            graphqlOperation(getSMAccount, {awsemail: email2}),
                                            );
                                            
                                            const nationalids =RecAccountDtl1.data.getSMAccount.nationalid;
                                            

                                            const FetchWrkrDtls2 = async () => {
                                              if(isLoading){
                                                return;
                                              }
                                              setIsLoading(true);
                                              try {
                                                  const RecAccountDtl:any = await API.graphql(
                                                      graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}),
                                                      );
                                                      const pwz =RecAccountDtl.data.getSMAccount.pw;
                                                      const nationalidss =RecAccountDtl.data.getSMAccount.nationalid;
                                                      const owner =RecAccountDtl.data.getSMAccount.owner;
                                                      const name =RecAccountDtl.data.getSMAccount.name;
                                                      const phonecontact =RecAccountDtl.data.getSMAccount.phonecontact;


                                                      const sendSMLn3 = async () => {
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(true);
                                                        try {
                                                          await API.graphql(
                                                            graphqlOperation(createCovCreditSeller, {
                                                              input: {
                                                                loanID:route.params.id,
                                                                itemName:itemName,
                                                                loanerLoanee:BusinessRegNos+RecPhn,
                                                                loanerLoaneeAdv:  BusinessRegNos+RecPhn+ AdvRegNo, 
                                                                buyerContact: RecPhn, 
                                                                sellerContact:BusinessRegNos,
                                                                buyerID: nationalids, 
                                                                advEmail: "None",
                                                                crtnDate:daysUpToDate,
                                                                buyerName:busNames2,
                                                                SellerName:name,
                                                                sellerID: nationalidss,  
                                                                amountSold: parseFloat(amount).toFixed(0),
                                                                interest:AmtExp,
                                                                dfltUpdate: daysUpToDate,
                                                                dfltDeadLn:dfltDeadLn,
                                                                amountexpectedBack: (TotalAmtExp3 - TotalTransacted2).toFixed(0),
                                                                amountExpectedBackWthClrnc:(TotalAmtExp3 - TotalTransacted2).toFixed(0),
                                                                amountRepaid: 0,
                                                                repaymentPeriod: RepaymtPeriod,
                                                                clearanceAmt: 0,
                                                                clearanceAmt2: 0,
                                                                giverStatus: "Biz2Biz",
                                                                lnType:"Biz2Biz",
                                                                timeExpBack: parseFloat(RepaymtPeriod) + daysUpToDate,
                                                                timeExpBack2: 61 + daysUpToDate, 
                                                                lonBala:(TotalAmtExp3 - TotalTransacted2).toFixed(0),
                                                                description: description,   
                                                                status: "LoanActive",  
                                                                advregnu: "None",   
                                                                DefaultPenaltyCredSl:defaultPenalty,
                                                                DefaultPenaltyCredSl2:0,                                                       
                                                                blOfficer:"None",
                                                                owner: owner,
                                                                installmentAmount:installmentAmount,
                                                                paymentFrequency:paymentFrequency
                                                                
                                                               
                                                              },
                                                            }),
                                                          );
                              
                              
                                                        } catch (error) {
                                                          if (error){
                                                            console.log(error)
                                                            Alert.alert("Credit Sale unsuccessful1; Retry")
                                                            return
                                                          }
                                                        }
                                                        setIsLoading(false);
                                                        await updtSendrAc3();
                                                      };
                                                      
                              
                                                      const updtSendrAc3 = async () =>{
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(true);
                                                        try{
                                                            await API.graphql(
                                                              graphqlOperation(updateBizna, {
                                                                input:{
                                                                  BusKntct:BusinessRegNos,
                                                                  
                                                                  
                                                                }
                                                              })
                                                            )
                              
                              
                                                        }
                                                        catch(error){
                                                          console.log(error)
                                                          if (error){console.log(error)
                                                            
                                                            Alert.alert("Retry or update app or call customer care")
                                                          return;}
                                                        }
                                                        setIsLoading(false);
                                                        await updtRecAc3();
                                                      }


                                                      const updtRecAc3 = async () =>{
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(true);
                                                        try{
                                                            await API.graphql(
                                                              graphqlOperation(updateBizna, {
                                                                input:{
                                                                  BusKntct:RecPhn,
                                                                  
                                                                  netEarnings:(parseFloat(netEarnings) - TotalTransacted2).toFixed(0),
                                                                   
                                                                }
                                                              })
                                                            )                              
                                                        }
                                                        catch(error){
                                                          console.log(error)
                                                          if (error){
                                                            console.log(error)
                                                            Alert.alert("Retry or update app or call customer care")
                                                          return;}
                                                        }
                                                        setIsLoading(false);
                                                        await updtComp3();
                                                      }
                              
                                                      const updtComp3 = async () =>{
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(false);
                                                        
                                                        try{
                                                            await API.graphql(
                                                              graphqlOperation(updateCompany, {
                                                                input:{
                                                                  AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                                                                      
                                                                  
                                                                  companyEarningBal:parseFloat(companyEarningBals) + UsrTransferFee2,
                                                                  companyEarning:  parseFloat(companyEarnings) + UsrTransferFee2,  
                                                                 
                                                                  ttlSellerLnsInAmtCov: TotalAmtExp3 + parseFloat(ttlSellerLnsInAmtCovs),
                                                                  
                                                                  ttlSellerLnsInTymsCov: 1 + parseFloat(ttlSellerLnsInTymsCovs),
                                                                     
                                                                  
                                                                   
                                                                  
                                                                }
                                                              })
                                                            )
                                                            
                                                            
                                                        }
                                                        catch(error){
                                                          if (error){console.log(error)
                                                            Alert.alert("Retry or update app or call customer care")
                                                      return;}
                                                        }
                                                        setIsLoading(false);
                                                        await updtLnReq3();
                                                      }
                                                      
                                                      const updtLnReq3 = async () =>{
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(false);
                                                        
                                                        try{
                                                            await API.graphql(
                                                              graphqlOperation(updateReqLoanCredSl, {
                                                                input:{
                                                                  id:route.params.id,                                                      
                                                                  status:"Approved"
                                                                }
                                                              })
                                                            )
                                                            
                                                            
                                                        }
                                                        catch(error){
                                                          console.log(error);
                                                          if (error){console.log(error)
                                                            Alert.alert("Retry or update app or call customer care")
                                                      return;}
                                                        }
                                                        Alert.alert("Success. TransactionFee:"+ UsrTransferFee2.toFixed(2) 
                                                        );
                              
                                                        Communications.textWithoutEncoding(RecPhn,'MiFedha. Hi '+ busNames2 
                                                        + ', you have been loaned goods worth Ksh. '+ parseFloat(amount).toFixed(2) +' by '
                                                      + name + ' Business. For clarification call the business owner: '
                                                      + RecPhn 
                                                      + '. The following is a break down of your repayable loan: '
                                                      + ' Cash price of the goods is Ksh. '+ parseFloat(amount).toFixed(2) 
                                                      + '. Amount you had committed to repay is Ksh. '
                                                      + amtrpayable2.toFixed(2) + '. Transaction fee is Ksh. '
                                                      + lnTrnsfrFee.toFixed(2) +  '. Total Repayable is Ksh '+ TotalAmtExp3.toFixed(2) 
                                                      + '. Thank you.');
                                                        setIsLoading(false);
                                                        
                                                      } 
                                                      
                                                      const sendSMLn2 = async () => {
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(true);
                                                        try {
                                                          await API.graphql(
                                                            graphqlOperation(createCovCreditSeller, {
                                                              input: {
                                                                itemName:itemName,
                                                                loanID:route.params.id,
                                                                loanerLoanee:userInfo.attributes.email+RecPhn,
                                                                loanerLoaneeAdv:  userInfo.attributes.email+RecPhn+ "AdvRegNo",
                                                                buyerContact: RecPhn,
                                                                clearanceAmt: 0,
                                                                clearanceAmt2: 0,
                                                                sellerContact:userInfo.attributes.email,
                                                                crtnDate:daysUpToDate,
                                                                giverStatus: "Pal2Biz",
                                                                buyerID: nationalids,
                                                                advEmail: "None",
                                                                advregnu: "None",
                                                                buyerName:busNames2,
                                                                SellerName:name,
                                                                sellerID: nationalidss,
                                                                dfltDeadLn:dfltDeadLn,
                                                                interest:AmtExp,
                                                                blOfficer:"None",
                                                                lnType:"Pal2Biz",                              
                                                                amountSold: parseFloat(amount).toFixed(0),
                                                                dfltUpdate: daysUpToDate,
                                                                amountexpectedBack: (TotalAmtExp2 - TransCost2).toFixed(0),
                                                                amountExpectedBackWthClrnc:(TotalAmtExp2 - TransCost2).toFixed(0),
                                                                amountRepaid: 0,
                                                                repaymentPeriod: RepaymtPeriod,
                                                                timeExpBack: parseFloat(RepaymtPeriod) + daysUpToDate,
                                                                timeExpBack2: 61 + daysUpToDate,
                                                                
                                                                lonBala:(TotalAmtExp2 - TransCost2).toFixed(0),
                                                                
                                                                installmentAmount:installmentAmount,
                                                                paymentFrequency:paymentFrequency,
                                                                
                                                                description: description,
                                                                status: "LoanActive",
                                                                DefaultPenaltyCredSl:defaultPenalty,
                                                                DefaultPenaltyCredSl2:0,
                                                                
                                                                owner: owner,
                                                               
                                                              },
                                                            }),
                                                          );
                              
                              
                                                        } catch (error) {
                                                          if (error){
                                                            console.log(error)
                                                            Alert.alert("Credit Sale unsuccessful2; Retry")
                                                            return
                                                          }
                                                        }
                                                        setIsLoading(false);
                                                        await updtSendrAc2();
                                                      };
                                                      
                              
                                                      const updtSendrAc2 = async () =>{
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(true);
                                                        try{
                                                            await API.graphql(
                                                              graphqlOperation(updateSMAccount, {
                                                                input:{
                                                                  awsemail:userInfo.attributes.email,
                                                                  
                                                                  
                                                                }
                                                              })
                                                            )
                              
                              
                                                        }
                                                        catch(error){
                                                          console.log(error)
                                                          if (error){
                                                            console.log(error)
                                                            Alert.alert("Retry or update app or call customer care")
                                                          return;}
                                                        }
                                                        setIsLoading(false);
                                                        await updtRecAc2();
                                                      }
                                                      const updtRecAc2 = async () =>{
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(true);
                                                        try{
                                                            await API.graphql(
                                                              graphqlOperation(updateBizna, {
                                                                input:{
                                                                  BusKntct:RecPhn,
                                                                  
                                                                  netEarnings:(parseFloat(netEarnings) - TransCost2).toFixed(0),                                 
                                                                  
                                                                                                  
                                                                  
                                                                }
                                                              })
                                                            )                              
                                                        }
                                                        catch(error){
                                                          console.log(error)
                                                          if (error){
                                                            console.log(error)
                                                            Alert.alert("Retry or update app or call customer care")
                                                          return;}
                                                        }
                                                        setIsLoading(false);
                                                        await updtComp2();
                                                      }
                              
                                                      const updtComp2 = async () =>{
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(false);
                                                        
                                                        try{
                                                            await API.graphql(
                                                              graphqlOperation(updateCompany, {
                                                                input:{
                                                                  AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                                                                      
                                                                  
                                                                  companyEarningBal:parseFloat(companyEarningBals) + parseFloat(userLoanTransferFees)*parseFloat(amount),
                                                                  companyEarning:  parseFloat(companyEarnings) + parseFloat(userLoanTransferFees)*parseFloat(amount),  
                                                                 
                                                                  ttlSellerLnsInAmtCov: TotalAmtExp2 + parseFloat(ttlSellerLnsInAmtCovs),
                                                                  
                                                                  ttlSellerLnsInTymsCov: 1 + parseFloat(ttlSellerLnsInTymsCovs),
                                                                     
                                                                  
                                                                   
                                                                  
                                                                }
                                                              })
                                                            )
                                                            
                                                            
                                                        }
                                                        catch(error){
                                                          if (error){
                                                            console.log(error)
                                                            Alert.alert("Retry or update app or call customer care")
                                                      return;}
                                                        }
                                                        setIsLoading(false);
                                                        await updtLnReq2();
                                                      }
                                                      
                                                      const updtLnReq2 = async () =>{
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(false);
                                                        
                                                        try{
                                                            await API.graphql(
                                                              graphqlOperation(updateReqLoanCredSl, {
                                                                input:{
                                                                  id:route.params.id,                                                      
                                                                  status:"Approved"
                                                                }
                                                              })
                                                            )
                                                            
                                                            
                                                        }
                                                        catch(error){
                                                          console.log(error);
                                                          if (error){
                                                            console.log(error)
                                                            Alert.alert("Retry or update app or call customer care")
                                                      return;}
                                                        }
                                                        Alert.alert("Success. TransactionFee:"+ (parseFloat(userLoanTransferFees)*parseFloat(amount)).toFixed(2) 
                                                        );
                              
                                                        Communications.textWithoutEncoding(RecPhn,'MiFedha. Hi '+ busNames2 
                                                        + ', you have been loaned services/goods worth Ksh. '+ parseFloat(amount).toFixed(2) +' by '
                                                      + name + '. For clarification call the Loaner: '
                                                      + phonecontact 
                                                      + '. The following is a break down of your repayable loan: '
                                                      + ' Cash price of the goods is Ksh. '+ parseFloat(amount).toFixed(2) 
                                                      + '. Amount you had committed to repay is Ksh. '
                                                      + amtrpayable2.toFixed(2) + '. Transaction fee is Ksh. '
                                                      + lnTrnsfrFee.toFixed(2) +  '. Total Repayable is Ksh '+ TotalAmtExp2.toFixed(2) 
                                                      + '. Thank you.');
                                                        setIsLoading(false);
                                                        
                                                      }  

                                                      const fetchAdv = async () =>{
                                                        if(isLoading){
                                                          return;
                                                        }
                                                        setIsLoading(true);
                                                        try{
                                            
                                                          const AdvDtls:any = await API.graphql(
                                                            graphqlOperation(getAdvocate,
                                                              {advregnu: advLicNo}),
                                                              
                                                          );
                                                          const advTtlAern = AdvDtls.data.getAdvocate.TtlEarnings;
                                                          const advBl = AdvDtls.data.getAdvocate.advBal;
                                                          const advStts = AdvDtls.data.getAdvocate.status;
                                                          const namesssssss = AdvDtls.data.getAdvocate.name;
          


                                                     
                        const sendSMLn = async () => {
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try {
                            await API.graphql(
                              graphqlOperation(createCovCreditSeller, {
                                input: {
                                  itemName:itemName,
                                  loanID:route.params.id,
                                  buyerID: nationalids,
                                  sellerID: nationalidss,
                                  clearanceAmt: 0,
                                  clearanceAmt2: 0,
                                  sellerContact:userInfo.attributes.email,
                                  buyerContact: RecPhn, 
                                  loanerLoanee:userInfo.attributes.email+RecPhn,
                                  loanerLoaneeAdv:  userInfo.attributes.email+RecPhn+ AdvRegNo,                                   
                                  amountSold: parseFloat(amount).toFixed(0),
                                  amountexpectedBack: (TotalAmtExp - TransCost).toFixed(0),
                                  amountExpectedBackWthClrnc:(TotalAmtExp - TransCost).toFixed(0),
                                  amountRepaid: 0,
                                  dfltDeadLn:dfltDeadLn,
                                  crtnDate:daysUpToDate,
                                  buyerName:busNames2,
                                  interest:AmtExp,
                                  giverStatus: "Pal2Biz",
                                  lnType:"Pal2Biz",
                                  SellerName:name,
                                  lonBala:(TotalAmtExp - TransCost).toFixed(0),
                                  repaymentPeriod: RepaymtPeriod,
                                  timeExpBack: parseFloat(RepaymtPeriod) + daysUpToDate,
                                  timeExpBack2: 61 + daysUpToDate,
                                  dfltUpdate: daysUpToDate,
                                  advregnu: advLicNo,
                                  description: description,
                                  DefaultPenaltyCredSl:defaultPenalty,
                                  DefaultPenaltyCredSl2:0,
                                  status: "LoanActive",
                                  owner: owner,
                                  advEmail:AdvEmail,
                                  blOfficer:"None",
                                  installmentAmount:installmentAmount,
                                    paymentFrequency:paymentFrequency
                                },
                              }),
                            );


                          } catch (error) {
                            if (error){
                              console.log(error)
                              Alert.alert("Credit Sale unsuccessful3; Retry")
                              return
                            }
                          }
                          setIsLoading(false);
                          await updtSendrAc();
                        };

                        sendSMLn();
                        

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
                                    
                                  }
                                })
                              )


                          }
                          catch(error){
                            console.log(error)
                            if (error){
                              console.log(error)
                              Alert.alert("Retry or update app or call customer care")
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
                                graphqlOperation(updateBizna, {
                                  input:{
                                    BusKntct:RecPhn,
                                    
                                    netEarnings:(parseFloat(netEarnings) - TransCost).toFixed(0),
                                          
                                    
                                  }
                                })
                              )                              
                          }
                          catch(error){
                            console.log(error)
                            if (error){
                              console.log(error)
                              Alert.alert("Retry or update app or call customer care")
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
                                        
                                    ttlCompCovEarnings:CompCovAmt + parseFloat(ttlCompCovEarningss),
                                    AdvEarningBal:AdvCovAmt + parseFloat(AdvEarningBals),                                                                                                                                                     
                                    AdvEarning:AdvCovAmt + parseFloat(AdvEarnings),
                                    companyEarningBal:CompCovAmt + parseFloat(companyEarningBals) + parseFloat(userLoanTransferFees)*parseFloat(amount),
                                    companyEarning: CompCovAmt + parseFloat(companyEarnings) + parseFloat(userLoanTransferFees)*parseFloat(amount),  
                                   
                                    ttlSellerLnsInAmtCov: TotalAmtExp + parseFloat(ttlSellerLnsInAmtCovs),
                                    
                                    ttlSellerLnsInTymsCov: 1 + parseFloat(ttlSellerLnsInTymsCovs),
                                       
                                    
                                     
                                    
                                  }
                                })
                              )
                              
                              
                          }
                          catch(error){
                            if (error){
                              console.log(error)
                              
                              Alert.alert("Retry or update app or call customer care")
                        return;}
                          }
                          setIsLoading(false);
                          await updtAdv();
                        }
                        const updtAdv = async () =>{
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try{
                              await API.graphql(
                                graphqlOperation(updateAdvocate, {
                                  input:{
                                    advregnu: advLicNo,
                                    advBal: AdvCovAmt + parseFloat(advBl) ,
                                    TtlEarnings:AdvCovAmt + parseFloat(advTtlAern),                                 
                                    
                                  }
                                })
                              )
                          }
                          catch(error){
                            if (error){
                              console.log(error)
                              
                              Alert.alert("Retry or update app or call customer care")
      return;}
                          }
                          
                         ;
                         await updtLnReq();
                          setIsLoading(false);
                        }

                        const updtLnReq = async () =>{
                          if(isLoading){
                            return;
                          }
                          setIsLoading(false);
                          
                          try{
                              await API.graphql(
                                graphqlOperation(updateReqLoanCredSl, {
                                  input:{
                                    id:route.params.id,                                                      
                                    status:"Approved"
                                  }
                                })
                              )
                              
                              
                          }
                          catch(error){
                            console.log(error);
                            if (error){
                              console.log(error)
                              Alert.alert("Retry or update app or call customer care")
                        return;}
                          }
                          Alert.alert("Success. AdvocateFee:" 
                          +(parseFloat(CoverageFees)*parseFloat(amount)).toFixed(2) 
                          + ", TransactionFee:"+ (parseFloat(userLoanTransferFees)*parseFloat(amount)).toFixed(2) 
                          );

                          Communications.textWithoutEncoding(RecPhn,'MiFedha. Hi '+ busNames2 
                          + ', you have been loaned Services/goods worth Ksh. '+ parseFloat(amount).toFixed(2) +' by '
                        + name + '. For clarification call the loaner: '
                        + phonecontact 
                        + '. The following is a break down of your repayable loan: '
                        + ' Cash price of the goods is Ksh. '+ parseFloat(amount).toFixed(2) 
                        + '. Amount you had committed to repay is Ksh. '
                        + amtrpayable.toFixed(2) + '. Transaction fee is Ksh. '
                        + lnTrnsfrFee.toFixed(2) + '. Advocacy Fee is Ksh. '
                        + ttlCovFeeAmount.toFixed(2) + '. Total Repayable is Ksh '+ TotalAmtExp.toFixed(2) 
                        + '. Thank you.');
                          setIsLoading(false);
                          
                        }       
                      
                        
                        
                        
                        
                      }
                      catch (e){
                        if (e){
                          console.log(e)
                          Alert.alert("Error! No advocate involved during request")
                return;}
                      }
                      setIsLoading(false);
                    }
                    if (userInfo.attributes.sub!==owner) {
                      Alert.alert("Please first create a main account")
                      return;
                    }  else
                     if (parseFloat(noBL) > parseFloat(maxBLss)){Alert.alert('Unsuccessful....Apologies. Liase with the Loaned');
                  return;
                }
                else if(statusNumber === 0 && advLicNo != "None"){Alert.alert('Advocate has not yet witnessed');                  
              }
                    
                    else if(BusinessRegNos === RecPhn){Alert.alert('You cannot Loan Yourself');}
                    else if(status !== "AccountActive"){Alert.alert('Receiver account is inactive');}
                    else if(status === "Approved"){Alert.alert('Loan already granted');}

                   
                    else if (
                      parseFloat(netEarnings) < TransCost && advLicNo != " "
                    ) {Alert.alert("Unsuccessful!."+ "Buyer top up "+ ((TransCost) - parseFloat(netEarnings)).toFixed(2) + ' more');}

                    else if (
                      parseFloat(netEarnings) < TransCost2 && advLicNo == " "
                    ) {Alert.alert("Unsuccessful."+ "Buyer top up "+ ((TransCost2) - parseFloat(netEarnings)).toFixed(2) + ' more');}
                    
                  
                    
                    else if(pwz !==SnderPW){Alert.alert('Enter correct Main Account Password');}
                    else if (RecobjectionStatus === "Objected")
                    {
                      Alert.alert ("Buyer account is locked")
                    }
                    

                    else if (Lonees1.data.listSMLoansCovereds.items.length > 0 
                          
                      ||
                      Lonees3.data.listCovCreditSellers.items.length > 0 
                      ||
                      
                      Lonees5.data.listCvrdGroupLoans.items.length > 0 
                      
                      

                    
                      ) {
                        SndChmMmbrMny();
                    } 
                    
                    else if(advLicNo == "None" && netEarnings < TransCost2){sendSMLn3();}

                    else if(advLicNo == "None" && netEarnings > TransCost2){sendSMLn2();}
                    
                     else {
                    
                    await fetchAdv();
                     }         
                    }       
                    catch(e) {     
                      if (e){
                        console.log(e)
                        Alert.alert("Error! ")
      return;}                 
                    }
                    setIsLoading(false);
                    }                    
                      await FetchWrkrDtls2();  

                    }       
                    catch(e) {     
                      if (e){
                        console.log(e)
                        Alert.alert("Error! ")
      return;}                 
                    }
                    setIsLoading(false);
                    }                    
                      await FetchWrkrDtls();  
                      
                   
                  
                    }
                    catch (e){
                      if (e){
                        console.log(e)
                        Alert.alert("Retry or update app or call customer care")
              return;}
                    }
                    setIsLoading(false);
                  }

                  await fetchRecUsrDtls();

           

          
        
        } catch (e) {
          if (e){
            console.log(e)
            Alert.alert("Retry or update app or call customer care")
      return;}
        } 
        setIsLoading(false);       
      };
      await fetchCompDtls();
    
    }     
    catch (e) {
      console.log(e)
      if (e){
        console.log(e)
        Alert.alert("Retry or update app or call customer care")
      return;}
         
    }   
    setIsLoading(false);
    };
    
    await fetchCLChm();
    
    
    
    }     
    catch (e) {
      console.log(e)
      if (e){
        console.log(e)
        Alert.alert("Retry or update app or call customer care")
      return;}
         
    }   
    setIsLoading(false);
    };
    
    await fetchCLCrdSl();

  }     
  catch (e) {
    console.log(e)
    if (e){
      console.log(e)
      Alert.alert("Retry or update app or call customer care")
    return;}
       
  }   
  setIsLoading(false);
  };
  
  await fetchCvLnSM();
      
    } catch (e) {
      console.log(e)
      if (e){
        console.log(e)
        Alert.alert("Retry or update app or call customer care")
      return;}
  };
      setIsLoading(false);
      setSenderNatId('');
      setAmount("");
      setRecNatId('');
      setAdvRegNo("");
      setAmtExp("");
      setDesc("");
      setSnderPW("");
      setRepaymtPeriod("");
      setRecAccCode("");
     
      setItmNm("");
      setItmSrlNu("");
      setDfltPnlty("")
}

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
      const ItmSrlNus=ItmSrlNu
        if(!ItmSrlNus && ItmSrlNus!=="")
        {
          setItmSrlNu("");
          return;
        }
        setItmSrlNu(ItmSrlNus);
        }, [ItmSrlNu]
         );

     useEffect(() =>{
      const ItmNms=ItmNm
        if(!ItmNms && ItmNms!=="")
        {
          setItmNm("");
          return;
        }
        setItmNm(ItmNms);
        }, [ItmNm]
         );

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
           <Text style={styles.title}>Enter Password Below</Text>
         </View>

         
         
         <View style={styles.sendAmtView}>
           <TextInput
           placeholder='User Main Account PassWord'
             value={SnderPW}
             onChangeText={setSnderPW}
             secureTextEntry = {true}
             style={styles.sendAmtInput}
             editable={true}></TextInput>
           
         </View>


         <TouchableOpacity
           onPress={fetchCredSlLnReq}
           style={styles.sendAmtButton}>
           <Text style={styles.sendAmtButtonText}>Click to Loan</Text>
           {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
         </TouchableOpacity>

         
       </ScrollView>
      </View>
             
    
  );
};

export default CovCredSls;