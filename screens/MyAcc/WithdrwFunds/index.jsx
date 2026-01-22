import React, {useEffect, useState} from 'react';

import {
  createFloatAdd,
   

  updateAgent,
  updateCompany,
  updateSAgent,
  updateSMAccount,
  
} from '../../../src/graphql/mutations';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getAgent, getCompany, getSAgent, getSMAccount, listCovCreditSellers, 
  listCvrdGroupLoans, listGroupNonLoans,   listSMLoansCovereds, listSMLoansNonCovereds} from '../../../src/graphql/queries';
import {
  View,
  Text,

  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import Navigation from '../../../navigation';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

const SMADepositForm = props => {
  

  const[UsrPWd, setUsrPWd] = useState("");
  const [AgentPhn, setAgentPhn] = useState("");
  const [amount, setAmount] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()

  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps")
 }
  

  
 const fetchAcDtls = async () => {
  if(isLoading){
    return;
  }
  setIsLoading(true);
  const userInfo = await Auth.currentAuthenticatedUser();
  try {
    const accountDtl:any = await API.graphql(
      graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}),
    );
    
    const usrBala = accountDtl.data.getSMAccount.balance;      
    const TtlWthdrwnSMs = accountDtl.data.getSMAccount.TtlWthdrwnSM;
    const usrStts = accountDtl.data.getSMAccount.acStatus; 
    const withdrawalLimits = accountDtl.data.getSMAccount.withdrawalLimit;  
    const pws = accountDtl.data.getSMAccount.pw;
    const owners = accountDtl.data.getSMAccount.owner;
    const names = accountDtl.data.getSMAccount.name;

   

    const fetchCvLnSM = async () => {
      
      
    
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

                                           
  
         
      
      const fetchAgtBal = async () => {
       
        try {
          const AgentBal:any = await API.graphql(
            graphqlOperation(getAgent, {phonecontact: AgentPhn}),
          );    
         
          const TtlFltInsss = AgentBal.data.getAgent.TtlFltIn;
          const floatBals = AgentBal.data.getAgent.floatBal;
          const ttlEarningssss = AgentBal.data.getAgent.ttlEarnings;
          const agentEarningBalsss = AgentBal.data.getAgent.agentEarningBal;
          const AgAcAct = AgentBal.data.getAgent.status;
          const sagentregnos = AgentBal.data.getAgent.sagentregno;
          const namess = AgentBal.data.getAgent.name;
          const MFNWithdrwlFees = AgentBal.data.getAgent.MFNWithdrwlFee;

          const gtCompDtls = async () =>{
            
            try{
              const compDtls :any= await API.graphql(
              graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
                );
                  const ttlUserWthdrwls = compDtls.data.getCompany.ttlUserWthdrwl;
                  const agentComs = compDtls.data.getCompany.agentCom;
                  const sagentComs = compDtls.data.getCompany.sagentCom;
                  const companyComs = compDtls.data.getCompany.companyCom;
                  const companyComDisc = compDtls.data.getCompany.companyComDisc;
                  const UsrWthdrwlFeess = compDtls.data.getCompany.UsrWthdrwlFees;

                  const ChampCom = compDtls.data.getCompany.ChampCom;
                 
                  const companyEarningBals = compDtls.data.getCompany.companyEarningBal
                  const companyEarnings = compDtls.data.getCompany.companyEarning
                  const agentEarningBals = compDtls.data.getCompany.agentEarningBal
                  const agentEarnings = compDtls.data.getCompany.agentEarning
                  const saEarningBals = compDtls.data.getCompany.saEarningBal
                  const saEarnings = compDtls.data.getCompany.saEarning
                  const agentFloatIns = compDtls.data.getCompany.agentFloatIn                 
                  
                  const gtsaDtls = async () =>{
                   
                    try{
                      const compDtlsxc :any= await API.graphql(
                      graphqlOperation(getSAgent,{saPhoneContact:sagentregnos})
                        );
                          const TtlEarningss = compDtlsxc.data.getSAgent.TtlEarnings;
                          const saBalances = compDtlsxc.data.getSAgent.saBalance;
                          const acChamp = compDtlsxc.data.getSAgent.acChamp;
                          const namessssssss = compDtlsxc.data.getSAgent.name;
                          const MFKWithdrwlFees = compDtlsxc.data.getSAgent.MFKWithdrwlFee;
                          const AgentCommission = (parseFloat(agentComs) - parseFloat(MFNWithdrwlFees))/100*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)                                                
                          const saCommission = (parseFloat(sagentComs) - parseFloat(MFKWithdrwlFees))/100*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)
                          const compCommission = (parseFloat(companyComs) - parseFloat(companyComDisc))/100*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)
                          const ChampCommission = parseFloat(ChampCom)/100*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)
                          const UsrWithdrawalFee = AgentCommission+saCommission+compCommission+ChampCommission;
                          const TTlAmtTrnsctd = parseFloat(amount) + UsrWithdrawalFee


                          const gtMFChamp = async () =>{
                           
                            try{
                              const compDtlsx :any= await API.graphql(
                              graphqlOperation(getSMAccount,{awsemail:acChamp})
                                );
                                  const balancesx = compDtlsx.data.getSMAccount.mfchampEarnings;
                                  
                          
                          const CrtFltAdd = async () => {
                            try {
                              await API.graphql(
                                graphqlOperation(createFloatAdd, {
                                  input: {
                                  
                                    withdrawerid: userInfo.attributes.email,                    
                                    agentPhonecontact: AgentPhn,
                                    sagentId: sagentregnos,
                                    owner: userInfo.attributes.sub,
                                    amount: parseFloat(amount).toFixed(0),
                                    agentName:namess,
                                    userName:names,
                                    saName:namessssssss,
                                    saPhone:sagentregnos,
                                    status: 'AccountActive',
                                  },
                                }),
                              );

                              await onUpdtUsrBal();
            
                    } catch (error) {
                      if (error){
                        Alert.alert("Withdrawal unsuccessful; Retry")
                        return
                      }
                    }
                   
                    
                    };  
        
                    const onUpdtUsrBal = async () => {
                    
                      try {
                        await API.graphql(
                          graphqlOperation(updateSMAccount, {
                            input: {
                              awsemail: userInfo.attributes.email,
                  
                              balance: (parseFloat(usrBala) - TTlAmtTrnsctd).toFixed(0) ,
                              TtlWthdrwnSM: (parseFloat(TtlWthdrwnSMs) + parseFloat(amount)).toFixed(0),
                            },
                          }),
                        );
                        await onUpdtAgntBal();
                      }
        
                      catch (error) {
                        console.log(error)
                        if (error){Alert.alert("Retry, or update app or call customer care")
                        return;}
                      }
                     
                     
                      }; 
        
                      const onUpdtAgntBal = async () => {
                      
                        try {
                          await API.graphql(
                            graphqlOperation(updateAgent, {
                              input: {
                                phonecontact: AgentPhn,                   
                               
                                ttlEarnings: (parseFloat(ttlEarningssss) + AgentCommission).toFixed(0),
                                agentEarningBal: (parseFloat(agentEarningBalsss) + AgentCommission).toFixed(0),
                                floatBal: (parseFloat(floatBals) + parseFloat(amount)).toFixed(0),
                                TtlFltIn: (parseFloat(TtlFltInsss) + parseFloat(amount)).toFixed(0),

                              },
                            }),
                          );
                          await onUpdtsaDtls();
                        }
        
                        catch (error) {
                          console.log(error)
                          if (error){Alert.alert("Retry, or update app or call customer care")
                          return;}
                        }
                       
                       
                        }; 
        
                        
        
                          const onUpdtsaDtls = async () => {
                           
                            try {
                              await API.graphql(
                                graphqlOperation(updateSAgent, {
                                  input: {
                                    saPhoneContact: sagentregnos,
                        
                                    TtlEarnings: (parseFloat(TtlEarningss) + saCommission).toFixed(0),
                                    saBalance: (parseFloat(saBalances) + saCommission).toFixed(0),
                                      
                                  },
                                }),
                              );

                              await onUpdtMFChamp ();
                            }
            
                            catch (error) {
                              console.log(error)
                              if (error){Alert.alert("Retry, or update app or call customer care")
                              return;}
                            }
                            
                           
                            }; 

                            const onUpdtMFChamp = async () => {
                              if(isLoading){
                                return;
                              }
                              setIsLoading(true);
                              try {
                                await API.graphql(
                                  graphqlOperation(updateSMAccount, {
                                    input: {
                                      awsemail: acChamp,
                          
                                      mfchampEarnings: (ChampCommission + balancesx).toFixed(0) ,
                                      
                                    },
                                  }),
                                );
                                await onUpdtCompDtls();
                              }
                
                              catch (error) {
                                console.log(error)
                                if (error){Alert.alert("Retry, or update app or call customer care")
                                return;}
                              }
                              setIsLoading(false);
                              
                              }; 

                            const onUpdtCompDtls = async () => {
                             
                              try {
                                await API.graphql(
                                  graphqlOperation(updateCompany, {
                                    input: {
                                      AdminId:"BaruchHabaB'ShemAdonai2",                    
                                     
                                      companyEarningBal: parseFloat(companyEarningBals) + compCommission,
                                      companyEarning: parseFloat(companyEarnings) + compCommission,
                                      agentEarningBal: parseFloat(agentEarningBals) + AgentCommission,
                                      agentEarning: parseFloat(agentEarnings) + AgentCommission,
                                      saEarningBal: parseFloat(saEarningBals) + saCommission,
                                      saEarning: parseFloat(saEarnings) + saCommission,
                                      ttlUserWthdrwl: parseFloat(ttlUserWthdrwls) + parseFloat(amount),
                                      agentFloatIn: parseFloat(agentFloatIns) + parseFloat(amount),
                                      
                                    },
                                  }),
                                );
                              }
              
                              catch (error) {
                                console.log(error)
                                if (error){Alert.alert("Retry, or update app or call customer care")
                                return;}
                              }
                              setIsLoading(false);
                              await onUpdtMFChamp();
                              Alert.alert(names + " has withdrawn Ksh. " + parseFloat(amount).toFixed(2) + " from " + namess + " MFNdogo");
                              }; 

                             
                    
                    
                    if (TTlAmtTrnsctd > parseFloat(usrBala)) {
                      Alert.alert("Cancelled."+ "Bal: "+ usrBala +". Deductable: " + TTlAmtTrnsctd.toFixed(2) 
                      + ". "+ ((TTlAmtTrnsctd) - parseFloat(usrBala)).toFixed(2) + ' more needed')
                      return;
                    } 
        
                    else if (usrStts==="AccountInactive") {
                      Alert.alert("User Account has been deactivated")
                      return;
                    } 

                    else if (userInfo.attributes.sub !==owners) {
                      Alert.alert("You cannot withdraw from another account")
                      return;
                    }  

                    else if(parseFloat(amount)>parseFloat(withdrawalLimits)) {
                      Alert.alert('Withdrawal limit exceeded');
                      return;
                    }
                    else if (AgAcAct==="AccountInactive") {
                      Alert.alert("MFNdogo Account has been deactivated")
                      return;
                    } 
                    
                    else if (UsrPWd!==pws) {
                      Alert.alert("User credentials are wrong; access denied")
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
        
                    else{ CrtFltAdd()}   
        
        
                    } catch (error) {
                      console.log(error)
                  if (error){Alert.alert("Retry, update app or call customer care")
                          return;}
                    }
                   
                    };    
        
                    await gtMFChamp();        
                    
                  } catch (error) {
                    console.log(error)
                if (error){Alert.alert("Retry, update app or call customer care")
                        return;}
                  }
                
                  };    
      
                  await gtsaDtls();      
            
            } catch (error) {
              console.log(error)
          if (error){Alert.alert("Retry, update app or call customer care")
                  return;}
            }
          
            };    

            await gtCompDtls();           
      
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Retry, update app or call customer care")
      return;}
         
    }   
 
};

    await fetchAgtBal();

  

}     
  catch (e) {
    console.log(e)
    if (e){Alert.alert("Retry, update app or call customer care")
    return;}
       
  }   

};

  await fetchCLChm();



}     
  catch (e) {
    console.log(e)
    if (e){Alert.alert("Retry, update app or call customer care")
    return;}
       
  }   

};

  await fetchCLCrdSl();



}     
  catch (e) {
    console.log(e)
    if (e){Alert.alert("Retry, update app or call customer care")
    return;}
       
  }   

};

