import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import styles from './styles';
import { updateReqLoan, updateReqLoanChama, updateReqLoanCredSl, updateSMAccount } from '../../../src/graphql/mutations';
import Communications from 'react-native-communications';

export interface SMAccount {
  SMAc: {
    id: string,
    loaneePhone: string,
    loanerPhone: string,
    loanerName: string,
    loaneeName: string,
    amount: number,
    repaymentAmt: number,
    businessNo: string,
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
      loanerName,
      loaneeName,
      amount,
      repaymentAmt,
      businessNo,
      loanerPhone,
      repaymentPeriod,
      defaultPenalty,
      description,
      createdAt,
    }
  } = props;

  const navigation = useNavigation();

  const SndChmMmbrMny3 = () => {
    navigation.navigate("Vw2ApproveBizReq");
  };

  const SndChmMmbrMny = () => {
    try {
      client.graphql({
        query: updateReqLoanCredSl,
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
      'MiFedha. Hi I have witnessed the' +
      ' loan contract between ' +
      ' your Business and ' + loaneeName + ' the Loaned. Thank you.'
    );
  };

  const SndChmMmbrMny2 = () => {
    try {
      client.graphql({
        query: updateReqLoanCredSl,
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
      ' loan contract between you ' + loaneeName +
      ' the Loanee and ' + loanerName + ' Please get in touch for more info. Thank you.'
    );
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.card}>
        <Text style={styles.prodDesc}>
          {/*loaner details */}
          MiFedha.
          Greetings! We, {loaneeName}, the loanee and {loanerName}, the Loaning Business humbly
          request that you witness our loan contract amounting to Ksh.
          {amount}, at a compund interest of {repaymentAmt}% per Year
          by the end of {repaymentPeriod} days, default penalty is Ksh. {defaultPenalty} and its description is as
          as follows: "{description}." You can reach
          my loaner through {businessNo}. You can also reach me through {loaneePhone}. Thank you.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          onPress={SndChmMmbrMny}
          style={styles.loanFriendButton}
        >
          <Text style={styles.buttonText}>Witness</Text>
        </Pressable>

        <Pressable
          onPress={SndChmMmbrMny2}
          style={styles.redeemButton}
        >
          <Text style={styles.buttonText}>Decline</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ViewSMDeposts;
