import React from "react";
import { Stack, Link } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="account/index"
        options={{
          headerShown: false,
          title: "Account",
        }}
      />
      <Stack.Screen
        name="history/index"
        options={{
          headerShown: false,
          title: "History",
        }}
      />
    </Stack>
  );
}
