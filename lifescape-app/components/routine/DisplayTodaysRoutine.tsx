import { ScrollView } from "react-native";
import React from "react";
import Timetable from "react-native-calendar-timetable";

import IndividualRoutines from "./IndividualRoutines";

import { useRoutineContext } from "@/context/RoutineProvider";

const DisplayTodaysRoutine = () => {
  const { todaysRoutine } = useRoutineContext();

  return (
    <ScrollView>
      <Timetable
        // these two are required
        items={todaysRoutine}
        renderItem={(props) => <IndividualRoutines {...props} />}
        // provide only one of these
        date={new Date()}
      />
    </ScrollView>
  );
};

export default DisplayTodaysRoutine;
