import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList } from 'react-native';
import NonLnSent from "../../../components/MFNdogo/MFNCarousel";
import styles from './styles';
import { listAgents } from '../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMNonLnsSnt = props => {
  const [SenderPhn, setSenderPhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Recvrs, setRecvrs] = useState([]);
  const route = useRoute();
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
        query: listAgents,
        variables: {
          filter: {
            and: {
              phonecontact: {
                eq: route.params.phonecontact
              },
              status: {
                eq: "AccountActive"
              }
            }
          }
        }
      });
      setRecvrs(Lonees.data.listAgents.items);
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
    }) => <NonLnSent Agent={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            
            <Text style={styles.label}> MFNdogo Details</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMNonLnsSnt;