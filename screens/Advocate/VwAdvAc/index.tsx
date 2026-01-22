import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';

import { API, graphqlOperation,  } from 'aws-amplify';
import NonLnSent from "../../../components/Advocate/VwAc";
import styles from './styles';


import { listAdvocates } from '../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';

const FetchSMNonLnsSnt = props => {

    const [loading, setLoading] = useState(false);
    const [Recvrs, setRecvrs] = useState([]);
    const route = useRoute();

    
        const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listAdvocates, 
                { filter: {
                    and: {
                      advregnu:  {eq:route.params.AdvReNo},
                      status: { eq: "AccountActive"},
                      
                    }
                  }}
                  ));
                  setRecvrs(Lonees.data.listAdvocates.items);
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
            
            <Text style={styles.label}> My Advocate Ac</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonLnsSnt;