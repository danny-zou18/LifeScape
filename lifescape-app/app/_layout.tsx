
import { Stack } from 'expo-router';
import "../global.css"
import GlobalProvider from '@/context/GlobalProvider';

const RootLayoutNav = () => {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)"/>
        <Stack.Screen name ="(app)" />
      </Stack>
    </GlobalProvider>
  );
}
