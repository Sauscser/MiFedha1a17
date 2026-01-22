import React, {useEffect, useState} from 'react';


import { getCompany, getGroup, getSMAccount, listSMAccounts, } from '../../../../../src/graphql/queries';
import {Auth, DataStore, graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { getBizna, listPersonels } from '../../../../../src/graphql/queries';


  


const ChmSignIn = (props) => {

  
  
  

  const navigation = useNavigation();

  const [BiznaContact, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState(''); 
  const[ownr, setownr] = useState(null);
  



  const FetchGrpLonsSts = () => {
    navigation.navigate("VwSlsAds2Remove", {BiznaContact});
  };
  

  
  const gtUzr = async () =>{
    if(isLoading){
      return;
    }
    setIsLoading(true);
    const userInfo = await Auth.currentAuthenticatedUser();
    try{
      const compDtls :any= await API.graphql(
        graphqlOperation(getSMAccount,{awsemail:userInfo.attributes.email})
        );
        
        const owner = compDtls.data.getSMAccount.owner;

    const ChckPersonelExistence = async () => {
      
      try {
        const UsrDtls:any = await API.graphql(
          graphqlOperation(listPersonels,
            { filter: {
                
              phoneKontact: { eq: userInfo.attributes.email},
              BusinessRegNo:{eq: BiznaContact}
                            
              }}
          )
        )
    
                const gtChmDtls = async () =>{
                  if(isLoading){
                    return;
                  }
                  setIsLoading(true);
                  try{
                    const compDtls :any= await API.graphql(
                      graphqlOperation(getBizna,{BusKntct:BiznaContact})
                      );
                      const signitoryPWs = compDtls.data.getBizna.pw;  
                      const owners = compDtls.data.getBizna.owner;  
                      const signitory2Subs = compDtls.data.getBizna.signitory2Sub; 

                      if(signitoryPWs!==pword){Alert.alert("Wrong Business PassWord")}
                      else if (UsrDtls.data.listPersonels.items.length < 1) {
                        Alert.alert("You do not work here");
                        return;
                        
                      }
                      
                      else{FetchGrpLonsSts();}
                    }

                    
            
            catch(e){
              console.log(e)
              if(e){
                Alert.alert("Error! Access denied")
                return;
            }
            }

          }
        await gtChmDtls();
      }

          catch(e){
          console.log(e)
          if(e){
          Alert.alert("Error! Access denied")
          return;
          }
          }
            setIsLoading(false)
            
                        
                        
            };

            if (userInfo.attributes.sub !== owner)
            {Alert.alert ("Please first create main account")}
            else{

            await ChckPersonelExistence();
            }
          } catch (e) {
          
          }
          setIsLoading(false);
          setChmPhn('');
          setPW('');
          setPhoneContacts("")
          setChmDesc("")
          setChmNm("")
          setmemberPhn("")}
  
          
    
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
        const ChmNms=ChmNm
          if(!ChmNms && ChmNms!=="")
          {
            setChmNm("");
            return;
          }
          setChmNm(ChmNms);
          }, [ChmNm]
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
  const ChmPhns=BiznaContact
    if(!ChmPhns && ChmPhns!=="")
    {
      setChmPhn("");
      return;
    }
    setChmPhn(ChmPhns);
    }, [BiznaContact]
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
                    <Text style={styles.title}>Fill Business Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="Business Phone Number"
                      value={BiznaContact}
                      onChangeText={setChmPhn}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    
                  </View>


                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="Business PassWord"
                      value={pword}
                      onChangeText={setPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    
                  </View>

                 
        
                  <TouchableOpacity
                    onPress={gtUzr}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      View Sales Ads
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default ChmSignIn;