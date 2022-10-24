import Slider from "@react-native-community/slider";
import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";

const SliderComponent = ({ prop }) => {
  const convertTime = (minutes) => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString()[0];
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
  };

  const [currentPosition, setCurrentPosition] = useState(0);

  return (
    <View>
      <View style={sliderComponentStyle.minutes}>
        <Text style={sliderComponentStyle.minutesText}>
          {convertTime(prop)}
        </Text>
        <Text style={sliderComponentStyle.minutesText}>
          {convertTime(currentPosition)}
        </Text>
      </View>
      <View style={sliderComponentStyle.sliderPlayer}>
        <Slider
          style={sliderComponentStyle.slider}
          minimumValue={0}
          maximumValue={convertTime(prop)}
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
