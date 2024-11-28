import { View, Text, Image } from "react-native";
import React from "react";
import EquippedItems from "./EquippedItems";
import CharacterView from "./CharacterView";

const CharacterEquippedItems = () => {
  return (
    <View className="ml-auto flex h-72 w-[90%] flex-row items-center gap-12 ">
      <EquippedItems />
      <Image
        className="h-64 w-40 rounded-md"
        source={require("@/assets/images/cat.jpg")}
      />
    </View>
  );
};

export default CharacterEquippedItems;
