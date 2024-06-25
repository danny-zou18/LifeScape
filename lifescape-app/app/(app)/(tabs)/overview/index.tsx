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
    <View style={styles.container}>
      <View style={styles.topButtonContainer}>
        <Link href="/overview/account" style={styles.button}>
          <Text style={styles.buttonText}>Account</Text>
        </Link>
      </View>
      <Text style={styles.text}>Overview</Text>
      {isSigningIn ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.bottomButtonContainer}>
          <Button
            title="Sign Out"
            onPress={() => {
              handleSignOut();
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  topButtonContainer: {
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#FFA001',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
  bottomButtonContainer: {
    alignItems: 'center',
  },
});

export default Overview;
