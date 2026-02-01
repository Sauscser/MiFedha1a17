import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, TouchableOpacity } from 'react-native';
import LnerStts from "../../../../components/CredSales/BenProd2/ViewBenContributionsPal";
import { listBenefitContributions2s, listBenefitShare2s, listBenProd2s, listLinkBeneficiary2s, listSMAccounts } from '../../../../src/graphql/queries';
import * as Clipboard from 'expo-clipboard';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [Loanees, setLoanees] = useState([]); // Stores fetched accounts
  const [filteredLoanees, setFilteredLoanees] = useState([]); // Stores filtered results
  const [loading, setLoading] = useState(false);
  const [awsEmail, setAWSEmail] = useState("");
  const route = useRoute();
  const {
    benefactorAc,
    benefactorPhone,
    creatorName
  } = route.params;
  useEffect(() => {
    fetchLoanees();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
      const Lonees = await client.graphql({
        query: listBenefitShare2s,
        variables: {
          filter: {
            benefactorAc: {
              eq: route.params.benefactorAc
            },
            creatorEmail: {
              eq: attributes.email
            },
            benefactorAc: {
              eq: route.params.benefactorAc
            }
          }
        }
      });
      const Prods = Lonees.data.listBenefitShare2s.items;
      setLoanees(Prods);
      console.log(Prods);
    } catch (e) {
      console.error("Error fetching accounts:", e);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Filtering based on input

  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            
            <Text style={styles.label}> My Contributions</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;