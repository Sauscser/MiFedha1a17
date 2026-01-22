import React, { useState, useMemo } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

type Prediction = {
  place_id: string;
  description: string;
};

export type PlaceDetails = {
  placeId: string;
  description?: string;
  displayName?: string;
  location?: { latitude: number; longitude: number };
};

type Props = {
  apiKey: string;
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
};

export default function GooglePlacesAutocompleteNew({
  apiKey,
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
}: Props) {
  const [query, setQuery] = useState('');
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
  }, [debounceMs, apiKey]);

  async function fetchPredictions(text: string) {
    if (!apiKey) return;
    if (text.trim().length < minLength) {
      setPredictions([]);
      return;
    }

    try {
      setLoading(true);

      const url =
        `https://places.googleapis.com/v1/places:autocomplete` +
        `?input=${encodeURIComponent(text)}` +
        `&regionCode=KE` + // restrict to Kenya
        `&languageCode=en` +
        `&key=${apiKey}`;

      const res = await fetch(url);
      const data = await res.json();

      console.log("Autocomplete response:", data);

      if (!data?.suggestions) {
        console.warn("No suggestions:", data);
        setPredictions([]);
        setLoading(false);
        return;
      }

      const preds = data.suggestions.map((s: any) => ({
        place_id: s.placePrediction.placeId,
        description: s.placePrediction.text.text,
      })) as Prediction[];

      setPredictions(preds);
    } catch (err) {
      console.warn('Autocomplete error:', err);
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchPlaceDetails(placeId: string, description?: string) {
    try {
      const url =
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}` +
        `?fields=location,displayName` +
        `&key=${apiKey}`;

      const res = await fetch(url);
      const data = await res.json();

      console.log("Place details response:", data);

      if (!data?.location) {
        console.warn('No location in details:', data);
        return;
      }

      const place: PlaceDetails = {
        placeId,
        description,
        displayName: data?.displayName?.text,
        location: {
          latitude: Number(data.location.latitude),
          longitude: Number(data.location.longitude),
        },
      };

      onPlaceSelected?.(place);

      if (clearOnSelect) {
        setQuery('');
        setPredictions([]);
      } else {
        setQuery(place.displayName || description || query);
        setPredictions([]);
      }
    } catch (err) {
      console.warn('Details error:', err);
    }
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        value={query}
        placeholder={placeholder}
        onChangeText={(text) => {
          setQuery(text);
          debouncedFetch(text);
        }}
        style={[styles.input, inputStyle]}
      />

      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" />
          <Text style={styles.loadingTxt}>Searching…</Text>
        </View>
      ) : null}

      {predictions.length > 0 && (
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={predictions}
          keyExtractor={(item) => item.place_id}
          style={[styles.list, listStyle]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.item, itemStyle]}
              onPress={() => fetchPlaceDetails(item.place_id, item.description)}
            >
              <Text style={[styles.itemTxt, itemTextStyle]}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  input: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 6,
  },
  loadingTxt: { marginLeft: 8, color: '#666', fontSize: 12 },
  list: {
    backgroundColor: '#fff',
    marginTop: 6,
    borderRadius: 8,
    maxHeight: 220,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  itemTxt: { fontSize: 14, color: '#333' },
});