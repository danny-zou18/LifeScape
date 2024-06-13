import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Task } from "@/types/db_types";
import IndividualTasks from "./IndividualTasks";

import { useGlobalContext } from "@/context/GlobalProvider";

interface DisplayTasksProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const DisplayTasks: React.FC<DisplayTasksProps> = ({ tasks, setTasks }) => {
  const { user, userCharacter } = useGlobalContext();

  return (
    <View>
      <Text>DisplayTasks</Text>
      <FlatList 
        data={tasks}
        renderItem={({item}) => {
            return <IndividualTasks task={item} setTasks={setTasks}/>
        }}
        ItemSeparatorComponent={() => <View className="h-1"></View>}
        />
    </View>
  );
};

export default DisplayTasks;
