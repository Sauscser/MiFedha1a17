import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import LnerStts from "../../../../../components/Ads/VwLn2Dlt";
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import { getSMAccount, listRafikiLnAds } from '../../../../../src/graphql/queries';
const client = generateClient();
const FetchSMCovLns = () => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const gtUzr = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const compDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const owner = compDtls.data.getSMAccount.owner;
      const fetchLoanees = async () => {
        setLoading(true);
        try {
          const filter = {
            rafikiEmail: {
              eq: attributes.email
            }
          };
          const Lonees: any = await client.graphql({
            query: listRafikiLnAds,
            variables: {
              filter,
              sortDirection: 'DESC',
              limit: 100
            }
          });
          setLoanees(Lonees.data.listRafikiLnAds.items);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      if (owner !== userInfo.userId) {
        Alert.alert("Please first create main Account");
      } else {
        await fetchLoanees();
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    gtUzr();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={gtUzr} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}>My PalLoan Ads</Text>
            <Text style={styles.label}>(Swipe down to refresh)</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;