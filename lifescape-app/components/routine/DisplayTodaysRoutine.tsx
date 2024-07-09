import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Calendar } from 'react-native-big-calendar'

import IndividualRoutines from "./IndividualRoutines";

import { useRoutineContext } from "@/context/RoutineProvider";

const events = [
  {
    title: 'Meeting',
    start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 14, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 16, 0),
  },
  {
    title: 'Coffee break',
    start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 15, 0),
    end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 16, 0),
  },
]

const DisplayTodaysRoutine = () => {
  const { todaysRoutine } = useRoutineContext();

  return (
    <ScrollView className="h-full mt-4 max-w-full">
       <Calendar events={todaysRoutine} height={600} mode="day" renderEvent={IndividualRoutines}/>
    </ScrollView>
  );
};



export default DisplayTodaysRoutine;
