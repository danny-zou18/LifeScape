import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { useForm, FieldValues } from "react-hook-form";
import React, { useState } from "react";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Link } from "expo-router";

const SignIn: React.FC = () => {
  // const [email, set_email] = useState<string>("");
  // const [password, set_password] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;
  const win = Dimensions.get("window");
  const {
    setValue,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async ({ email, password }: FieldValues) => {
    // console.log(email, password)
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
              <TextInput
                id="password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(text) => setValue("password", text)}
                autoComplete="current-password"
                className="h-[60px] w-[300px] rounded-md bg-black px-3 text-white"
              />
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
                    Login
                  </Text>
                </TouchableHighlight>
              </>
            )}
            <View className="mt-4 flex flex-row">
              <Text>Don't have an Account?</Text>
              <Link href="sign-up" className="ml-3">
                Sign up
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
