import React, {useEffect, useState} from 'react';



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
import { getSMAccount, listPersonels } from '../../../../../../src/graphql/queries';


  


const ChmSignIn = (props) => {

  
  
  

  const navigation = useNavigation();

  const [grpContact, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState(''); 
  
  
  
  const FetchGrpLonsSts = () => {
    navigation.navigate("Vw2RpyB2P", {memberPhn});
  };

  const ChckPersonelExistence = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);

    const userInfo = await Auth.currentAuthenticatedUser();
    try {
      const UsrDtls:any = await API.graphql(
        graphqlOperation(listPersonels,
          { filter: {
              
            phoneKontact: { eq: userInfo.attributes.email},
            BusinessRegNo:{eq: memberPhn}
                          
            }}
        )
      )
      
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
    
    
  

      

            if(signitoryPWs!==pword){Alert.alert("Wrong User credentials")}
  else if (UsrDtls.data.listPersonels.items.length < 1) {
    Alert.alert("You do not work here");
    return;
    
  }
  else if(userInfo.attributes.sub !==owners){Alert.alert("This is not your Account")}
  else{FetchGrpLonsSts();}

}

catch(e){
  console.log(e)
  if(e){
    Alert.alert("Error! Update app or call customer care")
    return;
}
}

  }

await gtChmDtls();
}

    catch(e){
      console.log(e)
      if(e){
        Alert.alert("Error! update app or call customer care")
        return;
    }
    }

    
    
                setIsLoading(false)
                
    
            setIsLoading(false)
            setChmPhn('');
            setPW('');
            setPhoneContacts("")
            setChmDesc("")
            setChmNm("")
            setmemberPhn("")
                        
            };
              
      

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
                    placeholder="Company Phone"
                      value={memberPhn}
                      onChangeText={setmemberPhn}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Company Phone</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                      value={pword}
                      onChangeText={setPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MainAccountPassword</Text>
                  </View>

                 
        
                  <TouchableOpacity
                    onPress={ChckPersonelExistence}
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