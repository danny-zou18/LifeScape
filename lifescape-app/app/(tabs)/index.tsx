import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center" >
      <Text >Home</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href="/" className='text-white'>Go to onboarding</Link>
    </View>
  );
}
