import React, { useEffect, useState } from 'react';
import Communications from 'react-native-communications';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { getBizna, getCompany, getCovCreditSeller, getSMAccount } from '../../../../src/graphql/queries';
import { updateCompany, updateCovCreditSeller, updateSMAccount } from '../../../../src/graphql/mutations';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const BLCovCredByr = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ownr, setownr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [LonId, setLonId] = useState("");
  const gtCompDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const compDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const ttlSellerLnsInBlAmtCovs = compDtls.data.getCompany.ttlSellerLnsInBlAmtCov;
      const ttlSellerLnsInBlTymsCovs = compDtls.data.getCompany.ttlSellerLnsInBlTymsCov;
      const userClearanceFees = compDtls.data.getCompany.userClearanceFee;
      const ttlBLUsrss = compDtls.data.getCompany.ttlBLUsrs;
      const gtLoanDtls = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
          const loanDtls: any = await client.graphql({
            query: getCovCreditSeller,
            variables: {
              loanID: route.params.loanID
            }
          });
          const buyerContacts = loanDtls.data.getCovCreditSeller.buyerContact;
          const sellerContacts = loanDtls.data.getCovCreditSeller.sellerContact;
          const amountexpecteds = loanDtls.data.getCovCreditSeller.amountexpectedBack;
          const amountrepaids = loanDtls.data.getCovCreditSeller.amountRepaid;
          const interest = loanDtls.data.getCovCreditSeller.interest;
          const dfltUpdate = loanDtls.data.getCovCreditSeller.dfltUpdate;
          const crtnDate = loanDtls.data.getCovCreditSeller.crtnDate;
          const lonBala = loanDtls.data.getCovCreditSeller.lonBala;
          const amountExpectedBackWthClrncs = loanDtls.data.getCovCreditSeller.amountExpectedBackWthClrnc;
          const statusssss = loanDtls.data.getCovCreditSeller.status;
          const DefaultPenaltyCredSls = loanDtls.data.getCovCreditSeller.DefaultPenaltyCredSl;
          const dfltDeadLn = loanDtls.data.getCovCreditSeller.repaymentPeriod;
          const createdAt = loanDtls.data.getCovCreditSeller.createdAt;
          const repaymentPeriod = loanDtls.data.getCovCreditSeller.repaymentPeriod;

          // … keep all your loan math and decision logic exactly as before …

          const gtLoanerDtls = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
              const loanerDtls: any = await client.graphql({
                query: getSMAccount,
                variables: {
                  awsemail: sellerContacts
                }
              });
              const names = loanerDtls.data.getSMAccount.name;
              const gtLoaneeDtls = async () => {
                if (isLoading) return;
                setIsLoading(true);
                try {
                  const loaneeDtls: any = await client.graphql({
                    query: getSMAccount,
                    variables: {
                      awsemail: buyerContacts
                    }
                  });
                  const acStatusss = loaneeDtls.data.getSMAccount.acStatus;
                  const namess = loaneeDtls.data.getSMAccount.name;
                  const MaxTymsBLs = loaneeDtls.data.getSMAccount.MaxTymsBL;
                  const phonecontactz = loaneeDtls.data.getSMAccount.phonecontact;

                  // … all your updateCovCreditSeller, updateCompany, updateSMAccount calls remain …
                  // Just replace API.graphql(graphqlOperation(...)) with client.graphql({ query, variables })
                } catch (error) {
                  console.log(error);
                  Alert.alert("Blacklisting unsuccessful; Retry");
                } finally {
                  setIsLoading(false);
                }
              };
              await gtLoaneeDtls();
            } catch (error) {
              console.log(error);
              Alert.alert("Blacklisting unsuccessful; Retry");
            } finally {
              setIsLoading(false);
            }
          };
          await gtLoanerDtls();
        } catch (error) {
          console.log(error);
          Alert.alert("Retry or update app or call customer care");
        } finally {
          setIsLoading(false);
        }
      };
      await gtLoanDtls();
    } catch (error) {
      console.log(error);
      Alert.alert("Retry or update app or call customer care");
    } finally {
      setIsLoading(false);
      setLonId("");
    }
  };
  return <View>
              <View style={styles.image}>
                <ScrollView>
           
        
                  <TouchableOpacity onPress={gtCompDtls} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Black List 
                    </Text>
                    {isLoading && <ActivityIndicator size="large" color="blue" />}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default BLCovCredByr;