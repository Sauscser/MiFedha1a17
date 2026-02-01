import React, { useEffect, useState } from 'react';
import Communications from 'react-native-communications';
import { createFloatAdd, createSMAccount, createSMLoansCovered, updateAdvocate, updateAgent, updateBizna, updateCompany, updateReqLoan, updateSAgent, updateSMAccount } from '../../../../../../src/graphql/mutations';
import { getAgent, getCompany, getSMAccount, getSAgent, getAdvocate, listChamasNPwnBrkrs, getReqLoan, listSMLoansCovereds, listCovCreditSellers, listCvrdGroupLoans, getBizna } from '../../../../../../src/graphql/queries';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { parse } from 'expo-linking';
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
const SMASendLns = props => {
  const [SnderPW, setSnderPW] = useState("");
  const [RepaymtPeriod, setRepaymtPeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [AmtExp, setAmtExp] = useState("");
  const [AdvRegNo, setAdvRegNo] = useState("");
  const [Desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [RecAccCode, setRecAccCode] = useState("");
  const [PwnBrkr, setPwnBrkr] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps");
  };
  const fetchLnReq = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const accountDtlszs: any = await client.graphql({
        query: getReqLoan,
        variables: {
          id: route.params.id
        }
      });
      const advLicNo = accountDtlszs.data.getReqLoan.advLicNo;
      const loaneeEmail = accountDtlszs.data.getReqLoan.loaneeEmail;
      const statusNumber = accountDtlszs.data.getReqLoan.statusNumber;
      const status = accountDtlszs.data.getReqLoan.status;
      const amount = accountDtlszs.data.getReqLoan.amount;
      const AmtExp = accountDtlszs.data.getReqLoan.repaymentAmt;
      const RepaymtPeriod = accountDtlszs.data.getReqLoan.repaymentPeriod;
      const defaultPenalty = accountDtlszs.data.getReqLoan.defaultPenalty;
      const description = accountDtlszs.data.getReqLoan.description;
      const advEmail = accountDtlszs.data.getReqLoan.advEmail;
      const loanerEmail = accountDtlszs.data.getReqLoan.loanerEmail;
      const dfltDeadLn = accountDtlszs.data.getReqLoan.dfltDeadLn;
      const installmentAmount = accountDtlszs.data.getReqLoan.installmentAmount;
      const paymentFrequency = accountDtlszs.data.getReqLoan.paymentFrequency;
      const Interest = accountDtlszs.data.getReqLoan.repaymentAmt;
      const DefaultPenaltyRate = parseFloat(defaultPenalty) / parseFloat(AmtExp) * 100;
      const RecomDfltPnltyRate = parseFloat(AmtExp) * 20 / 100;
      const fetchCvLnSM = async () => {
        setIsLoading(true);
        const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
        try {
          const Lonees1: any = await client.graphql({
            query: listSMLoansCovereds,
            variables: {
              filter: {
                and: {
                  status: {
                    eq: "LoanBL"
                  },
                  lonBala: {
                    gt: 0
                  },
                  loaneeEmail: {
                    eq: attributes.email
                  }
                }
              }
            }
          });
          const fetchCLCrdSl = async () => {
            setIsLoading(true);
            try {
              const Lonees3: any = await client.graphql({
                query: listCovCreditSellers,
                variables: {
                  filter: {
                    and: {
                      status: {
                        eq: "LoanBL"
                      },
                      lonBala: {
                        gt: 0
                      },
                      buyerContact: {
                        eq: attributes.email
                      }
                    }
                  }
                }
              });
              const fetchCLChm = async () => {
                setIsLoading(true);
                try {
                  const Lonees5: any = await client.graphql({
                    query: listCvrdGroupLoans,
                    variables: {
                      filter: {
                        and: {
                          status: {
                            eq: "LoanBL"
                          },
                          lonBala: {
                            gt: 0
                          },
                          loaneePhn: {
                            eq: attributes.email
                          }
                        }
                      }
                    }
                  });
                  const fetchBizDtls = async () => {
                    if (isLoading) {
                      return;
                    }
                    setIsLoading(true);
                    try {
                      const accountDtl12: any = await client.graphql({
                        query: getBizna,
                        variables: {
                          BusKntct: loanerEmail
                        }
                      });
                      const email = accountDtl12.data.getBizna.email;
                      const SenderUsrBal = accountDtl12.data.getBizna.netEarnings;
                      const busName = accountDtl12.data.getBizna.busName;
                      const ownerzsxc = accountDtl12.data.getBizna.owner;
                      const objectionStatus = accountDtl12.data.getBizna.objectionStatus;
                      const Admin1 = accountDtl12.data.getBizna.Admin1;
                      const Admin2 = accountDtl12.data.getBizna.Admin2;
                      const Admin3 = accountDtl12.data.getBizna.Admin3;
                      const Admin4 = accountDtl12.data.getBizna.Admin4;
                      const Admin5 = accountDtl12.data.getBizna.Admin5;
                      const Admin6 = accountDtl12.data.getBizna.Admin6;
                      const Admin7 = accountDtl12.data.getBizna.Admin7;
                      const Admin8 = accountDtl12.data.getBizna.Admin8;
                      const Admin9 = accountDtl12.data.getBizna.Admin9;
                      const Admin10 = accountDtl12.data.getBizna.Admin10;
                      const Admin11 = accountDtl12.data.getBizna.Admin11;
                      const Admin12 = accountDtl12.data.getBizna.Admin12;
                      const Admin13 = accountDtl12.data.getBizna.Admin13;
                      const Admin14 = accountDtl12.data.getBizna.Admin14;
                      const Admin15 = accountDtl12.data.getBizna.Admin15;
                      const Admin16 = accountDtl12.data.getBizna.Admin16;
                      const Admin17 = accountDtl12.data.getBizna.Admin17;
                      const Admin18 = accountDtl12.data.getBizna.Admin18;
                      const Admin19 = accountDtl12.data.getBizna.Admin19;
                      const Admin20 = accountDtl12.data.getBizna.Admin20;
                      const Admin21 = accountDtl12.data.getBizna.Admin21;
                      const Admin22 = accountDtl12.data.getBizna.Admin22;
                      const Admin23 = accountDtl12.data.getBizna.Admin23;
                      const Admin24 = accountDtl12.data.getBizna.Admin24;
                      const Admin25 = accountDtl12.data.getBizna.Admin25;
                      const Admin26 = accountDtl12.data.getBizna.Admin26;
                      const Admin27 = accountDtl12.data.getBizna.Admin27;
                      const Admin28 = accountDtl12.data.getBizna.Admin28;
                      const Admin29 = accountDtl12.data.getBizna.Admin29;
                      const Admin30 = accountDtl12.data.getBizna.Admin30;
                      const Admin31 = accountDtl12.data.getBizna.Admin31;
                      const Admin32 = accountDtl12.data.getBizna.Admin32;
                      const Admin33 = accountDtl12.data.getBizna.Admin33;
                      const Admin34 = accountDtl12.data.getBizna.Admin34;
                      const Admin35 = accountDtl12.data.getBizna.Admin35;
                      const Admin36 = accountDtl12.data.getBizna.Admin36;
                      const Admin37 = accountDtl12.data.getBizna.Admin37;
                      const Admin38 = accountDtl12.data.getBizna.Admin38;
                      const Admin39 = accountDtl12.data.getBizna.Admin38;
                      const Admin40 = accountDtl12.data.getBizna.Admin40;
                      const Admin41 = accountDtl12.data.getBizna.Admin41;
                      const Admin42 = accountDtl12.data.getBizna.Admin42;
                      const Admin43 = accountDtl12.data.getBizna.Admin43;
                      const Admin44 = accountDtl12.data.getBizna.Admin44;
                      const Admin45 = accountDtl12.data.getBizna.Admin45;
                      const Admin46 = accountDtl12.data.getBizna.Admin46;
                      const Admin47 = accountDtl12.data.getBizna.Admin47;
                      const Admin48 = accountDtl12.data.getBizna.Admin48;
                      const Admin49 = accountDtl12.data.getBizna.Admin49;
                      const Admin50 = accountDtl12.data.getBizna.Admin50;
                      const fetchSenderUsrDtls = async () => {
                        if (isLoading) {
                          return;
                        }
                        setIsLoading(true);
                        try {
                          const accountDtl: any = await client.graphql({
                            query: getSMAccount,
                            variables: {
                              awsemail: email
                            }
                          });
                          const SenderNatId = accountDtl.data.getSMAccount.nationalid;
                          const today = new Date();
                          let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
                          let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
                          let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
                          let years = (today.getFullYear() < 10 ? '0' : '') + today.getFullYear();
                          let months = (today.getMonth() < 10 ? '0' : '') + today.getMonth();
                          let months2 = parseFloat(months);
                          let days = (today.getDate() < 10 ? '0' : '') + today.getDate();
                          const now: any = years + "-" + "0" + months2 + "-" + days + "T" + hours + ':' + minutes + ':' + seconds;
                          const curYrs = parseFloat(years) * 365;
                          const curMnths = months2 * 30.4375;
                          const daysUpToDate = curYrs + curMnths + parseFloat(days);
                          const fetchCompDtls = async () => {
                            if (isLoading) {
                              return;
                            }
                            setIsLoading(true);
                            try {
                              const CompDtls: any = await client.graphql({
                                query: getCompany,
                                variables: {
                                  AdminId: "BaruchHabaB'ShemAdonai2"
                                }
                              });
                              const userLoanTransferFees = CompDtls.data.getCompany.biznaCredSaleFee;
                              const AdvComs = CompDtls.data.getCompany.AdvCom;
                              const CoverageFees = CompDtls.data.getCompany.CoverageFee;
                              const AdvCompanyComs = CompDtls.data.getCompany.AdvCompanyCom;
                              const AdvCovFee = parseFloat(CoverageFees) * parseFloat(AdvComs);
                              const CompCovFee = parseFloat(CoverageFees) * parseFloat(AdvCompanyComs);
                              const AdvCovAmt = AdvCovFee * parseFloat(amount);
                              const CompCovAmt = CompCovFee * parseFloat(amount);
                              const ttlCovFeeAmount = parseFloat(CoverageFees) * parseFloat(amount);
                              const CompanyTotalEarnings = CompCovFee * parseFloat(amount) + parseFloat(userLoanTransferFees) * parseFloat(amount);
                              const CompPhoneContact = CompDtls.data.getCompany.phoneContact;
                              const ttlCompCovEarningss = CompDtls.data.getCompany.ttlCompCovEarnings;
                              const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
                              const companyEarnings = CompDtls.data.getCompany.companyEarning;
                              const AdvEarningBals = CompDtls.data.getCompany.AdvEarningBal;
                              const AdvEarnings = CompDtls.data.getCompany.AdvEarning;
                              const ttlSMLnsInAmtCovs = CompDtls.data.getCompany.ttlSMLnsInAmtCov;
                              const ttlSMLnsInActvAmtCovs = CompDtls.data.getCompany.ttlSMLnsInActvAmtCov;
                              const ttlSMLnsInTymsCovs = CompDtls.data.getCompany.ttlSMLnsInTymsCov;
                              const ttlSMLnsInActvTymsCovs = CompDtls.data.getCompany.ttlSMLnsInActvTymsCov;
                              const maxInterestSMs = CompDtls.data.getCompany.maxInterestSM;
                              const maxBLss = CompDtls.data.getCompany.maxBLs;
                              const IntAmt = parseFloat(AmtExp) - (parseFloat(amount) + parseFloat(userLoanTransferFees) * parseFloat(amount) + ttlCovFeeAmount);
                              const phoneContacts = CompDtls.data.getCompany.phoneContact;
                              const maxInterestPwnBrkrs = CompDtls.data.getCompany.maxInterestPwnBrkr;
                              const MaxSMInterest = (parseFloat(AmtExp) - (parseFloat(userLoanTransferFees) * parseFloat(amount) + ttlCovFeeAmount)) * parseFloat(maxInterestSMs) * parseFloat(RepaymtPeriod);
                              const MaxPwnBrkrInterest = (parseFloat(amount) + (parseFloat(userLoanTransferFees) * parseFloat(amount) + ttlCovFeeAmount)) * parseFloat(maxInterestPwnBrkrs) * parseFloat(RepaymtPeriod);
                              const ActualMaxSMInterest = parseFloat(AmtExp) - (parseFloat(amount) + parseFloat(userLoanTransferFees) * parseFloat(amount) + ttlCovFeeAmount);
                              const ActualMaxPwnBrkrInterest = parseFloat(AmtExp) - (parseFloat(amount) + parseFloat(userLoanTransferFees) * parseFloat(amount) + ttlCovFeeAmount);
                              const lnTrnsfrFee = parseFloat(userLoanTransferFees) * parseFloat(amount);
                              const TtlTransCost = ttlCovFeeAmount + parseFloat(userLoanTransferFees) * parseFloat(amount) + parseFloat(amount);
                              const AllTtlCost = TtlTransCost + (parseFloat(AmtExp) - parseFloat(amount));
                              const TtlTransCost2 = ttlCovFeeAmount + parseFloat(userLoanTransferFees) * parseFloat(amount) + parseFloat(amount);
                              const CompanyTotalEarnings2 = parseFloat(userLoanTransferFees) * parseFloat(amount);
                              const amtrpayable2 = parseFloat(amount) * Math.pow(1 + parseFloat(Interest) / 36500, 0);
                              const amtrpayable = parseFloat(amount) * Math.pow(1 + parseFloat(Interest) / 36500, 0);
                              const TotalAmtExp = ttlCovFeeAmount + parseFloat(userLoanTransferFees) * parseFloat(amount) + amtrpayable;
                              const TotalAmtExp2 = parseFloat(userLoanTransferFees) * parseFloat(amount) + amtrpayable2;
                              const fetchRecUsrDtls = async () => {
                                if (isLoading) {
                                  return;
                                }
                                setIsLoading(true);
                                try {
                                  const RecAccountDtl: any = await client.graphql({
                                    query: getSMAccount,
                                    variables: {
                                      awsemail: loaneeEmail
                                    }
                                  });
                                  const RecUsrBal = RecAccountDtl.data.getSMAccount.balance;
                                  const RecNatId = RecAccountDtl.data.getSMAccount.nationalid;
                                  const usrNoBL = RecAccountDtl.data.getSMAccount.MaxTymsBL;
                                  const usrAcActvSttss = RecAccountDtl.data.getSMAccount.acStatus;
                                  const phonecontact = RecAccountDtl.data.getSMAccount.phonecontact;
                                  const TtlActvLonsTmsLnrCovss = RecAccountDtl.data.getSMAccount.TtlActvLonsTmsLnrCov;
                                  const TtlActvLonsTmsLneeCovss = RecAccountDtl.data.getSMAccount.TtlActvLonsTmsLneeCov;
                                  const TtlActvLonsTmsLnrCovs1 = RecAccountDtl.data.getSMAccount.TtlActvLonsTmsLnrCov;
                                  const TtlActvLonsAmtLnrCovs1 = RecAccountDtl.data.getSMAccount.TtlActvLonsAmtLnrCov;
                                  const namess = RecAccountDtl.data.getSMAccount.name;
                                  const ttlDpstSMs = RecAccountDtl.data.getSMAccount.ttlDpstSM;
                                  const TtlWthdrwnSMs = RecAccountDtl.data.getSMAccount.TtlWthdrwnSM;
                                  const DefaultPenaltySMs = RecAccountDtl.data.getSMAccount.DefaultPenaltySM;
                                  const sendSMLn = async () => {
                                    if (isLoading) {
                                      return;
                                    }
                                    setIsLoading(true);
                                    try {
                                      await client.graphql({
                                        query: createSMLoansCovered,
                                        variables: {
                                          input: {
                                            loanID: route.params.id,
                                            loaneeid: RecNatId,
                                            loanerId: SenderNatId,
                                            clearanceAmt: 0,
                                            clearanceAmt2: 0,
                                            loanerPhn: loanerEmail,
                                            loaneePhn: phonecontact,
                                            loaneeEmail: loaneeEmail,
                                            loanerLoanee: attributes.email + loaneeEmail,
                                            loanerLoaneeAdv: attributes.email + loaneeEmail + AdvRegNo,
                                            amountgiven: parseFloat(amount).toFixed(0),
                                            loaneename: namess,
                                            loanername: busName,
                                            amountexpected: TotalAmtExp2.toFixed(0),
                                            amountExpectedBackWthClrnc: TotalAmtExp2.toFixed(0),
                                            DefaultPenaltySM: defaultPenalty,
                                            DefaultPenaltySM2: 0,
                                            dfltDeadLn: dfltDeadLn,
                                            crtnDate: daysUpToDate,
                                            amountrepaid: 0,
                                            timeExpBack: parseFloat(RepaymtPeriod) + daysUpToDate,
                                            timeExpBack2: 61 + daysUpToDate,
                                            dfltUpdate: daysUpToDate,
                                            lonBala: TotalAmtExp2.toFixed(0),
                                            repaymentPeriod: RepaymtPeriod,
                                            interest: AmtExp,
                                            advregnu: "None",
                                            lnType: "Biz2Pal",
                                            description: description,
                                            loanerEmail: loanerEmail,
                                            status: "LoanActive",
                                            installmentAmount: installmentAmount,
                                            paymentFrequency: paymentFrequency,
                                            advEmail: "None",
                                            owner: userInfo.userId,
                                            blOfficer: "None"
                                          }
                                        }
                                      });
                                    } catch (error) {
                                      console.log(error);
                                      if (error) {
                                        Alert.alert("Error!");
                                        return;
                                      }
                                    }
                                    setIsLoading(false);
                                    await updtSendrAc();
                                  };
                                  const updtSendrAc = async () => {
                                    if (isLoading) {
                                      return;
                                    }
                                    setIsLoading(true);
                                    try {
                                      await client.graphql({
                                        query: updateBizna,
                                        variables: {
                                          input: {
                                            BusKntct: loanerEmail,
                                            netEarnings: (parseFloat(SenderUsrBal) - TtlTransCost2).toFixed(0)
                                          }
                                        }
                                      });
                                    } catch (error) {
                                      console.log(error);
                                      if (error) {
                                        Alert.alert("Error!");
                                        return;
                                      }
                                    }
                                    setIsLoading(false);
                                    await updtRecAc();
                                  };
                                  const updtRecAc = async () => {
                                    if (isLoading) {
                                      return;
                                    }
                                    setIsLoading(true);
                                    try {
                                      await client.graphql({
                                        query: updateSMAccount,
                                        variables: {
                                          input: {
                                            awsemail: loaneeEmail,
                                            TtlActvLonsTmsLnrCov: parseFloat(TtlActvLonsTmsLnrCovs1) + 1,
                                            TtlActvLonsAmtLnrCov: (parseFloat(TtlActvLonsAmtLnrCovs1) + TotalAmtExp2).toFixed(0),
                                            balance: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0),
                                            loanStatus: "LoanActive",
                                            blStatus: "AccountNotBL",
                                            loanAcceptanceCode: "None"
                                          }
                                        }
                                      });
                                    } catch (error) {
                                      console.log(error);
                                      if (error) {
                                        Alert.alert("Error!");
                                        return;
                                      }
                                    }
                                    setIsLoading(false);
                                    await updtComp();
                                  };
                                  const updtComp = async () => {
                                    if (isLoading) {
                                      return;
                                    }
                                    setIsLoading(false);
                                    try {
                                      await client.graphql({
                                        query: updateCompany,
                                        variables: {
                                          input: {
                                            AdminId: "BaruchHabaB'ShemAdonai2",
                                            companyEarningBal: CompanyTotalEarnings2 + parseFloat(companyEarningBals),
                                            companyEarning: CompanyTotalEarnings2 + parseFloat(companyEarnings),
                                            ttlSMLnsInAmtCov: TotalAmtExp2 + parseFloat(ttlSMLnsInAmtCovs),
                                            ttlSMLnsInTymsCov: 1 + parseFloat(ttlSMLnsInTymsCovs)
                                          }
                                        }
                                      });
                                    } catch (error) {
                                      console.log(error);
                                      if (error) {
                                        Alert.alert("Error!");
                                        return;
                                      }
                                    }
                                    setIsLoading(false);
                                    await updtRecAc3();
                                  };
                                  const updtRecAc3 = async () => {
                                    if (isLoading) {
                                      return;
                                    }
                                    setIsLoading(true);
                                    try {
                                      await client.graphql({
                                        query: updateReqLoan,
                                        variables: {
                                          input: {
                                            id: route.params.id,
                                            status: "Approved"
                                          }
                                        }
                                      });
                                    } catch (error) {
                                      console.log(error);
                                    }
                                    Communications.textWithoutEncoding(phonecontact, 'Hi ' + namess + ', you have been loaned Ksh. ' + parseFloat(amount).toFixed(2) + ' by ' + busName + 'Company. For clarification call the loaner Company: ' + loanerEmail + '. The following is a break down of your repayable loan: ' + ' Amount debited into your main account is Ksh. ' + parseFloat(amount).toFixed(2) + '. Amount you had committed to repay is Ksh. ' + amtrpayable2.toFixed(2) + '. Transaction fee is Ksh. ' + lnTrnsfrFee.toFixed(2) + '. Total Repayable is Ksh ' + TotalAmtExp2.toFixed(2) + '. Thank you. MiFedha.');
                                    setIsLoading(false);
                                  };
                                  const fetchAdv = async () => {
                                    if (isLoading) {
                                      return;
                                    }
                                    setIsLoading(true);
                                    try {
                                      const AdvDtls: any = await client.graphql({
                                        query: getAdvocate,
                                        variables: {
                                          advregnu: advLicNo
                                        }
                                      });
                                      const advTtlAern = AdvDtls.data.getAdvocate.TtlEarnings;
                                      const advBl = AdvDtls.data.getAdvocate.advBal;
                                      const advStts = AdvDtls.data.getAdvocate.status;
                                      const namesssssss = AdvDtls.data.getAdvocate.name;
                                      const sendSMLn = async () => {
                                        if (isLoading) {
                                          return;
                                        }
                                        setIsLoading(true);
                                        try {
                                          await client.graphql({
                                            query: createSMLoansCovered,
                                            variables: {
                                              input: {
                                                loanID: route.params.id,
                                                loaneeid: RecNatId,
                                                loanerId: SenderNatId,
                                                loanerPhn: loanerEmail,
                                                clearanceAmt: 0,
                                                clearanceAmt2: 0,
                                                loaneePhn: phonecontact,
                                                loaneeEmail: loaneeEmail,
                                                loanerLoanee: attributes.email + loaneeEmail,
                                                loanerLoaneeAdv: attributes.email + loaneeEmail + AdvRegNo,
                                                amountgiven: parseFloat(amount).toFixed(0),
                                                loaneename: namess,
                                                loanername: busName,
                                                amountexpected: TotalAmtExp.toFixed(0),
                                                amountExpectedBackWthClrnc: TotalAmtExp.toFixed(0),
                                                DefaultPenaltySM: defaultPenalty,
                                                DefaultPenaltySM2: 0,
                                                dfltDeadLn: dfltDeadLn,
                                                interest: AmtExp,
                                                crtnDate: daysUpToDate,
                                                amountrepaid: 0,
                                                lnType: "Biz2Pal",
                                                timeExpBack: parseFloat(RepaymtPeriod) + daysUpToDate,
                                                timeExpBack2: 61 + daysUpToDate,
                                                dfltUpdate: daysUpToDate,
                                                lonBala: TotalAmtExp.toFixed(0),
                                                repaymentPeriod: RepaymtPeriod,
                                                advregnu: advLicNo,
                                                description: description,
                                                loanerEmail: loanerEmail,
                                                status: "LoanActive",
                                                owner: userInfo.userId,
                                                blOfficer: "None",
                                                advEmail: advEmail,
                                                installmentAmount: installmentAmount,
                                                paymentFrequency: paymentFrequency
                                              }
                                            }
                                          });
                                        } catch (error) {
                                          console.log(error);
                                          if (error) {
                                            Alert.alert("Error!");
                                            return;
                                          }
                                        }
                                        setIsLoading(false);
                                        await updtSendrAc();
                                      };
                                      sendSMLn();
                                      const updtSendrAc = async () => {
                                        if (isLoading) {
                                          return;
                                        }
                                        setIsLoading(true);
                                        try {
                                          await client.graphql({
                                            query: updateBizna,
                                            variables: {
                                              input: {
                                                BusKntct: loanerEmail,
                                                netEarnings: (parseFloat(SenderUsrBal) - TtlTransCost).toFixed(0)
                                              }
                                            }
                                          });
                                        } catch (error) {
                                          console.log(error);
                                          if (error) {
                                            Alert.alert("Error!");
                                            return;
                                          }
                                        }
                                        setIsLoading(false);
                                        await updtRecAc();
                                      };
                                      const updtRecAc = async () => {
                                        if (isLoading) {
                                          return;
                                        }
                                        setIsLoading(true);
                                        try {
                                          await client.graphql({
                                            query: updateSMAccount,
                                            variables: {
                                              input: {
                                                awsemail: loaneeEmail,
                                                TtlActvLonsTmsLnrCov: parseFloat(TtlActvLonsTmsLnrCovs1) + 1,
                                                TtlActvLonsAmtLnrCov: (parseFloat(TtlActvLonsAmtLnrCovs1) + TotalAmtExp).toFixed(0),
                                                balance: (parseFloat(RecUsrBal) + parseFloat(amount)).toFixed(0),
                                                loanStatus: "LoanActive",
                                                blStatus: "AccountNotBL",
                                                loanAcceptanceCode: "None"
                                              }
                                            }
                                          });
                                        } catch (error) {
                                          console.log(error);
                                          if (error) {
                                            Alert.alert("Error!");
                                            return;
                                          }
                                        }
                                        setIsLoading(false);
                                        await updtComp();
                                      };
                                      const updtComp = async () => {
                                        if (isLoading) {
                                          return;
                                        }
                                        setIsLoading(false);
                                        try {
                                          await client.graphql({
                                            query: updateCompany,
                                            variables: {
                                              input: {
                                                AdminId: "BaruchHabaB'ShemAdonai2",
                                                ttlCompCovEarnings: CompCovAmt + parseFloat(ttlCompCovEarningss),
                                                AdvEarningBal: AdvCovAmt + parseFloat(AdvEarningBals),
                                                AdvEarning: AdvCovAmt + parseFloat(AdvEarnings),
                                                companyEarningBal: CompanyTotalEarnings + parseFloat(companyEarningBals),
                                                companyEarning: CompanyTotalEarnings + parseFloat(companyEarnings),
                                                ttlSMLnsInAmtCov: TotalAmtExp + parseFloat(ttlSMLnsInAmtCovs),
                                                ttlSMLnsInTymsCov: 1 + parseFloat(ttlSMLnsInTymsCovs)
                                              }
                                            }
                                          });
                                        } catch (error) {
                                          console.log(error);
                                          if (error) {
                                            Alert.alert("Error!");
                                            return;
                                          }
                                        }
                                        setIsLoading(false);
                                        await updtAdv();
                                      };
                                      const updtAdv = async () => {
                                        if (isLoading) {
                                          return;
                                        }
                                        setIsLoading(true);
                                        try {
                                          await client.graphql({
                                            query: updateAdvocate,
                                            variables: {
                                              input: {
                                                advregnu: advLicNo,
                                                advBal: (AdvCovAmt + parseFloat(advBl)).toFixed(0),
                                                TtlEarnings: (AdvCovAmt + parseFloat(advTtlAern)).toFixed(0)
                                              }
                                            }
                                          });
                                        } catch (error) {
                                          console.log(error);
                                          if (error) {
                                            Alert.alert("Error!");
                                            return;
                                          }
                                        }
                                        Alert.alert("Success. AdvocateFee:" + (parseFloat(CoverageFees) * parseFloat(amount)).toFixed(2) + ", TransactionFee:" + (parseFloat(userLoanTransferFees) * parseFloat(amount)).toFixed(2));
                                        setIsLoading(false);
                                        await updtRecAc3();
                                      };
                                      const updtRecAc3 = async () => {
                                        if (isLoading) {
                                          return;
                                        }
                                        setIsLoading(true);
                                        try {
                                          await client.graphql({
                                            query: updateReqLoan,
                                            variables: {
                                              input: {
                                                id: route.params.id,
                                                status: "Approved"
                                              }
                                            }
                                          });
                                        } catch (error) {
                                          console.log(error);
                                        }
                                        Communications.textWithoutEncoding(phonecontact, 'Hi ' + namess + ', you have been loaned Ksh. ' + parseFloat(amount).toFixed(2) + ' by ' + busName + '. For clarification call the loaner: ' + attributes.phone_number + '. The following is a break down of your repayable loan: ' + ' Amount debited into your main account is Ksh. ' + parseFloat(amount).toFixed(2) + '. Amount you had committed to repay is Ksh. ' + amtrpayable.toFixed(2) + '. Transaction fee is Ksh. ' + lnTrnsfrFee.toFixed(2) + '. Advocacy fee is Ksh. ' + ttlCovFeeAmount.toFixed(2) + '. Total Repayable is Ksh ' + TotalAmtExp.toFixed(2) + '. Thank you. MiFedha.');
                                        setIsLoading(false);
                                      };
                                    } catch (e) {
                                      console.log(e);
                                      if (e) {
                                        Alert.alert("Error! No advocate involved during request");
                                        return;
                                      }
                                    }
                                    setIsLoading(false);
                                  };
                                  if (parseFloat(usrNoBL) > parseFloat(maxBLss)) {
                                    Alert.alert('Unsuccessful....Apologies. Liase with the Loaned');
                                    return;
                                  } else if (parseFloat(ttlDpstSMs) === 0 && parseFloat(TtlWthdrwnSMs) === 0) {
                                    Alert.alert('Loanee ID be verified through deposit at MFNdogo');
                                  } else if (status === "Approved") {
                                    Alert.alert('Loan already granted');
                                  } else if (statusNumber === 0 && advLicNo != "None") {
                                    Alert.alert('Advocate has not yet witnessed');
                                  } else if (usrAcActvSttss !== "AccountActive") {
                                    Alert.alert('Receiver account is inactive');
                                  } else if (objectionStatus === "Objected") {
                                    Alert.alert('Business account locked by the creator or admin');
                                  } else if (parseFloat(SenderUsrBal) < TtlTransCost) {
                                    Alert.alert("Cancelled." + "Bal: " + SenderUsrBal + ". Deductable: " + TtlTransCost.toFixed(2) + ". " + (TtlTransCost - parseFloat(SenderUsrBal)).toFixed(2) + ' more needed');
                                  } else if (userInfo.userId !== ownerzsxc && Admin1 !== attributes.email && Admin2 !== attributes.email && Admin3 !== attributes.email && Admin4 !== attributes.email && Admin5 !== attributes.email && Admin6 !== attributes.email && Admin7 !== attributes.email && Admin8 !== attributes.email && Admin9 !== attributes.email && Admin10 !== attributes.email && Admin11 !== attributes.email && Admin12 !== attributes.email && Admin13 !== attributes.email && Admin14 !== attributes.email && Admin14 !== attributes.email && Admin15 !== attributes.email && Admin16 !== attributes.email && Admin17 !== attributes.email && Admin18 !== attributes.email && Admin19 !== attributes.email && Admin20 !== attributes.email && Admin21 !== attributes.email && Admin22 !== attributes.email && Admin23 !== attributes.email && Admin24 !== attributes.email && Admin25 !== attributes.email && Admin26 !== attributes.email && Admin27 !== attributes.email && Admin28 !== attributes.email && Admin29 !== attributes.email && Admin30 !== attributes.email && Admin31 !== attributes.email && Admin32 !== attributes.email && Admin33 !== attributes.email && Admin34 !== attributes.email && Admin35 !== attributes.email && Admin36 !== attributes.email && Admin37 !== attributes.email && Admin38 !== attributes.email && Admin39 !== attributes.email && Admin40 !== attributes.email && Admin41 !== attributes.email && Admin42 !== attributes.email && Admin43 !== attributes.email && Admin44 !== attributes.email && Admin45 !== attributes.email && Admin46 !== attributes.email && Admin47 !== attributes.email && Admin48 !== attributes.email && Admin49 !== attributes.email && Admin50 !== attributes.email) {
                                    Alert.alert("Unauthorised to pay on behalf of the business!");
                                    return;
                                  } else if (Lonees1.data.listSMLoansCovereds.items.length > 0 && Lonees3.data.listCovCreditSellers.items.length > 0 && Lonees5.data.listCvrdGroupLoans.items.length > 0) {
                                    SndChmMmbrMny();
                                  } else if (advLicNo == "None") {
                                    sendSMLn();
                                  } else {
                                    await fetchAdv();
                                  }
                                } catch (e) {
                                  console.log(e);
                                  if (e) {
                                    Alert.alert("Error!");
                                    return;
                                  }
                                }
                                setIsLoading(false);
                              };
                              await fetchRecUsrDtls();
                            } catch (e) {
                              console.log(e);
                              if (e) {
                                Alert.alert("Error!");
                                return;
                              }
                            }
                            setIsLoading(false);
                          };
                          await fetchCompDtls();
                        } catch (e) {
                          console.log(e);
                          if (e) {
                            Alert.alert("Error!");
                            return;
                          }
                        }
                        setIsLoading(false);
                      };
                      await fetchSenderUsrDtls();
                    } catch (e) {
                      console.log(e);
                      if (e) {
                        Alert.alert("Error!");
                        return;
                      }
                    }
                    setIsLoading(false);
                  };
                  await fetchBizDtls();
                } catch (e) {
                  console.log(e);
                  if (e) {
                    Alert.alert("Error!");
                    return;
                  }
                }
                setIsLoading(false);
              };
              await fetchCLChm();
            } catch (e) {
              console.log(e);
              if (e) {
                Alert.alert("Error!");
                return;
              }
            }
            setIsLoading(false);
          };
          await fetchCLCrdSl();
        } catch (e) {
          console.log(e);
          if (e) {
            Alert.alert("Error!");
            return;
          }
        }
        setIsLoading(false);
      };
      await fetchCvLnSM();
    } catch (e) {
      console.log(e);
      if (e) {
        Alert.alert("Error!");
        return;
      }
    }
    ;
    setIsLoading(false);
    setAmount("");
    setAdvRegNo("");
    setAmtExp("");
    setDesc("");
    setSnderPW("");
    setRepaymtPeriod("");
    setRecAccCode("");
    setPwnBrkr("");
  };
  useEffect(() => {
    const PwnBrkrs = PwnBrkr;
    if (!PwnBrkrs && PwnBrkrs !== "") {
      setPwnBrkr("");
      return;
    }
    setPwnBrkr(PwnBrkrs);
  }, [PwnBrkr]);
  useEffect(() => {
    const amt = amount;
    if (!amt && amt !== "") {
      setAmount("");
      return;
    }
    setAmount(amt);
  }, [amount]);
  useEffect(() => {
    const AdvRegNoss = AdvRegNo;
    if (!AdvRegNoss && AdvRegNoss !== "") {
      setAdvRegNo("");
      return;
    }
    setAdvRegNo(AdvRegNoss);
  }, [AdvRegNo]);
  useEffect(() => {
    const AmtExpss = AmtExp;
    if (!AmtExpss && AmtExpss !== "") {
      setAmtExp("");
      return;
    }
    setAmtExp(AmtExpss);
  }, [AmtExp]);
  useEffect(() => {
    const descr = Desc;
    if (!descr && descr !== "") {
      setDesc("");
      return;
    }
    setDesc(descr);
  }, [Desc]);
  useEffect(() => {
    const SnderPWss = SnderPW;
    if (!SnderPWss && SnderPWss !== "") {
      setSnderPW("");
      return;
    }
    setSnderPW(SnderPWss);
  }, [SnderPW]);
  useEffect(() => {
    const RepaymtPeriods = RepaymtPeriod;
    if (!RepaymtPeriods && RepaymtPeriods !== "") {
      setRepaymtPeriod("");
      return;
    }
    setRepaymtPeriod(RepaymtPeriods);
  }, [RepaymtPeriod]);
  useEffect(() => {
    const RecAccCodes = RecAccCode;
    if (!RecAccCodes && RecAccCodes !== "") {
      setRecAccCode("");
      return;
    }
    setRecAccCode(RecAccCodes);
  }, [RecAccCode]);
  return <View style={styles.image}>
        <ScrollView>
         
        

         <TouchableOpacity onPress={fetchLnReq} style={styles.sendAmtButton}>
           <Text style={styles.sendAmtButtonText}>Click to loan</Text>
           {isLoading && <ActivityIndicator size="large" color="blue" />}
         </TouchableOpacity>

         
       </ScrollView>
      </View>;
};
export default SMASendLns;