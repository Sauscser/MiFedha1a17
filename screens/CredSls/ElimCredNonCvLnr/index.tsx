import React, { useEffect, useState } from 'react';
import { createSMAccount, updateCompany } from '../../../src/graphql/mutations';
import { getCompany, listSMAccounts } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const CreateAcForm = props => {
  const navigation = useNavigation();
  const [nationalId, setNationalid] = useState('');
  const [phoneContact, setPhoneContact] = useState<string | null>(null);
  const [awsEmail, setAWSEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ownr, setownr] = useState<string | null>(null);
  const moveToWelcomPg = () => {
    navigation.navigate("CredByrLnerss");
  };
  const fetchUser = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const me = userInfo.userId;
      setPhoneContact(attributes.phone_number || null);
      setAWSEmail(attributes.email || null);
      const UsrDtls: any = await client.graphql({
        query: listSMAccounts,
        variables: {
          filter: {
            owner: {
              eq: me
            }
          }
        }
      });
      if (UsrDtls.data.listSMAccounts.items.length < 1) {
        Alert.alert("Please create Main Account");
      } else {
        moveToWelcomPg();
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Please first sign up");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    const natid = nationalId;
    if (!natid && natid !== "") {
      setNationalid("");
      return;
    }
    setNationalid(natid);
  }, [nationalId]);
  useEffect(() => {
    const pws = pword;
    if (!pws && pws !== "") {
      setPW("");
      return;
    }
    setPW(pws);
  }, [pword]);
  return <View>
      {/* Add your UI elements here */}
    </View>;
};
export default CreateAcForm;