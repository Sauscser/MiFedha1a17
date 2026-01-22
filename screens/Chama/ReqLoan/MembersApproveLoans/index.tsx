import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  Image,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNPrint from 'react-native-print';

import {
  listReqLoanChamas,
  listChamaMembers,
  listChamaLnApprovals,
  listChamaMinutes,
  listMinuteItemsByMinutes,
  listAttendanceByMinutes,
} from '../../../../src/graphql/queries';

import {
  createChamaLnApproval,
  updateReqLoanChama,
} from '../../../../src/graphql/mutations';

const FloatedLoansList = () => {
  const route = useRoute<any>();
  const { memberDetails } = route.params;

  const groupContact = memberDetails.groupContact;
  const memberEmail = memberDetails.memberContact;
  const memberName = memberDetails.memberName;
  const groupName = memberDetails.groupName;

  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [groupSize, setGroupSize] = useState(0);
  const [approvalsMap, setApprovalsMap] = useState<Record<string, any[]>>({});

  const [selectedMinutes, setSelectedMinutes] = useState<any | null>(null);
  const [loadingMinutes, setLoadingMinutes] = useState(false);

  /* ---------------- FETCH GROUP SIZE ---------------- */
  const fetchGroupSize = async () => {
    const res: any = await API.graphql(
      graphqlOperation(listChamaMembers, {
        filter: { groupContact: { eq: groupContact } },
      })
    );
    setGroupSize(res.data.listChamaMembers.items.length);
  };

  /* ---------------- FETCH LOANS ---------------- */
  const fetchLoans = async () => {
    setLoading(true);
    try {
      const res: any = await API.graphql(
        graphqlOperation(listReqLoanChamas, {
          filter: {
            chamaPhone: { eq: groupContact },
            status: { eq: 'AwaitingResponse' },
          },
        })
      );
      setLoans(res.data.listReqLoanChamas.items);
    } catch {
      Alert.alert('Error', 'Failed to fetch loans');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FETCH APPROVALS ---------------- */
  const fetchApprovals = async (items: any[]) => {
    const map: any = {};
    for (const loan of items) {
      const res: any = await API.graphql(
        graphqlOperation(listChamaLnApprovals, {
          filter: { loanID: { eq: loan.id } },
        })
      );
      map[loan.id] = res.data.listChamaLnApprovals.items;
    }
    setApprovalsMap(map);
  };

  /* ---------------- APPROVE ---------------- */
  const approveLoan = async (loan: any) => {
    try {
      await API.graphql(
        graphqlOperation(createChamaLnApproval, {
          input: {
            loanID: loan.id,
            memberGrpNumber: groupContact,
            GrpAccount: groupContact,
            MemberEmail: memberEmail,
            memberName: memberDetails.memberName,
            grpName: groupName,
            grpMinutes: "Group Minutes",
            status: 'Approved',
            description: `Loan approved by ${memberName} (${memberEmail})`,
          },
        })
      );

      await API.graphql(
        graphqlOperation(updateReqLoanChama, {
          input: {
            id: loan.id,
            membersApprove: loan.membersApprove + 1,
          },
        })
      );

      fetchLoans();
    } catch {
      Alert.alert('Error', 'Approval failed');
    }
  };

  /* ---------------- FETCH MINUTES ---------------- */
  const fetchMinutesForLoan = async (loan: any) => {
    if (!loan?.loanMinutes) {
      Alert.alert('No minutes', 'This loan has no linked minutes record');
      return;
    }
    setLoadingMinutes(true);
    try {
      const res: any = await API.graphql(
        graphqlOperation(listChamaMinutes, { filter: { id: { eq: loan.loanMinutes } } })
      );
      const minutes = res?.data?.listChamaMinutes?.items?.[0];
      if (!minutes) {
        Alert.alert('Minutes not found');
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
      const present = min.attendance.filter((a: any) => a.attendanceStatus === "PRESENT");
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
          <h1>${groupName} — Official Minutes</h1>
          <p><strong>Date:</strong> ${min.meetingDate}</p>
          <p><strong>Venue:</strong> ${min.venue || "-"}</p>
          <p><strong>Attendance:</strong> ${present.length}</p>

          <h2>Minute Items</h2>
          ${min.items.map((i: any) => `
            <div class="item">
              <strong>${i.entryOrder}. ${i.minuteRef}</strong>
              <p>${i.content}</p>
              ${i.decision ? `<div class="decision">Decision: ${i.decision}</div>` : ""}
            </div>
          `).join("")}

          <h2>Attendance List</h2>
          <table>
            <tr><th>Name</th><th>Status</th></tr>
            ${min.attendance.map((a: any) => `<tr><td>${a.memberName}</td><td>${a.attendanceStatus}</td></tr>`).join("")}
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

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    fetchGroupSize();
    fetchLoans();
  }, []);

  useEffect(() => {
    if (loans.length) fetchApprovals(loans);
  }, [loans]);

  /* ---------------- UI ---------------- */
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Chama Loan Applications</Text>

      {loading && <ActivityIndicator size="large" color="#e58d29" />}

      {loans.map((loan) => {
        const approvals = approvalsMap[loan.id] || [];
        const approved = approvals.length;
        const percent =
          groupSize > 0 ? Math.round((approved / groupSize) * 100) : 0;

        const alreadyApproved = approvals.some(
          (a) => a.MemberEmail === memberEmail
        );

               return (
          <View key={loan.id} style={styles.card}>
            <Text style={styles.amount}>
              KES {Number(loan.amount).toLocaleString()}
            </Text>

            <Text style={styles.amount}>
              {loan.loaneeName}
            </Text>

            <Text style={styles.purpose}>
              {loan.description || 'No description'}
            </Text>

            <View style={styles.row}>
              <Text style={styles.detail}>Interest:</Text>
              <Text style={styles.value}>{loan.repaymentAmt}%</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.detail}>Repayment Period:</Text>
              <Text style={styles.value}>{loan.repaymentPeriod} days</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.detail}>Installment:</Text>
              <Text style={styles.value}>
                KES {Number(loan.installmentAmount).toLocaleString()}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.detail}>Installment Frequency:</Text>
              <Text style={styles.value}>{loan.paymentFrequency} days</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.detail}>Default Penalty:</Text>
              <Text style={styles.value}>{loan.defaultPenalty}</Text>
            </View>

            {loan.AdvEmail !== 'None' && (
              <Text style={styles.advocate}>Advocate: {loan.advLicNo}</Text>
            )}

            {/* Approval text + progress bar */}
            <Text style={styles.approvalText}>
              {approved}/{groupSize} approvals ({percent}%)
            </Text>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${percent}%` }]} />
            </View>

            {/* Approve button */}
            {!alreadyApproved && (
              <TouchableOpacity
                style={styles.approveBtn}
                onPress={() => approveLoan(loan)}
              >
                <Text style={styles.approveText}>Approve Loan</Text>
              </TouchableOpacity>
            )}

            {/* Minutes button */}
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => fetchMinutesForLoan(loan)}
            >
              <Text>Read Detailed Minutes</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {/* Minutes Modal */}
      <Modal visible={!!selectedMinutes} transparent onRequestClose={() => setSelectedMinutes(null)}>
        <View style={{ flex: 1, backgroundColor: "#000000aa", justifyContent: "center" }}>
          {loadingMinutes ? (
            <ActivityIndicator size="large" color="#e58d29" />
          ) : (
            <ScrollView style={styles.minutesModal}>
              <View style={styles.minutesCard}>
                <Text style={styles.groupTitle}>{groupName} — Minutes</Text>
                <Text style={styles.date}>📅 {selectedMinutes?.meetingDate}</Text>
                <Text style={styles.meta}>Venue: {selectedMinutes?.venue || "-"}</Text>
                <Text style={styles.meta}>
                  Attendance: {selectedMinutes?.attendance?.filter((a: any) => a.attendanceStatus === "PRESENT").length}
                </Text>

                {/* Export to PDF */}
                <TouchableOpacity style={styles.exportBtn} onPress={() => exportMinutesToPDF(selectedMinutes)}>
                  <Text style={styles.exportText}>Export to PDF</Text>
                </TouchableOpacity>

                <Text style={styles.section}>Minute Items</Text>
                {selectedMinutes?.items
                  ?.sort((a: any, b: any) => a.entryOrder - b.entryOrder)
                  .map((item: any) => (
                    <View key={item.id} style={styles.minuteItem}>
                      <Text style={styles.minuteTitle}>{item.entryOrder}. {item.minuteRef}</Text>
                      <Text>{item.content}</Text>
                      {item.decision && <Text style={styles.decision}>Decision: {item.decision}</Text>}
                    </View>
                  ))}

                <Text style={styles.section}>Attendance List</Text>
                {selectedMinutes?.attendance?.map((a: any, idx: number) => (
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

                <TouchableOpacity style={[styles.closeBtn, { backgroundColor: 'skyblue' }]} onPress={() => setSelectedMinutes(null)}>
                  <Text style={{ color: '#fff' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default FloatedLoansList;


const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 24, fontWeight: '800', marginBottom: 20 },

  // Loan card
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  amount: { fontSize: 20, fontWeight: '800', color: '#1e40af' },
  purpose: { marginVertical: 6, color: '#374151' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  detail: { color: '#6b7280', fontSize: 14 },
  value: { fontWeight: '600', fontSize: 14, color: '#111827' },
  advocate: { marginTop: 6, fontStyle: 'italic', color: '#4b5563' },
  approvalText: { marginTop: 10, fontSize: 13, color: '#374151' },
  progressBg: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
  },
  approveBtn: {
    backgroundColor: '#e58d29',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  approveText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  secondaryBtn: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    alignItems: 'center',
  },

  // Minutes modal
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
  section: { fontSize: 16, fontWeight: '700', marginTop: 16, marginBottom: 8, color: '#111827' },
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

  // Signatures
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

  // Modal buttons
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
