import { createStackNavigator } from "@react-navigation/stack";
import Reproduction from "../screens/reproduction/Reproduction";
import * as React from "react";
import Home from "../screens/main/Home";
import AddPodcast from "../screens/profile/addPodcast";

const Stack = createStackNavigator();

function StackHome() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Home} />
      <Stack.Screen name="Reproduction" component={Reproduction} />
      <Stack.Screen name="AddPodcast" component={AddPodcast} />
    </Stack.Navigator>
  );
}

export default StackHome;
