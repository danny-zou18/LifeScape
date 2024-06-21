import { View, Text, FlatList } from "react-native";
import React from "react";

import IndividualHabits from "./IndividualHabits";

import { useHabitContext } from "@/context/HabitProvider";

const DisplayHabits = () => {
  const { habits, setHabits } = useHabitContext();

  return (
    <View className="h-full mt-4">
      <FlatList
        data={habits}
        renderItem={({ item }) => {
          return <IndividualHabits habit={item} setHabits={setHabits} />;
        }}
        ItemSeparatorComponent={() => <View className="h-1"></View>}
      />
    </View>
  );
};

export default DisplayHabits;
