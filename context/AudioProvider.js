import { getPermissionsAsync } from "expo-media-library";
import React, { Component, createContext } from "react";
import { Alert, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { DataProvider } from "recyclerlistview";

export const AudioContext = createContext();

export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => {
        r1 !== r2;
      }),
    };
  }

  permissionAllert = () => {
    //Tittle , message in pop-up
    Alert.alert("Permission Required", "This app needs to read audio files!", [
      {
        text: "I am ready",
        onPress: () => this.getPermission(),
      },
      {
        text: "Cancel",
        onPress: () => this.permissionAllert(),
      },
    ]);
  };

  getAudioFiles = async () => {
    const { dataProvider, audioFiles } = this.state;
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });

    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles,
        ...media.assets,
      ]),
      audioFiles: [...audioFiles, ...media.assets],
    });

    console.log(
      media.assets.forEach((item) => {
        console.log(item.duration);
      })
    );
  };

  getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      //we want to get all the audio files
      this.getAudioFiles();
    }

    if (!permission.cansAskAgain && !permission.granted) {
      this.setState({ ...this.state, permissionError: true });
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, cansAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && cansAskAgain) {
        //display alert that user must allow this permission
        this.permissionAllert();
      }

      if (status === "granted") {
        //we want to get all the audio files
        this.getAudioFiles();
      }

      if (status === "denied" && !cansAskAgain) {
        //display error to the user
        this.setState({ ...this.state, permissionError: true });
      }
    }
    console.log(permission);
  };

  componentDidMount() {
    this.getPermission();
  }

  render() {
    const { audioFiles, dataProvider, permissionError } = this.state;
    if (this.state.permissionError)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Parece que você não aceitou a permissão</Text>
        </View>
      );
    return (
      <AudioContext.Provider value={{ audioFiles, dataProvider }}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}
