import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { deleteReqLoan, deleteReqLoanChama, updateReqLoan, updateReqLoanChama } from '../../../../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { StyleSheet, Dimensions } from 'react-native';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface SMAccount {
  SMAc: {
    id: string,
    status: string,
    loaneePhone: string,
    amount: number,
    repaymentAmt: number,
    repaymentPeriod: number,
    loaneeName: string,
  }
}

const client = generateClient();

const SMCvLnStts = (props: SMAccount) => {
  const {
    SMAc: {
      status,
      loaneePhone,
      amount,
      repaymentAmt,
      repaymentPeriod,
      loaneeName,
      id
    }
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const SndChmMmbrMny = () => {
    navigation.navigate("RepyChmNonCovLns", { id });
  };

  const updtRecAc2 = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await client.graphql({
        query: updateReqLoanChama,
        variables: {
          input: {
            id: id,
            WithdrawCnfrmtn2: "YES"
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Pressable onPress={updtRecAc2} style={styles.pageContainer}>
      <Text style={styles.prodInfo}>
        {/*loaner details */}
        Hi! it's {loaneeName}. Kindly Loan me Ksh. {amount}. I
        commit to repay at a compound interest of {repaymentAmt}% per year within {repaymentPeriod} days.
        You can reach me through {loaneePhone}. {status}
      </Text>
    </Pressable>
  );
};

export default SMCvLnStts;
