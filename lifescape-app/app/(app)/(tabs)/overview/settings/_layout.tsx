import React from "react";
import { Stack, Link } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="account/index"
        options={{
          headerShown: true,
          title: "Account",
          headerBackTitle: "Done",
        }}
      />
      <Stack.Screen
        name="history/index"
        options={{
          headerShown: true,
          title: "History",
          headerBackTitle: "Done",
        }}
      />
    </Stack>
  );
}
