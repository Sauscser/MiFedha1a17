import React, {useEffect, useState} from 'react';

import {
  createFloatAdd,
   

  updateAgent,
  updateCompany,
  updateSAgent,
  updateSMAccount,
  
} from '../../../../src/graphql/mutations';
import { useRoute } from '@react-navigation/native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getAgent, getCompany, getSAgent, getSMAccount, listCovCreditSellers, 
  listCvrdGroupLoans, listGroupNonLoans,   listSMLoansCovereds} from '../../../../src/graphql/queries';
import {
  View,
  Text,
StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';


import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import MyAccount from '../../../Transport';

const SMADepositForm = props => {
  

  const[UsrPWd, setUsrPWd] = useState("");
  const [AgentPhn, setAgentPhn] = useState("");
  const [amount, setAmount] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const [ConfirmPWd, setConfirmPWd] = useState('');
  
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()

  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps")
 }
  
const route = useRoute();
  
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

    const userDtlsxz = accountDtl.data.getSMAccount
    
    const usrBala = accountDtl.data.getSMAccount.balance;      
    const TtlWthdrwnSMs = accountDtl.data.getSMAccount.TtlWthdrwnSM;
    const usrStts = accountDtl.data.getSMAccount.acStatus; 
    const withdrawalLimits = accountDtl.data.getSMAccount.withdrawalLimit;  
    const pws = accountDtl.data.getSMAccount.pw;
    const owners = accountDtl.data.getSMAccount.owner;
    const names = accountDtl.data.getSMAccount.name;

    if (!userDtlsxz) {
      Alert.alert(
        "Pls create a main account on the home screen"
      )
    }

   console.log (pws)
   console.log(UsrPWd)

    const fetchCvLnSM = async () => {
      setLoading(true);
      
    
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
                      setLoading(true);
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
                                      setLoading(true);
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
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
          const AgentBal:any = await API.graphql(
            graphqlOperation(getAgent, {phonecontact: route.params.phonecontact}),
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
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{
              const compDtlsxzc :any= await API.graphql(
              graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
                );
                  const ttlUserWthdrwls = compDtlsxzc.data.getCompany.ttlUserWthdrwl;
                  const agentComs = compDtlsxzc.data.getCompany.agentCom;
                  const sagentComs = compDtlsxzc.data.getCompany.sagentCom;
                  const companyComs = compDtlsxzc.data.getCompany.companyCom;
                  const UsrWthdrwlFeess = compDtlsxzc.data.getCompany.UsrWthdrwlFees;

                  const ChampCom = compDtlsxzc.data.getCompany.ChampCom;
                 
                  const companyEarningBals = compDtlsxzc.data.getCompany.companyEarningBal
                  const companyEarnings = compDtlsxzc.data.getCompany.companyEarning
                  const agentEarningBals = compDtlsxzc.data.getCompany.agentEarningBal
                  const agentEarnings = compDtlsxzc.data.getCompany.agentEarning
                  const saEarningBals = compDtlsxzc.data.getCompany.saEarningBal
                  const saEarnings = compDtlsxzc.data.getCompany.saEarning
                  const agentFloatIns = compDtlsxzc.data.getCompany.agentFloatIn                 
                  
                  const gtsaDtls = async () =>{
                    if(isLoading){
                      return;
                    }
                    setIsLoading(true);
                    try{
                      const compDtls :any= await API.graphql(
                      graphqlOperation(getSAgent,{saPhoneContact:sagentregnos})
                        );
                          const TtlEarningss = compDtls.data.getSAgent.TtlEarnings;
                          const saBalances = compDtls.data.getSAgent.saBalance;
                          const acChamp = compDtls.data.getSAgent.acChamp;
                          const namessssssss = compDtls.data.getSAgent.name;
                          const MFKWithdrwlFees = compDtls.data.getSAgent.MFKWithdrwlFee;
                          const AgentCommission = (parseFloat(agentComs) - parseFloat(MFNWithdrwlFees))/100*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)                                                
                          const saCommission = (parseFloat(sagentComs) - parseFloat(MFKWithdrwlFees))/100*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)
                          const compCommission = parseFloat(companyComs)/100*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)
                          const ChampCommission = parseFloat(ChampCom)/100*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)
                          const UsrWithdrawalFee = AgentCommission+saCommission+compCommission+ChampCommission;
                          const TTlAmtTrnsctd = parseFloat(amount) + UsrWithdrawalFee


                          const gtMFChamp = async () =>{
                            if(isLoading){
                              return;
                            }
                            setIsLoading(true);
                            try{
                              const compDtlsx :any= await API.graphql(
                              graphqlOperation(getSMAccount,{awsemail:acChamp})
                                );
                                  const balancesx = compDtlsx.data.getSMAccount.mfchampEarnings;
                                  

                                  console.log(amount)
                                  console.log(route.params.phonecontact)
                                  console.log(userInfo.attributes.email)
                                  console.log(parseFloat(usrBala) - TTlAmtTrnsctd)
                                  console.log(amount)
                                  console.log(UsrWithdrawalFee)
                                  console.log(TTlAmtTrnsctd)
                                  
                          
                          const CrtFltAdd = async () => {
                            try {
                              await API.graphql(
                                graphqlOperation(createFloatAdd, {
                                  input: {
                                  
                                    withdrawerid: userInfo.attributes.email,                    
                                    agentPhonecontact: route.params.phonecontact,
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
            
                    } catch (error) {
                      if (error){
                        console.log(error)
                        Alert.alert("Withdrawal unsuccessful; Retry")
                        return
                      }
                    }
                    setIsLoading(false);
                    await onUpdtUsrBal();
                    };  
        
                    const onUpdtUsrBal = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
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
                      }
        
                      catch (error) {
                        console.log(error)
                        if (error){Alert.alert("Retry, or update app or call customer care")
                        return;}
                      }
                      setIsLoading(false);
                      await onUpdtAgntBal();
                      }; 
        
                      const onUpdtAgntBal = async () => {
                        if(isLoading){
                          return;
                        }
                        setIsLoading(true);
                        try {
                          await API.graphql(
                            graphqlOperation(updateAgent, {
                              input: {
                                phonecontact: route.params.phonecontact,                   
                               
                                ttlEarnings: (parseFloat(ttlEarningssss) + AgentCommission).toFixed(0),
                                agentEarningBal: (parseFloat(agentEarningBalsss) + AgentCommission).toFixed(0),
                                floatBal: (parseFloat(floatBals) + parseFloat(amount)).toFixed(0),
                                TtlFltIn: (parseFloat(TtlFltInsss) + parseFloat(amount)).toFixed(0),

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
                        await onUpdtsaDtls();
                        }; 
        
                        
        
                          const onUpdtsaDtls = async () => {
                            if(isLoading){
                              return;
                            }
                            setIsLoading(true);
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
                            }
            
                            catch (error) {
                              console.log(error)
                              if (error){Alert.alert("Retry, or update app or call customer care")
                              return;}
                            }
                            await onUpdtCompDtls();
                            setIsLoading(false);
                            }; 

                            const onUpdtCompDtls = async () => {
                              if(isLoading){
                                return;
                              }
                                setIsLoading(true);
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
                              Alert.alert(names + " has withdrawn Ksh. " + parseFloat(amount).toFixed(2) 
                              + " from " + namess + " MFNdogo");
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
                                }
                  
                                catch (error) {
                                  console.log(error)
                                  if (error){Alert.alert("Retry, or update app or call customer care")
                                  return;}
                                }
                                setIsLoading(false);
                                
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
        
                    else{await CrtFltAdd()}   
        
        
                    } catch (error) {
                      console.log(error)
                  if (error){Alert.alert("Retry, update app or call customer care")
                          return;}
                    }
                    setIsLoading(false);
                    };    
        
                    await gtMFChamp();        
                    
                  } catch (error) {
                    console.log(error)
                if (error){Alert.alert("Retry, update app or call customer care")
                        return;}
                  }
                  setIsLoading(false);
                  };    
      
                  await gtsaDtls();      
            
            } catch (error) {
              console.log(error)
          if (error){Alert.alert("Retry, update app or call customer care")
                  return;}
            }
           setIsLoading(false);
            };    

            await gtCompDtls();           
      
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Retry, update app or call customer care")
      return;}
         
    }   
  setIsLoading(false);
};

    await fetchAgtBal();

  

}     
  catch (e) {
    console.log(e)
    if (e){Alert.alert("Retry, update app or call customer care")
    return;}
       
  }   
