import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import DropDown from "../../components/DropDown";
import WindowAlert from "../../components/WindowAlert";
import { useEffect } from "react";
import SelectAudio from "../../components/AudioList";

const AddPodcast = () => {
  const [image, setImage] = useState(null);
  const [load, setLoading] = useState(false);
  const [selectAudio, setSelectAudio] = useState(false);
  const [audios, setAudios] = useState([]);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
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

  return (
    <View style={addPodcastStyle.mainView}>
      {load && (
        <WindowAlert message={content} nonquite={Quit} prop={PickAudioFile} />
      )}

      {selectAudio && <SelectAudio audios={audios} />}

      <Text style={addPodcastStyle.title}>Adicionar Novo Podcast</Text>
      <View style={addPodcastStyle.containerInputs}>
        <TextInput
          style={addPodcastStyle.input}
          placeholder="Título do podcast"
          placeholderTextColor="#f2f2f2"
        />
        <TextInput
          style={addPodcastStyle.input}
          placeholder="Breve descrição"
          maxLength={80}
          placeholderTextColor="#f2f2f2"
        />
        <View style={addPodcastStyle.dropDown}>
          <DropDown />
        </View>

        {(image && (
          <Image source={{ uri: image }} style={addPodcastStyle.image} />
        )) || <Text style={addPodcastStyle.addImage}>Selecionar Imagem</Text>}
        <TouchableOpacity style={addPodcastStyle.icon} onPress={pickImage}>
          <Ionicons name="camera" color={"#76FF93"} size={42} />
        </TouchableOpacity>

        <Text style={addPodcastStyle.addImage}>Selecionar áudio</Text>
        <TouchableOpacity style={addPodcastStyle.icon} onPress={PickAudioFile}>
          <MaterialIcons name="multitrack-audio" color={"#76FF93"} size={42} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={addPodcastStyle.button}>
        <Text>Adicionar</Text>
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
    marginTop: 70,
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
    marginTop: 20,
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
    marginTop: 100,
    alignSelf: "center",
  },
  image: {
    width: 160,
    height: 160,
    marginTop: 30,
    borderRadius: 100,
    alignSelf: "center",
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
});
