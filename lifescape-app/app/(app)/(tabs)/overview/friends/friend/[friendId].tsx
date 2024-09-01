import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import api from "@/api/axios";
import { User, Character } from "@/types/db_types";

const FriendOverview = () => {
  const [friendUserData, setFriendUserData] = useState<User | null>(null);
  const [friendCharacterData, setFriendCharacterData] =
    useState<Character | null>(null);

  const { friendId } = useLocalSearchParams<{ friendId: string }>();

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const response = await api.get(`/auth/${friendId}`);
        setFriendUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFriendCharacterData = async () => {
      try {
        const response = await api.get(`/character/get/${friendId}`);
        setFriendCharacterData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFriendData();
    fetchFriendCharacterData();
  }, [friendId]);

  return (
    <View>
      <Text>FriendOverview</Text>
    </View>
  );
};

export default FriendOverview;
