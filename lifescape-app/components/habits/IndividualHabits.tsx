import { View, Text, TouchableOpacity, Animated } from "react-native";
import React from "react";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";

import { Habit } from "@/types/db_types";

import { Swipeable } from "react-native-gesture-handler";

interface IndividualHabitsProps {
  habit: Habit;
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

const IndividualHabits: React.FC<IndividualHabitsProps> = ({
  habit,
  setHabits,
}) => {
  const { user } = useGlobalContext();

  const handleDeleteTask = async () => {
    try {
      const response = await api.delete(
        `/habits/delete/${user.uid}/${habit.id}`,
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        }
      );
      if (response.status === 200) {
        console.log("Task deleted successfully");
        setHabits((prev) => prev.filter((t) => t.id !== habit.id));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  };

  const rightSwipe = (
    progress: ReturnType<Animated.Value["interpolate"]>,
    dragX: ReturnType<Animated.Value["interpolate"]>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => handleDeleteTask()}>
        <View className="bg-[#fc4949] flex items-center justify-center h-full w-[70px]">
          <Animated.Text
            className="text-white font-bold text-lg"
            style={{ transform: [{ scale: scale }] }}
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderRightActions={rightSwipe} overshootRight={false}>
      {habit.description ? (
        <View>
          <View className="bg-red-100 p-4 py-3 rounded-lg overflow-hidden flex flex-row justify-between items-end">
            <View>
              <Text>{habit.title}</Text>
              <Text className="text-sm mt-1 text-neutral-500">
                {habit.description}
              </Text>
            </View>
            <View className="flex flex-row gap-4 items-center">
              <Text>{habit.difficultyRank}</Text>
              <Text>{habit.streak}</Text>
              {habit.completionGoalWeekly || habit.completionGoalMonthly ? (
                <Text>
                  {habit.currentCompletions}{" "}
                  {habit.completionGoalWeekly
                    ? `/ ${habit.completionGoalWeekly}`
                    : ""}
                  {habit.completionGoalMonthly
                    ? `/ ${habit.completionGoalMonthly}`
                    : ""}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View className="bg-red-100 p-4 py-5 rounded-lg overflow-hidden flex flex-row justify-between items-end">
            <View>
              <Text>{habit.title}</Text>
            </View>
            <View className="flex flex-row gap-4 items-center">
              <Text>{habit.difficultyRank}</Text>
              <Text>{habit.streak}</Text>
              {habit.completionGoalWeekly || habit.completionGoalMonthly ? (
                <Text>
                  {habit.currentCompletions}{" "}
                  {habit.completionGoalWeekly
                    ? `/ ${habit.completionGoalWeekly}`
                    : ""}
                  {habit.completionGoalMonthly
                    ? `/ ${habit.completionGoalMonthly}`
                    : ""}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      )}
    </Swipeable>
  );
};

export default IndividualHabits;
