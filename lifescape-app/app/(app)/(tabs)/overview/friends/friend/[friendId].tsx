import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import api from "@/api/axios";
import { User, Character } from "@/types/db_types";
import { useGlobalContext } from "@/context/GlobalProvider";

const FriendOverview = () => {
  const [friendData, setFriendData] = useState<User | null>(null);
    useState<Character | null>(null);

  const { user } = useGlobalContext();
  const { friendId } = useLocalSearchParams<{ friendId: string }>();

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const response = await api.get(
          `/friends/getFriendData/${user.uid}/${friendId}`
        );
        setFriendData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFriendData();
  }, [friendId, user]);

  return (
    <View>
      <Text>FriendOverview</Text>
    </View>
  );
};

export default FriendOverview;
