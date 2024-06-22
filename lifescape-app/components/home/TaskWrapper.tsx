import { View } from "react-native";
import React from "react";

import CreateTaskBtn from "../tasks/CreateTaskBtn";
import TaskCreationModal from "../tasks/TaskCreationModal";
import DisplayTasks from "../tasks/DisplayTasks";

const TaskWrapper: React.FC = () => {
  return (
    <View>
      <TaskCreationModal />
      <CreateTaskBtn />
      <DisplayTasks />
    </View>
  );
};

export default TaskWrapper;
