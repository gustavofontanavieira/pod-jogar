import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import UserProfile from "../../components/User.profile";
import UserPodcasts from "../../components/UserPodcasts";
import Card from "../../components/Card";

const Profile = ({ navigation }) => {
  const [podcasts, setPodcasts] = useState([
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
  ]);

  return (
    <View style={profileStyle.background}>
      <UserProfile />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddPodcast");
        }}
      >
        <UserPodcasts />
      </TouchableOpacity>
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
};

export default Profile;

const profileStyle = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232323",
  },
  podcastList: {
    height: 340,
    marginTop: 8,
  },
});
