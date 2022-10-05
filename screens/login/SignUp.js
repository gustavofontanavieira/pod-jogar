import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");


  return (
    <View>
      <Text style={registerStyle.register_text}>Registre-se</Text>
      <TextInput
        placeholder="Nome"
        style={registerStyle.input}
        onChangeText={setName}
      />
      <TextInput
        placeholder="E-mail"
        style={registerStyle.input}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        style={registerStyle.input}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirme a senha"
        style={registerStyle.input}
        onChangeText={setConfirmPassword}
      />
      <TextInput
        placeholder="Telefone"
        style={registerStyle.input}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={registerStyle.button}>
        <Text style={registerStyle.button_text}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const registerStyle = StyleSheet.create({
  register_text: {
    color: "#F2F2F2",
    fontSize: 45,
    textAlign: "center",
    marginTop: 100,
    marginBottom: 55,
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
    width: "65%",
    height: "8%",
    padding: 4,
    marginTop: "15%",
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
