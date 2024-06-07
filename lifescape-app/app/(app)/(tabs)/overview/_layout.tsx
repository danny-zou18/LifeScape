// Overview/OverviewScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

const OverviewScreen = () => {
   

    return (
        <Stack>
            <Stack.Screen name = "Account"/>
        </Stack>
    );
};

export default OverviewScreen;