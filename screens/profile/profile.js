import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import React, { useState } from "react";
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
      <View style={profileStyle.userContainer}>
        <View style={profileStyle.userPicContainer}>
          <Image
            style={profileStyle.userPic}
            source={require("../../assets/images/login/ghost.jpg")}
          />
        </View>
        <View style={profileStyle.userDescContainer}>
          <Text style={profileStyle.userName}>Gustavo Fontana Vieira</Text>
          <Text style={profileStyle.description}>
            To indo pra lá e pra cá sem saber ao certo quem sou mas tenho
            certeza que sou uma pessoa
          </Text>
        </View>
      </View>
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
  userContainer: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    marginTop: 50,
    height: 164,
    alignItems: "center",
  },
  userPicContainer: {
    width: "34%",
  },
  userDescContainer: {
    width: "66%",
    padding: 8,
  },
  userPic: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  userName: {
    color: "#f2f2f2",
    fontSize: 20,
  },
  description: {
    color: "#f2f2f2",
    marginTop: 8,
  },
});
