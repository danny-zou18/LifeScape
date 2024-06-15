import { View, Text, TouchableOpacity, Animated } from "react-native";
import React from "react";
import {isAxiosError} from "axios";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";

import { Task } from "@/types/db_types";

import { Swipeable } from "react-native-gesture-handler";

interface IndividualTasksProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const IndividualTasks: React.FC<IndividualTasksProps> = ({ task, setTasks }) => {
  const { user } = useGlobalContext();

  const handleDeleteTask = async () => {
    try {
      const response = await api.delete(
        `/tasks/delete/${user.uid}/${task.id}`,
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        }
      );
      if (response.status === 200) {
        console.log("Task deleted successfully");
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
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
      outputRange: [1, .5],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => handleDeleteTask()}>
        <View className="bg-[#fc4949] flex items-center justify-center h-full w-[70px] rounded-lg">
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
    <Swipeable renderRightActions={rightSwipe}>
      <View className="bg-red-100 p-4 rounded-lg overflow-hidden">
        <Text>{task.title}</Text>
      </View>
    </Swipeable>
  );
};

export default IndividualTasks;
