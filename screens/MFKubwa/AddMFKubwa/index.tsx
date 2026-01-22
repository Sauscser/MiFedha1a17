import React, {useEffect, useState} from 'react';

import {  createMFKOfferz, updateSMAccount} from '../../../src/graphql/mutations';
import {  getAgent, getGroup, getSMAccount} from '../../../src/graphql/queries';
import {  graphqlOperation, API,Auth} from 'aws-amplify';
import Communications from 'react-native-communications';
import {useNavigation} from '@react-navigation/native';


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
import { updateBankAdmin } from '../../../src/graphql/mutations';

const UpdtMFNPW = (props) => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [AdminID, setAdminId] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [MFNS, setMFNS] = useState("");
  const [NewAdmnPW, setNewAdmnPW] = useState("");
  const [OldAdmnPW, setOldAdmnPW] = useState("");
  const [OfferStatus, setOfferStatus] = useState("");
  const [MFChamp, setMFChamp] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  const[ownr, setownr] = useState(null);
  const[names, setName] = useState(null);
  
  
  
        const fetchMFNDtls = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();
            try{
              const MFNDtls :any= await API.graphql(
                graphqlOperation(getSMAccount,{awsemail:AdminID})
                );
                const TtlClrdLonsAmtSllrCovs = MFNDtls.data.getSMAccount.TtlClrdLonsAmtSllrCov   
                const MFKubwaCosts = MFNDtls.data.getSMAccount.MFKubwaCost
                const MFKubwaNetCosts = MFNDtls.data.getSMAccount.MFKubwaNetCost
                const namezs = MFNDtls.data.getSMAccount.name
                const phonecontact = MFNDtls.data.getSMAccount.phonecontact
                       
                
                const fetchBankAdminDtls = async () =>{
                  if(isLoading){
                    return;
                  }
                  setIsLoading(true);
                  
                  try{
                    const MFNDtlsxz :any= await API.graphql(
                      graphqlOperation(getGroup,{grpContact:MFChamp})
                      );
                      const BankAdminEmail = MFNDtlsxz.data.getGroup.BankAdminEmail   
     
                           
                
                          
                                      const updtMFNDtls = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateSMAccount,{
                                                input:{
                                                  awsemail:AdminID,
                                                  MFKubwaCost:parseFloat(NewAdmnPW) + parseFloat(MFKubwaCosts),
                                                  MFKubwaNetCost:parseFloat(SigntryPW) + parseFloat(MFKubwaNetCosts),
                                                  TtlClrdLonsAmtSllrCov:parseFloat(TtlClrdLonsAmtSllrCovs) + 1
                                                }
                                              })
                                            )
                                    
                                        }
                                        catch(error)

                                        {
                                          if (error){
                                            console.log(error)
                                            Alert.alert("Addition unsuccessful; Retry")
                                            return
                                          }
                                      
                                          
                                        }
                                        setIsLoading(false);

                                        await CreateNewSAOffer ();
                                        
                                      } 
                                      

                                      const CreateNewSAOffer = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try {
                                          await API.graphql(
                                            graphqlOperation(createMFKOfferz, {
                                              input: {
                                                
                                                offerStatus: OfferStatus,
                                                acCost: parseFloat(NewAdmnPW),
                                                amtPaid:parseFloat(SigntryPW),
                                                mfnOffered: parseFloat(MFNS),
                                                /* group account number */
                                                acChamp: MFChamp,
                                                mfnReg: 0,
                                                status:"AccountActive",
                                                mfkAc: AdminID,
                                                acMainAc: LnAcCod,
                                                
                                              },
                                            }),
                                          );
                              
                                          
                                        } 
                              
                                        catch (error) {
                                          console.log(error)
                                          if (error){
                                            Alert.alert("Registration unsuccessful; Retry")
                                            return
                                          }
                                        }
                                        setIsLoading(false); 
                                        Alert.alert("MFKubwa creation successfully authorised");
                                        Communications.textWithoutEncoding(phonecontact,'Hi '+ namezs + '. Your application to create MFKubwa account ' 
                                        + LnAcCod + ' has been approved. Please proceed to create your MFKubwa account on MiFedha App' 
                                         );
                                      };

                                      if (
                                        BankAdminEmail !== userInfo.attributes.email
                                      )

                                      {
                                        Alert.alert(
                                          "Your are not the Bank Supervisor of the group"
                                        )

                                        return;
                                      }

                                      else {
                                        await updtMFNDtls();
                                      }
                                

            } catch (error) {
                if(error){
                  console.log(error)
                  Alert.alert("Retry1! or update app or call customer care")
                  return
                }
              }
         
           

            setIsLoading(false);
              
          
            }

            await fetchBankAdminDtls();

          } catch (error) {
            console.log(error)
            if(error){
              Alert.alert("Error2! Retry or update app or call customer care")
              return
            }
          }
     
       

        setIsLoading(false);
          setNewAdmnPW("");
          setSigntryPW("")
          setOldAdmnPW("")
          setAdminId("")
          setLnAcCod("");
          setMFNS("")
          setMFChamp ("")
          setOfferStatus("")
      
        }
        
        useEffect(() =>{
          const MFChamps=MFChamp
            if(!MFChamps && MFChamps!=="")
            {
              setMFChamp("");
              return;
            }
            setMFChamp(MFChamps);
            }, [MFChamp]
             );

             useEffect(() =>{
              const OfferStatuss=OfferStatus
                if(!OfferStatuss && OfferStatuss!=="")
                {
                  setOfferStatus("");
                  return;
                }
                setOfferStatus(OfferStatuss);
                }, [OfferStatus]
                 );
    

             useEffect(() =>{
              const LnAcCods=LnAcCod
                if(!LnAcCods && LnAcCods!=="")
                {
                  setLnAcCod("");
                  return;
                }
                setLnAcCod(LnAcCods);
                }, [LnAcCod]
                 );


             useEffect(() =>{
              const NewAdmnPWs=NewAdmnPW
                if(!NewAdmnPWs && NewAdmnPWs!=="")
                {
                  setNewAdmnPW("");
                  return;
                }
                setNewAdmnPW(NewAdmnPWs);
                }, [NewAdmnPW]
                 );

             useEffect(() =>{
                const OldAdmnPWs=OldAdmnPW
                  if(!OldAdmnPWs && OldAdmnPWs!=="")
                  {
                    setOldAdmnPW("");
                    return;
                  }
                  setOldAdmnPW(OldAdmnPWs);
                  }, [OldAdmnPW]
                   );

                   useEffect(() =>{
                    const LnAcCods=SigntryPW
                      if(!LnAcCods && LnAcCods!=="")
                      {
                        setSigntryPW("");
                        return;
                      }
                      setSigntryPW(LnAcCods);
                      }, [SigntryPW]
                       );

                       useEffect(() =>{
                        const AdminIDs=AdminID
                          if(!AdminIDs && AdminIDs!=="")
                          {
                            setAdminId("");
                            return;
                          }
                          setAdminId(AdminIDs);
                          }, [AdminID]
                           );


                           useEffect(() =>{
                            const MFNSs=MFNS
                              if(!MFNSs && MFNSs!=="")
                              {
                                setMFNS("");
                                return;
                              }
                              setMFNS(MFNSs);
                              }, [MFNS]
                               );
  
  
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill MFN Details Below</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="MFK Phone"
                      value={LnAcCod}
                      onChangeText={setLnAcCod}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MFK Phone</Text>
                  </View> 

                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                      value={MFChamp}
                      onChangeText={setMFChamp}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Beneficiary Group Account</Text>
                  </View> 

                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="User Email"
                      value={AdminID}
                      onChangeText={setAdminId}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Group Admin Email</Text>
                  </View> 

                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="Offer Status"
                      value={OfferStatus}
                      onChangeText={setOfferStatus}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Offer Status</Text>
                  </View> 
        
                  
                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="Cost"
                      value={NewAdmnPW}
                      keyboardType={'decimal-pad'}
                      onChangeText={setNewAdmnPW}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Cost</Text>
                  </View> 
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={SigntryPW}
                      onChangeText={setSigntryPW}
                      keyboardType={'decimal-pad'}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Amount Paid</Text>
                  </View>   

                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="MFNS"
                      value={MFNS}
                      onChangeText={setMFNS}
                      style={styles.sendLoanInput}
                      keyboardType={'decimal-pad'}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Number of MFNS</Text>
                  </View> 
                  
                                   
        
                  <TouchableOpacity
                    onPress={fetchMFNDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Add
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default UpdtMFNPW;