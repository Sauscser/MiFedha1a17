import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { deleteReqLoan, updateBizSlsReq, updateNonLoans, updateReqLoan } from '../../../../../src/graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { StyleSheet, Dimensions } from 'react-native';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface SMAccount {
  SMAc: {
    id: string,
    senderPhn: string,
    recPhn: string,
    RecName: string,
    SenderName: string,
    amount: number,
    description: string,
    owner: string,
    createdAt: string,
    attendingAdmin: string
  }
}

const client = generateClient();

const SMCvLnStts = (props: SMAccount) => {
  const {
    SMAc: {
      id,
      senderPhn,
      recPhn,
      RecName,
      SenderName,
      amount,
      description,
      owner,
      createdAt,
      attendingAdmin
    }
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const SndChmMmbrMny = () => {
    navigation.navigate("B2BPayCashB2BBen", { id });
  };

  const updtCashSale = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await client.graphql({
        query: updateBizSlsReq,
        variables: {
          input: {
            id: id,
            status: "Declined"
          }
        }
      });
    } catch (error) {
      if (error) {
        return;
      }
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.card}>
        <Text style={styles.prodName}>
          {/*loaner details */}
          Hi! Kindly approve this cash payment to {RecName} business
          amounting to Ksh. {amount}. More about the payment is
          as follows: {description}. Thank you.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          onPress={SndChmMmbrMny}
          style={styles.loanFriendButton}
        >
          <Text>Approve</Text>
        </Pressable>

        <Pressable
          onPress={updtCashSale}
          style={styles.redeemButton}
        >
          <Text>Decline</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SMCvLnStts;
