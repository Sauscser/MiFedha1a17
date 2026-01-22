import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { Auth, graphqlOperation, API, Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import { createChamaAdminLnApply } from '../../../../src/graphql/mutations';
import { getGroup, getSMAccount } from '../../../../src/graphql/queries';
import {
  listMinutesByChama,
  listMinuteItemsByMinutes,
  listAttendanceByMinutes,
} from '../../../../src/graphql/queries';

const MAX_IMAGE_SIZE_MB = 5;

/** =====================
 *  INLINE VIEW MINUTES MODAL
 *  ===================== */
const ViewMinutesModal = ({ visible, onClose, grpContact, onSelect }) => {
  const [minutesList, setMinutesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) fetchMinutes();
  }, [visible]);

  const fetchMinutes = async () => {
    try {
      const res: any = await API.graphql(
        graphqlOperation(listMinutesByChama, { grpContact, sortDirection: 'DESC' })
      );
      const minutes = res.data.listMinutesByChama.items || [];

      const enriched = await Promise.all(
        minutes.map(async (min) => {
          const [itemsRes, attendanceRes] = await Promise.all([
            API.graphql(graphqlOperation(listMinuteItemsByMinutes, { minutesId: min.id })),
            API.graphql(graphqlOperation(listAttendanceByMinutes, { minutesId: min.id })),
          ]);

          const chairSignUrl = min.chairpersonId ? await Storage.get(min.chairpersonId) : null;
          const secSignUrl = min.secretaryId ? await Storage.get(min.secretaryId) : null;

          return {
            ...min,
            items: itemsRes.data.listMinuteItemsByMinutes.items || [],
            attendance: attendanceRes.data.listAttendanceByMinutes.items || [],
            chairSignUrl,
            secSignUrl,
          };
        })
      );

      setMinutesList(enriched);
    } catch (err) {
      console.error('Error fetching minutes:', err);
      Alert.alert('Error', 'Failed to load minutes');
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  if (loading) {
    return (
      <View style={styles.modalCenter}>
        <ActivityIndicator size="large" color="#e58d29" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Select Loan Minutes</Text>

      {minutesList.map((min) => {
        const presentCount = min.attendance.filter((a) => a.attendanceStatus === 'PRESENT').length;
        return (
          <View key={min.id} style={styles.modalCard}>
            <Text style={styles.date}>📅 {min.meetingDate}</Text>
            <Text style={styles.meta}>Venue: {min.venue}</Text>
            <Text style={styles.meta}>Attendance: {presentCount}</Text>

            <Text style={styles.section}>Minutes</Text>
            {min.items
              .sort((a, b) => a.entryOrder - b.entryOrder)
              .map((item) => (
                <View key={item.id} style={styles.minuteItem}>
                  <Text style={styles.minuteTitle}>
                    {item.entryOrder}. {item.minuteRef}
                  </Text>
                  <Text>{item.content}</Text>
                  {item.decision && <Text style={styles.decision}>Decision: {item.decision}</Text>}
                </View>
              ))}

            <Text style={styles.section}>Signatures</Text>
            <View style={styles.signatures}>
              {min.chairSignUrl && <Image source={{ uri: min.chairSignUrl }} style={styles.signature} />}
              {min.secSignUrl && <Image source={{ uri: min.secSignUrl }} style={styles.signature} />}
            </View>

            <TouchableOpacity
              style={[styles.submitButton, { marginTop: 12 }]}
              onPress={() => {
                onSelect(min.id);
                onClose();
              }}
            >
              <Text style={styles.submitButtonText}>Attach This Minutes</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: '#6b7280', marginTop: 20 }]}
        onPress={onClose}
      >
        <Text style={styles.submitButtonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

/** =====================
 *  MAIN FORM COMPONENT
 *  ===================== */
const CreateBiz = () => {
  const [pword, setPW] = useState('');
  const [grpMinutes, setGrpMinutes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [minutesPhotoKey, setMinutesPhotoKey] = useState<string | null>(null);
  const [minutesPhotoUri, setMinutesPhotoUri] = useState<string | null>(null);

  const [minutesModalVisible, setMinutesModalVisible] = useState(false);

  const route = useRoute();

  /** IMAGE HANDLING **/
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets?.[0]?.uri) handleImage(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets?.[0]?.uri) handleImage(result.assets[0].uri);
  };

  const handleImage = async (uri: string) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 800 } }], {
        compress: 0.7,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      const response = await fetch(manipResult.uri);
      const blob = await response.blob();
      const imageSizeMB = blob.size / (1024 * 1024);
      if (imageSizeMB > MAX_IMAGE_SIZE_MB) {
        Alert.alert('Image too large', `Image is ${imageSizeMB.toFixed(2)}MB. Max ${MAX_IMAGE_SIZE_MB}MB.`);
        return;
      }

      const filename = `${Date.now()}_minutes.jpg`;
      await Storage.put(filename, blob, { contentType: 'image/jpeg' });
      setMinutesPhotoKey(filename);
      setMinutesPhotoUri(manipResult.uri);
      Alert.alert('Success', 'Minutes image uploaded successfully.');
    } catch (err) {
      console.error('Image upload failed:', err);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  const clearMinutesImage = () => {
    setMinutesPhotoKey(null);
    setMinutesPhotoUri(null);
  };

  /** SUBMIT LOGIC **/
  const gtUser = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const compDtls: any = await API.graphql(
        graphqlOperation(getSMAccount, { awsemail: userInfo.attributes.email })
      );
      const pws = compDtls.data.getSMAccount.pw;

      if (pws !== pword) {
        Alert.alert('Wrong password');
        setIsLoading(false);
        return;
      }

      const accountDtl: any = await API.graphql(
        graphqlOperation(getGroup, { grpContact: route.params.grpContact })
      );
      const GrpDtls = accountDtl.data.getGroup;

      if (!grpMinutes && !minutesPhotoKey) {
        Alert.alert('Please either attach minutes or upload a minutes image');
        setIsLoading(false);
        return;
      }

      await API.graphql(
        graphqlOperation(createChamaAdminLnApply, {
          input: {
            grpName: GrpDtls.grpName,
            ChamaAdminEmail: userInfo.attributes.email,
            GrpAccount: GrpDtls.grpContact,
            MemberEmail: minutesPhotoKey ? minutesPhotoKey : 'NoMinutesUploaded',
            grpMinutes: grpMinutes ? grpMinutes : 'NoMinutesProvided',
            status: 'AccountActive',
          },
        })
      );

      Alert.alert('Success', 'Loan floated successfully.');
      setPW('');
      setGrpMinutes(null);
      clearMinutesImage();
    } catch (e) {
      console.error(e);
      Alert.alert('Error!', 'Retry or update app or call customer care');
    } finally {
      setIsLoading(false);
    }
  };

  /** UI **/
  return (
    <LinearGradient colors={['skyblue', '#e58d29']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Float Loans</Text>
          <Text style={styles.headerSubtitle}>Please fill in all required details carefully</Text>
        </View>

        {/* FORM CARD */}
        <View style={styles.formCard}>
          {/* SELECT MINUTES */}
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={[styles.input, { justifyContent: 'center' }]}
              onPress={() => setMinutesModalVisible(true)}
            >
              <Text style={{ color: grpMinutes ? '#111' : '#6b7280' }}>
                {grpMinutes ? `Minutes Selected: ${grpMinutes}` : 'Select Loan Minutes'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.helperText}>Loan Minutes</Text>
          </View>

          {/* PASSWORD */}
          <View style={styles.inputGroup}>
            <TextInput
              placeholder="User Password"
              placeholderTextColor="#333"
              secureTextEntry
              value={pword}
              onChangeText={setPW}
              style={styles.input}
            />
            <Text style={styles.helperText}>Enter Main Account Password</Text>
          </View>

          {/* IMAGE UPLOAD */}
          <View style={styles.inputGroup}>
            <TouchableOpacity onPress={pickImage} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>
                {minutesPhotoUri ? 'Change Minutes Image' : 'Upload Group Minutes'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={takePhoto} style={[styles.submitButton, { marginTop: 10 }]}>
              <Text style={styles.submitButtonText}>Take Photo of Minutes</Text>
            </TouchableOpacity>
          </View>

          {/* PREVIEW */}
          {minutesPhotoUri && (
            <View style={{ marginTop: 16, alignItems: 'center' }}>
              <Image
                source={{ uri: minutesPhotoUri }}
                style={{ width: 200, height: 150, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb' }}
                resizeMode="cover"
              />
              <Text style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>Preview of uploaded minutes</Text>

              <TouchableOpacity onPress={clearMinutesImage} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove Image</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* SUBMIT */}
        <TouchableOpacity style={styles.submitButton} onPress={gtUser} activeOpacity={0.85}>
          <Text style={styles.submitButtonText}>Click to Float Loans</Text>
          {isLoading && <ActivityIndicator color="#fff" style={{ marginLeft: 10 }} />}
        </TouchableOpacity>

        {/* MINUTES MODAL */}
        <ViewMinutesModal
          visible={minutesModalVisible}
          onClose={() => setMinutesModalVisible(false)}
          grpContact={route.params.grpContact}
          onSelect={(id) => setGrpMinutes(id)}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default CreateBiz;

/** =====================
 *  STYLES
 *  ===================== */
const styles = StyleSheet.create({
  scrollContainer: { padding: 16, paddingBottom: 40 },
  header: { marginTop: 40, marginBottom: 24 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#ffffff' },
  headerSubtitle: { fontSize: 14, color: '#eef6ff', marginTop: 6 },
  formCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 18, marginBottom: 30, elevation: 6, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  inputGroup: { marginBottom: 16 },
  input: { backgroundColor: '#f9fafb', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, borderWidth: 1, borderColor: '#e5e7eb', color: '#111827' },
  helperText: { fontSize: 12, marginTop: 6, color: '#6b7280' },
  submitButton: { backgroundColor: '#e58d29', borderRadius: 18, paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', elevation: 4, shadowColor: '#e58d29', shadowOpacity: 0.4, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  submitButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700', letterSpacing: 0.6 },
  removeButton: { marginTop: 10, backgroundColor: '#e58d29', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#e58d29', shadowOpacity: 0.4, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },

  /** MODAL STYLES **/
  modalContainer: { maxHeight: '80%', backgroundColor: '#f8f9fa', padding: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#212529' },
  modalCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  date: { fontSize: 15, fontWeight: '600', color: '#495057' },
  meta: { fontSize: 14, color: '#6c757d', marginTop: 2 },
  section: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8, color: '#343a40' },
  minuteItem: { paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#dee2e6' },
  minuteTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4, color: '#212529' },
  decision: { marginTop: 4, fontStyle: 'italic', color: '#0f5132' },
  signatures: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  signature: { width: 140, height: 70, resizeMode: 'contain', borderWidth: 1, borderColor: '#ced4da', borderRadius: 6, backgroundColor: '#fff' },
  modalCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
