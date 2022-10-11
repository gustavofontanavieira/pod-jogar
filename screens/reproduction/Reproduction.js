import { StyleSheet, View, Text, Image } from "react-native";

const Reproduction = ({ route, navigation }) => {
  return (
    <View style={reproductionStyle.background}>
      <View style={reproductionStyle.imageFather}>
        <Image source={route.params.image} style={reproductionStyle.image} />
      </View>
      <View style={reproductionStyle.text}>
        <Text style={reproductionStyle.title}>{route.params.title}</Text>
        <Text style={reproductionStyle.description}>
          {route.params.description}
        </Text>
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
});
