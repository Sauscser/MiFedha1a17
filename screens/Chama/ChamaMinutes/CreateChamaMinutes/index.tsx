import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { getUrl } from "aws-amplify/storage";
import { createChamaMinutes, createChamaMinutesItem, createChamaMeetingAttendance } from "../../../../src/graphql/mutations";
import { listChamaMembers, getGroup } from "../../../../src/graphql/queries";
const client = generateClient();
const MinutesCreationScreen = ({
  userEmail
}) => {
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedMemberGroup, setSelectedMemberGroup] = useState<any | null>(null);
  const [groupDetails, setGroupDetails] = useState<any | null>(null);
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [venue, setVenue] = useState("");
  const [minutesEntries, setMinutesEntries] = useState([{
    entryNumber: 1,
    minuteNumber: "",
    minuteContent: ""
  }]);
  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [chairSignUrl, setChairSignUrl] = useState<string | null>(null);
  const [secSignUrl, setSecSignUrl] = useState<string | null>(null);
  const [isGroupAdmin, setIsGroupAdmin] = useState(false);
  const scrollRef = useRef<ScrollView | null>(null);
  const navigation = useNavigation();
  useEffect(() => {
    async function fetchGroups() {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        const res: any = await client.graphql({
          query: listChamaMembers,
          variables: {
            filter: {
              memberContact: {
                eq: attributes.email
              }
            }
          }
        });
        setGroups(res.data.listChamaMembers.items || []);
      } catch (err) {
        console.log("Error fetching groups:", err);
      }
    }
    fetchGroups();
  }, []);
  const fetchGroupDetails = async (grpContact: string, memberRecord: any) => {
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const res: any = await client.graphql({
        query: getGroup,
        variables: {
          grpContact
        }
      });
      const grp = res.data.getGroup;
      if (!grp) return Alert.alert("Error", "Group details not found");
      const adminEmails = [grp.Admin1, grp.Admin2, grp.Admin3, grp.Admin4, grp.Admin5, grp.Admin6, grp.Admin7, grp.Admin8, grp.Admin9, grp.Admin10, grp.Admin11, grp.Admin12, grp.Admin13, grp.Admin14, grp.Admin15, grp.Admin16, grp.Admin17, grp.Admin18, grp.Admin19, grp.Admin20].filter(Boolean);
      setIsGroupAdmin(adminEmails.includes(attributes.email));
      setSelectedMemberGroup(memberRecord);
      setGroupDetails(grp);

      // Scroll to form smoothly
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({
          animated: true
        });
      }, 300);
      if (grp.chairSign) {
        const {
          url
        } = await getUrl({
          key: grp.chairSign
        });
        setChairSignUrl(url);
      } else setChairSignUrl(null);
      if (grp.secSign) {
        const {
          url
        } = await getUrl({
          key: grp.secSign
        });
        setSecSignUrl(url);
      } else setSecSignUrl(null);
      const membersRes: any = await client.graphql({
        query: listChamaMembers,
        variables: {
          filter: {
            groupContact: {
              eq: grpContact
            }
          }
        }
      });
      const members = membersRes.data.listChamaMembers.items || [];
      setAttendanceList(members.map((m: any) => ({
        memberName: m.memberName,
        memberEmail: m.memberContact,
        attendanceStatus: 'ABSENT'
      })));
    } catch (err) {
      console.log("Error fetching group details:", err);
      Alert.alert("Error", "Could not load group details");
    }
  };
  const getSittingNumber = () => attendanceList.filter(m => m.attendanceStatus === "PRESENT").length || 1;
  const addMinuteEntry = () => setMinutesEntries([...minutesEntries, {
    entryNumber: minutesEntries.length + 1,
    minuteNumber: "",
    minuteContent: ""
  }]);
  const removeMinuteEntry = (idx: number) => setMinutesEntries(minutesEntries.filter((_, i) => i !== idx));
  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) setMeetingDate(selectedDate);
    setShowDatePicker(false);
  };
  const resetForm = () => {
    setSelectedMemberGroup(null);
    setGroupDetails(null);
    setMeetingDate(new Date());
    setVenue("");
    setMinutesEntries([{
      entryNumber: 1,
      minuteNumber: "",
      minuteContent: ""
    }]);
    setAttendanceList([]);
    setChairSignUrl(null);
    setSecSignUrl(null);
    setIsGroupAdmin(false);
  };
  const saveMinutes = async () => {
    if (!selectedMemberGroup || !groupDetails) return Alert.alert("Error", "Select a group!");
    if (!venue.trim()) return Alert.alert("Error", "Enter venue!");
    if (minutesEntries.some(e => !e.minuteContent.trim())) return Alert.alert("Error", "Fill all minute contents!");
    try {
      const sittingNumber = getSittingNumber();
      const minutesInput = {
        grpContact: selectedMemberGroup.groupContact,
        sittingNumber,
        meetingDate: meetingDate.toISOString().split("T")[0],
        venue,
        status: "DRAFT",
        chairpersonId: "N/A",
        secretaryId: "N/A"
      };
      const minutesRes: any = await client.graphql({
        query: createChamaMinutes,
        variables: {
          input: minutesInput
        }
      });
      const minutesId = minutesRes.data.createChamaMinutes.id;
      for (let entry of minutesEntries) {
        await client.graphql({
          query: createChamaMinutesItem,
          variables: {
            input: {
              minutesId,
              entryOrder: entry.entryNumber,
              minuteRef: entry.minuteNumber,
              title: `Entry ${entry.entryNumber}`,
              content: entry.minuteContent
            }
          }
        });
      }
      for (let member of attendanceList) {
        await client.graphql({
          query: createChamaMeetingAttendance,
          variables: {
            input: {
              minutesId,
              grpContact: selectedMemberGroup.groupContact,
              memberName: member.memberName,
              memberEmail: member.memberEmail,
              attendanceStatus: member.attendanceStatus,
              markedBy: userEmail,
              markedAt: new Date().toISOString()
            }
          }
        });
      }
      Alert.alert("Success", "Minutes saved successfully!");
      resetForm();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Error saving minutes.");
    }
  };
  const presentCount = attendanceList.filter(m => m.attendanceStatus === "PRESENT").length;
  const absentCount = attendanceList.filter(m => m.attendanceStatus === "ABSENT").length;
  const apologyCount = attendanceList.filter(m => m.attendanceStatus === "APOLOGY").length;

  // …render JSX here (unchanged)

  return <ScrollView style={styles.container} ref={scrollRef}>
      <Text style={styles.header}>Select Group</Text>
      {groups.map(memberGroup => {
      const isSelected = selectedMemberGroup?.groupContact === memberGroup.groupContact;
      return <View key={memberGroup.groupContact} style={styles.groupCard}>
            <Text style={styles.groupName}>{memberGroup.groupName}</Text>

            <View style={styles.groupActions}>
              {/* VIEW MINUTES — everyone */}
              <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate("ViewMinutes", {
            grpContact: memberGroup.groupContact,
            groupName: memberGroup.groupName
          })}>
                <Text style={styles.actionText}>📄 View Minutes</Text>
              </TouchableOpacity>

              {/* CREATE MINUTES */}
              {isSelected ? <TouchableOpacity style={[styles.createBtn, !isGroupAdmin && styles.disabledBtn]} disabled={!isGroupAdmin}>
                  <Text style={styles.actionText}>
                    {isGroupAdmin ? "➕ Create Minutes" : "🔒 Create Minutes"}
                  </Text>
                </TouchableOpacity> : <TouchableOpacity style={styles.createBtn} onPress={() => fetchGroupDetails(memberGroup.groupContact, memberGroup)}>
                  <Text style={styles.actionText}>Select Group</Text>
                </TouchableOpacity>}
            </View>
          </View>;
    })}

      {selectedMemberGroup && groupDetails && isGroupAdmin && <>
          <Text style={styles.header}>Meeting Date & Time</Text>
          <Button title={`Select Date: ${meetingDate.toLocaleDateString()} ${meetingDate.toLocaleTimeString()}`} color="#e29d58" onPress={() => setShowDatePicker(true)} />
          {showDatePicker && <DateTimePicker value={meetingDate} mode="date" display="default" onChange={onChangeDate} />}

          <Text style={styles.header}>Venue</Text>
          <TextInput style={styles.input} value={venue} onChangeText={setVenue} placeholder="Enter venue" />

         
          <Text style={styles.header}>Minutes Entries</Text>
          {minutesEntries.map((entry, idx) => <View key={idx} style={styles.entryContainer}>
              <Text style={styles.subHeader}>Entry {entry.entryNumber}</Text>
              <TextInput style={styles.input} placeholder="Minute Number (e.g., AK234)" value={entry.minuteNumber} onChangeText={text => {
          const updated = [...minutesEntries];
          updated[idx].minuteNumber = text;
          setMinutesEntries(updated);
        }} />
              <TextInput style={[styles.input, {
          height: 80
        }]} placeholder="Minute Content" value={entry.minuteContent} onChangeText={text => {
          const updated = [...minutesEntries];
          updated[idx].minuteContent = text;
          setMinutesEntries(updated);
        }} multiline />
              {minutesEntries.length > 1 && <Button title="Remove Entry" color="#e29d58" onPress={() => removeMinuteEntry(idx)} />}
            </View>)}
          <Button title="Add Minute Entry" color="#e29d58" onPress={addMinuteEntry} />

          <Text style={styles.header}>Attendance</Text>
          {attendanceList.map((member, idx) => <View key={idx} style={styles.attendanceRow}>
              <Text style={{
          flex: 1
        }}>{member.memberName}</Text>
              <Picker selectedValue={member.attendanceStatus} style={{
          flex: 1
        }} onValueChange={val => {
          const updated = [...attendanceList];
          updated[idx].attendanceStatus = val;
          setAttendanceList(updated);
        }}>
                <Picker.Item label="Present" value="PRESENT" />
                <Picker.Item label="Absent" value="ABSENT" />
                <Picker.Item label="Apology" value="APOLOGY" />
              </Picker>
            </View>)}

          <Text style={styles.header}>Attendance Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Present: {presentCount}</Text>
            <Text style={styles.summaryText}>Absent: {absentCount}</Text>
            <Text style={styles.summaryText}>Apology: {apologyCount}</Text>
          </View>

          <View style={{
        marginVertical: 20
      }}>
            <Button title="Save Minutes" color="#e29d58" onPress={saveMinutes} />
          </View>
        </>}
    </ScrollView>;
};
export default MinutesCreationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa"
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#333"
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#444"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: "#fff",
    fontSize: 14
  },
  entryContainer: {
    padding: 8,
    backgroundColor: "#e9ecef",
    borderRadius: 6,
    marginBottom: 12
  },
  attendanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd"
  },
  signature: {
    width: 150,
    height: 80,
    resizeMode: "contain",
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f1f3f5",
    borderRadius: 6
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  groupCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3
  },
  groupName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#212529"
  },
  groupActions: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  createBtn: {
    flex: 1,
    backgroundColor: "#e29d58",
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    alignItems: "center"
  },
  viewBtn: {
    flex: 1,
    backgroundColor: "#495057",
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
    alignItems: "center"
  },
  disabledBtn: {
    backgroundColor: "#adb5bd"
  },
  actionText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14
  }
});