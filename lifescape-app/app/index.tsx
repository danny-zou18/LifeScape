import { View, Text, ScrollView, Button } from "react-native";
import { Redirect, router } from "expo-router";

import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/onboarding/CustomButton";

const index = () => {
  return (
    <SafeAreaView >
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex-1 justify-center items-center h-full px-4">
          <Text className="">HELLO THIS IS THE ONBOARDING PAGE</Text>
          <CustomButton title="Sign in" onPress={()=>router.push("/sign-in") } />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
