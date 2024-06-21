import { View, Text, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'

import { useTaskContext } from '@/context/TaskProvider';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const FilterTasks = () => {
    const { tasks, setTasks } = useTaskContext();
    const [sortBy, setSortBy] = useState<string>("");
    
    useEffect(() => {
        if (sortBy === "dueDate") {
            setTasks([...tasks].sort((a, b) => {
                if (a.dueDate && b.dueDate) {
                    return Number(a.dueDate) - Number(b.dueDate) ;
                } else if (a.dueDate) {
                    return -1;
                } else if (b.dueDate) {
                    return 1;
                } else {
                    return 0;
                }
            }));
        } 
    }, [sortBy]);
    

  return (
    <TouchableHighlight
      style={{ alignSelf: "flex-start" }}
      className="bg-[rgb(253,253,253)] p-2 rounded-full shadow-sm"
      underlayColor="#FFFFFF60"
    //   onPress={() => setTaskCreationOpen(true)}
    >
      <View className="flex flex-row items-center">
        <MaterialIcons name="sort" size={24} color="black" />
        <Text className="mx-2 text-md font-[500]">Sort</Text>
        <FontAwesome name="angle-down" size={20} color="gray" />
      </View>
    </TouchableHighlight>
  )
}

export default FilterTasks