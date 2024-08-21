import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Friendship, FriendShipStatus } from "@/types/db_types";
import { isAxiosError } from "axios";

const FriendRequests = () => {
  const { user } = useGlobalContext();

  const [friendRequests, setFriendRequests] = useState<Friendship[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/friends/getFriendRequests/${user.uid}`, {
          headers: {
            Authorization: await user.getIdToken(),
          },
        });
        if (response.status === 200) {
          setFriendRequests(response.data);
          console.log(response.data);
        }  
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFriendRequests();
  }, [refresh]);

  return (
    <View>
      <Text>FriendRequests</Text>
    </View>
  );
};

export default FriendRequests;
