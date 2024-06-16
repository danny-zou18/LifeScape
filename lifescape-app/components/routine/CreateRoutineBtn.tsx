import { TouchableHighlight, Text } from "react-native";
import React from "react";

import { useRoutineContext } from "@/context/RoutineProvider";

const CreateRoutineBtn = () => {
  const { setRoutineCreationOpen } = useRoutineContext();

  return (
    <TouchableHighlight
      className="bg-[#FDFDFD] w-[225px] h-[45px] rounded-md mt-4"
      underlayColor="#FFFFFF"
      onPress={() => setRoutineCreationOpen(true)}
    >
      <Text className="text-black text-xl font-semibold mx-auto my-auto">
        Add to Routine
      </Text>
    </TouchableHighlight>
  );
};

export default CreateRoutineBtn;
