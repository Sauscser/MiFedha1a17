import React, {useEffect, useState} from 'react';

import {
  createAgentWithdrawals,
  createBankAdmWithdrawals,
  createFloatAdd,
  createFloatReduction, 

  createSAgentWithdrawals, 

  updateAgent,
  updateCompany,
  updateSAgent,
  updateSMAccount,
  
} from '../../../src/graphql/mutations';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getAgent, getBankAdmin, getCompany, getSAgent, getSMAccount} from '../../../src/graphql/queries';
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

const MFNWthdwl = props => {
  

  const[UsrPWd, setUsrPWd] = useState("");
  const [MFKPhn, setMFKPhn] = useState("");
  const [amount, setAmount] = useState("");
  const[isLoading, setIsLoading] = useState(false);
 

  
  

  

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
      
      const usrStts = accountDtl.data.getSMAccount.acStatus; 
      
     
      const owners = accountDtl.data.getSMAccount.owner;
      const namess = accountDtl.data.getSMAccount.name;
         
      
      const fetchMFNDtls = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
          const MFNDtl:any = await API.graphql(
            graphqlOperation(getAgent, {phonecontact: MFKPhn}),
          );    
         
          const agentEarningBals = MFNDtl.data.getAgent.agentEarningBal;
          const pws = MFNDtl.data.getAgent.pw;
          const names = MFNDtl.data.getAgent.name;
          const statussssss = MFNDtl.data.getAgent.status;
          const bankNames = MFNDtl.data.getAgent.bankName;
          const bkAcNos = MFNDtl.data.getAgent.bkAcNo;
          
          
                          
                          const CrtMFNWthdrwls = async () => {
                            try {
                              await API.graphql(
                                graphqlOperation(createAgentWithdrawals, {
                                  input: {
                                  
                                    bankAdminId: "BnkkAdmNatId",                    
                                    agentPhone:MFKPhn,
                                    owner: userInfo.attributes.sub,
                                    Amount: amount,
                                    bankName: bankNames,
                                    bkAcNo: bkAcNos,
                                    status: 'AccountActive',
                                  },
                                }),
                              );
            
                    } catch (error) {
                      if (error){
                        Alert.alert("Withdrawal unsuccessful; Retry")
                        return
                      }
                    }

                    await UpdateMFN();
                    setIsLoading(false);

                    Alert.alert(names + ", You have Withdrawn Ksh. "+ amount)
                    
                    };  

                    const UpdateMFN = async () => {
                      try {
                        await API.graphql(
                          graphqlOperation(updateAgent, {
                            input: {
                            
                              phonecontact: MFKPhn,                    
                              agentEarningBal:parseFloat(agentEarningBals) - parseFloat(amount),
                            },
                          }),
                        );
      
              } catch (error) {
                console.log(error)
                if(error){Alert.alert("Retry or update app or call customer care")
              return;}
              }
              setIsLoading(false);

              
              };  
        
                    
                      
                    
                    if (parseFloat(amount) > parseFloat(agentEarningBals)) {
                      Alert.alert("Insufficient MFNdogo Balance")
                      return;
                    } 
        
                    

                    else if (statussssss!=="AccountActive") {
                      Alert.alert("MFNdogo Account is inactive")
                      return;
                    } 

                    else if (userInfo.attributes.sub!==owners) {
                      Alert.alert("Please first create a main account")
                      return;
                    }  

                    
                   
                    
                    else if (UsrPWd!==pws) {
                      Alert.alert("MFNdogo credentials are wrong; access denied")
                      return;
                    } 
        
                    else{await CrtMFNWthdrwls()}   
        
        
                   
                    
      
    }     
    catch (e) {
      
      if (e){Alert.alert("Retry or update app or call customer care")
      return;}
         
    }   
  setIsLoading(false);
};

    await fetchMFNDtls();
    }

    catch (e) {
      
      if (e){Alert.alert("Retry or update app or call customer care")
      return;}
          
     }       
    setIsLoading(false)
    
    setAmount("");
    setUsrPWd("")
    setMFKPhn("");    
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
                const MFKPhns=MFKPhn
                  if(!MFKPhns && MFKPhns!=="")
                  {
                    setMFKPhn("");
                    return;
                  }
                  setMFKPhn(MFKPhns);
                  }, [MFKPhn]
                   );

  

  


  return (
    <View>
      <View>
        
        <ScrollView>
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill Account Details Below</Text>
          </View>
      

          <View style={styles.sendAmtView}>
            <TextInput
            placeholder="+2547xxxxxxxx"
              value={MFKPhn}
              onChangeText={setMFKPhn}
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
            <Text style={styles.sendAmtText}>MFN PW</Text>
          </View>

          <TouchableOpacity onPress={fetchAcDtls} style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Click to Withdraw</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default MFNWthdwl;