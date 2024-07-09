import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import Timetable from "react-native-calendar-timetable";

import IndividualRoutines from "./IndividualRoutines";

import { useRoutineContext } from "@/context/RoutineProvider";

const DisplayTodaysRoutine = () => {
  const { todaysRoutine } = useRoutineContext();

  return (
    <ScrollView className="h-full mt-4 max-w-full">
      
    </ScrollView>
  );
};



export default DisplayTodaysRoutine;
