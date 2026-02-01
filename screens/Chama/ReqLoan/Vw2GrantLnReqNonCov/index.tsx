import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import LnerStts from "../../../../components/Chama/LnReq/Vw2GrantLnReqNonCov";
import styles from './styles';
import { listReqLoanChamas, listReqLoans } from '../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [LneePhn, setLneePhn] = useState(null);
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
  const route = useRoute();
  const fetchUser = async () => {
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    setLneePhn(attributes.email);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const Lonees: any = await client.graphql({
        query: listReqLoanChamas,
        variables: {
          filter: {
            chamaPhone: {
              eq: route.params.grpContact
            },
            status: {
              eq: "AwaitingResponse"
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
    setChmPhn('');
    setPW('');
    setAWSEmail("");
    setChmDesc("");
    setChmNm("");
    setChmRegNo("");
    setMmbaID("");
    setSign2Phn("");
    setrpymntPrd("");
    setlnPrsntg("");
    setitemTwn("");
    setitemPrys("");
  };
  useEffect(() => {
    fetchLoanees();
  }, []);
  return <View style={styles.image}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}> Enter group phone and swipe</Text>
            <Text style={styles.label2}> (Select Loan Request to Grant)</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;