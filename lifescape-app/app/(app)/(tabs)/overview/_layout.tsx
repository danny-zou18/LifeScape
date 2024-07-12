import React from 'react';
import { Stack } from 'expo-router';

export default function OverviewLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          title: "Overview"
        }} 
      />
      <Stack.Screen 
        name="account/index" 
        options={{
          headerShown: false,
          title: "Account",
          headerBackTitle: "Overview",
        }} 
      />
      <Stack.Screen 
        name="history/index" 
        options={{
          headerShown: false,
          title: "History",
          headerBackTitle: "Overview",
        }} 
      />
    </Stack>
  );
}