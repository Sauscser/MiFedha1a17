import React, {useState, useRef,useEffect} from 'react';
import {View, Text, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../components/Transport/ReceiveDelivery";
import styles from './styles';

import { useRoute } from '@react-navigation/core';

import { ByBuyerEmail, listGroups, listNonLoans, listSokoAds, listTransportOrders, VwMySntMny } from '../../../src/graphql/queries';

const FetchSMCovLns = props => {

    const[LneePhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const route = useRoute()

   
        const fetchLoanees = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();
        
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(ByBuyerEmail, 
               { 
               customerEmail: userInfo.attributes.email,
                sortDirection: "DESC",
                limit: 100,
               
                }
                 
                  ));

                  const orderDtlz = Lonees.data.ByBuyerEmail.items;
                  setLoanees(orderDtlz);
                  if (!orderDtlz) {
                    Alert.alert("No Transport Orders to receive or cancel at the moment.");
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
            
            <Text style={styles.label}>View delivery Order</Text>
            <Text style={styles.label}> (Please swipe down to reload)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;