import { ScrollView } from "react-native-gesture-handler";
import { View, StyleSheet, Text } from "react-native";

export default function SelectAudio({ audios }) {
  return (
    <View style={selectAudioStyle.mainView}>
      <ScrollView style={selectAudioStyle.scroll}>
        {audios.map((item, key) => {
          return (
            <View style={selectAudioStyle.podCard} key={key}>
              <Text style={selectAudioStyle.cardTitle}>{item.filename}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const selectAudioStyle = StyleSheet.create({
  mainView: {
    zIndex: 1,
    position: "absolute",
    marginTop: "40%",
    width: "88%",
    height: "60%",
    backgroundColor: "#424242",
    alignSelf: "center",
    borderRadius: 25,
  },
  scroll: {
    alignSelf: "center",
    width: "87%",
    marginBottom: 10,
    marginTop: 10,
  },
  podCard: {
    width: "99%",
    height: 50,
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
  },
});
