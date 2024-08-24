import { View, Text } from "react-native";
import React from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

const AccountInfo = () => {
  const { psqlUser } = useGlobalContext();
  return (
    <View>
      <Text className="mb-1 ml-2 font-[600]">ACCOUNT INFO</Text>
      <View className="w-full rounded-lg bg-white px-3 py-2 shadow-md">
        <View className="">
          <Text className="text-lg font-semibold">Username:</Text>
          <Text className="text-base">{psqlUser?.username}</Text>
        </View>

        <View className="my-2">
          <Text className="text-lg font-semibold">Email:</Text>
          <Text className="text-base">{psqlUser?.email}</Text>
        </View>

        <View className="">
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

export default AccountInfo;
