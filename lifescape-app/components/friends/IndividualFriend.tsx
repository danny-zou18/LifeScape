import { View, Text } from 'react-native'
import React from 'react'
import { Friendship } from '@/types/db_types'

interface IndividualFriendProps {
    friendData: Friendship
}

const IndividualFriend: React.FC<IndividualFriendProps> = ({friendData}) => {
  return (
    <View className='bg-blue-400 p-2 rounded-md'>
        <Text>{friendData.user_username}</Text>
    </View>
  )
}

export default IndividualFriend