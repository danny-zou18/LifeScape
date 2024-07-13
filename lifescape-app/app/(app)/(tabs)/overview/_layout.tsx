import React from 'react';
import { Stack } from 'expo-router';

export default function OverviewLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: true,
          title: "Overview"
        }} 
      />
      <Stack.Screen 
        name="account/index" 
        options={{
          headerShown: true,
          title: "Account",
          headerBackTitle: "Overview",
        }} 
      />
      <Stack.Screen 
        name="history/index" 
        options={{
          headerShown: true,
          title: "History",
          headerBackTitle: "Overview",
        }} 
      />
      <Stack.Screen 
        name="settings/index" 
        options={{
          headerShown: true,
          title: "Settings",
          headerBackTitle: "Overview",
        }}
      />
      
    </Stack>
  );
}