import { View } from "react-native";
import React from "react";

import ImageXpBar from "@/components/character/characterOverview/ImageXpBar";
import GeneralInfo from "@/components/character/characterOverview/GeneralInfo";

const CharacterOverview = () => {
  return (
    <View className="mx-auto w-[90%] py-2 flex flex-col">
      <ImageXpBar />
      <GeneralInfo />
    </View>
  );
};

export default CharacterOverview;
