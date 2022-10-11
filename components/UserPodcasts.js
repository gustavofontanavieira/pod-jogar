import { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Card from "./Card";

const UserPodcasts = () => {
  const [podcasts, setPodcasts] = useState([
    {
      title: "Ghost B.C 1",
      description: "black metal band 1",
      image: require("../assets/images/login/ghost.jpg"),
      id: 1,
    },
    {
      title: "Ghost B.C 2",
      description: "black metal band 2",
      image: require("../assets/images/login/ghost.jpg"),
      id: 2,
    },
    {
      title: "Ghost B.C 3",
      description: "black metal band 3",
      image: require("../assets/images/login/ghost.jpg"),
      id: 3,
    },
  ]);

  return (
    <View>
      <TouchableOpacity style={userPodcastsCompStyle.containerAddPod}>
        <View style={userPodcastsCompStyle.addPod}>
          <Text style={userPodcastsCompStyle.plusSymbol}>+</Text>
        </View>
        <View>
          <Text style={userPodcastsCompStyle.text}>Adicionar Podcast</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={userPodcastsCompStyle.podcastList}>
        {podcasts.map((item, key) => {
          return <Card prop={item} key={key} />;
        })}
      </ScrollView>
    </View>
  );
};

export default UserPodcasts;

const userPodcastsCompStyle = StyleSheet.create({
  containerAddPod: {
    marginTop: 12,
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
  },
  addPod: {
    backgroundColor: "#f2f2f2",
    padding: 2,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    marginLeft: 25,
  },
  plusSymbol: {
    fontSize: 16,
  },
  text: {
    color: "#f2f2f2",
    marginLeft: 8,
  },
  podcastList: {
    height: 340,
    marginTop: 8,
  },
});
