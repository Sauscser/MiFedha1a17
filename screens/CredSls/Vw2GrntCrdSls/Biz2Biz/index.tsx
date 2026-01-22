import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';
import { getSMAccount, listBiznas, listPersonels } from '../../../../src/graphql/queries';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/VwCredSales/Vw2CrdSlCov";
import styles from './styles';

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
            const userInfo = await Auth.currentAuthenticatedUser();
              
        
             
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listPersonels, 
                { filter: {
                    and: {
                      phoneKontact: { eq: userInfo.attributes.email},
                      
                    }
                  }}
                  ));
              setLoanees(Lonees.data.listPersonels.items);
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
        renderItem={({item}) => <LnerStts Loanee={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Select work place to sell</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;