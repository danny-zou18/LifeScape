import { Text, TouchableHighlight } from "react-native";
import React from "react";

import { useHabitContext } from "@/context/HabitProvider";

const CreateHabitBtn = () => {
  const { setHabitCreationOpen } = useHabitContext();
  return (
    <TouchableHighlight
      className="bg-[#FDFDFD] w-[225px] h-[45px] rounded-md mt-4"
      underlayColor="#FFFFFF"
      onPress={() => setHabitCreationOpen(true)}
    >
      <Text className="text-black text-xl font-semibold mx-auto my-auto">
        Create Habit
      </Text>
    </TouchableHighlight>
  );
};

export default CreateHabitBtn;
