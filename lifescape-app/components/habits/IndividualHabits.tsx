import { View, Text, TouchableOpacity, Animated } from "react-native";
import React from "react";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useHabitContext } from "@/context/HabitProvider";
import { useHomeContext } from "@/context/HomeProvider";

import { Habit } from "@/types/db_types";

import { Swipeable } from "react-native-gesture-handler";

import AntDesign from "@expo/vector-icons/AntDesign";

interface IndividualHabitsProps {
  habit: Habit;
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

const IndividualHabits: React.FC<IndividualHabitsProps> = ({
  habit,
  setHabits,
}) => {
  const { user, userCharacter, setUserCharacter } = useGlobalContext();
  const { setEditHabitOpen, setCurrentEditHabit } = useHabitContext();
  const { showReward } = useHomeContext();

  const handleDeleteHabit = async () => {
    try {
      const response = await api.delete(
        `/habits/delete/${user.uid}/${habit.id}`,
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
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

  const handleCompleteHabit = async () => {
    try {
      const response = await api.put(
        `/habits/complete/${user.uid}/${userCharacter.id}/${habit.id}`,
        {},
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
      );
      if (response.status === 200) {
        console.log("Habit completed successfully");
        try {
          const response = await api.get(
            `/character/get/${user.uid}`,
            {
              headers: {
                Authorization: await user.getIdToken(),
              },
            }
          );
          if (response.status === 200) {
            setUserCharacter(response.data);
            showReward({
              experienceReward: habit.experienceReward,
              goldReward: habit.goldReward,
              strengthReward: habit.StrengthReward,
              defenseReward: habit.DefenseReward,
              agilityReward: habit.AgilityReward,
              vitalityReward: habit.VitalityReward,
              enduranceReward: habit.EnduranceReward,
              willReward: habit.WillReward,
            });
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
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  }

  const onPressHabit = () => {
    setCurrentEditHabit(habit);
    setEditHabitOpen(true);
  };

  const rightSwipe = (
    progress: ReturnType<Animated.Value["interpolate"]>,
    dragX: ReturnType<Animated.Value["interpolate"]>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => handleDeleteHabit()}>
        <View className="flex h-full w-[70px] items-center justify-center bg-[#fc4949]">
          <Animated.Text
            className="text-lg font-bold text-white"
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
        <View className="flex flex-row">
          <View className="flex w-[10%] items-center justify-center rounded-l-lg bg-blue-300">
            <TouchableOpacity
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-300"
              onPress={handleCompleteHabit}
            >
              <AntDesign name="plus" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className={`${
              habit.quitting ? "bg-red-100" : "bg-green-200"
            } flex w-[90%] flex-row items-end justify-between overflow-hidden rounded-r-lg p-4 py-3`}
            activeOpacity={1}
            onPress={() => onPressHabit()}
          >
            <View>
              <Text>{habit.title}</Text>
              <Text className="mt-1 text-sm text-neutral-500">
                {habit.description}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-4">
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
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex flex-row">
          <View className="flex w-[10%] items-center justify-center rounded-l-lg bg-blue-300">
            <TouchableOpacity
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-300"
              onPress={handleCompleteHabit}
            >
              <AntDesign name="plus" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className={`${
              habit.quitting ? "bg-red-100" : "bg-green-200"
            } flex flex-row items-end justify-between overflow-hidden rounded-r-lg p-4 py-5 w-[90%]`}
            activeOpacity={1}
            onPress={() => onPressHabit()}
          >
            <View>
              <Text>{habit.title}</Text>
            </View>
            <View className="flex flex-row items-center gap-4">
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
          </TouchableOpacity>
        </View>
      )}
    </Swipeable>
  );
};

export default IndividualHabits;
