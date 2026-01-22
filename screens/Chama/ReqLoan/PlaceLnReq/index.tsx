import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Auth, graphqlOperation, API, Storage} from 'aws-amplify';
import {LinearGradient} from 'expo-linear-gradient';
import RNPrint from 'react-native-print';

import {
  createMessages,
  createReqLoanChama,
  sendNotification,
} from '../../../../src/graphql/mutations';
import {
  getAdvocate,
  getChamaAdminLnApply,
  getChamaMembers,
  getGroup,
  getSMAccount,
  getChamaMinutes,            // ✅ single-record query by id
  listMinuteItemsByMinutes,
  listAttendanceByMinutes,
} from '../../../../src/graphql/queries';

const CreateBiz = () => {
  const [Sign2Phn, setSign2Phn] = useState("");
  const [itemPrys, setitemPrys] = useState('');
  const [lnPrsntg, setlnPrsntg] = useState('');
  const [rpymntPrd, setrpymntPrd] = useState('');
  const [pword, setPW] = useState('');
  const [InstAmt, setInstAmt] = useState("");
  const [InstFreq, setInstFreq] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const route = useRoute<any>();
  const grpContacts = route.params?.groupContact;
  const MembaId = route.params?.MembaId;
  const id = route.params?.id;
  const ChamaNMember = MembaId + grpContacts;

  // Pre-fetched application details to enable "View linked minutes"
  const [appDetails, setAppDetails] = useState<any | null>(null);
  const [groupDetails, setGroupDetails] = useState<any | null>(null);

  // Minutes modal state
  const [selectedMinutes, setSelectedMinutes] = useState<any | null>(null);
  const [loadingMinutes, setLoadingMinutes] = useState(false);

  /* ---------------- Prefetch app + group details for minutes button ---------------- */
  useEffect(() => {
    const prefetch = async () => {
      try {
        const appRes: any = await API.graphql(
          graphqlOperation(getChamaAdminLnApply, { id })
        );
        setAppDetails(appRes?.data?.getChamaAdminLnApply || null);

        const groupRes: any = await API.graphql(
          graphqlOperation(getGroup, { grpContact: grpContacts })
        );
        setGroupDetails(groupRes?.data?.getGroup || null);
      } catch (e) {
        console.log('Prefetch error', e);
      }
    };
    prefetch();
  }, [id, grpContacts]);

  /* ---------------- FETCH MINUTES (by ReqLoanChama.loanMinutes id) ---------------- */
  const fetchMinutesForLoan = async (loanMinutesId: string) => {
    if (!loanMinutesId) {
      Alert.alert('No minutes linked');
      return;
    }
    setLoadingMinutes(true);
    try {
      // Use the single-record query by id
      const res: any = await API.graphql(
        graphqlOperation(getChamaMinutes, { id: loanMinutesId })
      );
      const minutes = res?.data?.getChamaMinutes;
      if (!minutes) {
        Alert.alert('Minutes not found');
        setLoadingMinutes(false);
        return;
      }

      if (minutes.status !== "FINALIZED") {
        Alert.alert('The secretary has not yet signed these minutes');
        return;
      }
      
      if (minutes.status !== "LOCKED") {
        Alert.alert('The chair has not yet signed these minutes');
        return;
      }

      const [itemsRes, attendanceRes] = await Promise.all([
        API.graphql(graphqlOperation(listMinuteItemsByMinutes, { minutesId: minutes.id })),
        API.graphql(graphqlOperation(listAttendanceByMinutes, { minutesId: minutes.id })),
      ]);

      const chairSignUrl = minutes.chairpersonId ? await Storage.get(minutes.chairpersonId) : null;
      const secSignUrl = minutes.secretaryId ? await Storage.get(minutes.secretaryId) : null;

      setSelectedMinutes({
        ...minutes,
        grpName: groupDetails?.grpName || minutes.grpName || 'Group',
        items: itemsRes?.data?.listMinuteItemsByMinutes?.items || [],
        attendance: attendanceRes?.data?.listAttendanceByMinutes?.items || [],
        chairSignUrl,
        secSignUrl,
      });
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch minutes');
    } finally {
      setLoadingMinutes(false);
    }
  };

  /* ---------------- EXPORT MINUTES TO PDF ---------------- */
  const exportMinutesToPDF = async (min: any) => {
    if (!min) return;
    try {
      const present = (min.attendance || []).filter((a: any) => a.attendanceStatus === "PRESENT");
      const html = `
        <html>
        <head><style>
          body { font-family: Arial; padding: 20px; }
          h1 { color: #e58d29; }
          .item { margin-bottom: 12px; }
          .decision { font-style: italic; color: #065f46; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border: 1px solid #ddd; padding: 6px; }
          .signatures { margin-top: 24px; display: flex; justify-content: space-between; }
          img { max-height: 80px; }
        </style></head>
        <body>
          <h1>${min.grpName} — Official Minutes</h1>
          <p><strong>Date:</strong> ${min.meetingDate}</p>
          <p><strong>Venue:</strong> ${min.venue || "-"}</p>
          <p><strong>Attendance:</strong> ${present.length}</p>

          <h2>Minute Items</h2>
          ${(min.items || []).map((i: any) => `
            <div class="item">
              <strong>${i.entryOrder}. ${i.minuteRef}</strong>
              <p>${i.content}</p>
              ${i.decision ? `<div class="decision">Decision: ${i.decision}</div>` : ""}
            </div>
          `).join("")}

          <h2>Attendance List</h2>
          <table>
            <tr><th>Name</th><th>Status</th></tr>
            ${(min.attendance || []).map((a: any) => `<tr><td>${a.memberName}</td><td>${a.attendanceStatus}</td></tr>`).join("")}
          </table>

          <h2>Signatures</h2>
          <div class="signatures">
            <div>
              <strong>Chairperson</strong><br/>
              ${min.chairSignUrl ? `<img src="${min.chairSignUrl}" />` : "Not signed"}
            </div>
            <div>
              <strong>Secretary</strong><br/>
              ${min.secSignUrl ? `<img src="${min.secSignUrl}" />` : "Not signed"}
            </div>
          </div>
        </body>
        </html>
      `;
      await RNPrint.print({ html });
    } catch (err) {
      console.error(err);
      Alert.alert("PDF Error", "Failed to export minutes PDF");
    }
  };

  /* ---------------- EXISTING LOAN REQUEST LOGIC (unchanged structure) ---------------- */
  const gtBizna = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (
        !itemPrys.trim() ||
        !lnPrsntg.trim() ||
        !rpymntPrd.trim() ||
        !InstAmt.trim() ||
        !InstFreq.trim() ||
        !pword.trim()
      ) {
        Alert.alert("Please fill in all required fields.");
        return;
      }

      const userInfo = await Auth.currentAuthenticatedUser();

      const smRes: any = await API.graphql(
        graphqlOperation(getSMAccount, { awsemail: userInfo.attributes.email })
      );
      const pws = smRes.data.getSMAccount.pw;
      const phonecontacts = smRes.data.getSMAccount.phonecontact;
      const names = smRes.data.getSMAccount.name;

      if (pword !== pws) {
        Alert.alert("Wrong User password");
        return;
      }
      if (parseFloat(rpymntPrd) < 1) {
        Alert.alert("Enter repayment Period greater than 1 day");
        return;
      }
      if (parseFloat(lnPrsntg) > 100) {
        Alert.alert("Interest exploits you; enter lesser repayment amount");
        return;
      }

      const memberRes: any = await API.graphql(
        graphqlOperation(getChamaMembers, { ChamaNMember })
      );
      const memberData = memberRes.data.getChamaMembers;
      if (!memberData) {
        Alert.alert("Chama member not found");
        setIsLoading(false);
        return;
      }

      // We still fetch app + group details here to keep your original logic intact
      const appRes: any = await API.graphql(
        graphqlOperation(getChamaAdminLnApply, { id })
      );
      const AppDtls = appRes.data.getChamaAdminLnApply;

      const groupRes: any = await API.graphql(
        graphqlOperation(getGroup, { grpContact: grpContacts })
      );
      const grpDtls = groupRes.data.getGroup;

      const grpName = grpDtls.grpName;
      const signitoryContact = grpDtls.signitoryContact;
      const signitory2Sub = grpDtls.signitory2Sub;
      const Signatory3Email = grpDtls.Signatory3Email;
      const SignatoryEmail = grpDtls.SignatoryEmail;

      const ExpInstmnt = parseFloat(itemPrys) / parseFloat(rpymntPrd);
      if (ExpInstmnt > parseFloat(InstAmt)) {
        Alert.alert("Enter Installment greater than " + (ExpInstmnt + 1).toFixed(0));
        return;
      }

      let advocateEmail = "None";
      let advocateLicense = "None";
      if (Sign2Phn && Sign2Phn.trim() !== "") {
        const advRes: any = await API.graphql(
          graphqlOperation(getAdvocate, { advregnu: Sign2Phn.trim() })
        );
        if (advRes?.data?.getAdvocate) {
          advocateEmail = advRes.data.getAdvocate.email;
          advocateLicense = Sign2Phn.trim();
        } else {
          Alert.alert("Advocate not found. Proceeding without advocate.");
        }
      }

      await API.graphql(
        graphqlOperation(createReqLoanChama, {
          input: {
            loaneeEmail: userInfo.attributes.email,
            chamaPhone: grpContacts,
            loaneeName: names,

            confirm1: "NO",
            confirm2: "NO",

            loaneePhone: phonecontacts,
            amount: parseFloat(itemPrys).toFixed(2),
            repaymentAmt: parseFloat(lnPrsntg).toFixed(2),
            repaymentPeriod: rpymntPrd,
            loaneeMemberId: MembaId,

            status: "AwaitingResponse",
            statusNumber: 0,
            dfltDeadLn: 0,

            AdvEmail: advocateEmail,
            advLicNo: advocateLicense,

            lnType: "GrpLn",
            loanerName: grpName,
            loanerPhone: signitoryContact,

            description: ChmNm ? ChmNm : "No description",
            defaultPenalty: ChmDesc,
            installmentAmount: InstAmt,
            paymentFrequency: InstFreq,

            signatory2: signitory2Sub,
            signatory3: Signatory3Email,

            membersApprove: 0,
            loanMinutes: AppDtls.grpMinutes,      // ✅ foreign key to minutes
            loanMinutesImage: AppDtls.MemberEmail,
            loanFloatID: id,

            owner: SignatoryEmail,
            createdAt: new Date().toISOString(),
          },
        })
      );

      if (advocateEmail !== "None") {
        await API.graphql(
          graphqlOperation(createMessages, {
            input: {
              senderEmail: advocateEmail,
              messageBody: `A loan request has been made by ${names} under group ${grpName}. Please review and witness or decline.`,
            },
          })
        );
        await API.graphql(
          graphqlOperation(sendNotification, {
            riderEmail: advocateEmail,
            title: "MiFedha: New Loan Request",
            body: `A loan request has been made by ${names} under group ${grpName}.`,
          })
        );
      }

      await API.graphql(
        graphqlOperation(createMessages, {
          input: {
            senderEmail: AppDtls.ChamaAdminEmail,
            messageBody: `A loan request has been made by ${names} under group ${grpName}. Please review.`,
          },
        })
      );

      await API.graphql(
        graphqlOperation(sendNotification, {
          riderEmail: AppDtls.ChamaAdminEmail,
          title: "MiFedha: New Loan Request",
          body: `A loan request has been made by ${names} under group ${grpName}.`,
        })
      );

      Alert.alert("Loan request submitted successfully");
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert("Error! Please check details or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['skyblue', '#e58d29']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Loan Request</Text>
          <Text style={styles.headerSubtitle}>
            Please fill in all required details carefully
          </Text>

          {!!appDetails?.grpMinutes && (
            <TouchableOpacity
              style={styles.viewMinutesBtn}
              onPress={() => fetchMinutesForLoan(appDetails.grpMinutes)}
            >
              <Text style={styles.viewMinutesText}>View linked minutes</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Advocate License Number (Optional)"
              placeholderTextColor="#333"
              value={Sign2Phn}
              onChangeText={setSign2Phn}
              style={styles.input}
            />
            <Text style={styles.helperText}>Advocate License</Text>
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Loan Description (Optional)"
              placeholderTextColor="#333"
              value={ChmNm}
              onChangeText={setChmNm}
              multiline
              style={[styles.input, { height: 80 }]}
            />
            <Text style={styles.helperText}>Loan Purpose / Description</Text>
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Default Penalty"
              placeholderTextColor="#333"
              keyboardType="decimal-pad"
              value={ChmDesc}
              onChangeText={setChmDesc}
              style={styles.input}
            />
            <Text style={styles.helperText}>Penalty on default</Text>
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Installment Days"
              placeholderTextColor="#333"
              keyboardType="decimal-pad"
              value={InstFreq}
              onChangeText={setInstFreq}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Installment Amount"
              placeholderTextColor="#333"
              keyboardType="decimal-pad"
              value={InstAmt}
              onChangeText={setInstAmt}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Loan Amount"
              placeholderTextColor="#333"
              keyboardType="decimal-pad"
              value={itemPrys}
              onChangeText={setitemPrys}
              style={styles.input}
            />
            <Text style={styles.helperText}>Principal Amount</Text>
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Annual Interest Rate (e.g. 8)"
              placeholderTextColor="#333"
              keyboardType="decimal-pad"
              value={lnPrsntg}
              onChangeText={setlnPrsntg}
              style={styles.input}
            />
            <Text style={styles.helperText}>Interest % per year</Text>
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              placeholder="Repayment Period (Days)"
              placeholderTextColor="#333"
              keyboardType="decimal-pad"
              value={rpymntPrd}
              onChangeText={setrpymntPrd}
              style={styles.input}
            />
            <Text style={styles.helperText}>Total repayment duration</Text>
          </View>

          <View style={{ position: 'relative' }}>
            <TextInput
              placeholder="User Password"
              placeholderTextColor="#333"
              secureTextEntry={!showPassword}
              value={pword}
              onChangeText={setPW}
              style={styles.input}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 10, top: 14 }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={{ color: '#6b7280', fontSize: 14 }}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={gtBizna}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>Request Loan</Text>
          {isLoading && (
            <ActivityIndicator
              color="#fff"
              style={{ marginLeft: 10 }}
            />
          )}
        </TouchableOpacity>

        {/* Minutes Modal */}
        <Modal visible={!!selectedMinutes} transparent onRequestClose={() => setSelectedMinutes(null)}>
          <View style={{ flex: 1, backgroundColor: "#000000aa", justifyContent: "center" }}>
            {loadingMinutes ? (
              <ActivityIndicator size="large" color="#e58d29" />
            ) : (
              <ScrollView style={styles.minutesModal}>
                <View style={styles.minutesCard}>
                  <Text style={styles.groupTitle}>{selectedMinutes?.grpName} — Minutes</Text>
                  <Text style={styles.date}>📅 {selectedMinutes?.meetingDate}</Text>
                  <Text style={styles.meta}>Venue: {selectedMinutes?.venue || "-"}</Text>
                  <Text style={styles.meta}>
                    Attendance: {(selectedMinutes?.attendance || []).filter((a: any) => a.attendanceStatus === "PRESENT").length}
                  </Text>

                  <TouchableOpacity style={styles.exportBtn} onPress={() => exportMinutesToPDF(selectedMinutes)}>
                    <Text style={styles.exportText}>Export to PDF</Text>
                  </TouchableOpacity>

                  <Text style={styles.section}>Minute Items</Text>
                  {(selectedMinutes?.items || [])
                    .sort((a: any, b: any) => (a.entryOrder || 0) - (b.entryOrder || 0))
                    .map((item: any) => (
                      <View key={item.id} style={styles.minuteItem}>
                        <Text style={styles.minuteTitle}>{item.entryOrder}. {item.minuteRef}</Text>
                        <Text>{item.content}</Text>
                        {item.decision && <Text style={styles.decision}>Decision: {item.decision}</Text>}
                      </View>
                    ))}

                  <Text style={styles.section}>Attendance List</Text>
                  {(selectedMinutes?.attendance || []).map((a: any, idx: number) => (
                    <View key={idx} style={styles.memberRow}>
                      <Text>{a.memberName} — {a.attendanceStatus}</Text>
                    </View>
                  ))}

                  <Text style={styles.section}>Signatures</Text>
                  <View style={styles.signatures}>
                    <View style={styles.signatureBlock}>
                      <Text style={styles.signatureLabel}>Chairperson</Text>
                      {selectedMinutes?.chairSignUrl ? (
                        <Image source={{ uri: selectedMinutes.chairSignUrl }} style={styles.signature} />
                      ) : (
                        <Text style={styles.signatureMissing}>Not signed</Text>
                      )}
                    </View>
                    <View style={styles.signatureBlock}>
                      <Text style={styles.signatureLabel}>Secretary</Text>
                      {selectedMinutes?.secSignUrl ? (
                        <Image source={{ uri: selectedMinutes.secSignUrl }} style={styles.signature} />
                      ) : (
                        <Text style={styles.signatureMissing}>Not signed</Text>
                      )}
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setSelectedMinutes(null)}
                  >
                    <Text style={{ color: '#fff' }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

export default CreateBiz;

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    marginTop: 40,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#eef6ff',
    marginTop: 6,
  },

  viewMinutesBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  viewMinutesText: {
    color: '#1f2937',
    fontWeight: '700',
  },

  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  inputGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    color: '#111827',
  },
  helperText: {
    fontSize: 12,
    marginTop: 6,
    color: '#6b7280',
  },

  submitButton: {
    backgroundColor: '#e58d29',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#e58d29',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
  },

  /* ---------------- Minutes modal ---------------- */
  minutesModal: {
    margin: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    maxHeight: 650,
  },
  minutesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1f2937',
    textAlign: 'center',
  },
  date: { fontSize: 14, color: '#374151', marginBottom: 4, textAlign: 'center' },
  meta: { fontSize: 13, color: '#6b7280', marginBottom: 4, textAlign: 'center' },
  section: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    color: '#111827',
  },
  minuteItem: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  minuteTitle: { fontWeight: '700', marginBottom: 4, color: '#1f2937' },
  decision: { marginTop: 6, fontStyle: 'italic', color: '#065f46' },
  memberRow: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  signatures: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12, marginBottom: 12 },
  signatureBlock: { alignItems: 'center', width: 140 },
  signatureLabel: { fontSize: 13, fontWeight: '700', marginBottom: 6, color: '#374151' },
  signatureMissing: { fontSize: 12, fontStyle: 'italic', color: '#9ca3af', marginTop: 8 },
  signature: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  exportBtn: {
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: '#e58d29',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  exportText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  closeBtn: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#e58d29',
    padding: 10,
    borderRadius: 8,
  },
});
