import { View, Text } from "react-native";
import React from "react";

import ViewWeeklyRoutine from "./ViewWeeklyRoutine";
import CreateTaskBtn from "./CreateRoutineBtn";

const TopBar = () => {
  return (
    <View className="flex flex-row justify-between items-center pl-2 pr-1 mb-2 ">
      <ViewWeeklyRoutine />
      <CreateTaskBtn />
    </View>
  );
};

export default TopBar;
