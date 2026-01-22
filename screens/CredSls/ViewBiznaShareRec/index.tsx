import React, {useState, useEffect} from 'react';
import {View, Text,   FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import NonLnSent from "../../../components/MyAc/ViewRecNonLns";
import styles from './styles';
import { getCompany, getSMAccount,   listNonLoans } from '../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../src/graphql/mutations';

const FetchSMNonLnsSnt = props => {

    
    const [loading, setLoading] = useState(false);
    const [Recvrs, setRecvrs] = useState([]);

   
    const fetchLoanees = async () => {
      setLoading(true);
      
      const userInfo = await Auth.currentAuthenticatedUser();
       
      try {
        const Lonees:any = await API.graphql(graphqlOperation(listNonLoans, 
        {
               
                
                filter:{status:{eq:"BiznaShareCash"},
                recPhn:{eq:userInfo.attributes.email}}
              }
         
            ));

            const revshare = Lonees.data.listNonLoans.items
            setRecvrs(revshare);

            
            
            const fetchUsrDtls = async () => {
      
      try {
              const MFNDtls: any = await API.graphql(
                  graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}
              ),);

              const balances = MFNDtls.data.getSMAccount.balance;
              const owner = MFNDtls.data.getSMAccount.owner;

        

                  
                            
                            const fetchCompDtls = async () => {
                              try {
                                      const MFNDtls1: any = await API.graphql(
                                          graphqlOperation(getCompany, {AdminId: "BaruchHabaB'ShemAdonai2"}
                                      ),);
                      
                                      const companyEarningBals = MFNDtls1.data.getCompany.companyEarningBal;
                                      const companyEarnings = MFNDtls1.data.getCompany.companyEarning;
                                      const enquiryFees = MFNDtls1.data.getCompany.enquiryFee;
                                      
                                      
                                                  
                              
              
                      if(parseFloat(balances) < parseFloat(enquiryFees) ){
                          Alert.alert("Account Balance is very little");
                          return;
                        }
                        else if  (userInfo.attributes.sub !== owner)
                          {Alert.alert ("Please first create main account")}

                          else if (revshare.length < 1 ){
                            Alert.alert("No revenue share")
                          }
                          
                          
                            
                              }
                          catch (e)
                          {
                            if(e){
                              Alert.alert("User does not exist does not exist; otherwise check internet connection");
                              return;
                            }
                              console.log(e)
                             
                              
                          }    
              
                  
                           }
                           await fetchCompDtls();
              
                          }
              
                          catch (e)
                          {
                            
                              console.log(e)
                             
                              
                          }    
              
                          
                           }
                           
                                                  await fetchUsrDtls();
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
        
          useEffect(() => {
            fetchLoanees();
          }, [])

  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Recvrs}
        renderItem={({item}) => <NonLnSent SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            
            <Text style={styles.label2}> (Please swipe down to load)</Text>
            <Text style={styles.label}> Money received from business</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonLnsSnt;