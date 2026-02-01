import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import MmbrChmRemInfo from "../../../../../components/Chama/ChmActivities/ChmRemit/VwMember";
import styles from './styles';
import { getCompany, getSMAccount, listGroupNonLoans } from '../../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const FetchSMCovLns = props => {
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
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
        query: listGroupNonLoans,
        variables: {
          filter: {
            recipientPhn: {
              eq: attributes.email
            }
          }
        }
      });
      setLoanees(Lonees.data.listGroupNonLoans.items);
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
      } else {
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
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error fetching data. Please retry or check your internet connection.");
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
    }) => <MmbrChmRemInfo memberContriDtls={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}>Remittance from My Chamas</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;