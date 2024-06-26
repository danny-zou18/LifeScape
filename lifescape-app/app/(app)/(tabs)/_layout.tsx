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

      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
           
          }}
        />
        <Tabs.Screen
          name="overview"
          options={{
            title: 'Overview',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />

          }}
        />
      </Tabs>
    );
  }