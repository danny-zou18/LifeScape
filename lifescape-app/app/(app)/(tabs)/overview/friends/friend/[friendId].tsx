import { View, Text, Image } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import api from "@/api/axios";
import { User, Character } from "@/types/db_types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { calculatePercentage } from "@/functions";

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

  const expPercentage = useMemo(() => {
    let next_level =
      0.8 * Math.pow(friendData?.character?.level ?? 0, 2) +
      2 * (friendData?.character?.level ?? 0);
    return calculatePercentage(
      friendData?.character?.experience ?? 0,
      next_level
    );
  }, [friendData?.character?.experience, friendData?.character?.level]);

  return (
    <View>
      <Text>FriendOverview</Text>
      {friendData && (
        <View className="h-48 w-full">
          <Image
            className="z-0 h-full w-full rounded-md"
            source={{
              uri: "https://media1.tenor.com/m/sepKXIenuG0AAAAC/cat-meme-cat-meme-face.gif",
            }}
          />
          <View className="mt-1 flex h-2 w-full flex-row bg-transparent">
            <View className="min-w-[100%] overflow-hidden rounded-full bg-[#00000090]">
              <View
                style={{ width: expPercentage }}
                className={`flex h-full items-center justify-center rounded-l-full rounded-r-lg bg-green-400`}
              ></View>
            </View>
          </View>
          <View className="flex flex-row justify-between">
            <Text>Level {friendData.character?.level}</Text>
            <Text>
              {friendData.character?.experience.toFixed(2)} /{" "}
              {(
                0.8 * Math.pow(friendData.character?.level ?? 0, 2) +
                2 * (friendData.character?.level ?? 0)
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default FriendOverview;
