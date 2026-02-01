import React, { useEffect, useState } from 'react';
import { listChamaMembers } from '../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const ChmSignIn = props => {
  const navigation = useNavigation();
  const [grpContact, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContacts, setPhoneContacts] = useState("");
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState('');
  const ChmNMmbrPhns = grpContact + memberPhn;
  const FetchGrpLonsSts = () => {
    navigation.navigate("VwChmDpstss", {
      grpContact
    });
  };
  const gtChmDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const compDtls: any = await client.graphql({
        query: listChamaMembers,
        variables: {
          filter: {
            groupContact: {
              eq: grpContact
            },
            memberContact: {
              eq: attributes.email
            }
          }
        }
      });
      if (compDtls.data.listChamaMembers.items.length < 1) {
        Alert.alert("You dont belong to this Chama");
        return;
      } else {
        FetchGrpLonsSts();
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error! Access denied!");
      return;
    } finally {
      setIsLoading(false);
      setChmPhn('');
      setPW('');
      setPhoneContacts("");
      setChmDesc("");
      setChmNm("");
      setmemberPhn("");
    }
  };
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Chama Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="+2547xxxxxxxx" value={grpContact} onChangeText={setChmPhn} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama Phone Number</Text>
          </View>

          <TouchableOpacity onPress={gtChmDtls} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>Click to View</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default ChmSignIn;