import { StyleSheet } from 'react-native';
import "@/global.css"

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center" >
      <Text >Home</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
