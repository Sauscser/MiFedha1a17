import React, {useEffect, useState} from 'react';

import {  deleteChamaMembers,   updateGroup} from '../../../src/graphql/mutations';
import {  getChamaMembers,  getGroup, getSMAccount } from '../../../src/graphql/queries';
import {  graphqlOperation, API,Auth} from 'aws-amplify';
import Communications from 'react-native-communications';
import {useNavigation, useRoute} from '@react-navigation/native';


import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import { updateBankAdmin } from '../../../src/graphql/mutations';


  


const DeregChmMmbr = (props) => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [ChmMmbrId, setChmMmbrId] = useState("");
  
  
  const [grpContactz, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [MmberId, setMmberId] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState(''); 
 
  const ChmNMmbrPhns = MmberId+grpContactz
  const route = useRoute()
  
 
  
        const fetchChmMmbrDtls = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();
    
 
            try{
              const compDtls :any= await API.graphql(
                graphqlOperation(getChamaMembers,{ChamaNMember:ChmNMmbrPhns})
                );
                const groupContacts = compDtls.data.getChamaMembers.groupContact                
                const memberContacts = compDtls.data.getChamaMembers.memberContact
                const blStatuss = compDtls.data.getChamaMembers.blStatus
                const LnBals = compDtls.data.getChamaMembers.LnBal
                const memberNames = compDtls.data.getChamaMembers.memberName
                const AcStatuss = compDtls.data.getChamaMembers.AcStatus

                console.log(compDtls.data.getChamaMembers)

                const ftchChmDtls = async () =>{
                    if(isLoading){
                      return;
                    }
                    setIsLoading(true);
                    try{
                      const compDtls :any= await API.graphql(
                        graphqlOperation(getGroup,{grpContact:grpContactz})
                        );
                        const signitoryPWs = compDtls.data.getGroup.signitoryPW
                        const grpNames = compDtls.data.getGroup.grpName
                        const ttlGrpMemberss = compDtls.data.getGroup.ttlGrpMembers
                        const owners = compDtls.data.getGroup.owner

                        const ftchUsrDtls = async () =>{
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try{
                            const UsrDtls :any= await API.graphql(
                              graphqlOperation(getSMAccount,{awsemail:memberContacts})
                              );
                              
                              const ownersss = UsrDtls.data.getSMAccount.owner
                              const name = UsrDtls.data.getSMAccount.name
                              const phonecontact = UsrDtls.data.getSMAccount.phonecontact

                        const updateChmMmbrAc = async()=>{
                                    if(isLoading){
                                      return;
                                    }
                                    setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(deleteChamaMembers,{
                                                
                                                  input:{ChamaNMember:ChmNMmbrPhns}
                                                                                                    
                                                
                                              })
                                            )
                                        }
                                        catch(error){
                                          
                                          if (error){
                                            Alert.alert("Deletion unsuccessful; Retry")
                                            return
                                          }
                                        }
                                          setIsLoading(false)
                                        await updtChmDtls();
                                      }
                                      if(signitoryPWs!==pword)
                                      {
                                          Alert.alert("Wrong Signitory password");
                                          return;
                                      }
                                      
                                      else if(owners !== userInfo.attributes.sub)
                                      {
                                          Alert.alert("Not authorised to deactive member");
                                          return;
                                      }

                                      else if(owners === ownersss &&  parseFloat(ttlGrpMemberss) > 1)
                                      {
                                          Alert.alert("Deactivate yourself, the Chama author, as the last one");
                                          return;
                                      }
                                     
                                      else {updateChmMmbrAc();}
                          
                                      const updtChmDtls = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try{
                                            await API.graphql(
                                              graphqlOperation(updateGroup,{
                                                input:{
                                                  grpContact:grpContactz,
                                                  ttlGrpMembers:parseFloat(ttlGrpMemberss)-1
                                                }
                                              })
                                            )
                                    
                                            
                                        }
                                        catch(error){ }
                                        setIsLoading(false);
                                        Alert.alert(grpNames+" has deregistered "+memberNames);
                                        Communications.textWithoutEncoding(phonecontact,'Hi '+ name 
                          + ', you have been de-registered from group '
                          + grpNames + '. For clarification plese contact the group admin through '
                          + userInfo.atributes.phone_number  +'. Thank you. MiFedha.');
                                      } 

        
                                    } catch (error) {
                                      if(error){
                                        console.log(error)
                                        Alert.alert("Error! Access denied!")
                                        return
                                      }
                                    }}
                                    await ftchUsrDtls();
                                  
                                  } catch (error) {
                        if(error){
                          console.log(error)
                          Alert.alert("Error! Access denied!")
                          return
                        }
                      }}
                      await ftchChmDtls();

            } catch (error) {
              console.log(error)
                if(error){
                  Alert.alert("Error! Access denied!")
                  return
                }
              }

              
           

            setIsLoading(false);
              setMmberId("");
              setSigntryPW("")
              setChmPhn('');
            setPW('');
            setPhoneContacts("")
            setChmDesc("")
            
            setmemberPhn("")
          
            }

            
        useEffect(() =>{
          const ChmMmbrIds=MmberId
            if(!ChmMmbrIds && ChmMmbrIds!=="")
            {
              setMmberId("");
              return;
            }
            setMmberId(ChmMmbrIds);
            }, [MmberId]
             );

             useEffect(() =>{
                const SigntryPWs=SigntryPW
                  if(!SigntryPWs && SigntryPWs!=="")
                  {
                    setSigntryPW("");
                    return;
                  }
                  setSigntryPW(SigntryPWs);
                  }, [SigntryPW]
                   );

                  

                  useEffect(() =>{
                    const memberPhns=memberPhn
                      if(!memberPhns && memberPhns!=="")
                      {
                        setmemberPhn("");
                        return;
                      }
                      setmemberPhn(memberPhns);
                      }, [memberPhn]
                       );
        
                       useEffect(() =>{
              const phoneContactss=phoneContacts
                if(!phoneContactss && phoneContactss!=="")
                {
                  setPhoneContacts("");
                  return;
                }
                setPhoneContacts(phoneContactss);
                }, [phoneContacts]
                 );
      
            
      
                 useEffect(() =>{
                  const ChmDescs=ChmDesc
                    if(!ChmDescs && ChmDescs!=="")
                    {
                      setChmDesc("");
                      return;
                    }
                    setChmDesc(ChmDescs);
                    }, [ChmDesc]
                     );
      
      useEffect(() =>{
        const ChmPhns=grpContactz
          if(!ChmPhns && ChmPhns!=="")
          {
            setChmPhn("");
            return;
          }
          setChmPhn(ChmPhns);
          }, [grpContactz]
           );
      
           useEffect(() =>{
            const pws=pword
              if(!pws && pws!=="")
              {
                setPW("");
                return;
              }
              setPW(pws);
              }, [pword]
               );
  
  
                  return (
                    <View>
                      <View
                         style={styles.image}>
                        <ScrollView>
                   
                          <View style={styles.loanTitleView}>
                            <Text style={styles.title}>Fill Details Below</Text>
                          </View>
                
                          <View style={styles.sendLoanView}>
                            <TextInput
                            placeholder="+2547xxxxxxxx"
                              value={grpContactz}
                              onChangeText={setChmPhn}
                              style={styles.sendLoanInput}
                              editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Chama Phone Number</Text>
                          </View>
        
                          <View style={styles.sendLoanView}>
                            <TextInput
                            
                              value={MmberId}
                              onChangeText={setMmberId}
                              style={styles.sendLoanInput}
                              editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Chama Member Number</Text>
                          </View>
        
                          <View style={styles.sendLoanView}>
                            <TextInput
                            
                              value={pword}
                              onChangeText={setPW}
                              secureTextEntry = {true}
                              style={styles.sendLoanInput}
                              editable={true}></TextInput>
                            <Text style={styles.sendLoanText}>Signitory PW</Text>
                          </View>
        
                         
                
                          <TouchableOpacity
                            onPress={fetchChmMmbrDtls}
                            style={styles.sendLoanButton}>
                            <Text style={styles.sendLoanButtonText}>
                              Click to DeRegister
                            </Text>
                            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                          </TouchableOpacity>
                        </ScrollView>
                      </View>
                    </View>
                  );}
        
        export default DeregChmMmbr;