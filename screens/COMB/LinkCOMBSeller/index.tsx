import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute, RouteProp } from "@react-navigation/native";
import { createMessages, sendNotification, updateCombContract } from "../../../src/graphql/mutations";
import { getBizna, getCombContract, getSMAccount, listCombPersonels } from "../../../src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
const client = generateClient();
type RouteParams = {
  id: string;
};
type SellerType = "sellerTypePal" | "sellerTypeBiz" | "";
type FormState = {
  sellerEmail: string;
  sellerAccount: string;
  sellerContact: string;
  sellerType: SellerType;
  sellerName: string;
  sellerOfficerName: string;
};
const UpdateCombSellerScreen: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const [form, setForm] = useState<FormState>({
    sellerEmail: "",
    sellerAccount: "",
    sellerContact: "",
    sellerType: "",
    sellerName: "",
    sellerOfficerName: ""
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const update = <K extends keyof FormState,>(k: K, v: FormState[K]) => setForm(p => ({
    ...p,
    [k]: v
  }));
  const handleUpdateSeller = async () => {
    if (!form.sellerType) {
      Alert.alert("Validation", "Select seller type.");
      return;
    }
    if (form.sellerType === "sellerTypeBiz" && (!form.sellerAccount || !form.sellerEmail)) {
      Alert.alert("Validation", "Enter business and officer details.");
      return;
    }
    if (form.sellerType === "sellerTypePal" && !form.sellerEmail) {
      Alert.alert("Validation", "Enter seller main account email.");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    try {
      // Authenticate current user
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const accountRex: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const myAccountz = accountRex?.data?.getSMAccount;
      if (!myAccountz || password !== myAccountz.pw) {
        Alert.alert("Authentication", "Incorrect password or account not found.");
        setIsLoading(false);
        return;
      }

      // Variables to store fetched data for mutation
      let sellerName = "";
      let sellerOfficerName = "";
      let sellerContact = "";
      if (form.sellerType === "sellerTypePal") {
        // Fetch individual account details
        const accountRes: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: form.sellerEmail
          }
        });
        sellerName = accountRes?.data?.getSMAccount.name;
        sellerOfficerName = sellerName;
        sellerContact = accountRes?.data?.getSMAccount.phonecontact;
        setForm(p => ({
          ...p,
          sellerName,
          sellerOfficerName,
          sellerContact
        }));
      }
      if (form.sellerType === "sellerTypeBiz") {
        // Fetch business details
        const BizRes: any = await client.graphql({
          query: getBizna,
          variables: {
            BusKntct: form.sellerAccount
          }
        });
        const busName = BizRes?.data?.getBizna.busName;
        const bizContact = BizRes?.data?.getBizna.bizContact;

        // Fetch officer details
        const accountRes: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: form.sellerEmail
          }
        });
        const officerName = accountRes?.data?.getSMAccount.name;
        const COMBContract: any = await client.graphql({
          query: getCombContract,
          variables: {
            id: route.params.id
          }
        });
        const COMBContractDtls = COMBContract?.data?.getCombContract;
        if (COMBContractDtls.consumerAccount === form.sellerAccount) {
          Alert.alert("The seller cannot sell to oneself");
          return;
        }
        if (COMBContractDtls.funderAccount === form.sellerAccount) {
          Alert.alert("The seller cannot pay/fund to oneself");
          return;
        }

        // Check personnel list
        const personnelRes: any = await client.graphql({
          query: listCombPersonels,
          variables: {
            filter: {
              phoneKontact: {
                eq: form.sellerEmail
              },
              BusinessRegNo: {
                eq: form.sellerAccount
              }
            }
          }
        });
        const personnel = personnelRes?.data?.listCombPersonels?.items;
        if (personnel.length === 0) {
          Alert.alert("Warning", "This Institution Officer is not authorised to sell. Contact manually.");
          setIsLoading(false);
          return;
        }
        sellerName = busName;
        sellerOfficerName = officerName;
        sellerContact = bizContact;
        setForm(p => ({
          ...p,
          sellerName,
          sellerOfficerName,
          sellerContact
        }));
      }

      // Build mutation input
      const input: any = {
        id: route.params.id,
        sellerEmail: form.sellerEmail,
        sellerAccount: form.sellerType === "sellerTypeBiz" ? form.sellerAccount : form.sellerEmail,
        sellerName,
        sellerOfficerName,
        sellerContact,
        sellerType: form.sellerType,
        lastUpdateTime: new Date().toISOString()
      };
      console.log("busName:", sellerName);
      await client.graphql({
        query: updateCombContract,
        variables: {
          input
        }
      });
      const Message = await client.graphql({
        query: createMessages,
        variables: {
          input: {
            senderEmail: form.sellerEmail,
            messageBody: `You have been linked to a COMB contract. Go to COMB and generate sale vouchers for the consumer to approve as per the funder's specifications.`
          }
        }
      });
      if (Message?.data?.createMessages) {
        await client.graphql({
          query: sendNotification,
          variables: {
            riderEmail: form.sellerEmail,
            title: "MiFedha: COMB Contract",
            body: `You have been linked to a COMB contract. Go to COMB and generate sale vouchers for the consumer to approve as per the funder's specifications.`
          }
        });
      }
      Alert.alert("Success", "Seller details updated successfully.");
    } catch (err: any) {
      console.error("Update seller error:", err);
      Alert.alert("Error", err.message || "Ensure you enter details correctly.");
    } finally {
      setIsLoading(false);
    }
  };
  return <LinearGradient colors={["#e58d29", "skyblue"]} style={{
    flex: 1
  }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Link COMB Seller</Text>

        {/* Seller type */}
        <View style={{
        marginBottom: 12
      }}>
          <Text style={styles.label}>Seller Type</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.chip, form.sellerType === "sellerTypePal" && styles.chipActive]} onPress={() => update("sellerType", "sellerTypePal")}>
              <Text style={form.sellerType === "sellerTypePal" ? styles.chipTextActive : styles.chipText}>
                Individual
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.chip, form.sellerType === "sellerTypeBiz" && styles.chipActive]} onPress={() => update("sellerType", "sellerTypeBiz")}>
              <Text style={form.sellerType === "sellerTypeBiz" ? styles.chipTextActive : styles.chipText}>
                Business
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seller Email */}
        <View style={{
        marginBottom: 12
      }}>
          <Text style={styles.label}>
            {form.sellerType === "sellerTypePal" ? "Seller Main Account Email" : "Institution/Business Officer Email"}
          </Text>
          <TextInput style={styles.input} value={form.sellerEmail} onChangeText={v => update("sellerEmail", v)} autoCapitalize="none" keyboardType="email-address" />
        </View>

        {/* Business Account */}
        {form.sellerType === "sellerTypeBiz" && <View style={{
        marginBottom: 12
      }}>
            <Text style={styles.label}>Institution/Business Account Number</Text>
            <TextInput style={styles.input} value={form.sellerAccount} onChangeText={v => update("sellerAccount", v)} autoCapitalize="none" />
          </View>}

        {/* Show fetched name and contact */}
        {form.sellerName !== "" && <>
            <View style={{
          marginBottom: 12
        }}>
              <Text style={styles.label}>Seller Name</Text>
              <TextInput style={styles.input} value={form.sellerName} editable={false} />
            </View>
            <View style={{
          marginBottom: 12
        }}>
              <Text style={styles.label}>Seller Contact</Text>
              <TextInput style={styles.input} value={form.sellerContact} editable={false} />
            </View>
          </>}

        {/* Password */}
        <View style={{
        marginBottom: 12
      }}>
          <Text style={styles.label}>Enter Your SMAccount Password</Text>
          <View style={styles.passwordRow}>
            <TextInput style={[styles.input, {
            flex: 1
          }]} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} autoCapitalize="none" />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(p => !p)}>
              <Text style={{
              color: "#fff",
              fontSize: 14
            }}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit */}
        <View style={{
        marginVertical: 16
      }}>
          <TouchableOpacity style={styles.button} onPress={handleUpdateSeller} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Link Seller</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>;
};
const styles = StyleSheet.create({
  container: {
    padding: 18
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: "#fff"
  },
  label: {
    color: "#fff",
    marginBottom: 6
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#111"
  },
  row: {
    flexDirection: "row",
    gap: 8
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  chipActive: {
    backgroundColor: "#1b6cff",
    borderColor: "#1b6cff"
  },
  chipText: {
    color: "#333"
  },
  chipTextActive: {
    color: "#fff"
  },
  button: {
    backgroundColor: "#1b6cff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700"
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  eyeButton: {
    marginLeft: 8,
    backgroundColor: "#e58d29",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8
  }
});
export default UpdateCombSellerScreen;