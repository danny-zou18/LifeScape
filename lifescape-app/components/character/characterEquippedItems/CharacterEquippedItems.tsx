import { View, Text } from "react-native";
import React from "react";
import EquippedItems from "./EquippedItems";

const CharacterEquippedItems = () => {
  return (
    <View className="ml-auto w-[90%] bg-red-400">
      <EquippedItems />
    </View>
  );
};

export default CharacterEquippedItems;
