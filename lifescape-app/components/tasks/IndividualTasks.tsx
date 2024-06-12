import { View, Text } from 'react-native'
import React from 'react'

import { Task } from '@/types/db_types'

const IndividualTasks = ({task}:{task: Task}) => {
  return (
    <View className='bg-red-100'>
      <Text>{task.title}</Text>
    </View>
  )
}

export default IndividualTasks