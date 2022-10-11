import { StyleSheet, Text, View } from "react-native";

import Login from "./screens/login/Login";
import Register from "./screens/login/SignUp";
import ChoosePreferences from "./screens/login/ChoosePreferences";
import Tabs from "./routes/tab.routes";

import StackRoutes from "./routes/stack.routes";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
