import { View } from "react-native";
import React from "react";

import ImageXpBar from "@/components/character/characterOverview/ImageXpBar";

const CharacterOverview = () => {
  return (
    <View className="mx-auto w-[90%] py-2">
      <ImageXpBar />
    </View>
  );
};

export default CharacterOverview;
