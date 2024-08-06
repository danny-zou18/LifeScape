import { View, Text, ScrollView } from "react-native";
import { router } from "expo-router";

import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/onboarding/CustomButton";

const Index: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="min-h-[100vh] w-full flex-1 items-center justify-center  bg-white px-4">
          <Text className="">HELLO THIS IS THE ONBOARDING PAGE</Text>
          <CustomButton
            title="Sign in"
            onPress={() => router.push("sign-in")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
