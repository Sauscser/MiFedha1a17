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


  


const ChmSignIn = (props) => {

  
  
  

  const navigation = useNavigation();

  const [grpContact, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState(''); 
  const[ownr, setownr] = useState(null);
  const ChmNMmbrPhns = grpContact


  const FetchGrpLonsSts = () => {
    navigation.navigate("Vw2BLCovs", {ChmNMmbrPhns});
  };
  

  
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      
      setownr(userInfo.attributes.sub);     
          
    };
    useEffect(() => {
      fetchUser();
    }, []);


    

    
                const gtChmDtls = async () =>{
                  if(isLoading){
                    return;
                  }
                  setIsLoading(true);
                  const userInfo = await Auth.currentAuthenticatedUser();
                  try{
                    const compDtls :any= await API.graphql(
                      graphqlOperation(getGroup,{grpContact:grpContact})
                      );
                      const signitoryPWs = compDtls.data.getGroup.signitoryPW;  
                      const owners = compDtls.data.getGroup.owner;  
                      const signitory2Subs = compDtls.data.getGroup.signitory2Sub;  
                      const objectionStatus =compDtls.data.getGroup.objectionStatus;
                      const Admin1 = compDtls.data.getGroup.Admin1;      
                      const Admin2 = compDtls.data.getGroup.Admin2;
                      const Admin3 = compDtls.data.getGroup.Admin3;
                      const Admin4 = compDtls.data.getGroup.Admin4;
                      const Admin5 = compDtls.data.getGroup.Admin5;
                      const Admin6 = compDtls.data.getGroup.Admin6;
                      const Admin7 = compDtls.data.getGroup.Admin7;
                      const Admin8 = compDtls.data.getGroup.Admin8;
                      const Admin9 = compDtls.data.getGroup.Admin9;
                      const Admin10 = compDtls.data.getGroup.Admin10;
                      const Admin11 = compDtls.data.getGroup.Admin11;
                      const Admin12 = compDtls.data.getGroup.Admin12;
                      const Admin13 = compDtls.data.getGroup.Admin13;
                      const Admin14 = compDtls.data.getGroup.Admin14;
                      const Admin15 = compDtls.data.getGroup.Admin15;
                      const Admin16 = compDtls.data.getGroup.Admin16;
                      const Admin17 = compDtls.data.getGroup.Admin17;
                      const Admin18 = compDtls.data.getGroup.Admin18;
                      const Admin19 = compDtls.data.getGroup.Admin19;
                      const Admin20 = compDtls.data.getGroup.Admin20; 

                      if(signitoryPWs!==pword){Alert.alert("Wrong author credentials")}
                      else if(ownr!==owners
                        
                        && signitory2Subs !== userInfo.attributes.sub
                        &&Admin1 !== userInfo.attributes.email
                      &&
                      Admin2 !== userInfo.attributes.email 
                      &&
                      Admin3 !== userInfo.attributes.email
                      &&
                      Admin4 !== userInfo.attributes.email 
                      &&
                      Admin5 !== userInfo.attributes.email
                      &&
                      Admin6 !== userInfo.attributes.email 
                      &&
                      Admin7 !== userInfo.attributes.email
                      &&
                      Admin8 !== userInfo.attributes.email 
                      &&
                      Admin9 !== userInfo.attributes.email
                      &&
                      Admin10 !== userInfo.attributes.email 
                      &&
                      Admin11 !== userInfo.attributes.email
                      &&
                      Admin12 !== userInfo.attributes.email 
                      &&
                      Admin13 !== userInfo.attributes.email
                      &&
                      Admin14 !== userInfo.attributes.email 
                      &&
                      Admin14 !== userInfo.attributes.email
                      &&
                      Admin15 !== userInfo.attributes.email 
                      &&
                      Admin16 !== userInfo.attributes.email
                      &&
                      Admin17 !== userInfo.attributes.email 
                      &&
                      Admin18 !== userInfo.attributes.email
                      &&
                      Admin19 !== userInfo.attributes.email 
                      &&
                      Admin20 !== userInfo.attributes.email)
                      {Alert.alert("You are neither the author nor signatory nor admin of this Group")
                      return;}
                      
                      else if (objectionStatus === "Objected")
                      {Alert.alert ("Group account is locked by the admin")}
                      else{FetchGrpLonsSts();}
                    }

                    
            
            catch(e){
              console.log(e)
              if(e){
                Alert.alert("Group does not exist; otherwise check inernet connection")
                return;
            }
            }
            setIsLoading(false)
            setChmPhn('');
            setPW('');
            setPhoneContacts("")
            setChmDesc("")
            setChmNm("")
            setmemberPhn("")
                        setIsLoading(false)
                        
            };
              
               

            
              
      
                  
    
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

                  

                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                      value={pword}
                      onChangeText={setPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Chama PassWord</Text>
                  </View>

                 
        
                  <TouchableOpacity
                    onPress={gtChmDtls}
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