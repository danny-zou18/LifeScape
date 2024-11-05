import {
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { Friendship } from "@/types/db_types";
import api from "@/api/axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import { isAxiosError } from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IndividualFriendRequestProps {
  friendRequestData: Friendship;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndividualFriendRequest: React.FC<IndividualFriendRequestProps> = ({
  friendRequestData,
  refresh,
  setRefresh,
}) => {
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(false);

  const rejectFriendRequest = async () => {
    setLoading(true);
    try {
      const response = await api.post(
        `/friends/reject/${user.uid}`,
        {
          friendId: friendRequestData.user_id,
        },
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
      );
      if (response.status === 200) {
        setRefresh(!refresh);
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
  const acceptFriendRequest = async () => {
    setLoading(true);

    try {
      const response = await api.post(
        `/friends/accept/${user.uid}`,
        {
          friendId: friendRequestData.user_id,
        },
        {
          headers: {
            Authorization: await user.getIdToken(),
          },
        },
      );
      if (response.status === 200) {
        setRefresh(!refresh);
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

  return (
    <View className="flex w-full flex-row justify-between rounded-lg border-[1px] p-3">
      <Text>{friendRequestData.user_username}</Text>
      <View className="flex flex-row gap-2 ">
        {loading ? (
          <ActivityIndicator color="#0000ff" />
        ) : (
          <>
            <TouchableHighlight
              onPress={acceptFriendRequest}
              className="rounded-full bg-green-400 p-2"
              underlayColor="#278a3e"
            >
              <Ionicons name="checkmark-sharp" size={24} color="black" />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={rejectFriendRequest}
              className="rounded-full bg-red-500 p-2"
              underlayColor="#8a2424"
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableHighlight>
          </>
        )}
      </View>
    </View>
  );
};

export default IndividualFriendRequest;
