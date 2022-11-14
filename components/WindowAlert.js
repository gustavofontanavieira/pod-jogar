import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function WindowAlert({ navigation, prop, nonquite, message }) {
  return (
    <View style={windowStyle.window}>
      <Text style={windowStyle.title}>{message.title}</Text>
      <View style={windowStyle.divider} />
      <Text style={windowStyle.paragraph}>{message.paragraph}</Text>
      <View style={windowStyle.buttons}>
        <TouchableOpacity style={windowStyle.buttonCancel} onPress={nonquite}>
          <Text style={windowStyle.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={windowStyle.buttonConfirm} onPress={prop}>
          <Text style={windowStyle.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const windowStyle = StyleSheet.create({
  window: {
    zIndex: 1,
    position: "absolute",
    marginTop: "65%",
    width: "88%",
    height: "26%",
    backgroundColor: "#111111",
    alignSelf: "center",
    borderRadius: 25,
  },
  title: {
    marginLeft: "6%",
    color: "#f2f2f2",
    fontSize: 18,
    marginTop: "2%",
  },
  paragraph: {
    color: "#f2f2f2",
    fontSize: 17,
    alignSelf: "center",
    marginTop: "12%",
  },
  divider: {
    height: 1,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#f2f2f2",
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonConfirm: {
    marginTop: "20%",
    width: "40%",
    height: "45%",
    borderColor: "#76FF93",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "#f2f2f2",
  },
  buttonCancel: {
    marginTop: "20%",
    width: "40%",
    height: "45%",
    borderColor: "#ff0800",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
