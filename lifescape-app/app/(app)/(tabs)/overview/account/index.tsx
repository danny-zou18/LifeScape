import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const Account = () => {
  const router = useRouter();

  return (
    <View>
      <Text>Account Screen</Text>
      <Button
        title="Go Back"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
};

export default Account;