import React from "react";
import { Calendar } from "react-native-big-calendar";

import IndividualRoutinesDaily from "./IndividualRoutinesDaily";

import { useRoutineContext } from "@/context/RoutineProvider";

const DisplayTodaysRoutine = () => {
  const { todaysRoutine } = useRoutineContext();
  return (
    <Calendar
      events={todaysRoutine}
      height={700}
      mode="day"
      renderEvent={IndividualRoutinesDaily}
      swipeEnabled={false}
      dayHeaderStyle={{ display: "none" }}
      headerContainerStyle={{ display: "none" }}
      hourRowHeight={80}
    />
  );
};

export default DisplayTodaysRoutine;
