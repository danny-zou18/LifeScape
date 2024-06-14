import { View, Text} from 'react-native';
import React from 'react';
import 'nativewind'

import { useGlobalContext } from '@/context/GlobalProvider';

const Account = () => {
  //const {user} = useGlobalContext();
  const user = {
    username: 'Ramzey',
    email: 'RY@gmail',
    emailVerified: true,
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-gray-100">
    <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <Text className="text-center text-2xl font-bold my-5">Account Details</Text>
      
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