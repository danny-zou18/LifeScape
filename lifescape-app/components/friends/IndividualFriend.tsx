import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Friendship } from "@/types/db_types";

interface IndividualFriendProps {
  friendData: Friendship;
}

const IndividualFriend: React.FC<IndividualFriendProps> = ({ friendData }) => {
  return (
    <View className="bg-blue-400 rounded-md">
      <Link
        className="p-4 w-full h-full"
        href={`/overview/friends/friend/${friendData.user_id}`}
      >
        <Text>{friendData.user_username}</Text>
      </Link>
    </View>
  );
};

export default IndividualFriend;
