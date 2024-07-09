import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {

  EventRenderer
} from "react-native-big-calendar";

import { CustomEventType } from "@/context/RoutineProvider";

const IndividualRoutines: EventRenderer<CustomEventType> = (
  event,
  touchableOpacityProps
) => {
  return (
    <TouchableOpacity {...touchableOpacityProps}>
      <Text>{`My custom event: ${event.routine.title} with a color: `}</Text>
    </TouchableOpacity>
  );
};

export default IndividualRoutines;
