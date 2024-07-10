import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { EventRenderer } from "react-native-big-calendar";
import { useRoutineContext, CustomEventType } from "@/context/RoutineProvider";

const IndividualRoutines: EventRenderer<CustomEventType> = (
  event,
  touchableOpacityProps
) => {
  const { setEditRoutineOpen, setCurrentEditRoutine } = useRoutineContext();

  const onPressEvent = () => {
    setCurrentEditRoutine(event.routine);
    setEditRoutineOpen(true);
  };

  

  const confirmDeletionAlert = () => {
    Alert.alert("Delete this routine?", "This action cannot be undone.", [
      { text: "Delete", onPress: () => console.log("Delete Pressed") },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      onPress={onPressEvent}
      onLongPress={confirmDeletionAlert}
    >
      <Text>{`My custom event: ${event.routine.title} with a color: `}</Text>
    </TouchableOpacity>
  );
};

export default IndividualRoutines;
