import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Card from "./Card";

const UserPodcasts = () => {
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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
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
