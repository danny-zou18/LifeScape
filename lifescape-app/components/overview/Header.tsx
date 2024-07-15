import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = () => {
  return (
    <SafeAreaView className='bg-gray-800 flex flex-col` gap-5'>
      <Text>Header</Text>
      <View className='mx-auto bg-red-400 w-[70%] flex flex-row justify-between mb-5' >
        <Ionicons name="settings-sharp" size={30} color="black" />
      </View>
    </SafeAreaView>
  )
}

export default Header