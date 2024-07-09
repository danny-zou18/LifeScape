import React from "react";
import { Calendar } from "react-native-big-calendar";

import IndividualRoutines from "./IndividualRoutines";

import { useRoutineContext } from "@/context/RoutineProvider";

const DisplayTodaysRoutine = () => {
  const { todaysRoutine } = useRoutineContext();

  return (
    <Calendar
      events={todaysRoutine}
      height={600}
      mode="day"
      renderEvent={IndividualRoutines}
      swipeEnabled={false}
      dayHeaderStyle={{ display: "none" }}
      headerContainerStyle={{display: "none"}}
    />
  );
};

export default DisplayTodaysRoutine;
