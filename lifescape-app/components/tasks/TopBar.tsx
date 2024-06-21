import { View, Text } from 'react-native'
import React from 'react'

import CreateTaskBtn from './CreateTaskBtn'

const TopBar = () => {
  return (
    <View className='flex flex-row justify-between items-center'>
        <Text>Hello</Text>
        <CreateTaskBtn />
    </View>
  )
}

export default TopBar