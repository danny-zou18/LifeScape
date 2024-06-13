import { View } from "react-native";
import React from "react";

import { useTaskContext } from "@/context/TaskProvider";

import CreateTaskBtn from "../tasks/CreateTaskBtn";
import TaskCreationModal from "../tasks/TaskCreationModal";
import DisplayTasks from "../tasks/DisplayTasks";

const TaskWrapper: React.FC = () => {
  const { tasks, setTasks, taskCreationOpen, setTaskCreationOpen } =
    useTaskContext();

  return (
    <View>
      <TaskCreationModal />
      <CreateTaskBtn />
      <DisplayTasks />
    </View>
  );
};

export default TaskWrapper;
