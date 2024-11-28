import {
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { isAxiosError } from "axios";
import api from "@/api/axios";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Link } from "expo-router";
import { FieldValues, useForm } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;
  const win = Dimensions.get("window");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = async ({
    name,
    username,
    email,
    password,
    confirmPassword,
  }: FieldValues) => {
    // console.log(name, username, email, password)
    setLoading(true);
    if (confirmPassword !== password) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }
    try {
      const response = await api.post("/auth/register", {
        name: name,
        username: username,
        email: email,
        password: password,
      });
      if (response.status === 200) {
        await signInWithEmailAndPassword(auth, email, password)
          .then(() => { })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        // AxiosError type will have a response property
        console.log(error.response?.data);
      } else {
        // Handle other error types if needed
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View
            className="relative p-8"
            style={{ width: win.width, height: win.width }}
          >
            {/* lifescape image  */}
            <Image
              source={require("../.././assets/images/LifeScape.png")}
              className="h-full w-full"
            />
          </View>
          <View className="my-6 flex w-full flex-col items-center justify-center gap-4 px-4">
            <View>
              <Text className="pb-1 text-xl text-neutral-700">Name</Text>
              <TextInput
                id="name"
                autoCapitalize="none"
                onChangeText={(text) => setValue("name", text)}
                autoComplete="name"
                className="h-[60px] w-[300px] rounded-md bg-black px-3 text-white"
              />
            </View>
            <View>
              <Text className="pb-1 text-xl text-neutral-700">Username</Text>
              <TextInput
                id="username"
                autoCapitalize="none"
                onChangeText={(text) => setValue("username", text)}
                autoComplete="email"
                className="h-[60px] w-[300px] rounded-md bg-black px-3 text-white"
              />
            </View>
            <View className="">
              <Text className="pb-1 text-xl text-neutral-700">Email</Text>
              <TextInput
                id="email"
                autoCapitalize="none"
                onChangeText={(text) => setValue("email", text)}
                autoComplete="email"
                className="h-[60px] w-[300px] rounded-md bg-black px-3 text-white"
              />
            </View>
            <View>
              <Text className="pb-1 text-xl text-neutral-700">Password</Text>
              <View className="flex flex-row items-center h-[60px] w-[300px] rounded-md bg-black px-3">
                <TextInput
                  id="password"
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                  onChangeText={(text) => setValue("password", text)}
                  autoComplete="current-password"
                  className="flex-1 text-white"
                />
                <MaterialCommunityIcons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="white"
                  onPress={toggleShowPassword}
                  style={{ paddingRight: 15 }}
                />
              </View>
            </View>
            <View>
              <Text className="pb-1 text-xl text-neutral-700">Re-Enter Password</Text>
              <View className="flex flex-row items-center h-[60px] w-[300px] rounded-md bg-black px-3">
                <TextInput
                  id="confirmPassword"
                  autoCapitalize="none"
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={(text) => setValue("confirmPassword", text)}
                  autoComplete="current-password"
                  className="flex-1 text-white"
                />
                <MaterialCommunityIcons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="white"
                  onPress={toggleShowConfirmPassword}
                  style={{ paddingRight: 15 }}
                />
              </View>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <TouchableHighlight
                  onPress={handleSubmit(submitHandler)}
                  className="mt-4 h-[45px] w-[225px] rounded-md bg-[#FDFDFD]"
                  underlayColor="#FFFFFF"
                >
                  <Text className="mx-auto my-auto text-xl font-semibold text-black">
                    Sign Up
                  </Text>
                </TouchableHighlight>
              </>
            )}

            <View className="mt-4 flex flex-row">
              <Text>Already have an Account?</Text>
              <Link href="sign-in" className="ml-3">
                Login
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
