import React, {useState, useRef,useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/VwCredSales/Vw2Grant/Biz2Pal";
import styles from './styles';
import {   listReqLoanCredSls, listSMAccounts } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';

const FetchSMNonCovLns = props => {

    const[LneePhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
   

  const route = useRoute();
  
/*

  Grant Biz2Biz
  
  */

    const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
              
        setLneePhn(userInfo.attributes.phone_number);
             
      };
      
  
      useEffect(() => {
          fetchUser();
        }, []);

        const fetchLoanees = async () => {
            setLoading(true);
            try {

              const Lonees:any = await API.graphql(graphqlOperation(listReqLoanCredSls, 
                { 
                    
                  filter: {
                  
                    businessNo: { eq: route.params.MFNId},
                    status:{eq:"AwaitingResponse"},
                    lnType:{eq:"Biz2Pal"}
                }
                }
                  ));
              setLoanees(Lonees.data.listReqLoanCredSls.items);
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
            
            
            <Text style={styles.label}> Swipe down to refresh</Text>
            
            <Text style={styles.label2}> (Select Loan Request to Grant)</Text>
            
          </>
        )}
      />



    </View>
  );
};

export default FetchSMNonCovLns;