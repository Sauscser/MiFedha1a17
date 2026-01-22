import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/VwCredSales/CrdStatus/Pal/Pal2BizLoanersDtld";
import styles from './styles';
import { getCompany, getSMAccount, listCovCreditSellers, listSMLoansCovereds } from '../../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../../src/graphql/mutations';
import { useRoute } from '@react-navigation/native';


const FetchSMCovLns = props => {

   
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);

   const route = useRoute()

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
              const Lonees:any = await API.graphql(graphqlOperation(listCovCreditSellers, 
                {
                        
                        
                      
                      filter:{
                        and :{
                      lonBala:{gt:0},
                      loanID: {eq:route.params.loanID}
                        }
                      }
              
                    }
              
                  ));
              setLoanees(Lonees.data.listCovCreditSellers.items);

                      }
          
                      catch (e)
                      {
                        if(e){
                          console.log(e) 
                          Alert.alert("Retry or update app or call customer care");
                          return;
                        }
                          console.log(e)                         
                          
                      }    
          
                      
                       }
                       if (userInfo.attributes.sub!==owner) {
                        Alert.alert("Please first create a main account")
                        return;
                      }  else {
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
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts Loanee={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> My Loaners</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;