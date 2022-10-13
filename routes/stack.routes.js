import { createStackNavigator } from "@react-navigation/stack";
import Reproduction from "../screens/reproduction/Reproduction";
import * as React from "react";
import Home from "../screens/main/Home";
import HomeClass from "../screens/main/Home-class";

const Stack = createStackNavigator();

function StackHome() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={HomeClass} />
      <Stack.Screen name="Reproduction" component={Reproduction} />
    </Stack.Navigator>
  );
}

export default StackHome;
