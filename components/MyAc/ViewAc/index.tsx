import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { getUrl } from 'aws-amplify/storage';

export interface SMAccount {
  SMAc: {
    name: string;
    balance: number;
    ttlDpstSM: number;
    TtlWthdrwnSM: number;
    benefitsAmount: number;
    MaxTymsBL: number;
    photoPassport?: string; // Amplify Storage key
    idFront?: string;       // optional S3 key
    idBack?: string;        // optional S3 key
  };
}

const SMCvLnStts = (props: SMAccount) => {
  const {
    SMAc: { name, balance, ttlDpstSM, TtlWthdrwnSM, benefitsAmount, MaxTymsBL, photoPassport, idFront, idBack },
  } = props;

  const [photoUrls, setPhotoUrls] = useState<{ passport?: string; idFront?: string; idBack?: string }>({});
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const urls: any = {};
        if (photoPassport) {
          const passportUrl = await getUrl({ key: photoPassport });
          urls.passport = passportUrl.url.toString();
        }
        if (idFront) {
          const idFrontUrl = await getUrl({ key: idFront });
          urls.idFront = idFrontUrl.url.toString();
        }
        if (idBack) {
          const idBackUrl = await getUrl({ key: idBack });
          urls.idBack = idBackUrl.url.toString();
        }
        setPhotoUrls(urls);
      } catch (err) {
        console.log('Error fetching photos:', err);
      } finally {
        setLoadingPhotos(false);
      }
    };
    fetchPhotos();
  }, [photoPassport, idFront, idBack]);

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {loadingPhotos ? (
          <ActivityIndicator size="large" color="#e58d29" />
        ) : photoUrls.passport ? (
          <Image source={{ uri: photoUrls.passport }} style={styles.passportImage} />
        ) : (
          <View style={[styles.passportImage, { backgroundColor: '#eee' }]} />
        )}
        <Text style={styles.userName}>{name}</Text>
      </View>

      {/* Account Info Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Overview</Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Balance: </Text>KES {balance.toFixed(2)}
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Times Blacklisted: </Text>{MaxTymsBL}
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Secured Benefits Pooled: </Text>KES {benefitsAmount.toFixed(2)}
        </Text>
      </View>

      {/* Cash Flow Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Cash Flow</Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Total Deposits: </Text>KES {ttlDpstSM.toFixed(2)}
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Total Withdrawn: </Text>KES {TtlWthdrwnSM.toFixed(2)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default SMCvLnStts;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#e58d29',
  },
  infoRow: {
    fontSize: 16,
    marginBottom: 6,
    color: '#444',
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  passportImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#e58d29',
    marginBottom: 12,
    resizeMode: 'cover',
  },
  idSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  idImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e58d29',
    resizeMode: 'cover',
  },
});
