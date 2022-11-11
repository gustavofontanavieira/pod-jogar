import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import userService from "../../services/userService";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Auth() {
    let loginData = {
      email: email,
      password: password,
    };

    userService.login(loginData).then((response) => {
      if (response !== true) {
        console.log("Email ou senha errados, tente novamente");
      } else {
        navigation.replace("Main");
      }
    });
  }

  return (
    <View style={loginStyle.background}>
      <Text style={loginStyle.login_text}>Login</Text>
      <TextInput
        placeholder="Nome"
        style={loginStyle.input}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        style={loginStyle.input}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={loginStyle.button} onPress={Auth}>
        <Text style={loginStyle.button_text}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const loginStyle = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232323",
  },
  login_text: {
    color: "#F2F2F2",
    fontSize: 45,
    textAlign: "center",
    marginTop: 130,
    marginBottom: 110,
  },
  input: {
    backgroundColor: "#F2F2F2",
    width: 330,
    height: 53,
    borderRadius: 10,
    alignSelf: "center",
    padding: 8,
    marginTop: 20,
  },
  button: {
    width: 220,
    height: 60,
    padding: 4,
    marginTop: 75,
    backgroundColor: "#76FF93",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    alignSelf: "center",
  },
  button_text: {
    color: "#232323",
  },
});
