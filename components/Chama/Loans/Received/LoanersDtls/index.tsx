import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export interface SMCvLnSttus {
  Loanee: {
    loanID: string;
    loaneePhn: string;
    amountGiven: number;
    amountExpectedBack: number;
    amountExpectedBackWthClrnc: number;
    amountRepaid: number;
    lonBala: number;
    repaymentPeriod: number;
    loanerName: string;
    status: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    crtnDate: number; // timestamp in ms
    interest: number;
    clearanceAmt: number;
    DefaultPenaltyChm2: number;
    advRegNu: string;
  };
}

const SMCvLnStts = (props: SMCvLnSttus) => {
  const {
    Loanee: {
      loanID,
      loaneePhn,
      amountGiven,
      amountExpectedBack,
      amountExpectedBackWthClrnc,
      amountRepaid,
      lonBala,
      repaymentPeriod,
      loanerName,
      createdAt,
      updatedAt,
      status,
      description,
      crtnDate,
      interest,
      clearanceAmt,
      DefaultPenaltyChm2,
      advRegNu,
    },
  } = props;

  // ✅ Correct days elapsed
  const now = Date.now(); // current timestamp in ms
  const daysElapsed = (now - crtnDate) / (1000 * 60 * 60 * 24); // ms → days

  // ✅ Loan balance with interest
  const netLnBal = amountExpectedBack - amountRepaid;
  const netLnBal2 = netLnBal * Math.pow(1 + interest / 36500, daysElapsed);
  const LonBal1 = netLnBal2 + clearanceAmt + DefaultPenaltyChm2;

  return (
    <View style={styles.pageContainer}>
      <View style={styles.card}>
        <Text style={styles.prodName}>{loanerName}</Text>

        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Loan Id:</Text> {loanID}
        </Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Amount Given:</Text> KES {amountGiven.toFixed(2)}
        </Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Amount Repaid:</Text> KES {amountRepaid.toFixed(2)}
        </Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Loan Balance with penalties:</Text> KES {LonBal1.toFixed(2)}
        </Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Repayment Period in days:</Text> {repaymentPeriod}
        </Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Member Contact:</Text> {loaneePhn}
        </Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Advocate Registration Number:</Text> {advRegNu}
        </Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Loan Status:</Text> {status}
        </Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Time Loan was taken:</Text> {createdAt}
        </Text>

        <Text style={styles.prodDesc}>{description}</Text>
      </View>
    </View>
  );
};

export default SMCvLnStts;
