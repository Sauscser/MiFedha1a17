import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/MyAc/LoanReq/VwChama2Req";
import styles from './styles';
import { getCompany, getSMAccount, listChamaMembers, 
  listGroups, vwMyChamas } from '../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../src/graphql/mutations';
import { useNavigation } from '@react-navigation/native';

const FetchSMCovLns = props => {

    
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);

    const navigation = useNavigation();
    
    
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
                    filter :{
                      memberContact: {eq:userInfo.attributes.email}
                    } ,
                      
                    }
                 
                  ));
              setLoanees(Lonees.data.listChamaMembers.items);
              if (Lonees.data.listChamaMembers.items.length<1)
              {Alert.alert("You dont belong to any group")}
                        
                        
                      }
          
                      catch (e)
                      {
                        if(e){
                          Alert.alert("Retry or update app or call customer care");
                          return;
                        }
                          
                         
                          
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
    <View style={styles.root}>
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
            
            <Text style={styles.label}> Select group to Request loan</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;