import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import RNPrint from "react-native-print";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { getUrl } from "aws-amplify/storage";
import {
  listMinutesByChama,
  listMinuteItemsByMinutes,
  listAttendanceByMinutes,
  getGroup,
} from "../../../../src/graphql/queries";
import { updateChamaMinutes } from "../../../../src/graphql/mutations";

const client = generateClient();

/* =========================
   SAFE IMAGE COMPONENT
   ========================= */
const SafeImage = ({ uri, style }: { uri?: string; style: any }) => {
  if (!uri || typeof uri !== "string" || uri.trim() === "") {
    return null; // don’t render if invalid
  }
  return <Image source={{ uri }} style={style} />;
};

const ViewMinutesScreen = ({ route }) => {
  const { grpContact, groupName } = route.params;
  const [minutesList, setMinutesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMinutes();
  }, []);

  /* =========================
     FETCH & ENRICH MINUTES
     ========================= */
  const fetchMinutes = async () => {
    try {
      const res: any = await client.graphql({
        query: listMinutesByChama,
        variables: { grpContact, sortDirection: "DESC" },
      });
      const minutes = res?.data?.listMinutesByChama?.items || [];
      const enriched = await Promise.all(
        minutes.map(async (min: any) => {
          const [itemsRes, attendanceRes] = await Promise.all([
            client.graphql({
              query: listMinuteItemsByMinutes,
              variables: { minutesId: min.id },
            }),
            client.graphql({
              query: listAttendanceByMinutes,
              variables: { minutesId: min.id },
            }),
          ]);
          const chairSignUrl = min.chairpersonId
            ? (await getUrl({ key: min.chairpersonId })).url
            : null;
          const secSignUrl = min.secretaryId
            ? (await getUrl({ key: min.secretaryId })).url
            : null;
          return {
            ...min,
            items: itemsRes?.data?.listMinuteItemsByMinutes?.items || [],
            attendance: attendanceRes?.data?.listAttendanceByMinutes?.items || [],
            chairSignUrl,
            secSignUrl,
          };
        })
      );
      setMinutesList(enriched);
    } catch (error) {
      console.log("Error loading minutes:", error);
      Alert.alert("Error", "Unable to load minutes");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SIGNING HANDLERS
     ========================= */
  const signAsSecretary = async (min: any) => {
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const email = attributes.email;
      const groupRes: any = await client.graphql({
        query: getGroup,
        variables: { grpContact: min.grpContact },
      });
      const group = groupRes?.data?.getGroup;
      if (!group) return Alert.alert("Error", "Group not found");
      if (group.Admin2 !== email) {
        return Alert.alert("Not authorized", "Only the secretary can sign.");
      }
      await client.graphql({
        query: updateChamaMinutes,
        variables: {
          input: {
            id: min.id,
            status: "FINALIZED",
            secretaryId: group.secSign,
          },
        },
      });
      const secSignUrl = group.secSign
        ? (await getUrl({ key: group.secSign })).url
        : null;
      setMinutesList((prev) =>
        prev.map((m) =>
          m.id === min.id
            ? {
                ...m,
                status: "FINALIZED",
                secretaryId: group.secSign,
                secSignUrl,
              }
            : m
        )
      );
      Alert.alert("Signed", "Minutes finalized by secretary.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to sign as secretary.");
    }
  };

  const signAsChair = async (min: any) => {
    try {
      if (min.status !== "FINALIZED") {
        return Alert.alert("Not allowed", "Secretary must sign first.");
      }
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const email = attributes.email;
      const groupRes: any = await client.graphql({
        query: getGroup,
        variables: { grpContact: min.grpContact },
      });
      const group = groupRes?.data?.getGroup;
      if (!group) return Alert.alert("Error", "Group not found");
      if (group.Admin1 !== email) {
        return Alert.alert("Not authorized", "Only the chair can sign.");
      }
      await client.graphql({
        query: updateChamaMinutes,
        variables: {
          input: {
            id: min.id,
            status: "LOCKED",
            chairpersonId: group.chairSign,
          },
        },
      });
      const chairSignUrl = group.chairSign
        ? (await getUrl({ key: group.chairSign })).url
        : null;
      setMinutesList((prev) =>
        prev.map((m) =>
          m.id === min.id
            ? {
                ...m,
                status: "LOCKED",
                chairpersonId: group.chairSign,
                chairSignUrl,
              }
            : m
        )
      );
      Alert.alert("Signed", "Minutes locked by chair.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to sign as chair.");
    }
  };

  /* =========================
     PDF EXPORT
     ========================= */
  const exportToPDF = async (min: any) => {
    try {
      const present = (min.attendance || []).filter(
        (a: any) => a.attendanceStatus === "PRESENT"
      );
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { text-align: center; color: #333; }
              h2 { margin-top: 20px; color: #555; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              .signature { width: 200px; height: 100px; border: 1px solid #ccc; margin: 10px; }
            </style>
          </head>
          <body>
            <h1>${groupName} — Meeting Minutes</h1>
            <p><strong>Date:</strong> ${min.meetingDate}</p>
            <p><strong>Venue:</strong> ${min.venue || "-"}</p>
            <p><strong>Attendance:</strong> ${present.length}</p>

            <h2>Minutes</h2>
            <ul>
              ${(min.items || [])
                .sort((a: any, b: any) => (a.entryOrder || 0) - (b.entryOrder || 0))
                .map(
                  (item: any) => `
                <li>
                  <strong>${item.entryOrder}. ${item.minuteRef}</strong><br/>
                  ${item.content}<br/>
                  ${item.decision ? `<em>Decision: ${item.decision}</em>` : ""}
                </li>
              `
                )
                .join("")}
            </ul>

            <h2>Attendance</h2>
            <table>
              <tr><th>Name</th><th>Status</th></tr>
              ${present
                .map(
                  (a: any) => `
                <tr>
                  <td>${a.memberName}</td>
                  <td>${a.attendanceStatus}</td>
                </tr>
              `
                )
                .join("")}
            </table>

            <h2>Signatures</h2>
            <div style="display:flex; justify-content:space-between;">
              ${
                min.chairSignUrl
                  ? `<img src="${min.chairSignUrl}" class="signature"/>`
                  : "<div class='signature'>Chair Signature Missing</div>"
              }
              ${
                min.secSignUrl
                  ? `<img src="${min.secSignUrl}" class="signature"/>`
                  : "<div class='signature'>Secretary Signature Missing</div>"
              }
            </div>
          </body>
        </html>
      `;
      await RNPrint.print({ html });
    } catch (err) {
      Alert.alert("PDF Error", "Unable to export minutes");
    }
  };

  /* =========================
     UI
     ========================= */
    if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e29d58" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.groupTitle}>{groupName} — Minutes</Text>

      {minutesList.map((min) => {
        const presentCount = (min.attendance || []).filter(
          (a: any) => a.attendanceStatus === "PRESENT"
        ).length;
        return (
          <View key={min.id} style={styles.card}>
            <Text style={styles.date}>📅 {min.meetingDate}</Text>
            <Text style={styles.meta}>Venue: {min.venue || "-"}</Text>
            <Text style={styles.meta}>Attendance: {presentCount}</Text>

            <TouchableOpacity
              style={styles.exportBtn}
              onPress={() => exportToPDF(min)}
            >
              <Text style={styles.exportText}>Export PDF</Text>
            </TouchableOpacity>

            <Text style={styles.section}>Minutes</Text>
            {(min.items || [])
              .sort(
                (a: any, b: any) => (a.entryOrder || 0) - (b.entryOrder || 0)
              )
              .map((item: any) => (
                <View key={item.id} style={styles.minuteItem}>
                  <Text style={styles.minuteTitle}>
                    {item.entryOrder}. {item.minuteRef}
                  </Text>
                  <Text>{item.content}</Text>
                  {item.decision && (
                    <Text style={styles.decision}>
                      Decision: {item.decision}
                    </Text>
                  )}
                </View>
              ))}

            <Text style={styles.section}>Signatures</Text>
            <View style={styles.signatures}>
              <SafeImage uri={min.chairSignUrl} style={styles.signature} />
              <SafeImage uri={min.secSignUrl} style={styles.signature} />
            </View>

            <View style={styles.signButtons}>
              <TouchableOpacity
                style={styles.signBtn}
                onPress={() => signAsSecretary(min)}
              >
                <Text style={styles.signText}>Secretary Sign</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.signBtn, { backgroundColor: "skyblue" }]}
                onPress={() => signAsChair(min)}
              >
                <Text style={styles.signText}>Chair Sign</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ViewMinutesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  groupTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#212529",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  date: {
    fontSize: 15,
    fontWeight: "600",
    color: "#495057",
  },
  meta: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 2,
  },
  section: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    color: "#343a40",
  },
  minuteItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dee2e6",
  },
  minuteTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
    color: "#212529",
  },
  decision: {
    marginTop: 4,
    fontStyle: "italic",
    color: "#0f5132",
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  signature: {
    width: 140,
    height: 70,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  exportBtn: {
    marginTop: 12,
    alignSelf: "flex-end",
    backgroundColor: "#e29d58",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  exportText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  signButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  signBtn: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#e29d58",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  signText: {
    color: "#fff",
    fontWeight: "700",
  },
});
