import { View, Text, Image } from "react-native";
import React, { useMemo } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

const CharacterOverview = () => {
  const { userCharacter } = useGlobalContext();

  const calculatePercentage = (current: number, nextLevel: number): string => {
    if (nextLevel === 0) return "0%"; 
    const percentage = (current / nextLevel) * 100;
    return `${percentage}%`;
  };

  const expPercentage = useMemo(
    () => {
      let next_level = 0.8 * Math.pow(userCharacter?.level ?? 0, 2) + 2 * (userCharacter?.level ?? 0);
      return calculatePercentage(userCharacter?.experience ?? 0, next_level)
    },
    [userCharacter?.experience, userCharacter?.level]
  );
  const healthPercentage = useMemo(
    () => calculatePercentage(userCharacter?.health ?? 0, userCharacter?.maxHealth ?? 0),
    [userCharacter?.health, userCharacter?.maxHealth]
  );
  const manaPercentage = useMemo(
    () => calculatePercentage(userCharacter?.mana ?? 0, userCharacter?.maxMana ?? 0),
    [userCharacter?.mana, userCharacter?.maxMana]
  );
  const energyPercentage = useMemo(
    () => calculatePercentage(userCharacter?.energy ?? 0, userCharacter?.maxEnergy ?? 0),
    [userCharacter?.energy, userCharacter?.maxEnergy]
  );
  return (
    <View className=" flex flex-row h-[17vh] p-3">
      <View className="w-[37%] h-[95%] relative mt-auto mb-auto">
        <View className="absolute top-[-.5rem] left-2 z-10 bg-[#00000090] px-2 rounded-full">
          <Text className="text-xs text-white">{userCharacter?.name}</Text>
        </View>
        <Image
          className="w-full h-full z-0 rounded-md"
          source={{
            uri: "https://media1.tenor.com/m/sepKXIenuG0AAAAC/cat-meme-cat-meme-face.gif",
          }}
        />
        <View
          className={`absolute bottom-[-.5rem] z-10 bg-transparent flex flex-row ${
            userCharacter?.level ?? 0 >= 100
              ? "left-[-.3rem]"
              : userCharacter?.level ?? 0 >= 10
              ? "left-[.2rem]"
              : "left-1"
          }`}
        >
          <View className="bg-black px-[0.4rem] rounded-full">
            <Text className="text-xs text-white">{userCharacter?.level}</Text>
          </View>
          <View className="bg-[#00000090] ml-1 mt-[0.15rem] min-w-[76%] max-h-[70%] rounded-full overflow-hidden">
            <View
              style={{ width: expPercentage }}
              className={`bg-green-400 h-full rounded-l-full rounded-r-lg flex items-center justify-center`}
            ></View>
          </View>
        </View>
      </View>
      <View className="ml-1 max-w-[62%] flex flex-col">
        <View className=" p-1 max-h-[70%]">
          <View className="h-[33%] flex flex-row">
            <View className="w-[10%] h-[80%]">
              <Image
                source={require("../../assets/images/bisexual.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
            <View className="h-full w-[90%]">
              <View className="min-w-full h-[.7rem] bg-white rounded-full overflow-hidden">
                <View
                  style={{ width: healthPercentage }}
                  className={`bg-red-400 h-full rounded-l-full rounded-r-lg flex items-center justify-center`}
                ></View>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-xs">
                  {userCharacter?.health} / {userCharacter?.maxHealth}
                </Text>
                <Text className="text-[.8rem]">Health</Text>
              </View>
            </View>
          </View>
          <View className="h-[33%] mt-1 flex flex-row">
            <View className="w-[10%] h-[80%]">
              <Image
                source={require("../../assets/images/mana.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
            <View className="h-full w-[90%]">
              <View className="min-w-full h-[.7rem] bg-white rounded-full overflow-hidden">
                <View
                  style={{ width: manaPercentage }}
                  className={`bg-blue-400 h-full rounded-l-full rounded-r-lg flex items-center justify-center`}
                ></View>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-xs">
                  {userCharacter?.mana} / {userCharacter?.maxMana}
                </Text>
                <Text className="text-[.8rem]">Mana</Text>
              </View>
            </View>
          </View>
          <View className="h-[33%] mt-1 flex flex-row">
            <View className="w-[10%] h-[80%]">
              <Image
                source={require("../../assets/images/flash.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
            <View className="h-full w-[90%]">
              <View className="min-w-full h-[.7rem] bg-white rounded-full overflow-hidden">
                <View
                  style={{ width: energyPercentage }}
                  className={`bg-yellow-200 h-full rounded-l-full rounded-r-lg flex items-center justify-center`}
                ></View>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-xs">
                  {userCharacter?.energy} / {userCharacter?.maxEnergy}
                </Text>
                <Text className="text-[.8rem]">Energy</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="h-[30%] p-1 mt-1">
          <View className="w-full flex flex-row items-center justify-end">
            <View className="h-8">
              <Image
                source={require("../../assets/images/pixil-frame-0.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
            <Text>{userCharacter?.gold}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
//max-w-[${1 / 10 * 100}%]

export default CharacterOverview;
