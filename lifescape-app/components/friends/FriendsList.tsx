import { View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import api from "@/api/axios";
import { Friendship } from "@/types/db_types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { isAxiosError } from "axios";

import IndividualFriend from "./IndividualFriend";
import { ScrollView } from "react-native-gesture-handler";

const FriendsList = () => {
  const { user } = useGlobalContext();
  const [friends, setFriends] = useState<Friendship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await api.get(`friends/getFriends/${user.uid}`, {
          headers: {
            Authorization: await user.getIdToken(),
          },
        });
        if (response.status === 200) {
          setFriends(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.log(error);
        }
      }
    };
    fetchFriends();
  }, [user, refresh]);

  return (
    <View className="mt-5  w-full">
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <ScrollView>
          {friends.map((friend) => (
            <IndividualFriend key={friend.id} friendData={friend} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default FriendsList;
