import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import useColorScheme from './hooks/useColorScheme';
import RootNav from './navigation/RootNav';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

Amplify.configure(awsconfig);

function AuthenticatedApp() {
  const { user, signOut } = useAuthenticator();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <RootNav
        colorScheme={colorScheme}
        user={user}
        signOut={signOut}
      />
      <StatusBar />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <AuthenticatedApp />
      </Authenticator>
    </Authenticator.Provider>
  );
}
