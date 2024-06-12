import { View, Text, TouchableHighlight, Modal } from "react-native";
import React, { useState } from "react";

import CreateTaskBtn from "../tasks/CreateTaskBtn";
import TaskCreationModal from "../tasks/TaskCreationModal";

const TaskWrapper: React.FC = () => {
  const [taskCreationOpen, setTaskCreationOpen] = useState<boolean>(false);

  return (
    <View>
      <TaskCreationModal
        isOpen={taskCreationOpen}
        setOpen={setTaskCreationOpen}
      />
      <CreateTaskBtn setOpen={setTaskCreationOpen} />
    </View>
  );
};

export default TaskWrapper;
