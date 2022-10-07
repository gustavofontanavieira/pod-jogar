import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";

const UserProfile = () => {
  return (
    <View style={profileCompStyle.userContainer}>
      <View style={profileCompStyle.userPicContainer}>
        <Image
          style={profileCompStyle.userPic}
          source={require("../assets/images/login/ghost.jpg")}
        />
      </View>
      <View style={profileCompStyle.userDescContainer}>
        <Text style={profileCompStyle.userName}>Gustavo Fontana Vieira</Text>
        <Text style={profileCompStyle.description}>
          To indo pra lá e pra cá sem saber ao certo quem sou mas tenho certeza
          que sou uma pessoa
        </Text>
      </View>
    </View>
  );
};

export default UserProfile;

const profileCompStyle = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    marginTop: 50,
    height: 164,
    alignItems: "center",
  },
  userPicContainer: {
    width: "34%",
  },
  userDescContainer: {
    width: "66%",
    padding: 8,
  },
  userPic: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  userName: {
    color: "#f2f2f2",
    fontSize: 20,
  },
  description: {
    color: "#f2f2f2",
    marginTop: 8,
  },
});
