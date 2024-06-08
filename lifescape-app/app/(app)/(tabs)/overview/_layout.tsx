import React from 'react';
import { Stack } from 'expo-router';

export default function OverviewLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" 
      options={{ 
        headerShown: false
         }} 
         />
      <Stack.Screen name="account" 
      options={{ 
        title: 'Account',
        headerBackTitle: 'Overview',
      }} 
        
        />
    </Stack>
  );
}