import React, {useEffect, useState} from 'react';
import  {useRoute} from '@react-navigation/native';;
import {
  
    
  updateCompany,
  
  updateSMAccount,
  updateGroup,
  
  createGrpMembersContribution,
  updateChamaMembers,
  
} from '../../.././src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  
  getChamaMembers,
  getCompany,
  getGroup,
  
  getSMAccount,
  
} from '../../.././src/graphql/queries';


import {
  View,
  Text,
  
  TextInput,
  ScrollView,
 
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';


const SMASendChmNonLns = props => {
  const [MmbrId, setMmbrId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
  
  const [amounts, setAmount] = useState("");
  
  const [Desc, setDesc] = useState("");
  const [ownr, setownr] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const [ChamaNMember, setChamaNMember] = useState("")
  const route = useRoute();

  const MembaId = route.params.ChamaNMember
  
  
  

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    setownr(userInfo.attributes.sub);  
    
  }

  useEffect(() => {
    fetchUser();
    }, []);  

    const fetchChmMbrDtls = async () => {
      if(isLoading){
        return;
      }
      setIsLoading(true);
      try {
          const ChmMbrtDtl:any = await API.graphql(
              graphqlOperation(getChamaMembers, {ChamaNMember: MembaId}),
              );

              const groupContacts =ChmMbrtDtl.data.getChamaMembers.groupContact;
              const memberContacts =ChmMbrtDtl.data.getChamaMembers.memberContact;
              const NonLoanAcBals =ChmMbrtDtl.data.getChamaMembers.NonLoanAcBal;
              const subscribedAmt =ChmMbrtDtl.data.getChamaMembers.subscribedAmt;


              console.log(ChmMbrtDtl)


              const fetchSenderUsrDtls = async () => {
                if(isLoading){
                  return;
                }
                setIsLoading(false);
                try {
                  const accountDtl:any = await API.graphql(
                    graphqlOperation(getSMAccount, {awsemail: memberContacts}),
                  );
            
                  const SenderUsrBal =accountDtl.data.getSMAccount.balance;
                  const usrPW =accountDtl.data.getSMAccount.pw;
                  const usrAcActvStts =accountDtl.data.getSMAccount.acStatus;
                  const SenderSub =accountDtl.data.getSMAccount.owner;
                  
                  const loanLimits =accountDtl.data.getSMAccount.loanLimit;
                  const names =accountDtl.data.getSMAccount.name;
                  
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
                      
                      const userTransferFees = CompDtls.data.getCompany.chmMmbrTransferFee;
                      const UsrTransferFeeAmt = userTransferFees*parseFloat(amounts);
                      const UsrTransferFee2 = parseFloat(SenderUsrBal) -parseFloat(amounts);
                     
                      const TotalTransacted2 = parseFloat(amounts)  + UsrTransferFee2;
                      const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
                      const companyEarnings = CompDtls.data.getCompany.companyEarning;
                      const CompPhoneContact = CompDtls.data.getCompany.phoneContact;         
                      const TotalTransacted = parseFloat(amounts) +  parseFloat(userTransferFees)*parseFloat(amounts);
                      const TransferFee = parseFloat(amounts) +  parseFloat(userTransferFees)*parseFloat(amounts);
                      const ttlNonLonssRecChmss = CompDtls.data.getCompany.ttlNonLonssRecChm;
                    
                     
                                
                      const fetchRecUsrDtls = async () => {
                        if(isLoading){
                          return;
                        }
                        setIsLoading(true);
                        try {
                            const RecAccountDtl:any = await API.graphql(
                                graphqlOperation(getGroup, {grpContact: groupContacts}),
                                );
                                const grpBals =RecAccountDtl.data.getGroup.grpBal;                    
                                const statuss =RecAccountDtl.data.getGroup.status; 
                                const ttlNonLonsRecChmsssssss =RecAccountDtl.data.getGroup.ttlNonLonsRecChm;
                                const grpNames =RecAccountDtl.data.getGroup.grpName;
                                const MemberSubscrptnSync =RecAccountDtl.data.getGroup.MemberSubscrptnSync;
                                
                                
                                
                                const CrtChmMbrContri = async () => {
                                  if(isLoading){
                                    return;
                                  }
                                  setIsLoading(true)
                                  try {
                                    await API.graphql(
                                      graphqlOperation(createGrpMembersContribution, {
                                        input: {
                                          memberPhn: memberContacts,
                                          mmberNme:names,
                                          GrpName:grpNames,
                                          grpContact: groupContacts,
                                          contriAmount: parseFloat(amounts).toFixed(0),
                                          memberId:MembaId,
                                          status: "AccountActive",
                                          owner: ownr
                                        },
                                      }),
                                    );
            
            
                                  } catch (error) {
                                    if (error){
                                      Alert.alert("Subscription unsuccessful; enter details correctly")
                                      return}
                                  }
                                  setIsLoading(false);
                                  await updtSendrAc();
                                };
                              
                                
            
                                const updtSendrAc = async () =>{
                                  if(isLoading){
                                    return;
                                  }
                                  setIsLoading(true);
                                  try{
                                      await API.graphql(
                                        graphqlOperation(updateSMAccount, {
                                          input:{
                                            awsemail:memberContacts,
                                            
                                            balance:(parseFloat(SenderUsrBal)-TotalTransacted).toFixed(0)
                                                                           
                                          }
                                        })
                                      )
            
            
                                  }
                                  catch(error){
                                    console.log(error)
                                    if (error){Alert.alert("Check your internet connection")
                                    return;
                                  }
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
                                        graphqlOperation(updateGroup, {
                                          input:{
                                            grpContact:groupContacts,
                                            MemberSubscrptnSync: (parseFloat(MemberSubscrptnSync) + parseFloat(amounts)).toFixed(0),
                                            grpBal:(parseFloat(grpBals) + parseFloat(amounts)).toFixed(0),                                     
                                            ttlNonLonsRecChm: (parseFloat(amounts) + parseFloat(ttlNonLonsRecChmsssssss)).toFixed(0)
                                                                              
                                            
                                          }
                                        })
                                      )                              
                                  }
                                  catch(error){
                                    console.log(error)
                                    if (error){Alert.alert("Check your internet connection");
                                    return;
                                  }
                                  }
                                  setIsLoading(false);
                                  await updtComp();
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
                                            companyEarningBal: parseFloat(companyEarningBals) + TransferFee,
                                            companyEarning: parseFloat(companyEarnings) + TransferFee,
                                            ttlNonLonssRecChm: (parseFloat(amounts) + parseFloat(ttlNonLonssRecChmss)).toFixed(2),
                                            
                                            
                                          }
                                        })
                                      )
                                      
                                      
                                  }
                                  catch(error){
                                    console.log(error)
                                    if (error){Alert.alert("Check your internet connection");
                                return;
                              }
                                  }
                                  await updtChmMbr();
                                  setIsLoading(false);
                                }

                                const updtChmMbr = async () =>{
                                  if(isLoading){
                                    return;
                                  }
                                  setIsLoading(true);
                                  try{
                                      await API.graphql(
                                        graphqlOperation(updateChamaMembers, {
                                          input:{
                                            ChamaNMember: MembaId,   
                                            NonLoanAcBal:(parseFloat(NonLoanAcBals) + parseFloat(amounts)).toFixed(0)  ,
                                            subscribedAmt: (parseFloat(subscribedAmt) + parseFloat(amounts)).toFixed(0)                                                                      
                                            
                                          }
                                        })
                                      )
                                      
                                      
                                  }
                                  catch(error){
                                   
                                    if (error){Alert.alert("Check your internet connection")
                                return;
                              }
                                  }
                                  Alert.alert("Ksh. " + parseFloat(amounts).toFixed(2) + " sent to " 
                                  + grpNames+" Transaction fee "+ UsrTransferFeeAmt);
                                  setIsLoading(false);
                                }                                
                                                      

                                const CrtChmMbrContri2 = async () => {
                                  if(isLoading){
                                    return;
                                  }
                                  setIsLoading(true)
                                  try {
                                    await API.graphql(
                                      graphqlOperation(createGrpMembersContribution, {
                                        input: {
                                          memberPhn: memberContacts,
                                          mmberNme:names,
                                          GrpName:grpNames,
                                          grpContact: groupContacts,
                                          contriAmount: parseFloat(amounts).toFixed(0),
                                          memberId:MembaId,
                                          status: "AccountActive",
                                          owner: ownr
                                        },
                                      }),
                                    );
            
            
                                  } catch (error) {
                                    if (error){
                                      Alert.alert("Contribution unsuccessful; Retry")
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
                                            awsemail:memberContacts,
                                            
                                            balance:(parseFloat(SenderUsrBal)-TotalTransacted2).toFixed(0)
                                                                           
                                          }
                                        })
                                      )
            
            
                                  }
                                  catch(error){
                                    console.log(error)
                                    if (error){Alert.alert("Check your internet connection")
                                    return;
                                  }
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
                                        graphqlOperation(updateGroup, {
                                          input:{
                                            grpContact:groupContacts,
                                            MemberSubscrptnSync: (parseFloat(MemberSubscrptnSync) + parseFloat(amounts)).toFixed(0),
                                            grpBal:(parseFloat(grpBals) + parseFloat(amounts)).toFixed(0),                                     
                                            ttlNonLonsRecChm: (parseFloat(amounts) + parseFloat(ttlNonLonsRecChmsssssss)).toFixed(0)
                                                                              
                                            
                                          }
                                        })
                                      )                              
                                  }
                                  catch(error){
                                    console.log(error)
                                    if (error){Alert.alert("Check your internet connection");
                                    return;
                                  }
                                  }
                                  setIsLoading(false);
                                  await updtComp2();
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
                                            companyEarningBal: parseFloat(companyEarningBals) + UsrTransferFee2,
                                            companyEarning: parseFloat(companyEarnings) + UsrTransferFee2,
                                            ttlNonLonssRecChm: (parseFloat(amounts) + parseFloat(ttlNonLonssRecChmss)).toFixed(2),
                                            
                                            
                                          }
                                        })
                                      )
                                      
                                      
                                  }
                                  catch(error){
                                    console.log(error)
                                    if (error){Alert.alert("Check your internet connection");
                                return;
                              }
                                  }
                                  await updtChmMbr2();
                                  setIsLoading(false);
                                }

                                const updtChmMbr2 = async () =>{
                                  if(isLoading){
                                    return;
                                  }
                                  setIsLoading(true);
                                  try{
                                      await API.graphql(
                                        graphqlOperation(updateChamaMembers, {
                                          input:{
                                            ChamaNMember: MembaId,   
                                            NonLoanAcBal:(parseFloat(NonLoanAcBals) + parseFloat(amounts)).toFixed(0)  ,
                                                                                                                          
                                            
                                          }
                                        })
                                      )
                                      
                                      
                                  }
                                  catch(error){
                                   
                                    if (error){Alert.alert("Check your internet connection")
                                return;
                              }
                                  }
                                  Alert.alert("Insufficient transaction fees? No worries! Ksh. " +parseFloat(amounts).toFixed(0) + " sent!");
                                  
                                  setIsLoading(false);
                                }                                
                                                      
                                
                                if(usrAcActvStts !== "AccountActive"){Alert.alert('Sender account is inactive');}
                                else if(statuss !== "AccountActive"){Alert.alert('Chama account is inactive');}
                                
                                else if (
                                  UsrTransferFee2 < 0
                                ) {Alert.alert('Requested amount is more than you have in your account');}
                                
                                else if(usrPW !==SnderPW){Alert.alert('Wrong password');}
                                else if(ownr !==SenderSub){Alert.alert('Please send from your own  account');}
                                
                                else if(parseFloat(loanLimits) < parseFloat(amounts)){Alert.alert('Call ' + CompPhoneContact + ' to have your send Amount limit adjusted');}
                                
                                else if (UsrTransferFeeAmt > UsrTransferFee2 
                                  ){CrtChmMbrContri2();}
                                 else {
                                  CrtChmMbrContri();
                                  
                                }                                                
                            }       
                            catch(e) {     
                              console.log(e)
                              if (e){Alert.alert("Reciever does not exist")
              return;
            }                 
                            }
                            setIsLoading(false);
                            }                    
                              await fetchRecUsrDtls();
                    } catch (e) {
                      console.log(e)
                      if (e){Alert.alert("Check your internet connection")
                  return;
                }
                    }
                    setIsLoading(false);        
                  };
                  await fetchCompDtls();
                
                  
                } catch (e) {
                  if (e){Alert.alert("Sender does not exist");
                  return;
                }
              };
                  setIsLoading(false);
                                    
            }
            await fetchSenderUsrDtls();

            } catch (e) {
              console.log(e)
              if (e){Alert.alert("Check your internet connection");
          return;
        }
            }
                  setMmbrId('');
                  setAmount("");
                  setRecNatId('');
                  
                  setDesc("");
                  setSnderPW("");
            setIsLoading(false);        
          };
         




useEffect(() =>{
  const SnderNatIds=MmbrId
    if(!SnderNatIds && SnderNatIds!=="")
    {
      setMmbrId("");
      return;
    }
    setMmbrId(SnderNatIds);
    }, [MmbrId]
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
            <Text style={styles.sendAmtText}>Sender PassWord</Text>
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
            onPress={fetchChmMbrDtls}
            style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Send</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    </View>
  );
};

export default SMASendChmNonLns;