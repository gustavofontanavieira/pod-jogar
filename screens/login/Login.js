import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import userService from "../../services/userService";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
  }, []);

  function Auth() {
    let loginData = {
      email: email,
      password: password,
    };

    userService.login(loginData).then((response) => {
      if (response === false) {
        setError(true);
      } else {
        navigation.replace("Main");
      }
    });
  }

  return (
    <View style={loginStyle.background}>
      <TouchableOpacity
        style={loginStyle.goBack}
        onPress={() => {
          navigation.replace("FirstScreen");
        }}
      >
        <AntDesign name="back" color={"#f2f2f2"} size={30} />
      </TouchableOpacity>
      <ScrollView>
        <Text style={loginStyle.login_text}>Login</Text>
        <TextInput
          placeholder="E-mail"
          style={loginStyle.input}
          onChangeText={setEmail}
        />
        {error && (
          <Text style={loginStyle.errorText}>
            Email ou senha errados, tente novamente
          </Text>
        )}
        <TextInput
          placeholder="Senha"
          style={loginStyle.input}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {error && (
          <Text style={loginStyle.errorText}>
            Email ou senha errados, tente novamente
          </Text>
        )}
        <TouchableOpacity style={loginStyle.button} onPress={Auth}>
          <Text style={loginStyle.button_text}>Entrar</Text>
        </TouchableOpacity>
      </ScrollView>
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
    width: "90%",
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
  goBack: {
    width: 30,
    height: 30,
    marginTop: 35,
    marginLeft: 25,
    borderRadius: 100,
    position: "absolute",
    zIndex: 1,
  },
  errorText: {
    color: "red",
    paddingRight: 10,
    paddingLeft: 10,
  },
});
