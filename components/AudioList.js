import { ScrollView } from "react-native-gesture-handler";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SelectAudio({ audios, setAudio, setSelectAudio }) {
  return (
    <View style={selectAudioStyle.mainView}>
      <ScrollView style={selectAudioStyle.scroll}>
        {audios.map((item, key) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                setAudio(item.uri);
                setSelectAudio(false);
              }}
            >
              <View style={selectAudioStyle.podCard}>
                <Text style={selectAudioStyle.cardTitle}>{item.filename}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const selectAudioStyle = StyleSheet.create({
  mainView: {
    zIndex: 1000,
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
