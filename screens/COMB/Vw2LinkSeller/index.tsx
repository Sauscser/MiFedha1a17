import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { byCOMBConsumer } from '../../../src/graphql/queries';

const FetchSMNonCovLns = () => {
  const [loading, setLoading] = useState(false);
  const [loanees, setLoanees] = useState([]);
  const navigation = useNavigation();

  const navigateTo = (screen, params = {}) => {
    navigation.navigate(screen, params);
  };


  const fetchUsrDtls = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      setLoading(true);

      const response = await API.graphql(
        graphqlOperation(byCOMBConsumer, {
          consumerEmail: userInfo.attributes.email,
          sortDirection: 'DESC',
          limit: 100,
          filter: {sellerAccount: {eq: "None"}}
        },
      )
      );

      const acc = response.data.byCOMBConsumer.items;
      setLoanees(acc);

      if (acc.length < 1) {
        Alert.alert('No COMB Contracts found');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsrDtls();
  }, []);

  const renderCard = ({ item }: { item: any }) => (
    <Pressable style={styles.card} onPress={() => navigateTo('LinkCOMBSeller', {id: item.id})}>
      <Text style={styles.cardTitle}>Funder Name: {item.funderEmail || 'Contract'}</Text>
      <Text style={styles.cardSubtitle}>Funder Contact {item.funderContact}</Text>
      <Text style={styles.cardTitle}>Funder Type: {item.funderType || 'Contract'}</Text>
      <Text style={styles.cardSubtitle}>Consumer Type: {item.consumerType}</Text>
       <Text style={styles.cardTitle}>Prepaid|Postpaid: {item.prepostPay || 'Contract'}</Text>
      <Text style={styles.cardSubtitle}>Consumption Margin: {item.consumptionCapping}</Text>
      
      <Text style={styles.cardDetail}>
        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.root}>
      <FlatList
        style={{ width: '100%' }}
        data={loanees}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ alignItems: 'center' }}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.label}>My COMB Contracts</Text>
            <Text style={styles.label2}>(Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  label2: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cardDetail: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
});

export default FetchSMNonCovLns;