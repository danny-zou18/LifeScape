import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'

import { useRoutineContext } from '@/context/RoutineProvider'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ViewWeeklyRoutine = () => {
  return (
    <TouchableHighlight
      style={{ alignSelf: "flex-start" }}
      className="p-1 my-auto border-b-[.5px]"
      underlayColor="#FFFFFF60"
    //   onPress={() => setRoutineCreationOpen(true)}
    >
      <View className="flex flex-row items-center  pr-3">
        <MaterialCommunityIcons name="view-column-outline" size={24} color="black" />
        <Text className="ml-2 text-md font-[500]">Week</Text>
      </View>
    </TouchableHighlight>
  )
}

export default ViewWeeklyRoutine