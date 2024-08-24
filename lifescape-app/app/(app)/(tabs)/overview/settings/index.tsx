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
    <SafeAreaView className=" mx-auto mb-2 mt-5 w-[90%]">
      <View className="w-full overflow-hidden rounded-lg bg-black">
        <Link href="/overview/settings/account" className="w-full p-4 ">
          <Text className="text-white">Account</Text>
        </Link>
        <View className="h-[1px] w-full bg-white"></View>
        <Link href="/overview/settings/history" className="w-full  p-4 ">
          <Text className="text-white">History</Text>
        </Link>
        <View className="h-[1px] w-full bg-white"></View>
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
