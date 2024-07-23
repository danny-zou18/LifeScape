import React from "react";
import { Text } from "react-native";
import { Stack, Link, usePathname } from "expo-router";

export default function CharacterLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Character",
          headerRight: () => (
            <Link href="/character/overview">
              <Text>Overview</Text>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="overview/index"
        options={{
          headerShown: true,
          title: "Character Overview",
          presentation: "modal",
          headerRight: () => (
            <Link href="/character">
              <Text>Done</Text>
            </Link>
          ),
          
        }}
      />
    </Stack>
  );
}
