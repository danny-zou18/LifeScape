import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { Link } from 'expo-router'

const AuthLayout = () => {
  return (
    <View>
        <Link href="/" className='text-white'>Go to onboarding</Link>
    </View>
  )
}

export default AuthLayout

