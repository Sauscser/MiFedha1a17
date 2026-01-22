import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import { getBizna, listPersonels, listSokoAds } from '../../../../../src/graphql/queries';
import { deleteSokoAd } from '../../../../../src/graphql/mutations';
import NonLnRec from "../../../../../components/Ads/VwLnItms2Dlt";

const FetchSMNonLnsSnt = () => {
  const [loading, setLoading] = useState(false);
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]);
  const [bizPhone, setBizPhone] = useState('');
  const [buyerFilter, setBuyerFilter] = useState('');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const fetchLoanees = async () => {
    if (loading || !bizPhone.trim()) return;
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

      const result: any = await API.graphql(graphqlOperation(listSokoAds, {
        filter: { sokokntct: { eq: bizPhone } },
        limit: 100,
      }));

      const items = result.data.listSokoAds.items || [];
      if (items.length < 1) Alert.alert("No Sales adverts made");
      setAllRecords(items);
      setFilteredRecords(items);
      setSelectedItems(new Set()); // Clear previous selections
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectItem = (id: string) => {
    const updated = new Set(selectedItems);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedItems(updated);
  };

  const handleMassDelete = async () => {
    if (selectedItems.size < 1) return;
    Alert.alert("Confirm", `Delete ${selectedItems.size} selected ads?`, [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            for (let id of selectedItems) {
              const ad = allRecords.find(item => item.id === id);
              if (ad?.itemPhoto) {
                await Storage.remove(ad.itemPhoto);
              }
              await API.graphql(graphqlOperation(deleteSokoAd, { input: { id } }));
            }
            Alert.alert("Success", "Selected ads deleted.");
            fetchLoanees(); // Refresh the list
          } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to delete some ads.");
          }
        }
      }
    ]);
  };

  useEffect(() => {
    if (!buyerFilter) {
      setFilteredRecords(allRecords);
    } else {
      const filtered = allRecords.filter(item =>
        item?.sokoname?.toLowerCase().includes(buyerFilter.toLowerCase())
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
          placeholder="Item Name. Even partially"
          value={buyerFilter}
          onChangeText={setBuyerFilter}
          style={styles.input}
        />
        <TouchableOpacity style={styles.fetchBtn} onPress={fetchLoanees}>
          <Text style={styles.fetchBtnText}>Fetch Items</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectMode(prev => !prev)} style={styles.selectModeBtn}>
          <Text style={styles.fetchBtnText}>{selectMode ? "Exit Select Mode" : "Enable Select Mode"}</Text>
        </TouchableOpacity>
        {selectMode && (
          <TouchableOpacity onPress={handleMassDelete} style={styles.deleteBtn}>
            <Text style={styles.fetchBtnText}>Delete Selected ({selectedItems.size})</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredRecords}
        renderItem={({ item }) => (
          <NonLnRec
            SMAc={item}
            selectMode={selectMode}
            isSelected={selectedItems.has(item.id)}
            toggleSelect={() => toggleSelectItem(item.id)}
            onDeleteComplete={fetchLoanees}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchLoanees}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.label2}>(Swipe down to reload)</Text>
            <Text style={styles.label}>Items (Click to Delete or Select)</Text>
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
  },
  fetchBtn: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteBtn: {
    backgroundColor: 'crimson',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectModeBtn: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  fetchBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
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
