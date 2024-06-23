import { View } from "react-native";
import React from "react";

import CreateHabitBtn from "./CreateHabitBtn";

const TopBar = () => {
  return (
    <View className="flex flex-row justify-between items-center pl-2 pr-1 ">
      {/* <FilterTasks /> */}
      <CreateHabitBtn />
    </View>
  );
};

export default TopBar;
