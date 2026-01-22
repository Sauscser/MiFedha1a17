import React, {useEffect, useState} from 'react';

import {createCompany} from '../../../src/graphql/mutations';
import { getAgent, getBankAdmin, getCompany, getSAgent} from '../../../src/graphql/queries';
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

  const [MFKPhn, setMFNId] = useState("");
  const [MFNPW, setMFNPW] = useState("");  
  const [ownr, setownr] = useState(null);  




  const moveToMFNHm = () => {
    navigation.navigate("VwMFKWthdrwlss", {MFKPhn});
  };

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    
    
    setownr(userInfo.attributes.sub);
     
  };

  

  useEffect(() => {
      fetchUser();
    }, []);
    
      const fetchMFNDts = async () => {
        try {
                const MFNDtls: any = await API.graphql(
                    graphqlOperation(getSAgent, {saPhoneContact: MFKPhn}
                ),);

                const pw1s = MFNDtls.data.getSAgent.pw;
                const owners = MFNDtls.data.getSAgent.owner;

                


                if(owners!==ownr){
                  Alert.alert("You dont own this MFKubwa");
                }
          else if(MFNPW !== pw1s ){
            Alert.alert("Wrong MFKubwa credentials");
          }
          else{
              
                  moveToMFNHm();
              }
              
            }

            catch (e)
            {
              if(e){
                Alert.alert("MFKubwa does not exist; otherwise check internet connection");
                return;
              }
                console.log(e)
               
                
            }    
            setMFNId("");
            setMFNPW("");
      
    
             }

             useEffect(() =>{
              const mfnID=MFKPhn
                if(!mfnID && mfnID!=="")
                {
                  setMFNId("");
                  return;
                }
                setMFNId(mfnID);
                }, [MFKPhn]
                 );
  
                 useEffect(() =>{
                  const mfnPW=MFNPW
                    if(!mfnPW && mfnPW!=="")
                    {
                      setMFNPW("");
                      return;
                    }
                    setMFNPW(mfnPW);
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
                      value={MFKPhn}
                      onChangeText={setMFNId}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MFKubwa Phone</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={MFNPW}
                      onChangeText={setMFNPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Pass Word</Text>
                  </View>
        
                  <TouchableOpacity
                    onPress={fetchMFNDts}
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