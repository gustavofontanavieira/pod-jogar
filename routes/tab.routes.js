import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Favorites from "../screens/favorites/Favorites";
import Profile from "../screens/profile/profile";

import StackHome from "./stack.routes";

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#2c2c2b",
          borderTopColor: "transparent",
          height: 48,
        },
        tabBarActiveTintColor: "#76FF93",
        tabBarInactiveTintColor: "#f2f2f2",
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackHome}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Pefil"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Favoritos"
        component={Favorites}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
