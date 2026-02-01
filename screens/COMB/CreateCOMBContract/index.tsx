import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { createCombContract, createMessages, sendNotification } from "../../../src/graphql/mutations";
import { getBizna, getSMAccount, listCombPersonels } from "../../../src/graphql/queries";

/* ---------------- TYPES ---------------- */
type PartyType = "funderTypePal" | "funderTypeBiz";
type PartyType2 = "consumerTypePal" | "consumerTypeBiz";
type PrePostPay = "PREPAID" | "POSTPAID";
type PriceFlag = "NORMAL" | "ABOVE_REFERENCE" | "SUSPICIOUS" | "FRAUD_RISK" | "NO_MARKET_DATA";
type FormState = {
  consumerType: PartyType2;
  consumerEmail?: string;
  consumerOfficerEmail?: string;
  consumerAccount?: string;
  funderType: PartyType;
  funderEmail?: string;
  funderOfficerEmail?: string;
  funderAccount?: string;
  capConsumption: boolean;
  consumptionCapping?: string;
  consumptionMargin?: string;
  updateFrequency?: string;
  repaymentPeriod?: string;
  MiFedhaMarketDev?: string;
  allMarketDev?: string;
  pword?: string;
};

/* ---------------- COMPONENT ---------------- */
const client = generateClient();
const CreateCombContractScreen: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    consumerType: "consumerTypePal",
    funderType: "funderTypePal",
    capConsumption: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const update = <K extends keyof FormState,>(k: K, v: FormState[K]) => setForm(p => ({
    ...p,
    [k]: v
  }));

  /* ---------------- VALIDATION ---------------- */
  const getRequiredFields = (form: FormState) => {
    const required: {
      field: keyof FormState;
      label: string;
    }[] = [];
    if (form.consumerType === "consumerTypePal") {
      required.push({
        field: "consumerEmail",
        label: "Consumer Email"
      });
    } else {
      required.push({
        field: "consumerAccount",
        label: "Consumer Business Account"
      }, {
        field: "consumerOfficerEmail",
        label: "Consumer Officer Email"
      });
    }
    if (form.funderType === "funderTypeBiz") {
      required.push({
        field: "funderAccount",
        label: "Funder Business Account"
      }, {
        field: "funderOfficerEmail",
        label: "Funder Officer Email"
      });
    }
    required.push({
      field: "pword",
      label: "Main Account Password"
    });
    if (form.capConsumption) {
      required.push({
        field: "consumptionCapping",
        label: "Consumption Capping"
      }, {
        field: "consumptionMargin",
        label: "Consumption Margin"
      }, {
        field: "updateFrequency",
        label: "Update Frequency"
      }, {
        field: "repaymentPeriod",
        label: "Payment Period"
      }, {
        field: "MiFedhaMarketDev",
        label: "MiFedha Market Deviation Margin"
      }, {
        field: "allMarketDev",
        label: "All Market Deviation"
      });
    }
    return required;
  };
  const validateForm = (form: FormState) => {
    const required = getRequiredFields(form);
    for (const {
      field,
      label
    } of required) {
      if (!form[field] || form[field]?.toString().trim() === "") {
        Alert.alert("Missing Field", `${label} is required.`);
        return false;
      }
    }
    return true;
  };

  /* ---------------- CREATE CONTRACT ---------------- */
  const handleCreateContract = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (!validateForm(form)) {
      setIsLoading(false);
      return;
    }
    try {
      const userInfo = await getCurrentUser();
      const attrs = await fetchUserAttributes();
      const loggedInEmail = attrs.email;

      /* ---------------- CONSUMER ---------------- */
      let consumerEmail = "";
      let consumerAccount = "";
      let consumerOfficerName = "";
      let consumerContact = "";
      let consumerName = "";
      if (form.consumerType === "consumerTypePal") {
        const res: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: form.consumerEmail
          }
        });
        const acc = res?.data?.getSMAccount;
        if (!acc) throw new Error("Consumer account not found");
        consumerEmail = form.consumerEmail!;
        consumerAccount = form.consumerEmail!;
        consumerOfficerName = acc.name || "Officer";
        consumerContact = acc.phonecontact || "N/A";
        consumerName = acc.name || "Officer";
      } else {
        const bizRes: any = await client.graphql({
          query: getBizna,
          variables: {
            BusKntct: form.consumerAccount
          }
        });
        const biz = bizRes?.data?.getBizna;
        if (!biz) throw new Error("Consumer business not found");
        const officerRes: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: form.consumerOfficerEmail
          }
        });
        const officer = officerRes?.data?.getSMAccount;
        if (!officer) throw new Error("Consumer officer not found");
        const personnelRes: any = await client.graphql({
          query: listCombPersonels,
          variables: {
            filter: {
              and: {
                phoneKontact: {
                  eq: form.consumerOfficerEmail
                },
                BusinessRegNo: {
                  eq: form.consumerAccount
                }
              }
            }
          }
        });
        if (!personnelRes?.data?.listCombPersonels?.items?.length) throw new Error("Consumer officer is not registered for this institution");
        consumerEmail = form.consumerOfficerEmail!;
        consumerAccount = form.consumerAccount!;
        consumerOfficerName = officer.name || "Officer";
        consumerContact = biz.bizContact || "N/A";
        consumerName = biz.busName || "N/A";
      }

      /* ---------------- FUNDER ---------------- */
      let funderEmail = "";
      let funderAccount = "";
      let funderOfficerName = "";
      let funderContact = "";
      let funderName = "";
      if (form.funderType === "funderTypePal") {
        const res: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: loggedInEmail
          }
        });
        const acc = res?.data?.getSMAccount;
        if (!acc) throw new Error("Your funder account was not found");
        if (userInfo.userId !== acc.owner) throw new Error("This is not your account");
        if (form.pword !== acc.pw) throw new Error("Wrong main account password");
        funderEmail = loggedInEmail;
        funderAccount = loggedInEmail;
        funderOfficerName = acc.name || "Officer";
        funderContact = acc.phonecontact || "N/A";
        funderName = acc.name || "Officer";
      } else {
        const bizRes: any = await client.graphql({
          query: getBizna,
          variables: {
            BusKntct: form.funderAccount
          }
        });
        const biz = bizRes?.data?.getBizna;
        if (!biz) throw new Error("Funder business not found");
        const officerRes: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: form.funderOfficerEmail
          }
        });
        const officer = officerRes?.data?.getSMAccount;
        if (!officer) throw new Error("Funder officer not found");
        if (userInfo.userId !== officer.owner) throw new Error("This is not your account");
        if (form.pword !== officer.pw) throw new Error("Wrong main account password");
        const personnelRes: any = await client.graphql({
          query: listCombPersonels,
          variables: {
            filter: {
              and: {
                phoneKontact: {
                  eq: form.funderOfficerEmail
                },
                BusinessRegNo: {
                  eq: form.funderAccount
                }
              }
            }
          }
        });
        if (!personnelRes?.data?.listCombPersonels?.items?.length) throw new Error("Funder officer is not registered for this institution");
        funderEmail = form.funderOfficerEmail!;
        funderAccount = form.funderAccount!;
        funderOfficerName = officer.name || "Officer";
        funderContact = biz.bizContact || "N/A";
        funderName = biz.busName || "Officer";
      }
      if (consumerAccount === funderAccount) throw new Error("Consumer and funder cannot be the same");

      /* ---------------- CONTRACT ---------------- */
      const isCapped = form.capConsumption;
      const prepostPay: PrePostPay = isCapped ? "POSTPAID" : "PREPAID";
      const input = {
        marketItemID: "SYSTEM",
        itemName: "SYSTEM",
        itemBrand: "SYSTEM",
        itemSpecifications: "SYSTEM",
        numberOfItems: 0,
        itemPrice: 0,
        marketConsumptionPrice: isCapped ? parseFloat(form.consumptionMargin || "0") : 0,
        marketConsumptionFrequency: isCapped ? parseFloat(form.MiFedhaMarketDev || "0") : 0,
        marketConsumptionTotal: isCapped ? parseFloat(form.allMarketDev || "0") : 0,
        consumerType: form.consumerType,
        consumerEmail,
        consumerAccount,
        consumerOfficerName,
        consumerContact,
        consumerName,
        funderType: form.funderType,
        funderEmail,
        funderAccount,
        funderOfficerName,
        funderContact,
        funderName,
        sellerName: "",
        sellerEmail: consumerEmail,
        sellerAccount: "None",
        sellerOfficerName: "",
        priceFlag: "NORMAL" as PriceFlag,
        marketConsumptionStatus: "Pending",
        accStatus: "Active",
        consumptionMarginStatus: isCapped ? "Active" : "Cancelled",
        consumptionCapping: isCapped ? parseFloat(form.consumptionCapping || "0") : 0,
        consumptionMargin: isCapped ? parseFloat(form.consumptionMargin || "0") : 0,
        updateFrequency: isCapped ? form.updateFrequency || "Daily" : "Daily",
        repaymentPeriod: isCapped ? parseFloat(form.repaymentPeriod || "0") : 0,
        prepostPay,
        lastUpdateTime: new Date().toISOString(),
        settlementTime: "None",
        referencePriceSource: "SYSTEM",
        priceDeviation: 0,
        referencePrice: 0,
        generalPriceDev: 0,
        createdAt: new Date().toISOString(),
        advertStatus: "Pending",
        sellerType: "sellerTypePal"
      };
      await client.graphql({
        query: createCombContract,
        variables: {
          input
        }
      });
      await client.graphql({
        query: createMessages,
        variables: {
          input: {
            senderEmail: consumerEmail,
            messageBody: "You have a COMB contract. Go to COMB and link a seller as per your funder's specifications."
          }
        }
      });
      await client.graphql({
        query: sendNotification,
        variables: {
          riderEmail: consumerEmail,
          title: "MiFedha: COMB Contract",
          body: "You have a COMB contract. Proceed to link a seller as per your funder's specifications."
        }
      });
      Alert.alert("Success", "COMB contract created successfully");
      setForm({
        consumerType: "consumerTypePal",
        funderType: "funderTypePal",
        capConsumption: false,
        pword: ""
      });
    } catch (err: any) {
      console.log(err);
      Alert.alert("Error", err.message || "Ensure you enter details correctly!");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return <LinearGradient colors={["#e58d29", "skyblue"]} style={{
    flex: 1
  }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create COMB Contract</Text>

        {/* --- UI remains the same as your original --- */}
        {/* Consumer Type, Funder Type, Capping Inputs, Password, Submit Button */}
        {/* Reuse the exact same JSX as your previous file */}
      </ScrollView>
    </LinearGradient>;
};

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    padding: 18
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12
  },
  label: {
    color: "#fff",
    marginBottom: 6
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12
  },
  passwordRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center"
  },
  eyeButton: {
    marginLeft: 8,
    backgroundColor: "#e58d29",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  chip: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  chipActive: {
    backgroundColor: "#1b6cff"
  },
  chipText: {
    color: "#000"
  },
  button: {
    backgroundColor: "#1b6cff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700"
  }
});
export default CreateCombContractScreen;