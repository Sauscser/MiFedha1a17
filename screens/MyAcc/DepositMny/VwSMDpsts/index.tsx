import React, {useState, useEffect} from 'react';
import {View, Text,   FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import NonLnSent from "../../../../components/MyAc/VwDeposits";
import styles from './styles';

import {  getSMAccount, listFloatReductions, VwMyUsrDposits } from '../../../../src/graphql/queries';

const FetchSMNonLnsSnt = props => {

   
    const [loading, setLoading] = useState(false);
    const [Recvrs, setRecvrs] = useState([]);

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
              const Lonees:any = await API.graphql(graphqlOperation(VwMyUsrDposits, 
                { 
                   

                   depositerid: userInfo.attributes.email,
                      sortDirection: "DESC",
                     
                    }
               
                  ))

                   const lds = Lonees.data.VwMyUsrDposits.items
                                   if(lds.length<1)
                                                     {
                                                       Alert.alert("No money Deposited")
                                                     }
                  setRecvrs(lds);
                  console.log(Lonees)
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
        
          if (userInfo.attributes.sub!==owner) {
            Alert.alert("Please first create a main account")
            return;
          }  else {
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
        data={Recvrs}
        renderItem={({item}) => <NonLnSent SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> My Deposits</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonLnsSnt;