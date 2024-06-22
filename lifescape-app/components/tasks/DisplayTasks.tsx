import { View, Text, FlatList } from "react-native";
import React from "react";

import IndividualTasks from "./IndividualTasks";

import { useTaskContext } from "@/context/TaskProvider";

const DisplayTasks: React.FC = () => {
    const { tasks, setTasks } = useTaskContext();
  return (
    <View  className='h-full mt-4'>
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
