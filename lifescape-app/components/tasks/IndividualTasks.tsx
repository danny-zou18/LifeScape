import { View, Text, TouchableOpacity, Animated, } from "react-native";
import React from "react";

import { Task } from "@/types/db_types";

import { Swipeable } from "react-native-gesture-handler";

const IndividualTasks = ({ task }: { task: Task }) => {
    const rightSwipe = (progress: ReturnType<Animated.Value['interpolate']>, dragX: ReturnType<Animated.Value['interpolate']>) => {
        const scale = dragX.interpolate({
          inputRange: [-100,100],
          outputRange: [1,0],
          extrapolate: 'clamp',
        });
        return (
          <TouchableOpacity  activeOpacity={0.6}>
            <View className="bg-[#fc4949] flex items-center justify-center h-full w-[70px]">
              <Animated.Text className="text-black" style={{transform: [{scale: scale}]}}  >
                Delete
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      };

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View className="bg-red-100 p-4 rounded-lg overflow-hidden">
        <Text>{task.title}</Text>
      </View>
    </Swipeable>
  );
};

export default IndividualTasks;
