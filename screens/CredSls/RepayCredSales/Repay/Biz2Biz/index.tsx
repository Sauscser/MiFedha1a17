import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';

import {
  getBizna,
  getCompany,
  getCovCreditSeller,
  getSMAccount,
} from '../../../../../src/graphql/queries';
import {
  createLoanRepayments,
  updateBizna,
  updateCompany,
  updateCovCreditSeller,
} from '../../../../../src/graphql/mutations';

import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const RepayCovSellerLnsss = () => {
  const [SnderPW, setSnderPW] = useState('');
  const [amounts, setAmount] = useState('');
  const [Desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const ftchCvdSMLn = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const RecAccountDtl: any = await client.graphql({
        query: getCovCreditSeller,
        variables: { loanID: route.params.loanID },
      });

      const {
        amountExpectedBackWthClrnc,
        amountRepaid,
        sellerContact,
        buyerName,
        SellerName,
        buyerContact,
        amountexpectedBack,
        interest,
        clearanceAmt,
        DefaultPenaltyCredSl2,
        crtnDate,
      } = RecAccountDtl.data.getCovCreditSeller;

      const LonBalsss =
        parseFloat(amountExpectedBackWthClrnc) - parseFloat(amountRepaid);

      const ClranceAmt =
        parseFloat(clearanceAmt) + parseFloat(DefaultPenaltyCredSl2);

      const today = new Date();
      const years = today.getFullYear();
      const months = today.getMonth() + 1;
      const days = today.getDate();

      const curYrs = years * 365;
      const curMnths = months * 30.4375;
      const daysUpToDate = curYrs + curMnths + days;

      const tmDif2 = daysUpToDate - parseFloat(crtnDate);

      const netLnBal =
        parseFloat(amountExpectedBackWthClrnc) -
        parseFloat(clearanceAmt) -
        parseFloat(DefaultPenaltyCredSl2);

      const netLnBal2 =
        netLnBal * Math.pow(1 + parseFloat(interest) / 36500, tmDif2);

      const LonBal1 = (
        netLnBal2 +
        parseFloat(clearanceAmt) +
        parseFloat(DefaultPenaltyCredSl2)
      ).toFixed(0);

      const LoanBalz = parseFloat(LonBal1) - parseFloat(amounts);

      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      const accountDtl: any = await client.graphql({
        query: getBizna,
        variables: { BusKntct: sellerContact },
      });

      const netEarnings1 = accountDtl.data.getBizna.netEarnings;
      const TtlEarnings1 = accountDtl.data.getBizna.TtlEarnings;

      const compRes: any = await client.graphql({
        query: getCompany,
        variables: { AdminId: "BaruchHabaB'ShemAdonai2" },
      });

      const company = compRes.data.getCompany;
      const UsrTransferFee = company.crdSllrLnRpymntFee;
      const companyEarningBals = company.companyEarningBal;
      const companyEarnings = company.companyEarning;
      const totalLnsRecovereds = company.totalLnsRecovered;
      const maxBLss = company.maxBLs;

      const RecAccountDtl2: any = await client.graphql({
        query: getBizna,
        variables: { BusKntct: buyerContact },
      });

      const netEarnings2 = RecAccountDtl2.data.getBizna.netEarnings;
      const noBL = RecAccountDtl2.data.getBizna.noBL;
      const owner = RecAccountDtl2.data.getBizna.owner;

      if (userInfo.userId !== owner) {
        Alert.alert('You are not the owner of the business');
        setIsLoading(false);
        return;
      }

      if (parseFloat(netEarnings2) < parseFloat(amounts)) {
        Alert.alert('Requested amount is more than you have in your account');
        setIsLoading(false);
        return;
      }

      if (ClranceAmt > parseFloat(amounts)) {
        Alert.alert(
          'Too little repayment: at least ' + ClranceAmt.toFixed(2),
        );
        setIsLoading(false);
        return;
      }

      if (parseFloat(amounts) === parseFloat(LonBal1)) {
        Alert.alert(
          'Your Loan Balance is lesser: ' + parseFloat(LonBal1).toFixed(0),
        );
        setIsLoading(false);
        return;
      }

      // Example repayment mutation
      await client.graphql({
        query: updateCovCreditSeller,
        variables: {
          input: {
            loanID: route.params.loanID,
            amountRepaid: (
              parseFloat(amounts) + parseFloat(amountRepaid)
            ).toFixed(0),
            lonBala: LoanBalz.toFixed(0),
            amountExpectedBackWthClrnc: LoanBalz.toFixed(0),
            status: 'LoanCleared',
            DefaultPenaltyCredSl2: 0,
            clearanceAmt: 0,
          },
        },
      });

      await client.graphql({
        query: createLoanRepayments,
        variables: {
          input: {
            senderPhn: buyerContact,
            recPhn: sellerContact,
            RecName: SellerName,
            SenderName: buyerName,
            loanId2: route.params.loanID,
            amount: parseFloat(amounts).toFixed(0),
            description: Desc,
            status: 'CredSlrLonRepayment',
            owner: userInfo.userId,
          },
        },
      });

      await client.graphql({
        query: updateBizna,
        variables: {
          input: {
            BusKntct: sellerContact,
            netEarnings: (
              parseFloat(netEarnings1) +
              (parseFloat(amounts) - parseFloat(clearanceAmt))
            ).toFixed(0),
            TtlEarnings: (
              parseFloat(TtlEarnings1) +
              (parseFloat(amounts) - parseFloat(clearanceAmt))
            ).toFixed(0),
          },
        },
      });

      await client.graphql({
        query: updateCompany,
        variables: {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            companyEarningBal:
              UsrTransferFee * parseFloat(amounts) +
              parseFloat(companyEarningBals) +
              ClranceAmt -
              parseFloat(DefaultPenaltyCredSl2),
            companyEarning:
              UsrTransferFee * parseFloat(amounts) +
              parseFloat(companyEarnings) +
              ClranceAmt -
              parseFloat(DefaultPenaltyCredSl2),
            totalLnsRecovered:
              parseFloat(totalLnsRecovereds) + parseFloat(amounts),
          },
        },
      });

      Alert.alert(
        'Cleared. ClearanceFee: ' +
          ClranceAmt.toFixed(2) +
          ' TransactionFee: ' +
          (parseFloat(UsrTransferFee) * parseFloat(amounts)).toFixed(2)
      );
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error! Update your app or call customer care');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const amt = amounts;
    if (!amt && amt !== '') {
      setAmount('');
      return;
    }
    setAmount(amt);
  }, [amounts]);

  useEffect(() => {
    const descr = Desc;
    if (!descr && descr !== '') {
      setDesc('');
      return;
    }
    setDesc(descr);
  }, [Desc]);

  useEffect(() => {
    const pw = SnderPW;
    if (!pw && pw !== '') {
      setSnderPW('');
      return;
    }
    setSnderPW(pw);
  }, [SnderPW]);

  return (
    <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
              keyboardType="numeric"
              placeholder="Amount"
              value={amounts}
              onChangeText={setAmount}
              style={styles.sendAmtInput}
            />
            <Text style={styles.sendAmtText}>Amount</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
              placeholder="Description"
              value={Desc}
              onChangeText={setDesc}
              style={styles.sendAmtInput}
            />
            <Text style={styles.sendAmtText}>Description</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={SnderPW}
              onChangeText={setSnderPW}
              style={styles.sendAmtInput}
            />
            <Text style={styles.sendAmtText}>Password</Text>
          </View>

          <TouchableOpacity
            style={styles.sendAmtButton}
            disabled={isLoading}
            onPress={ftchCvdSMLn}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.sendAmtButtonText}>Repay Loan</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default RepayCovSellerLnsss;
