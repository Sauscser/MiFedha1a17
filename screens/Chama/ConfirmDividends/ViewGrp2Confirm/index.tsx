import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import LnerStts from "../../../../components/Chama/ConfirmDividends/VwChama2Confirm";
import styles from './styles';
import { listChamaMembers } from '../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
const client = generateClient();
const FetchSMCovLns = props => {
  const [LneePhn, setLneePhn] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState<any[]>([]);
  const route = useRoute();
  const fetchUser = async () => {
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    setLneePhn(attributes.email);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const attributes = await fetchUserAttributes();
      const Lonees: any = await client.graphql({
        query: listChamaMembers,
        variables: {
          filter: {
            memberContact: {
              eq: attributes.email
            }
          }
        }
      });
      const fetchedGrps = Lonees.data.listChamaMembers.items;
      setLoanees(fetchedGrps);
      if (fetchedGrps.length < 1) {
        Alert.alert("You don't belong to any group");
      }
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
            <Text style={styles.label}> Groups</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;