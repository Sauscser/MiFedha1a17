import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../components/MFBankAdmin/VwMFBAdmin";

import {  listMiFedhaBankAdmins } from '../../../src/graphql/queries';
import * as Clipboard from 'expo-clipboard';  
import { ScrollView } from 'react-native-gesture-handler';

const FetchSMNonCovLns = props => {
    const [Loanees, setLoanees] = useState([]);  // Stores fetched accounts
    const [filteredLoanees, setFilteredLoanees] = useState([]); // Stores filtered results
    const [loading, setLoading] = useState(false);
    const [awsEmail, setAWSEmail] = useState("");

    useEffect(() => {
        fetchLoanees();
    }, []);

    const fetchLoanees = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
        setLoading(true);
        try {
            const userInfo = await Auth.currentAuthenticatedUser();
            const Lonees = await API.graphql(
                graphqlOperation(listMiFedhaBankAdmins, {
                    filter: { 
                        status: { eq: "AccountActive" },
                        email: { eq: userInfo.attributes.email },
                        
                 }
                })
            );
            setLoanees(Lonees.data.listMiFedhaBankAdmins.items);
        } catch (e) {
            console.error("Error fetching accounts:", e);
        } finally {
            setLoading(false);
        }
    };

    // Dynamic Filtering based on input

    /*
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
                {/* Search Bar */}
               

                {/* Results */}

                <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
           
            <Text > (Please swipe down to load)</Text>
          </>
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
    },
    placeholderText: {
        textAlign: 'center',
        color: '#aaa',
        marginTop: 20,
    },
});

export default FetchSMNonCovLns;