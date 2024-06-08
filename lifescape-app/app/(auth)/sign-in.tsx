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
import {
  useForm,
  FieldValues,
} from "react-hook-form";
import React, { useState } from "react";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword} from "firebase/auth";

import { useGlobalContext } from "@/context/GlobalProvider";

import { Link, useRouter } from "expo-router";

const SignIn: React.FC = () => {
  // const [email, set_email] = useState<string>("");
  // const [password, set_password] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const auth = FIREBASE_AUTH;
  const win = Dimensions.get('window');
  const router = useRouter();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const submitHandler = async ({ email, password }: FieldValues) => {
    // console.log(email, password)
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=> {
      ;
    })
    .catch((error)=> {
      console.log(error);
    })
    .finally(()=>{
      setLoading(false);
    })
  }

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View className="p-8 relative" style={{ width: win.width, height: win.width }}>
            {/* lifescape image  */}
            <Image
              source={require('../.././assets/images/LifeScape.png')}
              className="w-full h-full"
            />
          </View>
          <View className="w-full flex flex-col justify-center items-center px-4 my-6 gap-4">
            <View className="">
              <Text className="text-xl text-neutral-700 pb-1">Email</Text>
              <TextInput
                id="email"
                autoCapitalize="none"
                onChangeText={(text) => setValue('email', text)}
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
                onChangeText={(text) => setValue('password', text)}
                autoComplete="current-password"
                className="w-[300px] h-[60px] bg-black rounded-md text-white px-3"
              />
            </View>
  
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <TouchableHighlight onPress={handleSubmit(submitHandler)} className="bg-[#FDFDFD] w-[225px] h-[45px] rounded-md mt-4" underlayColor="#FFFFFF">
                  <Text className="text-black text-xl font-semibold mx-auto my-auto">Login</Text>
                </TouchableHighlight>
              </>
            )}
            <View className="flex flex-row mt-4">
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
