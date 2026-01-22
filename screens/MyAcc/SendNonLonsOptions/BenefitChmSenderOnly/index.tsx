import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  
  createSMLoansCovered,
  
  
  
  createNonLoans,
  
  updateCompany,
  
  updateSMAccount,
  createBenefitContributions2,
  createMessages,
  sendNotification,
  
} from '../../../../src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  
  getCompany,
  getSMAccount,
  listCovCreditSellers,
  listCvrdGroupLoans,
  listSMLoansCovereds,
  
  
} from '../../../../src/graphql/queries';

import {useNavigation} from '@react-navigation/native';


import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';



const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
 
  const [amounts, setAmount] = useState("");
  
  const [Desc, setDesc] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
 
  const[isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()
  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps")
 }
  
  
 
    const fetchCvLnSM = async () => {
      

      const userInfo = await Auth.currentAuthenticatedUser();

      if(isLoading){
        return;
      }
      setIsLoading(true);

      try {
        const Lonees1:any = await API.graphql(graphqlOperation(listSMLoansCovereds, 
          { filter: {
              and: {
                status: { eq: "LoanBL"},
                lonBala: { gt: 0},
                loaneeEmail: { eq: userInfo.attributes.email},
              }
            }}
            ));

            
        
                    const fetchCLCrdSl = async () => {
                      
                      try {
                        const Lonees3:any = await API.graphql(graphqlOperation(listCovCreditSellers, 
                          { filter: {
                              and: {
                                status: { eq: "LoanBL"},
                        lonBala: { gt: 0},
                        buyerContact: { eq: userInfo.attributes.email},
                              }
                            }}
                            ));

                           

                                    const fetchCLChm = async () => {
                                     
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

  const fetchSenderUsrDtls = async () => {
    
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}),
      );

      const SenderUsrBal =accountDtl.data.getSMAccount.balance;
      const usrPW =accountDtl.data.getSMAccount.pw;
      const usrAcActvStts =accountDtl.data.getSMAccount.acStatus;
      const SenderSub =accountDtl.data.getSMAccount.owner;
      const ttlNonLonsSentSMs =accountDtl.data.getSMAccount.ttlNonLonsSentSM;
      const loanLimits =accountDtl.data.getSMAccount.loanLimit;
     
      
      const names =accountDtl.data.getSMAccount.name;
      const owner =accountDtl.data.getSMAccount.owner;
      const senderbeneficiary =accountDtl.data.getSMAccount.beneficiary;
      const SenderbenefitsAmount =accountDtl.data.getSMAccount.benefitsAmount;
      const SenderbeneficiaryType =accountDtl.data.getSMAccount.beneficiaryType;
    
console.log(userInfo.attributes.email)
console.log(SenderbeneficiaryType)

      const fetchSenderBeneficiaryUsrDtls = async () => {
       
        try {
          const accountDtlx:any = await API.graphql(
            graphqlOperation(getSMAccount, {awsemail: senderbeneficiary}),
          );
    
          const SenderBeneficiarySenderUsrBal =accountDtlx.data.getSMAccount.balance;
          
          const senderbeneficiaryAmt =accountDtlx.data.getSMAccount.beneficiaryAmt;
          console.log(senderbeneficiaryAmt)
      
      const fetchCompDtls = async () => {
        
        try {
          const CompDtls:any = await API.graphql(
            graphqlOperation(getCompany, {
              AdminId: "BaruchHabaB'ShemAdonai2",
            }),
          );
          
            
          const p2pBenCom = CompDtls.data.getCompany.p2pBenCom;
          const UsrTransferFee = CompDtls.data.getCompany.userTransferFee;
          const UsrTransferFeeAmt = UsrTransferFee*parseFloat(amounts);
          const UsrTransferFee2 = parseFloat(SenderUsrBal) -parseFloat(amounts);
          const TotalTransacted = parseFloat(amounts)  + parseFloat(UsrTransferFee)*parseFloat(amounts);
          const TotalTransacted2 = parseFloat(amounts)  + UsrTransferFee2;
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact; 
          const PalBenefits = parseFloat(p2pBenCom) *  UsrTransferFeeAmt;
          const CompEarnings =  UsrTransferFeeAmt - (2*PalBenefits)     
          
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
          const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM; 
          
          
         console.log(CompEarnings)
                    
          const fetchRecUsrDtls = async () => {
           
            try {
                const RecAccountDtl:any = await API.graphql(
                    graphqlOperation(getSMAccount, {awsemail: RecNatId}),
                    );
                    const RecUsrBal =RecAccountDtl.data.getSMAccount.balance;                    
                    const usrAcActvSttss =RecAccountDtl.data.getSMAccount.acStatus; 
                    const ttlNonLonsRecSMs =RecAccountDtl.data.getSMAccount.ttlNonLonsRecSM;
                    const ReceiverName =RecAccountDtl.data.getSMAccount.name;
                    const ttlDpstSMs =RecAccountDtl.data.getSMAccount.ttlDpstSM;
                    const TtlWthdrwnSMs =RecAccountDtl.data.getSMAccount.TtlWthdrwnSM;
                    const MaxAcBals =RecAccountDtl.data.getSMAccount.MaxAcBal;
                    const phonecontact =RecAccountDtl.data.getSMAccount.phonecontact;
                    const receiverbeneficiary =RecAccountDtl.data.getSMAccount.beneficiary;
                    const ReceiverbeneficiaryType =RecAccountDtl.data.getSMAccount.beneficiaryType;
                    const ReceiverbenefitsAmount =RecAccountDtl.data.getSMAccount.benefitsAmount;

                    console.log(ReceiverbeneficiaryType)


                    const fetchRecUsrDtlsBeneficiary = async () => {
                      
                      try {
                          const RecAccountDtlx:any = await API.graphql(
                              graphqlOperation(getSMAccount, {awsemail: receiverbeneficiary}),
                              );
                              const RecBeneficiaryUsrBal =RecAccountDtlx.data.getSMAccount.balance;                    
                            
                              const receiverbeneficiaryAmt =RecAccountDtlx.data.getSMAccount.beneficiaryAmt;
                    console.log(RecBeneficiaryUsrBal)
                  
                    const sendSMNonLn = async () => {
                     
                      try {
                        const response1 = await API.graphql(
                          graphqlOperation(createNonLoans, {
                            input: {
                              recPhn: RecNatId,
                              senderPhn: userInfo.attributes.email,                                  
                              amount: parseFloat(amounts).toFixed(0),                              
                              description: Desc,
                              RecName:ReceiverName,
                              SenderName:names,
                              status: "SMNonLons",
                              owner: userInfo.attributes.sub
                            },
                          }),
                        );

                        await API.graphql(graphqlOperation(createMessages, {
                                    input: { senderEmail: RecNatId, 
                                      messageBody: `${names} has sent you Ksh. ${amounts}. The money has been deposited in your main account`
                        
                                     }
                                  }));
                                  await API.graphql(graphqlOperation(sendNotification, {
                                    riderEmail: RecNatId,
                                    title: 'MiFedha: Cash',
                                    body: `${names} has sent you Ksh. ${amounts}. The money has been deposited in your main account`,
                                  }));

                        if (response1?.data?.createNonLoans)
                        {
                          Alert.alert("Money Successfully sent")
                          await updtSendrAc();
                        }

else{
Alert.alert("Error! retry or update app")
}

                      } catch (error) {
                        console.log(error)
                        
                      }
                     
                      
                    };

                    


                    const updtSendrAc = async () =>{
                     
                      try{
                          const response2 = await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:userInfo.attributes.email,
                                ttlNonLonsSentSM: (parseFloat(ttlNonLonsSentSMs)+parseFloat(amounts)).toFixed(0),
                                balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0) 
                               
                                
                              }
                            })
                          )
                          if (response2?.data?.updateSMAccount)
                          {
                            await updtRecAc();
                          }
else{
  Alert.alert("Error! retry or update app")
}

                      }
                      catch(error){
                        console.log(error)
                        
                      }
                      
                     
                    }
          
                    const updtRecAc = async () =>{
                      
                      try{
                        const response3 =  await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:RecNatId,
                                ttlNonLonsRecSM: (parseFloat(ttlNonLonsRecSMs) + parseFloat(amounts)).toFixed(0) ,
                                balance:(parseFloat(RecUsrBal) + parseFloat(amounts)).toFixed(0)                                     
                                                                
                                
                              }
                            })
                          )     
                                                   if (response3?.data?.updateSMAccount)
                                                   {
                                                    await updtSendrBeneficiaryAc();
                                                   }
                                                   else{
                                                    Alert.alert("error! retry or update app")
                                                   }
                      }
                      catch(error){
                        console.log(error)
                        
                      }
                     
                      
                    }

                    const updtSendrBeneficiaryAc = async () =>{
                      
                      try{
                        const response4 =  await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:senderbeneficiary,
                                balance:(PalBenefits + parseFloat(SenderBeneficiarySenderUsrBal)).toFixed(0),
                                beneficiaryAmt: (PalBenefits + parseFloat(senderbeneficiaryAmt)).toFixed(0),
                                                               }
                            })
                          )
                          if (response4?.data?.updateSMAccount)
                          {
                            await updtRecBeneficiaryAc();
                          }
                          else
                          {
                            Alert.alert("Alert! retry or update app")
                          }
                      }
                      catch(error){
                        console.log(error)
                        
                      }
                      
                      


                    }

                    const updtRecBeneficiaryAc = async () =>{
                    
                      try{
                        const response5 =  await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:receiverbeneficiary,
                                balance:(PalBenefits + parseFloat(RecBeneficiaryUsrBal)).toFixed(0),
                                beneficiaryAmt: (PalBenefits + parseFloat(receiverbeneficiaryAmt)).toFixed(0),
                                                         
                                
                              }
                            })
                          )
                          if (response5?.data?.updateSMAccount)
                          {
                            await updtComp();
                          }

                          else {
                            Alert.alert("Error! retry or update app")
                          }
                      }
                      catch(error){
                        console.log(error)
                        
                      }
                     
                      
                    }

                   

                   

                    const updtComp = async () =>{
                     
                      try{
                        const response6 =  await API.graphql(
                            graphqlOperation(updateCompany, {
                              input:{
                                AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                               
                                companyEarningBal:(CompEarnings + parseFloat(companyEarningBals)),
                                companyEarning: CompEarnings + parseFloat(companyEarnings),                                                    
                                
                                ttlNonLonssRecSM: parseFloat(amounts) + parseFloat(ttlNonLonssRecSMs),
                                ttlNonLonssSentSM: parseFloat(amounts) + parseFloat(ttlNonLonssSentSMs),
                                
                              }
                            })
                          )
                          if (response6?.data?.updateCompany)
                          {
                            Alert.alert("Amount:Ksh. "+parseFloat(amounts).toFixed(0) + ". Transaction fee: Ksh. "+ UsrTransferFeeAmt.toFixed(0)
                          );
                          Communications.textWithoutEncoding(phonecontact,'Hi '
                                  + ReceiverName + ', ' +names + ' has sent you a non loan of Ksh. ' 
                                  + amounts 
                                  +'. For clarification call the sender '
                                + userInfo.attributes.phone_number + '. Thank you. MiFedha')
                                
                               
                          }
                          else{
                            Alert.alert(
                              "Error! retry or update app"
                            )
                          }
                      }
                      catch(error){
                        console.log(error)
                       
                      }
                      
                    }

                    const sendSMNonLn1 = async () => {
                     
                      try {
                       const responx1 = await API.graphql(
                          graphqlOperation(createNonLoans, {
                            input: {
                              recPhn: RecNatId,
                              senderPhn: userInfo.attributes.email,                                  
                              amount: parseFloat(amounts).toFixed(0),                              
                              description: Desc,
                              RecName:ReceiverName,
                              SenderName:names,
                              status: "SMNonLons",
                              owner: userInfo.attributes.sub
                            },
                          }),
                        );

                        await API.graphql(graphqlOperation(createMessages, {
                                    input: { senderEmail: RecNatId, 
                                      messageBody: `${names} has sent you Ksh. ${amounts}. The money has been deposited in your main account`
                        
                                     }
                                  }));
                                  await API.graphql(graphqlOperation(sendNotification, {
                                    riderEmail: RecNatId,
                                    title: 'MiFedha: Cash',
                                    body: `${names} has sent you Ksh. ${amounts}. The money has been deposited in your main account`,
                                  }));

                        if (responx1?.data?.createNonLoans)
                        {
                          await updtSendrAc1();
                        }
                        else{
                          Alert.alert("Error! retry or update app ")
                        }

                      } catch (error) {
                        console.log(error)
                        
                      }
                      
                      
                    };

                   
                    const updtSendrAc1 = async () =>{
                      
                      try{
                        const responx2 =  await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:userInfo.attributes.email,
                                ttlNonLonsSentSM: (parseFloat(ttlNonLonsSentSMs)+parseFloat(amounts)).toFixed(0),
                                balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0), 
                                benefitsAmount: (SenderbenefitsAmount + PalBenefits).toFixed(0)
                                
                              }
                            })
                          )
                          if (responx2?.data?.updateSMAccount)
                          {
                            await updtRecAc1();
                          }

                        else{
                          Alert.alert("Error! retry or update app ")
                        }

                      }
                      catch(error){
                        console.log(error)
                        
                      }
                      
                      
                    }
          
                    const updtRecAc1 = async () =>{
                      
                      try{
                        const responx3 = await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:RecNatId,
                                ttlNonLonsRecSM: (parseFloat(ttlNonLonsRecSMs) + parseFloat(amounts)).toFixed(0) ,
                                balance:(parseFloat(RecUsrBal) + parseFloat(amounts)).toFixed(0)                                     
                                                                
                                
                              }
                            })
                          )    
                          
                          if (responx3?.data?.updateSMAccount)
                          {
                            await updtSendrBeneficiaryAc1();
                          }
                          else{
                            Alert.alert("Error! retry or update app ")
                          }
                      }
                      catch(error){
                        console.log(error)
                        
                      }
                     
                    }

                    const updtSendrBeneficiaryAc1 = async () =>{
                      
                      try{
                   const responx4 = await API.graphql(
                                graphqlOperation(createBenefitContributions2, {
                                input:{
                                                                                          benefitsID: "String",
                                                                                          benefactorAc: userInfo.attributes.email,
                                                                                          /*BenefactorName*/
                                                                                          benefactorPhone: names,
                                                                                          beneficiaryAc: RecNatId,
                                                                                          beneficiaryPhone: "String",
                                                                                          creatorEmail: "String",
                                                                                          prodName: "String",
                                                                                          creatorName: "String",
                                                                                          owner: userInfo.attributes.sub,
                                                                                          prodCost: 0,
                                                                                          benefitsAmount: PalBenefits.toFixed(0),
                                                                                          beneficiaryType: "Pal",
                                                                                          prodDesc: "String",
                                                                                          benefitStatus: "Active",
                                                                                          amount: PalBenefits.toFixed(0)                  
                                                                                          
                                                                                        }
                                                                                      })
                                                                                    )                

                                                                                  if (
                                                                                    responx4?.data?.createBenefitContributions2)
                                                                                    {
                                                                                      await updtRecBeneficiaryAc1();
                                                                                    }
                                                                                    else
                                                                                  {  Alert.alert("Error! retry or update app ")
                                                                                  }
                      }
                      catch(error){
                        
                      }
                     
                      


                    }

                    const updtRecBeneficiaryAc1 = async () =>{
                     
                      try{
                        const responx5 = await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:receiverbeneficiary,
                                balance:(PalBenefits + parseFloat(RecBeneficiaryUsrBal)).toFixed(0),
                                beneficiaryAmt: (PalBenefits + parseFloat(receiverbeneficiaryAmt)).toFixed(0),
                                  }
                            })
                          )
                          if (responx5?.data?.updateSMAccount)
                          {
                            await updtComp1();
                          }
                          else{
                            Alert.alert(
                              "Error! please retry or update app"
                            )
                          }
                      }
                      catch(error){
                        
                      }
                      
                      
                    }

                    

                    const updtComp1 = async () =>{
                    
                     
                      try{
                        const responx6 = await API.graphql(
                            graphqlOperation(updateCompany, {
                              input:{
                                AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                               
                                companyEarningBal:(CompEarnings + parseFloat(companyEarningBals)),
                                companyEarning: CompEarnings + parseFloat(companyEarnings),                                                    
                                
                                ttlNonLonssRecSM: parseFloat(amounts) + parseFloat(ttlNonLonssRecSMs),
                                ttlNonLonssSentSM: parseFloat(amounts) + parseFloat(ttlNonLonssSentSMs),
                                
                              }
                            })
                          )
                         if (responx6?.data?.updateCompany) 
                         {
                          Alert.alert("Amount:Ksh. "+parseFloat(amounts).toFixed(0) 
                          + ". Transaction fee: Ksh. "+ UsrTransferFeeAmt.toFixed(0)
                        );
                        Communications.textWithoutEncoding(phonecontact,'Hi '
                                + ReceiverName + ', ' +names + ' has sent you a non loan of Ksh. ' 
                                + amounts 
                                +'. For clarification call the sender '
                              + userInfo.attributes.phone_number + '. Thank you. MiFedha')
                              
                         }
                         else{
                          Alert.alert(
                            "Error! retry or update app"
                          )
                         }
                      }
                      catch(error){
                        console.log(error)
                        
                      }
                      
                           
                    }
                    
                    const sendSMNonLn2 = async () => {

                      try {
                      const responz1 = await API.graphql(
                          graphqlOperation(createNonLoans, {
                            input: {
                              recPhn: RecNatId,
                              senderPhn: userInfo.attributes.email,                                  
                              amount: parseFloat(amounts).toFixed(0),                              
                              description: Desc,
                              RecName:ReceiverName,
                              SenderName:names,
                              status: "SMNonLons",
                              owner: userInfo.attributes.sub
                            },
                          }),
                        );

                        await API.graphql(graphqlOperation(createMessages, {
                                    input: { senderEmail: RecNatId, 
                                      messageBody: `${names} has sent you Ksh. ${amounts}. The money has been deposited in your main account`
                        
                                     }
                                  }));
                                  await API.graphql(graphqlOperation(sendNotification, {
                                    riderEmail: RecNatId,
                                    title: 'MiFedha: Cash',
                                    body: `${names} has sent you Ksh. ${amounts}. The money has been deposited in your main account`,
                                  }));


                        if (responz1?.data?.createNonLoans){
                          await updtSendrAc2();
                        }
                        else {
                          Alert.alert("Error! retry or update app")
                        }
                      } catch (error) {
                        console.log(error)
                        
                      }
                      
                      
                    };

                    


                    const updtSendrAc2 = async () =>{
                     
                      try{
                        const responz2 =  await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:userInfo.attributes.email,
                                ttlNonLonsSentSM: (parseFloat(ttlNonLonsSentSMs)+parseFloat(amounts)).toFixed(0),
                                balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0), 
                                
                                
                              }
                            })
                          )
                          if (responz2?.data?.updateSMAccount)
                          {
                            await updtRecAc2();
                          }
                          else {
                            Alert.alert(
                              "Error! retry or update app"
                            )
                          }
                      }
                      catch(error){
                        console.log(error)
                        
                      }
                     
                      
                    }
          
                    const updtRecAc2 = async () =>{
                      
                      try{
                        const responz3 = await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:RecNatId,
                                ttlNonLonsRecSM: (parseFloat(ttlNonLonsRecSMs) + parseFloat(amounts)).toFixed(0) ,
                                balance:(parseFloat(RecUsrBal) + parseFloat(amounts)).toFixed(0),                                     
                                benefitsAmount: (ReceiverbenefitsAmount + PalBenefits).toFixed(0)                              
                                
                              }
                            })
                          ) 
                          if (responz3?.data?.updateSMAccount) 
                            {
                              await updtSendrBeneficiaryAc2();
                            }  
                            else{
                              Alert.alert("Retry or update app or call customer care")
                            }                          
                      }
                      catch(error){
                        console.log(error)
                       
                      }
                     
                      
                    }

                    const updtSendrBeneficiaryAc2 = async () =>{
                      
                      try{
                    const responz4 = await API.graphql(
                                graphqlOperation(updateSMAccount, {
                                input:{
                                  awsemail:senderbeneficiary,
                                  balance:(PalBenefits + parseFloat(SenderBeneficiarySenderUsrBal)).toFixed(0),
                                  beneficiaryAmt: (PalBenefits + parseFloat(senderbeneficiaryAmt)).toFixed(0),
                                                           
                                                                                        }
                                                                                      })
                                                                                    )                
                                                                                    if (responz4?.data?.updateSMAccount)
                                                                                    {
                                                                                      await updtRecBeneficiaryAc2();
                                                                                    }
                                                                                    else {
                                                                                      Alert.alert("Retry or update app or call customer care")
                                                                                    }

                      }
                      catch(error){
                        console.log(error)
                        
                      }
                     
                      


                    }

                    const updtRecBeneficiaryAc2 = async () =>{
                     
                      try{
                        const responz5 = await API.graphql(
                            graphqlOperation(createBenefitContributions2, {
                              input:{

                                benefitsID: "String",
                                benefactorAc: RecNatId,
                                benefactorPhone: ReceiverName,
                                beneficiaryAc: userInfo.attributes.email,
                                beneficiaryPhone: "String",
                                creatorEmail: "String",
                                prodName: "String",
                                creatorName: "String",
                                owner: userInfo.attributes.sub,
                                prodCost: 0,
                                benefitsAmount: PalBenefits.toFixed(0),
                                beneficiaryType: "Pal",
                                prodDesc: "String",
                                benefitStatus: "Active",
                                amount: PalBenefits.toFixed(0)                  
                                                                                          
                                
                                
                              }
                            })
                          )
                          if (responz5?.data?.createBenefitContributions2)
                          {
                            await updtComp2();
                          }
                          else{
                            Alert.alert("Retry or update app or call customer care")
                          }

                      }
                      catch(error){
                        console.log(error)
                        
                      }
                     
                    }

                   
                    const updtComp2 = async () =>{
                     
                      try{
                        const responz6 = await API.graphql(
                            graphqlOperation(updateCompany, {
                              input:{
                                AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                               
                                companyEarningBal:(CompEarnings + parseFloat(companyEarningBals)),
                                companyEarning: CompEarnings + parseFloat(companyEarnings),                                                    
                                
                                ttlNonLonssRecSM: parseFloat(amounts) + parseFloat(ttlNonLonssRecSMs),
                                ttlNonLonssSentSM: parseFloat(amounts) + parseFloat(ttlNonLonssSentSMs),
                                
                              }
                            })
                          )
                          if (responz6?.data?.updateCompany)
                          {
                            Alert.alert("Amount:Ksh. "+parseFloat(amounts).toFixed(0) + ". Transaction fee: Ksh. "+ UsrTransferFeeAmt.toFixed(0)
                      );
                      Communications.textWithoutEncoding(phonecontact,'Hi '
                              + ReceiverName + ', ' +names + ' has sent you a non loan of Ksh. ' 
                              + amounts 
                              +'. For clarification call the sender '
                            + userInfo.attributes.phone_number + '. Thank you. MiFedha')
                          }
                          
                      }
                      catch(error){
                        console.log(error)
                        
                      }
                        
                           
                    }
                    
                    const sendSMNonLn3 = async () => {
                     
                      try {
                      const responce1 = await API.graphql(
                          graphqlOperation(createNonLoans, {
                            input: {
                              recPhn: RecNatId,
                              senderPhn: userInfo.attributes.email,                                  
                              amount: parseFloat(amounts).toFixed(0),                              
                              description: Desc,
                              RecName:ReceiverName,
                              SenderName:names,
                              status: "SMNonLons",
                              owner: userInfo.attributes.sub
                            },
                          }),
                        );

                        await API.graphql(graphqlOperation(createMessages, {
                                    input: { senderEmail: RecNatId, 
                                      messageBody: `${names} has sent you Ksh. ${amounts}. The money has been deposited in your main account`
                        
                                     }
                                  }));
                                  await API.graphql(graphqlOperation(sendNotification, {
                                    riderEmail: RecNatId,
                                    title: 'MiFedha: Cash',
                                    body: `${names} has sent you Ksh. ${amounts}. The money has been deposited in your main account`,
                                  }));

                                  
                        if (responce1?.data?.createNonLoans)
                        {
                          await updtSendrAc3();
                        }
                        else{
                          Alert.alert("Sending unsuccessful; Retry or update app")
                        }

                      } catch (error) {
                        console.log(error)
                       
                      }
                     
                      
                    };

                    const updtSendrAc3 = async () =>{
                      
                      try{
                        const responce2 = await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:userInfo.attributes.email,
                                ttlNonLonsSentSM: (parseFloat(ttlNonLonsSentSMs)+parseFloat(amounts)).toFixed(0),
                                balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0), 
                                benefitsAmount: (SenderbenefitsAmount + PalBenefits).toFixed(0)
                                
                              }
                            })
                          )
                          if (responce2?.data?.updateSMAccount)
                          {
                            await updtRecAc3()
                          }
                          else {
Alert.alert("Retry or update app or call customer care")
                          }
                      }
                      catch(error){
                        console.log(error)
                       
                      }
                     
                      
                    }
          
                    const updtRecAc3 = async () =>{
                    
                      
                      try{
                        const responce3 = await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:RecNatId,
                                ttlNonLonsRecSM: (parseFloat(ttlNonLonsRecSMs) + parseFloat(amounts)).toFixed(0) ,
                                balance:(parseFloat(RecUsrBal) + parseFloat(amounts)).toFixed(0),                                     
                                benefitsAmount: (ReceiverbenefitsAmount + PalBenefits).toFixed(0)                              
                                
                              }
                            })
                          )   
                          if (responce3?.data?.updateSMAccount) 
                            {
                              await updtSendrBeneficiaryAc3();
                            } 
                            else{
                              Alert.alert("Retry or update app or call customer care")
                              return;
                            }  

                      }
                      catch(error){
                        console.log(error)
                       
                      }
                     
                      
                    }

                    const updtSendrBeneficiaryAc3 = async () =>{
                     
                      try{
                    const responce4 = await API.graphql(
                                graphqlOperation(createBenefitContributions2, {
                                input:{
                                  benefitsID: "String",
                                benefactorAc: userInfo.attributes.email,
                                benefactorPhone: names,
                                beneficiaryAc: RecNatId,
                                beneficiaryPhone: "String",
                                creatorEmail: "String",
                                prodName: "String",
                                creatorName: "String",
                                owner: userInfo.attributes.sub,
                                prodCost: 0,
                                benefitsAmount: PalBenefits.toFixed(0),
                                beneficiaryType: "Pal",
                                prodDesc: "String",
                                benefitStatus: "Active",
                                amount: PalBenefits.toFixed(0)         
                                                                                        }
                                                                                      })
                                                                                    )                
                                                                                    if (responce4?.data?.createBenefitContributions2)
                                                                                    {
                                                                                      await updtRecBeneficiaryAc3();
                                                                                    }
                                                                                    else {Alert.alert("Retry or update app or call customer care")
                                                                                      return;}

                      }
                      catch(error){
                        console.log(error)
                        
                      }
                     
                    }

                    const updtRecBeneficiaryAc3 = async () =>{
                     
                      
                      try{
                        const responce5 =  await API.graphql(
                            graphqlOperation(createBenefitContributions2, {
                              input:{

                                benefitsID: "String",
                                benefactorAc: RecNatId,
                                benefactorPhone: ReceiverName,
                                beneficiaryAc: userInfo.attributes.email,
                                beneficiaryPhone: "String",
                                creatorEmail: "String",
                                prodName: "String",
                                creatorName: "String",
                                owner: userInfo.attributes.sub,
                                prodCost: 0,
                                benefitsAmount: PalBenefits.toFixed(0),
                                beneficiaryType: "Pal",
                                prodDesc: "String",
                                benefitStatus: "Active",
                                amount: PalBenefits.toFixed(0)                  
                              
                              }
                            })
                          )
                          if (responce5?.data?.createBenefitContributions2)
                          {
                            await updtComp3();
                          }
                          else {Alert.alert("Retry or update app or call customer care")
                            return;}

                      }
                      catch(error){
                        console.log(error)
                       
                      }
                    
                      
                    }

                    const updtComp3 = async () =>{
                     
                      try{
                        const responce6 = await API.graphql(
                            graphqlOperation(updateCompany, {
                              input:{
                                AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                               
                                companyEarningBal:(CompEarnings + parseFloat(companyEarningBals)),
                                companyEarning: CompEarnings + parseFloat(companyEarnings),                                                    
                                
                                ttlNonLonssRecSM: parseFloat(amounts) + parseFloat(ttlNonLonssRecSMs),
                                ttlNonLonssSentSM: parseFloat(amounts) + parseFloat(ttlNonLonssSentSMs),
                                
                              }
                            })
                          )
                         if (responce6?.data?.updateCompany) 
                         {
                          Alert.alert("Amount:Ksh. "+parseFloat(amounts).toFixed(0) + ". Transaction fee: Ksh. "+ UsrTransferFeeAmt.toFixed(0)
                        );
                        Communications.textWithoutEncoding(phonecontact,'Hi '
                                + ReceiverName + ', ' +names + ' has sent you a non loan of Ksh. ' 
                                + amounts 
                                +'. For clarification call the sender '
                              + userInfo.attributes.phone_number + '. Thank you. MiFedha')
                              
                         }
                         else {Alert.alert("Retry or update app or call customer care")
                          return;}
                          
                      }
                      catch(error){
                        console.log(error)
                       
                      }
                      
                           
                    }
                    
                    
                    if (userInfo.attributes.sub!==owner) {
                      Alert.alert("Please first create a main account")
                      return;
                    }  else if(usrAcActvStts !== "AccountActive"){Alert.alert('Sender account is inactive');}
                    else if(usrAcActvSttss !== "AccountActive"){Alert.alert('Receiver account is inactive');}
                    else if(SenderNatId === RecNatId)
                      {Alert.alert('You cannot Send money to Yourself');}
                    else if(parseFloat(ttlDpstSMs) === 0 && parseFloat(TtlWthdrwnSMs) ===0)
                      {Alert.alert('Receiver ID be verified through deposit at MFNdogo');}
                    
                    else if (
                      (parseFloat(RecUsrBal) + parseFloat(amounts)) > parseFloat(MaxAcBals) 
                    ) {Alert.alert('Receiver Call customer care to have wallet capacity adjusted');}
                    
                    else if(usrPW !==SnderPW){Alert.alert('Wrong password');}
                    else if(userInfo.attributes.sub !==SenderSub)
                      {Alert.alert('Please send from your own  account');}
                    
                    else if(parseFloat(loanLimits) < parseFloat(amounts))
                      {Alert.alert('Call ' + CompPhoneContact + ' to have your send Amount limit adjusted');}
                    
                    else if (Lonees1.data.listSMLoansCovereds.items.length > 0 
                      
                      ||
                      Lonees3.data.listCovCreditSellers.items.length > 0 
                      
                      ||
                      Lonees5.data.listCvrdGroupLoans.items.length > 0 
                     

                    
                      ) {
                        SndChmMmbrMny();
                    } 

                    else if (TotalTransacted > SenderUsrBal 
                    ){Alert.alert('Insufficient Funds');}


                    else if (SenderbeneficiaryType === "Biz"
                      && ReceiverbeneficiaryType === "Pal"
                      ){sendSMNonLn1();}

                      else if (SenderbeneficiaryType === "Pal"
                        && ReceiverbeneficiaryType === "Biz"
                        ){sendSMNonLn2();}

                        else if (SenderbeneficiaryType === "Biz"
                          && ReceiverbeneficiaryType === "Biz"
                          ){sendSMNonLn3();}

                          else if (SenderbeneficiaryType === "Pal"
                            && ReceiverbeneficiaryType === "Pal"
                            ){sendSMNonLn();}

                      

                     else {
                      Alert.alert("Call customer care or update up")
                    }                                                
                }       
                catch(e) {   
                  console.log(e)  
                  if (e){Alert.alert("Retry or update app or call customer care")
  return;}                 
                }
                setIsLoading(false);
                }                    
                  await fetchRecUsrDtlsBeneficiary();

                }       
                catch(e) {   
                  console.log(e)  
                  if (e){Alert.alert("Retry or update app or call customer care")
  return;}                 
                }
                
                }                    
                  await fetchRecUsrDtls();
        } catch (e) {
          console.log(e)
          if (e){Alert.alert("Retry or update app or call customer care")
      return;}
        }
         
      };
      await fetchCompDtls();
    
      
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Retry or update app or call customer care")
      return;}
         
    }   
    
    };
    
    await fetchSenderBeneficiaryUsrDtls();

  }     
  catch (e) {
    console.log(e)
    if (e){Alert.alert("Retry or update app or call customer care")
    return;}
       
  }   
 
  };
  
  await fetchSenderUsrDtls();

  
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Retry or update app or call customer care")
      return;}
         
    }   
   
    };
    
    await fetchCLChm();
    
   
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Retry or update app or call customer care")
      return;}
         
    }   
    setIsLoading(false);
    };
    
    await fetchCLCrdSl();
    
   
          
        } catch (e) {
          console.log(e)
          if (e){Alert.alert("Retry or update app or call customer care")
          return;}
      };
  
      setIsLoading(false);
      setSenderNatId('');
      setAmount("");
      setRecNatId('');
      
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
<LinearGradient
                            colors={['#e58d29', 'skyblue']}
                            start={[0, 0]}
                            end={[1, 1]}
                            style={{ flex: 1 }}
                          >
                            <View style={styles.container}>
                              <ScrollView>
          
                    <View style={styles.formContainer}>
                      <TextInput
                       placeholder="Receiver Email"
                        value={RecNatId}
                        onChangeText={setRecNatId}
                        style={styles.input}
                        editable={true}></TextInput>

                        <TextInput
                                               placeholder="Amount"
                                                value={amounts}
                                                onChangeText={setAmount}
                                                style={styles.input}
                                                editable={true}
                                                keyboardType='decimal-pad'>                                                                         
                                                </TextInput>   
                        
                                                <TextInput
                                               placeholder="Description"
                                                value={Desc}
                                                onChangeText={setDesc}
                                                style={styles.input}
                                                editable={true}
                                                
                                                multiline={true}
                                                >                                                                         
                                                </TextInput>                   
                     
                     <View style={styles.passwordContainer}>
                                                                   <TextInput
                                                                     placeholder="My Main Account Password"
                                                                 style={styles.passwordInput}
                                                                                                      
                                                                 value={SnderPW}
                                                                 onChangeText={setSnderPW}
                                                                 secureTextEntry={!isPasswordVisible}
                                                                 placeholderTextColor="#ccc"
                                                                         />
                                                                 <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                                <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                                 </TouchableOpacity>
                                                                 </View>
                       
                                                                
                    <TouchableOpacity
                      onPress={fetchCvLnSM}
                      style={styles.button}>
                      {isLoading ? (
                                                <ActivityIndicator color="#fff" />
                                              ) : (
                                                <Text style={styles.locationText}>Submit</Text>
                                              )}
                                            </TouchableOpacity>
                                          </View>
                                        </ScrollView>
                                      </View>
                                    </LinearGradient>
                                  );
                                };
                                
                                const styles = StyleSheet.create({
                                    gradient: {
                                      flex: 1,
                                    },
                                    container: {
                                      flex: 1,
                                      padding: 20,
                                    },
                                    loanTitleView: {
                                      marginBottom: 20,
                                      alignItems: 'center',
                                    },
                                    title: {
                                      fontSize: 24,
                                      fontWeight: 'bold',
                                      color: '#ffffff',
                                      textAlign: 'center',
                                    },
                                    formContainer: {
                                      backgroundColor: '#ffffff',
                                      borderRadius: 10,
                                      padding: 20,
                                      shadowColor: '#000',
                                      shadowOffset: { width: 0, height: 2 },
                                      shadowOpacity: 0.25,
                                      shadowRadius: 4,
                                      elevation: 5,
                                    },
                                    input: {
                                      height: 45,
                                      borderColor: '#ccc',
                                      borderWidth: 1,
                                      marginBottom: 15,
                                      borderRadius: 5,
                                      paddingLeft: 10,
                                    },
                                    button: {
                                      backgroundColor: '#e58d29',
                                      paddingVertical: 12,
                                      borderRadius: 5,
                                      alignItems: 'center',
                                      marginTop: 20,
                                    },
                                    locationContainer: {
                                      marginVertical: 10,
                                    },
                                    locationText: {
                                      fontSize: 16,
                                      color: '#333',
                                    },
                                    passwordContainer: { flexDirection: 'row', alignItems: 'center', 
                                        backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, height:50 },
                                passwordInput: { flex: 1, padding: 12 },
                                  });
        
export default SMASendNonLns;