import { View, Text, Image, StyleSheet } from "react-native";
import React, { useMemo, useEffect } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

import cat from "../../constants/Images.ts";

const CharacterOverview = () => {
  const { userCharacter } = useGlobalContext();

  const calculateExpPercentage = (
    current: number,
    nextLevel: number
  ): string => {
    if (nextLevel === 0) return "0%";
    const percentage = (current / nextLevel) * 100;
    return `${percentage}%`;
  };

  const expPercentage = useMemo(
    () => calculateExpPercentage(userCharacter.experience, 20),
    [userCharacter.experience]
  );

  return (
    <View className="bg-red-300 flex flex-row h-[17vh] p-4 pl-5">
      <View className="w-[35%] h-[95%] relative mt-auto mb-auto">
        <View className="absolute top-[-.5rem] left-2 z-10 bg-white px-2 rounded-full">
          <Text className="text-xs">{userCharacter.name}</Text>
        </View>
        <Image
          className="w-full h-full z-0 rounded-md"
          source={{
            uri: "https://media1.tenor.com/m/sepKXIenuG0AAAAC/cat-meme-cat-meme-face.gif",
          }}
        />
        <View
          className={`absolute bottom-[-.5rem] z-10 bg-transparent flex flex-row ${
            userCharacter.experience >= 100
              ? "left-[-1rem]"
              : userCharacter.experience >= 10
              ? "left-0"
              : "left-1"
          }`}
        >
          <View className="bg-red-50 px-[0.4rem] rounded-full">
            <Text className="text-xs ">{userCharacter.level}</Text>
          </View>
          <View className="bg-red-50 ml-1 mt-[0.15rem] min-w-[76%] max-h-[70%] rounded-full overflow-hidden">
            <View
              style={{ width: expPercentage }}
              className={`bg-green-400 h-full rounded-l-full rounded-r-lg flex items-center justify-center`}
            ></View>
          </View>
        </View>
      </View>
      <View className="ml-2 w-full bg-blue-200 flex flex-col">
        <View className="bg-red-200 p-1 h-[85%]">
          <View>
            <Text>Health</Text>
          </View>
          <View>
            <Text>Health</Text>
          </View>
          <View>
            <Text>Health</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
//max-w-[${1 / 10 * 100}%]

export default CharacterOverview;
