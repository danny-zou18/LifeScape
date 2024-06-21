import {
  View,
  FlatList,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import React, { useEffect } from "react";

import TaskProvider from "@/context/TaskProvider";
import TaskWrapper from "@/components/home/TaskWrapper";

import HabitProvider from "@/context/HabitProvider";
import HabitWrapper from "@/components/home/HabitWrapper";

import RoutineProvider from "@/context/RoutineProvider";
import RoutineWrapper from "@/components/home/RoutineWrapper";

const TABS = ["Tasks", "Habits", "Routine"];

interface TasksHabitsRoutineProps {
  currentlyOpen: string;
  flatListRef: React.RefObject<FlatList>;
}

const TasksHabitsRoutine: React.FC<TasksHabitsRoutineProps> = ({
  currentlyOpen,
  flatListRef,
}) => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x / 300; // 300 is the width of each tab
  });

  useEffect(() => {
    const index = TABS.indexOf(currentlyOpen);
    flatListRef.current?.scrollToIndex({ index });
  }, [currentlyOpen]);

  return (
    <Animated.FlatList
      ref={flatListRef}
      horizontal
      data={TABS}
      keyExtractor={(item) => item}
      pagingEnabled
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      renderItem={({ item }) => (
        <View className="w-[95vw] ">
          {item === "Tasks" && (
            <TaskProvider>
              <TaskWrapper />
            </TaskProvider>
          )}
          {item === "Habits" && (
            <HabitProvider>
              <HabitWrapper />
            </HabitProvider>
          )}
          {item === "Routine" && (
            <RoutineProvider>
              <RoutineWrapper />
            </RoutineProvider>
          )}
        </View>
      )}
    />
  );
};

export default TasksHabitsRoutine;
