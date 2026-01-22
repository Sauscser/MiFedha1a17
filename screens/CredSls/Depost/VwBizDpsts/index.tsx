import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import NonLnRec from "../../../../components/MyAc/VwDeposits";

import { getBizna, VwMyUsrDposits } from '../../../../src/graphql/queries';

const FetchSMNonLnsSnt = () => {
  const [loading, setLoading] = useState(false);
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]);
  const [bizPhone, setBizPhone] = useState('');
  const [buyerFilter, setBuyerFilter] = useState('');

  const fetchLoanees = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const personnelCheck: any = await API.graphql(graphqlOperation(getBizna, {BusKntct: bizPhone}),
            );

            const agentData = personnelCheck.data.getBizna;

            if (!agentData)
            {
              Alert.alert("No such business exists")
            }
         
      if (agentData.owner !== userInfo.attributes.sub) {
        Alert.alert("Access Denied", "You dont own this business.");
        return;
      }

      const result: any = await API.graphql(graphqlOperation(VwMyUsrDposits, {
        depositerid: bizPhone,
        sortDirection: "DESC",
        limit:100,
        
      }));

      const items = result.data.VwMyUsrDposits.items || [];
     if (items.length<1)
      {
        Alert.alert("No deposits made")
      } setAllRecords(items);
      setFilteredRecords(items);

    } catch (e) {
      console.log(e);
    } finally {
      setBizPhone('')
      
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!buyerFilter) {
      setFilteredRecords(allRecords);
    } else {
      const filtered = allRecords.filter(item =>
        item?.agentName?.toLowerCase().includes(buyerFilter.toLowerCase())
      );
      setFilteredRecords(filtered);
    }
  }, [buyerFilter, allRecords]);

  return (
    <View style={styles.container}>
      <View style={styles.inputBlock}>
        <TextInput
          placeholder="My Full Business Number"
          value={bizPhone}
          onChangeText={setBizPhone}
          style={styles.input}
        />
      

      <TextInput
        placeholder="MFNdogo's Name. Even partially"
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
              <Text style={styles.label}>Business Deposits</Text>
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

