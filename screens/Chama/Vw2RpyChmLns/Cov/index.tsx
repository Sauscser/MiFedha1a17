import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/Chama/RepayChmLn/RepyChmCovLn";
import styles from './styles';
import { getSMAccount, listCvrdGroupLoans } from '../../../../src/graphql/queries';

const FetchSMCovLns = props => {

    
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);

    const fetchUsrDtls = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      try {
              const MFNDtls: any = await API.graphql(
                  graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}
              ),);

              const balances = MFNDtls.data.getSMAccount.balance;
              const owner = MFNDtls.data.getSMAccount.owner;

        const fetchLoanees = async () => {
            setLoading(true);
            
              
       
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listCvrdGroupLoans, 
                { filter: {
                    and: {
                      loaneePhn: { eq: userInfo.attributes.email},
                      lonBala:{gt:0}
                      
                    }
                  }}
                  ));
              setLoanees(Lonees.data.listCvrdGroupLoans.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
        
          if (userInfo.attributes.sub !== owner)
          {Alert.alert ("Please first create main account")}
          else{
                                 await fetchLoanees();}
} catch (e) {
 console.log(e);
} finally {
 setLoading(false);
}
};

useEffect(() => {
fetchUsrDtls();
}, [])  


  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts ChamaMmbrshpDtls={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> My Chama Covered Loans</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;