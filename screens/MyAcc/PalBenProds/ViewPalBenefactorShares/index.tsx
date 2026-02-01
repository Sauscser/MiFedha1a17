import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import LnerStts from "../../../../components/CredSales/BenProd2/ViewBizBenefactorSharesPal";
import { listBenefitContributions2s, listBenefitShare2s, listBenProd2s, listLinkBeneficiary2s, listSMAccounts } from '../../../../src/graphql/queries';
import * as Clipboard from 'expo-clipboard';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [Loanees, setLoanees] = useState([]);
  const [UsrDtls, setUsrDtls] = useState([]); // Stores fetched accounts
  const [filteredLoanees, setFilteredLoanees] = useState([]); // Stores filtered results
  const [loading, setLoading] = useState(false);
  const [awsEmail, setAWSEmail] = useState("");
  const [awsEmail2, setAWSEmail2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ChckPersonelExistence = async () => {
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const UsrDtls: any = await client.graphql({
        query: listBenefitShare2s,
        variables: {
          filter: {
            creatorEmail: {
              eq: attributes.email
            },
            creatorName: {
              contains: awsEmail
            },
            prodName: {
              contains: awsEmail2
            }
          }
        }
      });
      const benefitContributors = UsrDtls.data.listBenefitShare2s.items;
      setUsrDtls(benefitContributors);
      const fetchLoanees = async () => {
        try {
          const Lonees = await client.graphql({
            query: listLinkBeneficiary2s,
            variables: {
              filter: {
                creatorName: {
                  contains: awsEmail
                },
                prodName: {
                  contains: awsEmail2
                }
              }
            }
          });
          const contribution = Lonees.data.listLinkBeneficiary2s.items;
          setLoanees(contribution);
          if (contribution.length < 1) {
            Alert.alert("This Benefactor has not yet shared any benefits");
          }
        } catch (e) {
          console.error("Error fetching accounts:");
        }
      };
      if (benefitContributors.length < 1) {
        Alert.alert("You have not yet contributed to this Beneficiary");
      } else {
        await fetchLoanees();
      }
    } catch (e) {
      console.log(e);
      if (e) {
        Alert.alert("Error! Access denied");
        return;
      }
    }
    setIsLoading(false);
    setAWSEmail2("");
    setAWSEmail();
  };

  // Dynamic Filtering based on input

  return <KeyboardAvoidingView style={{
    flex: 1
  }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <TextInput placeholder="Beneficiary Creator name...even partial" value={awsEmail} onChangeText={setAWSEmail} style={styles.searchInput} />

        <TextInput placeholder="Product name...even partial" value={awsEmail2} onChangeText={setAWSEmail2} style={styles.searchInput} />
                </View>

                {/* Results */}
                
                    <FlatList style={{
        flex: 1
      }} data={Loanees} renderItem={({
        item
      }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={ChckPersonelExistence} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
        alignItems: 'center'
      }} ListHeaderComponent={() => <>
               
                    <Text style={styles.placeholderText}>
                        Swipe down to load or refresh.
                    </Text>
                    </>} />
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