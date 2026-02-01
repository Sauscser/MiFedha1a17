import React, { useEffect, useState } from 'react';
import { listChamaMembers } from '../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const ChmSignIn = () => {
  const navigation = useNavigation();
  const [grpContact, setChmPhn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [memberPhn, setmemberPhn] = useState('');
  const ChmNMmbrPhns = grpContact + memberPhn;
  const FetchGrpLonsSts = () => {
    navigation.navigate("VwChmWthdrwlss", {
      grpContact
    });
  };
  const gtChmDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
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
      const items = compDtls.data.listChamaMembers.items;
      if (items.length < 1) {
        Alert.alert("You don't belong to this Chama");
      } else {
        FetchGrpLonsSts();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Group does not exist; otherwise check internet connection");
    } finally {
      setIsLoading(false);
      setChmPhn('');
      setPW('');
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