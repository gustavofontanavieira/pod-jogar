import { createStackNavigator } from "@react-navigation/stack";
import Reproduction from "../screens/reproduction/Reproduction";
import * as React from "react";
import Home from "../screens/main/Home";
import Login from "../screens/login/Login";
import SignUp from "../screens/login/SignUp";
import FirstScreen from "../screens/login/FirstScreen";
import AddPodcast from "../screens/profile/addPodcast";
import Profile from "../screens/profile/profile";
import WindowAlert from "../components/WindowAlert";
import Card from "../components/Card";

const Stack = createStackNavigator();

function StackHome() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="Main" component={Home} />
      <Stack.Screen name="Reproduction" component={Reproduction} />
      <Stack.Screen name="AddPodcast" component={AddPodcast} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="AlertWindow" component={WindowAlert} />
      <Stack.Screen name="Card" component={Card} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default StackHome;
