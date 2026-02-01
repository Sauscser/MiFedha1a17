import React, { useEffect, useState } from 'react';
import { createCompany } from '../../../src/graphql/mutations';
import { getCompany } from '../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const AdminSignIn = props => {
  const navigation = useNavigation();
  const [PWOnes, setPWOne] = useState("");
  const [PWTwos, setPWTwo] = useState("");
  const [ownr, setownr] = useState(null);
  const GoHome = () => {
    navigation.navigate('Homes');
  };
  const fetchUser = async () => {
    const userInfo = await getCurrentUser();
    setownr(userInfo.userId);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const moveToRegAdmin = () => {
    navigation.navigate("SttinsHm");
  };

  /*
    const CompCreation = async () => {
    try {
      await API.graphql(
        graphqlOperation(createCompany, {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            phoneContact: "0724071582, 0711852707",
            companyEmail: "myfedha@gmail.com",
            termsNconditions: "TERMS AND CONDITIONS",
            alert: "Keeping track of your money is prudent",
            about: "My monies tracker",
            policy: "We are here to serve you",
            privacy: "Our transactions with you are secure",
            recom: "Be alert for any",
            pw1: PWOnes,
            pw2: PWTwos,            
            companyComDisc:0,
            agentwithdrawalFee: 0.02,
            agentCom: 0.6,
            sagentCom: 0.19,
            companyCom: 0.2,
            
            AdvCom: 0.6,
            AdvCompanyCom:0.4,
            bankAdminCom: 0.02,
            sawithdrawalFee: 0.02,
            advuserwithdrawalFee: 0.02,
            bankAdmuserwithdrawalFee: 0.02,
            userLoanTransferFee: 0.02,
              userTransferFee: 0.02,
            chmMmbrTransferFee: 0.02,
            chmTransferFee: 0.02,
            biznaTransferFee: 0.02,
            palpalLnRpymntFee: 0.02,
            chmLnRpymntFee: 0.02,
            crdSllrLnRpymntFee: 0.02,
            userClearanceFee: 0.02,
            
            CoverageFee:0.025,
            vat:0,
            ttlvat:0,
            enquiryFee: 0,
            UsrWthdrwlFees: 0.025,
              ttlNonLonssRecSM: 0,
            ttlNonLonssSentSM:0,
              ttlNonLonssRecChm: 0,
            ttlNonLonssSentChm:0,
          
            companyEarningBal: 0,
            companyEarning: 0,
            agentEarningBal: 0,
            agentEarning: 0,
            saEarningBal: 0,
            saEarning: 0,
            AdvEarningBal: 0,
            AdvEarning: 0,
            admEarningBal: 0,
            admEarning: 0,
          
            ttlUsrDep: 0,
            ttlUserWthdrwl: 0,
            agentFloatIn: 0,
            agentFloatOut: 0,
            ttlActiveUsers: 0,
            ttlInactvUsrs: 0,
            ttlBLUsrs: 0,
            ttlActiveChm: 0,
            ttlInactvChm: 0,
            ttlBLChm: 0,
            ttlActiveChmUsers: 0,
            ttlInactvChmUsrs: 0,
            ttlBLChmUsrs:0,
            ttlKFNdgActv: 0,
            ttlKFNdgInActv: 0,
            ttlKNdgBLStts: 0,
            ttlKFKbwActv: 0,
            ttlKFKbwInActv: 0,
            ttlKKbwBLStts: 0,
            ttlKFAdvActv: 0,
            ttlKFAdvInActv: 0,
            ttlKAdvBLStts: 0,
            ttlKFAdmActv: 0,
            ttlKFAdmInActv: 0,
            ttlKAdmBLStts: 0,
                        
            ttlSMLnsInAmtCov: 0,
            ttlChmLnsInAmtCov: 0,
            ttlSellerLnsInAmtCov: 0,
            ttlSMLnsInActvAmtCov: 0,
            ttlChmLnsInActvAmtCov: 0,
            ttlSellerLnsInActvAmtCov: 0,
            ttlSMLnsInClrdAmtCov: 0,
            ttlChmLnsInClrdAmtCov: 0,
            ttlSellerLnsInClrdAmtCov: 0,
            ttlSMLnsInBlAmtCov: 0,
            ttlChmLnsInBlAmtCov: 0,
            ttlSellerLnsInBlAmtCov: 0,
            
            ttlSMLnsInTymsCov: 0,
            ttlChmLnsInTymsCov: 0,
            ttlSellerLnsInTymsCov: 0,
            ttlSMLnsInActvTymsCov: 0,
            ttlChmLnsInActvTymsCov: 0,
            ttlSellerLnsInActvTymsCov: 0,
            ttlSMLnsInClrdTymsCov: 0,
            ttlChmLnsInClrdTymsCov: 0,
            ttlSellerLnsInClrdTymsCov: 0,
            ttlSMLnsInBlTymsCov: 0,
            ttlChmLnsInBlTymsCov: 0,
            ttlSellerLnsInBlTymsCov: 0,
            
            ttlCompTrnsfrEarningsCov: 0,
            ttlCompBLClrncEarningsCov: 0,
          
            ttlSMLnsInAmtNonCov: 0,
            ttlChmLnsInAmtNonCov: 0,
            ttlSellerLnsInAmtNonCov: 0,
            ttlSMLnsInActvAmtNonCov: 0,
            ttlChmLnsInActvAmtNonCov: 0,
            ttlSellerLnsInActvAmtNonCov: 0,
            ttlSMLnsInClrdAmtNonCov: 0,
            ttlChmLnsInClrdAmtNonCov: 0,
            ttlSellerLnsInClrdAmtNonCov: 0,
            ttlSMLnsInBlAmtNonCov: 0,
            ttlChmLnsInBlAmtNonCov: 0,
            ttlSellerLnsInBlAmtNonCov: 0,
            
            ttlSMLnsInTymsNonCov: 0,
            ttlChmLnsInTymsNonCov: 0,
            ttlSellerLnsInTymsNonCov: 0,
            ttlSMLnsInActvTymsNonCov: 0,
            ttlChmLnsInActvTymsNonCov: 0,
            ttlSellerLnsInActvTymsNonCov: 0,
            ttlSMLnsInClrdTymsNonCov: 0,
            ttlChmLnsInClrdTymsNonCov: 0,
            ttlSellerLnsInClrdTymsNonCov: 0,
            ttlSMLnsInBlTymsNonCov: 0,
            ttlChmLnsInBlTymsNonCov: 0,
            ttlSellerLnsInBlTymsNonCov: 0,
              ttlCompTrnsfrEarningsNonCov: 0,
            ttlCompBLClrncEarningsNonCov: 0,
            ttlCompCovEarnings: 0,
            
            maxBLs:0,
              maxInterestSM: 0.00033,
              maxInterestPwnBrkr:0.05,
            maxInterestCredSllr: 0.00033,
            maxInterestGrp: 0.00033,
            
            maxMFNdogos:100,
              totalLnsRecovered: 0,
            owner:ownr,
            maxDfltPen:20,
            bizBLNo: 0,
            BiznaTNC:"BiznaTNC",
            PayPalTNC: "PayPalTNC",
            ChamaTNC:"ChamaTNC",
            AdvocateTC: "AdvocateTC",
            MFNdogoTC: "MFNdogoTC",
            MFKubwaTC: "MFKubwaTC",
            ChampCom: 1,
            b2bBenCom: 0.3,
            b2pBenCom: 0.3,
            p2pBenCom: 0.3,
            g2pBenCom: 0.3,
            p2BBenCom: 0.3,
            BankMifedhaSyncFee:0.05,
            transportCost: 0.02,
            transportCompanyShare: 0.1
          },
        }),
      );
        
      
    } catch (error) {
      console.log(error)
     
      if(error) {await fetchExDtls ()}
        else {await fetchExDtls ()}
    }
         
      };
       */

  const fetchExDtls = async () => {
    try {
      const ExDtls: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const pw1s = ExDtls.data.getCompany.pw1;
      const pw2s = ExDtls.data.getCompany.pw2;
      const ownersss = ExDtls.data.getCompany.owner;
      if (PWOnes === pw1s && PWTwos === pw2s && ownersss === ownr) {
        moveToRegAdmin();
      } else {
        Alert.alert("Access Denied");
      }
    } catch (e) {
      console.log(e);
      if (e) {
        Alert.alert("Check internet; unauthorised access");
      }
    }
    setPWOne("");
    setPWTwo("");
  };
  useEffect(() => {
    const pw1 = PWOnes;
    if (!pw1 && pw1 !== "") {
      setPWOne("");
      return;
    }
    setPWOne(pw1);
  }, [PWOnes]);
  useEffect(() => {
    const pw2 = PWTwos;
    if (!pw2 && pw2 !== "") {
      setPWTwo("");
      return;
    }
    setPWTwo(pw2);
  }, [PWTwos]);
  return <View>
              <View style={styles.image}>
                <ScrollView>
                <TouchableOpacity onPress={GoHome} style={styles.loanTitleView}>
                    <Text style={styles.title}>Go Home</Text>
                  </TouchableOpacity>
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={PWOnes} onChangeText={setPWOne} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Pass Word1</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput value={PWTwos} onChangeText={setPWTwo} secureTextEntry={true} style={styles.sendLoanInput} editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Pass Word2</Text>
                  </View>
        
                  <TouchableOpacity onPress={fetchExDtls} style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Sign In
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>;
};
export default AdminSignIn;