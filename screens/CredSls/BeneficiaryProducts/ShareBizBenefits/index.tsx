import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  
  createSMLoansCovered,
  
  
  
  createNonLoans,
  
  updateCompany,
  
  updateSMAccount,
  updateBizna,
  createBenefitShare2,
  updateLinkBeneficiary2,
  
} from '../../../../src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  
  getBizna,
  getCompany,
  getLinkBeneficiary2,
  getSMAccount,
  
} from '../../../../src/graphql/queries';

import {
  View,
  Text,
  
  
  TextInput,
  ScrollView,
  StyleSheet,
  
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';


import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';



const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
  const [SendrPhn, setSendrPhn] = useState(null);  
  const [amounts, setAmount] = useState("");
  
  const [Desc, setDesc] = useState("");

  const[isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const route = useRoute();

  const fetchBenProdUsrDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);
    const userInfo = await Auth.currentAuthenticatedUser();
   
    try {
      const accountDtlzx:any = await API.graphql(
        graphqlOperation(getLinkBeneficiary2, {beneficiaryID: route.params.beneficiaryID}),
      );

      const prodIDs =accountDtlzx.data.getLinkBeneficiary2.prodID;
      const benefitsIDs =accountDtlzx.data.getLinkBeneficiary2.benefitsID;
      const benefactorAcs =accountDtlzx.data.getLinkBeneficiary2.benefactorAc;
      const benefactorPhones =accountDtlzx.data.getLinkBeneficiary2.benefactorPhone;
      const beneficiaryAcs =accountDtlzx.data.getLinkBeneficiary2.beneficiaryAc;
      const beneficiaryPhones =accountDtlzx.data.getLinkBeneficiary2.beneficiaryPhone;
      const creatorEmails =accountDtlzx.data.getLinkBeneficiary2.creatorEmail;
      const prodNames =accountDtlzx.data.getLinkBeneficiary2.prodName;
      const creatorNames =accountDtlzx.data.getLinkBeneficiary2.creatorName;
      const prodCosts =accountDtlzx.data.getLinkBeneficiary2.prodCost;
      const benefitsAmounts =accountDtlzx.data.getLinkBeneficiary2.benefitsAmount;
      const beneficiaryTypes =accountDtlzx.data.getLinkBeneficiary2.beneficiaryType;
      const prodDescs =accountDtlzx.data.getLinkBeneficiary2.prodDesc;
      const benefitStatuss =accountDtlzx.data.getLinkBeneficiary2.benefitStatus;
      const amountsx =accountDtlzx.data.getLinkBeneficiary2.amount;
    
      
      const fetchSenderUsrDtls = async () => {
    
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getBizna, {BusKntct: SenderNatId}),
      );

      const benefitsAmountsz =accountDtl.data.getBizna.benefitsAmount;
      const usrPW =accountDtl.data.getBizna.pw;
      const busNames =accountDtl.data.getBizna.busName;
      const SenderSub =accountDtl.data.getBizna.owner;
      const noBL =accountDtl.data.getBizna.noBL;     
      const statuss =accountDtl.data.getBizna.status;
      
      
      const fetchCompDtls = async () => {        
        try {
          const CompDtls:any = await API.graphql(
            graphqlOperation(getCompany, {
              AdminId: "BaruchHabaB'ShemAdonai2",
            }),
          );
          
            
          const UsrTransferFee = CompDtls.data.getCompany.biznaTransferFee;
          const TotalTransacted = parseFloat(amounts)  + parseFloat(UsrTransferFee)*parseFloat(amounts);
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact;         
          
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
          const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM; 
          
         
                    
          const fetchRecUsrDtls = async () => {
            
            try {
                const RecAccountDtl:any = await API.graphql(
                    graphqlOperation(getBizna, {BusKntct: benefactorPhones}),
                    );
                                       
                    const netEarnings =RecAccountDtl.data.getBizna.netEarnings;
                    const statussx =RecAccountDtl.data.getBizna.status;
                    const prodCreatorName =RecAccountDtl.data.getBizna.busName;
                  
                    const sendSMNonLn = async () => {
                      
                      try {
                        await API.graphql(
                          graphqlOperation(createBenefitShare2, {
                            input: {
                               /*contributorName*/
                              benefitsID: busNames,
                              benefactorAc: benefactorAcs,                                  
                              amount: parseFloat(amounts).toFixed(2),  
                              /*Product Creator Ac*/                            
                              benefactorPhone: benefactorPhones,
                              beneficiaryAc:beneficiaryAcs,
                              beneficiaryPhone:beneficiaryPhones,
                              creatorEmail: userInfo.attributes.email,
                              owner: userInfo.attributes.sub,
                              prodName:prodNames,
                              /*Benefactor Name*/
                              creatorName:creatorNames,
                              prodCost:prodCosts,
                              benefitsAmount:parseFloat(benefitsAmounts) + parseFloat(benefitsAmountsz),
                              /*Contributor Ac*/ 
                              beneficiaryType:SenderNatId,
                              /*ProdCreator Name*/
                              prodDesc:prodCreatorName,
                              benefitStatus:benefitStatuss,

                            },
                          }),
                        );


                      } catch (error) {
                        if (error){
                          Alert.alert("Sharing unsuccessful; Retry")
                          return
                        }
                      }
                      
                      await updtSendrAc();
                    };

                    const updtSendrAc = async () =>{
                     
                      try{
                          await API.graphql(
                            graphqlOperation(updateBizna, {
                              input:{
                                BusKntct:SenderNatId,
                                
                                benefitsAmount:(parseFloat(benefitsAmountsz)-TotalTransacted).toFixed(2) 
                               
                                
                              }
                            })
                          )


                      }
                      catch(error){
                        console.log(error)
                        if (error){Alert.alert("Error! Enter details correctly")
                        return;}
                      }
                    
                      await updtLinkedBenefits();
                    }

                    const updtLinkedBenefits = async () =>{
                                          
                                          try{
                                              await API.graphql(
                                                graphqlOperation(updateLinkBeneficiary2, {
                                                  input:{
                                                    beneficiaryID:route.params.beneficiaryID,
                                                   
                                                    benefitsAmount:(parseFloat(benefitsAmounts) + parseFloat(amounts)).toFixed(2)                                     
                                                    
                                                  }
                                                })
                                              )                              
                                          }
                                          catch(error){
                                            console.log(error)
                                            if (error){Alert.alert("Retry or update app or call customer care")
                                            return;}
                                          }
                                        
                                          await updtRecAc();
                                        }
                    const updtRecAc = async () =>{
                      
                      try{
                          await API.graphql(
                            graphqlOperation(updateBizna, {
                              input:{
                                BusKntct:benefactorPhones,
                               
                                netEarnings:(parseFloat(netEarnings) + parseFloat(amounts)).toFixed(2)                                     
                              
                              }
                            })
                          )                              
                      }
                      catch(error){
                        console.log(error)
                        if (error){Alert.alert("Retry or update app or call customer care")
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
                               
                                companyEarningBal:parseFloat(UsrTransferFee) * parseFloat(amounts) + parseFloat(companyEarningBals),
                                companyEarning: parseFloat(UsrTransferFee) * parseFloat(amounts) + parseFloat(companyEarnings),                                                    
                                
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
                      Alert.alert("Amount:Ksh. "+parseFloat(amounts).toFixed(2) + " Transaction: Ksh. "+ (parseFloat(UsrTransferFee)*parseFloat(amounts)).toFixed(2));
                      Communications.textWithoutEncoding(beneficiaryPhones,
                        'Confirmed. '
                                  + busNames 
                                  + ' Benefactor has sent you Ksh. '
                                  + amounts + ' as Benefits ' + 
                                  'Please confirm this transaction record is on your Mifedha app. Thank you. MiFedha');
                                  
                                  setIsLoading(false);
                    }
                    
                                          
                    
                     if(statuss !== "AccountActive" ){Alert.alert('Beneficiary account is inactive');}
                     if(statussx !== "AccountActive" ){Alert.alert('Benefactor account is inactive');}
                    
                    else if (
                      parseFloat(benefitsAmountsz) < TotalTransacted 
                    ) {Alert.alert('Requested amount is more than your Benefits');}
                    
                    else if (
                      benefitStatuss !== "Active" 
                    ) {Alert.alert('This Beneficiary linkage is not active');}
                    
                    

                    else if(noBL > 0){Alert.alert('Please first clear your lenders');}
                   
                    else if(usrPW !==SnderPW){Alert.alert('Wrong Business Password');}
                    else if(userInfo.attributes.sub !==SenderSub)
                      {Alert.alert('You do not own this business');}
                    
                     else {
                     await sendSMNonLn();
                    }                                                
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

    } catch (e) {
      console.log(e)
      if (e){Alert.alert("Retry or update app or call customer care")
  return;}
    }
   
  };
  await fetchSenderUsrDtls();
    
      
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
                           placeholder="My Business Phone Number"
                            value={SenderNatId}
                            onChangeText={setSenderNatId}
                            style={styles.input}
                            editable={true}></TextInput>

                            <TextInput
                           placeholder="Amount to share"
                            value={amounts}
                            onChangeText={setAmount}
                            style={styles.input}
                            keyboardType={"decimal-pad"}
                            editable={true}></TextInput>


                          
                          
                         <View style={styles.passwordContainer}>
                                                                       <TextInput
                                                                         placeholder="Business/Company Account Password"
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
                          onPress={fetchBenProdUsrDtls}
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