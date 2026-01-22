import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TextInput, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth, SortDirection } from 'aws-amplify';
import NonLnRec from '../../../../../components/MyAc/ViewRecNonLns';
import { listPersonels, listNonLoans, VwMyRecMny } from '../../../../../src/graphql/queries';

const FetchSMNonLnsSnt = () => {
  const [loading, setLoading] = useState(false);
  const [recvrs, setRecvrs] = useState<any[]>([]);
  const [bizPhone, setBizPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLoanees = async () => {
    if (loading || !bizPhone) return;
    setLoading(true);

    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const personnelRes: any = await API.graphql(graphqlOperation(listPersonels, {
        filter: {
          phoneKontact: { eq: userInfo.attributes.email },
          BusinessRegNo: { eq: bizPhone }
        }
      }));

      const personnels = personnelRes?.data?.listPersonels?.items || [];

      if (personnels.length < 1) {
        Alert.alert('Access Denied', "Sorry, you do not work here.");
        return;
      }

      const recordsRes: any = await API.graphql(graphqlOperation(VwMyRecMny, {
        recPhn: bizPhone ,
        sortDirection:"DESC",
        limit:100,
        filter: {
          status: { eq: 'BiznaShare' }
        }
      }));

      const items = recordsRes?.data?.VwMyRecMny?.items || [];

      if (!items.length) {
        Alert.alert('No Records', 'No money received yet from businesses.');
      }

      setRecvrs(items);
    } catch (e) {
      console.log('Error fetching loanees:', e);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecvrs = recvrs.filter(item => {
    const q = searchQuery.toLowerCase();
    return item.SenderName?.toLowerCase().includes(q);
  });

  useEffect(() => {
    if (bizPhone.length > 6) {
      fetchLoanees();
    }
  }, [bizPhone]);

  return (
    <View style={styles.container}>
      <View style={styles.inputBlock}>
        <TextInput
          placeholder="Enter My Business Phone"
          value={bizPhone}
          onChangeText={setBizPhone}
          style={styles.input}
        />
        <TextInput
          placeholder="Buyer Name even partial"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
      </View>

      <FlatList
        data={filteredRecvrs}
        renderItem={({ item }) => <NonLnRec SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.label2}>(Please swipe down to load)</Text>
            <Text style={styles.label}>Sales to Businesses</Text>
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
