import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TextInput, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth, SortDirection } from 'aws-amplify';
import NonLnSent from '../../../../../components/MyAc/ViewSentNonLns';
import { listNonLoans, listPersonels, VwMySntMny } from '../../../../../src/graphql/queries';

const FetchSMNonLnsSnt = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [bizPhone, setBizPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRecords = async () => {
    if (loading || !bizPhone) return;

    setLoading(true);
    try {
      const user = await Auth.currentAuthenticatedUser();

      const personnelRes: any = await API.graphql(
        graphqlOperation(listPersonels, {
          filter: {
            phoneKontact: { eq: user.attributes.email },
            BusinessRegNo: { eq: bizPhone },
          },
        })
      );

      if (!personnelRes?.data?.listPersonels?.items?.length) {
        Alert.alert('Access Denied', "Retry if you're sure you work here.");
        return;
      }

      const recordsRes: any = await API.graphql(
        graphqlOperation(VwMySntMny, {

          senderPhn: bizPhone ,
          sortDirection:"DESC",
          limit: 100,
          filter: {
            status: { eq: "cashSales" },
            
          },
          
        })
      );

      const items = recordsRes?.data?.VwMySntMny?.items || [];

      if (!items.length) {
        Alert.alert('No Records', 'Sorry, no money sent from business yet.');
      }

      setRecords(items);
    } catch (e) {
      console.log('Error fetching records:', e);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      item.RecName?.toLowerCase().includes(q) 
      
    );
  });

  
  return (
    <View style={styles.container}>
      <View style={styles.inputBlock}>
        <TextInput
          placeholder="Enter Business Phone"
          value={bizPhone}
          onChangeText={setBizPhone}
          style={styles.input}
        />
        <TextInput
          placeholder="Search Seller by Name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
      </View>

      <FlatList
        data={filteredRecords}
        renderItem={({ item }) => <NonLnSent SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchRecords}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.label2}>(Please swipe down to load)</Text>
            <Text style={styles.label}>Business Purchases</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonLnsSnt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  inputBlock: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginVertical: 10,
  },
  label2: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
});
