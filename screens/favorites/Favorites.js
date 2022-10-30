import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Card from "../../components/Card";

const Favorites = ({ navigation }) => {
  const podcasts = [
    {
      title: "Ghost B.C 1",
      description: "black metal band 1",
      image: require("../../assets/images/login/ghost.jpg"),
      id: 1,
    },
    {
      title: "Ghost B.C 2",
      description: "black metal band 2",
      image: require("../../assets/images/login/ghost.jpg"),
      id: 2,
    },
    {
      title: "Ghost B.C 3",
      description: "black metal band 3",
      image: require("../../assets/images/login/ghost.jpg"),
      id: 3,
    },
  ];

  return (
    <View style={favoritesStyle.mainView}>
      <Text style={favoritesStyle.text}>Podcast favoritados</Text>
      <ScrollView>
        {podcasts.map((item, key) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Reproduction", item);
              }}
              key={key}
            >
              <View style={favoritesStyle.heartView}>
                <Ionicons
                  name="heart"
                  size={32}
                  color={"red"}
                  style={favoritesStyle.touchable}
                />
              </View>
              <Card prop={item} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Favorites;

const favoritesStyle = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#232323",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 28,
    marginTop: 50,
    marginBottom: 25,
  },
  touchable: {
    marginRight: 30,
  },
  heartView: {
    width: 360,
    height: 70,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    zIndex: 1,
    marginTop: 6,
  },
});
