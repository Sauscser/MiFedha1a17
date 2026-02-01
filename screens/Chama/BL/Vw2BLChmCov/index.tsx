import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import LnerStts from "../../../../components/Chama/BL/BLChmCovLn";
import styles from './styles';
import { getCompany, getGroup, getSMAccount, listCvrdGroupLoans, vwChamaMemberss, vwChamaMembersss, vwLnrNLnee } from '../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
import { updateCompany, updateGroup } from '../../../../src/graphql/mutations';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
const client = generateClient();
const FetchSMCovLns = props => {
  const [LneePhn, setLneePhn] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState<any[]>([]);
  const route = useRoute();
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
      const today = new Date();
      let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
      let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
      let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
      let years = (today.getFullYear() < 10 ? '0' : '') + today.getFullYear();
      let months = (today.getMonth() < 10 ? '0' : '') + today.getMonth();
      let months2 = parseFloat(months);
      let days = (today.getDate() < 10 ? '0' : '') + today.getDate();
      const now: any = years + "-" + "0" + months2 + "-" + days + "T" + hours + ':' + minutes + ':' + seconds;
      const curYrs = parseFloat(years) * 365;
      const curMnths = months2 * 30.4375;
      const daysUpToDate = curYrs + curMnths + parseFloat(days);
      console.log(daysUpToDate);
      const fetchLoanees = async () => {
        setLoading(true);
        try {
          const Lonees: any = await client.graphql({
            query: listCvrdGroupLoans,
            variables: {
              filter: {
                and: {
                  amountExpectedBackWthClrnc: {
                    gt: 0
                  },
                  status: {
                    ne: "LoanBL"
                  },
                  timeExpBack: {
                    le: daysUpToDate
                  },
                  timeExpBack2: {
                    le: daysUpToDate
                  },
                  grpContact: {
                    eq: route.params.ChmNMmbrPhns
                  }
                }
              }
            }
          });
          setLoanees(Lonees.data.listCvrdGroupLoans.items);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      await fetchLoanees();
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
    }) => <LnerStts ChamaMmbrshpDtls={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUsrDtls} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            <Text style={styles.label}> Swipe down to refresh</Text>
            <Text style={styles.label}> Select to Blacklist</Text>
          </>} />
    </View>;
};
export default FetchSMCovLns;