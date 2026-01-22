import React, { useEffect, useState } from 'react';
import Communications from 'react-native-communications';
import {
  updateCompany,
  updateSMAccount,
  updateCvrdGroupLoans,
  updateGroup,
  updateChamaMembers,
  createMessages,
  sendNotification,
} from '../../../../src/graphql/mutations';
import {
  getCompany,
  getSMAccount,
  getCvrdGroupLoans,
  getGroup,
  getChamaMembers,
} from '../../../../src/graphql/queries';
import { graphqlOperation, API, Auth } from 'aws-amplify';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';

const BLChmCovLoanee = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false);

  const gtCompDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      // 1️⃣ Fetch company details
      const companyResult: any = await API.graphql(
        graphqlOperation(getCompany, { AdminId: "BaruchHabaB'ShemAdonai2" })
      );
      const company = companyResult.data.getCompany;
      const { ttlChmLnsInBlTymsCov, ttlChmLnsInBlAmtCov, userClearanceFee, ttlBLUsrs } = company;

      // 2️⃣ Fetch loan details
      const loanResult: any = await API.graphql(
        graphqlOperation(getCvrdGroupLoans, { loanID: route.params.loanID })
      );
      const loan = loanResult.data.getCvrdGroupLoans;
      const {
        loaneePhn,
        grpContact,
        amountExpectedBack,
        amountRepaid,
        lonBala,
        interest,
        dfltUpdate,
        crtnDate,
        repaymentPeriod,
        status: loanStatus,
        memberId,
        DefaultPenaltyChm,
        paymentFrequency,
        installmentAmount,
      } = loan;

      // 3️⃣ Calculate days up to date
      const today = new Date();
      const daysUpToDate = Date.now() / (1000 * 60 * 60 * 24);

      const tmDif = (daysUpToDate - dfltUpdate)/(1000 * 60 * 60 * 24);
      const tmDif2 = daysUpToDate - crtnDate/(1000 * 60 * 60 * 24);

      // 4️⃣ Loan balances
      const netLnBal = amountExpectedBack - amountRepaid;
      const LonBal1 = netLnBal * Math.pow(1 + parseFloat(interest) / 36500, tmDif2);
      const MmbrClrnceCosts = parseFloat(userClearanceFee) * amountExpectedBack + parseFloat(DefaultPenaltyChm);
      const LonBal4 = LonBal1 + MmbrClrnceCosts;
      const LonBal5 = LonBal1 + parseFloat(DefaultPenaltyChm);

      // 5️⃣ Fetch group details
      const groupResult: any = await API.graphql(graphqlOperation(getGroup, { grpContact }));
      const group = groupResult.data.getGroup;
      const { grpName, tymsChmHvBL, signitoryPW, objectionStatus, TtlBLLonsTmsLnrChmCov, TtlBLLonsAmtLnrChmCov } = group;

      // 6️⃣ Fetch loanee details
      const loaneeResult: any = await API.graphql(graphqlOperation(getSMAccount, { awsemail: loaneePhn }));
      const loanee = loaneeResult.data.getSMAccount;
      const { acStatus, name: loaneeName, TtlBLLonsTmsLneeChmCov, TtlBLLonsAmtLneeChmCov, TtlActvLonsAmtLneeChmCov, MaxTymsBL } = loanee;

      // 7️⃣ Fetch member details
      const memberResult: any = await API.graphql(graphqlOperation(getChamaMembers, { ChamaNMember: memberId }));
      const member = memberResult.data.getChamaMembers;
      const LnBalsss = member.LnBal;

      // 8️⃣ Validation checks
      if (parseFloat(lonBala) === 0) {
        Alert.alert("Loanee has cleared this loan");
        return;
      }
      if (acStatus === "AccountInactive") {
        Alert.alert("Loanee account has been deactivated");
        return;
      }
      if (objectionStatus === "Objected") {
        Alert.alert("Operations on this group have been stopped");
        return;
      }
      if (tmDif < parseFloat(paymentFrequency)) {
        Alert.alert("Time to Blacklist is not yet");
        return;
      }

      // ✅ Core logic: Penalisation / Blacklisting / Updates
      if (tmDif2 > parseFloat(paymentFrequency) && amountRepaid < LonBal1 && tmDif2 < repaymentPeriod && loanStatus !== "LoanBL") {
        // Penalise before blacklisting
        await applyPartialPenalty();
      } else if (tmDif2 > repaymentPeriod && loanStatus !== "LoanBL") {
        // Blacklist
        await blacklistLoan();
      } else if (parseFloat(paymentFrequency) < tmDif && loanStatus === "LoanBL") {
        // Already blacklisted but not repaying
        await updateBlacklistedLoan();
      } else {
        Alert.alert("Retry or update app or call customer care");
      }

      // -------------------
      // Helper functions
      // -------------------

      async function applyPartialPenalty() {
        await updateCvrdGroupLoansAPI({
          amountExpectedBackWthClrnc: LonBal5.toFixed(0),
          lonBala: LonBal5.toFixed(0),
          dfltUpdate: daysUpToDate,
          blOfficer: userInfo.attributes.email,
          DefaultPenaltyChm2: DefaultPenaltyChm.toFixed(0),
        });
        Alert.alert(`${grpName}, you have penalised ${loaneeName}`);
        Communications.textWithoutEncoding(
          loaneePhn,
          `MiFedha. Hi ${loaneeName}, your loan of ID ${route.params.loanID} has been penalised after blacklisting by ${grpName}. Total repayable: Ksh. ${LonBal5.toFixed(0)}. For clarification call the group Admin: ${userInfo.attributes.phone_number}.`
        );
      }

      async function blacklistLoan() {
        // Update loan
        await updateCvrdGroupLoansAPI({
          amountExpectedBackWthClrnc: LonBal4.toFixed(0),
          lonBala: LonBal4.toFixed(0),
          status: "LoanBL",
          dfltUpdate: daysUpToDate,
          clearanceAmt: MmbrClrnceCosts.toFixed(0),
          blOfficer: userInfo.attributes.email,
          DefaultPenaltyChm2: DefaultPenaltyChm.toFixed(0),
        });
        // Update member
        await API.graphql(graphqlOperation(updateChamaMembers, {
          input: {
            ChamaNMember: memberId,
            LnBal: (parseFloat(LnBalsss) + MmbrClrnceCosts).toFixed(0),
            blStatus: "AccountBlackListed",
          },
        }));
        // Update loanee
        await API.graphql(graphqlOperation(updateSMAccount, {
          input: {
            awsemail: loaneePhn,
            TtlBLLonsAmtLneeChmCov: (parseFloat(TtlBLLonsAmtLneeChmCov) + MmbrClrnceCosts).toFixed(0),
            TtlActvLonsAmtLneeChmCov: (parseFloat(TtlActvLonsAmtLneeChmCov) + parseFloat(userClearanceFee) * amountExpectedBack).toFixed(0),
            blStatus: "AccountBlackListed",
            loanStatus: "LoanActive",
          },
        }));
        // Update group
        await API.graphql(graphqlOperation(updateGroup, {
          input: {
            grpContact,
            tymsChmHvBL: parseFloat(tymsChmHvBL) + 1,
            TtlBLLonsTmsLnrChmCov: parseFloat(TtlBLLonsTmsLnrChmCov) + 1,
            TtlBLLonsAmtLnrChmCov: (parseFloat(TtlBLLonsAmtLnrChmCov) + (parseFloat(userClearanceFee) * amountExpectedBack + parseFloat(DefaultPenaltyChm))).toFixed(0),
          },
        }));
        // Update company totals
        await API.graphql(graphqlOperation(updateCompany, {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            ttlChmLnsInBlTymsCov: parseFloat(ttlChmLnsInBlTymsCov) + 1,
            ttlChmLnsInBlAmtCov: (parseFloat(ttlChmLnsInBlAmtCov) + parseFloat(userClearanceFee) * amountExpectedBack).toFixed(0),
            ttlBLUsrs: parseFloat(ttlBLUsrs) + 1,
          },
        }));

        await API.graphql(graphqlOperation(createMessages, {
                    input: { senderEmail: loaneePhn, 
                    messageBody: `MiFedha: Hi ${loaneeName}, your loan of ID ${route.params.loanID} has been blacklisted by ${grpName}. Total repayable: Ksh. ${LonBal4.toFixed(0)}.`
                     }
                  }));
                  await API.graphql(graphqlOperation(sendNotification, {
                    riderEmail: loaneePhn,
                    title: 'MiFedha: Loan Blacklisted',
                    body: `Hi ${loaneeName}, your loan of ID ${route.params.loanID} has been blacklisted by ${grpName}. Total repayable: Ksh. ${LonBal4.toFixed(0)}.`
                  }));

        Alert.alert(`${grpName}, you have blacklisted ${loaneeName}`);
       
      }

      async function updateBlacklistedLoan() {
        await updateCvrdGroupLoansAPI({
          amountExpectedBackWthClrnc: LonBal5.toFixed(0),
          lonBala: LonBal5.toFixed(0),
          status: "LoanBL",
          dfltUpdate: daysUpToDate,
          blOfficer: userInfo.attributes.email,
          DefaultPenaltyChm2: DefaultPenaltyChm.toFixed(0),
        });
        await API.graphql(graphqlOperation(updateChamaMembers, {
          input: {
            ChamaNMember: memberId,
            LnBal: (parseFloat(LnBalsss) + parseFloat(userClearanceFee) * amountExpectedBack).toFixed(0),
            blStatus: "AccountBlackListed",
          },
        }));
        await API.graphql(graphqlOperation(updateSMAccount, {
          input: {
            awsemail: loaneePhn,
            TtlBLLonsAmtLneeChmCov: (parseFloat(TtlBLLonsAmtLneeChmCov) + parseFloat(userClearanceFee) * amountExpectedBack).toFixed(0),
            TtlActvLonsAmtLneeChmCov: (parseFloat(TtlActvLonsAmtLneeChmCov) + parseFloat(userClearanceFee) * amountExpectedBack).toFixed(0),
            blStatus: "AccountBlackListed",
            loanStatus: "LoanActive",
          },
        }));
        Alert.alert(`${grpName}, you have penalised after blacklisting ${loaneeName}`);
        Communications.textWithoutEncoding(
          loaneePhn,
          `Hi ${loaneeName}, your loan of ID ${route.params.loanID} has been penalised after blacklisting by ${grpName}. Total repayable: Ksh. ${LonBal5.toFixed(0)}.`
        );
      }

      // General helper to update loan
      async function updateCvrdGroupLoansAPI(updateFields: any) {
        await API.graphql(graphqlOperation(updateCvrdGroupLoans, {
          input: { loanID: route.params.loanID, ...updateFields },
        }));
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Error! Access denied!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.image}>
      <ScrollView>
        <TouchableOpacity onPress={gtCompDtls} style={styles.sendLoanButton}>
          <Text style={styles.sendLoanButtonText}>Click to Black List</Text>
          {isLoading && <ActivityIndicator size="large" color="blue" />}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default BLChmCovLoanee;
