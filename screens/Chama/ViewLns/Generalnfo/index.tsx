import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import ChamInfo from "../../../../components/Chama/GeneralInfo";
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import { getCompany, getSMAccount, listGroups } from '../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMCovLns = () => {
  const [loading, setLoading] = useState(false);
  const [Chm, setChm] = useState([]);
  const route = useRoute();
  const fetchUsrDtls = async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const MFNDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const balances = MFNDtls.data.getSMAccount.balance;
      const owner = MFNDtls.data.getSMAccount.owner;
      if (user.userId !== owner) {
        Alert.alert("Please first create main account");
        return;
      }
      const Lonees: any = await client.graphql({
        query: listGroups,
        variables: {
          filter: {
            and: {
              grpContact: {
                eq: route.params.grpContact
              },
              status: {
                eq: "AccountActive"
              }
            }
          }
        }
      });
      setChm(Lonees.data.listGroups.items);
      const compDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const companyEarningBals = compDtls.data.getCompany.companyEarningBal;
      const companyEarnings = compDtls.data.getCompany.companyEarning;
      const enquiryFees = compDtls.data.getCompany.enquiryFee;
      if (parseFloat(balances) < parseFloat(enquiryFees)) {
        Alert.alert("Account Balance is very little");
        return;
      }
      await client.graphql({
        query: updateCompany,
        variables: {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            companyEarningBal: parseFloat(companyEarningBals) + parseFloat(enquiryFees),
            companyEarning: parseFloat(companyEarnings) + parseFloat(enquiryFees)
          }
        }
      });
      await client.graphql({
        query: updateSMAccount,
        variables: {
          input: {
            awsemail: attributes.email,
            balance: parseFloat(balances) - parseFloat(enquiryFees)
          }
        }
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching Chama info. Please retry.");
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
    }} data={Chm} renderItem={({
      item
    }) => <ChamInfo ChmDtls={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}>Chama Info</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;