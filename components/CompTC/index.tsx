import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { signOut } from 'aws-amplify/auth';
import { useNavigation } from '@react-navigation/native';
import { listCompanies } from '../../src/graphql/queries';

const client = generateClient();

const FetchSMNonCovLns = () => {
  const [loading, setLoading] = useState(false);
  const [loanees, setLoanees] = useState<any[]>([]);
  const navigation = useNavigation();

  // Fetch all loanees (companies)
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const res: any = await client.graphql({
        query: listCompanies
      });
      setLoanees(res.data.listCompanies.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanees();
  }, []);

  // Navigation actions
  const acceptTerms = () => {
    navigation.navigate('CreateSMAc');
  };

  const declineTerms = async () => {
    await signOut();
  };

  // Render each loanee card
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {/* Scrollable terms window */}
      <View style={styles.termsWrapper}>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          <Text style={styles.termsText}>{item.termsNconditions}</Text>
        </ScrollView>
      </View>

      {/* Buttons below the scrollable window */}
      <View style={styles.buttonRow}>
        <Pressable onPress={acceptTerms} style={styles.acceptButton}>
          <Text style={styles.buttonText}>Accept</Text>
        </Pressable>

        <Pressable onPress={declineTerms} style={styles.declineButton}>
          <Text style={styles.buttonText}>Decline</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      <FlatList
        data={loanees}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={fetchLoanees}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Swipe down to load</Text>
            <Text style={styles.headerSubText}>
              (Read terms, then Accept or Decline)
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default FetchSMNonCovLns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerSubText: {
    fontSize: 14,
    color: '#666',
  },

  card: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },

  termsWrapper: {
    height: 250, // Scrollable window height
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    marginBottom: 15,
    overflow: 'hidden',
  },

  termsText: {
    fontSize: 16,
    color: '#333',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  declineButton: {
    flex: 1,
    backgroundColor: '#00BFFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 16,
  },
});
