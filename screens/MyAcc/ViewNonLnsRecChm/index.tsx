import React, {useState, useEffect} from 'react';
import {View, Text,   FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import RecNonLns from "../../../components/MyAc/ViewRecNonLns";
import styles from './styles';
import { getCompany, getGroup,    listLoanRepayments,    listNonLoans,    VwMyRecMny } from '../../../src/graphql/queries';
import { updateCompany, updateGroup,  } from '../../../src/graphql/mutations';
import { useRoute } from '@react-navigation/core';

const FetchSMNonLnsRec = props => {

    const[RecPhn, setRecPhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const route = useRoute();

    const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
              
        setRecPhn(userInfo.attributes.email);
             
      };
      
  
      useEffect(() => {
          fetchUser();
        }, []);

        const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listLoanRepayments, 
              {
                      
                     
                      filter:{loanId3: {eq:route.params.loanID}}
                      
                    }
                  
                  ));
              setLoanees(Lonees.data.listLoanRepayments.items);


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
        data={Loanees}
        renderItem={({item}) => <RecNonLns SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}>Received Chama LP</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonLnsRec;