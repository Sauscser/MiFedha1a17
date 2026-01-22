import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  
  createSMLoansCovered,
  
  
  
  createNonLoans,
  
  updateCompany,
  
  updateSMAccount,
  updateBizna,
  
} from '../../../src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  
  getBizna,
  getCompany,
  getSMAccount,
  listCovCreditSellers,
  listCvrdGroupLoans,
  listSMLoansCovereds,
 
} from '../../../src/graphql/queries';

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

 const NoBizBen = () => {
  navigation.navigate("PayCash")
}
  
  
 
    const fetchCvLnSM = async () => {
      setIsLoading(true);

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
                      setIsLoading(true);
                      try {
                        const Lonees3:any = await API.graphql(graphqlOperation(listCovCreditSellers, 
                          { filter: {
                              and: {
                                status: { eq: "LoanBL"},
                        lonBala: { gt: 0},
                        buyerContact: { eq: SenderNatId},
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

                                            



  const fetchSenderUsrDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(false);
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getBizna, {BusKntct: SenderNatId}),
      );

      const SenderUsrBal =accountDtl.data.getBizna.netEarnings;                    
      const bizBeneficiaryz =accountDtl.data.getBizna.bizBeneficiary; 
      const bizTypez =accountDtl.data.getBizna.bizType;
      const name =accountDtl.data.getBizna.busName;
      const ownerz =accountDtl.data.getBizna.owner;
      const SenderAcstatus =accountDtl.data.getBizna.status;
      const pw =accountDtl.data.getBizna.pw;
      const noBL =accountDtl.data.getBizna.noBL;

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
          
            
          const UsrTransferFee = CompDtls.data.getCompany.userTransferFee;
          const UsrTransferFeeAmt = UsrTransferFee*parseFloat(amounts);
          const UsrTransferFee2 = parseFloat(SenderUsrBal) -parseFloat(amounts);
          const TotalTransacted = parseFloat(amounts)  + parseFloat(UsrTransferFee)*parseFloat(amounts);
          const TotalTransacted2 = parseFloat(amounts)  + UsrTransferFee2;
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact;         
          
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
          const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM; 
          
         
                    
          const fetchRecUsrDtls = async () => {
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try {
                const RecAccountDtl:any = await API.graphql(
                    graphqlOperation(getBizna, {BusKntct: RecNatId}),
                    );
                    const RecUsrBal =RecAccountDtl.data.getBizna.netEarnings;                    
                    const bizBeneficiary =RecAccountDtl.data.getBizna.bizBeneficiary; 
                    const bizType =RecAccountDtl.data.getBizna.bizType;
                    const namess =RecAccountDtl.data.getBizna.busName;
                    const RecAcstatus =RecAccountDtl.data.getBizna.status;

                    const fetchSenderBizUsrDtls = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(false);
                      try {
                        const accountDtl7:any = await API.graphql(
                          graphqlOperation(getSMAccount, {awsemail: bizBeneficiaryz}),
                        );
                  
                        const SenderUsrBal7 =accountDtl7.data.getSMAccount.balance;

                        const fetchRecBizUsrDtls = async () => {
                          if(isLoading){
                            return;
                          }
                          setIsLoading(false);
                          try {
                            const accountDtl7:any = await API.graphql(
                              graphqlOperation(getSMAccount, {awsemail: bizBeneficiary}),
                            );
                      
                            const SenderUsrBal8 =accountDtl7.data.getSMAccount.balance;

                    
                    
                  
                    const sendSMNonLn = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true)
                      try {
                        await API.graphql(
                          graphqlOperation(createNonLoans, {
                            input: {
                              recPhn: RecNatId,
                              senderPhn: SenderNatId,                                  
                              amount: parseFloat(amounts).toFixed(0),                              
                              description: Desc,
                              RecName:namess,
                              SenderName:name,
                              status: "cashSales",
                              owner: ownerz
                            },
                          }),
                        );


                      } catch (error) {
                        if (error){
                          Alert.alert("Sending unsuccessful; Retry")
                          return
                        }
                      }
                      setIsLoading(false);
                      await updtSendrAc();
                    };

                    const sendSMNonLn2 = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true)
                      try {
                        await API.graphql(
                          graphqlOperation(createNonLoans, {
                            input: {
                              recPhn: RecNatId,
                              senderPhn: SenderNatId,                                  
                              amount: parseFloat(amounts).toFixed(0),                              
                              description: Desc,
                              RecName:namess,
                              SenderName:name,
                              status: "cashSales",
                              owner: ownerz
                            },
                          }),
                        );


                      } catch (error) {
                        if (error){
                          Alert.alert("Sending unsuccessful; Retry")
                          return
                        }
                      
                      }
                      setIsLoading(false);
                      await updtSendrAc2();
                    };


                    const updtSendrAc = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateBizna, {
                              input:{
                                BusKntct: SenderNatId,                                
                                netEarnings:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0)                               
                                
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
                      await updtRecAc();
                    }

                    const updtSendrAc2 = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateBizna, {
                              input:{
                                BusKntct: SenderNatId,                                  
                                netEarnings:(parseFloat(SenderUsrBal)-TotalTransacted2).toFixed(0)    
                               
                                
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
                      await updtRecAc2();
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
                                BusKntct:RecNatId,
                                
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
                      setIsLoading(false);
                      await updtBenAc();
                    }

                    const updtBenAc = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:bizBeneficiaryz,                                
                                balance:((parseFloat(UsrTransferFee) * parseFloat(amounts))*0.3 + parseFloat(SenderUsrBal7)).toFixed(0),
                                
                                                         
                                
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
                      await updtRecBenAc();
                    }

                    const updtRecBenAc = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:bizBeneficiary,                                
                                balance:((parseFloat(UsrTransferFee) * parseFloat(amounts))*0.3 + parseFloat(SenderUsrBal8)).toFixed(0),
                                
                                                         
                                
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

                    

                    const updtRecAc2 = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateBizna, {
                              input:{
                                BusKntct:RecNatId,
                                
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
                      setIsLoading(false);
                      await updtComp2();
                    }

                    const updtComp = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateCompany, {
                              input:{
                                AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                               
                                companyEarningBal:(parseFloat(UsrTransferFee) * parseFloat(amounts))*0.4 + parseFloat(companyEarningBals),
                                companyEarning: (parseFloat(UsrTransferFee) * parseFloat(amounts))*0.4 + parseFloat(companyEarnings),                                                    
                                
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

                    const updtComp2 = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateCompany, {
                              input:{
                                AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                               
                                companyEarningBal:UsrTransferFee2 + parseFloat(companyEarningBals),
                                companyEarning: UsrTransferFee2 + parseFloat(companyEarnings),                                                    
                                
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
                     
                      Alert.alert("Insufficient transaction fees? No worries! Ksh. " +parseFloat(amounts).toFixed(0) + " sent!");
                      setIsLoading(false);
                    }
                    
                                          
                    
                    if (userInfo.attributes.sub!==ownerz) {
                      Alert.alert("Unauthorised to pay on behalf of the business!")
                      return;
                    }  
                    
                    else if(bizType === "Public"){
                      NoBizBen();
                    }
                    
                    else if(RecAcstatus === "AccountInactive"){Alert.alert('Receiver account is inactive');}
                    else if(SenderAcstatus === "AccountInactive"){Alert.alert('Sender account is inactive');}
                   
                    
                    else if (
                      UsrTransferFee2 < 0
                    ) {Alert.alert('Requested amount is more than you have in your account');}
                    
                    
                    else if(pw !==SnderPW){Alert.alert('Wrong password');}

                    else if (
                      Lonees3.data.listCovCreditSellers.items.length > 0 
                      
                      
                      ) {
                        SndChmMmbrMny();
                    } 

                    else if (UsrTransferFeeAmt > UsrTransferFee2 
                      && UsrTransferFee2 > 0){sendSMNonLn2();}

                     else {
                      sendSMNonLn();
                    }                                                
                 
                  }       
                  catch(e) {   
                    console.log(e)  
                    if (e){Alert.alert("Reciever does not exist")
    return;}                 
                  }
                  setIsLoading(false);
                  }                    
                    await fetchRecBizUsrDtls();
                  
                  }       
                  catch(e) {   
                    console.log(e)  
                    if (e){Alert.alert("Reciever does not exist")
    return;}                 
                  }
                  setIsLoading(false);
                  }                    
                    await fetchSenderBizUsrDtls();
                  
                  }       
                catch(e) {   
                  console.log(e)  
                  if (e){Alert.alert("Reciever does not exist")
  return;}                 
                }
                setIsLoading(false);
                }                    
                  await fetchRecUsrDtls();
        } catch (e) {
          console.log(e)
          if (e){Alert.alert("Check your internet connection")
      return;}
        }
        setIsLoading(false);        
      };
      await fetchCompDtls();
    
      
    

  

}     
catch (e) {
  console.log(e)
  if (e){Alert.alert("Check your internet connection")
  return;}
     
}   
setIsLoading(false);
};

await fetchSenderUsrDtls();
    
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Check your internet connection")
      return;}
         
    }   
    setIsLoading(false);
    };
    
    await fetchCLChm();
    
    
    
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Check your internet connection")
      return;}
         
    }   
    setIsLoading(false);
    };
    
    await fetchCLCrdSl();
    
    
    
          
        } catch (e) {
          console.log(e)
          if (e){Alert.alert("Please fill details correctly or check your internet connection")
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
    <View>
      <View
        
        style={styles.image}>
        <ScrollView>
         
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
            placeholder="Sending Business Phone"
              value={SenderNatId}
              onChangeText={setSenderNatId}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Sending Business Phone</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
            placeholder="Receiving Business Phone"
              value={RecNatId}
              onChangeText={setRecNatId}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Receiving Business Phone</Text>
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