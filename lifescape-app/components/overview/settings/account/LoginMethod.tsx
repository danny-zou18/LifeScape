import { View, Text } from "react-native";
import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";

const LoginMethod = () => {
  return (
    <View>
      <Text className="font-[600] mb-1 ml-2">LOGIN METHODS</Text>
      <View className="w-full bg-white py-2 px-4 rounded-lg shadow-md">
        <View className=" flex flex-row justify-between items-center">
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
