import { View, Text, TouchableHighlight } from "react-native";
import React from "react";

import { useTaskContext } from "@/context/TaskProvider";

const CreateTaskBtn = () => {

    const { setTaskCreationOpen } = useTaskContext();
  return (
    <TouchableHighlight
      className="bg-[#FDFDFD] w-[225px] h-[45px] rounded-md mt-4"
      underlayColor="#FFFFFF"
      onPress={() => setTaskCreationOpen(true)}
    >
      <Text className="text-black text-xl font-semibold mx-auto my-auto">
        Create Task
      </Text>
    </TouchableHighlight>
  );
};

export default CreateTaskBtn;
