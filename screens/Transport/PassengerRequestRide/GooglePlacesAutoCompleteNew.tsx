import React, { useState, useMemo } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
type Prediction = {
  place_id: string;
  description: string;
  lat: number;
  lon: number;
};
export type PlaceDetails = {
  placeId: string;
  description?: string;
  displayName?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
};
type Props = {
  placeholder?: string;
  onPlaceSelected?: (place: PlaceDetails) => void;
  minLength?: number;
  debounceMs?: number;
  containerStyle?: any;
  inputStyle?: any;
  listStyle?: any;
  itemStyle?: any;
  itemTextStyle?: any;
  clearOnSelect?: boolean;
  value?: string;
  onValueChange?: (val: string) => void;
};
export default function GooglePlacesAutocompleteNew({
  placeholder = 'Search location',
  onPlaceSelected,
  minLength = 2,
  debounceMs = 300,
  containerStyle,
  inputStyle,
  listStyle,
  itemStyle,
  itemTextStyle,
  clearOnSelect = false,
  value,
  onValueChange
}: Props) {
  const [internalQuery, setInternalQuery] = useState('');
  const query = value !== undefined ? value : internalQuery;
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce typing
  const debouncedFetch = useMemo(() => {
    let timer: NodeJS.Timeout | null = null;
    return (text: string) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fetchPredictions(text);
      }, debounceMs);
    };
  }, [debounceMs]);
  async function fetchPredictions(text: string) {
    if (text.trim().length < minLength) {
      setPredictions([]);
      return;
    }
    try {
      setLoading(true);
      // Use Photon API for OSM autocomplete
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=5`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data?.features) {
        setPredictions([]);
        setLoading(false);
        return;
      }
      const preds = data.features.map((f: any) => ({
        place_id: f.properties.osm_id ? String(f.properties.osm_id) : f.properties.osm_id || f.properties.name,
        description: f.properties.name + (f.properties.city ? ", " + f.properties.city : "") + (f.properties.country ? ", " + f.properties.country : ""),
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0]
      })) as Prediction[];
      setPredictions(preds);
    } catch (err) {
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  }
  function fetchPlaceDetails(item: Prediction) {
    const place: PlaceDetails = {
      placeId: item.place_id,
      description: item.description,
      displayName: item.description,
      location: {
        latitude: item.lat,
        longitude: item.lon
      }
    };
    onPlaceSelected?.(place);
    if (clearOnSelect) {
      if (onValueChange) onValueChange('');
      else setInternalQuery('');
      setPredictions([]);
    } else {
      if (onValueChange) onValueChange(place.displayName || '');
      else setInternalQuery(place.displayName || '');
      setPredictions([]);
    }
  }
  return <View style={[styles.container, containerStyle]}>
      <TextInput value={query} placeholder={placeholder} onChangeText={text => {
        if (onValueChange) onValueChange(text);
        else setInternalQuery(text);
        debouncedFetch(text);
      }} style={[styles.input, inputStyle]} />

      {loading ? <View style={styles.loadingRow}>
          <ActivityIndicator size="small" />
          <Text style={styles.loadingTxt}>Searching…</Text>
        </View> : null}

      {predictions.length > 0 && <FlatList keyboardShouldPersistTaps="handled" data={predictions} keyExtractor={item => item.place_id} style={[styles.list, listStyle]} renderItem={({
      item
    }) => <TouchableOpacity style={[styles.item, itemStyle]} onPress={() => fetchPlaceDetails(item)}>
              <Text style={[styles.itemTxt, itemTextStyle]}>{item.description}</Text>
            </TouchableOpacity>} />}
    </View>;
}
const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 6
  },
  loadingTxt: {
    marginLeft: 8,
    color: '#666',
    fontSize: 12
  },
  list: {
    backgroundColor: '#fff',
    marginTop: 6,
    borderRadius: 8,
    maxHeight: 220
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee'
  },
  itemTxt: {
    fontSize: 14,
    color: '#333'
  }
});