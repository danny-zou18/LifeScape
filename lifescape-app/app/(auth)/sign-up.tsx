import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState } from "react";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { Link, useRouter } from "expo-router";

const SignUp:React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;

  const router = useRouter();

  const handle_signup = async () => {
    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      alert("User Created");
      console.log(user);
      router.replace("");
    } catch (error) {
      alert("User Creation Failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView behavior="padding">
          <View className="w-full min-h-[85vh]  flex flex-col justify-center items-center px-4 my-6 bg-red-50">
            <TextInput
              placeholder="Username"
              className="p-4 bg-black text-white min-w-[60%] rounded-full f"
              onChangeText={(text) => setUserName(text)}
              autoCapitalize="none"
              value={userName}
            ></TextInput>
            <TextInput
              placeholder="Email"
              className="p-4 mt-2 bg-black text-white min-w-[60%] rounded-full"
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              value={email}
            ></TextInput>
            <TextInput
              placeholder="Password"
              className="p-4 mt-2 bg-black text-white min-w-[60%] rounded-full"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            ></TextInput>
            <View className="flex flex-row">
              <Text>Already have an Account?</Text>
              <Link href="sign-in" className="ml-4">
                Login
              </Link>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Button
                  title="Sign Up"
                  onPress={() => {
                    handle_signup();
                  }}
                ></Button>
              </>
            )}
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
