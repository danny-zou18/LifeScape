import { View, Text } from 'react-native'
import React from 'react'
import { Friendship } from '@/types/db_types'

interface IndividualFriendProps {
    friendData: Friendship
}

const IndividualFriend: React.FC<IndividualFriendProps> = ({friendData}) => {
  return (
    <View>
        <Text>{friendData.user_id}</Text>
    </View>
  )
}

export default IndividualFriend