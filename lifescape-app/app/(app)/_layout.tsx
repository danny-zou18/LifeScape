import React, { useEffect } from "react";

import { Stack, useRouter } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppLayout: React.FC = () => {
  const { loggedIn } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.replace("sign-in");
    }
  });

  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
};
export default AppLayout;
