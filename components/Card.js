import { StyleSheet, Text, View, Image } from "react-native";

/* const convertTime = (minutes) => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split(".")[0];
    const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
}; */

export default function Card({ prop }) {
  return (
    <View style={cardStyle.podCard} key={prop.id}>
      <View style={cardStyle.viewImage}>
        <Image source={prop.image} style={cardStyle.podImage} />
      </View>
      <View style={cardStyle.cardText}>
        <Text style={cardStyle.cardTitle}>{prop.title}</Text>
        <Text style={cardStyle.cardDescription}>{prop.description}</Text>
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
    backgroundColor: "#2c2c2b",
    borderRadius: 5,
    marginTop: 7,
    borderColor: "#2a2a2a",
    borderWidth: 1,
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
