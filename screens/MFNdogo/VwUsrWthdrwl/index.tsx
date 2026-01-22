import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import NonLnRec from "../../../components/MFNdogo/VwUsrWthdrwls";

import { getAgent, VwMFNFltAdds } from '../../../src/graphql/queries';

const FetchSMNonLnsSnt = () => {
  const [loading, setLoading] = useState(false);
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]);
  const [bizPhone, setBizPhone] = useState('');
  const [MFNPW, setMFNPW] = useState('');
  const [buyerFilter, setBuyerFilter] = useState('');

const fetchLoanees = async () => {
  if (loading) return;

  if (!bizPhone || !MFNPW) {
    Alert.alert("Missing Fields", "Please enter your Number and password.");
    return;
  }

  setLoading(true);
  try {
    const personnelCheck: any = await API.graphql(
      graphqlOperation(getAgent, { phonecontact: bizPhone })
    );

    const agentData = personnelCheck.data.getAgent;

    if (!agentData) {
      Alert.alert("There is no such an agent");
      return;
    }

    if (agentData.pw !== MFNPW) {
      Alert.alert("Access Denied", "Wrong Agent Password.");
      return;
    }

    const result: any = await API.graphql(
      graphqlOperation(VwMFNFltAdds, {
        agentPhonecontact: bizPhone,
        sortDirection: "DESC",
        limit: 100,
      })
    );

    const items = result.data.VwMFNFltAdds.items || [];

    setAllRecords(items);
    setFilteredRecords(items);

    if (items.length < 1) {
      Alert.alert("No Withdrawals");
    }

  } catch (e) {
    console.log("Error fetching loanees", e);
    Alert.alert("Error", "No such a MFNdogo.");
  } finally {
    setBizPhone('');
    setMFNPW('');
    setLoading(false);
  }
};


  useEffect(() => {
    if (!buyerFilter) {
      setFilteredRecords(allRecords);
    } else {
      const filtered = allRecords.filter(item =>
        item?.userName?.toLowerCase().includes(buyerFilter.toLowerCase())
      );
      setFilteredRecords(filtered);
    }
  }, [buyerFilter, allRecords]);

  

  return (
    <View style={styles.container}>
      <View style={styles.inputBlock}>
        <TextInput
          placeholder="My Full Agent Number"
          value={bizPhone}
          onChangeText={setBizPhone}
          style={styles.input}
        />
      
      <TextInput
          placeholder="Full Agent Password"
          value={MFNPW}
          onChangeText={setMFNPW}
          style={styles.input}
        />

      <TextInput
        placeholder="Withdrawing entity Name. Even partially"
        value={buyerFilter}
        onChangeText={setBuyerFilter}
        style={styles.input}
      />

</View>
      
        <FlatList
          data={filteredRecords}
          renderItem={({ item }) => <NonLnRec SMAc={item} />}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={fetchLoanees}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <>
              <Text style={styles.label2}>(Please swipe down to reload)</Text>
              <Text style={styles.label}> Withdrawals</Text>
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

