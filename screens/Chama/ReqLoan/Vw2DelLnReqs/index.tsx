import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import LnerStts from "../../../../components/Chama/LnReq/Vw2DelLnReq";
import styles from './styles';
import { getSMAccount, listReqLoanChamas, listReqLoans } from '../../../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const [ChmPhn, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [UsrEmail, setUsrEmail] = useState(null);
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [Sign2Phn, setSign2Phn] = useState('');
  const [itemPrys, setitemPrys] = useState('0');
  const [itemTwn, setitemTwn] = useState('0');
  const [lnPrsntg, setlnPrsntg] = useState('0');
  const [rpymntPrd, setrpymntPrd] = useState('0');
  const gtBizna = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const compDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const owner = compDtls.data.getSMAccount.owner;
      const fetchLoanees = async () => {
        setLoading(true);
        try {
          const Lonees: any = await client.graphql({
            query: listReqLoanChamas,
            variables: {
              filter: {
                loaneeEmail: {
                  eq: attributes.email
                }
              }
            }
          });
          setLoanees(Lonees.data.listReqLoanChamas.items);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      if (user.userId !== owner) {
        Alert.alert("Please first create main account");
        return;
      } else {
        await fetchLoanees();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    gtBizna();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={gtBizna} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}> Swipe to View My Loan Requests</Text>
            <Text style={styles.label2}> (Select to Delete)</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;