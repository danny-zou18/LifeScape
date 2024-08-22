import { View, Text } from 'react-native'
import React from 'react'
import { Friendship } from '@/types/db_types'

interface IndividualFriendRequestProps {
    friendRequestData: Friendship
};

const IndividualFriendRequest:React.FC<IndividualFriendRequestProps> = ({friendRequestData}) => {
  return (
    <View>
      <Text>IndividualFriendRequest</Text>
    </View>
  )
}

export default IndividualFriendRequest