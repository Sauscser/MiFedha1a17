import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import LnerStts from "../../../../components/CredSales/BenProd2/ViewBenProds";
import { listBenProd2s } from '../../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [Loanees, setLoanees] = useState([]); // Stores fetched accounts
  const [filteredLoanees, setFilteredLoanees] = useState([]); // Stores filtered results
  const [loading, setLoading] = useState(false);
  const [awsEmail, setAWSEmail] = useState("");
  useEffect(() => {
    fetchLoanees();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const email = attributes.email;
      const Lonees: any = await client.graphql({
        query: listBenProd2s,
        variables: {
          filter: {
            prodStatus: {
              eq: "AccountActive"
            }
          }
        }
      });
      setLoanees(Lonees.data.listBenProd2s.items);
    } catch (e) {
      console.error("Error fetching accounts:", e);
      Alert.alert("Error! Access denied");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Filtering based on input
  const handleSearch = (text: string) => {
    setAWSEmail(text);
    const filtered = Loanees.filter(loanee => loanee.creatorName.includes(text));
    setFilteredLoanees(filtered);
  };
  return <KeyboardAvoidingView style={{
    flex: 1
  }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <TextInput placeholder="Search by creator name..." value={awsEmail} onChangeText={handleSearch} style={styles.searchInput} />
                </View>

                {/* Results */}
                {awsEmail.length > 0 ? <FlatList style={{
        flex: 1
      }} data={filteredLoanees} renderItem={({
        item
      }) => <View>
                                <LnerStts SMAc={item} />
                            </View>} keyExtractor={(item, index) => index.toString()} refreshing={loading} keyboardShouldPersistTaps="handled" /> : <Text style={styles.placeholderText}>
                        Start typing product creator name.
                    </Text>}
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