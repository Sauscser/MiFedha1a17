import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getGroup } from '../../../../src/graphql/queries';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
const client = generateClient();
const ChmSignIn = () => {
  const navigation = useNavigation();
  const [grpContact, setChmPhn] = useState('');
  const [pword, setPW] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const FetchGrpLonsSts = () => {
    navigation.navigate("ChmContris", {
      grpContact
    });
  };
  const gtChmDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const compDtls: any = await client.graphql({
        query: getGroup,
        variables: {
          grpContact
        }
      });
      const signitoryPWs = compDtls.data.getGroup.signitoryPW;
      const owners = compDtls.data.getGroup.owner;
      const signitory2Subs = compDtls.data.getGroup.signitory2Sub;
      if (signitoryPWs !== pword) {
        Alert.alert("Wrong author credentials");
      } else if (user.userId !== owners && signitory2Subs !== user.userId) {
        Alert.alert("You are neither the author nor signatory of this Chama");
      } else {
        FetchGrpLonsSts();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Group does not exist; otherwise check internet connection");
    } finally {
      setIsLoading(false);
      setChmPhn('');
      setPW('');
    }
  };
  return <View>
      <View style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Chama Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={grpContact} onChangeText={setChmPhn} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama Account Number</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput value={pword} onChangeText={setPW} secureTextEntry={true} style={styles.sendLoanInput} editable={true} />
            <Text style={styles.sendLoanText}>Chama PassWord</Text>
          </View>

          <TouchableOpacity onPress={gtChmDtls} style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>Click to View</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default ChmSignIn;