if (userInfo.attributes.sub !== owners)
    {Alert.alert ("Please first create main account")}
    else{
  await fetchCvLnSM();}
    }

    catch (e) {
      console.log(e)
      if (e){Alert.alert("Retry, update app or call customer care")
      return;}
          
     }       
    
    
    setAmount("");
    setUsrPWd("")
    setAgentPhn("");    
  }; 

  

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
            const UsrPWdss=UsrPWd
              if(!UsrPWdss && UsrPWdss!=="")
              {
                setUsrPWd("");
                return;
              }
              setUsrPWd(UsrPWdss);
              }, [UsrPWd]
               );

               useEffect(() =>{
                const agphn=AgentPhn
                  if(!agphn && agphn!=="")
                  {
                    setAgentPhn("");
                    return;
                  }
                  setAgentPhn(agphn);
                  }, [AgentPhn]
                   );

  

  


  return (
   
     
        
        <ScrollView>
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill Details Below</Text>
          </View>
      

          <View style={styles.sendAmtView}>
            <TextInput
            placeholder="+2547xxxxxxxx"
              value={AgentPhn}
              onChangeText={setAgentPhn}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>MFNdogo Phone</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
            keyboardType={"decimal-pad"}
              value={amount}
              onChangeText={setAmount}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Amount</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
              value={UsrPWd}
              onChangeText={setUsrPWd}
              secureTextEntry = {true}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>User PW</Text>
          </View>

          <TouchableOpacity onPress={fetchAcDtls} style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Click to Withdraw</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>
        </ScrollView>
      
  );
};

export default SMADepositForm;