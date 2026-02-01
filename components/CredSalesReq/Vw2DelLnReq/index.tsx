import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

import { generateClient } from 'aws-amplify/api';
import { StyleSheet, Dimensions } from 'react-native';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteReqLoanCredSl } from '../../../src/graphql/mutations';

export interface SMAccount {
  SMAc: {
    id: string,
    status: string,
    loaneePhone: string,
    itemName: string,
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
      itemName,
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
        query: deleteReqLoanCredSl,
        variables: {
          input: {
            id: id,
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.pageContainer}>
      <Pressable onPress={updtRecAc2} style={styles.card}>
        <Text style={styles.prodName}>
          {/*loaner details */}
          Hi! it's {loaneeName}. Kindly sell me a {itemName} on credit whose cash price is Ksh. {amount}. I
          commit to repay at a compound interest of {repaymentAmt}% per year within {repaymentPeriod} days.
          You can reach me through {loaneePhone}. {status}
        </Text>
      </Pressable>
    </View>
  );
};

export default SMCvLnStts;
