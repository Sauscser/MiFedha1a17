import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth, SortDirection } from 'aws-amplify';
import NonLnSent from "../../../components/MFNdogo/VwUsrDposit";
import styles from './styles';


import {  getCompany, getSMAccount, listAgentWithdrawals, listFloatReductions, VwMFNFltDeductns, vwMFNFltDeductns } from '../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
import { updateCompany, updateSMAccount } from '../../../src/graphql/mutations';

const FetchSMNonLnsSnt = props => {

   
    const [loading, setLoading] = useState(false);
    const [Recvrs, setRecvrs] = useState([]);
    const route = useRoute();

    
       
                  
                  const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(VwMFNFltDeductns, 
                { 
                     
                      
                      
                      agContact:route.params.MFNId,
                      sortDirection:"DESC"
                      
                    },
                  
                  ));

                  const lds = Lonees.data.VwMFNFltDeductns.items
                  if (lds.length<1)
                  {
                    Alert.alert("No Deposits made")
                  }
                  setRecvrs(lds);

                  
              
                        
                }
                      catch (e)
                      {
                        if(e){
                          Alert.alert("MFNdogo does not exist; otherwise check internet connection");
                          return;
                        }
                          console.log(e)
                         
                          
                      }    
          
                      setLoading(false)
                       }

                      
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
            
            <Text style={styles.label}> User Deposits</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonLnsSnt;