import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Card(infos) {
  return (
    <View style={cardStyle.podCard} key={infos.prop.id}>
      <View style={cardStyle.viewImage}>
        <Image source={infos.prop.image} style={cardStyle.podImage} />
      </View>
      <View style={cardStyle.cardText}>
        <Text style={cardStyle.cardTitle}>{infos.prop.title}</Text>
        <Text style={cardStyle.cardDescription}>{infos.prop.description}</Text>
      </View>
    </View>
  );
}

const cardStyle = StyleSheet.create({
  podCard: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 360,
    height: 70,
    marginTop: 12,
    backgroundColor: "#2c2c2b",
    borderRadius: 5,
  },
  cardText: {
    marginLeft: 20,
  },
  cardTitle: {
    color: "#f2f2f2",
    fontSize: 15,
  },
  cardDescription: {
    color: "#f2f2f2",
    fontSize: 10,
  },
  viewImage: {
    height: "100%",
    width: "20%",
  },
  podImage: {
    width: "100%",
    height: "100%",
  },
});
