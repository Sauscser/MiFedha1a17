import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listGroups } from '../../../../src/graphql/queries';
import { useRoute, useNavigation } from '@react-navigation/native';

const FetchSMNonCovLns = () => {
  const [loanees, setLoanees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

    const navigateTo = (screen, params) => () => navigation.navigate(screen, params);


  const fetchLoanees = async () => {
    setIsLoading(true);
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listGroups, {
          filter: {
            status: { eq: "AccountActive" },
            or: [
              { SignatoryEmail: { eq: userInfo.attributes.email } },
              { signatory2Email: { eq: userInfo.attributes.email } },
              { Signatory3Email: { eq: userInfo.attributes.email } },
            ],
          },
        })
      );

      console.log("GraphQL response:", response?.data?.listGroups?.items);

      setLoanees(response.data.listGroups.items);
    } catch (e) {
      console.log("Error fetching groups:", e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLoanees();
  }, []);

  const GroupCard = ({ item }) => (
    <Pressable style={styles.card} onPress={navigateTo('FloatLnReq', { grpContact: item?.grpContact })}>
      <View style={styles.cardHeader}>
        <Text style={styles.groupName}>{item?.grpName || "Unnamed Group"}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.label}>Account Number</Text>
        <Text style={styles.accountNumber}>{item?.grpContact || "N/A"}</Text>
      </View>
    </Pressable>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <FlatList
          data={loanees}
          renderItem={({ item }) => <GroupCard item={item} />}
          keyExtractor={item => item.grpContact}
          onRefresh={fetchLoanees}
          refreshing={isLoading}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,

    // Shadow (Android)
    elevation: 3,

    // Shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  cardHeader: {
    marginBottom: 10,
  },

  groupName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
  },

  cardBody: {
    borderTopWidth: 1,
    borderTopColor: '#eef2f6',
    paddingTop: 10,
  },

  label: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },

  accountNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563eb',
    letterSpacing: 0.5,
  },
});


export default FetchSMNonCovLns;