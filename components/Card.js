import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import podcastService from "../services/podcastService";
import Favorites from "../screens/favorites/Favorites";
import userService from "../services/userService";

export default function Card({
  prop,
  isProfile,
  setDelete,
  isFavorite,
  setDisfavor,
  userId,
  favorites,
}) {
  const navigation = useNavigation();

  function deletePodcast(podcastId) {
    if (podcastId === undefined || podcastId === null) {
      setDelete();
    } else {
      podcastService.delete(podcastId).then((response) => {
        console.log(response);
        setDelete();
      });
    }
  }

  function disfavorPodcast(podcastId) {
    if (podcastId === undefined || podcastId === null) {
      setDisfavor();
    } else {
      userService.disfavorPodcast(userId, podcastId).then((response) => {
        console.log(response);
        setDisfavor();
      });
    }
  }

  return prop.map((item, key) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Reproduction", item);
        }}
        key={key}
      >
        <View style={cardStyle.podCard} key={item.id}>
          <View style={cardStyle.viewImage}>
            <Image source={{ uri: item.image }} style={cardStyle.podImage} />
          </View>
          <View style={cardStyle.cardText}>
            <Text style={cardStyle.cardTitle}>{item.name}</Text>
            <Text style={cardStyle.cardDescription}>{item.description}</Text>
          </View>
          {isProfile && (
            <TouchableOpacity
              onPress={() => {
                deletePodcast(item.id);
              }}
              style={cardStyle.delete}
            >
              <Feather name="trash-2" size={30} color="red" />
            </TouchableOpacity>
          )}
          {isFavorite && (
            <TouchableOpacity
              onPress={() => {
                favorites[key].id == undefined
                  ? ""
                  : disfavorPodcast(favorites[key].id);
              }}
              style={cardStyle.delete}
            >
              <AntDesign name="heart" size={30} color="#76FF93" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  });
}

const cardStyle = StyleSheet.create({
  podCard: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
    height: 70,
    backgroundColor: "#2c2c2b",
    borderRadius: 5,
    marginTop: 7,
    borderColor: "#2a2a2a",
    borderWidth: 1,
  },
  cardText: {
    marginLeft: 20,
  },
  cardTitle: {
    color: "#f2f2f2",
    fontSize: 15,
  },
  cardDescription: {
    color: "#f2f2f2",
    fontSize: 10,
  },
  viewImage: {
    height: "100%",
    width: "20%",
  },
  podImage: {
    width: "100%",
    height: "100%",
  },
  delete: {
    position: "absolute",
    marginLeft: "88%",
    width: 20,
  },
});
