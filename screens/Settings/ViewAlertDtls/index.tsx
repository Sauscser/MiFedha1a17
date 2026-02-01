import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList } from 'react-native';
import NonLnSent from "../../../components/ViewAlert";
import styles from './styles';
import { listCompanies } from '../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMNonLnsSnt = props => {
  const [SenderPhn, setSenderPhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Recvrs, setRecvrs] = useState([]);
  const fetchUser = async () => {
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    setSenderPhn(attributes.phone_number);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const Lonees: any = await client.graphql({
        query: listCompanies
      });
      setRecvrs(Lonees.data.listCompanies.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLoanees();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Recvrs} renderItem={({
      item
    }) => <NonLnSent SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            
            
          </>} />
    </View>;
};
export default FetchSMNonLnsSnt;