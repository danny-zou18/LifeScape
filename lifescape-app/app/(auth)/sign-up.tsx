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
import {isAxiosError} from "axios";
import api from "@/api/axios";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Link } from "expo-router";
import { FieldValues, useForm } from "react-hook-form";

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;
  const win = Dimensions.get("window");

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
    },
  });

  const submitHandler = async ({
    name,
    username,
    email,
    password,
  }: FieldValues) => {
    // console.log(name, username, email, password)
    setLoading(true);
    try {
      const response = await api.post(
        "/auth/register",
        {
          name: name,
          username: username,
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        await signInWithEmailAndPassword(auth, email, password)
        .then(() => {})
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
            className="p-8 relative"
            style={{ width: win.width, height: win.width }}
          >
            {/* lifescape image  */}
            <Image
              source={require("../.././assets/images/LifeScape.png")}
              className="w-full h-full"
            />
          </View>
          <View className="w-full flex flex-col justify-center items-center px-4 my-6 gap-4">
            <View>
              <Text className="text-xl text-neutral-700 pb-1">Name</Text>
              <TextInput
                id="name"
                autoCapitalize="none"
                onChangeText={(text) => setValue("name", text)}
                autoComplete="name"
                className="w-[300px] h-[60px] bg-black rounded-md text-white px-3"
              />
            </View>
            <View>
              <Text className="text-xl text-neutral-700 pb-1">Username</Text>
              <TextInput
                id="username"
                autoCapitalize="none"
                onChangeText={(text) => setValue("username", text)}
                autoComplete="email"
                className="w-[300px] h-[60px] bg-black rounded-md text-white px-3"
              />
            </View>
            <View className="">
              <Text className="text-xl text-neutral-700 pb-1">Email</Text>
              <TextInput
                id="email"
                autoCapitalize="none"
                onChangeText={(text) => setValue("email", text)}
                autoComplete="email"
                className="w-[300px] h-[60px] bg-black rounded-md text-white px-3"
              />
            </View>
            <View>
              <Text className="text-xl text-neutral-700 pb-1">Password</Text>
              <TextInput
                id="password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(text) => setValue("password", text)}
                autoComplete="current-password"
                className="w-[300px] h-[60px] bg-black rounded-md text-white px-3"
              />
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <TouchableHighlight
                  onPress={handleSubmit(submitHandler)}
                  className="bg-[#FDFDFD] w-[225px] h-[45px] rounded-md mt-4"
                  underlayColor="#FFFFFF"
                >
                  <Text className="text-black text-xl font-semibold mx-auto my-auto">
                    Sign Up
                  </Text>
                </TouchableHighlight>
              </>
            )}

            <View className="flex flex-row mt-4">
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
