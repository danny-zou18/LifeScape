import React from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Tabs } from "expo-router";
import TabBar from "@/components/general/TabBar";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }
  
  export default function TabLayout() {
  
    return (
      <Tabs
        tabBar={props => <TabBar {...props} />}
        initialRouteName="home"
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerStyle: { backgroundColor: '#323538' },
            headerTintColor: '#fff',
          }}
        />
        <Tabs.Screen
          name="character"
          options={{
            title: 'Character',
          }}
        />
         <Tabs.Screen
          name="play"
          options={{
            title: 'Play',
          }}
        />
        <Tabs.Screen
          name="market"
          options={{
            title: 'Market',
          }}
        />
        <Tabs.Screen
          name="overview"
          options={{
            title: 'Overview',
            headerShown: false,
          }}
        />
      </Tabs>
    );
  }