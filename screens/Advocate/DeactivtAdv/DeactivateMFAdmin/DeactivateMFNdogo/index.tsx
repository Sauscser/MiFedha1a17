import React, {useEffect, useState} from 'react';

import {deleteAdvocate, updateAdvocate, updateCompany} from '../../../../../src/graphql/mutations';
import { getCompany} from '../../../../../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';



import {
  View,
  Text,
 
  TextInput,
  ScrollView,
  
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';


  


const DeregMFAdvForm = (props) => {
  

  const [AdvRegNo, setAdvRegNo] = useState("");
  const[isLoading, setIsLoading]= useState(false);

  const gtCompDtls = async () =>{
    if (isLoading){
      return;
    }
    setIsLoading(true);
    try{
      const compDtls :any= await API.graphql(
        graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
        );
        const ActvMFAdv = compDtls.data.getCompany.ttlKFAdvActv
        const ttlKFAdvInActvs = compDtls.data.getCompany.ttlKFAdvInActv

        const KFAdminDtls = async () => {
          if(isLoading){
            return;
          }
          setIsLoading(false);
          try{
              await API.graphql(
                graphqlOperation(deleteAdvocate,{
                  input:{
                    advregnu:AdvRegNo,
                    
                  }
                })
              )
      
              
          }
      
          
          catch(error){if(error){Alert.alert("Error! Access denied!")
      return;} }
      setIsLoading(false);
          

          const updtActAdm = async()=>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{
                await API.graphql(
                  graphqlOperation(updateCompany,{
                    input:{
                      AdminId:"BaruchHabaB'ShemAdonai2",
                      ttlKFAdvActv:parseFloat(ActvMFAdv) - 1,
                      ttlKFAdvInActv:parseFloat(ttlKFAdvInActvs) + 1,
                    }
                  })
                )
            }
            catch(error){if(error){Alert.alert("Error! Access denied!")
        return;}}
        setIsLoading(false);
          }
          await updtActAdm();
         
        } 
        KFAdminDtls();         
                  
          } catch (error) {
            if(error){Alert.alert("Error! Access denied!")
        return;};
          }
          setIsLoading(false);
          setAdvRegNo("") 
          Alert.alert(AdvRegNo + " successfully deregistered.")
        };    
        
        useEffect(() =>{
          const RegN=AdvRegNo
            if(!RegN && RegN!=="")
            {
              setAdvRegNo("");
              return;
            }
            setAdvRegNo(RegN);
            }, [AdvRegNo]
             );


 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView showsVerticalScrollIndicator={false}>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill MFAdvocate Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={AdvRegNo}
                      onChangeText={setAdvRegNo}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>MFAdvocate License Number</Text>
                  </View>
        
                  
        
                  <TouchableOpacity
                    onPress={gtCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to DeRegister 
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default DeregMFAdvForm;