import React, { useEffect, useState } from 'react';
import { createSMAccount, updateCompany } from '../../../src/graphql/mutations';
import { getCompany, listSMAccounts } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Alert } from 'react-native';
import styles from './styles';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const CreateAcForm = props => {
  const navigation = useNavigation();
  const [nationalId, setNationalid] = useState('');
  const [phoneContact, setPhoneContact] = useState<string | null>(null);
  const [awsEmail, setAWSEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [id, setID] = useState('');
  const [ownr, setownr] = useState<string | null>(null);
  const moveToWelcomPg = () => {
    navigation.navigate("ChamaMmbrRemts", {
      id
    });
  };
  const fetchUser = async () => {
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    const me = user.userId; // ✅ sub comes from getCurrentUser().userId
    setPhoneContact(attributes.phone_number || null);
    setAWSEmail(attributes.email || null);
    const ChckUsrExistence = async () => {
      try {
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
          return;
        } else {
          moveToWelcomPg();
        }
      } catch (e) {
        Alert.alert("Please first sign up");
        console.error(e);
      }
    };
    await ChckUsrExistence();
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
      {/* unchanged minimal JSX */}
    </View>;
};
export default CreateAcForm;