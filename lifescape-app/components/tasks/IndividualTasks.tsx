import { View, Text, TouchableOpacity, Animated } from "react-native";
import React from "react";
import { isAxiosError } from "axios";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useTaskContext } from "@/context/TaskProvider";

import { Task } from "@/types/db_types";

import { Swipeable } from "react-native-gesture-handler";

interface IndividualTasksProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const IndividualTasks: React.FC<IndividualTasksProps> = ({
  task,
  setTasks,
}) => {
  const { user } = useGlobalContext();
  const { setEditTaskOpen, setCurrentEditTask } = useTaskContext();

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

  const onPressTask = () => {
    setCurrentEditTask(task);
    setEditTaskOpen(true);
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
        <View className="bg-[#fc4949] flex items-center justify-center h-full w-[70px] ">
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
      {task.description ? (
        <View>
          <TouchableOpacity
            className="bg-red-100 p-4 py-3 rounded-lg overflow-hidden flex flex-row justify-between items-end"
            activeOpacity={1}
            onPress={() => onPressTask()}
          >
            <View>
              <Text>{task.title}</Text>
              <Text className="text-sm mt-1 text-neutral-500">
                {task.description}
              </Text>
            </View>
            <View className="flex flex-row gap-4 items-center">
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
        <View>
          <TouchableOpacity
            className="bg-red-100 p-4 py-5 rounded-lg overflow-hidden flex flex-row justify-between items-end"
            activeOpacity={1}
            onPress={() => onPressTask()}
          >
            <View>
              <Text>{task.title}</Text>
            </View>
            <View className="flex flex-row gap-4 items-center">
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
