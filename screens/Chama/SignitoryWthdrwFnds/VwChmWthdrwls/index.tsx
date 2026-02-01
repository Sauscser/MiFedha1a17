import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import NonLnSent from "../../../../components/Chama/VwWithdrawalsChm";
import styles from './styles';
import { getCompany, getSMAccount, VwMFNFltAdds } from '../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../src/graphql/mutations';
import { useRoute } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMNonLnsSnt = () => {
  const [loading, setLoading] = useState(false);
  const [Recvrs, setRecvrs] = useState([]);
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

      // Fetch withdrawals
      const Lonees: any = await client.graphql({
        query: VwMFNFltAdds,
        variables: {
          withdrawerid: route.params.grpContact,
          sortDirection: "DESC",
          limit: 100
        }
      });
      setRecvrs(Lonees.data.VwMFNFltAdds.items);

      // Fetch company details
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

      // Update company
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

      // Update user account
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
      Alert.alert("Error! Please retry or check your internet connection.");
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
    }} data={Recvrs} renderItem={({
      item
    }) => <NonLnSent SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            
            <Text style={styles.label}> Chama Withdrawals</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMNonLnsSnt;