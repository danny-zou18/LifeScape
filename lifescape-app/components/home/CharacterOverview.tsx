import { View, Text, Image } from "react-native";
import React from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

import cat from "../../constants/Images.ts";

const CharacterOverview = () => {
  const { userCharacter } = useGlobalContext();
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
        <View className={`absolute bottom-[-.5rem] z-10 bg-transparent flex flex-row ${userCharacter.experience >= 10 ? 'left-0' : 'left-1'}`}>
          <View className="bg-red-50 px-[0.4rem] rounded-full">
            <Text className="text-xs ">{userCharacter.level}</Text>
          </View>
          <View className="bg-red-50 ml-1 mt-[0.06rem] min-w-[76%] max-h-[90%] rounded-full ">
            <View className="bg-green-50 min-w-[50%] h-full rounded-full flex items-center justify-center">
              <Text className="text-xs">{userCharacter.experience}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CharacterOverview;
