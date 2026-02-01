import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { remove, getUrl } from 'aws-amplify/storage';
import { deleteSokoAd } from '../../../src/graphql/mutations';
import Checkbox from 'expo-checkbox';
// or any checkbox lib you're using

type Props = {
  SMAc: any;
  selectMode: boolean;
  isSelected: boolean;
  toggleSelect: () => void;
  onDeleteComplete: () => void;
};

const client = generateClient();

const NonLnRec: React.FC<Props> = ({ SMAc, selectMode, isSelected, toggleSelect, onDeleteComplete }) => {
  const handleDelete = () => {
    Alert.alert("Confirm Deletion", `Delete ${SMAc.sokoname}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            if (SMAc?.itemPhoto) {
              await remove({ key: SMAc.itemPhoto });
            }
            await client.graphql({
              query: deleteSokoAd,
              variables: { input: { id: SMAc.id } }
            });
            Alert.alert("Deleted", "Ad removed.");
            onDeleteComplete();
          } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to delete.");
          }
        }
      }
    ]);
  };

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={selectMode ? toggleSelect : handleDelete}
      activeOpacity={0.8}
    >
      <View style={styles.topRow}>
        {selectMode && (
          <Checkbox
            value={isSelected}
            onValueChange={toggleSelect}
            color={isSelected ? '#e58d29' : undefined}
          />
        )}

        <Text style={styles.name}>{SMAc.sokoname}</Text>
      </View>

      <Text style={styles.detail}>Price: Ksh {SMAc.sokoprice}</Text>
      <Text style={styles.detail}>Seller: {SMAc.sokokntct}</Text>

      {SMAc?.itemPhoto && (
        <Image
          source={{ uri: `https://mifedhasalesadsphotos7c102-dev.s3.us-east-1.amazonaws.com/public/${SMAc.itemPhoto}` }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
};

export default NonLnRec;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardSelected: {
    borderColor: '#e58d29',
    backgroundColor: '#fffbe6',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 160,
    marginTop: 10,
    borderRadius: 8,
  },
});
