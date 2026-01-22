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
import { API, graphqlOperation, Storage, Auth } from "aws-amplify";
import RNPrint from "react-native-print";

import {
  listMinutesByChama,
  listMinuteItemsByMinutes,
  listAttendanceByMinutes,
  getGroup,
} from "../../../../src/graphql/queries";
import { updateChamaMinutes } from "../../../../src/graphql/mutations";

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
      const res: any = await API.graphql(
        graphqlOperation(listMinutesByChama, {
          grpContact,
          sortDirection: "DESC",
        })
      );

      const minutes = res?.data?.listMinutesByChama?.items || [];

      const enriched = await Promise.all(
        minutes.map(async (min: any) => {
          const [itemsRes, attendanceRes] = await Promise.all([
            API.graphql(
              graphqlOperation(listMinuteItemsByMinutes, {
                minutesId: min.id,
              })
            ),
            API.graphql(
              graphqlOperation(listAttendanceByMinutes, {
                minutesId: min.id,
              })
            ),
          ]);

          const chairSignUrl = min.chairpersonId
            ? await Storage.get(min.chairpersonId)
            : null;

          const secSignUrl = min.secretaryId
            ? await Storage.get(min.secretaryId)
            : null;

          return {
            ...min,
            items: itemsRes?.data?.listMinuteItemsByMinutes?.items || [],
            attendance:
              attendanceRes?.data?.listAttendanceByMinutes?.items || [],
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
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;

      const groupRes: any = await API.graphql(
        graphqlOperation(getGroup, { grpContact: min.grpContact })
      );
      const group = groupRes?.data?.getGroup;
      if (!group) {
        Alert.alert("Error", "Group not found");
        return;
      }

      if (group.Admin2 !== email) {
        Alert.alert("Not authorized", "Only the secretary can sign.");
        return;
      }

      await API.graphql(
        graphqlOperation(updateChamaMinutes, {
          input: {
            id: min.id,
            status: "FINALIZED",
            secretaryId: group.secSign, // pick signature id from group
          },
        })
      );

      const secSignUrl = group.secSign ? await Storage.get(group.secSign) : null;

      // Update local state immediately
      setMinutesList((prev) =>
        prev.map((m) =>
          m.id === min.id
            ? { ...m, status: "FINALIZED", secretaryId: group.secSign, secSignUrl }
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
    // ✅ Check if secretary has signed first
    if (min.status !== "FINALIZED") {
      Alert.alert("Not allowed", "Secretary must sign first.");
      return;
    }

    const user = await Auth.currentAuthenticatedUser();
    const email = user.attributes.email;

    const groupRes: any = await API.graphql(
      graphqlOperation(getGroup, { grpContact: min.grpContact })
    );
    const group = groupRes?.data?.getGroup;
    if (!group) {
      Alert.alert("Error", "Group not found");
      return;
    }

    if (group.Admin1 !== email) {
      Alert.alert("Not authorized", "Only the chair can sign.");
      return;
    }

    await API.graphql(
      graphqlOperation(updateChamaMinutes, {
        input: {
          id: min.id,
          status: "LOCKED",
          chairpersonId: group.chairSign,
        },
      })
    );

    const chairSignUrl = group.chairSign ? await Storage.get(group.chairSign) : null;

    setMinutesList((prev) =>
      prev.map((m) =>
        m.id === min.id
          ? { ...m, status: "LOCKED", chairpersonId: group.chairSign, chairSignUrl }
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
              body { font-family: Arial; padding: 24px; }
              h1 { color: #e29d58; }
              h2 { margin-top: 20px; border-bottom: 1px solid #ccc; }
              .item { margin-bottom: 12px; }
              .decision { font-style: italic; color: #065f46; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { border: 1px solid #ddd; padding: 8px; }
              .signatures { margin-top: 40px; display: flex; justify-content: space-between; }
              img { max-height: 80px; }
            </style>
          </head>

          <body>
            <h1>${groupName} — Official Minutes</h1>
            <p><strong>Date:</strong> ${min.meetingDate}</p>
            <p><strong>Venue:</strong> ${min.venue || "-"}</p>
            <p><strong>Attendance:</strong> ${present.length}</p>

            <h2>Minutes</h2>
            ${(min.items || [])
              .sort((a: any, b: any) => (a.entryOrder || 0) - (b.entryOrder || 0))
              .map(
                (i: any) => `
                <div class="item">
                  <strong>${i.entryOrder}. ${i.minuteRef}</strong>
                  <p>${i.content}</p>
                  ${i.decision ? `<div class="decision">Decision: ${i.decision}</div>` : ""}
                </div>
              `
              )
              .join("")}

            <h2>Attendance Register</h2>
            <table>
              <tr><th>Name</th><th>Status</th></tr>
              ${(min.attendance || [])
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

            <div class="signatures">
              <div>
                <strong>Chairperson</strong><br/>
                ${min.chairSignUrl ? `<img src="${min.chairSignUrl}" />` : "-"}
              </div>
              <div>
                <strong>Secretary</strong><br/>
                ${min.secSignUrl ? `<img src="${min.secSignUrl}" />` : "-"}
              </div>
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
              .sort((a: any, b: any) => (a.entryOrder || 0) - (b.entryOrder || 0))
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
              {min.chairSignUrl && (
                <Image
                  source={{ uri: min.chairSignUrl }}
                  style={styles.signature}
                />
              )}
              {min.secSignUrl && (
                <Image
                  source={{ uri: min.secSignUrl }}
                  style={styles.signature}
                />
              )}
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
