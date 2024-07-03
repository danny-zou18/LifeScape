import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import RewardsPopup from './RewardsPopup'



const RewardsManager = () => {
    const [rewards, setRewards] = useState([]);
  return (
    <View>
      <Text>RewardsManager</Text>
    </View>
  )
}

export default RewardsManager