import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Friendship } from "@/types/db_types";
import { isAxiosError } from "axios";
import IndividualFriendRequest from "@/components/friends/IndividualFriendRequest";

const FriendRequests = () => {
  const { user } = useGlobalContext();

  const [friendRequests, setFriendRequests] = useState<Friendship[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/friends/getFriendRequests/${user.uid}`,
          {
            headers: {
              Authorization: await user.getIdToken(),
            },
          },
        );
        if (response.status === 200) {
          setFriendRequests(response.data);
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
  }, [refresh, user]);

  return (
    <View className="mx-auto mt-5 w-[90%]">
      <Text>FriendRequests</Text>
      {loading ? (
        <ActivityIndicator color="#0000ff" />
      ) : (
        <ScrollView className="mt-2 flex w-full flex-col gap-2 bg-red-400">
          {friendRequests.map((friendRequest) => (
            <IndividualFriendRequest
              key={friendRequest.id}
              friendRequestData={friendRequest}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default FriendRequests;
