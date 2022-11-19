import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import DropDown from "../../components/DropDown";
import WindowAlert from "../../components/WindowAlert";
import { useEffect } from "react";
import SelectAudio from "../../components/AudioList";
import categorieService from "../../services/categoriesService";
import podcastService from "../../services/podcastService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddPodcast = ({ navigation }) => {
  const [load, setLoading] = useState(false);
  const [selectAudio, setSelectAudio] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [audios, setAudios] = useState([]);
  const categories = [];
  const [items, setItems] = useState(categories);

  const [userId, setUserId] = useState(String);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(null);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState("");

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  async function PickAudioFile() {
    if ((await MediaLibrary.getPermissionsAsync()).granted) {
      setLoading(false);

      if (audios !== [] || audios !== undefined) {
        setSelectAudio(true);
      }

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
      });
      setAudios(media.assets);
    } else {
      await MediaLibrary.requestPermissionsAsync();
      setLoading(false);
    }
  }

  const content = {
    title: "Permissão",
    paragraph: "Permitir que o app acesse arquivos?",
  };

  function Quit() {
    setLoading(false);
  }

  useEffect(() => {}, [audios]);

  categorieService.getAllCategories().then((response) => {
    response.map((item) => {
      categories.push({
        label: item.name,
        value: item.name.toLowerCase(),
        id: item.id,
      });
    });
  });

  async function CreatePodcast() {
    const data = {
      name: name,
      description: description,
      image: image,
      file: audio,
      categoriesId: value,
    };

    const userDataId = await AsyncStorage.getItem("userId");

    if (
      name === "" ||
      description === "" ||
      image === null ||
      audio === "" ||
      value === null
    ) {
      setErrorMessage(true);
    } else {
      podcastService.create(JSON.parse(userDataId), data).then((response) => {
        setName(" ");
        setDescription(" ");
        setImage(null);
        setAudio("");
        setValue(null);
        setErrorMessage(false);
      });
    }
  }

  return (
    <View style={addPodcastStyle.mainView} on>
      <TouchableOpacity
        style={addPodcastStyle.goBack}
        onPress={() => {
          navigation.navigate("Main");
        }}
      >
        <AntDesign name="back" color={"#f2f2f2"} size={30} />
      </TouchableOpacity>
      {load && (
        <WindowAlert message={content} nonquite={Quit} prop={PickAudioFile} />
      )}

      {selectAudio && (
        <SelectAudio
          audios={audios}
          setAudio={setAudio}
          setSelectAudio={setSelectAudio}
        />
      )}

      <Text style={addPodcastStyle.title}>Adicionar Novo Podcast</Text>
      {errorMessage && (
        <Text style={addPodcastStyle.errorMessage}>
          Por favor preencha todos os campos
        </Text>
      )}
      <View style={addPodcastStyle.containerInputs}>
        <TextInput
          style={addPodcastStyle.input}
          placeholder="Título do podcast"
          placeholderTextColor="#f2f2f2"
          onChangeText={setName}
        />
        <TextInput
          style={addPodcastStyle.input}
          placeholder="Breve descrição"
          maxLength={80}
          placeholderTextColor="#f2f2f2"
          onChangeText={setDescription}
        />
        <View style={addPodcastStyle.dropDown}>
          <DropDown
            items={items}
            setItems={setItems}
            value={value}
            setValue={setValue}
          />
        </View>

        <TouchableOpacity style={addPodcastStyle.icon} onPress={pickImage}>
          {(image === null && (
            <View>
              <Text style={addPodcastStyle.addImage}>Selecionar Imagem</Text>
              <Ionicons
                name="camera"
                color={"#76FF93"}
                size={42}
                style={addPodcastStyle.camera}
              />
            </View>
          )) ||
            (image !== null && (
              <Image source={{ uri: image }} style={addPodcastStyle.image} />
            ))}
        </TouchableOpacity>

        <TouchableOpacity style={addPodcastStyle.icon} onPress={PickAudioFile}>
          <View style={addPodcastStyle.podCard}>
            <Text style={addPodcastStyle.cardTitle}>
              {audio || "Selecionar áudio"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={addPodcastStyle.button}
        onPress={() => {
          CreatePodcast(), navigation.navigate("Main");
        }}
      >
        <Text>Criar Podcast</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPodcast;

const addPodcastStyle = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#232323",
  },
  title: {
    color: "#f2f2f2",
    fontSize: 24,
    textAlign: "center",
    marginTop: 90,
  },
  containerInputs: {
    width: "90%",
    height: 400,
    alignSelf: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 40,
    padding: 10,
    marginTop: 15,
    borderWidth: 2,
    borderTopColor: "#232323",
    borderRightColor: "#232323",
    borderLeftColor: "#232323",
    borderBottomColor: "#f2f2f2",
    color: "#f2f2f2",
  },
  button: {
    backgroundColor: "#76FF93",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 50,
    alignSelf: "center",
  },
  image: {
    width: 160,
    height: 160,
    marginTop: 30,
    borderRadius: 100,
    alignSelf: "center",
    zIndex: 0,
  },
  icon: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 5,
  },
  addImage: {
    color: "#f2f2f2",
    alignSelf: "center",
    marginTop: 20,
    fontSize: 14,
  },
  dropDown: {
    padding: 5,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    color: "#f2f2f2",
    padding: 10,
  },
  podCard: {
    width: "99%",
    height: 80,
    marginTop: 5,
    paddingLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    borderColor: "#77FF93",
    borderWidth: 1,
  },
  cardTitle: {
    color: "#f5f5f5",
    padding: 10,
  },
  camera: {
    alignSelf: "center",
  },
  errorMessage: {
    marginTop: 10,
    fontSize: 14,
    color: "red",
    alignSelf: "center",
  },
  goBack: {
    position: "absolute",
    marginTop: 50,
    marginLeft: 20,
  },
});
