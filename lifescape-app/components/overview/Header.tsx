import { View, Text, SafeAreaView, TouchableHighlight } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

const Header = () => {
  return (
    <SafeAreaView className="bg-gray-800 flex flex-col` gap-5">
      <Text>Header</Text>
      <View className="mx-auto bg-red-400 w-[70%] flex flex-row justify-between items-center mb-5">
        <FontAwesome5 name="user-friends" size={28} color="black" />
        <AntDesign name="mail" size={28} color="black" />
        <Link href="/overview/settings">
          <Ionicons name="settings-outline" size={28} color="black" />
        </Link>       
      </View>
    </SafeAreaView>
  );
};

export default Header;
