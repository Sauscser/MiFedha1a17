import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../components/Transport/VwGrp2Commit";
import styles from './styles';
import { getCompany, getSMAccount, listChamaMembers,  } from '../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../src/graphql/mutations';

const FetchSMCovLns = props => {

    
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);

    
   
              
              const fetchLoanees = async () => {
            setLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();
              
   
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listChamaMembers, 
                {
                    filter:{  memberContact: {eq:userInfo.attributes.email},
                  transportApproved: {eq:"ChamaTransportApprovedYes"}},
                    
                    }
                 
                  ));
                  const chamas = Lonees.data.listChamaMembers.items;
              if (chamas.length === 0) 
                {
                  Alert.alert("You have not been approved by any group for transport.");
                }
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
            
            <Text style={styles.label}> Select Chama to Commit</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;