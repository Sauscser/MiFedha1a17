import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';

export interface SMAccount {
  SMAc: {
    id: string;
    transportkntct: string;
    transportRate: number;
    transportdesc: number;
    
    transportPhoto: number;
    transportName: string;
    transportType: string;
    
    ImageUrl: string;
    numberPlate: string;
  };
}

const ViewSMDeposts = ({ SMAc }: SMAccount) => {
  const {
    id,
    
    transportkntct,
    transportRate,
    ImageUrl,
    numberPlate,
    transportdesc,
    transportPhoto,
    transportName,
    transportType,
  
  } = SMAc;

  const handleOpenLink = () => {
      if (ImageUrl) {
        Linking.openURL(ImageUrl).catch(err => console.error("Couldn't load page", err));
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://mifedhasalesadsphotosc789c-mifedha.s3.us-east-1.amazonaws.com/public/${transportPhoto}`,
          }}
          style={styles.carouselImage}
          resizeMode="cover"
        />

        <View style={styles.infoSection}>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Transport Name:</Text> {transportName}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Number Plate:</Text> {numberPlate}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Transport Type:</Text> {transportType}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Cost per Kilometer:</Text> KES {transportRate.toLocaleString()}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Contact Number:</Text> {transportkntct}
          </Text>       

          {/* Optional video / URL display */}
                    {ImageUrl && (
                      <TouchableOpacity onPress={handleOpenLink} style={{ marginTop: 10 }}>
                        <Text style={[styles.prodInfo, { color: 'blue', textDecorationLine: 'underline' }]}>
                          View Related Link
                        </Text>
                      </TouchableOpacity>
                    )}
         
          <Text style={styles.prodDesc}>{transportdesc}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewSMDeposts;
