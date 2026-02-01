import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import Communications from 'react-native-communications';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCompany, getCovCreditSeller, getBizna } from '../../../../src/graphql/queries';
import { updateCompany, updateCovCreditSeller, updateBizna } from '../../../../src/graphql/mutations';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import styles from './styles';
const client = generateClient();
const BLCovCredByr = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const gtCompDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      // Fetch company details
      const compDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const {
        ttlSellerLnsInBlAmtCov,
        ttlSellerLnsInBlTymsCov,
        userClearanceFee,
        ttlBLUsrs
      } = compDtls.data.getCompany;

      // Fetch loan details
      const loanDtls: any = await client.graphql({
        query: getCovCreditSeller,
        variables: {
          loanID: route.params.loanID
        }
      });
      const {
        buyerContact,
        sellerContact,
        amountexpectedBack,
        amountRepaid,
        dfltUpdate,
        crtnDate,
        interest,
        repaymentPeriod,
        lonBala,
        amountExpectedBackWthClrnc,
        status,
        DefaultPenaltyCredSl,
        paymentFrequency,
        installmentAmount,
        createdAt
      } = loanDtls.data.getCovCreditSeller;

      // Calculate time differences
      const today = new Date();
      const daysUpToDate = today.getFullYear() * 365 + (today.getMonth() + 1) * 30.4375 + today.getDate();
      const tmDif = daysUpToDate - dfltUpdate;
      const tmDif2 = daysUpToDate - crtnDate;

      // Loan math
      const netLnBalz = amountexpectedBack - amountRepaid;
      const LonBal1 = netLnBalz * Math.pow(1 + parseFloat(interest) / 36500, tmDif2);
      const LonBal4 = LonBal1 + parseFloat(userClearanceFee) * parseFloat(amountexpectedBack) + parseFloat(DefaultPenaltyCredSl);
      const LonBal5 = LonBal1 + parseFloat(DefaultPenaltyCredSl);

      // Fetch loaner details
      const loanerDtls: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: sellerContact
        }
      });
      const loanerName = loanerDtls.data.getBizna.busName;

      // Fetch loanee details
      const loaneeDtls: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: buyerContact
        }
      });
      const loaneeName = loaneeDtls.data.getBizna.busName;
      const acStatus = loaneeDtls.data.getBizna.status;
      const noBL = loaneeDtls.data.getBizna.noBL;

      // Decision logic
      if (parseFloat(lonBala) === 0) {
        Alert.alert("Loanee has cleared this loan");
      } else if (acStatus === "AccountInactive") {
        Alert.alert("Loanee account has been deactivated");
      } else if (tmDif < parseFloat(paymentFrequency)) {
        Alert.alert("Time to Blacklist is not yet");
      } else if (tmDif2 > parseFloat(paymentFrequency) && amountRepaid < LonBal1 && tmDif2 < repaymentPeriod && status !== "LoanBL") {
        // Penalise
        await client.graphql({
          query: updateCovCreditSeller,
          variables: {
            input: {
              loanID: route.params.loanID,
              amountExpectedBackWthClrnc: LonBal5.toFixed(0),
              DefaultPenaltyCredSl2: DefaultPenaltyCredSl.toFixed(0),
              lonBala: LonBal5.toFixed(0),
              dfltUpdate: daysUpToDate,
              blOfficer: attributes.email
            }
          }
        });
        Alert.alert(`${loanerName}, you have Penalised ${loaneeName}`);
        Communications.textWithoutEncoding(buyerContact, `MiFedha. Hi ${loaneeName}, your loan of ID ${route.params.loanID} has been Penalised by ${loanerName}. Total repayable: Ksh. ${LonBal5.toFixed(0)}.`);
      } else if (tmDif2 > repaymentPeriod && status !== "LoanBL") {
        // Blacklist
        await client.graphql({
          query: updateCovCreditSeller,
          variables: {
            input: {
              loanID: route.params.loanID,
              amountExpectedBackWthClrnc: LonBal4.toFixed(0),
              status: "LoanBL",
              DefaultPenaltyCredSl2: DefaultPenaltyCredSl.toFixed(0),
              lonBala: LonBal4.toFixed(0),
              clearanceAmt: (parseFloat(userClearanceFee) * parseFloat(amountexpectedBack)).toFixed(0),
              dfltUpdate: daysUpToDate,
              blOfficer: attributes.email
            }
          }
        });
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: buyerContact,
              noBL: parseFloat(noBL) + 1
            }
          }
        });
        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: "BaruchHabaB'ShemAdonai2",
              ttlSellerLnsInBlTymsCov: parseFloat(ttlSellerLnsInBlTymsCov) + 1,
              ttlSellerLnsInBlAmtCov: (parseFloat(ttlSellerLnsInBlAmtCov) + parseFloat(userClearanceFee) * parseFloat(amountexpectedBack)).toFixed(2),
              ttlBLUsrs: parseFloat(ttlBLUsrs) + 1
            }
          }
        });
        Alert.alert(`${loanerName}, you have blacklisted ${loaneeName}`);
        Communications.textWithoutEncoding(buyerContact, `MiFedha. Hi ${loaneeName}, your loan of ID ${route.params.loanID} has been blacklisted by ${loanerName}. Total repayable: Ksh. ${LonBal4.toFixed(0)}.`);
      } else {
        Alert.alert("Time to Blacklist/Penalise is not yet");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Retry or update app or call customer care");
    } finally {
      setIsLoading(false);
    }
  };
  return <View>
              <View style={styles.image}>
                <ScrollView>
           
                  
                  <TouchableOpacity onPress={gtCompDtls} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Penalise or Black List 
                    </Text>
                    {isLoading && <ActivityIndicator size="large" color="blue" />}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default BLCovCredByr;