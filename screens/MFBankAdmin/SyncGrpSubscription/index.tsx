import React, { useState, useEffect } from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Platform, 
    ActivityIndicator 
} from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../components/Chama/SyncGrpSubscription";
import { listGroups } from '../../../src/graphql/queries';

const FetchSMNonCovLns = () => {
    const [loanees, setLoanees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch loanees
    const fetchLoanees = async () => {
        if (isLoading) return; // Prevent multiple fetch calls

        setIsLoading(true);
        try {
            await Auth.currentAuthenticatedUser(); // Ensures user is authenticated

            const response = await API.graphql(
                graphqlOperation(listGroups, {
                    filter: {
                        status: { eq: "AccountActive" },
                        MemberSubscrptnSync: { gt: 0 },
                    }
                })
            );

            const fetchedLoanees = response.data.listGroups.items;

            // Update state only if data is different
            if (JSON.stringify(fetchedLoanees) !== JSON.stringify(loanees)) {
                setLoanees(fetchedLoanees);
            }
        } catch (error) {
            console.error("Error fetching loanees:", error);
        } 

        setIsLoading(false);
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchLoanees();
    }, []);

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                {isLoading && <ActivityIndicator size="large" color="#ff8c00" />}
                
                <FlatList
                    data={loanees}
                    renderItem={({ item }) => <LnerStts SMAc={item} onSyncComplete={fetchLoanees} />}
                    keyExtractor={(item, index) => index.toString()} // Ensure unique keys
                    onRefresh={fetchLoanees}
                    refreshing={isLoading}
                    keyboardShouldPersistTaps="handled"
                />
            </View>
        </KeyboardAvoidingView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
});

export default FetchSMNonCovLns;
