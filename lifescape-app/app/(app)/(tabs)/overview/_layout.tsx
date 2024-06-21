import React from 'react';
import { Stack } from 'expo-router';

export default function OverviewLayout() {
  return (
    <Stack>
      <Stack.Screen name="account" 
      options={{ 
        headerShown: false
      }} 
        
        />
    </Stack>
  );
}