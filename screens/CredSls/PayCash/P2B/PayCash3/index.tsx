import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  
  createSMLoansCovered,
  
  
  
  createNonLoans,
  
  updateCompany,
  
  updateSMAccount,
  updateBizna,
  createBenefitContributions2,
  
} from '../../../../../src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  
  getBizna,
  getCompany,
  getSMAccount,
  listCovCreditSellers,
  listCvrdGroupLoans,
  listSMLoansCovereds,
 
} from '../../../../../src/graphql/queries';

import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  Linking,
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


const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
 
  const [amounts, setAmount] = useState("");
  
  const [Desc, setDesc] = useState("");
 
  const[isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()
  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps")
 }

 
  
 
    const fetchCvLnSM = async () => {
      if(isLoading){
      return;
    }
    setIsLoading(false);

      const userInfo = await Auth.currentAuthenticatedUser();


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
      const beneficiaryType =accountDtl.data.getSMAccount.beneficiaryType;
      const names =accountDtl.data.getSMAccount.name;
      const owner =accountDtl.data.getSMAccount.owner;
      const beneficiary =accountDtl.data.getSMAccount.beneficiary;
      const SenderbenefitsAmount =accountDtl.data.getSMAccount.benefitsAmount;


      const fetchBeneficiaryUsrDtls = async () => {
        
        try {
          const accountDtl7:any = await API.graphql(
            graphqlOperation(getSMAccount, {awsemail: beneficiary}),
          );
    
          const SenderBenUsrBal7 =accountDtl7.data.getSMAccount.balance;
          const senderbeneficiaryAmt =accountDtl7.data.getSMAccount.beneficiaryAmt;

          
      
      const fetchCompDtls = async () => {
       
        try {
          const CompDtls:any = await API.graphql(
            graphqlOperation(getCompany, {
              AdminId: "BaruchHabaB'ShemAdonai2",
            }),
          );
          
            
          const UsrTransferFee = CompDtls.data.getCompany.biznaCashSaleFee;
          const p2bBenCom = CompDtls.data.getCompany.p2BBenCom; 
          const UserTransferFeeAmt = parseFloat(UsrTransferFee)*parseFloat(amounts);
          const UsrTransferFeeAmt = UsrTransferFee*parseFloat(amounts);
          const UsrTransferFee2 = parseFloat(SenderUsrBal) -parseFloat(amounts);
          const TotalTransacted = parseFloat(amounts)  + parseFloat(UsrTransferFee)*parseFloat(amounts);
          const TotalTransacted2 = parseFloat(amounts)  + UsrTransferFee2;
          const BizBenPercentage =   parseFloat(p2bBenCom) * parseFloat(UsrTransferFee);
          const BizBenefits = BizBenPercentage * parseFloat(amounts);
          const CompEarnings = UsrTransferFeeAmt - (2*BizBenefits);
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact;         
          
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
          const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM; 
          
         
                    
          const fetchRecUsrDtls = async () => {
           
            try {
                const RecAccountDtl:any = await API.graphql(
                    graphqlOperation(getBizna, {BusKntct: RecNatId}),
                    );
                    const RecUsrBal =RecAccountDtl.data.getBizna.netEarnings;                    
                    const bizBeneficiary =RecAccountDtl.data.getBizna.bizBeneficiary; 
                    const bizType =RecAccountDtl.data.getBizna.bizType;
                    const namess =RecAccountDtl.data.getBizna.busName;
                    const RecieverbenefitsAmount =RecAccountDtl.data.getBizna.benefitsAmount;

                    const fetchBizBeneficiaryUsrDtls = async () => {
                     
                      try {
                        const accountDtl8:any = await API.graphql(
                          graphqlOperation(getSMAccount, {awsemail: bizBeneficiary}),
                        );
                  
                        const RecUsrBal8 =accountDtl8.data.getSMAccount.balance;              
                        const recbeneficiaryAmt =accountDtl8.data.getSMAccount.beneficiaryAmt; 
                    
                  
                        const sendSMNonLn7 = async () => {
                         
                          try {
                            await API.graphql(
                              graphqlOperation(createNonLoans, {
                                input: {
                                  
                                  recPhn: RecNatId,
                                  senderPhn: userInfo.attributes.email,                                  
                                  amount: parseFloat(amounts).toFixed(0),                              
                                  description: Desc,
                                  RecName:namess,
                                  SenderName:names,
                                  status: "cashSales",
                                  owner: userInfo.attributes.sub
                                },
                              }),
                            );
    
    
                          } catch (error) {
                            if (error){
                              Alert.alert("Sending unsuccessful; Retry")
                              return
                            }
                          }
                         
                          await createBizBenefits1();
                        };
    
                       
    const createBizBenefits1 = async () =>{
                                 
                                  try{
                                      await API.graphql(
                                        graphqlOperation(createBenefitContributions2, {
                                          input:{
                                            benefitsID: "String",
                                            benefactorAc: RecNatId,
                                             /*
                                            Benefactor Name*/
                                            benefactorPhone: namess,
                                            beneficiaryAc: userInfo.attributes.email,
                                            beneficiaryPhone: "String",
                                            creatorEmail: userInfo.attributes.email,
                                            prodName: "String",
                                            creatorName: "String",
                                            owner: userInfo.attributes.sub,
                                            prodCost: 0,
                                            benefitsAmount: BizBenefits,
                                            beneficiaryType: "Pal",
                                            prodDesc: "String",
                                            benefitStatus: "Active",
                                            amount: BizBenefits                  
                                            
                                          }
                                        })
                                      )                              
                                  }
                                  catch(error){
                                    console.log(error)
                                    if (error){Alert.alert("Retry or update your app2")
                                    return;}
                                  }
                                  
                                  await updtSendrAc7();
                                }
    
                        const updtSendrAc7 = async () =>{
                         
                          try{
                              await API.graphql(
                                graphqlOperation(updateSMAccount, {
                                  input:{
                                    awsemail:userInfo.attributes.email,
                                    ttlNonLonsSentSM: (parseFloat(ttlNonLonsSentSMs)+parseFloat(amounts)).toFixed(0),
                                    balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0) ,
                                    benefitsAmount: parseFloat(SenderbenefitsAmount) + BizBenefits
                                    
                                  }
                                })
                              )
    
    
                          }
                          catch(error){
                            console.log(error)
                            if (error){Alert.alert("Check your internet connection")
                            return;}
                          }
                         
                          await updtRecAc7();
                        }
    
                      
                        const updtRecAc7 = async () =>{
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try{
                              await API.graphql(
                                graphqlOperation(updateBizna, {
                                  input:{
                                    BusKntct:RecNatId,
                                    benefitsAmount: parseFloat(RecieverbenefitsAmount) + BizBenefits,
                                    netEarnings:(parseFloat(RecUsrBal) + parseFloat(amounts)).toFixed(0),                                   
                                    earningsBal:   (parseFloat(RecUsrBal) + parseFloat(amounts)).toFixed(0)                         
                                    
                                  }
                                })
                              )                              
                          }
                          catch(error){
                            console.log(error)
                            if (error){Alert.alert("Check your internet connection")
                            return;}
                          }
                         
                          await createBizBenefits2();
                        }
    
                        const createBizBenefits2 = async () =>{
                                 
                          try{
                              await API.graphql(
                                graphqlOperation(createBenefitContributions2, {
                                  input:{
                                    benefitsID: "String",
                                    benefactorAc: userInfo.attributes.email,
                                    benefactorPhone: names,
                                    beneficiaryAc: RecNatId,
                                    beneficiaryPhone: "String",
                                    creatorEmail: userInfo.attributes.email,
                                    prodName: "String",
                                    creatorName: "String",
                                    owner: userInfo.attributes.sub,
                                    prodCost: 0,
                                    benefitsAmount: BizBenefits,
                                    beneficiaryType: "Pal",
                                    prodDesc: "String",
                                    benefitStatus: "Active",
                                    amount: BizBenefits                  
                                    
                                  }
                                })
                              )                              
                          }
                          catch(error){
                            console.log(error)
                            if (error){Alert.alert("Retry or update your app2")
                            return;}
                          }
                          
                          await updtComp7();
                        }
    
                        const updtComp7 = async () =>{
                         
                          try{
                              await API.graphql(
                                graphqlOperation(updateCompany, {
                                  input:{
                                    AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                                   
                                    companyEarningBal: CompEarnings + parseFloat(companyEarningBals),
                                    companyEarning: CompEarnings + parseFloat(companyEarnings),                                                    
                                    
                                    ttlNonLonssRecSM: parseFloat(amounts) + parseFloat(ttlNonLonssRecSMs),
                                    ttlNonLonssSentSM: parseFloat(amounts) + parseFloat(ttlNonLonssSentSMs),
                                    
                                  }
                                })
                              )
                              
                              
                          }
                          catch(error){
                            console.log(error)
                            if (error){Alert.alert("Check your internet connection")
                        return;}
                          }
                          Alert.alert("Amount:Ksh. "+parseFloat(amounts).toFixed(0) + ". Transaction fee: Ksh. "+ UsrTransferFeeAmt.toFixed(0)
                          );
                          
                        }
    
                       
                        
                        const sendSMNonLn = async () => {
                      
                      try {
                        await API.graphql(
                          graphqlOperation(createNonLoans, {
                            input: {
                              recPhn: RecNatId,
                              senderPhn: userInfo.attributes.email,                                  
                              amount: parseFloat(amounts).toFixed(0),                              
                              description: Desc,
                              RecName:namess,
                              SenderName:names,
                              status: "cashSales",
                              owner: userInfo.attributes.sub
                            },
                          }),
                        );


                      } catch (error) {
                        if (error){
                          Alert.alert("Sending unsuccessful; Retry")
                          return
                        }
                      }
                     
                      await createBizBenefits3();
                    };

                    const createBizBenefits3 = async () =>{
                                 
                      try{
                          await API.graphql(
                            graphqlOperation(createBenefitContributions2, {
                              input:{
                                benefitsID: "String",
                                benefactorAc: RecNatId,
                                /*
                                Benefactor Name*/
                                benefactorPhone: namess,
                                beneficiaryAc: userInfo.attributes.email,
                                beneficiaryPhone: "String",
                                creatorEmail: userInfo.attributes.email,
                                prodName: "String",
                                creatorName: "String",
                                owner: userInfo.attributes.sub,
                                prodCost: 0,
                                benefitsAmount: BizBenefits,
                                beneficiaryType: "Pal",
                                prodDesc: "String",
                                benefitStatus: "Active",
                                amount: BizBenefits                  
                                
                              }
                            })
                          )                              
                      }
                      catch(error){
                        console.log(error)
                        if (error){Alert.alert("Retry or update your app2")
                        return;}
                      }
                      
                      await updtSendrAc();
                    }

                    const updtSendrAc = async () =>{
                     
                      try{
                          await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:userInfo.attributes.email,
                                ttlNonLonsSentSM: (parseFloat(ttlNonLonsSentSMs)+parseFloat(amounts)).toFixed(0),
                                balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0) ,
                                
                              }
                            })
                          )


                      }
                      catch(error){
                        console.log(error)
                        if (error){Alert.alert("Check your internet connection")
                        return;}
                      }
                     
                      await updtRecAc();
                    }

                  

                    const updtRecAc = async () =>{
                    
                      try{
                          await API.graphql(
                            graphqlOperation(updateBizna, {
                              input:{
                                BusKntct:RecNatId,
                                
                                netEarnings:(parseFloat(RecUsrBal) + parseFloat(amounts)).toFixed(0),                                   
                                earningsBal:   (parseFloat(RecUsrBal) + parseFloat(amounts)).toFixed(0),                         
                                benefitsAmount: RecieverbenefitsAmount + BizBenefits
                              }
                            })
                          )                              
                      }
                      catch(error){
                        console.log(error)
                        if (error){Alert.alert("Check your internet connection")
                        return;}
                      }
                    
                      await updtPalBen();
                    }

                    const updtPalBen = async () =>{
                    
                      try{
                          await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail: beneficiary,
                                
                                balance:(parseFloat(SenderBenUsrBal7) + BizBenefits).toFixed(0) ,
                                beneficiaryAmt: parseFloat(senderbeneficiaryAmt) + BizBenefits
                                
                              }
                            })
                          )


                      }
                      catch(error){
                        console.log(error)
                        if (error){Alert.alert("Check your internet connection")
                        return;}
                      }
                    
                      await updtComp();
                    }


                  
                    const updtComp = async () =>{
                     
                      try{
                          await API.graphql(
                            graphqlOperation(updateCompany, {
                              input:{
                                AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                               
                                companyEarningBal:CompEarnings + parseFloat(companyEarningBals),
                                companyEarning: CompEarnings + parseFloat(companyEarnings),                                                    
                                
                                ttlNonLonssRecSM: parseFloat(amounts) + parseFloat(ttlNonLonssRecSMs),
                                ttlNonLonssSentSM: parseFloat(amounts) + parseFloat(ttlNonLonssSentSMs),
                                
                              }
                            })
                          )
                          
                          
                      }
                      catch(error){
                        console.log(error)
                        if (error){Alert.alert("Check your internet connection")
                    return;}
                      }
                      Alert.alert("Amount:Ksh. "+parseFloat(amounts).toFixed(0) + ". Transaction fee: Ksh. "+ UsrTransferFeeAmt.toFixed(0)
                      );
                      setIsLoading(false);
                    }

                   
                    
                                          
                    
                    if (userInfo.attributes.sub!==owner) {
                      Alert.alert("Please first create a main account")
                      setIsLoading(false)
                      return;
                      
                    }  
                    
                   
                    else if(usrAcActvStts !== "AccountActive")
                      {Alert.alert('Sender account is inactive');
                        setIsLoading(false)
                        return;
                      }
                    
                   
                    
                    
                    
                    else if(usrPW !==SnderPW){Alert.alert('Wrong password');
                      setIsLoading(false)
                        return;
                    }

                    
                    else if(userInfo.attributes.sub !==SenderSub)
                      {Alert.alert('Please send from your own  account');
                        setIsLoading(false)
                        return;
                      }
                    
                    else if(parseFloat(loanLimits) < parseFloat(amounts))
                      {Alert.alert('Call ' + CompPhoneContact + ' to have your send Amount limit adjusted');
                        setIsLoading(false)
                        return;
                      }
                    

                    else if (Lonees1.data.listSMLoansCovereds.items.length > 0 
                      ||
                      
                      Lonees3.data.listCovCreditSellers.items.length > 0 
                      
                      ||
                      Lonees5.data.listCvrdGroupLoans.items.length > 0 
                      

                    
                      ) {
                        SndChmMmbrMny();
                    } 

                    else if (
                      TotalTransacted > SenderUsrBal
                    ) {
                      
                      setIsLoading(false)
                      Alert.alert('Requested amount is more than you have in your account');
                      
                        return;
                    }
                    
                    else if 
                     (beneficiaryType === "Biz")
                     {
                      await sendSMNonLn7();
                      return;
                     }

                     else 
                     {
                      await sendSMNonLn();
                    }     
                    
                     
                    
                  }     
                  catch (e) {
                    console.log(e)
                    if (e){Alert.alert("Please retry or update your app")
                    return;}
                       
                  }   
                
                  };
                  
                  await fetchBizBeneficiaryUsrDtls();
                
                }       
                catch(e) {   
                  console.log(e)  
                  if (e){Alert.alert("Please retry or update your app")
  return;}                 
                }
                
                }                    
                  await fetchRecUsrDtls();
        } catch (e) {
          console.log(e)
          if (e){Alert.alert("Please retry or update your app")
      return;}
        }
          
      };
      await fetchCompDtls();
    
      
    

  }     
  catch (e) {
    console.log(e)
    if (e){Alert.alert("Please retry or update your app")
    return;}
       
  }   
  
  };
  
  await fetchBeneficiaryUsrDtls();

}     
catch (e) {
  console.log(e)
  if (e){Alert.alert("Please retry or update your app")
  return;}
     
}   

};

await fetchSenderUsrDtls();
    
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Please retry or update your app")
      return;}
         
    }   
    
    };
    
    await fetchCLChm();
    
    
    
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Please retry or update your app")
      return;}
         
    }   
   
    };
    
    await fetchCLCrdSl();
    
    
    
          
        } catch (e) {
          console.log(e)
          if (e){Alert.alert("Fill details correctly or update your app")
          return;}
      }

      finally {setIsLoading(false);}
  
      
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
    <View>
      <View
        
        style={styles.image}>
        <ScrollView>
         
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>

          

          <View style={styles.sendAmtView}>
            <TextInput
            placeholder="Business Phone"
              value={RecNatId}
              onChangeText={setRecNatId}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Business Phone</Text>
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
            <Text style={styles.sendAmtText}>Buyer PassWord</Text>
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
            onPress={fetchCvLnSM}
            style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Send</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    </View>
  );
};

export default SMASendNonLns;