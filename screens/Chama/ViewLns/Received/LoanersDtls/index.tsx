import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCompany, getSMAccount, listCvrdGroupLoans } from '../../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../../src/graphql/mutations';
import LnerStts from "../../../../../components/Chama/Loans/Received/LoanersDtls";
import { useRoute } from '@react-navigation/native';
import styles from './styles';
const graphqlClient = generateClient();
const FetchSMCovLns = props => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const route = useRoute();
  const fetchLoanees = async () => {
    setLoading(true);
    try {
      const Lonees: any = await graphqlClient.graphql({
        query: listCvrdGroupLoans,
        variables: {
          filter: {
            lonBala: {
              gt: 0
            },
            loanID: {
              eq: route.params.loanID
            }
          }
        }
      });
      setLoanees(Lonees.data.listCvrdGroupLoans.items);
    } catch (e) {
      if (e) {
        Alert.alert("Chama does not exist; otherwise check internet connection");
        return;
      }
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
    }) => <LnerStts Loanee={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchLoanees} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
                        <Text style={styles.label}> My group Loans</Text>
                    </>} />
        </View>;
};
export default FetchSMCovLns;