import { View, Text, TouchableOpacity, Animated } from "react-native";
import React from "react";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useTaskContext } from "@/context/TaskProvider";

import { Task } from "@/types/db_types";

import { Swipeable } from "react-native-gesture-handler";

import Feather from "@expo/vector-icons/Feather";

interface IndividualTasksProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const IndividualTasks: React.FC<IndividualTasksProps> = ({
  task,
  setTasks,
}) => {
  const { user, userCharacter, setUserCharacter } = useGlobalContext();
  const { setEditTaskOpen, setCurrentEditTask } = useTaskContext();

  const handleDeleteTask = async () => {
    try {
      const response = await api.delete(
        `/tasks/delete/${user.uid}/${task.id}`,
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
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

  const handleCompleteTask = async () => {
    try {
      const response = await api.put(
        `/tasks/complete/${user.uid}/${userCharacter.id}/${task.id}`,
        {},
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
      );
      if (response.status === 200) {
        console.log("Task completed successfully");
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
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
  };

  const onPressTask = () => {
    setCurrentEditTask(task);
    setEditTaskOpen(true);
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
      <TouchableOpacity activeOpacity={0.6} onPress={() => handleDeleteTask()}>
        <View className="flex h-full w-[70px] items-center justify-center bg-[#fc4949] ">
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
      {task.description ? (
        <View className="flex flex-row">
          <View className="flex w-[10%] items-center justify-center rounded-l-lg bg-blue-300">
            <TouchableOpacity
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-300"
              onPress={handleCompleteTask}
            >
              <Feather name="check" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="flex w-[90%] flex-row items-end justify-between overflow-hidden rounded-r-lg bg-red-100 p-4 py-3"
            activeOpacity={1}
            onPress={() => onPressTask()}
          >
            <View>
              <Text>{task.title}</Text>
              <Text className="mt-1 text-sm text-neutral-500">
                {task.description}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-4">
              <Text>{task.difficultyRank}</Text>
              {task.dueDate ? (
                <Text>
                  {new Date(task.dueDate).getMonth() + 1} /{" "}
                  {new Date(task.dueDate).getDate()}
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
              onPress={handleCompleteTask}
            >
              <Feather name="check" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="flex w-[90%] flex-row items-end justify-between overflow-hidden rounded-lg bg-red-100 p-4 py-5"
            activeOpacity={1}
            onPress={() => onPressTask()}
          >
            <View>
              <Text>{task.title}</Text>
            </View>
            <View className="flex flex-row items-center gap-4">
              <Text>{task.difficultyRank}</Text>
              {task.dueDate ? (
                <Text>
                  {new Date(task.dueDate).getMonth() + 1} /{" "}
                  {new Date(task.dueDate).getDate()}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </Swipeable>
  );
};

export default IndividualTasks;
