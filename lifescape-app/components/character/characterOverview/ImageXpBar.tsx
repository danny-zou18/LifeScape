import { View, Text, Image } from "react-native";
import React, { useMemo } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

const ImageXpBar = () => {
  const { userCharacter } = useGlobalContext();

  const calculatePercentage = (current: number, nextLevel: number): string => {
    if (nextLevel === 0) return "0%";
    const percentage = (current / nextLevel) * 100;
    return `${percentage}%`;
  };

  const expPercentage = useMemo(() => {
    let next_level =
      0.8 * Math.pow(userCharacter?.level ?? 0, 2) +
      2 * (userCharacter?.level ?? 0);
    return calculatePercentage(userCharacter?.experience ?? 0, next_level);
  }, [userCharacter?.experience, userCharacter?.level]);

  return (
    <View className="h-48 w-full">
      <Image
        className="z-0 h-full w-full rounded-md"
        source={{
          uri: "https://media1.tenor.com/m/sepKXIenuG0AAAAC/cat-meme-cat-meme-face.gif",
        }}
      />
      <View
        className="flex flex-row bg-transparent w-full h-4 mt-2"
      >
        <View className="rounded-full bg-black px-[0.4rem] flex justify-center items-center w-[7%]">
          <Text className="text-xs text-white">{userCharacter?.level}</Text>
        </View>
        <View className="ml-1 min-w-[92%] overflow-hidden rounded-full bg-[#00000090]">
          <View
            style={{ width: expPercentage }}
            className={`flex h-full items-center justify-center rounded-l-full rounded-r-lg bg-green-400`}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default ImageXpBar;
