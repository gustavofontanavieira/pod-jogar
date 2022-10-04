import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function FirstScreen() {
  return (
    <View style={specificStyle.container}>
      <Image
        style={specificStyle.image}
        source={require("../../assets/images/login/pod-jogar620.png")}
      />
      <View style={specificStyle.buttons}>
        <TouchableOpacity style={specificStyle.button}>
          <Text style={specificStyle.button_text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={specificStyle.button}>
          <Text style={specificStyle.button_text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const specificStyle = StyleSheet.create({
  container: {
    backgroundColor: "#232323",
    width: "100%",
  },
  button: {
    width: "65%",
    height: "21%",
    padding: 4,
    marginTop: "10%",
    backgroundColor: "#76FF93",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttons: {
    alignItems: "center",
  },
  button_text: {
    color: "#232323",
    fontSize: 22,
  },
  image: {
    backgroundColor: "#232323",
    width: "100%",
    marginTop: 20,
  },
});
