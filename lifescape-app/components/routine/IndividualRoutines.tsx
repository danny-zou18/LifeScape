import { View, Text } from 'react-native'
import React from 'react'

import { daysRoutineType } from '@/context/RoutineProvider'

interface IndividualRoutinesProps {
  item: daysRoutineType
  styles?: any
}

const IndividualRoutines: React.FC<IndividualRoutinesProps> = ({styles, item}) => {
  return (
    <View className=' bg-red-500 rounded-lg' style={{...styles}}>
      <Text>{item.routine.title}</Text> 
    </View>
  )
}

export default IndividualRoutines