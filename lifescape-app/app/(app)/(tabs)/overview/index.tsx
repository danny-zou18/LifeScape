import { View, Text, ActivityIndicator, Button, StyleSheet } from "react-native";
import React, { useState } from "react";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signOut } from "firebase/auth";

import { useRouter, Link } from "expo-router";

import { useGlobalContext } from "@/context/GlobalProvider";

const Overview = () => {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const { loggedIn, setLoggedIn } = useGlobalContext();

  const router = useRouter();

  const auth = FIREBASE_AUTH;

  const handleSignOut = async () => {
    setIsSigningIn(true);
    await signOut(auth)
      .then(() => {
        if (loggedIn) {
          setLoggedIn(false);
        }
        router.replace("sign-in");
        alert("User Logged Out");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsSigningIn(false);
      });
  };
  
  return (
    <View className="flex-1 justify-between p-5 bg-gray-100">
      <View className="flex-col items-center mb-5">
        <Link href="/overview/account" className="px-5 py-3 bg-black rounded mb-3 w-40">
          <Text className="text-white font-bold">Account</Text>
        </Link>
        <Link href="/overview/history" className="px-5 py-3 bg-black rounded mb-3 w-40">
          <Text className="text-white font-bold">History</Text>
        </Link>
      </View>
      <Text className="text-center text-xl my-5">Overview</Text>
      {isSigningIn ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View className="items-center">
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            color="#000000"
          />
        </View>
      )}
    </View>
  );
};

export default Overview;
