import { View, Text, Image } from "react-native";
import React from "react";
import { Stack, Link, usePathname } from "expo-router";

import Header from "@/components/overview/Header";

export default function OverviewLayout() {
  const pathName = usePathname();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Overview",
          header: Header,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
          headerBackTitle: "Done",
          presentation: "modal",
          headerRight: () => <Link href={"/overview"}>Done</Link>,
          headerLeft:
            pathName !== "/overview/settings"
              ? () => <Link href={"/overview/settings"}>Back</Link>
              : undefined,
        }}
      />
      <Stack.Screen
        name="friends"
        options={{
          headerShown: true,
          title: "Friends",
          headerBackTitle: "Done",
          presentation: "modal",
          headerLeft: () => <Link href={"/overview"}>Done</Link>,
          headerRight:
            pathName !== "/overview/friends"
              ? () => <Link href={"/overview/friends"}>Back</Link>
              : () => (
                  <View className="h-10 w-32 flex flex-row items-center">
                    <Link
                      href="/overview/friends/add_friend"
                      className="h-10 items-center py-3 mr-1"
                    >
                      <Text>Add Friend</Text>
                    </Link>
                    <View className="h-[80%] w-full">
                      <View className="h-full w-full">
                        <Image
                          source={require("../../../../assets/images/add_friend.png")}
                          resizeMode="contain"
                          style={{ flex: 1, aspectRatio: 1 }}
                        />
                      </View>
                    </View>
                  </View>
                ),
        }}
      />
    </Stack>
  );
}
