import { View, Text } from 'react-native'
import React from 'react'

import { daysRoutineType } from '@/context/RoutineProvider'

interface IndividualRoutinesProps {
  item: daysRoutineType
}

const IndividualRoutines: React.FC<IndividualRoutinesProps> = ({item}) => {
  return (
    <View className=' bg-red-500 rounded-lg'>
      <Text>{item.routine.title}</Text>
    </View>
  )
}

export default IndividualRoutines