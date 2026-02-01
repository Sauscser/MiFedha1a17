import React from 'react';
import { View, Text, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import styles from './styles';

export interface SMAccount {
  SMAc: {
    sokokntct: string;
    sokoname: string;
    sokoprice: number;
    sokolnprcntg: number;
    sokodesc: string;
    sokolpymntperiod: number;
    bizContact: string;
    bizName: string;
    businessType: string;
    itemUnit: string;
    unitQuantity: number;
    itemBrand: string;
    itemPhoto: string;
    
    sokotown?: string; // new optional video/url field
  };
}

const ViewSMDeposts = ({ SMAc }: SMAccount) => {
  const {
    sokokntct,
    itemPhoto,
    sokoname,
    sokoprice,
    itemBrand,
    sokodesc,
    bizContact,
    bizName,
    businessType,
    itemUnit,
    unitQuantity,
    sokotown,
     // added here
  } = SMAc;

  const handleOpenLink = () => {
    if (sokotown) {
      Linking.openURL(sokotown).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://mifedhasalesadsphotosc789c-mifedha.s3.us-east-1.amazonaws.com/public/${itemPhoto}`,
          }}
          style={styles.carouselImage}
          resizeMode="cover"
        />

        <View style={styles.infoSection}>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Bizna Account Number:</Text> {sokokntct}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Item Name:</Text> {sokoname}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Item Price:</Text> KES {sokoprice.toLocaleString()}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Brand:</Text> {itemBrand}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Bizna Contact:</Text> {bizContact}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Bizna Name:</Text> {bizName}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Business Type:</Text> {businessType}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Unit of Measure:</Text> {itemUnit}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Number of Units:</Text> {unitQuantity}
          </Text>
          {/* Optional video / URL display */}
          {sokotown && (
            <TouchableOpacity onPress={handleOpenLink} style={{ marginTop: 10 }}>
              <Text style={[styles.prodInfo, { color: 'blue', textDecorationLine: 'underline' }]}>
                View Related Link
              </Text>
            </TouchableOpacity>
          )}
          <Text style={styles.prodDesc}>{sokodesc}</Text>

          
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewSMDeposts;
