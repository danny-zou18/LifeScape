import { View, Text, Image } from "react-native";
import React, { useMemo } from "react";
import { calculatePercentage } from "@/functions";

import { useGlobalContext } from "@/context/GlobalProvider";

const CharacterOverview = () => {
  const { userCharacter } = useGlobalContext();

  const expPercentage = useMemo(() => {
    let next_level =
      0.8 * Math.pow(userCharacter?.level ?? 0, 2) +
      2 * (userCharacter?.level ?? 0);
    return calculatePercentage(userCharacter?.experience ?? 0, next_level);
  }, [userCharacter?.experience, userCharacter?.level]);
  const healthPercentage = useMemo(
    () =>
      calculatePercentage(
        userCharacter?.health ?? 0,
        userCharacter?.maxHealth ?? 0,
      ),
    [userCharacter?.health, userCharacter?.maxHealth],
  );
  const manaPercentage = useMemo(
    () =>
      calculatePercentage(
        userCharacter?.mana ?? 0,
        userCharacter?.maxMana ?? 0,
      ),
    [userCharacter?.mana, userCharacter?.maxMana],
  );
  const energyPercentage = useMemo(
    () =>
      calculatePercentage(
        userCharacter?.energy ?? 0,
        userCharacter?.maxEnergy ?? 0,
      ),
    [userCharacter?.energy, userCharacter?.maxEnergy],
  );
  return (
    <View className=" flex h-[17vh] flex-row p-3">
      <View className="relative mb-auto mt-auto h-[95%] w-[37%]">
        <View className="absolute left-2 top-[-.5rem] z-10 rounded-full bg-[#00000090] px-2">
          <Text className="text-xs text-white">{userCharacter?.name}</Text>
        </View>
        <Image
          className="z-0 h-full w-full rounded-md"
          source={require("@/assets/images/cat.jpg")}
        />
        <View
          className={`absolute bottom-[-.5rem] z-10 flex flex-row bg-transparent ${
            (userCharacter?.level ?? 0 >= 100)
              ? "left-[-.3rem]"
              : (userCharacter?.level ?? 0 >= 10)
                ? "left-[.2rem]"
                : "left-1"
          }`}
        >
          <View className="rounded-full bg-black px-[0.4rem]">
            <Text className="text-xs text-white">{userCharacter?.level}</Text>
          </View>
          <View className="ml-1 mt-[0.15rem] max-h-[70%] min-w-[76%] overflow-hidden rounded-full bg-[#00000090]">
            <View
              style={{ width: expPercentage }}
              className={`flex h-full items-center justify-center rounded-l-full rounded-r-lg bg-green-400`}
            ></View>
          </View>
        </View>
      </View>
      <View className="ml-1 flex max-w-[62%] flex-col">
        <View className=" max-h-[70%] p-1">
          <View className="flex h-[33%] flex-row">
            <View className="h-[80%] w-[10%]">
              <Image
                source={require("../../assets/images/bisexual.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
            <View className="h-full w-[90%]">
              <View className="h-[.7rem] min-w-full overflow-hidden rounded-full bg-white">
                <View
                  style={{ width: healthPercentage }}
                  className={`flex h-full items-center justify-center rounded-l-full rounded-r-lg bg-red-400`}
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
          <View className="mt-1 flex h-[33%] flex-row">
            <View className="h-[80%] w-[10%]">
              <Image
                source={require("../../assets/images/mana.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
            <View className="h-full w-[90%]">
              <View className="h-[.7rem] min-w-full overflow-hidden rounded-full bg-white">
                <View
                  style={{ width: manaPercentage }}
                  className={`flex h-full items-center justify-center rounded-l-full rounded-r-lg bg-blue-400`}
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
          <View className="mt-1 flex h-[33%] flex-row">
            <View className="h-[80%] w-[10%]">
              <Image
                source={require("../../assets/images/flash.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
            <View className="h-full w-[90%]">
              <View className="h-[.7rem] min-w-full overflow-hidden rounded-full bg-white">
                <View
                  style={{ width: energyPercentage }}
                  className={`flex h-full items-center justify-center rounded-l-full rounded-r-lg bg-yellow-200`}
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
        <View className="mt-1 h-[30%] p-1">
          <View className="flex w-full flex-row items-center justify-end">
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
