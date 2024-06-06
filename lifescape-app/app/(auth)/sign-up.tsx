import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import { Link } from 'expo-router'

const signUp = () => {
  return (
    <SafeAreaView className='h-full'>
      <ScrollView>
        <View className='w-full flex justify-center min-h-[85vh] px-4 my-6'>
          <View className='flex flex-row'>
            <Text>Already have an Account?</Text>
            <Link href="/sign-in" className='ml-4'>Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signUp