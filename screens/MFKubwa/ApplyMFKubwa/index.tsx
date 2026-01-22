import React, {useEffect, useState} from 'react';

import {createChamasNPwnBrkrs, createSAgent, updateCompany, updateSMAccount} from '../../../src/graphql/mutations';

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
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import { getCompany, getSMAccount, listSMAccounts } from '../../../src/graphql/queries';

const RegisterMFKubwaAcForm = props => {
  const [nationalId, setNationalid] = useState("");
  const [nam, setName] = useState("");
 
  const[eml, setEml] =useState("");
  
  const [pword, setPW] = useState("");
  const [BkName, setBkName] = useState('');
  const [BkAcNu, setBkAcNu] = useState('');
  const[isLoading, setIsLoading] = useState(false);
  




        const ChckPhnUse = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();   
  
          try {
            const UsrDtlss:any = await API.graphql(
              graphqlOperation(listSMAccounts,
                { filter: {
                    
                  awsemail: { eq: userInfo.attributes.email}
                                
                  }}
              )
            )

            const ChckUsrExistence = async () => {
              try {
                const UsrDtls:any = await API.graphql(
                  graphqlOperation(getSMAccount, 
                    { 
                      awsemail:userInfo.attributes.email
                    }
                  )
                )
                const owner = UsrDtls.data.getSMAccount.owner
                const UsrDtl = UsrDtls.data.getSMAccount

            const CreateNewSA = async () => {
              if(isLoading){
                return;
              }
              setIsLoading(true);
              try {
                await API.graphql(
                  graphqlOperation(createChamasNPwnBrkrs, {
                    input: {
                      
                      contact: userInfo.attributes.email,
                      regNo: userInfo.attributes.phone_number,
                      
                      AcStatus: 'AccountActive',
                      owner: UsrDtl.name,
                      
                    },
                  }),
                );
    
                
              } 
    
              catch (error) {
                if (error){
                  Alert.alert("Application unsuccessful; Retry")
                  return
                }
              }
              setIsLoading(false); 
              Alert.alert("Successful application, wait for communication from MiFedha LTD")           
            };

            if (userInfo.attributes.sub !== owner)
          {Alert.alert ("Please first create main account")}
          else if (pword.length<8)
        {Alert.alert("Password is too short; at least eight characters");
      return;

      
    }
else {
          CreateNewSA();}
        
          } catch (e) {
            if(e){Alert.alert("Please first sign up")
          return}
            console.error(e);
          }
        }
         if(UsrDtlss.data.listSMAccounts.items.length < 1){Alert.alert("Please first create a main account")}
         else{
        await ChckUsrExistence();}
      
      } catch (e) {
            if(e){Alert.alert("Please first sign up")
          return}
            console.error(e);
          }
          setIsLoading(false);
          setNationalid('');
          setPW("");
          setName("");
          setEml("");
         
          setBkAcNu("");
          setBkName("");
        }

         

        



       
 

useEffect(() =>{
  const BkNames=BkName
    if(!BkNames && BkNames!=="")
    {
      setBkName("");
      return;
    }
    setBkName(BkNames);
    }, [BkName]
     );

     useEffect(() =>{
      const BkAcNus=BkAcNu
        if(!BkAcNus && BkAcNus!=="")
        {
          setBkAcNu("");
          return;
        }
        setBkAcNu(BkAcNus);
        }, [BkAcNu]
         );
         
         useEffect(() =>{
  const mfkID=nationalId
    if(!mfkID && mfkID!=="")
    {
      setNationalid("");
      return;
    }
    setNationalid(mfkID);
    }, [nationalId]
     );

     useEffect(() =>{
      const mfkpw=pword
        if(!mfkpw && mfkpw!=="")
        {
          setPW("");
          return;
        }
        setPW(mfkpw);
        }, [pword]
         );

         useEffect(() =>{
          const mfknm=nam
            if(!mfknm && mfknm!=="")
            {
              setName("");
              return;
            }
            setName(mfknm);
            }, [nam]
             );

             useEffect(() =>{
              const mfkeml=eml
                if(!mfkeml && mfkeml!=="")
                {
                  setEml("");
                  return;
                }
                setEml(mfkeml);
                }, [eml]
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
            
            value={nam}
              onChangeText={setName}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Nationality/Country</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={pword}
              onChangeText={setPW}
              secureTextEntry = {true}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>User Pass Word</Text>
          </View>


          <TouchableOpacity
            onPress={ChckPhnUse}
            style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>
              Click to Create Account
            </Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default RegisterMFKubwaAcForm;