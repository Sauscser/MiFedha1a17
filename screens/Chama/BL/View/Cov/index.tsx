import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import LnerStts from "../../../../../components/Chama/BL/BLChmCovLn";
import styles from './styles';
import { listCvrdGroupLoans } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
const client = generateClient();
const FetchSMCovLns = props => {
  const [LneePhn, setLneePhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const route = useRoute();
  const fetchUser = async () => {
    const userInfo = await getCurrentUser();
    const attrs = await fetchUserAttributes();
    setLneePhn(attrs.email);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const Lonees: any = await client.graphql({
        query: listCvrdGroupLoans,
        variables: {
          filter: {
            and: {
              lonBala: {
                gt: 0
              },
              grpContact: {
                eq: route.params.ChmNMmbrPhns
              }
            }
          }
        }
      });
      setLoanees(Lonees.data.listCvrdGroupLoans.items);
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
    }) => <LnerStts ChamaMmbrshpDtls={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}> Swipe down to refresh</Text>
            <Text style={styles.label}> Select to Blacklist</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;