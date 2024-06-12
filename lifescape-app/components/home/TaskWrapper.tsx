import { View, Text, TouchableHighlight, Modal } from "react-native";
import React, { useState } from "react";

import CreateTaskBtn from "../tasks/CreateTaskBtn";
import TaskCreationModal from "../tasks/TaskCreationModal";
import DisplayTasks from "../tasks/DisplayTasks";

const TaskWrapper: React.FC = () => {
  const [taskCreationOpen, setTaskCreationOpen] = useState<boolean>(false);

  return (
    <View>
      <TaskCreationModal
        isOpen={taskCreationOpen}
        setOpen={setTaskCreationOpen}
      />
      <CreateTaskBtn setOpen={setTaskCreationOpen} />
      <DisplayTasks />
    </View>
  );
};

export default TaskWrapper;
