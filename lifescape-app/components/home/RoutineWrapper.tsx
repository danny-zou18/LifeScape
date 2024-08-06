import { View } from "react-native";
import React from "react";

import TopBar from "../routine/TopBar";
import RoutineCreationModal from "../routine/RoutineCreationModal";
import DisplayTodaysRoutine from "../routine/DisplayTodaysRoutine";
import RoutineEditModal from "../routine/RoutineEditModal";
import WeeklyRoutineModal from "../routine/WeeklyRoutineModal";

const RoutineWrapper = () => {
  return (
    <View>
      <RoutineCreationModal />
      <RoutineEditModal />
      <WeeklyRoutineModal />
      <TopBar />
      <DisplayTodaysRoutine />
    </View>
  );
};

export default RoutineWrapper;
