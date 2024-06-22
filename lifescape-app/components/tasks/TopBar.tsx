import { View,Text } from 'react-native'
import React from 'react'

import FilterTasks from './FilterTasks'
import CreateTaskBtn from './CreateTaskBtn'

const TopBar = () => {
  return (
    <View className='flex flex-row justify-between items-center pl-2 pr-1 '>
        <FilterTasks />
        <CreateTaskBtn />
    </View>
  )
}

export default TopBar