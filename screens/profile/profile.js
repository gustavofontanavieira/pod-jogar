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
import { AntDesign } from "@expo/vector-icons";
import WindowAlert from "../../components/WindowAlert";
import podcastService from "../../services/podcastService";

const Profile = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState("");
  const [image, setImage] = useState(DEFAULT_USER_PICTURE);
  const [windowAlert, setWindowAlert] = useState(false);
  const [load, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState([]);

  const getUserId = async () => {
    const value = await AsyncStorage.getItem("userId");
    setUserId(JSON.parse(value));
  };
  getUserId();

  useEffect(() => {
    if (userId !== "") {
      userService
        .getUserById(userId)
        .then((response) => {
          if (response === undefined) {
            setUserData({
              name: "Não",
              lastName: "Encontrado",
            });
          } else {
            setUserData(response);
            response.image == null ? "" : setImage({ uri: response.image });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      podcastService.getAll(userId).then((response) => {
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
  }, [userId]);

  useEffect(() => {
    setLoading(true);
  }, [podcasts]);

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

  useEffect(() => {
    setLoading(true);
  }, [podcasts]);

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

  function Window() {
    setWindowAlert(!windowAlert);
  }

  function Quit() {
    setWindowAlert(!windowAlert);
    AsyncStorage.clear().then(() => {
      navigation.navigate("FirstScreen");
    });
  }

  function NonQuite() {
    setWindowAlert(!windowAlert);
  }

  const content = {
    title: "Sair da conta",
    paragraph: "Deseja sair da sua conta?",
  };

  return (
    <View style={profileStyle.background}>
      {windowAlert && (
        <WindowAlert prop={Quit} nonquite={NonQuite} message={content} />
      )}

      <TouchableOpacity style={profileStyle.goBack} onPress={Window}>
        <AntDesign name="back" color={"#f2f2f2"} size={30} />
      </TouchableOpacity>
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
      <ScrollView>{load && <Card prop={podcasts} />}</ScrollView>
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
  goBack: {
    width: 30,
    height: 30,
    marginTop: 40,
    marginLeft: "88%",
    borderRadius: 100,
    position: "absolute",
    zIndex: 1,
  },
});
