import React, {useEffect, useState} from 'react';

import {createSMAccount, updateCompany} from '../../../src/graphql/mutations';
import { getCompany, listSMAccounts, } from '../../../src/graphql/queries';
import {Auth,  graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  
  TextInput,
  ScrollView,
  
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';


  


const CreateAcForm = (props) => {

  
  const navigation = useNavigation();

  const [nationalId, setNationalid] = useState('');
  const [phoneContact, setPhoneContact] = useState(null);
  const [awsEmail, setAWSEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');

  const[ownr, setownr] = useState(null);

  const moveToWelcomPg = () => {
    navigation.navigate("ViewNonLnsSntCredSlrs");
  };


  

  
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      
      const me = userInfo.attributes.sub;
      setPhoneContact(userInfo.attributes.phone_number);
      setAWSEmail(userInfo.attributes.email);  
      
      const ChckUsrExistence = async () => {
        try {
          const UsrDtls:any = await API.graphql(
            graphqlOperation(listSMAccounts,
              { filter: {
                  
                    owner: { eq: me}
                              
                }}
            )
          )
          if (UsrDtls.data.listSMAccounts.items.length < 1) {
            Alert.alert("Please create Main Account");
            return;
            
          }
          else{
            moveToWelcomPg();
        }
        } catch (e) {
          if(e){Alert.alert("Please first sign up")}
          console.error(e);
        }
      }
      await ChckUsrExistence();
    };

    

    useEffect(() => {
        fetchUser();
      }, []);

      



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
              
            </View>
          );
        };
        
        export default CreateAcForm;