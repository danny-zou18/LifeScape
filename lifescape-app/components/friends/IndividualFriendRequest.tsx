import { View, Text } from 'react-native'
import React from 'react'
import { Friendship } from '@/types/db_types'

interface IndividualFriendRequestProps {
    friendRequestData: Friendship
};

const IndividualFriendRequest:React.FC<IndividualFriendRequestProps> = ({friendRequestData}) => {
  return (
    <View className='w-full p-3 border-[1px] rounded-lg'>
      <Text>{friendRequestData.user_username}</Text>
    </View>
  )
}

export default IndividualFriendRequest