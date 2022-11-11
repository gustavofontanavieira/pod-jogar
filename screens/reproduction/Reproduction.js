import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Audio } from "expo-av";
import songs from "../../data";

import SliderComponent from "../../components/Slider";
import { useEffect, useState } from "react";

const Reproduction = ({ route, navigation }) => {
  const { description, id, image, title } = route.params;

  let rotateValueHolder = new Animated.Value(0);

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const startRotateImageFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 20000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startRotateImageFunction());
  };

  startRotateImageFunction();

  const [sound, setSound] = useState();
  const [play, setPlay] = useState(false);
  const [status, setStatus] = useState();
  const [seconds, setSeconds] = useState();
  const [slider, setSlider] = useState(false);

  async function playSound() {
    try {
      const { sound, status } = await Audio.Sound.createAsync({
        uri: "https://firebasestorage.googleapis.com/v0/b/pod-jogar.appspot.com/o/QUAL%20SER%C3%81%20O%20FUTURO%20DE%20RESIDENT%20EVIL.mp3?alt=media&token=d289ca61-4a0e-4964-a26f-449517a56962",
      });
      setSound(sound);

      if (play === true) {
        setPlay(false);
        await sound.stopAsync();
      } else {
        setSeconds(status.durationMillis);
        setPlay(true);
        setSlider(true);
        await sound.playAsync();

        /*         setStatus(await sound.getStatusAsync()); */
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={reproductionStyle.background}>
      <View style={reproductionStyle.imageFather}>
        <Animated.Image
          source={image}
          style={[
            reproductionStyle.image,
            { transform: [{ rotate: RotateData }] },
          ]}
        />
      </View>
      <View style={reproductionStyle.text}>
        <Text style={reproductionStyle.title}>{title || "titulo"}</Text>
        <Text style={reproductionStyle.description}>
          {description || "descrição"}
        </Text>
      </View>
      {slider && <SliderComponent prop={seconds} />}
      <View style={reproductionStyle.buttons}>
        <TouchableOpacity style={reproductionStyle.return}>
          <Ionicons name="play-skip-back-outline" color={"#000"} size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={reproductionStyle.pause} onPress={playSound}>
          <Ionicons name={play ? "play" : "stop"} color={"#000"} size={34} />
        </TouchableOpacity>
        <TouchableOpacity style={reproductionStyle.skip}>
          <Ionicons name="play-skip-forward-outline" color={"#000"} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Reproduction;

const reproductionStyle = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232323",
  },
  title: {
    fontSize: 22,
    color: "#f2f2f2",
  },
  imageFather: {
    width: 310,
    height: 310,
    alignSelf: "center",
    marginTop: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 200,
  },
  description: {
    color: "#f2f2f2",
    fontSize: 18,
  },
  text: {
    alignItems: "center",
    marginTop: 30,
  },
  return: {
    width: 60,
    height: 60,
    borderRadius: 200,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  skip: {
    width: 60,
    height: 60,
    borderRadius: 200,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  pause: {
    width: 75,
    height: 75,
    borderRadius: 200,
    backgroundColor: "#76FF93",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: 20,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    alignItems: "center",
  },
});
