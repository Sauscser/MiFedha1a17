import React, {useEffect, useState} from 'react';

import {
  createFloatAdd,
   

  updateAgent,
  updateCompany,
  updateGroup,
  updateSAgent,
  updateSMAccount,
  
} from '../../../src/graphql/mutations';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getAgent, getCompany, getGroup, getSAgent, getSMAccount} from '../../../src/graphql/queries';
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

const SMADepositForm = props => {
  const [WthDrwrPhn, setWthDrwrPhn] = useState(null);
  const[ChmKntct, setChmKntct] = useState("");
  const[UsrPWd, setUsrPWd] = useState("");
  const [AgentPhn, setAgentPhn] = useState("");
  const [amount, setAmount] = useState("");
  const[isLoading, setIsLoading] = useState(false);
 

  
  

 


  const fetchChmDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);
    const userInfo = await Auth.currentAuthenticatedUser();
    
    try {
      const ChmDtl:any = await API.graphql(
        graphqlOperation(getGroup, {grpContact: ChmKntct}),
      );

      const grpBals = ChmDtl.data.getGroup.grpBal;      
      const ttlWthdrwns = ChmDtl.data.getGroup.ttlWthdrwn;
      const usrStts = ChmDtl.data.getGroup.status; 
      const pws = ChmDtl.data.getGroup.signitoryPW;
      const owners = ChmDtl.data.getGroup.owner;
      const names = ChmDtl.data.getGroup.grpName;
      const WithdrawCnfrmtnAmt = ChmDtl.data.getGroup.WithdrawCnfrmtnAmt;
      const WithdrawCnfrmtns = ChmDtl.data.getGroup.WithdrawCnfrmtn;  
      const WithdrawCnfrmtnAmt2 = ChmDtl.data.getGroup.WithdrawCnfrmtnAmt2;
      const WithdrawCnfrmtn2 = ChmDtl.data.getGroup.WithdrawCnfrmtn2;  
      const WithdrawalSync = ChmDtl.data.getGroup.WithdrawalSync;
      
         
      
      const fetchAgtBal = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
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
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{
              const compDtls :any= await API.graphql(
              graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
                );
                  const ttlUserWthdrwls = compDtls.data.getCompany.ttlUserWthdrwl;
                  
                  const companyComs = compDtls.data.getCompany.companyCom;
                  const UsrWthdrwlFeess = compDtls.data.getCompany.UsrWthdrwlFees;
                  

                  
                  const agentEarningBals = compDtls.data.getCompany.agentEarningBal
                  const agentEarnings = compDtls.data.getCompany.agentEarning
                  const saEarningBals = compDtls.data.getCompany.saEarningBal
                  const saEarnings = compDtls.data.getCompany.saEarning
                  const agentFloatIns = compDtls.data.getCompany.agentFloatIn     
                  const ChampCom = compDtls.data.getCompany.ChampCom            
                  
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
                          const namessssssss = compDtls.data.getSAgent.name;
                          const MFKWithdrwlFees = compDtls.data.getSAgent.MFKWithdrwlFee;
                          const AgentCommission = parseFloat(MFNWithdrwlFees)*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)                                                
                          const saCommission =    parseFloat(MFKWithdrwlFees)*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)
                          const compCommission = parseFloat(companyComs)*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)

                          const UsrWithdrawalFee = AgentCommission+saCommission;

                          const TTlAmtTrnsctd = parseFloat(amount) + UsrWithdrawalFee
                          const acChamp = compDtls.data.getSAgent.acChamp;
                          const ChampCommission = parseFloat(ChampCom)*parseFloat(amount)*parseFloat(UsrWthdrwlFeess)

                          const gtMFChamp = async () =>{
                            if(isLoading){
                              return;
                            }
                            setIsLoading(true);
                            try{
                              const compDtlsx :any= await API.graphql(
                              graphqlOperation(getSMAccount,{awsemail:acChamp})
                                );
                                  const balancesx = compDtlsx.data.getSMAccount.balance;
                                  


                          const CrtFltAdd = async () => {
                            try {
                              await API.graphql(
                                graphqlOperation(createFloatAdd, {
                                  input: {
                                  
                                    withdrawerid: ChmKntct,                    
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
            
                    } catch (error) {
                      console.log(error)
                      if(!error){
                        Alert.alert("Account deactivated successfully")
                        
                    } 
                    else{Alert.alert("Please check your internet connection")
                    return;}
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
                          graphqlOperation(updateGroup, {
                            input: {
                              grpContact: ChmKntct,
                              WithdrawalSync: parseFloat(WithdrawalSync) + TTlAmtTrnsctd.toFixed(0),
                              grpBal: (parseFloat(grpBals) - TTlAmtTrnsctd).toFixed(0) ,
                              ttlWthdrwn: (parseFloat(ttlWthdrwns) + parseFloat(amount)).toFixed(0),
                              WithdrawCnfrmtn: "NO",
                              WithdrawCnfrmtn2: "NO"
                            },
                          }),
                        );
                      }
        
                      catch (error) {
                        console.log(error)
                        if (error){Alert.alert("Check internet Connection")
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
                                phonecontact: AgentPhn,
                    
                               
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
                          if (error){Alert.alert("Check internet Connection")
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
                              if (error){Alert.alert("Check internet Connection")
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
                                if (error){Alert.alert("Check internet Connection")
                                return;}
                              }
                              setIsLoading(false);
                              await onUpdtMFChamp ()
                              Alert.alert(names + " has withdrawn Ksh. " + parseFloat(amount).toFixed(2) + " from " + namess + " MFNdogo");
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
                            
                                        balance: (ChampCommission + balancesx).toFixed(0) ,
                                        
                                      },
                                    }),
                                  );
                                }
                  
                                catch (error) {
                                  console.log(error)
                                  if (error){Alert.alert("Check internet Connection")
                                  return;}
                                }
                                setIsLoading(false);
                                
                                }; 
                    
                    
                    
                              if (WithdrawCnfrmtns==="NO") {
                                Alert.alert("Let signatory 2 confirm withdrawal first")
                                return;
                              } 

                              else if (WithdrawCnfrmtnAmt !== parseFloat(amount)) {
                                Alert.alert("Enter amount agreed with signatory 2 ")
                                return;
                              } 

                              else if (WithdrawCnfrmtn2==="NO") {
                                Alert.alert("Let signatory 3 confirm withdrawal first")
                                return;
                              } 

                              else if (WithdrawCnfrmtnAmt2 !== parseFloat(amount)) {
                                Alert.alert("Enter amount agreed with signatory 3 ")
                                return;
                              } 
                              
                             else if (TTlAmtTrnsctd > parseFloat(grpBals)) {
                      Alert.alert("Insufficient Chama Balance")
                      return;
                    } 
        
                    else if (usrStts==="AccountInactive") {
                      Alert.alert("Chama Account has been deactivated")
                      return;
                    } 

                    else if (userInfo.attributes.sub !==owners) {
                      Alert.alert("You are not the main chama signitory")
                      return;
                    }  

                    
                    if (AgAcAct==="AccountInactive") {
                      Alert.alert("MFNdogo Account has been deactivated")
                      return;
                    } 
                    
                    if (UsrPWd!==pws) {
                      Alert.alert("User credentials are wrong; access denied")
                      return;
                    } 
        
                    else{await CrtFltAdd()}   
        
        
                    } catch (error) {
                      console.log(error)
                  if (error){Alert.alert("Check your internet connection")
                          return;}
                    }
                    setIsLoading(false);
                    };    
        
                    await gtMFChamp();      
                  
                  } catch (error) {
                      console.log(error)
                  if (error){Alert.alert("Check your internet connection")
                          return;}
                    }
                    setIsLoading(false);
                    };    
        
                    await gtsaDtls();         
            
            } catch (error) {
              console.log(error)
          if (error){Alert.alert("Check your internet connection")
                  return;}
            }
           setIsLoading(false);
            };    

            await gtCompDtls();           
      
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Check your internet connection")
      return;}
         
    }   
  setIsLoading(false);
};

    await fetchAgtBal();
    }

    catch (e) {
      console.log(e)
      if (e){Alert.alert("Check your internet connection")
      return;}
          
     }       
    setIsLoading(false)
    
    setAmount("");
    setUsrPWd("")
    setAgentPhn("");    
    setChmKntct("")
  }; 

  

  useEffect(() =>{
    const ChmKntcts=ChmKntct
      if(!ChmKntcts && ChmKntcts!=="")
      {
        setChmKntct("");
        return;
      }
      setChmKntct(ChmKntcts);
      }, [ChmKntct]
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
            <Text style={styles.sendAmtText}>MFNdogo Number</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
            
              value={ChmKntct}
              onChangeText={setChmKntct}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Chama Account</Text>
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
            <Text style={styles.sendAmtText}>Chama PassWord</Text>
          </View>

          <TouchableOpacity onPress={fetchChmDtls} style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Click to Withdraw</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>
        </ScrollView>
      
  );
};

export default SMADepositForm;