setIsLoading(false);
};

  await fetchCLChm();



}     
  catch (e) {
    console.log(e)
    if (e){Alert.alert("Retry, update app or call customer care")
    return;}
       
  }   
setIsLoading(false);
};

  await fetchCLCrdSl();



}     
  catch (e) {
    console.log(e)
    if (e){Alert.alert("Retry, update app or call customer care")
    return;}
       
  }   
setIsLoading(false);
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
    setIsLoading(false)
    setConfirmPWd("");
    setAmount("");
    setUsrPWd("");
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
                const agphn=ConfirmPWd
                  if(!agphn && agphn!=="")
                  {
                    setConfirmPWd("");
                    return;
                  }
                  setConfirmPWd(agphn);
                  }, [ConfirmPWd]
                   );
return (
    <LinearGradient
      colors={['#FFA500', '#87CEEB']} // orange to sky blue
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}>
      
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.amountTitleView}>
          <Text style={styles.title}>Fill Details Below</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Main Account Password</Text>
          <TextInput
            value={UsrPWd}
            onChangeText={setUsrPWd}
            secureTextEntry
            style={styles.input}
          />
        </View>


        <TouchableOpacity onPress={fetchAcDtls} style={styles.button}>
          <Text style={styles.buttonText}>Click to Withdraw</Text>
          {isLoading && <ActivityIndicator size="small" color="#fff" />}
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  amountTitleView: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: 'white',
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: 'skyblue',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#FFA500',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default SMADepositForm;