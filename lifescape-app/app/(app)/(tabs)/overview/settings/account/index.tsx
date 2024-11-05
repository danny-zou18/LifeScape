import { View } from "react-native";
import React from "react";

import AccountInfo from "@/components/overview/settings/account/AccountInfo";
import LoginMethod from "@/components/overview/settings/account/LoginMethod";

const Account = () => {
  return (
    <View className="flex-1 gap-12 bg-gray-100 p-5">
      <AccountInfo />
      <LoginMethod />
    </View>
  );
};

export default Account;
