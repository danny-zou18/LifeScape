import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Friendship } from '@/types/db_types'
import api from '@/api/axios'

interface IndividualFriendRequestProps {
    friendRequestData: Friendship
};

const IndividualFriendRequest:React.FC<IndividualFriendRequestProps> = ({friendRequestData}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const rejectFriendRequest = async () => {
    
  }
  const acceptFriendRequest = async () => {
    
  }

  return (
    <View className='w-full p-3 border-[1px] rounded-lg'>
      <Text>{friendRequestData.user_username}</Text>
    </View>
  )
}

export default IndividualFriendRequest