import { View, Text } from "react-native";
import React from "react";

const AccountAction = () => {
  return (
    <View>
      <Text className="mb-1 ml-2 font-[600]">ACCOUNT ACTION</Text>
      <View className="w-full rounded-lg bg-white px-4 py-2 shadow-md">
        <View className=" flex flex-row items-center justify-between">
          <View className="">
            <Text className="text-lg font-semibold">Delete Account</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountAction;
