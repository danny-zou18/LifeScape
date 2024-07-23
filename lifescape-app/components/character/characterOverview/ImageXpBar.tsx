import { View, Text, Image } from "react-native";
import React, { useMemo } from "react";
import { calculatePercentage } from "@/functions";

import { useGlobalContext } from "@/context/GlobalProvider";

const ImageXpBar = () => {
  const { userCharacter } = useGlobalContext();

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
      <View className="mt-1 flex h-2 w-full flex-row bg-transparent">
        <View className="min-w-[100%] overflow-hidden rounded-full bg-[#00000090]">
          <View
            style={{ width: expPercentage }}
            className={`flex h-full items-center justify-center rounded-l-full rounded-r-lg bg-green-400`}
          ></View>
        </View>
      </View>
      <View className="flex flex-row justify-between">
        <Text>Level {userCharacter?.level}</Text>
        <Text>
          {userCharacter?.experience.toFixed(2)} /{" "}
          {(
            0.8 * Math.pow(userCharacter?.level ?? 0, 2) +
            2 * (userCharacter?.level ?? 0)
          ).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default ImageXpBar;
