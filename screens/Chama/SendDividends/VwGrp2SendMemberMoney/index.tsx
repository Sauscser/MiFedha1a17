import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/Chama/ChmActivities/SendMemberMoney/VwChama2SendMoney";
import styles from './styles';
import { getSMAccount, listChamaMembers,    } from '../../../../src/graphql/queries';

const FetchSMCovLns = props => {

    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);

   
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
              const Lonees:any = await API.graphql(graphqlOperation(listChamaMembers, 
                { filter: {
                    and: {
                      memberContact: { eq: userInfo.attributes.email}
                      
                    }
                  }}
                  ));
              setLoanees(Lonees.data.listChamaMembers.items);

              
            } catch (e) {
              if (e){
                Alert.alert("Retry or call customer care")
                return
              }
            } finally {
              setLoading(false);
            }
          };

          if (userInfo.attributes.sub !== owner)
    {Alert.alert ("Please first create main account")}
    else{
                           await fetchLoanees();}
        
        }
              
        catch (e)
        {
          if(e){
            Alert.alert("Error!");
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
        data={Loanees}
        renderItem={({item}) => <LnerStts ChamaRemitDtls={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> My Chamas</Text>
            <Text style={styles.label}>Please swipe down to load</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;