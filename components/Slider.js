import Slider from "@react-native-community/slider";
import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";

const SliderComponent = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  return (
    <View>
      <View style={sliderComponentStyle.minutes}>
        <Text style={sliderComponentStyle.minutesText}>2:50</Text>
        <Text style={sliderComponentStyle.minutesText}>{currentPosition}</Text>
      </View>
      <View style={sliderComponentStyle.sliderPlayer}>
        <Slider
          style={sliderComponentStyle.slider}
          minimumValue={0}
          maximumValue={360}
          minimumTrackTintColor={"#76FF93"}
          maximumTrackTintColor={"#f2f2f2"}
          onValueChange={(value) => {
            setCurrentPosition(value);
          }}
        />
      </View>
    </View>
  );
};

export default SliderComponent;

const sliderComponentStyle = StyleSheet.create({
  sliderPlayer: {
    marginTop: 5,
    width: 370,
    height: 40,
    alignSelf: "center",
  },
  slider: {
    width: "100%",
  },
  minutes: {
    width: 340,
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  minutesText: {
    color: "#f2f2f2",
  },
});
