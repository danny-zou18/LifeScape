import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Friendship } from "@/types/db_types";

interface IndividualFriendProps {
  friendData: Friendship;
}

const IndividualFriend: React.FC<IndividualFriendProps> = ({ friendData }) => {
  return (
    <View className="rounded-md bg-blue-400">
      <Link
        className="h-full w-full p-4"
        href={`/overview/friends/friend/${friendData.user_id}`}
      >
        <Text>{friendData.user_username}</Text>
      </Link>
    </View>
  );
};

export default IndividualFriend;
