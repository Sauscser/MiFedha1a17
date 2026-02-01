import { generateClient } from 'aws-amplify';
import { getCurrentUser, fetchUserAttributes } from '@aws-amplify/auth';
import { uploadData, getUrl } from '@aws-amplify/storage';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function GlobalHeader({ user, signOut }) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#e29d58', 'skyblue']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.container, { paddingTop: insets.top + 24 }]}
    >
      <Text style={styles.greeting}>Welcome, {user?.username}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text style={styles.signOut}>Sign Out</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  signOut: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
