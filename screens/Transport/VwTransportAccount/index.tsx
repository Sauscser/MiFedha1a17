import React, {useState, useRef,useEffect} from 'react';
import {View, Text, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../components/Transport/VwTransportAc";
import styles from './styles';

import { useRoute } from '@react-navigation/core';

import { listGroups, listNonLoans, listSokoAds, listTransportRegisters, VwMySntMny } from '../../../src/graphql/queries';

const FetchSMCovLns = props => {

    const[LneePhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const route = useRoute()

   
        const fetchLoanees = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();
        
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listTransportRegisters, 
               { 
                filter: {transportOwnerEmail: {eq:userInfo.attributes.email},
                
                }
               
                }
                 
                  ));

                  const AcDtls = (Lonees.data.listTransportRegisters.items);
                  setLoanees(AcDtls);
                  if (!AcDtls) {
                    Alert.alert("No Transport Accounts to view or reset at the moment.");
                  }
              
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };

          useEffect(() => {
            fetchLoanees();
          }, []);
        
          

  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}>My Transport Account</Text>
            <Text style={styles.label}> (Please swipe down to reload)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;