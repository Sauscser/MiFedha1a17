import React, {useState,useEffect} from 'react';
import {View, Text,  FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import NonLnSent from "../../../components/Advocate/VwPP2Approve";
import styles from './styles';


import {  getCompany, getSMAccount, listReqLoans } from '../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
import { updateCompany, updateSMAccount } from '../../../src/graphql/mutations';

const FetchSMNonLnsSnt = props => {

    const [loading, setLoading] = useState(false);
    const [Recvrs, setRecvrs] = useState([]);
   
    const route = useRoute();

    const fetchUsrDtls = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
    
      setLoading(true);
      try {
              const MFNDtls: any = await API.graphql(
                  graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}
              ),);

              const balances = MFNDtls.data.getSMAccount.balance;
              const owner = MFNDtls.data.getSMAccount.owner;

        const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listReqLoans, 
                {
                  
                 
                      filter: {
                        AdvEmail:{eq:userInfo.attributes.email},
                          
                          statusNumber:{eq:0}
                          
                      },
                    }
              
                  ));
                  
                  setRecvrs(Lonees.data.listReqLoans.items);
                  if (Lonees.data.listReqLoans.items.length <1){
                    Alert.alert ("No clients available")
                  }
                  
                            
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
                          return;
                        }
                        else{
                            
                           updtActAdm();
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
                              console.log(e)
                              return;
                            }
                              
                             
                              
                            }    
                            setLoading(false);
                          
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

       setLoading(false);
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
            
            <Text style={styles.label}> PalPal Loans</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonLnsSnt;