import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';

import { generateClient } from 'aws-amplify/api';
import { signOut } from 'aws-amplify/auth';
import { StyleSheet, Dimensions } from 'react-native';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getCompany } from '../../../src/graphql/queries';

const client = generateClient();

const MFKTC = () => {
  const [Alrt, setAlrt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const SgnOut = async () => {
    await signOut();
  };

  const route = useRoute();
  const idz = route.params.id;

  const CreateSMAcs = () => {
    navigation.navigate('RegMFKbw', { idz });
  };

  const gtCompDtls = async () => {
    try {
      const compDtls: any = await client.graphql({
        query: getCompany,
        variables: { AdminId: "BaruchHabaB'ShemAdonai2" }
      });

      setAlrt(compDtls.data.getCompany.MFKubwaTC);
    } catch (e: any) {
      console.log(e);
      if (e) {
        Alert.alert("Check your internet");
        return;
      }
    }
  };

  useEffect(() => {
    gtCompDtls();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.card}>
        <Text style={styles.prodName}>{Alrt}</Text>
      </View>
      <View style={styles.buttonRow}>
        <Pressable
          onPress={CreateSMAcs}
          style={styles.loanFriendButton}
        >
          <Text>Accept</Text>
        </Pressable>

        <Pressable
          onPress={SgnOut}
          style={styles.redeemButton}
        >
          <Text>Decline</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MFKTC;
