import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  EventRenderer
} from "react-native-big-calendar";
import { useRoutineContext, CustomEventType } from "@/context/RoutineProvider";


const IndividualRoutines: EventRenderer<CustomEventType> = (
  event,
  touchableOpacityProps
) => {
  const { setEditRoutineOpen, setCurrentEditRoutine } = useRoutineContext();

  const onPressEvent = () => {
    setCurrentEditRoutine(event.routine);
    setEditRoutineOpen(true);
  }

  return (
    <TouchableOpacity {...touchableOpacityProps} onPress={onPressEvent}>
      <Text>{`My custom event: ${event.routine.title} with a color: `}</Text>
    </TouchableOpacity>
  );
};

export default IndividualRoutines;
