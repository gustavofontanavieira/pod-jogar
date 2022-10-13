import { StyleSheet, Text, View } from "react-native";

import Login from "./screens/login/Login";
import Register from "./screens/login/SignUp";
import ChoosePreferences from "./screens/login/ChoosePreferences";
import Tabs from "./routes/tab.routes";

import StackRoutes from "./routes/stack.routes";

import { NavigationContainer } from "@react-navigation/native";
import { AudioProvider } from "./context/AudioProvider";

export default function App() {
  return (
    //this will get the AudioProvider always that app render show the alert box to allow the permission
    <AudioProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AudioProvider>
  );
}
