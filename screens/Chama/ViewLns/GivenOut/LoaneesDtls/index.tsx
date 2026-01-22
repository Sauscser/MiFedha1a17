import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/Chama/Loans/Givenout/LoaneesDtls";
import styles from './styles';
import { getCompany, getGroup, listCvrdGroupLoans,  } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
import { updateCompany, updateGroup } from '../../../../../src/graphql/mutations';

const FetchSMCovLns = props => {

    const[LnerPhn, setLnerPhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);

    const route = useRoute();
   

        const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listCvrdGroupLoans, 
                { 
                 
                  filter: {
                    and: {
                      loanID:{eq:route.params.loanID},
                      lonBala:{gt:0}
                      
                    }
                  },
                }
             
              ));

              setLoanees(Lonees.data.listCvrdGroupLoans.items);

        
          
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
        renderItem={({item}) => <LnerStts Loaner={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Group Loanees</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;