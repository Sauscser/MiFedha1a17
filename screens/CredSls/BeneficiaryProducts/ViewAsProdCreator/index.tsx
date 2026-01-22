import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, Alert,
  StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as Clipboard from 'expo-clipboard';
import LnerStts from '../../../../components/CredSales/BenProd2/ViewAsProdCreator';
import {
  listLinkBeneficiary2s,
  listPersonels
} from '../../../../src/graphql/queries';

const FetchSMNonCovLns = () => {
  const [Loanees, setLoanees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [awsEmail, setAWSEmail] = useState('');
  const [awsEmail2, setAWSEmail2] = useState('');

  const normalize = (value: string) => value.trim().toLowerCase();

  const fetchData = async () => {
    if (!awsEmail || !awsEmail2) {
      Alert.alert('Please enter both account number and beneficiary phone');
      return;
    }

    setLoading(true);

    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const email = userInfo.attributes.email;

      const normalizedAWS = normalize(awsEmail);
      const normalizedAWS2 = normalize(awsEmail2);

      const personnelResult: any = await API.graphql(
        graphqlOperation(listPersonels, {
          filter: {
            BusinessRegNo: { eq: normalizedAWS },
            email: { contains: email },
          },
        })
      );

      const personnel = personnelResult.data.listPersonels.items;

      if (personnel.length < 1) {
        Alert.alert('You do not work here');
        setLoading(false);
        return;
      }

      const beneficiariesResult: any = await API.graphql(
        graphqlOperation(listLinkBeneficiary2s, {
          filter: {
            benefactorPhone: { eq: normalizedAWS },
            beneficiaryPhone: { eq: normalizedAWS2 },
          },
        })
      );

      const benefits = beneficiariesResult.data.listLinkBeneficiary2s.items;

      if (benefits.length < 1) {
        Alert.alert('No Benefits');
        setLoanees([]);
      } else {
        setLoanees(benefits);
      }
    } catch (error) {
      console.log('Fetch error:', error);
      Alert.alert('Error! Access denied');
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="My Business account number..."
            value={awsEmail}
            onChangeText={setAWSEmail}
            autoCapitalize="none"
            style={styles.searchInput}
          />

          <TextInput
            placeholder="Beneficiary Name"
            value={awsEmail2}
            onChangeText={setAWSEmail2}
            autoCapitalize="none"
            style={styles.searchInput}
          />
        </View>

        <FlatList
          style={{ flex: 1 }}
          data={Loanees}
          renderItem={({ item }) => <LnerStts SMAc={item} />}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={fetchData}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <Text style={styles.placeholderText}>
              Swipe down to load or refresh.
            </Text>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  searchBar: {
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#aaa',
    marginVertical: 20,
  },
});

export default FetchSMNonCovLns;
