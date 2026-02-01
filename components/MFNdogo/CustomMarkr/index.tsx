import React from 'react';
import { View, Text } from 'react-native';
import { Marker } from 'react-native-maps';

interface Props {
  coordinate: { latitude: number; longitude: number };
  totalDiscount: number;
  onPress: () => void;
  isSelected: boolean;
}

const CustomMarker = ({ coordinate, totalDiscount, onPress, isSelected }: Props) => {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View
        style={{
          backgroundColor: isSelected ? 'orange' : 'black',
          padding: 4,
          borderRadius: 6,
          borderColor: isSelected ? 'red' : 'green',
          borderWidth: 2,
          transform: [{ scale: isSelected ? 1 : 1 }],
        }}
      >
        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 12 }}>
          -{totalDiscount.toFixed(1)}%
        </Text>
      </View>
    </Marker>
  );
};

export default React.memo(CustomMarker);
