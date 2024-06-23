import { View } from "react-native";
import React from "react";

import TopBar from "../habits/TopBar";
import HabitCreationModal from "../habits/HabitCreationModal";
import DisplayHabits from "../habits/DisplayHabits";

const HabitWrapper = () => {
  return (
    <View>
      <HabitCreationModal />
      <TopBar />
      <DisplayHabits />
    </View>
  );
};

export default HabitWrapper;
