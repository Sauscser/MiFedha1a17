import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import LnerStts from "../../../../components/Ads/DetailedChmPrfl";
import styles from './styles';
import { useRoute } from '@react-navigation/core';
import { listGroups } from '../../../../src/graphql/queries';
const client = generateClient();
const FetchSMCovLns = props => {
  const [LneePhn, setLneePhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const route = useRoute();
  const fetchUser = async () => {
    try {
      const userInfo = await getCurrentUser();
      const attrs = await fetchUserAttributes();
      setLneePhn(attrs.email);
    } catch (e) {
      console.log("Error fetching user:", e);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const Lonees: any = await client.graphql({
        query: listGroups,
        variables: {
          filter: {
            and: {
              grpContact: {
                contains: route.params.grpContact
              }
            }
          }
        }
      });
      setLoanees(Lonees.data.listGroups.items);
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
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}> Chama Detailed Info</Text>
            <Text style={styles.label}> (Please swipe down to reload)</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;