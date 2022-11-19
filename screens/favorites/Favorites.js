import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Card from "../../components/Card";
import podcastService from "../../services/podcastService";
import userService from "../../services/userService";

const Favorites = ({ navigation }) => {
  const [userId, setUserId] = useState(String);
  const [load, setLoading] = useState(false);
  const findedPodcasts = [];
  const [podcasts, setPodcasts] = useState(findedPodcasts);

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
      userService.getFavoritesPodcasts(userId).then((response) => {
        if (response === undefined) {
          setPodcasts([
            {
              name: "Nenhum podcast favoritado",
            },
          ]);
        } else {
          response.forEach((item, index) => {
            podcastService
              .getById(item.podcastsId)
              .then((podcast) => {
                return findedPodcasts.push(podcast);
              })
              .then((r) => {
                if (r === response.length) {
                  setPodcasts(findedPodcasts);
                }
              });
          });
        }
      });
    }
  }, [userId]);

  return (
    <View style={favoritesStyle.mainView}>
      <Text style={favoritesStyle.text}>Podcast favoritados</Text>
      <ScrollView>{load && <Card prop={podcasts} />}</ScrollView>
    </View>
  );
};

export default Favorites;

const favoritesStyle = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#232323",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 28,
    marginTop: 50,
    marginBottom: 25,
  },
  touchable: {
    marginRight: 30,
  },
  heartView: {
    width: 360,
    height: 70,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    zIndex: 1,
    marginTop: 6,
  },
});
