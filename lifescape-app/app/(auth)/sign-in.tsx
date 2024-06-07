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
import React, { useState, useEffect } from "react";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { useGlobalContext } from "@/context/GlobalProvider";

import { Link, useRouter } from "expo-router";

const SignIn:React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {loggedIn,setLoggedIn} = useGlobalContext();

  const auth = FIREBASE_AUTH;

  const router = useRouter();

  const handle_login = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=> {
      setLoggedIn(true);
      router.replace("home")
      alert("User Logged In");
    })
    .catch((error)=> {
      console.log(error);
    })
    .finally(()=>{
      setLoading(false);
    })
  }
  const handle_signout = async () => {
    setLoading(true);
    await signOut(auth)
    .then(() => {
      setLoggedIn(false);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(()=> {
      setLoading(false);
    })
  }

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View className="w-full min-h-[85vh]  flex flex-col justify-center items-center px-4 my-6 bg-red-500">
            <TextInput
              placeholder="Email"
              className="p-4 bg-black text-white min-w-[60%] rounded-full"
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
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <Button title="sign out" onPress={()=>handle_signout()}></Button>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
