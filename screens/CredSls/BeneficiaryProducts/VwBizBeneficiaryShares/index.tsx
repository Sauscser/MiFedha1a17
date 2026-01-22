import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/CredSales/BenProd2/ViewBizBeneficiaryShares";

import { listBenefitContributions2s, listBenefitShare2s, listBenProd2s, listBiznas, listLinkBeneficiary2s, listSMAccounts } from '../../../../src/graphql/queries';
import * as Clipboard from 'expo-clipboard';  


const FetchSMNonCovLns = props => {
    const [Loanees, setLoanees] = useState([]);
    const [UsrDtls, setUsrDtls] = useState([]);  // Stores fetched accounts
    const [filteredLoanees, setFilteredLoanees] = useState([]); // Stores filtered results
    const [loading, setLoading] = useState(false);
    const [awsEmail, setAWSEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
     


    const ChckPersonelExistence = async () => {
          
        setIsLoading(true)
        const userInfo = await Auth.currentAuthenticatedUser();
          try {
            const UsrDtls:any = await API.graphql(
              graphqlOperation(listBiznas,
                { filter: {
                    
                    BusKntct: { eq: awsEmail},
                    owner: { eq: userInfo.attributes.sub},
                                                   
                  }}
              )
            )

            const benefitContributors = UsrDtls.data.listBiznas.items;
            setUsrDtls(benefitContributors)

    const fetchLoanees = async () => {
        
        try {
            
            const Lonees = await API.graphql(
                graphqlOperation(listLinkBeneficiary2s, {
                    filter: 
                    { benefitStatus: { eq: "Active" },
                    beneficiaryAc: {eq: awsEmail}
                     }
                })
            );

            const contribution = Lonees.data.listLinkBeneficiary2s.items
            setLoanees(contribution);

            if (contribution.length < 1)
                {
                    Alert.alert("No one has contributed for you")
                }
                return;
            

        } catch (e) {
            console.error("Error fetching accounts:");
        } 
    };

    if (benefitContributors.length < 1)
    {
        Alert.alert("This is not your Business/Company")
    }

    else{
        await fetchLoanees();
    }

    }
    
              catch(e){
              console.log(e)
              if(e){
              Alert.alert("Error! Access denied")
              return;
              }
              }
                setIsLoading(false)
                setAWSEmail("")     
                };
    
    // Dynamic Filtering based on input
    
    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="Company/Biz Account Number..."
                        value={awsEmail}
                        onChangeText={setAWSEmail}
                        style={styles.searchInput}
                    />
                    <Text style={styles.placeholderText}>
                        Swipe down to load or refresh.
                    </Text>
                </View>

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
                        onRefresh={ChckPersonelExistence}
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