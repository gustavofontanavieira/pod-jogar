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

  const [deletedPodcast, setDeletedPodcast] = useState(false);

  const getUserId = async () => {
    await AsyncStorage.getItem("userId").then((response) => {
      if (response !== null) {
        setUserId(JSON.parse(response));
      } else {
        setUserData({ name: "não", lastName: "encontrado" });
      }
    });
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
      getAllPodcast();
    }
  }, [userId]);

  useEffect(() => {
    setLoading(true);
  }, [podcasts]);

  function getAllPodcast() {
    podcastService.userPodcasts(userId).then((response) => {
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
    setUserData("");
    setUserId("");
    setPodcasts([]);
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

  useEffect(() => {}, [deletedPodcast]);

  function setDelete() {
    setDeletedPodcast(true);
    getAllPodcast();
  }

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
        {load && (
          <Card prop={podcasts} isProfile={true} setDelete={setDelete} />
        )}
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
    width: "90%",
    alignSelf: "center",
    marginTop: 50,
    height: 164,
    alignItems: "center",
  },
  userPicContainer: {
    width: "34%",
  },
  userPic: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  userName: {
    color: "#f2f2f2",
    fontSize: 18,
  },
  userDescContainer: {
    marginLeft: 20,
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
