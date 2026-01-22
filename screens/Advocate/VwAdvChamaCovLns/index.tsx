import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import NonLnSent from "../../../components/Advocate/VwChmCovLns";
import styles from './styles';


import {  getCompany, getSMAccount, listCvrdGroupLoans, vwAdvNLnrNLnee, vwChmLnClients } from '../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
import { updateCompany, updateSMAccount } from '../../../src/graphql/mutations';

const FetchSMNonLnsSnt = props => {

    const [loading, setLoading] = useState(false);
    const [Recvrs, setRecvrs] = useState([]);
    
    const route = useRoute();

    

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
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listCvrdGroupLoans, 
                

                  {
                   
                    
                    filter: {
                      and: {
                        
                        lonBala:{gt:0},
                        advEmail: {eq:userInfo.attributes.email}
                        
                      }
                    },
                  
                }
                
                  ));
                  setRecvrs(Lonees.data.listCvrdGroupLoans.items);
                  
                            
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
                                                              companyEarningBal:parseFloat(companyEarningBals) + parseFloat(enquiryFees),
                                                              companyEarning:parseFloat(companyEarnings) + parseFloat(enquiryFees),
                                                            }
                                                          })
                                                        )
                                                    }
                                                    catch(error){
                                                      if(error){
                                                        Alert.alert("Error! Access denied!")
                                                        return;
                                                    }
                                                    }
                                                    await updtUsrAc();
                                                    
                                                  }
              
                                                  const updtUsrAc = async()=>{
                                                    
                                                    try{
                                                        await API.graphql(
                                                          graphqlOperation(updateSMAccount,{
                                                            input:{
                                                              awsemail:userInfo.attributes.email,
                                                              balance:parseFloat(balances) - parseFloat(enquiryFees),
                                                            }
                                                          })
                                                        )
                                                    }
                                                    catch(error){
                                                      if(error){
                                                        Alert.alert("Error! Access denied!")
                                                        return;
                                                    }
                                                    }
                                                    
                                                    
                                                  }
                              
              
              
                              
              
                      if(parseFloat(balances) < parseFloat(enquiryFees) ){
                          Alert.alert("Account Balance is very little");
                        }
                        else{
                            
                          await updtActAdm();
                            }
                            
                              }
                          catch (e)
                          {
                            if(e){
                              Alert.alert("Error! Access denied!");
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
                              Alert.alert("Error! Access denied!");
                              return;
                            }
                              console.log(e)
                             
                              
                          }    
              
                          
                           }

                           if (userInfo.attributes.sub !== owner)
    {Alert.alert ("Please first create main account")}
    else{
                           await fetchLoanees();}
                  
            
          
        }
              
        catch (e)
        {
          if(e){
            Alert.alert("Error! Access denied!");
            return;
          }
            console.log(e)
           
            
        }    

        
         }
      
        
          useEffect(() => {
            fetchUsrDtls();
          }, [])    


  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Recvrs}
        renderItem={({item}) => <NonLnSent SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Chama Covered Loans</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonLnsSnt;