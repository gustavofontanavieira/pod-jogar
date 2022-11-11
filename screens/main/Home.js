import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import Card from "../../components/Card";
import DropDown from "../../components/DropDown";
/* import * as MediaLibrary from "expo-media-library"; */

import userService from "../../services/userService";

export default function Home({ navigation }) {
  const podcasts = [
    {
      title: "Ghost B.C 1",
      description: "black metal band 1",
      image: require("../../assets/images/login/ghost.jpg"),
      id: 1,
    },
    {
      title: "Ghost B.C 2",
      description: "black metal band 2",
      image: require("../../assets/images/login/ghost.jpg"),
      id: 2,
    },
    {
      title: "Ghost B.C 3",
      description: "black metal band 3",
      image: require("../../assets/images/login/ghost.jpg"),
      id: 3,
    },
  ];

  /*   userService.getAllUsers().then((response) => {
    console.log(response);
  }); */

  const [search, setSearch] = useState("");

  return (
    <View style={homeStyle.viewHome}>
      <View style={homeStyle.search}>
        <TextInput
          placeholder="Pesquisar podcast"
          onChangeText={setSearch}
          style={homeStyle.searchInput}
        />
        <TouchableOpacity
          onPress={() => {
            console.log(search);
          }}
        >
          <Image source={require("../../assets/images/login/search.png")} />
        </TouchableOpacity>
      </View>
      <View style={homeStyle.listPosition}>
        <DropDown />
      </View>
      <Text style={homeStyle.mediumHomeText}>Podcasts desta categoria:</Text>

      <ScrollView>
        {podcasts.map((item, key) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Reproduction", item);
              }}
              key={key}
            >
              <Card prop={item} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const homeStyle = StyleSheet.create({
  viewHome: {
    flex: 1,
    backgroundColor: "#232323",
  },
  mediumHomeText: {
    color: "#f2f2f2",
    fontSize: 20,
    marginTop: 50,
    marginLeft: 28,
    marginBottom: 5,
  },
  listPosition: {
    marginTop: 35,
    alignItems: "center",
  },
  search: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 60,
    width: "90%",
    height: 42,
    alignContent: "center",
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  searchInput: {
    backgroundColor: "#f2f2f2",
    width: "88%",
    height: 48,
    borderRadius: 5,
    paddingLeft: 5,
  },
});
