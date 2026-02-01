import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Alert } from 'react-native';
import LnerStts from "../../../components/MyAc/ViewMessages";
import styles from './styles';
import { fetchMessages, getSMAccount, listMessages, listSMAccounts, Messages } from '../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [LneePhn, setLneePhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const fetchUsrDtls = async () => {
    try {
      const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
      setLoading(true);
      console.log("Email:", attributes.email);
      const Lonees = await client.graphql({
        query: fetchMessages,
        variables: {
          senderEmail: attributes.email,
          sortDirection: "DESC",
          limit: 100
        }
      });
      const Acc = Lonees.data.fetchMessages.items;
      setLoanees(Acc);
      if (Acc.length < 1) {
        Alert.alert("No messages found");
      }
    } catch (e) {
      console.log(e);
      return;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsrDtls();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            
            <Text style={styles.label}> My Messages</Text>
            <Text style={styles.label2}> 
              (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;