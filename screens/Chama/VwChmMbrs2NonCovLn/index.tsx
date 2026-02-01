import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import LnerStts from "../../../components/Chama/ChmActivities/ChmLnMbrNonCov";
import styles from './styles';
import { listChamaMembers } from '../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
const graphqlClient = generateClient();
const FetchSMCovLns = props => {
  const [LneePhn, setLneePhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const route = useRoute();
  const fetchUser = async () => {
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    const phone_number = attributes.phone_number;
    setLneePhn(phone_number);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const Lonees: any = await graphqlClient.graphql({
        query: listChamaMembers,
        variables: {
          filter: {
            and: {
              ChamaNMember: {
                eq: route.params.ChmNMmbrPhns
              }
            }
          }
        }
      });
      setLoanees(Lonees.data.listChamaMembers.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLoanees();
  }, []);
  return <View style={styles.root}>
            <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts ChamaMmbrshpDtls={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
                        <Text style={styles.label}> Chama Members</Text>
                    </>} />
        </View>;
};
export default FetchSMCovLns;