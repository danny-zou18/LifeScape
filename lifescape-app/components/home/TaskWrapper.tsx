import { View, Text, TouchableHighlight, Modal } from "react-native";
import React, { useState } from "react";

import TaskCreationModal from "../tasks/TaskCreationModal";

const TaskWrapper: React.FC = () => {
    const [taskCreationOpen, setTaskCreationOpen] = useState<boolean>(false);

  return (
    <View>
      <TouchableHighlight
        className="bg-[#FDFDFD] w-[225px] h-[45px] rounded-md mt-4"
        underlayColor="#FFFFFF"
        // onPress={() => handle_creation()}
      >
        <Text className="text-black text-xl font-semibold mx-auto my-auto">
          Create Task
        </Text>
      </TouchableHighlight>
        
    </View>
  );
};

export default TaskWrapper;
