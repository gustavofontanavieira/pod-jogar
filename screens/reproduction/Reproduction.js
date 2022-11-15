import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";

import { Audio } from "expo-av";

import SliderComponent from "../../components/Slider";
import { useEffect, useState } from "react";

const Reproduction = ({ route, navigation }) => {
  const { name, description, id, image, file } = route.params;

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
  const [seconds, setSeconds] = useState();
  const [slider, setSlider] = useState(false);
  const [favorite, setFavorite] = useState(false);

  async function playSound() {
    const { sound, status } = await Audio.Sound.createAsync({
      uri: file,
    });
    setSound(sound);

    try {
      if (play === true) {
        setPlay(false);
        await sound.stopAsync();
      } else {
        setSeconds(status.durationMillis);
        setPlay(true);
        setSlider(true);
        await sound.playAsync();
      }
    } catch (err) {
      console.log("Som não achado");
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  function Favorite() {
    setFavorite(!favorite);
  }

  return (
    <View style={reproductionStyle.background}>
      <View style={reproductionStyle.topButtons}>
        <TouchableOpacity
          style={reproductionStyle.goBack}
          onPress={async () => {
            sound === undefined
              ? navigation.replace("Main")
              : await sound.stopAsync();
            navigation.replace("Main");
          }}
        >
          <AntDesign name="back" color={"#f2f2f2"} size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={reproductionStyle.favorite} onPress={Favorite}>
          <AntDesign
            name="heart"
            color={favorite ? "#76FF93" : "#f2f2f2"}
            size={30}
          />
        </TouchableOpacity>
      </View>

      <View style={reproductionStyle.imageFather}>
        <Animated.Image
          source={{ uri: image }}
          style={[
            reproductionStyle.image,
            { transform: [{ rotate: RotateData }] },
          ]}
        />
      </View>
      <View style={reproductionStyle.text}>
        <Text style={reproductionStyle.title}>{name || "titulo"}</Text>
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
          <Ionicons
            name={play ? "md-pause" : "play"}
            color={"#000"}
            size={34}
          />
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
    width: 300,
    height: 300,
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
    width: 300,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    alignItems: "center",
  },
  goBack: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  favorite: {
    width: 30,
    height: 30,
    marginRight: 2,
    borderRadius: 100,
  },
  topButtons: {
    position: "absolute",
    marginTop: 50,
    flexDirection: "row",
    width: "85%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
});
