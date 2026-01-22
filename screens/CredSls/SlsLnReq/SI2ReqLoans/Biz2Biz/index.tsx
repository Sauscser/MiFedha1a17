import React, {useEffect, useState} from 'react';


import { getSMAccount, listPersonels} from '../../../../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
 
} from 'react-native';
import styles from './styles';



const MFNSignIn = (props) => {  
  const navigation = useNavigation();

  const [MFNId, setMFNId] = useState("");
  const [MFNPW, setMFNPW] = useState(""); 
  

  
  const [grpContact, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [SendrPhn, setSendrPhn] = useState(null);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState(''); 
 
  const ChmNMmbrPhns = ChmDesc+memberPhn

  const VwMFNAc = () => {
    navigation.navigate("Vw2GrntBiz2Biz", {MFNId});
  };
  
/*
Biz2Biz
*/
  
    
    const gtChmDtls = async () =>{
      if(isLoading){
        return;
      }
      setIsLoading(true);

      const userInfo = await Auth.currentAuthenticatedUser();
    
      try{
        const compDtls :any= await API.graphql(
          graphqlOperation(getSMAccount,{awsemail:userInfo.attributes.email})
          );
          const signitoryPWs = compDtls.data.getSMAccount.pw;  
          const owners = compDtls.data.getSMAccount.owner; 
    
    const ChckPersonelExistence = async () => {
      try {
        const UsrDtls:any = await API.graphql(
          graphqlOperation(listPersonels,
            { filter: {
                
              phoneKontact: { eq: userInfo.attributes.email},
              BusinessRegNo:{eq: MFNId}
                            
              }}
          )
        )

        

              if(signitoryPWs!==pword){Alert.alert("Wrong User credentials")}
    else if (UsrDtls.data.listPersonels.items.length < 1) {
      Alert.alert("You do not work here");
      return;
      
    }
    else if(userInfo.attributes.sub !==owners){Alert.alert("This is not your Account")}
    else{VwMFNAc();}

      }

  

      catch(e){
        console.log(e)
        if(e){
          Alert.alert("Retry or update app or call customer care")
          return;
      }
      }
      
                  setIsLoading(false)
                  
      };

      if (userInfo.attributes.sub !== owners)
    {Alert.alert ("Please first create main account")}
    else{
      await ChckPersonelExistence();}

  }

  

catch(e){
console.log(e)
if(e){
Alert.alert("Retry or update app or call customer care")
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
setMFNId("")
      setIsLoading(false)
      
};

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

             useEffect(() =>{
              const mfnIDs=MFNId
                if(!mfnIDs && mfnIDs!=="")
                {
                  setMFNId("");
                  return;
                }
                setMFNId(mfnIDs);
                }, [MFNId]
                 );
  
                 useEffect(() =>{
                  const mfnPWs=MFNPW
                    if(!mfnPWs && mfnPWs!=="")
                    {
                      setMFNPW("");
                      return;
                    }
                    setMFNPW(mfnPWs);
                    }, [MFNPW]
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
                      value={MFNId}
                      onChangeText={setMFNId}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Business Phone</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                      value={pword}
                      onChangeText={setPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Sales Officer User PW</Text>
                  </View>
        
                  <TouchableOpacity
                    onPress={gtChmDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to View
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default MFNSignIn;