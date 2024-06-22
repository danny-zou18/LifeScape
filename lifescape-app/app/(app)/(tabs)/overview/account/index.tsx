import { View, Text, Pressable} from 'react-native';
import { useNavigation } from 'expo-router';
import React from 'react';
import 'nativewind'

import { useGlobalContext } from '@/context/GlobalProvider';

const Account = () => {
  //const {user} = useGlobalContext();
  const navigation = useNavigation();

  const user = {
    username: 'Ramzey',
    email: 'RY@gmail',
    emailVerified: true,
  };


  return (
    <View className="flex-1 bg-gray-100 p-5">
      <View className="w-full bg-white p-6 rounded-lg shadow-md">
        <View className="my-3">
          <Text className="text-lg font-semibold">Username:</Text>
          <Text className="text-base">{user.username}</Text>
        </View>

        <View className="my-3">
          <Text className="text-lg font-semibold">Email:</Text>
          <Text className="text-base">{user.email}</Text>
        </View>

        <View className="my-3">
          <Text className="text-lg font-semibold">Email Verification:</Text>
          <Text className={`text-base ${user.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
            {user.emailVerified ? 'Verified' : 'Not Verified'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Account;