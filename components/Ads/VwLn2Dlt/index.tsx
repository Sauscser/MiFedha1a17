import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { generateClient } from 'aws-amplify/api';

import styles from './styles';
import { deleteRafikiLnAd, deleteSokoAd } from '../../../src/graphql/mutations';

export interface SMAccount {
  SMAc: {
    rafikiName: string,
    id: string,
    rafikicntct: string,
    rafikiEmail: string,
    rafikiamnt: number,
    rafikiprcntg: number,
    rafikidesc: string,
    rafikirpymntperiod: number,
  }
}

const client = generateClient();

const ViewSMDeposts = (props: SMAccount) => {
  const {
    SMAc: {
      rafikiName,
      rafikicntct,
      id,
      rafikiamnt,
      rafikidesc,
      rafikiprcntg,
      rafikirpymntperiod,
    }
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

 

  const DeleteSlsAd = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await client.graphql({
        query: deleteRafikiLnAd,
        variables: {
          input: { id: id }
        }
      });
    } catch (error) {
      console.log(error);
      if (error) {
        Alert.alert("Check your internet");
        return;
      }
    }
    setIsLoading(false);
    Alert.alert("Ad deleted. Refresh to load other ads");
  };

  return (
    <TouchableOpacity
      onPress={DeleteSlsAd}
      style={styles.pageContainer}>

      <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Name:</Text> {rafikiName}</Text>
      <Text style={styles.prodInfo}><Text style={styles.label}>Loaner Contact:</Text> {rafikicntct}</Text>
      <Text style={styles.prodInfo}><Text style={styles.label}>Loan Amount:</Text> KES {rafikiamnt.toLocaleString()}</Text>

    </TouchableOpacity>
  );
};

export default ViewSMDeposts;
