import { View } from "react-native";
import React from "react";

import AccountInfo from "@/components/overview/settings/account/AccountInfo";
import LoginMethod from "@/components/overview/settings/account/LoginMethod";
import AccountAction from "@/components/overview/settings/account/AccountAction";

const Account = () => {
  return (
    <View className="flex-1 gap-12 bg-gray-100 p-5">
      <AccountInfo />
      <LoginMethod />
      <AccountAction />
    </View>
  );
};

export default Account;
