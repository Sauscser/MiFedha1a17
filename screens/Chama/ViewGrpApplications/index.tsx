import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import LnerStts from "../../../components/Chama/VwChama2Reg";
import { listChamaApply2s } from '../../../src/graphql/queries';
import * as Clipboard from 'expo-clipboard';
import { useRoute } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [Loanees, setLoanees] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const Lonees: any = await client.graphql({
        query: listChamaApply2s,
        variables: {
          filter: {
            status: {
              eq: "AccountActive"
            },
            ChamaAdminEmail: {
              eq: attributes.email
            }
          }
        }
      });
      const Applications = Lonees.data.listChamaApply2s.items;
      setLoanees(Applications);
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching Chama applications. Please retry.");
    } finally {
      setLoading(false);
    }
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