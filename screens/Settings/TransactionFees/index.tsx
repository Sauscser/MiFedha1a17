import React, { useEffect, useState } from 'react';
import { updateCompany, updateGroup, updateGrpMembers, updateSMAccount } from '../../../src/graphql/mutations';
import { getCompany, getGroup, getGrpMembers, getSMAccount } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { updateBankAdmin } from '../../../src/graphql/mutations';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const UpdtSMPW = props => {
  const navigation = useNavigation();
  const [LnTrFee, setLnTrFee] = useState("");
  const [UsrTrFee, setUsrTrFee] = useState("");
  const [UsrClrnceFee, setUsrClrnceFee] = useState("");
  const [CovFee, setCovFee] = useState("");
  const [EnqFee, setEnqFee] = useState("");
  const [WthdrwlFee, setWthdrwlFee] = useState("");
  const [LnAcCod, setLnAcCod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchSMDtls = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const userInfo = await fetchUserAttributes();
    try {
      const compDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const owners = compDtls.data.getCompany.owner;
      const fetchSMDtls = async () => {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        try {
          const updtSMDtls = async () => {
            if (isLoading) {
              return;
            }
            setIsLoading(true);
            try {
              await client.graphql({
                query: updateCompany,
                variables: {
                  input: {
                    AdminId: "BaruchHabaB'ShemAdonai2",
                    userLoanTransferFee: LnTrFee,
                    userTransferFee: UsrTrFee,
                    userClearanceFee: UsrClrnceFee,
                    CoverageFee: CovFee,
                    enquiryFee: EnqFee,
                    UsrWthdrwlFees: WthdrwlFee
                  }
                }
              });
            } catch (error) {
              if (error) {
                console.log(error);
                Alert.alert("Please check internet");
              }
            }
            setIsLoading(false);
            Alert.alert("You have successfully updated Company Transfer Fees");
          };
          if (userInfo.owner !== owners) {
            Alert.alert("You are not the author of this Account");
          } else {
            updtSMDtls();
          }
        } catch (error) {
          if (error) {
            Alert.alert("Check internet; otherwise Usr doesnt exist");
            return;
          }
        }
      };
      await fetchSMDtls();
    } catch (error) {
      if (error) {
        Alert.alert("Check internet; otherwise Chama doesnt exist");
        return;
      }
    }
    setIsLoading(false);
    setLnTrFee("");
    setUsrTrFee("");
    setUsrClrnceFee("");
    setCovFee("");
    setEnqFee("");
    setWthdrwlFee("");
    setLnAcCod("");
  };
  useEffect(() => {
    const LnTrFees = LnTrFee;
    if (!LnTrFees && LnTrFees !== "") {
      setLnTrFee("");
      return;
    }
    setLnTrFee(LnTrFees);
  }, [LnTrFee]);
  useEffect(() => {
    const UsrTrFees = UsrTrFee;
    if (!UsrTrFees && UsrTrFees !== "") {
      setUsrTrFee("");
      return;
    }
    setUsrTrFee(UsrTrFees);
  }, [UsrTrFee]);
  useEffect(() => {
    const UsrClrnceFees = UsrClrnceFee;
    if (!UsrClrnceFees && UsrClrnceFees !== "") {
      setUsrClrnceFee("");
      return;
    }
    setUsrClrnceFee(UsrClrnceFees);
  }, [UsrClrnceFee]);
  useEffect(() => {
    const CovFees = CovFee;
    if (!CovFees && CovFees !== "") {
      setCovFee("");
      return;
    }
    setCovFee(CovFees);
  }, [CovFee]);
  useEffect(() => {
    const EnqFees = EnqFee;
    if (!EnqFees && EnqFees !== "") {
      setEnqFee("");
      return;
    }
    setEnqFee(EnqFees);
  }, [EnqFee]);
  useEffect(() => {
    const WthdrwlFees = WthdrwlFee;
    if (!WthdrwlFees && WthdrwlFees !== "") {
      setWthdrwlFee("");
      return;
    }
    setWthdrwlFee(WthdrwlFees);
  }, [WthdrwlFee]);
  useEffect(() => {
    const LnAcCods = LnAcCod;
    if (!LnAcCods && LnAcCods !== "") {
      setLnAcCod("");
      return;
    }
    setLnAcCod(LnAcCods);
  }, [LnAcCod]);
  return <View>
              <View style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Ac Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput keyboardType={"decimal-pad"} value={LnTrFee} onChangeText={setLnTrFee} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Loan Fee</Text>
                  </View>   

                  <View style={styles.sendLoanView}>
                    <TextInput keyboardType={"decimal-pad"} value={UsrTrFee} onChangeText={setUsrTrFee} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>NonLn Fee</Text>
                  </View>    

                  <View style={styles.sendLoanView}>
                    <TextInput keyboardType={"decimal-pad"} value={UsrClrnceFee} onChangeText={setUsrClrnceFee} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Clearance Fee</Text>
                  </View>   

                  <View style={styles.sendLoanView}>
                    <TextInput keyboardType={"decimal-pad"} value={CovFee} onChangeText={setCovFee} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Coverage Fee</Text>
                  </View>         

                  <View style={styles.sendLoanView}>
                    <TextInput keyboardType={"decimal-pad"} value={EnqFee} onChangeText={setEnqFee} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Enquiry Fee</Text>
                  </View>   

                  <View style={styles.sendLoanView}>
                    <TextInput keyboardType={"decimal-pad"} value={WthdrwlFee} onChangeText={setWthdrwlFee} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Withdrawal Fee</Text>
                  </View>              

                  <TouchableOpacity onPress={fetchSMDtls} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Update Comp Details
                    </Text>
                    {isLoading && <ActivityIndicator color={'Blue'} size="large" />}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default UpdtSMPW;