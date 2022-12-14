import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";

export default function FirstScreen({ navigation }) {
  function Login() {
    navigation.replace("Login");
  }

  function SignUp() {
    navigation.navigate("SignUp");
  }

  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
  }, []);

  return (
    <View style={specificStyle.container}>
      <Image
        style={specificStyle.image}
        source={require("../../assets/images/login/pod-jogar620.png")}
      />
      <View style={specificStyle.buttons}>
        <TouchableOpacity style={specificStyle.button} onPress={Login}>
          <Text style={specificStyle.button_text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={specificStyle.button} onPress={SignUp}>
          <Text style={specificStyle.button_text}>Registrar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const specificStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
    width: "100%",
  },
  button: {
    width: 240,
    height: 95,
    padding: 4,
    marginTop: 40,
    backgroundColor: "#76FF93",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttons: {
    alignItems: "center",
  },
  button_text: {
    color: "#232323",
    fontSize: 22,
  },
  image: {
    backgroundColor: "#232323",
    width: "100%",
    marginTop: 20,
  },
});
