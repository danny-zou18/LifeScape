import { View } from "react-native";
import React from "react";

import FilterHabits from "./FilterHabits";
import CreateHabitBtn from "./CreateHabitBtn";

const TopBar = () => {
  return (
    <View className="flex flex-row items-center justify-between pl-2 pr-1 ">
      <FilterHabits />
      <CreateHabitBtn />
    </View>
  );
};

export default TopBar;
