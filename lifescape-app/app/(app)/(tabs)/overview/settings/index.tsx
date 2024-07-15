import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState } from "react";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signOut } from "firebase/auth";

import { useRouter, Link } from "expo-router";

import { useGlobalContext } from "@/context/GlobalProvider";

const Settings = () => {
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
    <SafeAreaView className=" mx-auto w-[90%] mt-5 mb-2">
      <View className="w-full rounded-lg overflow-hidden bg-black">
        <Link href="/overview/account" className="p-4 w-full ">
          <Text className="text-white">Account</Text>
        </Link>
        <View className="w-full h-[1px] bg-white"></View>
        <Link href="/overview/history" className="p-4  w-full ">
          <Text className="text-white">History</Text>
        </Link>
        <View className="w-full h-[1px] bg-white"></View>
      </View>

      {isSigningIn ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button
            title="Sign Out"
            onPress={() => {
              handleSignOut();
            }}
          ></Button>
        </>
      )}
    </SafeAreaView>
  );
};

export default Settings;
