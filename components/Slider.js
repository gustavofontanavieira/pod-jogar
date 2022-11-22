import Slider from "@react-native-community/slider";
import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const SliderComponent = ({ prop, infos, podcast }) => {
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

  const [time, setTime] = useState(Date.now());

  const [status, setStatus] = useState();

  async function Status() {
    setStatus(await podcast.getStatusAsync());
  }
  Status();

  /*  const interval = setInterval(() => setTime(Date.now()), 20000);
  useEffect(() => {
    function SetSlider() {
      if (status !== undefined) {
        return infos === undefined
          ? ""
          : (clearInterval(interval),
            console.log(status.positionMillis),
            setCurrentPosition(status.positionMillis / infos.durationMillis));
      }
    }
    return SetSlider();
  }, [time]); */

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
          maximumValue={prop}
          value={currentPosition}
          minimumTrackTintColor={"#76FF93"}
          maximumTrackTintColor={"#f2f2f2"}
          onValueChange={(value) => {
            setCurrentPosition(value);
          }}
          onSlidingStart={async () => {
            if (infos.isPlaying) return;

            try {
              await podcast.stopAsync();
            } catch (error) {
              console.log("Error on startSliding");
            }
          }}
          onSlidingComplete={async (value) => {
            if (infos === null) return;

            try {
              await podcast.setPositionAsync(value);
              await podcast.playAsync();
            } catch (error) {
              console.log("Error on onSlidingComplete");
            }
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
    width: "90%",
    alignSelf: "center",
  },
  minutes: {
    width: "80%",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  minutesText: {
    color: "#f2f2f2",
  },
});
