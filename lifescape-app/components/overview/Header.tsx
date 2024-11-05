import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = () => {
  return (
    <SafeAreaView className="flex-col` flex gap-5 bg-gray-800">
      <Text>Header</Text>
      <View className="mx-auto mb-5 flex w-[70%] flex-row items-center justify-between bg-red-400">
        <Link href="/overview/friends">
          <FontAwesome5 name="user-friends" size={28} color="black" />
        </Link>
        <AntDesign name="mail" size={28} color="black" />
        <Link href="/overview/settings">
          <Ionicons name="settings-outline" size={28} color="black" />
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Header;
