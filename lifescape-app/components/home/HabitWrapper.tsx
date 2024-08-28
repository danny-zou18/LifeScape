import { View } from "react-native";
import React from "react";

import TopBar from "../habits/TopBar";
import HabitCreationModal from "../habits/HabitCreationModal";
import HabitEditModal from "../habits/HabitEditModal";
import DisplayHabits from "../habits/DisplayHabits";

const HabitWrapper = () => {
  return (
    <View>
      <HabitCreationModal />
      <HabitEditModal />
      <TopBar />
      <DisplayHabits />
      
    </View>
  );
};

export default HabitWrapper;
