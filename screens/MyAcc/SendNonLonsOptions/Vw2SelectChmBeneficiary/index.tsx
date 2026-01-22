import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList, Alert, KeyboardAvoidingView, Platform} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/MyAc/BenefitChama";

import { getCompany, getSMAccount, listChamaMembers } from '../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../src/graphql/mutations';
import { useNavigation } from '@react-navigation/native';

const FetchSMCovLns = props => {

    
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);

    const navigation = useNavigation();
    const noBenefit = () => {
      navigation.navigate ("BenefitChmSenderOnly")
    }
    
    const fetchUsrDtls = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      try {
              const MFNDtls: any = await API.graphql(
                  graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}
              ),);

              const balances = MFNDtls.data.getSMAccount.balance;
              const owner = MFNDtls.data.getSMAccount.owner;
              
              
              const fetchLoanees = async () => {
            setLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();
              
   
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listChamaMembers, 
                {
                filter:{memberContact: {eq:userInfo.attributes.email}
              },
                     
                      
                      
                    }
                 
                  ));
              setLoanees(Lonees.data.listChamaMembers.items);

              
                        
                        const fetchCompDtls = async () => {
                          try {
                                  const MFNDtls: any = await API.graphql(
                                      graphqlOperation(getCompany, {AdminId: "BaruchHabaB'ShemAdonai2"}
                                  ),);
                  
                                  const companyEarningBals = MFNDtls.data.getCompany.companyEarningBal;
                                  const companyEarnings = MFNDtls.data.getCompany.companyEarning;
                                  const enquiryFees = MFNDtls.data.getCompany.enquiryFee;
                                  
                                  
                                              const updtActAdm = async()=>{
                                                
                                                try{
                                                    await API.graphql(
                                                      graphqlOperation(updateCompany,{
                                                        input:{
                                                          AdminId:"BaruchHabaB'ShemAdonai2",
                                                          
                                                        }
                                                      })
                                                    )
                                                }
                                                catch(error){
                                                  if(error){
                                                    Alert.alert("Check your internet connection")
                                                    return;
                                                }
                                                }
                                                updtUsrAc();
                                                
                                              }
          
                                              const updtUsrAc = async()=>{
                                                
                                                try{
                                                    await API.graphql(
                                                      graphqlOperation(updateSMAccount,{
                                                        input:{
                                                          awsemail: userInfo.attributes.email,
                                                         
                                                        }
                                                      })
                                                    )
                                                }
                                                catch(error){
                                                  if(error){
                                                    Alert.alert("Retry or update app or call customer care")
                                                    return;
                                                }
                                                }
                                                                                                    
                                              }
                          
          
          
                          
          
                  if(parseFloat(Lonees.data.listChamaMembers.items.length) < 1 ){
                    noBenefit();
                      Alert.alert("Please create/join any group to benefit");
                    }
                    else{
                        
                      await updtActAdm();
                        }
                        
                          }
                      catch (e)
                      {
                        if(e){
                          Alert.alert("Error! Retry or call customer care!");
                          return;
                        }
                          console.log(e)
                         
                          
                      }    
          
              
                       }
                       await fetchCompDtls();
          
                      }
          
                      catch (e)
                      {
                        if(e){
                          console.log(e)
                          
                          return;
                        }
                          console.log(e)
                         
                          
                      }    
          
                      
                       }
                       if (userInfo.attributes.sub !== owner)
                       {Alert.alert ("Please first create main account")}
                       else{
                                              await fetchLoanees();}

                                              
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
        
          useEffect(() => {
            fetchUsrDtls();
          }, [])     

  return (
   <KeyboardAvoidingView
                      style={{ flex: 1 }} 
                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  >
                      <View style={styles.container}>
                          {/* Search Bar */}
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts ChamaMmbrshpDtls={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text > Select one of your groups to benefit</Text>
          </>
        )}
      />
     </View>
             </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    searchBar: {
        marginBottom: 10,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    placeholderText: {
        textAlign: 'center',
        color: '#aaa',
        marginTop: 20,
    },
});

export default FetchSMCovLns;