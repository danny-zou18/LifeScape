import { View } from 'react-native'
import React from 'react'

import CreateHabitBtn from '../habits/CreateHabitBtn'
import HabitCreationModal from '../habits/HabitCreationModal'
import DisplayHabits from '../habits/DisplayHabits'

const HabitWrapper = () => {
  return (
    <View >
      <HabitCreationModal />
      <CreateHabitBtn />
      <DisplayHabits />
    </View>
  )
}

export default HabitWrapper