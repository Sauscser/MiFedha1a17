import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import LnerStts from "../../../../components/CredSales/BenProd2/ViewBenDtls";
import { listLinkBeneficiary2s } from '../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [Loanees, setLoanees] = useState([]); // Stores fetched accounts
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  useEffect(() => {
    fetchLoanees();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const Lonees: any = await client.graphql({
        query: listLinkBeneficiary2s,
        variables: {
          filter: {
            benefitStatus: {
              eq: "Active"
            },
            beneficiaryID: {
              eq: route.params.beneficiaryID
            }
          }
        }
      });
      const Prods = Lonees.data.listLinkBeneficiary2s.items;
      setLoanees(Prods);
      console.log(Prods);
    } catch (e) {
      console.error("Error fetching accounts:", e);
    } finally {
      setLoading(false);
    }
  };
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}> Product Details</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;