import React, { useEffect, useState } from 'react';
import { createFloatReduction, updateAgent, updateCompany, updateGroup } from '../../../src/graphql/mutations';
import { getAgent, getCompany, getGroup } from '../../../src/graphql/queries';
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
const client = generateClient();
const SMADepositForm = props => {
  const [nationalId, setNationalid] = useState("");
  const [agPWd, setAgPWd] = useState("");
  const [AgentPhn, setAgentPhn] = useState("");
  const [amount, setAmount] = useState("");
  const [UsrId, setUsrId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ownr, setownr] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setownr(user.userId);
    };
    fetchUser();
  }, []);
  const fetchAcDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const ChamaDtl: any = await client.graphql({
        query: getGroup,
        variables: {
          grpContact: nationalId
        }
      });
      const {
        grpBal,
        ttlDpst,
        status,
        grpName,
        SignitoryNatid
      } = ChamaDtl.data.getGroup;
      const AgentBal: any = await client.graphql({
        query: getAgent,
        variables: {
          phonecontact: AgentPhn
        }
      });
      const {
        TtlFltOut,
        floatBal,
        pw,
        name,
        status: AgStatus
      } = AgentBal.data.getAgent;
      const compDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const {
        ttlUsrDep,
        agentFloatOut
      } = compDtls.data.getCompany;

      // Validation checks
      if (status === "AccountInactive") {
        Alert.alert("User Account is inactive");
      } else if (SignitoryNatid !== UsrId) {
        Alert.alert("Depositer ID is wrong");
      } else if (AgStatus === "AccountInactive") {
        Alert.alert("MFNdogo Account is Inactive");
      } else if (parseFloat(floatBal) < parseFloat(amount)) {
        Alert.alert("Insufficient MFNdogo Balance: Ksh " + floatBal);
      } else if (pw !== agPWd) {
        Alert.alert("MFNdogo access denied");
      } else {
        // Create Float Reduction
        await client.graphql({
          query: createFloatReduction,
          variables: {
            input: {
              depositerid: nationalId,
              agContact: AgentPhn,
              agentName: name,
              userName: grpName,
              amount: parseFloat(amount).toFixed(0),
              status: 'AccountActive'
            }
          }
        });

        // Update Group
        await client.graphql({
          query: updateGroup,
          variables: {
            input: {
              grpContact: nationalId,
              grpBal: (parseFloat(grpBal) + parseFloat(amount)).toFixed(0),
              ttlDpst: (parseFloat(ttlDpst) + parseFloat(amount)).toFixed(0)
            }
          }
        });

        // Update Agent
        await client.graphql({
          query: updateAgent,
          variables: {
            input: {
              phonecontact: AgentPhn,
              TtlFltOut: (parseFloat(TtlFltOut) + parseFloat(amount)).toFixed(0),
              floatBal: (parseFloat(floatBal) - parseFloat(amount)).toFixed(0)
            }
          }
        });

        // Update Company
        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: "BaruchHabaB'ShemAdonai2",
              ttlUsrDep: parseFloat(ttlUsrDep) + parseFloat(amount),
              agentFloatOut: parseFloat(agentFloatOut) + parseFloat(amount)
            }
          }
        });
        Alert.alert(`Ksh. ${amount} deposited in ${grpName}'s account`);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error! Please check your internet connection or retry.");
    } finally {
      setIsLoading(false);
      setNationalid("");
      setAmount("");
      setAgPWd("");
      setAgentPhn("");
      setUsrId("");
    }
  };
  useEffect(() => {
    const UsrIds = UsrId;
    if (!UsrIds && UsrIds !== "") {
      setUsrId("");
      return;
    }
    setUsrId(UsrIds);
  }, [UsrId]);
  useEffect(() => {
    const usId = nationalId;
    if (!usId && usId !== "") {
      setNationalid("");
      return;
    }
    setNationalid(usId);
  }, [nationalId]);
  useEffect(() => {
    const amt = amount;
    if (!amt && amt !== "") {
      setAmount("");
      return;
    }
    setAmount(amt);
  }, [amount]);
  useEffect(() => {
    const pws = agPWd;
    if (!pws && pws !== "") {
      setAgPWd("");
      return;
    }
    setAgPWd(pws);
  }, [agPWd]);
  useEffect(() => {
    const agphn = AgentPhn;
    if (!agphn && agphn !== "") {
      setAgentPhn("");
      return;
    }
    setAgentPhn(agphn);
  }, [AgentPhn]);
  return <View>
      <View>
        
        <ScrollView>
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill Account Details Below</Text>
          </View>

         

          <View style={styles.sendAmtView}>
            <TextInput placeholder="+2547xxxxxxxx" value={nationalId} onChangeText={setNationalid} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Chama Phone Number</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput value={UsrId} onChangeText={setUsrId} secureTextEntry={true} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Signatory ID</Text>
          </View>

         

          <View style={styles.sendAmtView}>
            <TextInput placeholder="+2547xxxxxxxx" value={AgentPhn} onChangeText={setAgentPhn} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>MFNdogo Phone</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput keyboardType={"decimal-pad"} value={amount} onChangeText={setAmount} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Amount</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput value={agPWd} onChangeText={setAgPWd} secureTextEntry={true} style={styles.sendAmtInput} editable={true}></TextInput>
            <Text style={styles.sendAmtText}>MFNdogo PassWord</Text>
          </View>

          <TouchableOpacity onPress={fetchAcDtls} style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Click to Deposit</Text>
            {isLoading && <ActivityIndicator size="large" color="blue" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>;
};
export default SMADepositForm;