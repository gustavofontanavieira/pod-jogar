import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import UserProfile from "../../components/User.profile";
import UserPodcasts from "../../components/UserPodcasts";

const Profile = () => {
  return (
    <View style={profileStyle.background}>
      <UserProfile />
      <UserPodcasts />
    </View>
  );
};

export default Profile;

const profileStyle = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#232323",
  },
});
