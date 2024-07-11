import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { EventRenderer } from "react-native-big-calendar";
import { useRoutineContext, CustomEventType } from "@/context/RoutineProvider";
import api from "@/api/axios";
import { isAxiosError } from "axios";

import { useGlobalContext } from "@/context/GlobalProvider";

const IndividualRoutinesWeekly: EventRenderer<CustomEventType> = (
  event,
  touchableOpacityProps
) => {
  const { user } = useGlobalContext();
  const { setEditRoutineOpen, setCurrentEditRoutine, setWeeklyRoutine } =
    useRoutineContext();

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
        setWeeklyRoutine((prev) =>
          prev.filter((r) => r.routine.id !== event.routine.id)
        );
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  };

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
      className="p-4 relative"
    >
      <View className=" flex flex-col p-1">
        <Text>{event.title}</Text>
        {/* {event.routine.description ? (
          <Text className="text-sm text-neutral-400">
            {event.routine.description}
          </Text>
        ) : null} */}
      </View>
 
    </TouchableOpacity>
  );
};

export default IndividualRoutinesWeekly;
