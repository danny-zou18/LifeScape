import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Tabs } from "expo-router";
import TabBar from "@/components/general/TabBar";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
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
          headerShown: false,
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
