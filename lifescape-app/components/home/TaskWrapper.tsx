import { View } from "react-native";
import React from "react";

import TopBar from "../tasks/TopBar";
import TaskCreationModal from "../tasks/TaskCreationModal";
import DisplayTasks from "../tasks/DisplayTasks";

const TaskWrapper: React.FC = () => {
  return (
    <View>
      <TaskCreationModal />
      <TopBar />
      <DisplayTasks />
    </View>
  );
};

export default TaskWrapper;
