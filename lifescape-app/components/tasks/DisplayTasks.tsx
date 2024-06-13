import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import IndividualTasks from "./IndividualTasks";

import { useTaskContext } from "@/context/TaskProvider";
import { useGlobalContext } from "@/context/GlobalProvider";

const DisplayTasks: React.FC = () => {
    const { tasks, setTasks } = useTaskContext();
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
