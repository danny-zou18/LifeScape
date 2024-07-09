import { View } from 'react-native'
import React from 'react'

import TopBar from '../routine/TopBar'
import RoutineCreationModal from '../routine/RoutineCreationModal'
import DisplayTodaysRoutine from '../routine/DisplayTodaysRoutine'

const RoutineWrapper = () => {
  return (
    <View >
      <RoutineCreationModal />
      <TopBar />
      <DisplayTodaysRoutine />
    </View>
  )
}

export default RoutineWrapper