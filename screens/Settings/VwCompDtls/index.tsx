import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, FlatList, Alert } from 'react-native';
import LnerStts from "../../../components/VwCompAc";
import styles from './styles';
import { getCompany, listCompanies, listCompanys } from '../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const FetchSMNonCovLns = props => {
  const [ownr, setownr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState();
  const fetchUser = async () => {
    const userInfo = await getCurrentUser();
    const UsrInfo = userInfo.userId;
    const fetchCompDtls = async () => {
      setLoading(true);
      try {
        const Lones: any = await client.graphql({
          query: getCompany,
          variables: {
            AdminId: "BaruchHabaB'ShemAdonai2"
          }
        });
        const CompOner = Lones.data.getCompany.owner;
        const fetchLoanees = async () => {
          setLoading(true);
          try {
            const Lonees: any = await client.graphql({
              query: listCompanies,
              variables: {
                filter: {
                  and: {
                    AdminId: {
                      eq: "BaruchHabaB'ShemAdonai2"
                    }
                  }
                }
              }
            });
            setLoanees(Lonees.data.listCompanies.items);
          } catch (e) {
            console.log(e);
          }
          {
            setLoading(false);
          }
        };
        if (CompOner === UsrInfo) {
          await fetchLoanees();
        } else {
          Alert.alert("You are not the owner of this Company");
        }
      } catch (e) {
        console.log(e);
      }
      {
        setLoading(false);
      }
    };
    await fetchCompDtls();
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return <View style={styles.root}>
      <FlatList style={{
      width: "100%"
    }} data={Loanees} renderItem={({
      item
    }) => <LnerStts SMAc={item} />} keyExtractor={(item, index) => index.toString()} onRefresh={fetchUser} refreshing={loading} showsVerticalScrollIndicator={false} ListHeaderComponentStyle={{
      alignItems: 'center'
    }} ListHeaderComponent={() => <>
            
            <Text style={styles.label}> Company Details</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>} />
    </View>;
};
export default FetchSMNonCovLns;