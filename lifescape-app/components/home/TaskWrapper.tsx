import { View } from "react-native";
import React from "react";

import TaskCreationModal from "../tasks/TaskCreationModal";
import TaskEditModal from "../tasks/TaskEditModal";
import DisplayTasks from "../tasks/DisplayTasks";
import TopBar from "../tasks/TopBar";

const TaskWrapper: React.FC = () => {
  return (
    <View>
      <TaskCreationModal />
      <TaskEditModal />
      <TopBar />
      <DisplayTasks />
    </View>
  );
};

export default TaskWrapper;
