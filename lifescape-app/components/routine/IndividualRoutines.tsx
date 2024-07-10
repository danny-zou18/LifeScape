import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { EventRenderer } from "react-native-big-calendar";
import { useRoutineContext, CustomEventType } from "@/context/RoutineProvider";
import api from "@/api/axios";
import { isAxiosError } from "axios";

import { useGlobalContext } from "@/context/GlobalProvider";

const IndividualRoutines: EventRenderer<CustomEventType> = (
  event,
  touchableOpacityProps
) => {
  const { user } = useGlobalContext();
  const { setEditRoutineOpen, setCurrentEditRoutine, setTodaysRoutine } = useRoutineContext();

  const onPressEvent = () => {
    setCurrentEditRoutine(event.routine);
    setEditRoutineOpen(true);
  };

  const handleDeleteRoutine = async () => {
    try {
      const response = await api.delete(
        `/routine/delete/${user.uid}/${event.routine.id}`,
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        }
      );
      if (response.status === 200) {
        console.log("Routine deleted successfully");
        setTodaysRoutine((prev) =>
          prev.filter((r) => r.routine.id !== event.routine.id)
        );
      }
    } catch(error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  }


  const confirmDeletionAlert = () => {
    Alert.alert("Delete this routine?", "This action cannot be undone.", [
      { text: "Delete", onPress: () => handleDeleteRoutine() },
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
