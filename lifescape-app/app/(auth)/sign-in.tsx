import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import { Link } from 'expo-router'

const signIn = () => {
  return (
    <SafeAreaView className='h-full'>
      <ScrollView>
        <View className='w-full flex justify-center min-h-[85vh] px-4 my-6'>
          <View className='flex flex-row'>
            <Text>Don't have an Account?</Text>
            <Link href="/sign-up" className='ml-4'>Sign up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signIn