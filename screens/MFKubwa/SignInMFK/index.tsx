import React, {useEffect, useState} from 'react';

import {createCompany} from '../../../src/graphql/mutations';
import { getBankAdmin, getCompany, getSAgent} from '../../../src/graphql/queries';
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



const MFKSignIn = (props) => {  
  const navigation = useNavigation();

  const [MFKId, setMFKId] = useState("");
  const [MFKPW, setMFKPW] = useState("");
  const [ownr, setownr] = useState("");   



  const moveToMFKHm = () => {
    navigation.navigate("MFKbwa");
  };


  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    setownr(userInfo.attributes.sub);  
    
  }

  useEffect(() => {
    fetchUser();
    }, []); 
    
      const fetchMFKDts = async () => {
        try {
                const MFKDtls: any = await API.graphql(
                    graphqlOperation(getSAgent, {saPhoneContact: MFKId}
                ),);

                const pw1s = MFKDtls.data.getSAgent.pw;
                const owners = MFKDtls.data.getSAgent.owner;

                


                if(MFKPW !== pw1s ){
                  Alert.alert("Your password is wrong");
                                  }
                                  
                                  else
                {
              
                  moveToMFKHm();
              }
              
            }

            catch (e)
            {
              if(e){
                Alert.alert("Either you dont have MFKubwa Ac or Check your internet")
                return;
              }
               
                
            }    
            setMFKId("");
            setMFKPW("");
      
    
             }

             useEffect(() =>{
              const mfkid=MFKId
                if(!mfkid && mfkid!=="")
                {
                  setMFKId("");
                  return;
                }
                setMFKId(mfkid);
                }, [MFKId]
                 );

                 useEffect(() =>{
                  const mfkpws=MFKPW
                    if(!mfkpws && mfkpws!=="")
                    {
                      setMFKPW("");
                      return;
                    }
                    setMFKPW(mfkpws);
                    }, [MFKPW]
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
                      value={MFKId}
                      onChangeText={setMFKId}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MFKubwa Phone</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={MFKPW}
                      onChangeText={setMFKPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Pass Word</Text>
                  </View>
        
                  <TouchableOpacity
                    onPress={fetchMFKDts}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Sign In
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default MFKSignIn;