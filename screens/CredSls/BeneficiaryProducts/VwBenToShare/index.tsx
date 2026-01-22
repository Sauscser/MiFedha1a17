import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList
    , StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/CredSales/BenProd2/ViewBenToShare";

import { listBenProd2s, listLinkBeneficiary2s, listSMAccounts } from '../../../../src/graphql/queries';
import * as Clipboard from 'expo-clipboard';  

const FetchSMNonCovLns = props => {
    const [Loanees, setLoanees] = useState([]);  // Stores fetched accounts
    const [filteredLoanees, setFilteredLoanees] = useState([]); // Stores filtered results
    const [loading, setLoading] = useState(false);
    const [awsEmail, setAWSEmail] = useState("");
    const [awsEmail2, setAWSEmail2] = useState("");

    
    const fetchLoanees = async () => {
        setLoading(true);
        try {
            const userInfo = await Auth.currentAuthenticatedUser();
            const Lonees = await API.graphql(
                graphqlOperation(listLinkBeneficiary2s, {
                    filter: { benefitStatus: { eq: "Active" } ,
                    creatorName: { contains: awsEmail },
                    beneficiaryPhone: { contains: awsEmail2 }
                }
                })
            );
            setLoanees(Lonees.data.listLinkBeneficiary2s.items);
        } catch (e) {
            console.error("Error fetching accounts:", e);
        } finally {
            setAWSEmail("")
            setAWSEmail2("")
            setLoading(false);
        }
    };

    /* Dynamic Filtering based on input
    const handleSearch = (text) => {
        setAWSEmail(text);
        const filtered = Loanees.filter(loanee =>
            loanee.creatorName.includes(text)
        );
        setFilteredLoanees(filtered);
    };

    */

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Benefactor Business Name..."
              value={awsEmail}
              onChangeText={setAWSEmail}
              autoCapitalize="none"
              style={styles.searchInput}
            />
  
            <TextInput
              placeholder="Beneficiary Name...even partially"
              value={awsEmail2}
              onChangeText={setAWSEmail2}
              autoCapitalize="none"
              style={styles.searchInput}
            />
          </View>
  
          <FlatList
            style={{ flex: 1 }}
            data={Loanees}
            renderItem={({ item }) => <LnerStts SMAc={item} />}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={fetchLoanees}
            refreshing={loading}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <Text style={styles.placeholderText}>
                Swipe down to load or refresh.
              </Text>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 10,
    },
    searchBar: {
      marginBottom: 10,
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#fff',
      marginBottom: 8,
    },
    placeholderText: {
      textAlign: 'center',
      color: '#aaa',
      marginVertical: 20,
    },
  });

export default FetchSMNonCovLns;
