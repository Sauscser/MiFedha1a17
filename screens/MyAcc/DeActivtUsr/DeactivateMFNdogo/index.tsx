import React, {useEffect, useState} from 'react';

import {deleteSMAccount, updateCompany,  } from '../../../../src/graphql/mutations';
import {getCompany, getSMAccount, listCovCreditSellers, listCvrdGroupLoans,  listNonCovCreditSellers, listNonCvrdGroupLoans,  listSMLoansCovereds, listSMLoansNonCovereds } from '../../../../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';

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
  ActivityIndicator
} from 'react-native';
import styles from './styles';


  


const DeregUsrForm = (props) => {
  const navigation = useNavigation();

  const [UsrId, setUsrId] = useState("");
  const [DeactvtnRsn, setDeactvtnRsn] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  

  const gtCompDtls = async () =>{
    if(isLoading){
      return;
    }
    setIsLoading(true);
    try{
      const compDtls :any= await API.graphql(
        graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
        );
        const ActvMFUsrs = compDtls.data.getCompany.ttlActiveUsers
        const inactMFUsrs = compDtls.data.getCompany.ttlInactvUsrs

        const gtUsr = async () =>{
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try{
            const compDtlsz :any= await API.graphql(
              graphqlOperation(getSMAccount,{awsemail:UsrId})
              );

              const UsrBal = compDtlsz.data.getSMAccount.balance;
              
              console.log(compDtls);
           
        const ftchCvdChmLn = async () => {
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try {
              const RecAccountDtl1:any = await API.graphql(
                  graphqlOperation(listCvrdGroupLoans, { filter: {
                  
                    loaneePhn: { eq: UsrId},
                    lonBala:{gt:0}
                              
                }}
            )
          )
          

                  const ftchNonCvdChmLn = async () => {
                    if(isLoading){
                      return;
                    }
                    setIsLoading(true);
                    try {
                        const RecAccountDtl2:any = await API.graphql(
                            graphqlOperation(listNonCvrdGroupLoans, { filter: {
                  
                              loaneePhn: { eq: UsrId},
                              lonBala:{gt:0}
                                        
                          }}),
                            );

                            const ftchCvdCredSlrLn = async () => {
                              if(isLoading){
                                return;
                              }
                              setIsLoading(true);
                              try {
                                  const RecAccountDtl3:any = await API.graphql(
                                      graphqlOperation(listCovCreditSellers, { filter: {
                  
                                        buyerContact: { eq: UsrId},
                                        lonBala:{gt:0}
                                                  
                                    }}),
                                      );
                                      
                                      const ftchNonCovCredSlrLn = async () => {
                                        if(isLoading){
                                          return;
                                        }
                                        setIsLoading(true);
                                        try {
                                            const RecAccountDtl4:any = await API.graphql(
                                                graphqlOperation(listNonCovCreditSellers, { filter: {
                  
                                                  buyerContact: { eq: UsrId},
                                                  lonBala:{gt:0}
                                                            
                                              }}),
                                                ); 

                                                const ftchCvdSMLn = async () => {
                                                  if(isLoading){
                                                    return;
                                                  }
                                                  setIsLoading(true);
                                                  try {
                                                      const RecAccountDtl5:any = await API.graphql(
                                                          graphqlOperation(listSMLoansCovereds, { filter: {
                  
                                                            loaneePhn: { eq: UsrId},
                                                            lonBala:{gt:0}
                                                                      
                                                        }}),
                                                          );  

                                                          const ftchNonCvdSMLn = async () => {
                                                            if(isLoading){
                                                              return;
                                                            }
                                                            setIsLoading(true);
                                                            try {
                                                                const RecAccountDtl6:any = await API.graphql(
                                                                    graphqlOperation(listSMLoansNonCovereds, { filter: {
                  
                                                                      loaneePhn: { eq: UsrId},
                                                                      lonBala:{gt:0}
                                                                                
                                                                  }}),
                                                                    );
        

        
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
                        ttlActiveUsers:parseFloat(ActvMFUsrs) - 1,
                        ttlInactvUsrs:parseFloat(inactMFUsrs) + 1,
                      }
                    })
                  )
              }
              catch(error){
                console.log(error)
                if(error){
                
                Alert.alert("Check your internet")
                return;
            }}

            
            
            setIsLoading(false);
            }

            const KFUsrDtls = async () => {
              if(isLoading){
                return;
              }
              setIsLoading(true);
              try{
                  await API.graphql(
                    graphqlOperation(deleteSMAccount,{
                      input:{
                        awsemail:UsrId,
                        
                      }
                    })
                  )
          
                  
              }
              catch(error){
                if (error){
                  Alert.alert("Deactivation unsuccessful; Retry")
                  return
                }
                }
            Alert.alert("User deactivated successfully")
              setIsLoading(false);          
              await updtActAdm ();
            } 
    
            if (RecAccountDtl6.data.listSMLoansNonCovereds.items.length >0 
              || RecAccountDtl5.data.listSMLoansCovereds.items.length >0 
              || RecAccountDtl4.data.listNonCovCreditSellers.items.length >0
              || RecAccountDtl3.data.listCovCreditSellers.items.length >0
              || RecAccountDtl2.data.listNonCvrdGroupLoans.items.length >0
              || RecAccountDtl1.data.listCvrdGroupLoans.items.length >0
              ) {
              Alert.alert("This User has an uncleared Loan");
              
            }

            else if (parseFloat(UsrBal) > 1)
            {
              Alert.alert("User has money in the Account")
            }
            else{
               KFUsrDtls();
            }
            
          
          } catch (error) {
            
            if(error){
              Alert.alert("Retry or update app or call customer care")
              return;
          };
          }

          
          
          
        };   
        await ftchNonCvdSMLn();

      } catch (error) {
        console.log(error)
        if(error){
          
          Alert.alert("Check your internet")
          return;
      };
      }
      
      
      
    };  
    await ftchCvdSMLn(); 

  } catch (error) {
    console.log(error)
    if(error){
      Alert.alert("Retry or update app or call customer care")
      return;
  };
  }
  
};   
await ftchNonCovCredSlrLn();

} catch (error) {
  console.log(error)
  if(error){
    
    Alert.alert("Check your internet")
    return;
};
}


};   
await ftchCvdCredSlrLn();

} catch (error) {
  console.log(error)
  if(error){
    
    Alert.alert("Check your internet")
    return;
};
}

};   

await ftchNonCvdChmLn();

          } catch (error) {
            console.log(error)
            if(error){
              Alert.alert("Check your internet")
              return;
          };
          
          }}

          if(compDtls.data.getSMAccount===null){
            Alert.alert("Retry or update app or call customer care")
            return;
        }
        
          else{await ftchCvdChmLn();}
          
        } catch (error) {
          if (error){
            Alert.alert("Retry or update app or call customer care")
            return
          }
          
        
        }}

        
      
        await gtUsr();
        
        
          } catch (error) {
            console.log(error)
            if(error){
              Alert.alert("Check internet")
              return;
          };
          }
          setIsLoading(false);
          setUsrId("") 
          setDeactvtnRsn("")
        };    

        useEffect(() =>{
          const usId=UsrId
            if(!usId && usId!=="")
            {
              setUsrId("");
              return;
            }
            setUsrId(usId);
            }, [UsrId]
             );

             useEffect(() =>{
              const DeactvtnRsns=DeactvtnRsn
                if(!DeactvtnRsns && DeactvtnRsns!=="")
                {
                  setDeactvtnRsn("");
                  return;
                }
                setDeactvtnRsn(DeactvtnRsns);
                }, [DeactvtnRsn]
                 );
        
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill User Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="User Email"
                      value={UsrId}
                      onChangeText={setUsrId}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>User Email</Text>
                  </View>
        
                      
        
                  <TouchableOpacity
                    onPress={gtCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to DeRegister 
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default DeregUsrForm;