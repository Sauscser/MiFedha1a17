import React, {useEffect, useState} from 'react';
import {Alert} from "react-native"


import {Auth,  graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  
  TextInput,
  ScrollView,
  
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import { createChamasNPwnBrkrs } from '../../src/graphql/mutations';

  const RegisterMFAdvAcForms = props => {

  const navigation = useNavigation();

  
  const [nationalId, setNationalid] = useState('');
  const [nam, setName] = useState("");
  const [phoneContact, setPhoneContact] = useState("");
  const[eml, setEml] =useState("");
  const [ownr, setOwnr] = useState(null);
  const [pword, setPW] = useState('');
  const [advRegNo, setAdvRegNo] = useState('');
  const[officeLocs, setOfficeLoc] = useState("");
  const [isLoading, setIsLoading] =useState(false);
  const [UsrPhn, setUsrPhn] = useState(null);
  
  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();   
    setOwnr(userInfo.attributes.sub); 
    setUsrPhn(userInfo.attributes.phone_number);
  };

    useEffect(() => {
    fetchUser();
   }, []);

   
        
        const onCreateNewMFN = async () => {
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try {
            await API.graphql(
              graphqlOperation(createChamasNPwnBrkrs, {
                input: {                    
                  contact: pword,
                  
                  regNo: advRegNo,
                  
                  owner:ownr,
                  AcStatus: 'AccountActive',
                },
              }),
            );
            
          } 
          
          
          catch (error) {    
            console.log(error)   
            if(error)
          {Alert.alert("Not authorised")
        return;} 
         
      
        } 
        
        setIsLoading(false);
        setNationalid("");
        setPW("");
        setName("");
        setEml("");
        setAdvRegNo("");
        setPhoneContact("");
        setOfficeLoc(""); 
        Alert.alert("Account successfully created") 
        };
        
        
      
      
        




   
    
useEffect(() =>{
  const natid=nationalId
    if(!natid && natid!=="")
    {
      setNationalid("");
      return;
    }
    setNationalid(natid);
    }, [nationalId]
     );

     useEffect(() =>{
      const AVdPWs=pword
        if(!AVdPWs && AVdPWs!=="")
        {
          setPW("");
          return;
        }
        setPW(AVdPWs);
        }, [pword]
         );

         useEffect(() =>{
          const nym=nam
            if(!nym && nym!=="")
            {
              setName("");
              return;
            }
            setName(nym);
            }, [nam]
             );

             useEffect(() =>{
              const emyl=eml
                if(!emyl && emyl!=="")
                {
                  setEml("");
                  return;
                }
                setEml(emyl);
                }, [eml]
                 );

                 useEffect(() =>{
                  const phn=phoneContact
                    if(!phn && phn!=="")
                    {
                      setPhoneContact("");
                      return;
                    }
                    setPhoneContact(phn);
                    }, [phoneContact]
                     );

                     useEffect(() =>{
                      const AVdRegs=advRegNo
                        if(!AVdRegs && AVdRegs!=="")
                        {
                          setAdvRegNo("");
                          return;
                        }
                        setAdvRegNo(AVdRegs);
                        }, [advRegNo]
                         );

                         useEffect(() =>{
                          const officeLocss=officeLocs
                            if(!officeLocss && officeLocss!=="")
                            {
                              setOfficeLoc("");
                              return;
                            }
                            setOfficeLoc(officeLocss);
                            }, [officeLocs]
                             );

  return (
   
      <View
        
        style={styles.image}>
        <ScrollView
        showsVerticalScrollIndicator={false}>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Account Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={advRegNo}
              onChangeText={setAdvRegNo}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Registration Number</Text>
          </View>
          
          
          <View style={styles.sendLoanView}>
            <TextInput
            placeholder={"+2547xxxxxxxx"}
              value={pword}
              onChangeText={setPW}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}> Phone Number</Text>
          </View>

          
      
          <TouchableOpacity
            onPress={onCreateNewMFN}
            style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>
              Click to Create Account
            </Text>
            {isLoading && <ActivityIndicator color={'Blue'} size="large"/>}
          </TouchableOpacity>
        </ScrollView>
      </View>
    
  );
};

export default RegisterMFAdvAcForms;