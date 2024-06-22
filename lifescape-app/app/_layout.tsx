
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import "../global.css"
import { useFonts } from 'expo-font';
import GlobalProvider from '@/context/GlobalProvider';

import FontAwesome from '@expo/vector-icons/FontAwesome';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
        <Stack.Screen name ="(app)" options={{ headerShown: false }}/>
      </Stack>
    </GlobalProvider>
  );
}
