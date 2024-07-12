import { View, Text } from "react-native";
import React from "react";
import "nativewind";

import { useGlobalContext } from "@/context/GlobalProvider";

const Account = () => {
  const { psqlUser } = useGlobalContext();
  return (
    <View className="flex-1 bg-gray-100 p-5">
      <View className="w-full bg-white p-6 rounded-lg shadow-md">
        <View className="my-3">
          <Text className="text-lg font-semibold">Username:</Text>
          <Text className="text-base">{psqlUser?.username}</Text>
        </View>

        <View className="my-3">
          <Text className="text-lg font-semibold">Email:</Text>
          <Text className="text-base">{psqlUser?.email}</Text>
        </View>

        <View className="my-3">
          <Text className="text-lg font-semibold">Email Verification:</Text>
          <Text
            className={`text-base ${
                psqlUser?.emailVerified ? "text-green-600" : "text-red-600"
            }`}
          >
            {psqlUser?.emailVerified ? "Verified" : "Not Verified"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Account;
