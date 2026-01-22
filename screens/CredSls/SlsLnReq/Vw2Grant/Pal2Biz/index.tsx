import React, {useState, useRef,useEffect} from 'react';
import {View, Text, Alert, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/VwCredSales/Vw2Grant/Pal2Biz";
import styles from './styles';
import {  listReqLoanCredSls, listSMAccounts } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';

const FetchSMNonCovLns = props => {

    const[Loaneesz, setLoaneesz] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
   

  const route = useRoute();
  
/*

  Grant Biz2Biz
  
  */

    const fetchUser = async () => {
      setLoading(true);
      const userInfo = await Auth.currentAuthenticatedUser();
        
  
       
      try {
        const Lonees:any = await API.graphql(graphqlOperation(listSMAccounts, 
          { filter: {
              and: {
                awsemail: { eq: userInfo.attributes.email},
                
              }
            }}
            ));
        setLoaneesz(Lonees.data.listSMAccounts.items);
      
  
      

        const fetchLoanees = async () => {
            setLoading(true);
            try {

              const Lonees:any = await API.graphql(graphqlOperation(listReqLoanCredSls, 
                { 
                    
                  filter: {
                  
                    businessNo: { eq: userInfo.attributes.email},
                    status:{eq:"AwaitingResponse"},
                    lnType:{eq:"Pal2Biz"}
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

          if (Lonees.data.listSMAccounts.items.length <1)
          {Alert.alert("Please create main account on main page")}

          await fetchLoanees();

        } catch (e) {
            
          console.log(e);
        } finally {
          setLoading(false);
        }
        
      };

      useEffect(() => {
        fetchUser();
      }, []);
          
          
  return (
    

    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUser}
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