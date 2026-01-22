import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/Ads/VwLn2Dlt";
import styles from './styles';

import { useRoute } from '@react-navigation/native';
import { getSMAccount, listRafikiLnAds, listSokoAds } from '../../../../../src/graphql/queries';

const FetchSMCovLns = props => {

    
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const route = useRoute();

    const gtUzr = async () =>{
      if(isLoading){
        return;
      }
      setIsLoading(true);
      const userInfo = await Auth.currentAuthenticatedUser();
      try{
        const compDtls :any= await API.graphql(
          graphqlOperation(getSMAccount,{awsemail:userInfo.attributes.email})
          );
          
          const owner = compDtls.data.getSMAccount.owner;

          const fetchLoanees = async () => {
            setLoading(true);
            
              
            
            try {

              let  filter = {
                rafikiEmail: { eq: userInfo.attributes.email},               
                
              };
              const Lonees:any = await API.graphql(graphqlOperation(listRafikiLnAds, 
                
                {
                  filter,
                  sortDirection: 'DESC',
                  limit: 100
                    }
                 
                  ));
              setLoanees(Lonees.data.listRafikiLnAds.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };

          if (owner !== userInfo.attributes.sub) 
          {Alert.alert ("Please first create main Account")}

          else
          {

          await fetchLoanees();
        }

        } catch (e) {
          
        }
        setIsLoading(false);}

        
        
          useEffect(() => {
            gtUzr();
          }, [])

  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={gtUzr}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> My PalLoan Ads</Text>
            <Text style={styles.label}> (Swipe down to refresh)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;