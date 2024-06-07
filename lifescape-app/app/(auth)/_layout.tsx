import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Stack } from "expo-router";

const AuthLayout:React.FC = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};
export default AuthLayout;
