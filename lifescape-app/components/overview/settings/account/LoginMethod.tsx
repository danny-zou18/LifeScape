import { View, Text } from "react-native";
import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";

const LoginMethod = () => {
  return (
    <View>
      <Text className="mb-1 ml-2 font-[600]">LOGIN METHODS</Text>
      <View className="w-full rounded-lg bg-white px-4 py-2 shadow-md">
        <View className=" flex flex-row items-center justify-between">
          <View className="">
            <Text className="text-lg font-semibold">Password</Text>
            <Text>Set</Text>
          </View>
          <View>
            <TouchableHighlight>
              <Text className="text-lg font-[400]">Change Password</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginMethod;
