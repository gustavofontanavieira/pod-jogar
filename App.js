import { StyleSheet, Text, View } from "react-native";
import FirstScreen from "./screens/login/FirstScreen";
import Login from "./screens/login/Login";
import Register from "./screens/login/SignUp";
import ChoosePreferences from "./screens/login/ChoosePreferences";
import Home from "./screens/main/Home"

export default function App() {
  return (
    <View style={appStyle.background}>
     {/*  <FirstScreen /> 
      <Login /> 
      <Register />  
      <ChoosePreferences />
  */}
     <Home /> 
    </View>
  );
}

const appStyle = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232323",
  },
});
