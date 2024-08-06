import { View, Text, TouchableHighlight } from "react-native";
import React from "react";

import { useRoutineContext } from "@/context/RoutineProvider";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ViewWeeklyRoutineBtn = () => {
  const { setViewWeeklyRoutineOpen } = useRoutineContext();

  return (
    <TouchableHighlight
      style={{ alignSelf: "flex-start" }}
      className="my-auto border-b-[.5px] p-1"
      underlayColor="#FFFFFF60"
      onPress={() => setViewWeeklyRoutineOpen(true)}
    >
      <View className="flex flex-row items-center  pr-3">
        <MaterialCommunityIcons
          name="view-column-outline"
          size={24}
          color="black"
        />
        <Text className="text-md ml-2 font-[500]">Week</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ViewWeeklyRoutineBtn;
