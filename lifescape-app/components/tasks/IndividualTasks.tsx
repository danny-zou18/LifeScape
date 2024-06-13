import { View, Text } from "react-native";
import React from "react";

import { Task } from "@/types/db_types";

import { Swipeable } from "react-native-gesture-handler";

const IndividualTasks = ({ task }: { task: Task }) => {
    const rightSwipe = () => {
        return (
            <View>
                <Text>Delete</Text>
            </View>
        )
    }

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View className="bg-red-100 mt-1 p-4 rounded-lg">
        <Text>{task.title}</Text>
      </View>
    </Swipeable>
  );
};

export default IndividualTasks;
