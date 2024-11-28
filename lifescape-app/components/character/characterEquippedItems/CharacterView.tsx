import { View, Text, Image } from "react-native";
import React from "react";

const CharacterView = () => {
  return (
    <View className="">
      <Image
        className="h-24 w-24 rounded-md"
        source={require("@/assets/images/cat.jpg")}
      />
    </View>
  );
};

export default CharacterView;
