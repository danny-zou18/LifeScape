import { View, Text} from 'react-native';
import React from 'react';
import 'nativewind'

import { useGlobalContext } from '@/context/GlobalProvider';

const History = () => {
  const {user, userCharacter} = useGlobalContext();


  return (
    <View className="flex-1 bg-gray-100 p-5">
      <View className="w-full bg-white p-6 rounded-lg shadow-md">
        <View className="my-3">
          <Text className="text-lg font-semibold">Number of Tasks:</Text>
          {/* <Text className="text-base">{taskCount}</Text> */}
        </View>

        <View className="my-3">
          <Text className="text-lg font-semibold">Number of Habits:</Text>
          {/* <Text className="text-base">{habitCount}</Text> */}
        </View>

        <View className="my-3">
          <Text className="text-lg font-semibold">Number of Routines:</Text>
          {/* <Text className= "text-base">{routineCount}</Text> */}
        </View>
      </View>
    </View>
  );
};

export default History;