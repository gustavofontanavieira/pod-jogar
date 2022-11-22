import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");

  let passwordMessage =
    "As senhas são diferentes e precisam no mínimo de 6 dígitos";
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
  }, []);

  function Cadastrar() {
    let data = {
      email: email,
      name: name,
      password: password,
      email: email,
      lastName: lastName,
    };

    let login = {
      email: email,
      passowrd: password,
    };

    if (password === confirmPassword && password.length >= 6) {
      setPasswordError(false);
      setEmailError(false);
      userService.create(data).then((response) => {
        if (response === "E-mail já existente") {
          setEmailError(true);
        } else {
          userService.login(login).then((response) => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Main" }],
            });
          });
        }
      });
    } else {
      setPasswordError(true);
    }
  }

  return (
    <View style={registerStyle.background}>
      <TouchableOpacity
        style={registerStyle.goBack}
        onPress={() => {
          navigation.replace("FirstScreen");
        }}
      >
        <AntDesign name="back" color={"#f2f2f2"} size={30} />
      </TouchableOpacity>
      <Text style={registerStyle.register_text}>Registre-se</Text>
      <TextInput
        placeholder="Nome"
        style={registerStyle.input}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Sobrenome"
        style={registerStyle.input}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="E-mail"
        style={registerStyle.input}
        onChangeText={setEmail}
      />
      {emailError && (
        <Text style={registerStyle.errorMessage}>E-mail já existente</Text>
      )}
      <TextInput
        placeholder="Senha"
        style={registerStyle.input}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {passwordError && (
        <Text style={registerStyle.errorMessage}>{passwordMessage}</Text>
      )}
      <TextInput
        placeholder="Confirme a senha"
        style={registerStyle.input}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      {passwordError && (
        <Text style={registerStyle.errorMessage}>{passwordMessage}</Text>
      )}

      <TouchableOpacity style={registerStyle.button} onPress={Cadastrar}>
        <Text style={registerStyle.button_text}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const registerStyle = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232323",
  },
  register_text: {
    color: "#F2F2F2",
    fontSize: 42,
    textAlign: "center",
    marginTop: 80,
    marginBottom: 45,
  },
  input: {
    backgroundColor: "#F2F2F2",
    width: "90%",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    padding: 8,
    marginTop: 10,
  },
  button: {
    width: "65%",
    height: "8%",
    padding: 4,
    marginTop: "6%",
    backgroundColor: "#76FF93",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    alignSelf: "center",
  },
  button_text: {
    color: "#232323",
  },
  errorMessage: {
    paddingLeft: 30,
    paddingRight: 30,
    color: "red",
    alignSelf: "center",
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
});
