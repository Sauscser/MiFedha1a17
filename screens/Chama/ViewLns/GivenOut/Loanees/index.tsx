import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import ChmNonCvLns from "../../../../../components/Chama/Loans/Givenout/Loanees";
import styles from './styles';
import {    getSMAccount,   listCvrdGroupLoans,    } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
import { updateCompany, updateGroup } from '../../../../../src/graphql/mutations';

const FetchSMNonCovLns = props => {

    const[LnerPhn, setLneePhn] = useState(null);
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
              const Lonees:any = await API.graphql(graphqlOperation(listCvrdGroupLoans, 
                { 
                  
                  filter: {
                    and: {
                      
                      lonBala:{gt:0},
                      grpContact:  {eq: route.params.grpContact}
                      
                    }
                  },
                }
              
              ));
          setLoanees(Lonees.data.listCvrdGroupLoans.items);


          const fetchUsrDtls = async () => {
            try {
                    const MFNDtls: any = await API.graphql(
                        graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}
                    ),);
      
                    const grpBals = MFNDtls.data.getSMAccount.grpBal;
                    
                   
                  }
      
                  catch (e)
                  {
                    if(e){
                      Alert.alert("Chama does not exist; otherwise check internet connection");
                      return;
                    }
                      console.log(e)
                     
                      
                  }    
      
                  
                   }

                   await fetchUsrDtls();
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
        renderItem={({item}) => <ChmNonCvLns Loaner={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Group Loanees</Text>
            <Text style={styles.label}> Swipe to reload</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonCovLns;