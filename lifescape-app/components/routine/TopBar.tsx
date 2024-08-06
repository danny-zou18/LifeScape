import { View, Text } from "react-native";
import React from "react";

import ViewWeeklyRoutineBtn from "./ViewWeeklyRoutineBtn";
import CreateTaskBtn from "./CreateRoutineBtn";

const TopBar = () => {
  return (
    <View className="mb-2 flex flex-row items-center justify-between pl-2 pr-1 ">
      <ViewWeeklyRoutineBtn />
      <CreateTaskBtn />
    </View>
  );
};

export default TopBar;
