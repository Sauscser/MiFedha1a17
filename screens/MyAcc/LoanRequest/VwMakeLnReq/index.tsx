import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet,
    TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/MyAc/LoanReq/MakeLnReq";

import { listSMAccounts } from '../../../../src/graphql/queries';
import * as Clipboard from 'expo-clipboard';  

const FetchSMNonCovLns = props => {
    const [Loanees, setLoanees] = useState([]);  // Stores fetched accounts
    const [filteredLoanees, setFilteredLoanees] = useState([]); // Stores filtered results
    const [loading, setLoading] = useState(false);
    const [awsEmail, setAWSEmail] = useState("");

    useEffect(() => {
        fetchLoanees();
    }, []);

    const fetchLoanees = async () => {
        setLoading(true);
        try {
            const userInfo = await Auth.currentAuthenticatedUser();
            const Lonees = await API.graphql(
                graphqlOperation(listSMAccounts, {
                    filter: { acStatus: { eq: "AccountActive" } }
                })
            );
            setLoanees(Lonees.data.listSMAccounts.items);
        } catch (e) {
            console.error("Error fetching accounts:", e);
        } finally {
            setLoading(false);
        }
    };

    // Dynamic Filtering based on input
    const handleSearch = (text) => {
        setAWSEmail(text);
        const lowerText = text.toLowerCase();
        const filtered = Loanees.filter(loanee =>
            loanee.name.toLowerCase().includes(lowerText)
        );
        setFilteredLoanees(filtered);
    };

    // Function to copy email to clipboard
    const copyToClipboard = async (email) => {
        await Clipboard.setStringAsync(email);
        Alert.alert("Copied to Clipboard!", `Email: ${email}`);
    };

    return (
        <KeyboardAvoidingView
                          style={{ flex: 1 }} 
                          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                      >
                          <View style={styles.container}>
                              {/* Search Bar */}

            {/* Always Visible Search Bar */}
            <View style={styles.searchBar}>
                <TextInput
                    placeholder="Pal Name"
                    value={awsEmail}
                    onChangeText={handleSearch} 
                    style={styles.searchInput}
                    editable={true}
                />
            </View>

            {/* Conditional Rendering: FlatList only shows when typing */}
            {awsEmail.length > 0 ? (
                <FlatList
                    style={{ width: "100%" }}
                    data={filteredLoanees}
                    renderItem={({ item }) => (
                        <View>
                            <LnerStts SMAc={item} />
                            <TouchableOpacity
                                style={styles.copyButton}
                                onPress={() => copyToClipboard(item.awsemail)}>
                                <Text style={styles.copyButtonText}>Copy Email</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={loading}
                />
            ) : (
                <Text style={styles.placeholderText}>Start typing your pal name.</Text>
            )}
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
    },
    placeholderText: {
        textAlign: 'center',
        color: '#aaa',
        marginTop: 20,
    },
    copyButton: {
        marginTop: 10,
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    copyButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default FetchSMNonCovLns;
