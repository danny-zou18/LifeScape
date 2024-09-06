import React from "react";
import { Stack, Link } from "expo-router";

export default function FriendsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="add_friend/index"
        options={{
          headerShown: false,
          title: "Add Friend",
        }}
      />
      <Stack.Screen
        name="friend_requests/index"
        options={{
          headerShown: false,
          title: "Friend Requests",
        }}
      />
      <Stack.Screen
        name="friend/[friendId]"
        options={{
          headerShown: false,
          title: "Friend",
        }}
      />
    </Stack>
  );
}
