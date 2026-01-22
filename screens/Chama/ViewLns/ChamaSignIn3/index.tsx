import React, {useEffect, useState} from 'react';


import { getCompany, getGroup, getSMAccount, 
  listChamaMembers, listSMAccounts, } from '../../../../src/graphql/queries';
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


  


const ChmSignIn = (props) => {

  
  
  

  const navigation = useNavigation();

  const [grpContact, setChmPhn] = useState('');
  const [nam, setName] = useState(null);

  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const[ownr, setownr] = useState(null);

  const FetchGrpLonsSts = () => {
    navigation.navigate("ChamaGenInfos", {grpContact});
  };
  

  
    
    const gtMemberUsrDetails = async () =>{
      if(isLoading){
        return;
      }
      setIsLoading(true);

      const userInfo = await Auth.currentAuthenticatedUser();      
      const ownr = userInfo.attributes.sub;

      try{
        const UsrDtls :any= await API.graphql(
          graphqlOperation(getSMAccount,{awsemail:userInfo.attributes.email})
          );
          const pwss = UsrDtls.data.getSMAccount.pw;
          const owner = UsrDtls.data.getSMAccount.owner;

          const gtChamaDetails = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{
              const UsrDtlsz :any= await API.graphql(
                graphqlOperation(getGroup,{grpContact:grpContact})
                );
                const owners = UsrDtlsz.data.getGroup.owner;
                const signitory2Subs = UsrDtlsz.data.getGroup.signitory2Sub;
    
                const gtChmDtls = async () =>{
                  if(isLoading){
                    return;
                  }
                  setIsLoading(true);
                  try{
                    const compDtls :any= await API.graphql(
                      graphqlOperation(listChamaMembers,
                        {filter: {
                          groupContact:{eq: grpContact},
                          memberContact:{eq:userInfo.attributes.email}
                         }})
                      );
                      
                      

                      if(compDtls.data.listChamaMembers.items.length < 1 ){Alert.alert("You dont belong to this Chama")}
                      
                      else{FetchGrpLonsSts();}
                    }

            catch(e){
              console.log(e)
              if(e){
                Alert.alert("Chama does not exist; otherwise check inernet connection")
                return;
            }
            }
            setIsLoading(false)
            
                        
            };

            await gtChmDtls();

          }

          catch(e){
            console.log(e)
            if(e){
              Alert.alert("Chama does not exist; otherwise check inernet connection")
              return;
          }
          }
          setIsLoading(false)
          
                      
          };

          if (userInfo.attributes.sub !== owner)
    {Alert.alert ("Please first create main account")}
    else{
          await gtChamaDetails();
    }

          
        }
          catch(e){
            console.log(e)
            if(e){
              Alert.alert("Check your internet")
              return;
          }
          }
          setChmPhn('');
          setPW('');
          
          setChmDesc("")
          setChmNm("")
                      setIsLoading(false)
          };
         
    
      

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
  const ChmPhns=grpContact
    if(!ChmPhns && ChmPhns!=="")
    {
      setChmPhn("");
      return;
    }
    setChmPhn(ChmPhns);
    }, [grpContact]
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
                    <Text style={styles.title}>Fill Chama Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                   
                      value={grpContact}
                      onChangeText={setChmPhn}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Chama Account Number</Text>
                  </View>

                  <TouchableOpacity
                    onPress={gtMemberUsrDetails}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to View
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default ChmSignIn;