import React, {useState, useRef,useEffect} from 'react';
import {View, Text,   FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import ChmMbrContr from "../../../../../components/Chama/ChmActivities/Contributions/VwChama";
import styles from './styles';
import { getCompany, getGroup,   listGrpMembersContributions,   
   } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
import { updateCompany, updateGroup } from '../../../../../src/graphql/mutations';

const FetchSMCovLns = props => {

    const[LneePhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const route = useRoute();
             

    const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
              
        setLneePhn(userInfo.attributes.phone_number);
        
      };
      
  
      useEffect(() => {
          fetchUser();
        }, []);

        const fetchLoanees = async () => {
          setLoading(true);
          const userInfo = await Auth.currentAuthenticatedUser();
            
    
           
          try {
            const Lonees:any = await API.graphql(graphqlOperation(listGrpMembersContributions, 
              {
                    filter:{
                    memberId: {eq:route.params.ChamaNMember}
                    
                    }}
              
                ));

                
                setLoanees(Lonees.data.listGrpMembersContributions.items);

                

            
                      
                      
                    
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
        renderItem={({item}) => <ChmMbrContr ChamaContriDtls={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Member Contributions</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;