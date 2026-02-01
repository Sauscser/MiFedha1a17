import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import LnerStts from "../../../components/Chama/ViewSyncGrpBenefits";
import * as Clipboard from 'expo-clipboard';
import { useRoute } from '@react-navigation/native';
import { listChamaDepositSyncs, listGroups } from '../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [Loanees, setLoanees] = useState([]);
  const [UsrDtls, setUsrDtls] = useState([]); // Stores fetched accounts
  const [filteredLoanees, setFilteredLoanees] = useState([]); // Stores filtered results
  const [loading, setLoading] = useState(false);
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const fetchLoanees = async () => {
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const Lonees = await client.graphql({
        query: listChamaDepositSyncs,
        variables: {
          filter: {
            status: {
              eq: "AccountActive"
            },
            BankAdminEmail: {
              eq: attributes.email
            },
            transactionType: {
              eq: "MemberDividendSync"
            }
          }
        }
      });
      const Applications = Lonees.data.listChamaDepositSyncs.items;
      setLoanees(Applications);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchLoanees();
  }, []);

  // Dynamic Filtering based on input

  return <KeyboardAvoidingView style={{
    flex: 1
  }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                {/* Search Bar */}
                
                {/* Results */}
                
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