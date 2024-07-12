import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { EventRenderer } from "react-native-big-calendar";
import { useRoutineContext, CustomEventType } from "@/context/RoutineProvider";
import api from "@/api/axios";
import { isAxiosError } from "axios";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useHomeContext } from "@/context/HomeProvider";

const IndividualRoutinesDaily: EventRenderer<CustomEventType> = (
  event,
  touchableOpacityProps
) => {
  const { user } = useGlobalContext();
  const { setEditRoutineOpen, setCurrentEditRoutine, setTodaysRoutine } =
    useRoutineContext();
  const { showReward } = useHomeContext();

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
      <View className="max-w-[70%] flex flex-col p-1">
        <Text>{event.title}</Text>
        {event.routine.description ? (
          <Text className="text-sm text-neutral-400">
            {event.routine.description}
          </Text>
        ) : null}
      </View>
      <View className="flex flex-row gap-2 absolute top-1 right-1">
        <Text className="text-xs">{event.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} - {event.end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</Text>
      </View>
      <View className="flex flex-row gap-2 absolute bottom-2 right-2">
        <Text className="text-sm">{event.routine.difficultyRank}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default IndividualRoutinesDaily;
