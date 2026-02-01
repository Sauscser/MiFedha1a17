import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import LnerStts from "../../../../components/Ads/VwChmPrfl";
import styles from './styles';
import { listGroups, listSMAccounts } from '../../../../src/graphql/queries';
const client = generateClient();
const FetchSMNonCovLns = () => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState<any[]>([]);
  const [ChmPhn, setChmPhn] = useState('');
  const [nam, setName] = useState<string | null>(null);
  const [UsrEmail, setUsrEmail] = useState<string | null>(null);
  const [awsEmail, setAWSEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [Sign2Phn, setSign2Phn] = useState('');
  const [itemPrys, setitemPrys] = useState('a');
  const [itemTwn, setitemTwn] = useState('');
  const [lnPrsntg, setlnPrsntg] = useState('a');
  const [rpymntPrd, setrpymntPrd] = useState('');
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const Lonees: any = await client.graphql({
        query: listGroups,
        variables: {
          filter: {
            and: {
              oprtnArea: {
                contains: itemPrys
              },
              venture: {
                contains: lnPrsntg
              }
            }
          }
        }
      });
      setLoanees(Lonees.data.listGroups.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    setChmPhn('');
    setPW('');
    setAWSEmail('');
    setChmDesc('');
    setChmNm('');
    setChmRegNo('');
    setMmbaID('');
    setSign2Phn('');
    setrpymntPrd('');
    setlnPrsntg('');
    setitemTwn('');
    setitemPrys('');
  };
  useEffect(() => {
    fetchLoanees();
  }, []);
  return <View style={styles.image}>
      <View style={styles.root}>
        <FlatList style={{
        width: "100%"
      }} data={Loanees} renderItem={({
        item
      }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
        alignItems: 'center'
      }} ListHeaderComponent={() => <>
              <Text style={styles.label}>Available Chamas</Text>
              <Text style={styles.label2}>(Fill below and swipe here to filter)</Text>
            </>} />
      </View>

      <View style={styles.sendLoanView}>
        <TextInput placeholder="Enter Region" value={itemPrys} onChangeText={setitemPrys} style={styles.sendLoanInput} editable={true} />

        <TextInput placeholder="Enter Venture type" value={lnPrsntg} onChangeText={setlnPrsntg} style={styles.sendLoanInput} editable={true} />
      </View>
    </View>;
};
export default FetchSMNonCovLns;