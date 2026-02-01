import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import styles from './styles';
import { updateReqLoan, updateSMAccount } from '../../../src/graphql/mutations';
import Communications from 'react-native-communications';

export interface SMAccount {
  SMAc: {
    id: string,
    loaneePhone: string,
    loanerEmail: string,
    loanerName: string,
    loaneeName: string,
    amount: number,
    repaymentAmt: number,
    loanerPhone: string,
    description: string,
    defaultPenalty: number,
    repaymentPeriod: number,
    createdAt: string,
  }
}

const client = generateClient();

const ViewSMDeposts = (props: SMAccount) => {
  const {
    SMAc: {
      id,
      loaneePhone,
      loanerEmail,
      loanerName,
      loaneeName,
      amount,
      repaymentAmt,
      loanerPhone,
      defaultPenalty,
      description,
      repaymentPeriod,
      createdAt,
    }
  } = props;

  const navigation = useNavigation();

  const SndChmMmbrMny3 = () => {
    navigation.navigate("Vw2ApprovePPReq");
  };

  const SndChmMmbrMny = () => {
    try {
      client.graphql({
        query: updateReqLoan,
        variables: {
          input: {
            id: id,
            statusNumber: 1,
          }
        }
      });
    } catch (error) {
      if (error) {
        Alert.alert("Retry or update app or call customer care");
        return;
      }
    }
    SndChmMmbrMny3();

    Communications.textWithoutEncoding(
      loanerPhone,
      'MiFedha. Hi I have witnessed the ' +
      ' loan contract between you ' + loanerName +
      ' the Loaner and ' + loaneeName + ' the Loaned. Thank you.'
    );
  };

  const SndChmMmbrMny2 = () => {
    try {
      client.graphql({
        query: updateReqLoan,
        variables: {
          input: {
            id: id,
            statusNumber: 2,
          }
        }
      });
    } catch (error) {
      if (error) {
        Alert.alert("Retry or update app or call customer care");
        return;
      }
    }
    SndChmMmbrMny3();

    Communications.textWithoutEncoding(
      loaneePhone,
      'MiFedha. Hi, I could not witness the ' +
      ' loan contract between you ' + loanerName +
      ' the Loaner and ' + loaneeName + ' Please get in touch for more info. Thank you.'
    );
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.card}>
        <Text style={styles.prodName}>
          {/*loaner details */}
          MiFedha.
          Greetings! We, {loaneeName}, the loaned and {loanerName}, the loaner, humbly
          request that you witness our loan contract amounting to Ksh.
          {amount}, repayable at a compound interest of {repaymentAmt}% per year by the end of {repaymentPeriod} days,
          default penalty is Ksh. {defaultPenalty} and its description is as
          as follows: "{description}." You can reach
          my loaner through {loanerPhone}. You can also reach me through {loaneePhone}.
          Thank you.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          onPress={SndChmMmbrMny}
          style={styles.loanFriendButton}
        >
          <Text>Witness</Text>
        </Pressable>

        <Pressable
          onPress={SndChmMmbrMny2}
          style={styles.redeemButton}
        >
          <Text>Decline</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ViewSMDeposts;
