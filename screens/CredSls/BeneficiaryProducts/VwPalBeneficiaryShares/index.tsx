import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import LnerStts from "../../../../components/CredSales/BenProd2/ViewPalBeneficiaryShares";
import { listLinkBeneficiary2s } from '../../../../src/graphql/queries';
import * as Clipboard from 'expo-clipboard';
import { useRoute } from '@react-navigation/native';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [Loanees, setLoanees] = useState([]);
  const [UsrDtls, setUsrDtls] = useState([]);
  const [filteredLoanees, setFilteredLoanees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const fetchLoanees = async () => {
    setIsLoading(true);
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
            beneficiaryAc: {
              eq: attributes.email
            }
          }
        }
      });
      const contribution = Lonees.data.listLinkBeneficiary2s.items;
      setLoanees(contribution);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchLoanees();
  }, []);
  return <KeyboardAvoidingView style={{
    flex: 1
  }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <FlatList style={{
        flex: 1
      }} data={Loanees} renderItem={({
        item
      }) => <View>
              <LnerStts SMAc={item} />
            </View>} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} keyboardShouldPersistTaps="handled" />
      </View>
    </KeyboardAvoidingView>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10
  },
  searchBar: {
    marginBottom: 10
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff'
  },
  placeholderText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20
  }
});
export default FetchSMNonCovLns;