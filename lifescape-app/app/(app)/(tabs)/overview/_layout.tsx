import React from 'react';
import { Stack, Link } from 'expo-router';

import Header from '@/components/overview/Header';

export default function OverviewLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: true,
          title: "Overview",
          header: Header,
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{
          headerShown: true,
          title: "Settings",
          headerBackTitle: "Done",
          presentation: "modal",
          headerRight: () => (
            <Link
              href={"/overview"}
            >
              Done
            </Link>
          ),

        }}
      />
    </Stack>
  );
}