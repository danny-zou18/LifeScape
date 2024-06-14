import { View, Text } from 'react-native'
import React from 'react'

import CreateHabitBtn from '../habits/CreateHabitBtn'
import HabitCreationModal from '../habits/HabitCreationModal'

const HabitWrapper = () => {
  return (
    <View >
      <HabitCreationModal />
      <CreateHabitBtn />
    </View>
  )
}

export default HabitWrapper