import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import NonLnRec from "../../../../../components/VwCredSales/CrdStatus/Biz/Biz2PalLoanees";
import { listPersonels, VwMySales7 } from '../../../../../src/graphql/queries';

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

      const personnelCheck: any = await API.graphql(graphqlOperation(listPersonels, {
        filter: {
          phoneKontact: { eq: userInfo.attributes.email },
          BusinessRegNo: { eq: bizPhone },
        }
      }));

      if (personnelCheck.data.listPersonels.items.length < 1) {
        Alert.alert("Access Denied", "Retry if you're sure you work here.");
        return;
      }

      const result: any = await API.graphql(graphqlOperation(VwMySales7, {
        sellerContact: bizPhone,
        sortDirection: "DESC",
        limit:100,
        filter : {
          lnType:{eq:"Biz2Pal"},
          lonBala:{gt:0},
        }
      }));

      const items = result.data.VwMySales7.items || [];
      setAllRecords(items);
      setFilteredRecords(items);

    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!buyerFilter) {
      setFilteredRecords(allRecords);
    } else {
      const filtered = allRecords.filter(item =>
        item?.buyerName?.toLowerCase().includes(buyerFilter.toLowerCase())
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
        placeholder="Buyer's Name. Even partially"
        value={buyerFilter}
        onChangeText={setBuyerFilter}
        style={styles.input}
      />

</View>
      
        <FlatList
          data={filteredRecords}
          renderItem={({ item }) => <NonLnRec Loanee={item} />}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={fetchLoanees}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <>
              <Text style={styles.label2}>(Please swipe down to reload)</Text>
              <Text style={styles.label}>Business Credit Sales</Text>
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

