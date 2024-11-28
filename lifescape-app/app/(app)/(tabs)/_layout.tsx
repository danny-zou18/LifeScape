import React from "react";
import { View, Text, Image } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Tabs } from "expo-router";
import TabBar from "@/components/general/TabBar";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { userCharacter } = useGlobalContext();

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#323538" },
          headerTintColor: "#fff",
        }}
      />
      <Tabs.Screen
        name="character"
        options={{
          title: "Character",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          title: "Play",
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: "Market",
          headerShown: true,
          headerRight: () => (
            <View className="mr-5 flex w-full flex-row items-center justify-end">
              <View className="h-8">
                <Image
                  source={require("@/assets/images/pixil-frame-0.png")}
                  resizeMode="contain"
                  style={{ flex: 1, aspectRatio: 1 }}
                />
              </View>
              <Text>{userCharacter?.gold}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="overview"
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
