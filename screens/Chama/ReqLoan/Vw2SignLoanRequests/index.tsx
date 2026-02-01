import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSMAccount, listChamaMembers } from '../../../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMCovLns = () => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const navigation = useNavigation<any>();
  const fetchUsrDtls = async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const account: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const owner = account.data.getSMAccount.owner;
      if (user.userId !== owner) {
        Alert.alert('Please first create main account');
        return;
      }
      const res: any = await client.graphql({
        query: listChamaMembers,
        variables: {
          filter: {
            memberContact: {
              eq: attributes.email
            }
          }
        }
      });
      const items = res.data.listChamaMembers.items;
      if (items.length < 1) {
        Alert.alert('You do not belong to any group');
      }
      setMembers(items);
    } catch (e) {
      Alert.alert('Retry or update app or call customer care');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsrDtls();
  }, []);
  const renderMemberCard = ({
    item
  }: any) => <Pressable style={styles.card} onPress={() => navigation.navigate('MembersApproveLoans', {
    memberDetails: item
  })}>
      <Text style={styles.groupName}>{item.groupName}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Member Name:</Text>
        <Text style={styles.value}>{item.memberName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Group Account:</Text>
        <Text style={styles.value}>{item.groupContact}</Text>
      </View>
    </Pressable>;
  return <View style={styles.root}>
      <FlatList data={members} renderItem={renderMemberCard} keyExtractor={item => item.ChamaNMember} refreshing={loading} onRefresh={fetchUsrDtls} showsVerticalScrollIndicator={false} ListHeaderComponent={<Text style={styles.headerText}>
            Select Group to Approve Loan
          </Text>} />
    </View>;
};
export default FetchSMCovLns;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 16,
    paddingTop: 12
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  groupName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center'
  },
  label: {
    width: 120,
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280'
  },
  value: {
    fontSize: 14,
    color: '#111827',
    flexShrink: 1
  }
});