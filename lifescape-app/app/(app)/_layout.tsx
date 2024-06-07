import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { Stack, useRouter } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const AppLayout:React.FC = () => {
    const {loggedIn} = useGlobalContext();

    useEffect(()=>{
        if(!loggedIn){
            useRouter().push("sign-in");
        }
    })

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};
export default AppLayout;
