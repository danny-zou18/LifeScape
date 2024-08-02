import { View, Text, Image } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

const Friends = () => {
  return (
    <View>
      <Link href="/overview/friends/add_friend" className="p-4 w-full ">
          <Text className="text-white">Add Friend</Text>
        </Link>
    </View>
  )
}

export default Friends