import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { calculatePercentage } from "@/functions";

import { useGlobalContext } from "@/context/GlobalProvider";

const GeneralInfo = () => {
  const { userCharacter } = useGlobalContext();

  return (
    <View className="mt-12">
      <Text className="ml-2">General Info</Text>
      <View className="mt-1 rounded-md border-[1px] px-2">
        <View className="flex flex-row justify-between border-b-[1px] py-2">
          <Text>Class:</Text>
          <Text>{userCharacter?.class}</Text>
        </View>
        <View className="flex flex-row justify-between py-2">
          <Text>Subclass:</Text>
          <Text>{userCharacter?.subclass}</Text>
        </View>
      </View>
    </View>
  );
};

export default GeneralInfo;
