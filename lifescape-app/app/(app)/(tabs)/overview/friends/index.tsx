import { View, Text, Image, SafeAreaView, Pressable } from "react-native";
import { Link } from "expo-router";
import React from "react";
import FriendsList from "@/components/friends/FriendsList";

const Friends = () => {
  return (
    <SafeAreaView className=" mx-auto mb-2 mt-5 w-[90%]">
      <View className="w-full overflow-hidden rounded-lg bg-black">
        <Link href="/overview/friends/add_friend" asChild>
          <Pressable className="flex w-full flex-row items-center justify-between p-4">
            <Text className="text-white">Add Friend</Text>
            <View className="h-[170%]">
              <Image
                source={require("../../../../../assets/images/add_friend.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
          </Pressable>
        </Link>
        <View className="h-[1px] w-full bg-white"></View>
        <Link href="/overview/friends/friend_requests" asChild>
          <Pressable className="flex w-full flex-row items-center justify-between p-4">
            <Text className="text-white">Friend Requests</Text>
            <View className="h-[170%]">
              <Image
                source={require("../../../../../assets/images/add_friend.png")}
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1 }}
              />
            </View>
          </Pressable>
        </Link>
        <View className="h-[1px] w-full bg-white"></View>
      </View>
      <FriendsList />
    </SafeAreaView>
  );
};

export default Friends;
