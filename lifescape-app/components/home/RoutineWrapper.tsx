import { View } from 'react-native'
import React from 'react'

import CreateRoutineBtn from '../routine/CreateRoutineBtn'
import RoutineCreationModal from '../routine/RoutineCreationModal'

const RoutineWrapper = () => {
  return (
    <View >
      <RoutineCreationModal />
      <CreateRoutineBtn />
    </View>
  )
}

export default RoutineWrapper