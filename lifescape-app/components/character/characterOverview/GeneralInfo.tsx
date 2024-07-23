import { View, Text } from "react-native";
import React from "react";

import { useGlobalContext } from "@/context/GlobalProvider";

const GeneralInfo = () => {
  const { userCharacter } = useGlobalContext();
  return (
    <View className="mt-12 rounded-md border-[1px] px-2">
      <View className="border-b-[1px] py-2 flex flex-row justify-between">
        <Text>Class:</Text> 
        <Text>{userCharacter?.class}</Text>
      </View>
      <View className="py-2 flex flex-row justify-between">
        <Text>Subclass:</Text>
        <Text>{userCharacter?.subclass}</Text>
      </View>
    </View>
  );
};

export default GeneralInfo;
