import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  createFloatReduction, 

  updateAgent,
  updateBizna,
  updateCompany,
  updateSMAccount,
} from '../../../../src/graphql/mutations';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getAgent, getBizna, getCompany, getSMAccount} from '../../../../src/graphql/queries';
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

import { LinearGradient } from 'expo-linear-gradient';

const SMADepositForm = props => {
  const [nationalId, setNationalid] = useState("");

  const[agPWd, setAgPWd] = useState("");
  const [AgentPhn, setAgentPhn] = useState("");
  const [amount, setAmount] = useState("");
  const [UsrId, setUsrId] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const [ownr, setownr] = useState(null);

  
  

  

  const fetchAcDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);
    const userInfo = await Auth.currentAuthenticatedUser();
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getBizna, {BusKntct: nationalId}),
      );

      const TtlEarnings = accountDtl.data.getBizna.TtlEarnings;      
      const earningsBal = accountDtl.data.getBizna.earningsBal;
      const netEarnings = accountDtl.data.getBizna.netEarnings;  
      const usrStts = accountDtl.data.getBizna.netEarnings; 
      
      const names = accountDtl.data.getBizna.busName;  

      const Admin1 = accountDtl.data.getBizna.Admin1;  
       
      
      const fetchAgtBal = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
          const AgentBal:any = await API.graphql(
            graphqlOperation(getAgent, {phonecontact: AgentPhn}),
          );    
         
          const agtTtlFtOut = AgentBal.data.getAgent.TtlFltOut;
          const agtFltBl = AgentBal.data.getAgent.floatBal;
          const agPW = AgentBal.data.getAgent.pw;
          const agentNames = AgentBal.data.getAgent.name;
          const AgAcAct = AgentBal.data.getAgent.status;
          const owners = AgentBal.data.getAgent.owner;
          
          
          const gtCompDtls = async () =>{
            if(isLoading){
                return;
            }
            setIsLoading(true)
            try{
              const compDtls :any= await API.graphql(
              graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
                );
                  const ttlUsrDpsts = compDtls.data.getCompany.ttlUsrDep
                  const agentFloatOuts = compDtls.data.getCompany.agentFloatOut

                  const gtOwnerDtls = async () =>{
                    if(isLoading){
                        return;
                    }
                    setIsLoading(true)
                    try{
                      const compDtlsxz :any= await API.graphql(
                      graphqlOperation(getSMAccount,{awsemail:Admin1})
                        );
                          const nationalidz = compDtlsxz.data.getSMAccount.nationalid
                          

                  const CrtFltRed = async () => {
                    try {
                      await API.graphql(
                        graphqlOperation(createFloatReduction, {
                          input: {
                            
                            depositerid: nationalId,                    
                            agContact: AgentPhn,
                            agentName:agentNames,
                            userName:names,
                            amount: amount,
                            status: 'AccountActive',
                          },
                          
                        }),
                      );
                      
    
            } catch (error) {
              if (error){
                Alert.alert("Deposit unsuccessful; Retry")
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
                  graphqlOperation(updateBizna, {
                    input: {
                      BusKntct: nationalId,
          
                      TtlEarnings: (parseFloat(TtlEarnings) + parseFloat(amount)).toFixed(2),
                      earningsBal: (parseFloat(earningsBal) + parseFloat(amount)).toFixed(2),
                      netEarnings: (parseFloat(netEarnings) + parseFloat(amount)).toFixed(2),
                    },
                  }),
                );
              }

              catch (error) {
                console.log(error)
                if (error){Alert.alert("Error! Update app or call customer care")
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
            
                       
                        TtlFltOut: (parseFloat(agtTtlFtOut) + parseFloat(amount)).toFixed(2),
                        floatBal: (parseFloat(agtFltBl) - parseFloat(amount)).toFixed(2),
                      },
                    }),
                  );
                }

                catch (error) {
                  console.log(error)
                  if (error){Alert.alert("Error! Update app or call customer care")
                  return;}
                }
                setIsLoading(false);
                await onUpdtCompBal();
                }; 

                const onUpdtCompBal = async () => {
                  if(isLoading){
                    return;
                  }
                  setIsLoading(true);
                  try {
                    await API.graphql(
                      graphqlOperation(updateCompany, {
                        input: {
                          AdminId:"BaruchHabaB'ShemAdonai2",
              
                         
                          ttlUsrDep: parseFloat(ttlUsrDpsts) + parseFloat(amount),
                          agentFloatOut: parseFloat(agentFloatOuts) + parseFloat(amount),
                        },
                      }),
                    );
                  }
  
                  catch (error) {
                    console.log(error)
                    
                  }
                  Alert.alert("Ksh. " + amount+" deposited in "+ names+ "'s ac ");
                  Communications.textWithoutEncoding(nationalId,
                    'Confirmed. You have successfully deposited Ksh. '+ amount + ' into your Business account.'
                    + ' Please confirm this deposit record is on your MiFedha app. Thank you. MiFedha');
                  setIsLoading(false);
                  }; 
            
            if (usrStts==="AccountInactive") {
              Alert.alert("User Account is inactive")
              return;
            } 

           
           
           else if (AgAcAct==="AccountInactive") {
              Alert.alert("MFNdogo Account is Inactive")
              return;
            } 

           
           else if (parseFloat(agtFltBl)<parseFloat(amount)) {
              Alert.alert("Insufficient MFNdogo Balance: Ksh " +agtFltBl)
              return;
            } 
            else if (agPW!==agPWd) {
              Alert.alert("MFNdogo access denied")
              return;
            } 
            
          

            else{CrtFltRed()}   
            
            
          } catch (error) {
            console.log(error)
        if (error){Alert.alert("Error! Update app or call customer care")
                return;}
          }
          setIsLoading(false);
          };    

          await gtOwnerDtls();      
        
        } catch (error) {
              console.log(error)
          if (error){Alert.alert("Error! Update app or call customer care")
                  return;}
            }
            setIsLoading(false);
            };    

            await gtCompDtls();           
      
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Error! Update app or call customer care")
      return;}
         
    }   
  setIsLoading(false);
};

    await fetchAgtBal();
    }

    catch (e) {
      console.log(e)
      if (e){Alert.alert("Error! Update app or call customer care")
      return;}
          
     }       
    setIsLoading(false);
    setNationalid("");
    setAmount("");
    setAgPWd("")
    setAgentPhn("");  
    setUsrId("");   
  }; 

  useEffect(() =>{
    const UsrIds=UsrId
      if(!UsrIds && UsrIds!=="")
      {
        setUsrId("");
        return;
      }
      setUsrId(UsrIds);
      }, [UsrId]
       );
       
       useEffect(() =>{
    const usId=nationalId
      if(!usId && usId!=="")
      {
        setNationalid("");
        return;
      }
      setNationalid(usId);
      }, [nationalId]
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
            const pws=agPWd
              if(!pws && pws!=="")
              {
                setAgPWd("");
                return;
              }
              setAgPWd(pws);
              }, [agPWd]
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
    <LinearGradient
      colors={['#e58d29', 'skyblue']}
      style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Fill Account Details Below</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Phone</Text>
          <TextInput
            placeholder="e.g. 0712XXXXXX"
            value={nationalId}
            onChangeText={setNationalid}
            style={styles.input}
            placeholderTextColor="#95A5A6"
          />
        </View>


        <View style={styles.inputGroup}>
          <Text style={styles.label}>MFNdogo Phone</Text>
          <TextInput
            placeholder="+2547xxxxxxxx"
            value={AgentPhn}
            onChangeText={setAgentPhn}
            style={styles.input}
            placeholderTextColor="#95A5A6"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            placeholder="e.g. 500"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
            placeholderTextColor="#95A5A6"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>MFNdogo Password</Text>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            value={agPWd}
            onChangeText={setAgPWd}
            style={styles.input}
            placeholderTextColor="#95A5A6"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={fetchAcDtls}>
          <Text style={styles.buttonText}>Click to Deposit</Text>
          {isLoading && <ActivityIndicator size="small" color="#fff" />}
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default SMADepositForm;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 22,
    color: '#ECF0F1',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#ECF0F1',
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  button: {
    backgroundColor: '#e58d29',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
});