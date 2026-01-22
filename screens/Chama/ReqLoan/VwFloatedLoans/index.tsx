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
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import ImageViewer from 'react-native-image-zoom-viewer';
import { LinearGradient } from 'expo-linear-gradient';

import { listChamaAdminLnApplies } from '../../../../src/graphql/queries'; // adjust path

const FloatedLoansList = () => {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const route = useRoute();
  const navigation = useNavigation();
  const groupContact = route.params.groupContact;
  const  MembaId = route.params.MembaId;


  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      try {
        const res: any = await API.graphql(
          graphqlOperation(listChamaAdminLnApplies, {
            filter: {
              GrpAccount: { eq: groupContact },
              status: { eq: 'AccountActive' },
            },
          })
        );
        setLoans(res.data.listChamaAdminLnApplies.items);
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Failed to fetch floated loans.');
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, [groupContact]);

  const viewUploadedMinutes = async (fileKey: string) => {
    try {
      const signedUrl = await Storage.get(fileKey);
      setSelectedImageUrl(signedUrl);
    } catch (err) {
      Alert.alert('Error', 'Could not load uploaded minutes.');
    }
  };

  const readWrittenMinutes = (minutesText: string) => {
    setSelectedText(minutesText);
  };

  const proceedToApply = (groupContact: string, MembaId: string, id: string) => {
    navigation.navigate("MemberReqChm", {groupContact, MembaId, id});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Floated Loans</Text>
      {loading && <ActivityIndicator size="large" color="#e58d29" />}
      {loans.map((loan) => (
        <View key={loan.id} style={styles.card}>
          <Text style={styles.title}>{loan.grpName}</Text>
          <Text style={styles.subtitle}>Floated by: {loan.ChamaAdminEmail}</Text>

          <View style={styles.buttonRow}>
            {loan.MemberEmail && loan.MemberEmail !== 'NoMinutesUploaded' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => viewUploadedMinutes(loan.MemberEmail)}
              >
                <Text style={styles.buttonText}>View Uploaded Minutes</Text>
              </TouchableOpacity>
            )}

           

            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'skyblue' }]}
              onPress={() => proceedToApply(groupContact, MembaId, loan.id)}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Image Modal */}
      <Modal visible={!!selectedImageUrl} transparent={true} animationType="slide">
        <LinearGradient
          colors={['skyblue', '#e58d29']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            {selectedImageUrl && (
              <ImageViewer
                imageUrls={[{ url: selectedImageUrl }]}
                enableSwipeDown
                onSwipeDown={() => setSelectedImageUrl(null)}
                backgroundColor="transparent"
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedImageUrl(null)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>

      {/* Text Modal */}
      {/* Text Modal */}
<Modal visible={!!selectedText} transparent={true} animationType="slide">
  <LinearGradient
    colors={['skyblue', '#e58d29']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.modalContainer}
  >
    <View style={styles.modalContent}>
      <ScrollView style={styles.textScroll}>
        <View style={styles.textFrame}>
          <Text style={styles.modalText}>{selectedText}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setSelectedText(null)}
      >
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
</Modal>

    </ScrollView>
  );
};

export default FloatedLoansList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111827',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },

  textScroll: {
  maxHeight: '80%',   // allow it to almost fill the screen
  marginBottom: 20,
  paddingHorizontal: 16,
},

textFrame: {
  borderWidth: 1,
  borderColor: '#e5e7eb', // subtle gray border
  borderRadius: 12,
  padding: 16,
  backgroundColor: '#fff', // white background for readability
},

modalText: {
  fontSize: 16,
  color: '#111827',
  lineHeight: 22,
},

  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    backgroundColor: '#e58d29',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },

  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#e58d29',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
