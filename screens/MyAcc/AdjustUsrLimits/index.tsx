import React, {useEffect, useState} from 'react';

import {updateSMAccount} from '../../../src/graphql/mutations';
import {  getBankAdmin, } from '../../../src/graphql/queries';
import {  graphqlOperation, API,Auth} from 'aws-amplify';

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


  


const UpdtSMPW = (props) => {
  const navigation = useNavigation();
  const [maxInttSM, setmaxInttSM] = useState("");
  const [maxIntCredSllr, setmaxIntCredSllr] = useState("");
  const [maxIntGrp, setmaxIntGrp] = useState("");
  const[maxMFNdogo, setmaxMFNdogo] = useState("");
  const[maxBL, setmaxBL] = useState("");
  const[WthdrwlLim, setWthdrwlLim] = useState("");
  const[DpstLim, setDpstLim] = useState("");
  const[AcBal, setAcBal] = useState("");
  const[PhoneContact, setPhoneContact] = useState(null);

  const [LnAcCod, setLnAcCod] = useState("");
  
  const[isLoading, setIsLoading] = useState(false);
  const[ownr, setownr] = useState(null);
  
  
  
  
        const fetchSMDtls = async () =>{
          const userInfo = await Auth.currentAuthenticatedUser();
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{
              const compDtls :any= await API.graphql(
                graphqlOperation(getBankAdmin,{nationalid:maxInttSM})
                );
                  
                const owners = compDtls.data.getBankAdmin.owner 
                const pws = compDtls.data.getBankAdmin.pw 
                      
                 
                               
                          
                                      const updtSMDtls = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateSMAccount,{
                                                input:{
                                                  awsemail:maxIntGrp,
                                                  loanLimit:maxMFNdogo,
                                                  nonLonLimit:maxBL,
                                                  withdrawalLimit:WthdrwlLim,
                                                  depositLimit:DpstLim,                                                  
                                                  MaxAcBal:AcBal, 
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){if (error){
                                          Alert.alert("Adjustment unsuccessful; Retry")
                                          return
                                        }
                                    }
                                        setIsLoading(false);
                                        Alert.alert("You have successfully updated User Limits");
                                      } 

                                     if(userInfo.attributes.sub !==owners)
                                      {
                                          Alert.alert("This is not your Admin Account");
                                      }

                                      else if(maxIntCredSllr !== pws){
                                        Alert.alert("Wrong Admin credentials")
                                      }

                                      
                                      else {updtSMDtls();}

                                    

            } catch (error) {
                if(error){
                  Alert.alert("Retry or update app or call customer care")
                  return
                }
              }
         
           

            setIsLoading(false);
              setmaxInttSM("");
              setmaxIntCredSllr("")
              setmaxIntGrp("")
              setmaxMFNdogo("");
              setmaxBL("")
              setLnAcCod("")
              setDpstLim("")
              setWthdrwlLim("")
          setAcBal("")
            }
        
        useEffect(() =>{
          const DpstLims=DpstLim
            if(!DpstLims && DpstLims!=="")
            {
              setDpstLim("");
              return;
            }
            setDpstLim(DpstLims);
            }, [DpstLim]
             );

             useEffect(() =>{
              const AcBals=AcBal
                if(!AcBals && AcBals!=="")
                {
                  setAcBal("");
                  return;
                }
                setAcBal(AcBals);
                }, [AcBal]
                 );
    

             useEffect(() =>{
              const WthdrwlLims=WthdrwlLim
                if(!WthdrwlLims && WthdrwlLims!=="")
                {
                  setWthdrwlLim("");
                  return;
                }
                setWthdrwlLim(WthdrwlLims);
                }, [WthdrwlLim]
                 );

             useEffect(() =>{
              const maxInttSMs=maxInttSM
                if(!maxInttSMs && maxInttSMs!=="")
                {
                  setmaxInttSM("");
                  return;
                }
                setmaxInttSM(maxInttSMs);
                }, [maxInttSM]
                 );

             useEffect(() =>{
                const maxIntCredSllrs=maxIntCredSllr
                  if(!maxIntCredSllrs && maxIntCredSllrs!=="")
                  {
                    setmaxIntCredSllr("");
                    return;
                  }
                  setmaxIntCredSllr(maxIntCredSllrs);
                  }, [maxIntCredSllr]
                   );

                   useEffect(() =>{
                    const maxIntGrps=maxIntGrp
                      if(!maxIntGrps && maxIntGrps!=="")
                      {
                        setmaxIntGrp("");
                        return;
                      }
                      setmaxIntGrp(maxIntGrps);
                      }, [maxIntGrp]
                       );

                       useEffect(() =>{
                        const maxMFNdogos=maxMFNdogo
                          if(!maxMFNdogos && maxMFNdogos!=="")
                          {
                            setmaxMFNdogo("");
                            return;
                          }
                          setmaxMFNdogo(maxMFNdogos);
                          }, [maxMFNdogo]
                           );

                           useEffect(() =>{
                            const maxBLs=maxBL
                              if(!maxBLs && maxBLs!=="")
                              {
                                setmaxBL("");
                                return;
                              }
                              setmaxBL(maxBLs);
                              }, [maxBL]
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

                       
  
  
 return (
           
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Ac Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView2}>
             <TextInput
           
               value={maxInttSM}
               onChangeText={setmaxInttSM}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>Admin ID</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
            
               value={maxIntCredSllr}
               onChangeText={setmaxIntCredSllr}
               secureTextEntry = {true}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>Admin PassWord</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             placeholder="User Email"
               value={maxIntGrp}
               onChangeText={setmaxIntGrp}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>User Email</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={maxMFNdogo}
               onChangeText={setmaxMFNdogo}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>Loan Limit</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={AcBal}
               onChangeText={setAcBal}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>AcBal Limit</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={maxBL}
               onChangeText={setmaxBL}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>NonLoan Limit</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={WthdrwlLim}
               onChangeText={setWthdrwlLim}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>Withdrawal limit</Text>
           </View>   

           <View style={styles.sendLoanView2}>
             <TextInput
             keyboardType={"decimal-pad"}
               value={DpstLim}
               onChangeText={setDpstLim}
               style={styles.sendLoanInput2}
               editable={true}
               multiline={true}></TextInput>
             <Text style={styles.sendLoanText}>Deposit Limit</Text>
           </View>   
      
        
                  <TouchableOpacity
                    onPress={fetchSMDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Update User Details
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
          
          );
        };
        
        export default UpdtSMPW;