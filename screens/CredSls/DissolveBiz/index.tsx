import React, { useEffect, useState } from 'react';
import { deleteBizna } from '../../../src/graphql/mutations';
import { getBizna } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const DissolveChm = props => {
  const navigation = useNavigation();
  const [SigntryPW, setSigntryPW] = useState("");
  const [groupCnt, setgroupCnt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ftchChmDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const compDtls: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: groupCnt
        }
      });
      const signitoryPWs = compDtls.data.getBizna.pw;
      const grpNames = compDtls.data.getBizna.busName;
      const owners = compDtls.data.getBizna.owner;
      const earningsBals = compDtls.data.getBizna.earningsBal;
      const updtChmDtls = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
          await client.graphql({
            query: deleteBizna,
            variables: {
              input: {
                BusKntct: groupCnt
              }
            }
          });
          Alert.alert(attributes.email + " has dissolved " + grpNames + " Business");
        } catch (error) {
          console.log(error);
          Alert.alert("Dissolution unsuccessful; Retry");
        } finally {
          setIsLoading(false);
        }
      };
      if (signitoryPWs !== SigntryPW) {
        Alert.alert("Wrong Admin password");
      } else if (userInfo.userId !== owners) {
        Alert.alert("You do not own this business");
      } else if (earningsBals > 1) {
        Alert.alert("Business account has funds; please share it");
      } else {
        await updtChmDtls();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Enter details correctly");
    } finally {
      setgroupCnt("");
      setSigntryPW("");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const groupCnts = groupCnt;
    if (!groupCnts && groupCnts !== "") {
      setgroupCnt("");
      return;
    }
    setgroupCnt(groupCnts);
  }, [groupCnt]);
  useEffect(() => {
    const SigntryPWs = SigntryPW;
    if (!SigntryPWs && SigntryPWs !== "") {
      setSigntryPW("");
      return;
    }
    setSigntryPW(SigntryPWs);
  }, [SigntryPW]);
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput placeholder="+2547xxxxxxxx" value={groupCnt} onChangeText={setgroupCnt} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Business Phone</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={SigntryPW} onChangeText={setSigntryPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Business PassWord</Text>
          </View>

          <TouchableOpacity onPress={ftchChmDtls} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>
              Click to dissolve Business
            </Text>
            {isLoading && <ActivityIndicator color={'Blue'} size="large" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default DissolveChm;