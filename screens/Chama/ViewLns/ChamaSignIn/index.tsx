import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { listGroups } from '../../../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const ChmSignIn = () => {
  const navigation = useNavigation();
  const [chamaGroups, setChamaGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch groups where user is admin/signatory
  const fetchAdminGroups = async () => {
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const userEmail = attributes.email;
      const userSub = user.userId;
      const groupsRes: any = await client.graphql({
        query: listGroups
      });
      const allGroups = groupsRes.data.listGroups.items;
      const userGroups = allGroups.filter((group: any) => {
        const admins = [group.owner, group.signitory2Sub, ...Array.from({
          length: 20
        }, (_, i) => group[`Admin${i + 1}`])];
        return admins.includes(userSub) || admins.includes(userEmail);
      });
      setChamaGroups(userGroups);
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to fetch groups. Check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAdminGroups();
  }, []);
  const openGroupLoans = (grpContact: string) => {
    navigation.navigate('ChmLnsSent', {
      grpContact
    });
  };
  return <View style={styles.container}>
      <Text style={styles.header}>Your Chamas</Text>
      <Text style={styles.subHeader}>
        Select the Chama you manage to view loans
      </Text>

      {isLoading && <ActivityIndicator size="large" color="#e29d58" />}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {chamaGroups.map((group: any) => <TouchableOpacity key={group.grpContact} style={styles.card} onPress={() => openGroupLoans(group.grpContact)}>
            <LinearGradient colors={['#e29d58', '#3b82f6']} start={{
          x: 0,
          y: 0
        }} end={{
          x: 1,
          y: 0
        }} style={styles.cardGradient}>
              <Text style={styles.cardTitle}>{group.grpName}</Text>
            </LinearGradient>
          </TouchableOpacity>)}

        {!isLoading && chamaGroups.length === 0 && <Text style={styles.noGroupsText}>
            You are not an admin or signatory in any Chama
          </Text>}
      </ScrollView>
    </View>;
};
export default ChmSignIn;

// ==================== Styles ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    padding: 20
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0a2540',
    marginBottom: 5
  },
  subHeader: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20
  },
  scrollContainer: {
    paddingBottom: 40
  },
  card: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  cardGradient: {
    padding: 20,
    borderRadius: 15
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#fff'
  },
  noGroupsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 14,
    color: '#888'
  }
});