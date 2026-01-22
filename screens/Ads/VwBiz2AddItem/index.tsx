import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';
import { getSMAccount, listBiznas, listPersonels } from '../../../src/graphql/queries';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../components/Ads/VwBiz2AddItem";
import styles from './styles';

const FetchSMCovLns = props => {

   
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);

    useEffect(() => {
  fetchUsrDtls();
}, []);

const fetchUsrDtls = async () => {
  if (loading) return;
  setLoading(true);

  try {
    const userInfo = await Auth.currentAuthenticatedUser();
    const { data } = await API.graphql(graphqlOperation(getSMAccount, {
      awsemail: userInfo.attributes.email
    })) as any;

    const account = data.getSMAccount;
    if (!account) {
      Alert.alert("Error", "SMAccount not found.");
      return;
    }

   

    await fetchLoanees(userInfo);

  } catch (e) {
    console.error(e);
    Alert.alert("Error", "Could not fetch user account data.");
  } finally {
    setLoading(false);
  }
};

const fetchLoanees = async (userInfo: any) => {
  try {
    const res: any = await API.graphql(graphqlOperation(listPersonels, {
      filter: {
        phoneKontact: { eq: userInfo.attributes.email }
      }
    }));

    const items = res.data.listPersonels.items;
    if (items.length === 0) {
      Alert.alert("No Businesses you work at.");
    } else {
      setLoanees(items);
    }
  } catch (e) {
    console.error(e);
    Alert.alert("Error", "Failed to fetch businesses.");
  }
};

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
            
            <Text style={styles.label}> Select Business to add item</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;