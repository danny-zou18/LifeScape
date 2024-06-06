import { View, Text, SafeAreaView, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";

import { FIREBASE_AUTH } from "@/FirebaseConfig";

import { Link } from "expo-router";

const signIn = () => {
  const [email_or_username, set_email_or_username] = useState("");
  const [password, set_password] = useState("");
  const [loading, set_loading] = useState(false);

  const auth = FIREBASE_AUTH;

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh]  flex flex-col justify-center items-center px-4 my-6">
          <TextInput placeholder="Email Or Username"></TextInput>
          <TextInput placeholder="Password"></TextInput>
          <View className="flex flex-row">
            <Text>Don't have an Account?</Text>
            <Link href="/sign-up" className="ml-4">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signIn;
