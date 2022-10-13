import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { AudioContext } from "../../context/AudioProvider";
import Home from "./Home";
import Card from "../../components/Card";
import { useNavigation } from "@react-navigation/native/";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";

class HomeClass extends Component {
  static contextType = AudioContext;
  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
          break;
      }
    }
  );

  rowRenderer = (type, item) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Reproduction", ...item);
        }}
      >
        <Card
          title={item.filename}
          description={item.duration}
          image={require("../../assets/images/login/ghost.jpg")}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider }) => {
          return (
            <View style={{ flex: 1, backgroundColor: "#232323" }}>
              <Home />
              <RecyclerListView
                style={{ width: "85%", alignSelf: "center" }}
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
            </View>
          );
        }}
      </AudioContext.Consumer>
    );
    /* return (
      <View style={{ backgroundColor: "#232323", flex: 1 }}>
        <Home />
        <ScrollView
          style={{
            width: "85%",
            height: 250,
            alignSelf: "center",
          }}
        >
          {this.context.audioFiles.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  useNavigation().navigate("Reproduction", item);
                }}
                key={item.id}
              >
                <Card prop={item} key={item.id} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    ); */
  }
}

export default function (props) {
  const navigation = useNavigation();

  return <HomeClass {...props} navigation={navigation} />;
}
