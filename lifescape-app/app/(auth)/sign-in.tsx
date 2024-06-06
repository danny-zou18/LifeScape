import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Link, useRouter } from "expo-router";

const SignIn:React.FC = () => {
  const [email, set_email] = useState<string>("");
  const [password, set_password] = useState<string>("");
  const [loading, set_loading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;

  const router = useRouter();

  const handle_login = async () => {
    set_loading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      router.replace("");
    } catch (error) {
      console.log(error);
    } finally {
      set_loading(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View className="w-full min-h-[85vh]  flex flex-col justify-center items-center px-4 my-6 bg-red-500">
            <TextInput
              placeholder="Email"
              className="p-4 bg-black text-white min-w-[60%] rounded-full"
              onChangeText={(text) => set_email(text)}
              autoCapitalize="none"
              value={email}
            ></TextInput>
            <TextInput
              placeholder="Password"
              className="p-4 mt-2 bg-black text-white min-w-[60%] rounded-full"
              onChangeText={(text) => set_password(text)}
              value={password}
              secureTextEntry={true}
            ></TextInput>
            <View className="flex flex-row">
              <Text>Don't have an Account?</Text>
              <Link href="sign-up" className="ml-4">
                Sign up
              </Link>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Button title="Login" onPress={() => {handle_login()}}></Button>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
