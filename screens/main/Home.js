import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import Card from "../../components/Card";
import DropDown from "../../components/DropDown";
/* import * as MediaLibrary from "expo-media-library"; */

import userService from "../../services/userService";
import podcastService from "../../services/podcastService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import categorieService from "../../services/categoriesService";

export default function Home({ navigation }) {
  const [userId, setUserId] = useState(String);
  const [load, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const categories = [];
  const [items, setItems] = useState(categories);
  const [value, setValue] = useState(null);

  categorieService.getAllCategories().then((response) => {
    response.map((item) => {
      categories.push({
        label: item.name,
        value: item.name.toLowerCase(),
        id: item.id,
      });
    });
  });

  useEffect(() => {
    if (userId !== "") {
      podcastService.getPodcastByCategorie(value, userId).then((response) => {
        if (response === undefined) {
          setPodcasts([
            {
              name: "Nenhum podcast encontrado",
            },
          ]);
        } else {
          setPodcasts(response);
        }
      });
    }
  }, [value]);

  const getUserId = async () => {
    const value = await AsyncStorage.getItem("userId");
    setUserId(JSON.parse(value));
  };
  getUserId();

  useEffect(() => {
    setLoading(true);
  }, [podcasts]);

  useEffect(() => {
    if (userId !== "") {
      podcastService
        .getAll(userId)
        .then((response) => {
          if (response === undefined) {
            setPodcasts([
              {
                name: "Nenhum podcast encontrado",
              },
            ]);
          } else {
            setPodcasts(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        display: "flex",
        backgroundColor: "#2c2c2b",
        borderTopColor: "transparent",
      },
    });
  }, []);

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
        <DropDown
          items={items}
          setItems={setItems}
          categories={categories}
          value={value}
          setValue={setValue}
        />
      </View>
      <Text style={homeStyle.mediumHomeText}>Podcasts desta categoria:</Text>

      <ScrollView>{load && <Card prop={podcasts} />}</ScrollView>
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
