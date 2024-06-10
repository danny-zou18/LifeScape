import { View, Text, Image, StyleSheet } from "react-native";
import React, { useMemo, useEffect } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

import cat from "../../constants/Images.ts";

const CharacterOverview = () => {
  const { userCharacter } = useGlobalContext();

  const calculatePercentage = (current: number, nextLevel: number): string => {
    if (nextLevel === 0) return "0%";
    const percentage = (current / nextLevel) * 100;
    return `${percentage}%`;
  };

  const expPercentage = useMemo(
    () => calculatePercentage(userCharacter.experience, 20),
    [userCharacter.experience]
  );
  const healthPercentage = useMemo(
    () => calculatePercentage(userCharacter.health, userCharacter.maxHealth),
    [userCharacter.health]
  );
  const manaPercentage = useMemo(
    () => calculatePercentage(userCharacter.mana, userCharacter.maxMana),
    [userCharacter.mana]
  );
  const energyPercentage = useMemo(
    () => calculatePercentage(userCharacter.energy, userCharacter.maxEnergy),
    [userCharacter.energy]
  );
  return (
    <View className="bg-red-300 flex flex-row h-[17vh] p-3">
      <View className="w-[37%] h-[95%] relative mt-auto mb-auto">
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
      <View className="ml-2 max-w-[62%] bg-blue-200 flex flex-col">
        <View className="bg-red-200 p-1 max-h-[70%]">
          <View className="h-[33%]">
            <View className="min-w-full h-[35%] bg-white rounded-full overflow-hidden">
              <View
                style={{ width: healthPercentage }}
                className={`bg-red-400 h-full rounded-l-full rounded-r-lg flex items-center justify-center`}
              ></View>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-xs">
                {userCharacter.health} / {userCharacter.maxHealth}
              </Text>
              <Text className="text-[.8rem]">Health</Text>
            </View>
          </View>
          <View className="h-[33%]">
            <View className="min-w-full h-[35%] bg-white rounded-full overflow-hidden">
              <View
                style={{ width: manaPercentage }}
                className={`bg-blue-400 h-full rounded-l-full rounded-r-lg flex items-center justify-center`}
              ></View>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-xs">
                {userCharacter.mana} / {userCharacter.maxMana}
              </Text>
              <Text className="text-[.8rem]">Mana</Text>
            </View>
          </View>
          <View className="h-[33%]">
            <View className="min-w-full h-[35%] bg-white rounded-full overflow-hidden">
              <View
                style={{ width: energyPercentage }}
                className={`bg-yellow-200 h-full rounded-l-full rounded-r-lg flex items-center justify-center`}
              ></View>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-xs">
                {userCharacter.energy} / {userCharacter.maxEnergy}
              </Text>
              <Text className="text-[.8rem]">Energy</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
//max-w-[${1 / 10 * 100}%]

export default CharacterOverview;
