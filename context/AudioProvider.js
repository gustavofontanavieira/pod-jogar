import { getPermissionsAsync } from "expo-media-library";
import React, { Component, createContext } from "react";
import { Alert, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

export const AudioContext = createContext();

export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
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
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });

    this.setState({ ...this.state, audioFiles: media.assets });

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
      }
    }
    console.log(permission);
  };

  componentDidMount() {
    this.getPermission();
  }

  render() {
    return (
      <AudioContext.Provider value={{ audioFiles: this.state.audioFiles }}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}
