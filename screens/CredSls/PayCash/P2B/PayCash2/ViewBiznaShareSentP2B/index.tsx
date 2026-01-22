import React, {useState, useEffect} from 'react';
import {View, Text,   FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth, SortDirection } from 'aws-amplify';
import NonLnRec from "../../../../../../components/MyAc/ViewSentNonLns";
import styles from './styles';
import { listNonLoans, VwMySntMny } from '../../../../../../src/graphql/queries';


const FetchSMNonLnsSnt = props => {

    
    const [loading, setLoading] = useState(false);
    const [Recvrs, setRecvrs] = useState([]);
    const [itemPrys, setitemPrys] = useState('');
    const[isLoading, setIsLoading] = useState(false);

      
                  
                  const fetchLoanees2 = async () => {
            
                    if(isLoading){
                      return;
                    }
                    setIsLoading(true);
                  
                    const userInfo = await Auth.currentAuthenticatedUser();
                        try {
                          const Lonees:any = await API.graphql(graphqlOperation(VwMySntMny, 

                          {

                            senderPhn:userInfo.attributes.email,
                            sortDirection:"DESC",
                            limit:100,
                            filter:{
                              
                              status:{eq:"cashSales"}                                       
                            
                            },
                           
                            
                                }
                           
                              ));
                              setRecvrs(Lonees.data.VwMySntMny.items);
                   
                        
                              
                         
            } catch (e) {
              console.log(e);
            } finally {
              setIsLoading(false);
              setitemPrys("")
            }
          };
        
          useEffect(() => {
            fetchLoanees2();
          }, [])

  return (

    <View style={styles.image}>
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Recvrs}
        renderItem={({item}) => <NonLnRec SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees2}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>            
            
            <Text style={styles.label2}> (Please swipe down to load)</Text>
            <Text style={styles.label}> Money Sent to business</Text>
          </>
        )}
      />
    </View>
    
    </View>
  );
};

export default FetchSMNonLnsSnt;