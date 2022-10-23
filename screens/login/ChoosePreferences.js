import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function ChoosePreferences() {
  const [textStyle, setTextStyle] = useState(false);
  const categories1 = [
    { id: 1, name: "Aventura" },
    { id: 2, name: "Ação" },
    { id: 3, name: "Jogos Antigos" },
    { id: 4, name: "Jogos Novos" },
    { id: 5, name: "História" },
    { id: 6, name: "RPG" },
  ];
  const categories2 = [
    { id: 1, name: "Multiplayer" },
    { id: 2, name: "Singleplayer" },
    { id: 3, name: "Consoles" },
    { id: 4, name: "PC" },
    { id: 5, name: "Moba" },
    { id: 6, name: "Terror" },
  ];

  return (
    <View style={preferencesStyle.background}>
      <Text style={preferencesStyle.preferences_text}>
        Selecione seus temas preferidos
      </Text>
      <View style={preferencesStyle.mainView}>
        <View style={preferencesStyle.column}>
          {categories1.map((categoria, id) => {
            return (
              <Text
                onPress={() => setTextStyle(!textStyle)}
                key={id}
                style={
                  textStyle == false
                    ? preferencesStyle.text
                    : preferencesStyle.press_text
                }
              >
                {categoria.name}
              </Text>
            );
          })}
        </View>
        <View style={preferencesStyle.column}>
          {categories2.map((categoria, id) => {
            return (
              <Text
                onPress={() => setTextStyle(!textStyle)}
                key={id}
                style={
                  textStyle == false
                    ? preferencesStyle.text
                    : preferencesStyle.press_text
                }
              >
                {categoria.name}
              </Text>
            );
          })}
        </View>
      </View>
      <TouchableOpacity style={preferencesStyle.button}>
        <Text style={preferencesStyle.button_text}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const preferencesStyle = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232323",
  },
  preferences_text: {
    color: "#F2F2F2",
    fontSize: 23,
    textAlign: "center",
    marginTop: 70,
  },
  mainView: {
    marginTop: 40,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
  },
  column: {
    width: "50%",
  },
  text: {
    color: "#F2F2F2",
    fontSize: 18,
    marginTop: 25,
  },
  press_text: {
    color: "#76FF93",
    fontSize: 18,
    marginTop: 25,
  },
  button: {
    width: 220,
    height: 55,
    padding: 4,
    marginTop: "30%",
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
