import { View, Text, ActivityIndicator, Button } from "react-native";
import React, { useState } from "react";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signOut } from "firebase/auth";

import { useRouter } from "expo-router";

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
    <View>
      <Text>Overview</Text>
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
    </View>
  );
};
export default Overview;