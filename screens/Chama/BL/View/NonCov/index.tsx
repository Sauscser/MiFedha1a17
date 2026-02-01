import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import LnerStts from "../../../../../components/Chama/BL/BLChmNonCovLn";
import styles from './styles';
import { getCompany, getGroup, listNonCvrdGroupLoans, vwChamaMembersss, vwLnrNLnees } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
import { updateCompany, updateGroup } from '../../../../../src/graphql/mutations';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [LneePhn, setLneePhn] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState<any[]>([]);
  const route = useRoute();
  const fetchUser = async () => {
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    setLneePhn(attributes.phone_number);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const Lonees: any = await client.graphql({
        query: listNonCvrdGroupLoans,
        variables: {
          sortDirection: 'DESC',
          limit: 100,
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
      setLoanees(Lonees.data.listNonCvrdGroupLoans.items);
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
export default FetchSMNonCovLns;