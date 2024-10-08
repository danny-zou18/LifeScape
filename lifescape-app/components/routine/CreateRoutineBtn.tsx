import { TouchableHighlight, Text, View } from "react-native";
import React from "react";

import { useRoutineContext } from "@/context/RoutineProvider";

import { AntDesign } from "@expo/vector-icons";

const CreateRoutineBtn = () => {
  const { setRoutineCreationOpen } = useRoutineContext();

  return (
    <TouchableHighlight
      style={{ alignSelf: "flex-start" }}
      className="rounded-full bg-[rgb(253,253,253)] p-2 shadow-sm"
      underlayColor="#FFFFFF60"
      onPress={() => setRoutineCreationOpen(true)}
    >
      <View className="flex flex-row items-center pl-2">
        <Text className="text-md mr-2 font-[500]">Create</Text>
        <AntDesign name="plus" size={24} color="black" />
      </View>
    </TouchableHighlight>
  );
};

export default CreateRoutineBtn;
