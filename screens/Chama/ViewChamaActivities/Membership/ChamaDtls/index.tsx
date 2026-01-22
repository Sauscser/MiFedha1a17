import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/Chama/ChmActivities/Membership/ChamaDtls";
import styles from './styles';
import { getCompany, getGroup,   listChamaMembers,    } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
import { updateCompany, updateGroup } from '../../../../../src/graphql/mutations';

const FetchSMCovLns = props => {

    const[LneePhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const route = useRoute();

    

        const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listChamaMembers, 
               {
                filter: {
                ChamaNMember: {eq:route.params.ChamaNMember},
                      
                      }
                    }
                 
                  ));
              setLoanees(Lonees.data.listChamaMembers.items);

              
                      
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
        renderItem={({item}) => <LnerStts ChamaMmbrshpDtls={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Chama Members</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;