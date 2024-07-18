import { View, Text} from 'react-native';
import React from 'react';
import 'nativewind'

import { useGlobalContext } from '@/context/GlobalProvider';

const History = () => {
  const {userCharacter} = useGlobalContext();

  return (
    <View className="flex-1 bg-gray-100 p-5">
      <View className="w-full bg-white p-6 rounded-lg shadow-md">
        <View className="my-3">
          <Text className="text-lg font-semibold">Total Number of Tasks Completed:</Text>
          <Text className="text-base">{userCharacter?.TotalTasksDone}</Text>
        </View>

        <View className="my-3">
          <Text className="text-lg font-semibold">Total Number of Habits Completed:</Text>
          <Text className="text-base">{userCharacter?.TotalHabitsDone}</Text>
        </View>

        <View className="my-3">
          <Text className="text-lg font-semibold">Total Number of Routines Completed:</Text>
          <Text className= "text-base">{userCharacter?.TotalRoutinesDone}</Text>
        </View>
      </View>
    </View>
  );
};

export default History;