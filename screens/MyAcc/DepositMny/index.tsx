import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  createFloatReduction, 

  updateAgent,
  updateCompany,
  updateSMAccount,
} from '../../../src/graphql/mutations';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getAgent, getCompany, getSMAccount} from '../../../src/graphql/queries';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';


const SMADepositForm = props => {
  const [nationalId, setNationalid] = useState("");

  const[agPWd, setAgPWd] = useState("");
  const [AgentPhn, setAgentPhn] = useState("");
  const [amount, setAmount] = useState("");
  const [UsrId, setUsrId] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const [ownr, setownr] = useState(null);

  
  

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    setownr(userInfo.attributes.sub);  
     
  }

  useEffect(() => {
    fetchUser();
    }, []);  


  const fetchAcDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getSMAccount, {awsemail: nationalId}),
      );

      const usrBala = accountDtl.data.getSMAccount.balance;      
      const usrTlDpst = accountDtl.data.getSMAccount.ttlDpstSM;
      const usrStts = accountDtl.data.getSMAccount.acStatus; 
      const depositLimits = accountDtl.data.getSMAccount.depositLimit;
      const names = accountDtl.data.getSMAccount.name;  
      const nationalids = accountDtl.data.getSMAccount.nationalid; 
      const MaxAcBals = accountDtl.data.getSMAccount.MaxAcBal; 
      const phonecontact = accountDtl.data.getSMAccount.phonecontact;

      const WalCap = parseFloat(usrBala) + parseFloat(amount);
      console.log(WalCap)
         
      
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
                  graphqlOperation(updateSMAccount, {
                    input: {
                      awsemail: nationalId,
          
                      balance: (parseFloat(usrBala) + parseFloat(amount)).toFixed(2),
                      ttlDpstSM: (parseFloat(usrTlDpst) + parseFloat(amount)).toFixed(2),
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
            
                       
                        TtlFltOut: (parseFloat(agtTtlFtOut) + parseFloat(amount)).toFixed(2),
                        floatBal: (parseFloat(agtFltBl) - parseFloat(amount)).toFixed(2),
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
                  Communications.textWithoutEncoding(phonecontact,
                    'Confirmed. You have successfully deposited Ksh. '+ amount + ' into your main account.'
                    + ' Please confirm this deposit record is on your MiFedha app. Thank you. MiFedha');
                  setIsLoading(false);
                  }; 
            
            if (usrStts==="AccountInactive") {
              Alert.alert("User Account is inactive")
              return;
            } 

            else if (nationalids!==UsrId) {
              Alert.alert("Depositer ID is wrong")
              return;
            } 
            
            else if(parseFloat(amount)>parseFloat(depositLimits)) {
              Alert.alert('Limit exceeded; call customer care for adjusment');
              return;
            }
           else if (AgAcAct==="AccountInactive") {
              Alert.alert("MFNdogo Account is Inactive")
              return;
            } 

            else if ((WalCap) > parseFloat(MaxAcBals)) {
              Alert.alert("Depositor call customer care to have wallet capacity adjusted")
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
          if (error){Alert.alert("Check your internet connection")
                  return;}
            }
            setIsLoading(false);
            };    

            await gtCompDtls();           
      
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("MFNdogo does not exist")
      return;}
         
    }   
  setIsLoading(false);
};

    await fetchAgtBal();
    }

    catch (e) {
      console.log(e)
      if (e){Alert.alert("Retry or update app or call customer care")
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Fill Account Details Below</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Depositor Email</Text>
            <TextInput
              placeholder="User Email"
              value={nationalId}
              onChangeText={setNationalid}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Depositor ID</Text>
            <TextInput
              placeholder="User ID"
              value={UsrId}
              onChangeText={setUsrId}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>MFNdogo Phone</Text>
            <TextInput
              placeholder="+2547xxxxxxxx"
              value={AgentPhn}
              onChangeText={setAgentPhn}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              placeholder="Enter amount"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>MFNdogo Password</Text>
            <TextInput
              placeholder="Enter password"
              value={agPWd}
              onChangeText={setAgPWd}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={fetchAcDtls}>
            <Text style={styles.buttonText}>Click to Deposit</Text>
            {isLoading && <ActivityIndicator size="small" color="#fff" style={{ marginTop: 8 }} />}
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SMADepositForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e58d29',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    color: '#00bfff',
    fontSize: 15,
    fontWeight: '500',
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 14,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#e58d29',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});