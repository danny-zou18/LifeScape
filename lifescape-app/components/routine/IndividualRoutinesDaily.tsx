import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import { EventRenderer } from "react-native-big-calendar";
import { useRoutineContext, CustomEventType } from "@/context/RoutineProvider";
import api from "@/api/axios";
import { isAxiosError } from "axios";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useHomeContext } from "@/context/HomeProvider";

const IndividualRoutinesDaily: EventRenderer<CustomEventType> = (
  event,
  touchableOpacityProps,
) => {
  const { user, userCharacter, setUserCharacter } = useGlobalContext();
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
        },
      );
      if (response.status === 200) {
        console.log("Routine deleted successfully");
        setTodaysRoutine((prev) =>
          prev.filter((r) => r.routine.id !== event.routine.id),
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

  const handleCompleteRoutine = async () => {
    try {
      const response = await api.put(
        `/routine/complete/${user.uid}/${userCharacter.id}/${event.routine.id}`,
        {},
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
      );
      if (response.status === 200) {
        console.log("Routine completed successfully");
        setTodaysRoutine((prev) =>
          prev.map((r) => {
            if (r.routine.id === event.routine.id) {
              return {
                ...r,
                lastCompleted: new Date(),
              };
            }
            return r;
          }),
        );
        try {
          const response = await api.get(`/character/get/${user.uid}`, {
            headers: {
              Authorization: await user.getIdToken(),
            },
          });
          if (response.status === 200) {
            setUserCharacter(response.data);
            showReward({
              experienceReward: event.routine.experienceReward,
              goldReward: event.routine.goldReward,
              strengthReward: event.routine.StrengthReward,
              defenseReward: event.routine.DefenseReward,
              agilityReward: event.routine.AgilityReward,
              vitalityReward: event.routine.VitalityReward,
              enduranceReward: event.routine.EnduranceReward,
              willReward: event.routine.WillReward,
            });
          }
        } catch (error) {
          if (isAxiosError(error)) {
            console.log(error.response?.data);
          } else {
            console.log(error);
          }
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        // AxiosError type will have a response property
        console.log(error.response?.data);
      } else {
        // Handle other error types if needed
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

  const { key, ...otherProps } = touchableOpacityProps;

  return (
    <TouchableOpacity
      key={key}
      {...otherProps}
      onPress={onPressEvent}
      onLongPress={confirmDeletionAlert}
      className="flex flex-row p-0"
    >
      <TouchableOpacity
        onPress={handleCompleteRoutine}
        className={`h-full w-[15%] ${
          !!event.routine.lastCompleted &&
          new Date(event.routine.lastCompleted).getDate() ===
            new Date().getDate()
            ? "bg-neutral-600"
            : "bg-green-200"
        } rounded-sm`}
        disabled={
          !!event.routine.lastCompleted &&
          new Date(event.routine.lastCompleted).getDate() ===
            new Date().getDate()
        }
      ></TouchableOpacity>
      <View className="relative w-[85%] pl-2">
        <View className="flex max-w-[70%] flex-col">
          <Text>{event.title}</Text>
          {event.routine.description ? (
            <Text className="text-sm text-neutral-400">
              {event.routine.description}
            </Text>
          ) : null}
        </View>
        <View className="absolute right-0 top-0 flex flex-row gap-2">
          <Text className="text-xs">
            {event.start.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {event.end.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <View className="absolute bottom-1 right-1 flex flex-row gap-2">
          <Text className="text-sm">{event.routine.difficultyRank}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default IndividualRoutinesDaily;
