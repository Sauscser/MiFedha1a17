import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/Chama/ConfirmDividends/VwChama2Confirm";
import styles from './styles';
import { getCompany, getGroup,   listChamaMembers,    } from '../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
import { updateCompany, updateGroup } from '../../../../src/graphql/mutations';

const FetchSMCovLns = props => {

    const[LneePhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const route = useRoute();

    const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
              
        setLneePhn(userInfo.attributes.email);
             
      };
      
  
      useEffect(() => {
          fetchUser();
        }, []);

        const fetchLoanees = async () => {
            setLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listChamaMembers, 
               {
                    filter: {  memberContact: {eq:userInfo.attributes.email}},
                      
                    }
                 
                  ));

                  const fetchedGrps = Lonees.data.listChamaMembers.items
              setLoanees(fetchedGrps);

              if (fetchedGrps.length<1)
              {
                Alert.alert("You dont belong to any group")
              }
              
            } catch (e) {
              console.log(e);
            } 
            
            finally {
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
            
            <Text style={styles.label}> Groups</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;