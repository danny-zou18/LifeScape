
import { Stack } from 'expo-router';
import "../global.css"

const RootLayoutNav = () => {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)"/>
      </Stack>
  );
}
