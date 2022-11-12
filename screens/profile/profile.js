import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";

import React, { useState, useEffect } from "react";
import UserPodcasts from "../../components/UserPodcasts";
import Card from "../../components/Card";
import * as ImagePicker from "expo-image-picker";
import userService from "../../services/userService";
const DEFAULT_USER_PICTURE = require("../../assets/images/login/defaultIcon.png");
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");
  const [image, setImage] = useState(DEFAULT_USER_PICTURE);

  const getUserId = async () => {
    const value = await AsyncStorage.getItem("userId");
    setUserId(value);
  };
  getUserId();

  useEffect(() => {
    if (userId !== "") {
      userService
        .getUserById(userId)
        .then((response) => {
          setUserData(response);
          response.image == null ? "" : setImage({ uri: response.image });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  function updateImage(newImage) {
    const img = { image: newImage };
    userService
      .updateUserById(userId, img)
      .then((response) => {
        setUserData(response);
        response.image == null ? "" : setImage({ uri: response.image });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      updateImage(result.uri);
    }
  }

  return (
    <View style={profileStyle.background}>
      <View style={profileStyle.userContainer}>
        <View style={profileStyle.userPicContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image style={profileStyle.userPic} source={image} />
          </TouchableOpacity>
        </View>
        <View style={profileStyle.userDescContainer}>
          <Text style={profileStyle.userName}>
            {`${userData.name} ${userData.lastName}`}
          </Text>
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
