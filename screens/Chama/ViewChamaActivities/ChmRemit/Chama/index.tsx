import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import ChamReminfo from "../../../../../components/Chama/ChmActivities/ChmRemit/VwChama";
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import { VwChamaMemberssss } from '../../../../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const FetchSMCovLns = props => {
  const [LnerPhn, setLnerPhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Chm, setChm] = useState([]);
  const route = useRoute();
  const fetchChm = async () => {
    setLoading(true);
    try {
      const Lonees: any = await client.graphql({
        query: VwChamaMemberssss,
        variables: {
          grpContact: route.params.groupContact,
          sortDirection: "DESC",
          limit: 100
        }
      });
      const nonLns = Lonees.data.VwChamaMemberssss.items;
      setChm(nonLns);
      if (nonLns.length < 1) {
        Alert.alert("No member remittances");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching remittances. Please retry.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchChm();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Chm} renderItem={({
      item
    }) => <ChamReminfo ChamaRemitDtls={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchChm} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}>Chama Remittance to Members</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;