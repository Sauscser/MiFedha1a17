import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Alert } from 'react-native';
import { getSMAccount, listBiznas, listPersonels } from '../../../../src/graphql/queries';
import LnerStts from "../../../../components/VwCredSales/Vw2CrdSlCov";
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMCovLns = props => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const fetchUsrDtls = async () => {
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const MFNDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const balances = MFNDtls.data.getSMAccount.balance;
      const owner = MFNDtls.data.getSMAccount.owner;
      const fetchLoanees = async () => {
        setLoading(true);
        const userInfo = await getCurrentUser();
        try {
          const Lonees: any = await client.graphql({
            query: listPersonels,
            variables: {
              filter: {
                and: {
                  phoneKontact: {
                    eq: attributes.email
                  }
                }
              }
            }
          });
          setLoanees(Lonees.data.listPersonels.items);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      if (userInfo.userId !== owner) {
        Alert.alert("Please first create main account");
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
    fetchUsrDtls();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts Loanee={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            
            <Text style={styles.label}> Select work place to sell</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;