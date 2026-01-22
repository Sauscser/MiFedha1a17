import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../components/Chama/VwChama2Reg";

import { listBenefitContributions2s, listBenefitShare2s, listBenProd2s, listBiznas, listLinkBeneficiary2s, listSMAccounts } from '../../../../src/graphql/queries';
import * as Clipboard from 'expo-clipboard'; 
import { useRoute } from '@react-navigation/native'; 
import { listChamaApplies, listChamaApply2s } from '../../../src/graphql/queries';


const FetchSMNonCovLns = props => {
    const [Loanees, setLoanees] = useState([]);
    const [UsrDtls, setUsrDtls] = useState([]);  // Stores fetched accounts
    const [filteredLoanees, setFilteredLoanees] = useState([]); // Stores filtered results
    const [loading, setLoading] = useState(false);
    const [awsEmail, setAWSEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
     const route = useRoute();
     


    const fetchLoanees = async () => {
        setIsLoading(true)
        const userInfo = await Auth.currentAuthenticatedUser();
        try {
            
            const Lonees = await API.graphql(
                graphqlOperation(listChamaApply2s, {
                    filter: 
                    { status: { eq: "AccountActive" },
                    ChamaAdminEmail: {eq: userInfo.attributes.email},
                    
                     }
                })
            );

            const Applications = Lonees.data.listChamaApply2s.items
            setLoanees(Applications);

            
        } catch (e) {
            console.log(e);
        } 

        setIsLoading(false)
    };

   useEffect(() => {
           fetchLoanees();
       }, []);
    
    // Dynamic Filtering based on input
    
    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                {/* Search Bar */}
                
                {/* Results */}
                
                    <FlatList
                        style={{ flex: 1 }}
                        data={Loanees}
                        renderItem={({ item }) => (
                            <View>
                                <LnerStts SMAc={item} />
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        onRefresh={fetchLoanees}
                        refreshing={loading}
                        keyboardShouldPersistTaps="handled"
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